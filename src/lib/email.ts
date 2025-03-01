import { supabase } from '@/integrations/supabase/client';

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    console.log('Intentando enviar email...');
    
    const response = await fetch('https://corsproxy.io/?https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to,
        subject,
        html
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error response:', {
        status: response.status,
        statusText: response.statusText,
        data
      });
      return { success: false, error: data };
    }

    console.log('Email enviado exitosamente:', data);
    return { success: true, data };
  } catch (error: any) {
    console.error('Error detallado:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    return { success: false, error };
  }
}
