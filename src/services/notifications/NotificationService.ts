/**
 * NOTIFICATION SERVICE V3.1.2
 * 
 * Servicio centralizado para enviar notificaciones por:
 * - WhatsApp (Twilio)
 * - SMS (Twilio)
 * - Email (SendGrid)
 * 
 * Incluye templates para todos los eventos del sistema
 */

import type { BookingEvent } from '../state-machine/BookingStateMachine';

export type NotificationChannel = 'whatsapp' | 'sms' | 'email';

export interface NotificationRecipient {
  name: string;
  phone?: string;
  email?: string;
  language?: 'en' | 'es' | 'fr' | 'pt';
}

export interface NotificationContext {
  booking_id: string;
  confirmation_number?: string;
  route?: string;
  pickup_datetime?: string;
  pickup_location?: string;
  dropoff_location?: string;
  vehicle_type?: string;
  price?: string;
  partner_name?: string;
  partner_phone?: string;
  hold_amount?: string;
  sca_deadline?: string;
  payment_link?: string;
  [key: string]: any;
}

export interface NotificationTemplate {
  subject?: string;
  body: string;
  channels: NotificationChannel[];
}

/**
 * Templates de notificaciones por evento
 */
export const NOTIFICATION_TEMPLATES: Record<BookingEvent, NotificationTemplate> = {
  PAYMENT_SUCCEEDED: {
    subject: '✅ Booking Confirmed - Paris Elite Services',
    body: `Hello {{name}},

Your booking has been confirmed! 🎉

Confirmation #: {{confirmation_number}}
Route: {{route}}
Date & Time: {{pickup_datetime}}
Vehicle: {{vehicle_type}}
Amount Paid: {{price}}

We'll send you driver details 24h before your pickup.

Need help? Reply to this message.

Paris Elite Services`,
    channels: ['whatsapp', 'email'],
  },

  SETUP_SUCCEEDED: {
    subject: '✅ Booking Confirmed - Paris Elite Services',
    body: `Hello {{name}},

Your booking has been confirmed! 🎉

Confirmation #: {{confirmation_number}}
Route: {{route}}
Date & Time: {{pickup_datetime}}
Vehicle: {{vehicle_type}}
Payment: {{price}} to driver (cash/card)

A hold of {{hold_amount}} will be placed 24h before pickup.

Paris Elite Services`,
    channels: ['whatsapp', 'email'],
  },

  PAYMENT_FAILED: {
    subject: '❌ Payment Failed - Paris Elite Services',
    body: `Hello {{name}},

Unfortunately, your payment could not be processed.

Booking: {{confirmation_number}}
Route: {{route}}

Please try again or contact us for assistance.

Paris Elite Services`,
    channels: ['email', 'sms'],
  },

  SETUP_FAILED: {
    subject: '❌ Card Verification Failed - Paris Elite Services',
    body: `Hello {{name}},

We couldn't verify your payment method.

Booking: {{confirmation_number}}

Please update your payment details to confirm your booking.

Paris Elite Services`,
    channels: ['email', 'sms'],
  },

  PARTNER_ASSIGNED: {
    subject: '👤 Driver Assigned - Paris Elite Services',
    body: `Hello {{name}},

Your driver has been assigned! 🚗

Driver: {{partner_name}}
Phone: {{partner_phone}}
Vehicle: {{vehicle_type}}

Pickup: {{pickup_datetime}}
Location: {{pickup_location}}

Your driver will contact you before pickup.

Paris Elite Services`,
    channels: ['whatsapp', 'email'],
  },

  HOLD_CREATED: {
    subject: '🔒 Payment Hold Created - Action Required',
    body: `Hello {{name}},

A hold of {{hold_amount}} has been placed on your card.

⚠️ ACTION REQUIRED within 2 hours:
Please authenticate this hold to confirm your booking.

{{payment_link}}

This hold will be released after your service.

Paris Elite Services`,
    channels: ['whatsapp', 'sms', 'email'],
  },

  HOLD_CONFIRMED: {
    subject: '✅ Hold Confirmed - Paris Elite Services',
    body: `Hello {{name}},

Your payment hold has been confirmed.

Hold Amount: {{hold_amount}}
Pickup: {{pickup_datetime}}

This hold will be released after your service.
You'll pay {{price}} to the driver.

Paris Elite Services`,
    channels: ['whatsapp', 'email'],
  },

  HOLD_FAILED: {
    subject: '❌ Hold Authentication Failed',
    body: `Hello {{name}},

We couldn't authenticate your payment hold.

⚠️ Your booking may be cancelled if not resolved.

Please contact us immediately:
{{support_phone}}

Paris Elite Services`,
    channels: ['whatsapp', 'sms', 'email'],
  },

  SERVICE_STARTED: {
    subject: '🚗 Service Started - Paris Elite Services',
    body: `Hello {{name}},

Your service has started!

Driver: {{partner_name}}
Vehicle: {{vehicle_type}}

Enjoy your ride! 🌟

Paris Elite Services`,
    channels: ['whatsapp'],
  },

  SERVICE_COMPLETED: {
    subject: '⭐ Thank You - Paris Elite Services',
    body: `Hello {{name}},

Thank you for choosing Paris Elite Services!

We hope you enjoyed your ride. 🌟

Please rate your experience:
{{rating_link}}

See you next time!

Paris Elite Services`,
    channels: ['whatsapp', 'email'],
  },

  CANCEL_REQUESTED: {
    subject: '❌ Booking Cancelled - Paris Elite Services',
    body: `Hello {{name}},

Your booking has been cancelled.

Confirmation #: {{confirmation_number}}
Route: {{route}}

{{cancellation_details}}

Paris Elite Services`,
    channels: ['email', 'sms'],
  },

  HOLD_CAPTURED: {
    subject: '💳 Hold Captured - Paris Elite Services',
    body: `Hello {{name}},

The hold on your card has been captured due to late cancellation.

Amount: {{hold_amount}}
Reason: {{cancellation_reason}}

Paris Elite Services`,
    channels: ['email'],
  },

  HOLD_CANCELLED: {
    subject: '✅ Hold Released - Paris Elite Services',
    body: `Hello {{name}},

The hold on your card has been released.

Amount: {{hold_amount}}

Thank you for using Paris Elite Services!`,
    channels: ['email'],
  },
};

