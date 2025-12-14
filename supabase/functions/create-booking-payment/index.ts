
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13.10.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
}

// Función de retry con backoff exponencial
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
      lastError = error as Error;
      console.error(`[${operationName}] Error en intento ${attempt + 1}:`, error);

      // No reintentar en el último intento
      if (attempt === maxRetries - 1) {
        break;
      }

      // Calcular delay con backoff exponencial
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

    // 3. Crear la reserva con retry
    console.log('[create-booking-payment] Creando reserva');
    const booking = await retryWithBackoff(
      async () => {
        const { data, error } = await supabase
          .from('bookings')
          .insert([{
            ...bookingData,
            status: 'pending'
          }])
          .select()
          .single();

        if (error) {
          throw new Error(`Error al crear la reserva: ${error.message}`);
        }

        return data;
      },
      3,
      1000,
      'crear-reserva'
    );

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

    // 6. Crear registro de pago con retry
    console.log('[create-booking-payment] Creando registro de pago');
    const payment = await retryWithBackoff(
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
          throw new Error(`Error al crear el registro de pago: ${error.message}`);
        }

        return data;
      },
      3,
      1000,
      'crear-registro-pago'
    );

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
