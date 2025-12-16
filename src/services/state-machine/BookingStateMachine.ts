/**
 * BOOKING STATE MACHINE V3.1.2
 *
 * Máquina de estados para gestionar el ciclo de vida completo de un booking
 * desde la creación hasta la finalización o cancelación.
 *
 * Estados canónicos (BookingStatus):
 * - pending: Creado, esperando pago
 * - payment_processing: Procesando pago
 * - confirmed: Pago confirmado
 * - driver_assigned: Conductor asignado
 * - driver_departed: Conductor en camino
 * - in_progress: Servicio en curso
 * - completed: Servicio completado
 * - cancelled: Cancelado
 * - payment_failed: Pago fallido
 * - unconfirmed_no_contact: No contactado (flexible)
 *
 * Estados legacy (normalizados automáticamente):
 * - pending_payment → pending
 * - partner_assigned → driver_assigned
 * - failed → payment_failed
 * - hold_pending → usar FlexibleSubStatus
 * - hold_confirmed → usar FlexibleSubStatus
 */

import type { BookingStatus, FlexibleSubStatus } from "@/types/payment-v312";

// Re-exportar BookingStatus para que otros módulos puedan importarlo desde aquí
export type { BookingStatus };

/**
 * Estados legacy que se normalizan a estados canónicos
 */
type LegacyBookingStatus =
  | "pending_payment"
  | "partner_assigned"
  | "failed"
  | "hold_pending"
  | "hold_confirmed";

/**
 * Normaliza estados legacy a estados canónicos
 */
export function normalizeBookingStatus(
  status: BookingStatus | LegacyBookingStatus
): BookingStatus {
  switch (status) {
    case "pending_payment":
      return "pending";
    case "partner_assigned":
      return "driver_assigned";
    case "failed":
      return "payment_failed";
    // hold_pending y hold_confirmed deberían usar FlexibleSubStatus
    // pero por compatibilidad temporal los mapeamos a estados existentes
    case "hold_pending":
      return "confirmed"; // Estado principal mientras hold está pendiente
    case "hold_confirmed":
      return "driver_assigned"; // Listo para asignar conductor
    default:
      return status as BookingStatus;
  }
}

// Eventos que pueden disparar transiciones
export type BookingEvent =
  | "PAYMENT_SUCCEEDED"
  | "PAYMENT_FAILED"
  | "SETUP_SUCCEEDED"
  | "SETUP_FAILED"
  | "PARTNER_ASSIGNED"
  | "HOLD_CREATED"
  | "HOLD_CONFIRMED"
  | "HOLD_FAILED"
  | "SERVICE_STARTED"
  | "SERVICE_COMPLETED"
  | "CANCEL_REQUESTED"
  | "HOLD_CAPTURED"
  | "HOLD_CANCELLED";

// Metadata adicional para transiciones
export interface TransitionMetadata {
  event: BookingEvent;
  timestamp: string;
  actor?: "customer" | "partner" | "admin" | "system";
  reason?: string;
  payment_intent_id?: string;
  setup_intent_id?: string;
  partner_id?: string;
  [key: string]: unknown;
}

// Resultado de una transición
export interface TransitionResult {
  success: boolean;
  from_state: BookingStatus;
  to_state: BookingStatus;
  event: BookingEvent;
  error?: string;
  metadata?: TransitionMetadata;
}

/**
 * Definición de transiciones válidas (solo estados canónicos)
 * Formato: { [estado_actual]: { [evento]: estado_siguiente } }
 */
const STATE_TRANSITIONS: Record<
  BookingStatus,
  Partial<Record<BookingEvent, BookingStatus>>
> = {
  // Estado inicial: creado, esperando pago
  pending: {
    PAYMENT_SUCCEEDED: "confirmed",
    PAYMENT_FAILED: "payment_failed",
    SETUP_SUCCEEDED: "confirmed",
    SETUP_FAILED: "payment_failed",
    CANCEL_REQUESTED: "cancelled",
  },

  // Procesando pago
  payment_processing: {
    PAYMENT_SUCCEEDED: "confirmed",
    PAYMENT_FAILED: "payment_failed",
    CANCEL_REQUESTED: "cancelled",
  },

  // Booking confirmado: esperando asignación de conductor
  confirmed: {
    PARTNER_ASSIGNED: "driver_assigned",
    CANCEL_REQUESTED: "cancelled",
  },

  // Conductor asignado
  driver_assigned: {
    SERVICE_STARTED: "in_progress",
    CANCEL_REQUESTED: "cancelled",
  },

  // Conductor en camino
  driver_departed: {
    SERVICE_STARTED: "in_progress",
    CANCEL_REQUESTED: "cancelled",
  },

  // Servicio en progreso
  in_progress: {
    SERVICE_COMPLETED: "completed",
    CANCEL_REQUESTED: "cancelled",
  },

  // Estados finales (no permiten transiciones)
  completed: {},
  cancelled: {},
  payment_failed: {},

  // No contactado (flexible)
  unconfirmed_no_contact: {
    CANCEL_REQUESTED: "cancelled",
  },
};

/**
 * Validar si una transición es válida (con normalización automática)
 */
