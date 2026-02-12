/**
 * STRIPE WEBHOOKS V3.1.2 - INTEGRATED VERSION
 * 
 * Versión integrada con:
 * - State Machine para transiciones de estado
 * - Notification Service para envío de notificaciones
 * - Logging completo de transiciones
 * 
 * EVENTOS MANEJADOS:
 * 1. payment_intent.succeeded → PAYMENT_SUCCEEDED
 * 2. payment_intent.payment_failed → PAYMENT_FAILED
 * 3. setup_intent.succeeded → SETUP_SUCCEEDED
 * 4. setup_intent.setup_failed → SETUP_FAILED
 * 5. payment_intent.amount_capturable_updated → HOLD_CREATED
 * 6. charge.captured → HOLD_CAPTURED
 * 7. payment_intent.canceled → HOLD_CANCELLED
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@13.10.0';

// Importar helpers de state machine (simulado para Deno)
interface TransitionResult {
  success: boolean;
  from_state: string;
  to_state: string;
  event: string;
  error?: string;
  metadata?: any;
}

// Mapeo de eventos Stripe a eventos de la máquina de estados
const STRIPE_TO_STATE_EVENT: Record<string, string> = {
  'payment_intent.succeeded': 'PAYMENT_SUCCEEDED',
  'payment_intent.payment_failed': 'PAYMENT_FAILED',
  'setup_intent.succeeded': 'SETUP_SUCCEEDED',
  'setup_intent.setup_failed': 'SETUP_FAILED',
  'payment_intent.amount_capturable_updated': 'HOLD_CREATED',
  'charge.captured': 'HOLD_CAPTURED',
  'payment_intent.canceled': 'HOLD_CANCELLED',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

const deprecatedHeaders = {
  ...corsHeaders,
  'X-Webhook-Deprecated': 'true',
  'X-Webhook-Canonical': '/functions/v1/stripe-webhooks',
  'Content-Type': 'application/json',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[Webhook] Processing incoming webhook...');

    // 1. Configurar clientes
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
    });
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // 2. Verificar firma del webhook
    const signature = req.headers.get('stripe-signature')!;
    const body = await req.text();
    
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET_V312')!
    );

    console.log(`[Webhook] Event type: ${event.type}, ID: ${event.id}`);

    // DEPRECATION WARNING
    console.warn('[DEPRECATED_WEBHOOK_HIT]', JSON.stringify({
      handler: 'stripe-webhooks-v312-integrated',
      eventId: event.id,
      eventType: event.type,
      livemode: event.livemode,
      timestamp: new Date().toISOString(),
    }));

    // 3. Verificar idempotencia
    const { data: existingEvent } = await supabase
      .from('stripe_webhook_events')
      .select('id')
      .eq('event_id', event.id)
      .single();

    if (existingEvent) {
      console.log(`[Webhook] Event ${event.id} already processed (idempotent)`);
      return new Response(JSON.stringify({ 
        ok: true,
        received: true, 
        idempotent: true,
        deprecated: true,
        canonical: '/functions/v1/stripe-webhooks',
      }), {
        headers: deprecatedHeaders,
        status: 200,
      });
    }

    // 4. Guardar evento para idempotencia
    await supabase.from('stripe_webhook_events').insert({
      event_id: event.id,
      event_type: event.type,
      event_data: event.data.object,
      processed_at: new Date().toISOString(),
    });

    // 5. Obtener booking_id del metadata
    const metadata = (event.data.object as any).metadata;
    const bookingId = metadata?.booking_id;

    if (!bookingId) {
      console.warn('[Webhook] No booking_id in metadata');
      return new Response(JSON.stringify({ 
        ok: true,
        received: true, 
        warning: 'No booking_id',
        deprecated: true,
        canonical: '/functions/v1/stripe-webhooks',
      }), {
        headers: deprecatedHeaders,
        status: 200,
      });
    }

    // 6. Obtener booking actual
    const { data: booking, error: bookingError } = await supabase
      .from('bookings_v312')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      console.error('[Webhook] Booking not found:', bookingId);
      throw new Error(`Booking not found: ${bookingId}`);
    }

    console.log(`[Webhook] Current booking status: ${booking.status}`);

    // 7. Mapear evento de Stripe a evento de state machine
    const stateEvent = STRIPE_TO_STATE_EVENT[event.type];
    
    if (!stateEvent) {
      console.warn(`[Webhook] Unhandled event type: ${event.type}`);
      return new Response(JSON.stringify({ received: true, unhandled: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 8. Ejecutar transición de estado
    const transition = await executeStateTransition(
      supabase,
      booking,
      stateEvent,
      event
    );

    if (!transition.success) {
      console.error('[Webhook] State transition failed:', transition.error);
      // No lanzar error para no reintentar el webhook
    }

    // 9. Enviar notificación
    await sendNotificationForEvent(supabase, booking, stateEvent, event);

    console.log('[Webhook] Processing completed successfully');

    return new Response(
      JSON.stringify({
        ok: true,
        received: true,
        booking_id: bookingId,
        transition,
        deprecated: true,
        canonical: '/functions/v1/stripe-webhooks',
      }),
      {
        headers: deprecatedHeaders,
        status: 200,
      }
    );

  } catch (error) {
    console.error('[Webhook] Error:', error);

    return new Response(
      JSON.stringify({
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        deprecated: true,
        canonical: '/functions/v1/stripe-webhooks',
      }),
      {
        headers: deprecatedHeaders,
        status: 400,
      }
    );
  }
});

/**
 * Ejecutar transición de estado con validaciones
 */
