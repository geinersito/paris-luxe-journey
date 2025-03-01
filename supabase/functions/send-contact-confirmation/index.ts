import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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

    let emailConfig;
    if ('bookingId' in body) {
      // Caso de confirmación de reserva
      const { customerName, customerEmail, pickupDateTime, pickupLocation, dropoffLocation, vehicleType, totalPrice } = body;
      emailConfig = {
        to: customerEmail,
        subject: "Confirmación de reserva - Paris Elite Services",
        html: `
          <h1>Gracias por tu reserva, ${customerName || 'cliente'}!</h1>
          <p>Los detalles de tu reserva son:</p>
          <ul>
            <li><strong>Fecha y hora de recogida:</strong> ${pickupDateTime}</li>
            <li><strong>Lugar de recogida:</strong> ${pickupLocation}</li>
            <li><strong>Destino:</strong> ${dropoffLocation}</li>
            <li><strong>Vehículo:</strong> ${vehicleType}</li>
            <li><strong>Precio total:</strong> €${totalPrice}</li>
          </ul>
          <p>Saludos cordiales,<br>El equipo de Paris Elite Services</p>
        `
      };
    } else {
      // Caso de formulario de contacto
      const { name, email, message } = body;
      if (!email) {
        throw new Error("Email es requerido");
      }
      emailConfig = {
        to: email,
        subject: "Hemos recibido tu mensaje - Paris Elite Services",
        html: `
          <h1>Gracias por contactarnos, ${name || 'cliente'}!</h1>
          <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
          <p>Tu mensaje:</p>
          <blockquote style="padding: 10px; border-left: 4px solid #ccc; margin: 10px 0;">
            ${message || ''}
          </blockquote>
          <p>Saludos cordiales,<br>El equipo de Paris Elite Services</p>
        `
      };
    }

    // Enviar email usando el dominio verificado
    console.log("Configuración de email:", {
      from: FROM_EMAIL,
      to: emailConfig.to,
      subject: emailConfig.subject
    });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      ...emailConfig
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
