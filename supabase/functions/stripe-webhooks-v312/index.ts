/**
 * SUPABASE EDGE FUNCTION - STRIPE WEBHOOKS V3.1.2
 * 
 * Maneja eventos de Stripe para el sistema V3.1.2
 * 
 * EVENTOS MANEJADOS:
 * - payment_intent.succeeded (prepaid)
 * - payment_intent.payment_failed (prepaid)
 * - setup_intent.succeeded (flexible)
 * - setup_intent.setup_failed (flexible)
 * - payment_intent.amount_capturable_updated (hold creado)
 * - charge.captured (hold capturado)
 * - payment_intent.canceled (hold cancelado)
 * 
 * IMPORTANTE:
 * - Verificar firma del webhook
 * - Idempotencia por event_id
 * - Actualizar estados en base de datos
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@13.10.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[stripe-webhooks-v312] Webhook recibido');

    // 1. Configurar clientes
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')!;
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET_V312')!;
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!stripeKey || !webhookSecret || !supabaseUrl || !supabaseKey) {
      throw new Error('Missing required environment variables');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 2. Verificar firma del webhook
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      throw new Error('No Stripe signature found');
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('[stripe-webhooks-v312] Error verificando firma:', err);
      throw new Error(`Webhook signature verification failed: ${err instanceof Error ? err.message : 'Unknown'}`);
    }

    console.log('[stripe-webhooks-v312] Evento verificado:', event.type, event.id);

    // 3. Verificar idempotencia
    const { data: existingEvent } = await supabase
      .from('stripe_webhook_events')
      .select('id')
      .eq('event_id', event.id)
      .single();

    if (existingEvent) {
      console.log('[stripe-webhooks-v312] Evento ya procesado (idempotencia):', event.id);
      return new Response(JSON.stringify({ received: true, duplicate: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // 4. Registrar evento
    await supabase.from('stripe_webhook_events').insert({
      event_id: event.id,
      event_type: event.type,
      processed_at: new Date().toISOString(),
    });

    // 5. Manejar eventos según tipo
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(supabase, paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentFailed(supabase, paymentIntent);
        break;
      }

      case 'setup_intent.succeeded': {
        const setupIntent = event.data.object as Stripe.SetupIntent;
        await handleSetupIntentSucceeded(supabase, setupIntent);
        break;
      }

      case 'setup_intent.setup_failed': {
        const setupIntent = event.data.object as Stripe.SetupIntent;
        await handleSetupIntentFailed(supabase, setupIntent);
        break;
      }

      case 'payment_intent.amount_capturable_updated': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handleHoldCreated(supabase, paymentIntent);
        break;
      }

      case 'charge.captured': {
        const charge = event.data.object as Stripe.Charge;
        await handleHoldCaptured(supabase, charge);
        break;
      }

      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentCanceled(supabase, paymentIntent);
        break;
      }

      default:
        console.log('[stripe-webhooks-v312] Evento no manejado:', event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('[stripe-webhooks-v312] Error:', error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

/**
 * HANDLER: payment_intent.succeeded (PREPAID)
 */
