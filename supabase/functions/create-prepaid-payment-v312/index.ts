/**
 * SUPABASE EDGE FUNCTION - CREATE PREPAID PAYMENT V3.1.2
 * 
 * Crea un PaymentIntent con captura automática para pagos prepaid
 * 
 * FLUJO:
 * 1. Validar datos de entrada
 * 2. Crear/obtener Stripe Customer
 * 3. Crear PaymentIntent con capture_method=automatic
 * 4. Retornar client_secret para frontend
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
    console.log('[create-prepaid-payment-v312] Iniciando proceso');

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
    const { booking_id, customer_email, customer_name, amount_cents, metadata } = await req.json();

    console.log('[create-prepaid-payment-v312] Datos recibidos:', {
      booking_id,
      customer_email,
      amount_cents,
      metadata,
    });

    // 3. Validaciones
    if (!booking_id || !customer_email || !customer_name || !amount_cents) {
      throw new Error('Missing required fields');
    }

    if (amount_cents <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    // 4. Crear o obtener Stripe Customer
    let customer: Stripe.Customer;
    const existingCustomers = await stripe.customers.list({
      email: customer_email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log('[create-prepaid-payment-v312] Cliente existente:', customer.id);
      
      // Actualizar nombre si cambió
      if (customer.name !== customer_name) {
        customer = await stripe.customers.update(customer.id, {
          name: customer_name,
        });
      }
    } else {
      console.log('[create-prepaid-payment-v312] Creando nuevo cliente');
      customer = await stripe.customers.create({
        email: customer_email,
        name: customer_name,
        metadata: {
          first_booking_id: booking_id,
          pricing_version: 'v3.1.2',
        },
      });
    }

    // 5. Crear PaymentIntent con captura automática
    console.log('[create-prepaid-payment-v312] Creando PaymentIntent:', {
      amount_cents,
      customer_id: customer.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount_cents,
      currency: 'eur',
      customer: customer.id,
      capture_method: 'automatic', // ✅ Captura automática para prepaid
      metadata: {
        ...metadata,
        customer_email,
        customer_name,
        payment_mode: 'prepaid',
        pricing_version: 'v3.1.2',
      },
      description: `Prepaid Booking - ${booking_id}`,
      statement_descriptor: 'PARIS ELITE',
      statement_descriptor_suffix: 'PREPAID',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('[create-prepaid-payment-v312] PaymentIntent creado:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      status: paymentIntent.status,
      capture_method: paymentIntent.capture_method,
    });

    // 6. Retornar respuesta
    return new Response(
      JSON.stringify({
        payment_intent_id: paymentIntent.id,
        client_secret: paymentIntent.client_secret,
        customer_id: customer.id,
        amount_cents: paymentIntent.amount,
        status: paymentIntent.status,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('[create-prepaid-payment-v312] Error:', error);
    
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

