/**
 * SUPABASE EDGE FUNCTION - CREATE HOLD V3.1.2
 * 
 * Crea un PaymentIntent con captura manual (hold) a T-24h
 * 
 * FLUJO:
 * 1. Validar datos de entrada
 * 2. Crear PaymentIntent con capture_method=manual
 * 3. Confirmar con off_session=true
 * 4. Manejar requires_action si SCA es necesario
 * 
 * IMPORTANTE:
 * - Se ejecuta automáticamente a T-24h del pickup
 * - Si requires_action, enviar link de autenticación
 * - Deadline de 2h para autenticar
 * - Si no autentica, cancelar PI y liberar conductor
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
    console.log('[create-hold-v312] Iniciando proceso');

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

    // 2. Obtener datos del request
    const { booking_id, customer_id, payment_method_id, amount_cents, metadata } = await req.json();

    console.log('[create-hold-v312] Datos recibidos:', {
      booking_id,
      customer_id,
      payment_method_id,
      amount_cents,
    });

    // 3. Validaciones
    if (!booking_id || !customer_id || !payment_method_id || !amount_cents) {
      throw new Error('Missing required fields');
    }

    if (amount_cents <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    // 4. Crear PaymentIntent con captura manual
    console.log('[create-hold-v312] Creando PaymentIntent (hold):', {
      amount_cents,
      customer_id,
      payment_method_id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount_cents,
      currency: 'eur',
      customer: customer_id,
      payment_method: payment_method_id,
      capture_method: 'manual', // ✅ Captura manual (hold)
      confirm: true,             // ✅ Confirmar inmediatamente
      off_session: true,         // ✅ Sin presencia del cliente
      metadata: {
        ...metadata,
        payment_mode: 'flexible',
        hold_type: 'late_cancel_protection',
        pricing_version: 'v3.1.2',
      },
      description: `Hold - ${booking_id}`,
      statement_descriptor: 'PARIS ELITE',
      statement_descriptor_suffix: 'HOLD',
    });

    console.log('[create-hold-v312] PaymentIntent creado:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      status: paymentIntent.status,
      capture_method: paymentIntent.capture_method,
      requires_action: paymentIntent.status === 'requires_action',
    });

    // 5. Verificar si requiere acción (SCA)
    const requiresAction = paymentIntent.status === 'requires_action';
    
    if (requiresAction) {
      console.log('[create-hold-v312] ⚠️ Hold requiere autenticación SCA');
      
      // Calcular deadline (2 horas desde ahora)
      const deadline = new Date();
      deadline.setHours(deadline.getHours() + 2);
      
      // TODO: Enviar notificación al cliente con link de autenticación
      // El link debe incluir: paymentIntent.client_secret
      // Ejemplo: https://app.com/auth-hold?pi=${paymentIntent.id}&cs=${paymentIntent.client_secret}
    }

    // 6. Retornar respuesta
    return new Response(
      JSON.stringify({
        payment_intent_id: paymentIntent.id,
        amount_cents: paymentIntent.amount,
        status: paymentIntent.status,
        requires_action: requiresAction,
        client_secret: requiresAction ? paymentIntent.client_secret : undefined,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('[create-hold-v312] Error:', error);
    
    // Manejar errores específicos de Stripe
    let errorMessage = 'Unknown error';
    let errorCode = 'unknown';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Errores comunes de Stripe
      if (errorMessage.includes('authentication_required')) {
        errorCode = 'authentication_required';
      } else if (errorMessage.includes('card_declined')) {
        errorCode = 'card_declined';
      } else if (errorMessage.includes('insufficient_funds')) {
        errorCode = 'insufficient_funds';
      }
    }
    
    return new Response(
      JSON.stringify({
        error: errorMessage,
        error_code: errorCode,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

