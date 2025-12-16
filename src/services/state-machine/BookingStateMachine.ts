/**
 * BOOKING STATE MACHINE V3.1.2
 *
 * Máquina de estados para gestionar el ciclo de vida completo de un booking
 * desde la creación hasta la finalización o cancelación.
 *
 * Estados principales:
 * - pending_payment: Esperando pago/setup del cliente
 * - confirmed: Booking confirmado, esperando asignación
 * - partner_assigned: Conductor asignado
 * - hold_pending: Hold creado, esperando autenticación SCA
 * - hold_confirmed: Hold autenticado exitosamente
 * - in_progress: Servicio en curso
 * - completed: Servicio completado
 * - cancelled: Booking cancelado
 * - failed: Pago/setup fallido
 */

import type { BookingStatus } from "@/types/payment-v312";

// Re-export BookingStatus for external use
export type { BookingStatus } from "@/types/payment-v312";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
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
 * Definición de transiciones válidas
 * Formato: { [estado_actual]: { [evento]: estado_siguiente } }
 */
const STATE_TRANSITIONS: Record<
  BookingStatus,
  Partial<Record<BookingEvent, BookingStatus>>
> = {
  // Estado inicial: esperando pago/setup
  pending_payment: {
    PAYMENT_SUCCEEDED: "confirmed",
    PAYMENT_FAILED: "failed",
    SETUP_SUCCEEDED: "confirmed",
    SETUP_FAILED: "failed",
    CANCEL_REQUESTED: "cancelled",
  },

  // Booking confirmado: esperando asignación de conductor
  confirmed: {
    PARTNER_ASSIGNED: "partner_assigned",
    HOLD_CREATED: "hold_pending",
    CANCEL_REQUESTED: "cancelled",
  },

  // Conductor asignado: esperando hold (solo flexible)
  partner_assigned: {
    HOLD_CREATED: "hold_pending",
    SERVICE_STARTED: "in_progress",
    CANCEL_REQUESTED: "cancelled",
  },

  // Hold creado: esperando autenticación SCA
  hold_pending: {
    HOLD_CONFIRMED: "hold_confirmed",
    HOLD_FAILED: "failed",
    CANCEL_REQUESTED: "cancelled",
  },

  // Hold confirmado: listo para servicio
  hold_confirmed: {
    SERVICE_STARTED: "in_progress",
    CANCEL_REQUESTED: "cancelled",
  },

  // Servicio en progreso
  in_progress: {
    SERVICE_COMPLETED: "completed",
    CANCEL_REQUESTED: "cancelled", // Cancelación tardía
  },

  // Estados finales (no permiten transiciones)
  completed: {},
  cancelled: {},
  failed: {},
};

/**
 * Validar si una transición es válida
 */
export function isValidTransition(
  currentState: BookingStatus,
  event: BookingEvent,
): boolean {
  const allowedTransitions = STATE_TRANSITIONS[currentState];
  return event in allowedTransitions;
}

/**
 * Obtener el siguiente estado para un evento
 */
export function getNextState(
  currentState: BookingStatus,
  event: BookingEvent,
): BookingStatus | null {
  const allowedTransitions = STATE_TRANSITIONS[currentState];
  return allowedTransitions[event] || null;
}

/**
 * Ejecutar una transición de estado
 */
export function executeTransition(
  currentState: BookingStatus,
  event: BookingEvent,
  metadata?: Partial<TransitionMetadata>,
): TransitionResult {
  // Validar que la transición es válida
  if (!isValidTransition(currentState, event)) {
    return {
      success: false,
      from_state: currentState,
      to_state: currentState,
      event,
      error: `Invalid transition: ${currentState} -> ${event}`,
    };
  }

  // Obtener el siguiente estado
  const nextState = getNextState(currentState, event);

  if (!nextState) {
    return {
      success: false,
      from_state: currentState,
      to_state: currentState,
      event,
      error: `No next state defined for: ${currentState} -> ${event}`,
    };
  }

  // Transición exitosa
  return {
    success: true,
    from_state: currentState,
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
 * Obtener todos los eventos válidos para un estado
 */
export function getValidEvents(currentState: BookingStatus): BookingEvent[] {
  const allowedTransitions = STATE_TRANSITIONS[currentState];
  return Object.keys(allowedTransitions) as BookingEvent[];
}

/**
 * Verificar si un estado es final (no permite más transiciones)
 */
export function isFinalState(state: BookingStatus): boolean {
  const validEvents = getValidEvents(state);
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
  currentState: BookingStatus,
  event: BookingEvent,
  context: {
    payment_mode?: "prepaid" | "flexible";
    pickup_datetime?: string;
    hold_status?: string;
    partner_id?: string;
  },
): BusinessValidation {
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
    context.hold_status !== "confirmed"
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
