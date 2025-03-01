
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13.10.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'true',
  'Vary': 'Origin'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    })
  }

  try {
    console.log('[create-payment-intent] Iniciando proceso')

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[create-payment-intent] Credenciales de Supabase no encontradas')
      throw new Error('Missing Supabase credentials')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      console.error('[create-payment-intent] STRIPE_SECRET_KEY no encontrada')
      throw new Error('STRIPE_SECRET_KEY not found')
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    // Parsear y validar datos de entrada
    console.log('[create-payment-intent] Parseando body de la request')
    const body = await req.json()
    const { amount, customerEmail, customerName, metadata } = body
    
    console.log('[create-payment-intent] Datos recibidos:', {
      amount,
      amountType: typeof amount,
      amountValue: amount,
      hasCustomerEmail: !!customerEmail,
      hasCustomerName: !!customerName,
      metadata
    })

    // Convertir el monto a centavos y validar
    const amountInCents = Math.round(Number(amount) * 100)
    console.log('[create-payment-intent] Monto convertido a centavos:', amountInCents)

    if (isNaN(amountInCents) || amountInCents <= 0) {
      console.error('[create-payment-intent] Monto inválido:', { 
        originalAmount: amount,
        convertedAmount: amountInCents 
      })
      throw new Error(`Invalid amount: ${amount}. Converted amount: ${amountInCents}`)
    }

    // Gestión del cliente de Stripe
    console.log('[create-payment-intent] Buscando cliente existente')
    let customer
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    })

    if (customers.data.length > 0) {
      customer = customers.data[0]
      console.log('[create-payment-intent] Cliente existente encontrado:', customer.id)
      if (customer.name !== customerName) {
        console.log('[create-payment-intent] Actualizando nombre del cliente')
        customer = await stripe.customers.update(customer.id, {
          name: customerName
        })
      }
    } else {
      console.log('[create-payment-intent] Creando nuevo cliente')
      customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: {
          first_booking_id: metadata?.booking_id
        }
      })
    }

    // Crear el payment intent con el monto en centavos
    console.log('[create-payment-intent] Creando Payment Intent:', {
      amountInCents,
      currency: 'eur',
      customerId: customer.id
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      customer: customer.id,
      metadata: {
        ...metadata,
        customer_email: customerEmail,
        customer_name: customerName,
        amount_original: amount.toString(),
        environment: Deno.env.get('NODE_ENV') || 'development'
      },
      description: `Reserva de transporte - ${metadata?.booking_id || 'N/A'}`,
      statement_descriptor: 'TRANSFER SERVICE',
      statement_descriptor_suffix: 'BOOKING',
      automatic_payment_methods: {
        enabled: true,
      }
    })

    console.log('[create-payment-intent] Payment Intent creado:', {
      id: paymentIntent.id,
      amountInCents: paymentIntent.amount,
      currency: paymentIntent.currency,
      hasClientSecret: !!paymentIntent.client_secret,
      status: paymentIntent.status
    })

    console.log('[create-payment-intent] Proceso completado exitosamente')
    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        customerId: customer.id
      }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        },
        status: 200,
      }
    )
  } catch (error) {
    console.error('[create-payment-intent] Error en el proceso:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
