/**
 * SUPABASE EDGE FUNCTION - CREATE FLEXIBLE SETUP V3.1.2
 * 
 * Crea un SetupIntent para guardar método de pago (flexible)
 * 
 * FLUJO:
 * 1. Validar datos de entrada
 * 2. Crear/obtener Stripe Customer
 * 3. Crear SetupIntent con usage=off_session
 * 4. Retornar client_secret para frontend
 * 
 * IMPORTANTE:
 * - No cobra nada, solo guarda la tarjeta
 * - El hold se creará a T-24h del pickup
 * - Maneja SCA (3D Secure) si es necesario
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
    console.log('[create-flexible-setup-v312] Iniciando proceso');

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
    const { booking_id, customer_email, customer_name, metadata } = await req.json();

    console.log('[create-flexible-setup-v312] Datos recibidos:', {
      booking_id,
      customer_email,
      metadata,
    });

    // 3. Validaciones
    if (!booking_id || !customer_email || !customer_name) {
      throw new Error('Missing required fields');
    }

    // 4. Crear o obtener Stripe Customer
    let customer: Stripe.Customer;
    const existingCustomers = await stripe.customers.list({
      email: customer_email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log('[create-flexible-setup-v312] Cliente existente:', customer.id);
      
      // Actualizar nombre si cambió
      if (customer.name !== customer_name) {
        customer = await stripe.customers.update(customer.id, {
          name: customer_name,
        });
      }
    } else {
      console.log('[create-flexible-setup-v312] Creando nuevo cliente');
      customer = await stripe.customers.create({
        email: customer_email,
        name: customer_name,
        metadata: {
          first_booking_id: booking_id,
          pricing_version: 'v3.1.2',
        },
      });
    }

    // 5. Crear SetupIntent para guardar método de pago
    console.log('[create-flexible-setup-v312] Creando SetupIntent:', {
      customer_id: customer.id,
    });

    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      usage: 'off_session', // ✅ Permite cobrar sin presencia del cliente
      metadata: {
        ...metadata,
        customer_email,
        customer_name,
        payment_mode: 'flexible',
        pricing_version: 'v3.1.2',
      },
      description: `Flexible Booking - ${booking_id}`,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('[create-flexible-setup-v312] SetupIntent creado:', {
      id: setupIntent.id,
      status: setupIntent.status,
      usage: setupIntent.usage,
    });

    // 6. Retornar respuesta
    return new Response(
      JSON.stringify({
        setup_intent_id: setupIntent.id,
        client_secret: setupIntent.client_secret,
        customer_id: customer.id,
        status: setupIntent.status,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('[create-flexible-setup-v312] Error:', error);
    
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