export function isValidTransition(
  currentState: BookingStatus | LegacyBookingStatus,
  event: BookingEvent,
): boolean {
  const normalizedState = normalizeBookingStatus(currentState);
  const allowedTransitions = STATE_TRANSITIONS[normalizedState];
  return event in allowedTransitions;
}

/**
 * Obtener el siguiente estado para un evento (con normalización automática)
 */
export function getNextState(
  currentState: BookingStatus | LegacyBookingStatus,
  event: BookingEvent,
): BookingStatus | null {
  const normalizedState = normalizeBookingStatus(currentState);
  const allowedTransitions = STATE_TRANSITIONS[normalizedState];
  return allowedTransitions[event] || null;
}

/**
 * Ejecutar una transición de estado (con normalización automática)
 */
export function executeTransition(
  currentState: BookingStatus | LegacyBookingStatus,
  event: BookingEvent,
  metadata?: Partial<TransitionMetadata>,
): TransitionResult {
  const normalizedState = normalizeBookingStatus(currentState);

  // Validar que la transición es válida
  if (!isValidTransition(normalizedState, event)) {
    return {
      success: false,
      from_state: normalizedState,
      to_state: normalizedState,
      event,
      error: `Invalid transition: ${normalizedState} -> ${event}`,
    };
  }

  // Obtener el siguiente estado
  const nextState = getNextState(normalizedState, event);

  if (!nextState) {
    return {
      success: false,
      from_state: normalizedState,
      to_state: normalizedState,
      event,
      error: `No next state defined for: ${normalizedState} -> ${event}`,
    };
  }

  // Transición exitosa
  return {
    success: true,
    from_state: normalizedState,
    to_state: nextState,
    event,
    metadata: {
      event,
      timestamp: new Date().toISOString(),
      actor: metadata?.actor || "system",
      ...metadata,
    },
  };
}

/**
 * Obtener todos los eventos válidos para un estado (con normalización automática)
 */
export function getValidEvents(currentState: BookingStatus | LegacyBookingStatus): BookingEvent[] {
  const normalizedState = normalizeBookingStatus(currentState);
  const allowedTransitions = STATE_TRANSITIONS[normalizedState];
  return Object.keys(allowedTransitions) as BookingEvent[];
}

/**
 * Verificar si un estado es final (con normalización automática)
 */
export function isFinalState(state: BookingStatus | LegacyBookingStatus): boolean {
  const normalizedState = normalizeBookingStatus(state);
  const validEvents = getValidEvents(normalizedState);
  return validEvents.length === 0;
}

/**
 * Validaciones de negocio para transiciones específicas
 */
export interface BusinessValidation {
  valid: boolean;
  error?: string;
}

/**
 * Validar reglas de negocio antes de una transición
 */
export function validateBusinessRules(
  currentState: BookingStatus | LegacyBookingStatus,
  event: BookingEvent,
  context: {
    payment_mode?: "prepaid" | "flexible";
    pickup_datetime?: string;
    flexible_sub_status?: FlexibleSubStatus;
    partner_id?: string;
  },
): BusinessValidation {
  const normalizedState = normalizeBookingStatus(currentState);

  // Regla 1: HOLD_CREATED solo es válido para modo flexible
  if (event === "HOLD_CREATED" && context.payment_mode !== "flexible") {
    return {
      valid: false,
      error: "Hold creation is only valid for flexible payment mode",
    };
  }

  // Regla 2: HOLD_CREATED solo dentro de ventana de 24h
  if (event === "HOLD_CREATED" && context.pickup_datetime) {
    const pickupTime = new Date(context.pickup_datetime).getTime();
    const now = Date.now();
    const hoursUntilPickup = (pickupTime - now) / (1000 * 60 * 60);

    if (hoursUntilPickup > 24 || hoursUntilPickup < 0) {
      return {
        valid: false,
        error: `Hold can only be created within 24h of pickup. Current: ${hoursUntilPickup.toFixed(1)}h`,
      };
    }
  }

  // Regla 3: SERVICE_STARTED requiere partner asignado
  if (event === "SERVICE_STARTED" && !context.partner_id) {
    return {
      valid: false,
      error: "Cannot start service without assigned partner",
    };
  }

  // Regla 4: Para flexible, SERVICE_STARTED requiere hold confirmado
  if (
    event === "SERVICE_STARTED" &&
    context.payment_mode === "flexible" &&
    context.flexible_sub_status !== "hold_confirmed"
  ) {
    return {
      valid: false,
      error: "Cannot start service without confirmed hold (flexible mode)",
    };
  }

  // Todas las validaciones pasaron
  return { valid: true };
}

/**
 * Ejecutar transición con validaciones de negocio
 */
export function executeTransitionWithValidation(
  currentState: BookingStatus,
  event: BookingEvent,
  context: {
    payment_mode?: "prepaid" | "flexible";
    pickup_datetime?: string;
    hold_status?: string;
    partner_id?: string;
  },
  metadata?: Partial<TransitionMetadata>,
): TransitionResult {
  // Primero validar reglas de negocio
  const businessValidation = validateBusinessRules(
    currentState,
    event,
    context,
  );

  if (!businessValidation.valid) {
    return {
      success: false,
      from_state: currentState,
      to_state: currentState,
      event,
      error: `Business rule violation: ${businessValidation.error}`,
    };
  }

  // Si pasa validaciones, ejecutar transición normal
  return executeTransition(currentState, event, metadata);
}