async function handlePaymentIntentSucceeded(supabase: any, paymentIntent: any) {
  console.log('[webhook] PaymentIntent succeeded:', paymentIntent.id);

  const bookingId = paymentIntent.metadata?.booking_id;
  if (!bookingId) {
    console.error('[webhook] No booking_id in metadata');
    return;
  }

  // Actualizar booking a confirmed
  const { error } = await supabase
    .from('bookings')
    .update({
      status: 'confirmed',
      payment_status: 'succeeded',
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('[webhook] Error actualizando booking:', error);
    throw error;
  }

  console.log('[webhook] Booking confirmado:', bookingId);
}

/**
 * HANDLER: payment_intent.payment_failed (PREPAID)
 */
async function handlePaymentIntentFailed(supabase: any, paymentIntent: any) {
  console.log('[webhook] PaymentIntent failed:', paymentIntent.id);

  const bookingId = paymentIntent.metadata?.booking_id;
  if (!bookingId) {
    console.error('[webhook] No booking_id in metadata');
    return;
  }

  // Actualizar booking a payment_failed
  const { error } = await supabase
    .from('bookings')
    .update({
      status: 'payment_failed',
      payment_status: 'failed',
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('[webhook] Error actualizando booking:', error);
    throw error;
  }

  console.log('[webhook] Booking marcado como payment_failed:', bookingId);

  // TODO: Enviar notificación al cliente
}

/**
 * HANDLER: setup_intent.succeeded (FLEXIBLE)
 */
async function handleSetupIntentSucceeded(supabase: any, setupIntent: any) {
  console.log('[webhook] SetupIntent succeeded:', setupIntent.id);

  const bookingId = setupIntent.metadata?.booking_id;
  if (!bookingId) {
    console.error('[webhook] No booking_id in metadata');
    return;
  }

  // Guardar payment_method_id
  const paymentMethodId = setupIntent.payment_method;

  const { error } = await supabase
    .from('bookings')
    .update({
      status: 'confirmed',
      payment_status: 'setup_succeeded',
      stripe_payment_method_id: paymentMethodId,
      flexible_sub_status: 'awaiting_hold',
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('[webhook] Error actualizando booking:', error);
    throw error;
  }

  console.log('[webhook] Booking flexible confirmado:', bookingId);
}

/**
 * HANDLER: setup_intent.setup_failed (FLEXIBLE)
 */
async function handleSetupIntentFailed(supabase: any, setupIntent: any) {
  console.log('[webhook] SetupIntent failed:', setupIntent.id);

  const bookingId = setupIntent.metadata?.booking_id;
  if (!bookingId) {
    console.error('[webhook] No booking_id in metadata');
    return;
  }

  const { error } = await supabase
    .from('bookings')
    .update({
      status: 'payment_failed',
      payment_status: 'setup_failed',
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('[webhook] Error actualizando booking:', error);
    throw error;
  }

  console.log('[webhook] Booking flexible fallido:', bookingId);

  // TODO: Enviar notificación al cliente
}

/**
 * HANDLER: payment_intent.amount_capturable_updated (HOLD CREADO)
 */
async function handleHoldCreated(supabase: any, paymentIntent: any) {
  console.log('[webhook] Hold created:', paymentIntent.id);

  const bookingId = paymentIntent.metadata?.booking_id;
  if (!bookingId) {
    console.error('[webhook] No booking_id in metadata');
    return;
  }

  const { error } = await supabase
    .from('bookings')
    .update({
      hold_payment_intent_id: paymentIntent.id,
      hold_status: 'confirmed',
      flexible_sub_status: 'hold_confirmed',
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('[webhook] Error actualizando booking:', error);
    throw error;
  }

  console.log('[webhook] Hold confirmado:', bookingId);
}

/**
 * HANDLER: charge.captured (HOLD CAPTURADO)
 */
async function handleHoldCaptured(supabase: any, charge: any) {
  console.log('[webhook] Hold captured:', charge.id);

  const paymentIntentId = charge.payment_intent;

  // Buscar booking por hold_payment_intent_id
  const { data: booking, error: findError } = await supabase
    .from('bookings')
    .select('id')
    .eq('hold_payment_intent_id', paymentIntentId)
    .single();

  if (findError || !booking) {
    console.error('[webhook] Booking no encontrado para hold:', paymentIntentId);
    return;
  }

  const { error } = await supabase
    .from('bookings')
    .update({
      hold_status: 'captured',
      hold_captured_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', booking.id);

  if (error) {
    console.error('[webhook] Error actualizando booking:', error);
    throw error;
  }

  console.log('[webhook] Hold capturado para booking:', booking.id);
}

/**
 * HANDLER: payment_intent.canceled (HOLD CANCELADO)
 */
async function handlePaymentIntentCanceled(supabase: any, paymentIntent: any) {
  console.log('[webhook] PaymentIntent canceled:', paymentIntent.id);

  const bookingId = paymentIntent.metadata?.booking_id;
  if (!bookingId) {
    // Puede ser un hold, buscar por hold_payment_intent_id
    const { data: booking } = await supabase
      .from('bookings')
      .select('id')
      .eq('hold_payment_intent_id', paymentIntent.id)
      .single();

    if (booking) {
      await supabase
        .from('bookings')
        .update({
          hold_status: 'cancelled',
          updated_at: new Date().toISOString(),
        })
        .eq('id', booking.id);

      console.log('[webhook] Hold cancelado para booking:', booking.id);
    }
    return;
  }

  const { error } = await supabase
    .from('bookings')
    .update({
      status: 'cancelled',
      payment_status: 'canceled',
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('[webhook] Error actualizando booking:', error);
    throw error;
  }

  console.log('[webhook] Booking cancelado:', bookingId);
}

