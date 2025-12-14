/**
 * BOOKING ORCHESTRATOR V3.1.2
 * 
 * Servicio orquestador que coordina:
 * - State Machine (transiciones de estado)
 * - Payment Service (pagos y holds)
 * - Notification Service (notificaciones)
 * 
 * Este es el punto de entrada principal para todas las operaciones de booking
 */

import {
  executeTransitionWithValidation,
  type BookingEvent,
  type BookingStatus,
} from '../state-machine/BookingStateMachine';
import { sendNotification } from '../notifications/NotificationService';
import type { NotificationRecipient } from '../notifications/NotificationService';

export interface BookingContext {
  id: string;
  status: BookingStatus;
  payment_mode: 'prepaid' | 'flexible';
  pickup_datetime: string;
  hold_status?: string;
  partner_id?: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  route_key: string;
  vehicle_type: string;
  total_price_cents: number;
  hold_amount_cents?: number;
  confirmation_number?: string;
}

export interface OrchestrationResult {
  success: boolean;
  booking: BookingContext;
  transition?: {
    from_state: BookingStatus;
    to_state: BookingStatus;
    event: BookingEvent;
  };
  notification_sent?: boolean;
  error?: string;
}

/**
 * Procesar evento de booking con transición de estado y notificación
 */
export async function processBookingEvent(
  booking: BookingContext,
  event: BookingEvent,
  metadata?: Record<string, any>
): Promise<OrchestrationResult> {
  console.log(`[Orchestrator] Processing event ${event} for booking ${booking.id}`);

  try {
    // 1. Ejecutar transición de estado con validaciones
    const transition = executeTransitionWithValidation(
      booking.status,
      event,
      {
        payment_mode: booking.payment_mode,
        pickup_datetime: booking.pickup_datetime,
        hold_status: booking.hold_status,
        partner_id: booking.partner_id,
      },
      {
        event,
        actor: metadata?.actor || 'system',
        ...metadata,
      }
    );

    if (!transition.success) {
      console.error(`[Orchestrator] Transition failed: ${transition.error}`);
      return {
        success: false,
        booking,
        error: transition.error,
      };
    }

    console.log(
      `[Orchestrator] State transition: ${transition.from_state} -> ${transition.to_state}`
    );

    // 2. Actualizar booking con nuevo estado
    const updatedBooking: BookingContext = {
      ...booking,
      status: transition.to_state,
    };

    // 3. Enviar notificación al cliente
    let notificationSent = false;
    
    if (booking.customer_email || booking.customer_phone) {
      const recipient: NotificationRecipient = {
        name: booking.customer_name,
        email: booking.customer_email,
        phone: booking.customer_phone,
      };

      const notificationContext = {
        booking_id: booking.id,
        confirmation_number: booking.confirmation_number || booking.id,
        route: booking.route_key,
        pickup_datetime: booking.pickup_datetime,
        vehicle_type: booking.vehicle_type,
        price: formatPrice(booking.total_price_cents),
        hold_amount: booking.hold_amount_cents
          ? formatPrice(booking.hold_amount_cents)
          : undefined,
      };

      const notificationResult = await sendNotification(
        event,
        recipient,
        notificationContext
      );

      notificationSent = notificationResult.success;
      
      console.log(
        `[Orchestrator] Notification sent: ${notificationSent}`,
        notificationResult.channels
      );
    }

    // 4. TODO: Persistir cambios en base de datos
    // await updateBookingInDatabase(updatedBooking, transition);

    return {
      success: true,
      booking: updatedBooking,
      transition: {
        from_state: transition.from_state,
        to_state: transition.to_state,
        event,
      },
      notification_sent: notificationSent,
    };

  } catch (error) {
    console.error('[Orchestrator] Error processing event:', error);
    
    return {
      success: false,
      booking,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Formatear precio en céntimos a string
 */
function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

/**
 * Procesar múltiples eventos en secuencia
 */
export async function processBookingEventSequence(
  booking: BookingContext,
  events: Array<{ event: BookingEvent; metadata?: Record<string, any> }>
): Promise<OrchestrationResult[]> {
  const results: OrchestrationResult[] = [];
  let currentBooking = booking;

  for (const { event, metadata } of events) {
    const result = await processBookingEvent(currentBooking, event, metadata);
    results.push(result);

    if (!result.success) {
      console.error(`[Orchestrator] Sequence stopped at event ${event}`);
      break;
    }

    currentBooking = result.booking;
  }

  return results;
}

