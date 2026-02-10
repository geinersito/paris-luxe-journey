import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13.10.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
}

const CONFLICT_CODES = new Set(['23P01', '23505']);
const CONFLICT_MARKERS = [
  'bookings_no_overlap_per_vehicle',
  'bookings_unique_vehicle_pickup_active',
  'exclusion constraint',
  'duplicate key',
];
const TRANSIENT_MARKERS = [
  'timeout',
  'timed out',
  'network',
  'fetch failed',
  'econnreset',
  'etimedout',
  'too many requests',
  'rate limit',
  'temporary',
  'temporarily unavailable',
  'service unavailable',
  'gateway timeout',
  'bad gateway',
];

function toError(err: unknown): Error {
  if (err instanceof Error) {
    return err;
  }

  if (err && typeof err === 'object') {
    const record = err as Record<string, unknown>;
    if (typeof record.message === 'string') {
      return new Error(record.message);
    }
    if (typeof record.error === 'string') {
      return new Error(record.error);
    }
  }

  return new Error(String(err));
}

function extractErrorSnapshot(err: unknown, bodyText: string = ''): {
  messageText: string;
  codeText: string;
  statusCode: number | null;
} {
  const messageParts: string[] = [];
  const codeParts: string[] = [];
  let statusCode: number | null = null;

  if (bodyText) {
    messageParts.push(bodyText);
  }

  if (err instanceof Error) {
    messageParts.push(err.message);
  } else if (typeof err === 'string') {
    messageParts.push(err);
  }

  if (err && typeof err === 'object') {
    const record = err as Record<string, unknown>;
    const nestedError = record.error && typeof record.error === 'object'
      ? (record.error as Record<string, unknown>)
      : null;
    const nestedDetails = record.details && typeof record.details === 'object'
      ? (record.details as Record<string, unknown>)
      : null;

    const maybeMessages = [
      record.message,
      record.error,
      nestedError?.message,
      nestedDetails?.message,
      nestedDetails?.detail,
      record.details,
      record.hint,
    ];
    for (const value of maybeMessages) {
      if (typeof value === 'string' && value.length > 0) {
        messageParts.push(value);
      }
    }

    const maybeCodes = [
      record.code,
      nestedError?.code,
      nestedDetails?.code,
      record.sqlstate,
    ];
    for (const value of maybeCodes) {
      if (typeof value === 'string' && value.length > 0) {
        codeParts.push(value.toUpperCase());
      }
    }

    const maybeStatus = [record.status, record.statusCode];
    for (const value of maybeStatus) {
      if (typeof value === 'number') {
        statusCode = value;
        break;
      }
    }
  }

  return {
    messageText: messageParts.join(' | ').toLowerCase(),
    codeText: codeParts.join(' | '),
    statusCode,
  };
}

function isConflictError(err: unknown, bodyText: string = ''): boolean {
  const snapshot = extractErrorSnapshot(err, bodyText);

  if (
    [...CONFLICT_CODES].some((code) =>
      snapshot.codeText.includes(code) || snapshot.messageText.includes(code.toLowerCase())
    )
  ) {
    return true;
  }

  return CONFLICT_MARKERS.some((marker) => snapshot.messageText.includes(marker));
}

function isTransientError(err: unknown, bodyText: string = ''): boolean {
  const snapshot = extractErrorSnapshot(err, bodyText);

  if (snapshot.statusCode === 429) {
    return true;
  }
  if (typeof snapshot.statusCode === 'number' && snapshot.statusCode >= 500) {
    return true;
  }
  if (snapshot.messageText.includes('status code 429')) {
    return true;
  }
  if (/status code 5\d\d/.test(snapshot.messageText)) {
    return true;
  }

  return TRANSIENT_MARKERS.some((marker) => snapshot.messageText.includes(marker));
}

function shouldRetry(err: unknown, attempt: number, maxRetries: number): boolean {
  if (attempt >= maxRetries - 1) {
    return false;
  }

  if (isConflictError(err)) {
    return false;
  }

  return isTransientError(err);
}

// Retry with exponential backoff for transient errors only.
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000,
  operationName: string = 'operation'
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`[${operationName}] Intento ${attempt + 1}/${maxRetries}`);
      return await fn();
    } catch (error) {
      lastError = toError(error);
      console.error(`[${operationName}] Error en intento ${attempt + 1}: ${lastError.message}`);

      if (isConflictError(error)) {
        console.error(`[${operationName}] conflict detected, no retry`);
        throw lastError;
      }

      if (!shouldRetry(error, attempt, maxRetries)) {
        throw lastError;
      }

      const delay = baseDelay * Math.pow(2, attempt);
      console.log(`[${operationName}] Reintentando en ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error(`${operationName} falló después de ${maxRetries} intentos: ${lastError?.message}`);
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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    console.log('[create-booking-payment] Iniciando proceso');

    // 1. Configure clients.
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient()
    });

    // 2. Parse and validate input.
    const { bookingData } = await req.json() as { bookingData: BookingData };
    console.log('[create-booking-payment] Datos recibidos:', { bookingData });

    if (!bookingData.total_price || bookingData.total_price <= 0) {
      throw new Error('El precio total debe ser mayor que 0');
    }

    // 3. Create booking with retry policy.
    console.log('[create-booking-payment] Creando reserva');
    const booking = await retryWithBackoff(
      async () => {
        const bookingInsertPayload = {
          id: crypto.randomUUID(),
          ...bookingData,
          status: 'pending',
          payment_status: 'pending',
        };

        const { data, error } = await supabase
          .from('bookings')
          .insert([bookingInsertPayload])
          .select()
          .single();

        if (error) {
          const enrichedError = new Error(`Error al crear la reserva: ${error.message}`);
          (enrichedError as Error & { code?: string; details?: string; hint?: string }).code = error.code;
          (enrichedError as Error & { code?: string; details?: string; hint?: string }).details = error.details;
          (enrichedError as Error & { code?: string; details?: string; hint?: string }).hint = error.hint;
          throw enrichedError;
        }

        return data;
      },
      3,
      1000,
      'crear-reserva'
    );

    // 4. Find/create Stripe customer.
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

    // 5. Create PaymentIntent with retry policy.
    console.log('[create-booking-payment] Creando Payment Intent');
    const amountInCents = Math.round(Number(bookingData.total_price) * 100);
    const paymentIntent = await retryWithBackoff(
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
      3,
      1000,
      'crear-payment-intent'
    );

    // 6. Persist payment metadata in booking.
    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        payment_intent_id: paymentIntent.id,
        payment_status: 'pending',
      })
      .eq('id', booking.id);

    if (updateError) {
      console.error('[create-booking-payment] Error al actualizar reserva con PaymentIntent:', updateError);
    }

    console.log('[create-booking-payment] Proceso completado exitosamente');
    return new Response(
      JSON.stringify({
        booking_id: booking.id,
        payment_id: paymentIntent.id,
        client_secret: paymentIntent.client_secret,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('[create-booking-payment] Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Error desconocido',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});