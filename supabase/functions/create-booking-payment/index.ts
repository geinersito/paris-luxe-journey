
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13.10.0'

const ALLOWED_ORIGINS = [
  'https://eliteparistransfer.com',
  'https://www.eliteparistransfer.com',
  'http://localhost:8082',
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('Origin') ?? '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

type RetryDecision = {
  retry: boolean;
  status?: number;
  code?: string;
};

function classifyError(err: unknown): RetryDecision {
  const anyErr = err as any;
  const code = anyErr?.code ?? anyErr?.error?.code;
  const status = anyErr?.status ?? anyErr?.error?.status;
  const message = String(anyErr?.message ?? anyErr?.error?.message ?? "");

  // Deterministic DB conflicts: NEVER RETRY
  if (code === "23505" || code === "23P01" || code === "23503" || code === "23514") {
    return { retry: false, status: 409, code: "DB_CONFLICT" };
  }
  if (status === 409) {
    return { retry: false, status: 409, code: "CONFLICT" };
  }
  if (status === 400) {
    return { retry: false, status: 400, code: "BAD_REQUEST" };
  }

  // Stripe errors: retry only on transient types
  const stripeType = anyErr?.type ?? anyErr?.error?.type;
  if (typeof stripeType === "string") {
    if (
      stripeType.includes("api_connection") ||
      stripeType.includes("rate_limit") ||
      stripeType.includes("api_error")
    ) {
      return { retry: true };
    }
    return { retry: false, status: 402, code: "STRIPE_ERROR" };
  }

  // Retryable infra/network
  if (status === 429) return { retry: true };
  if (status && status >= 500) return { retry: true };
  if (message.toLowerCase().includes("timeout") || message.toLowerCase().includes("timed out")) {
    return { retry: true };
  }

  // Default: no retry (conservative)
  return { retry: false, status: 500, code: "UNKNOWN_ERROR" };
}

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  opts?: { label?: string; maxAttempts?: number; baseDelayMs?: number }
): Promise<T> {
  const maxAttempts = opts?.maxAttempts ?? 3;
  const baseDelayMs = opts?.baseDelayMs ?? 250;
  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt += 1;
      const decision = classifyError(err);

      if (!decision.retry || attempt >= maxAttempts) {
        (err as any).__retryDecision = decision;
        (err as any).__retryLabel = opts?.label ?? "retryWithBackoff";
        (err as any).__retryAttempt = attempt;
        throw err;
      }

      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

function errorResponse(err: unknown, fallbackStatus = 500, corsHeaders: Record<string, string> = {}) {
  const anyErr = err as any;
  const decision = anyErr?.__retryDecision as RetryDecision | undefined;

  const status = decision?.status ?? fallbackStatus;
  const code = decision?.code ?? "ERROR";

  return new Response(
    JSON.stringify({
      ok: false,
      code,
      message: String(anyErr?.message ?? "error"),
      details: anyErr?.details ?? anyErr?.error?.details ?? null,
      dbCode: anyErr?.code ?? anyErr?.error?.code ?? null,
    }),
    { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
}

interface BookingData {
  pickup_location_id: string;
  dropoff_location_id: string;
  pickup_datetime: string;
  passengers_count: number;
  vehicle_id: string;
  flight_number?: string | null;
  address_details?: string | null;
  trip_type: string;
  large_luggage_count: number;
  small_luggage_count: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  special_instructions?: string | null;
  total_price: number;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    console.log('[create-booking-payment] Iniciando proceso');

    // 1. Configurar clientes
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient()
    });

    // 2. Obtener y validar datos
    const { bookingData } = await req.json();
    console.log('[create-booking-payment] Datos recibidos:', { bookingData });

    // Validar que el precio sea mayor que 0
    if (!bookingData.total_price || bookingData.total_price <= 0) {
      throw new Error('El precio total debe ser mayor que 0');
    }

    // Defense-in-depth: vehicle_id is assigned later in dispatch, not at booking time
    // Remove it from payload even if frontend mistakenly sends it
    delete bookingData.vehicle_id;

    // Compute service_end_datetime: pickup_datetime + 2h (conservative service window).
    // Required NOT NULL after migration 20260226130000. The DB also has a DEFAULT of
    // now() + 2h as a belt-and-suspenders guard, but setting it explicitly here ensures
    // the value reflects the actual pickup time.
    const pickupMs = bookingData.pickup_datetime
      ? new Date(bookingData.pickup_datetime).getTime()
      : Date.now();
    const serviceEndDatetime = new Date(pickupMs + 2 * 60 * 60 * 1000).toISOString();

    // 3. Crear la reserva con retry
    console.log('[create-booking-payment] Creando reserva');
    let booking;
    try {
      booking = await retryWithBackoff(
        async () => {
          const { data, error } = await supabase
            .from('bookings')
            .insert([{
              ...bookingData,
              status: 'pending',
              service_end_datetime: serviceEndDatetime,
            }])
            .select()
            .single();

          if (error) {
            throw error;
          }

          return data;
        },
        { label: 'insert_booking', maxAttempts: 3, baseDelayMs: 250 }
      );
    } catch (err) {
      return errorResponse(err, 409, corsHeaders);
    }

    // 4. Buscar o crear cliente en Stripe
    console.log('[create-booking-payment] Buscando cliente en Stripe');
    let customer;
    const customers = await stripe.customers.list({
      email: bookingData.customer_email,
      limit: 1
    });

    if (customers.data.length > 0) {
      customer = customers.data[0];
      if (customer.name !== bookingData.customer_name) {
        customer = await stripe.customers.update(customer.id, {
          name: bookingData.customer_name
        });
      }
    } else {
      customer = await stripe.customers.create({
        email: bookingData.customer_email,
        name: bookingData.customer_name,
        phone: bookingData.customer_phone,
        metadata: {
          first_booking_id: booking.id
        }
      });
    }

    // 5. Crear Payment Intent con retry
    console.log('[create-booking-payment] Creando Payment Intent');
    const amountInCents = Math.round(Number(bookingData.total_price) * 100);
    let paymentIntent;
    try {
      paymentIntent = await retryWithBackoff(
        async () => {
          return await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'eur',
            customer: customer.id,
            metadata: {
              booking_id: booking.id,
              customer_email: bookingData.customer_email,
              customer_name: bookingData.customer_name
            },
            automatic_payment_methods: {
              enabled: true,
            }
          });
        },
        { label: 'stripe_create_payment_intent', maxAttempts: 3, baseDelayMs: 250 }
      );
    } catch (err) {
      return errorResponse(err, 502, corsHeaders);
    }

    // 6. Crear registro de pago con retry
    console.log('[create-booking-payment] Creando registro de pago');
    let payment;
    try {
      payment = await retryWithBackoff(
        async () => {
          const { data, error } = await supabase
            .from('payments')
            .insert([{
              booking_id: booking.id,
              amount: bookingData.total_price,
              customer_email: bookingData.customer_email,
              customer_name: bookingData.customer_name,
              stripe_customer_id: customer.id,
              stripe_payment_intent_id: paymentIntent.id,
              status: 'pending'
            }])
            .select()
            .single();

          if (error) {
            throw error;
          }

          return data;
        },
        { label: 'insert_payment_record', maxAttempts: 3, baseDelayMs: 250 }
      );
    } catch (err) {
      return errorResponse(err, 409, corsHeaders);
    }

    // 7. Actualizar la reserva con el ID del pago
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ payment_id: payment.id })
      .eq('id', booking.id);

    if (updateError) {
      console.error('[create-booking-payment] Error al actualizar reserva con ID de pago:', updateError);
      // No lanzamos error aquí ya que no es crítico
    }

    console.log('[create-booking-payment] Proceso completado exitosamente');
    return new Response(
      JSON.stringify({
        booking_id: booking.id,
        payment_id: payment.id,
        client_secret: paymentIntent.client_secret,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('[create-booking-payment] Error:', error);
    
    // Classify error to return proper HTTP status
    const anyErr = error as any;
    const code = anyErr?.code ?? anyErr?.error?.code;
    
    // DB conflicts should be 409, not 500
    if (code === "23505" || code === "23P01" || code === "23503" || code === "23514") {
      return errorResponse(error, 409, corsHeaders);
    }

    // Otherwise fallback to 500 for unexpected errors
    return errorResponse(error, 500, corsHeaders);
  }
});
