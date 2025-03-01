import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend@2.0.0'
import React from 'npm:react@18.2.0'
import { renderAsync } from 'npm:@react-email/render@0.0.7'
import { BookingConfirmationEmail } from './_templates/booking-confirmation.tsx'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  bookingId: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDateTime: string;
  passengers: number;
  vehicleType: string;
  totalPrice: number;
  flightNumber?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingEmailData = await req.json();
    console.log('[send-booking-emails] Datos de reserva recibidos:', bookingData);

    // Renderizar el email de confirmación
    const html = await renderAsync(
      React.createElement(BookingConfirmationEmail, bookingData)
    );

    // Enviar email al cliente
    const customerEmail = await resend.emails.send({
      from: 'Paris Elite Services <info@eliteparistransfer.com>',
      to: [bookingData.customerEmail],
      bcc: ['borisgeiner@gmail.com'], // Añadir tu email como BCC
      subject: `Confirmación de Reserva - Paris Elite Services`,
      html: html,
    });

    console.log('[send-booking-emails] Email enviado:', customerEmail);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Emails enviados correctamente',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('[send-booking-emails] Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
