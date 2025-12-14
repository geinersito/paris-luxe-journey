import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestBody {
  email: string
  language: string
  honeypot?: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, language, honeypot }: RequestBody = await req.json()
    
    // ============================================================================
    // ANTI-SPAM: Honeypot check
    // ============================================================================
    if (honeypot && honeypot !== '') {
      // Bot detected - respond OK but don't process
      console.log('Bot detected via honeypot:', email)
      return new Response(
        JSON.stringify({ success: true, message: 'Registered' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ============================================================================
    // VALIDATION: Email format
    // ============================================================================
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      throw new Error('Invalid email address')
    }

    // Validate language
    const validLanguages = ['en', 'es', 'fr', 'pt']
    const lang = validLanguages.includes(language) ? language : 'en'

    // ============================================================================
    // SETUP: Supabase Admin Client
    // ============================================================================
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // ============================================================================
    // RATE LIMITING: Check IP
    // ============================================================================
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown'
    
    const { data: rateLimitData } = await supabaseAdmin
      .from('rate_limit_exit_popup')
      .select('*')
      .eq('ip_address', clientIP)
      .single()

    if (rateLimitData) {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
      const lastAttempt = new Date(rateLimitData.last_attempt)
      
      // Check if blocked
      if (rateLimitData.blocked_until && new Date(rateLimitData.blocked_until) > new Date()) {
        throw new Error('Too many requests. Please try again later.')
      }
      
      // Check rate limit (3 attempts per hour)
      if (rateLimitData.attempts >= 3 && lastAttempt > oneHourAgo) {
        // Block for 1 hour
        await supabaseAdmin
          .from('rate_limit_exit_popup')
          .update({
            blocked_until: new Date(Date.now() + 60 * 60 * 1000).toISOString()
          })
          .eq('ip_address', clientIP)
        
        throw new Error('Rate limit exceeded. Please try again in 1 hour.')
      }
      
      // Reset counter if more than 1 hour passed
      if (lastAttempt <= oneHourAgo) {
        await supabaseAdmin
          .from('rate_limit_exit_popup')
          .update({
            attempts: 1,
            last_attempt: new Date().toISOString(),
            blocked_until: null
          })
          .eq('ip_address', clientIP)
      } else {
        // Increment attempts
        await supabaseAdmin
          .from('rate_limit_exit_popup')
          .update({
            attempts: rateLimitData.attempts + 1,
            last_attempt: new Date().toISOString()
          })
          .eq('ip_address', clientIP)
      }
    } else {
      // First attempt from this IP
      await supabaseAdmin
        .from('rate_limit_exit_popup')
        .insert({
          ip_address: clientIP,
          attempts: 1,
          last_attempt: new Date().toISOString()
        })
    }

    // ============================================================================
    // CHECK: Email already registered
    // ============================================================================
    const { data: existingLead } = await supabaseAdmin
      .from('newsletter_leads')
      .select('*')
      .eq('email', email)
      .single()

    if (existingLead) {
      // Email already registered - resend existing coupon
      console.log('Email already registered, resending coupon:', email)
      
      await sendWelcomeEmail(email, existingLead.coupon_code, lang)
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email already registered. We resent your coupon code.',
          coupon: existingLead.coupon_code 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ============================================================================
    // GENERATE: Unique coupon code
    // ============================================================================
    const couponCode = `WELCOME10-${generateSecureCode(6)}`
    
    // Expiration: 7 days from now
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    // ============================================================================
    // INSERT: New lead
    // ============================================================================
    const { data: newLead, error: insertError } = await supabaseAdmin
      .from('newsletter_leads')
      .insert({
        email,
        coupon_code: couponCode,
        language: lang,
        expires_at: expiresAt.toISOString(),
        ip_address: clientIP,
        user_agent: req.headers.get('user-agent')
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      throw new Error('Failed to create coupon')
    }

    console.log('New lead created:', email, couponCode)

    // ============================================================================
    // SEND: Welcome email
    // ============================================================================
    await sendWelcomeEmail(email, couponCode, lang)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Coupon sent to your email',
        coupon: couponCode 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// ============================================================================
// HELPER: Generate secure random code
// ============================================================================
function generateSecureCode(length: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // No ambiguous chars (0,O,1,I)
  const randomBytes = new Uint8Array(length)
  crypto.getRandomValues(randomBytes)
  
  return Array.from(randomBytes)
    .map(byte => chars[byte % chars.length])
    .join('')
}

// ============================================================================
// HELPER: Send welcome email
// ============================================================================
async function sendWelcomeEmail(email: string, couponCode: string, language: string) {
  try {
    const { getEmailTemplate } = await import('./email-templates.ts')
    const { subject, html } = getEmailTemplate(couponCode, language)

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Paris Elite Services <no-reply@pariseliteservices.com>',
        to: [email],
        subject: subject,
        html: html
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Failed to send email:', error)
      throw new Error('Failed to send email')
    }

    const result = await response.json()
    console.log('Email sent successfully:', result)

  } catch (error) {
    console.error('Error sending email:', error)
    // Don't throw - we don't want to fail the whole request if email fails
  }
}

