import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY')
    
    if (!GOOGLE_MAPS_API_KEY) {
      throw new Error('Google Maps API key not configured')
    }

    // Validate that the API key exists and is properly formatted
    if (!GOOGLE_MAPS_API_KEY.startsWith('AIza')) {
      throw new Error('Invalid Google Maps API key format')
    }
    
    return new Response(
      JSON.stringify({ GOOGLE_MAPS_API_KEY }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error in get-map-key function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Please ensure the GOOGLE_MAPS_API_KEY is properly configured in Supabase Edge Function secrets'
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }
})