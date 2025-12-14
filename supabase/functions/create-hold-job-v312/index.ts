/**
 * SUPABASE EDGE FUNCTION - CREATE HOLD JOB V3.1.2
 * 
 * Job programado que se ejecuta cada 60 minutos
 * Crea holds para bookings flexible a T-24h del pickup
 * 
 * LÓGICA:
 * 1. Seleccionar bookings flexible confirmados sin hold
 * 2. Filtrar los que están a <= 24h del pickup
 * 3. Para cada uno, crear PaymentIntent manual
 * 4. Manejar requires_action (SCA)
 * 5. Si no autentica en 2h, cancelar y liberar conductor
 * 
 * CRITERIOS DE SELECCIÓN:
 * - payment_mode = 'flexible'
 * - status = 'confirmed'
 * - hold_payment_intent_id IS NULL
 * - pickup_datetime <= NOW() + INTERVAL '24 hours'
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@13.10.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[create-hold-job-v312] Iniciando job');

    // 1. Configurar clientes
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')!;

    if (!supabaseUrl || !supabaseKey || !stripeKey) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // 2. Calcular timestamp de 24h desde ahora
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    console.log('[create-hold-job-v312] Buscando bookings para crear holds:', {
      now: now.toISOString(),
      in24Hours: in24Hours.toISOString(),
    });

    // 3. Seleccionar bookings que necesitan hold
    const { data: bookings, error: selectError } = await supabase
      .from('bookings')
      .select('*')
      .eq('payment_mode', 'flexible')
      .eq('status', 'confirmed')
      .is('hold_payment_intent_id', null)
      .lte('pickup_datetime', in24Hours.toISOString())
      .order('pickup_datetime', { ascending: true });

    if (selectError) {
      console.error('[create-hold-job-v312] Error seleccionando bookings:', selectError);
      throw selectError;
    }

    console.log('[create-hold-job-v312] Bookings encontrados:', bookings?.length || 0);

    if (!bookings || bookings.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          processed: 0,
          message: 'No bookings to process',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // 4. Procesar cada booking
    const results = {
      success: 0,
      failed: 0,
      requires_action: 0,
    };

    for (const booking of bookings) {
      try {
        console.log('[create-hold-job-v312] Procesando booking:', booking.id);

        // Validar que tenga payment_method_id
        if (!booking.stripe_payment_method_id) {
          console.error('[create-hold-job-v312] Booking sin payment_method_id:', booking.id);
          results.failed++;
          continue;
        }

        // Crear PaymentIntent (hold)
        const paymentIntent = await stripe.paymentIntents.create({
          amount: booking.hold_amount_cents,
          currency: 'eur',
          customer: booking.stripe_customer_id,
          payment_method: booking.stripe_payment_method_id,
          capture_method: 'manual',
          confirm: true,
          off_session: true,
          metadata: {
            booking_id: booking.id,
            route_key: booking.route_key,
            vehicle_type: booking.vehicle_type,
            payment_mode: 'flexible',
            hold_type: 'late_cancel_protection',
            pricing_version: 'v3.1.2',
          },
          description: `Hold - ${booking.id}`,
          statement_descriptor: 'PARIS ELITE',
          statement_descriptor_suffix: 'HOLD',
        });

        console.log('[create-hold-job-v312] Hold creado:', {
          booking_id: booking.id,
          payment_intent_id: paymentIntent.id,
          status: paymentIntent.status,
        });

        // Actualizar booking
        const updateData: any = {
          hold_payment_intent_id: paymentIntent.id,
          updated_at: new Date().toISOString(),
        };

        if (paymentIntent.status === 'requires_action') {
          // Requiere autenticación SCA
          const deadline = new Date();
          deadline.setHours(deadline.getHours() + 2);

          updateData.flexible_sub_status = 'hold_requires_action';
          updateData.hold_status = 'requires_action';
          updateData.hold_auth_deadline = deadline.toISOString();

          results.requires_action++;

          // TODO: Enviar notificación al cliente con link de autenticación
          console.log('[create-hold-job-v312] ⚠️ Hold requiere autenticación:', {
            booking_id: booking.id,
            deadline: deadline.toISOString(),
            client_secret: paymentIntent.client_secret,
          });
        } else {
          updateData.flexible_sub_status = 'hold_confirmed';
          updateData.hold_status = 'confirmed';
          results.success++;
        }

        await supabase
          .from('bookings')
          .update(updateData)
          .eq('id', booking.id);

      } catch (error) {
        console.error('[create-hold-job-v312] Error procesando booking:', booking.id, error);
        results.failed++;
      }
    }

    console.log('[create-hold-job-v312] Job completado:', results);

    return new Response(
      JSON.stringify({
        success: true,
        processed: bookings.length,
        results,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('[create-hold-job-v312] Error:', error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

