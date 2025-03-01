import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from 'npm:resend@2.0.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      throw new Error("RESEND_API_KEY no está configurada");
    }

    const resend = new Resend(apiKey);
    const body = await req.json();
    console.log("Request body:", body);

    // Configuración común para todos los emails
    const FROM_EMAIL = "Paris Elite Services <info@eliteparistransfer.com>";

    // Enviar email usando el SDK de Resend
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: body.to,
      subject: body.subject,
      html: body.html
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error detallado:", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    
    return new Response(
      JSON.stringify({
        success: false,
        error: {
          message: error.message,
          name: error.name,
          details: error
        }
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
};

serve(handler);
