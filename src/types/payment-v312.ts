/**
 * TIPOS PARA SISTEMA DE PAGOS V3.1.2
 *
 * Define interfaces para:
 * - Payment modes (Prepaid/Flexible)
 * - Payment intents
 * - Setup intents
 * - Holds
 * - Estados de booking
 */

import { RouteKey, VehicleType } from "@/config/pricing-v312";

/**
 * MODOS DE PAGO
 */
export type PaymentMode = "prepaid" | "flexible";

/**
 * ESTADOS DE BOOKING V3.1.2
 */
export type BookingStatus =
  | "pending" // Creado, esperando pago
  | "pending_payment" // Esperando pago/setup (alias de pending)
  | "payment_processing" // Procesando pago
  | "confirmed" // Pago confirmado
  | "driver_assigned" // Conductor asignado
  | "partner_assigned" // Conductor asignado (alias de driver_assigned)
  | "driver_departed" // Conductor en camino
  | "hold_pending" // Hold creado, esperando confirmación (flexible)
  | "hold_confirmed" // Hold confirmado (flexible)
  | "in_progress" // Servicio en curso
  | "completed" // Servicio completado
  | "cancelled" // Cancelado por cliente
  | "payment_failed" // Pago fallido
  | "failed" // Pago/setup fallido (alias de payment_failed)
  | "unconfirmed_no_contact"; // No contactado (flexible)

/**
 * SUB-ESTADOS PARA FLEXIBLE
 */
export type FlexibleSubStatus =
  | "awaiting_hold" // Esperando creación de hold
  | "hold_pending" // Hold creado, esperando confirmación
  | "hold_requires_action" // Hold requiere autenticación SCA
  | "hold_confirmed" // Hold confirmado
  | "hold_failed"; // Hold fallido

/**
 * DATOS DE PAGO PREPAID
 */
export interface PrepaidPaymentData {
  mode: "prepaid";
  stripe_payment_intent_id: string;
  stripe_customer_id: string;
  amount_cents: number;
  status: "pending" | "processing" | "succeeded" | "failed";
  client_secret: string;
}

/**
 * DATOS DE PAGO FLEXIBLE
 */
export interface FlexiblePaymentData {
  mode: "flexible";
  stripe_setup_intent_id: string;
  stripe_customer_id: string;
  stripe_payment_method_id?: string; // Guardado después de SetupIntent
  hold_payment_intent_id?: string; // Creado a T-24h
  hold_amount_cents: number;
  hold_status?:
    | "pending"
    | "requires_action"
    | "confirmed"
    | "captured"
    | "cancelled";
  hold_auth_deadline?: string; // ISO timestamp para SCA
  setup_client_secret: string;
}

/**
 * DATOS DE BOOKING V3.1.2
 */
export interface BookingV312 {
  id: string;

  // Información de ruta
  route_key: RouteKey;
  vehicle_type: VehicleType;
  origin: string;
  destination: string;

  // Información de pasajero
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  passengers: number;

  // Fechas
  pickup_datetime: string; // ISO timestamp
  created_at: string;

  // Pricing
  pricing_version: "v3.1.2";
  prepaid_price_cents: number;
  flexible_price_cents: number;
  hold_amount_cents: number;
  partner_floor_cents: number;

  // Payment
  payment_mode: PaymentMode;
  payment_data: PrepaidPaymentData | FlexiblePaymentData;

  // Estado
  status: BookingStatus;
  flexible_sub_status?: FlexibleSubStatus;

  // Metadata
  special_instructions?: string;
  luggage_count?: number;
}

/**
 * REQUEST PARA CREAR PAGO PREPAID
 */
export interface CreatePrepaidPaymentRequest {
  booking_id: string;
  customer_email: string;
  customer_name: string;
  amount_cents: number;
  metadata: {
    booking_id: string;
    route_key: RouteKey;
    vehicle_type: VehicleType;
    pricing_version: "v3.1.2";
    payment_mode: "prepaid";
  };
}

/**
 * RESPONSE DE CREAR PAGO PREPAID
 */
export interface CreatePrepaidPaymentResponse {
  payment_intent_id: string;
  client_secret: string;
  customer_id: string;
  amount_cents: number;
  status: string;
}

/**
 * REQUEST PARA CREAR SETUP INTENT (FLEXIBLE)
 */
export interface CreateSetupIntentRequest {
  booking_id: string;
  customer_email: string;
  customer_name: string;
  metadata: {
    booking_id: string;
    route_key: RouteKey;
    vehicle_type: VehicleType;
    pricing_version: "v3.1.2";
    payment_mode: "flexible";
    hold_amount_cents: number;
  };
}

/**
 * RESPONSE DE CREAR SETUP INTENT
 */
export interface CreateSetupIntentResponse {
  setup_intent_id: string;
  client_secret: string;
  customer_id: string;
  status: string;
}

/**
 * REQUEST PARA CREAR HOLD (T-24h)
 */
export interface CreateHoldRequest {
  booking_id: string;
  customer_id: string;
  payment_method_id: string;
  amount_cents: number;
  metadata: {
    booking_id: string;
    route_key: RouteKey;
    vehicle_type: VehicleType;
    pricing_version: "v3.1.2";
    hold_type: "late_cancel_protection";
  };
}

/**
 * RESPONSE DE CREAR HOLD
 */
export interface CreateHoldResponse {
  payment_intent_id: string;
  amount_cents: number;
  status:
    | "requires_payment_method"
    | "requires_confirmation"
    | "requires_action"
    | "processing"
    | "succeeded"
    | "canceled";
  requires_action: boolean;
  client_secret?: string; // Solo si requires_action
}