async function executeStateTransition(
  supabase: any,
  booking: any,
  event: string,
  stripeEvent: any
): Promise<TransitionResult> {
  const currentState = booking.status;

  console.log(`[State] Attempting transition: ${currentState} -> ${event}`);

  // Definir transiciones válidas (simplificado)
  const validTransitions: Record<string, Record<string, string>> = {
    pending_payment: {
      PAYMENT_SUCCEEDED: 'confirmed',
      PAYMENT_FAILED: 'failed',
      SETUP_SUCCEEDED: 'confirmed',
      SETUP_FAILED: 'failed',
    },
    confirmed: {
      HOLD_CREATED: 'hold_pending',
    },
    hold_pending: {
      HOLD_CONFIRMED: 'hold_confirmed',
      HOLD_FAILED: 'failed',
    },
    hold_confirmed: {
      HOLD_CANCELLED: 'confirmed',
    },
    in_progress: {
      HOLD_CAPTURED: 'cancelled',
    },
  };

  const nextState = validTransitions[currentState]?.[event];

  if (!nextState) {
    return {
      success: false,
      from_state: currentState,
      to_state: currentState,
      event,
      error: `Invalid transition: ${currentState} -> ${event}`,
    };
  }

  // Actualizar estado en base de datos
  const { error: updateError } = await supabase
    .from('bookings_v312')
    .update({
      status: nextState,
      updated_at: new Date().toISOString(),
    })
    .eq('id', booking.id);

  if (updateError) {
    console.error('[State] Update error:', updateError);
    return {
      success: false,
      from_state: currentState,
      to_state: currentState,
      event,
      error: updateError.message,
    };
  }

  // Registrar transición en logs
  await supabase.from('booking_state_logs').insert({
    booking_id: booking.id,
    from_state: currentState,
    to_state: nextState,
    event,
    metadata: {
      stripe_event_id: stripeEvent.id,
      stripe_event_type: stripeEvent.type,
      timestamp: new Date().toISOString(),
    },
  });

  console.log(`[State] Transition successful: ${currentState} -> ${nextState}`);

  return {
    success: true,
    from_state: currentState,
    to_state: nextState,
    event,
  };
}

/**
 * Enviar notificación según el evento
 */
async function sendNotificationForEvent(
  supabase: any,
  booking: any,
  event: string,
  stripeEvent: any
): Promise<void> {
  console.log(`[Notification] Preparing notification for event: ${event}`);

  // Obtener datos del cliente
  const customerEmail = booking.customer_email;
  const customerName = booking.customer_name;
  const customerPhone = booking.customer_phone;

  if (!customerEmail && !customerPhone) {
    console.warn('[Notification] No contact info for customer');
    return;
  }

  // Preparar contexto para el template
  const context = {
    booking_id: booking.id,
    confirmation_number: booking.confirmation_number,
    route: booking.route_key,
    pickup_datetime: booking.pickup_datetime,
    pickup_location: booking.pickup_location,
    dropoff_location: booking.dropoff_location,
    vehicle_type: booking.vehicle_type,
    price: formatPrice(booking.total_price_cents),
    hold_amount: formatPrice(booking.hold_amount_cents),
  };

  // TODO: Implementar envío real de notificaciones
  // Por ahora solo logging
  console.log('[Notification] Would send notification:', {
    event,
    to: customerEmail || customerPhone,
    context,
  });

  // Registrar notificación en base de datos
  await supabase.from('notifications').insert({
    booking_id: booking.id,
    event,
    channel: customerEmail ? 'email' : 'sms',
    recipient: customerEmail || customerPhone,
    status: 'pending',
    context,
    created_at: new Date().toISOString(),
  });
}

/**
 * Formatear precio en céntimos a string
 */
function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

