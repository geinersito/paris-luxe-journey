
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13.10.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')!;
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient()
    });

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Obtener la firma del webhook
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      throw new Error('No Stripe signature found');
    }

    // Obtener el cuerpo de la petición como texto
    const body = await req.text();
    
    // Verificar el evento
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Error verificando webhook:', err);
      throw new Error(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    }

    console.log('Evento Stripe recibido:', event.type);

    // --- Idempotency: dedupe by event_id ---
    const { error: dedupeError } = await supabase
      .from('processed_stripe_events')
      .insert({
        event_id: event.id,
        event_type: event.type,
        livemode: event.livemode,
        payload: event.data.object,
        handler: 'stripe-webhooks',
      });

    if (dedupeError) {
      // 23505 = unique_violation → already processed
      if (dedupeError.code === '23505') {
        console.log('Event already processed (deduped):', event.id);
        return new Response(
          JSON.stringify({ ok: true, deduped: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
      // Any other DB error → 500 so Stripe retries
      console.error('Idempotency insert failed:', dedupeError);
      return new Response(
        JSON.stringify({ error: 'idempotency_check_failed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    // --- End idempotency ---

    // Manejar diferentes tipos de eventos
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log('PaymentIntent exitoso:', paymentIntent.id);

        // Actualizar el estado del pago en la base de datos
        const { error: paymentError } = await supabase
          .from('payments')
          .update({ status: 'completed' })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        if (paymentError) {
          console.error('Error actualizando pago:', paymentError);
          throw paymentError;
        }

        // Actualizar el estado de la reserva
        if (paymentIntent.metadata?.booking_id) {
          const { error: bookingError } = await supabase
            .from('bookings')
            .update({ status: 'confirmed' })
            .eq('id', paymentIntent.metadata.booking_id);

          if (bookingError) {
            console.error('Error actualizando reserva:', bookingError);
            throw bookingError;
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log('PaymentIntent fallido:', paymentIntent.id);

        // Actualizar el estado del pago
        const { error: paymentError } = await supabase
          .from('payments')
          .update({ 
            status: 'failed',
            error_message: paymentIntent.last_payment_error?.message
          })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        if (paymentError) {
          console.error('Error actualizando pago:', paymentError);
          throw paymentError;
        }

        // Actualizar el estado de la reserva
        if (paymentIntent.metadata?.booking_id) {
          const { error: bookingError } = await supabase
            .from('bookings')
            .update({ status: 'payment_failed' })
            .eq('id', paymentIntent.metadata.booking_id);

          if (bookingError) {
            console.error('Error actualizando reserva:', bookingError);
            throw bookingError;
          }
        }
        break;
      }

      case 'payment_intent.processing': {
        const paymentIntent = event.data.object;
        console.log('PaymentIntent procesando:', paymentIntent.id);

        // Actualizar el estado del pago
        const { error: paymentError } = await supabase
          .from('payments')
          .update({ status: 'processing' })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        if (paymentError) {
          console.error('Error actualizando pago:', paymentError);
          throw paymentError;
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error en webhook:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Error desconocido'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});