/**
 * Reemplazar variables en template
 */
function replaceTemplateVariables(template: string, context: NotificationContext): string {
  let result = template;

  Object.keys(context).forEach((key) => {
    const value = context[key] || '';
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  });

  return result;
}

/**
 * Enviar notificación por WhatsApp (Twilio)
 */
async function sendWhatsApp(
  recipient: NotificationRecipient,
  message: string
): Promise<boolean> {
  const TWILIO_ACCOUNT_SID = import.meta.env?.VITE_TWILIO_ACCOUNT_SID;
  const TWILIO_AUTH_TOKEN = import.meta.env?.VITE_TWILIO_AUTH_TOKEN;
  const TWILIO_WHATSAPP_NUMBER = import.meta.env?.VITE_TWILIO_WHATSAPP_NUMBER;

  if (!TWILIO_ACCOUNT_SID || !recipient.phone) {
    console.warn('[WhatsApp] Missing credentials or phone number');
    return false;
  }

  try {
    // TODO: Implementar llamada a Twilio API
    console.log('[WhatsApp] Sending to:', recipient.phone);
    console.log('[WhatsApp] Message:', message);

    return true;
  } catch (error) {
    console.error('[WhatsApp] Error:', error);
    return false;
  }
}

/**
 * Enviar notificación por SMS (Twilio)
 */
async function sendSMS(
  recipient: NotificationRecipient,
  message: string
): Promise<boolean> {
  const TWILIO_ACCOUNT_SID = import.meta.env?.VITE_TWILIO_ACCOUNT_SID;
  const TWILIO_AUTH_TOKEN = import.meta.env?.VITE_TWILIO_AUTH_TOKEN;
  const TWILIO_SMS_NUMBER = import.meta.env?.VITE_TWILIO_SMS_NUMBER;

  if (!TWILIO_ACCOUNT_SID || !recipient.phone) {
    console.warn('[SMS] Missing credentials or phone number');
    return false;
  }

  try {
    // TODO: Implementar llamada a Twilio API
    console.log('[SMS] Sending to:', recipient.phone);
    console.log('[SMS] Message:', message);

    return true;
  } catch (error) {
    console.error('[SMS] Error:', error);
    return false;
  }
}

/**
 * Enviar notificación por Email (SendGrid)
 */
async function sendEmail(
  recipient: NotificationRecipient,
  subject: string,
  body: string
): Promise<boolean> {
  const SENDGRID_API_KEY = import.meta.env?.VITE_SENDGRID_API_KEY;
  const SENDGRID_FROM_EMAIL = import.meta.env?.VITE_SENDGRID_FROM_EMAIL;

  if (!SENDGRID_API_KEY || !recipient.email) {
    console.warn('[Email] Missing credentials or email address');
    return false;
  }

  try {
    // TODO: Implementar llamada a SendGrid API
    console.log('[Email] Sending to:', recipient.email);
    console.log('[Email] Subject:', subject);
    console.log('[Email] Body:', body);

    return true;
  } catch (error) {
    console.error('[Email] Error:', error);
    return false;
  }
}

/**
 * Enviar notificación para un evento
 */
export async function sendNotification(
  event: BookingEvent,
  recipient: NotificationRecipient,
  context: NotificationContext,
  channels?: NotificationChannel[]
): Promise<{ success: boolean; channels: Record<NotificationChannel, boolean> }> {
  const template = NOTIFICATION_TEMPLATES[event];

  if (!template) {
    console.error(`[Notification] No template found for event: ${event}`);
    return { success: false, channels: {} as any };
  }

  // Usar canales especificados o los del template
  const targetChannels = channels || template.channels;

  // Reemplazar variables en el mensaje
  const message = replaceTemplateVariables(template.body, {
    name: recipient.name,
    ...context,
  });

  const subject = template.subject
    ? replaceTemplateVariables(template.subject, context)
    : undefined;

  // Enviar por cada canal
  const results: Record<NotificationChannel, boolean> = {} as any;

  for (const channel of targetChannels) {
    if (channel === 'whatsapp') {
      results.whatsapp = await sendWhatsApp(recipient, message);
    } else if (channel === 'sms') {
      results.sms = await sendSMS(recipient, message);
    } else if (channel === 'email' && subject) {
      results.email = await sendEmail(recipient, subject, message);
    }
  }

  const success = Object.values(results).some((r) => r === true);

  return { success, channels: results };
}

/**
 * Enviar notificación a múltiples destinatarios
 */
export async function sendBulkNotification(
  event: BookingEvent,
  recipients: NotificationRecipient[],
  context: NotificationContext
): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;

  for (const recipient of recipients) {
    const result = await sendNotification(event, recipient, context);
    if (result.success) {
      sent++;
    } else {
      failed++;
    }
  }

  return { sent, failed };
}

