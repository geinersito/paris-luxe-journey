/**
 * PAYMENT SERVICE V3.1.2
 *
 * Maneja los flujos de pago Prepaid y Flexible
 *
 * FLUJOS:
 * 1. PREPAID: PaymentIntent con capture_method=automatic
 * 2. FLEXIBLE: SetupIntent → guardar payment_method → Hold a T-24h
 */

import { supabase } from "@/integrations/supabase/client";
import {
  CreatePrepaidPaymentRequest,
  CreatePrepaidPaymentResponse,
  CreateSetupIntentRequest,
  CreateSetupIntentResponse,
  CreateHoldRequest,
  CreateHoldResponse,
} from "@/types/payment-v312";

/**
 * CREAR PAGO PREPAID
 *
 * Crea un PaymentIntent con captura automática
 * El cliente paga el monto completo por adelantado
 */
export const createPrepaidPayment = async (
  request: CreatePrepaidPaymentRequest,
): Promise<CreatePrepaidPaymentResponse> => {
  console.log("[PaymentServiceV312] Creando pago prepaid:", {
    booking_id: request.booking_id,
    amount_cents: request.amount_cents,
  });

  try {
    // Llamar a la función de Supabase que crea el PaymentIntent
    const { data, error } = await supabase.functions.invoke(
      "create-prepaid-payment-v312",
      {
        body: {
          booking_id: request.booking_id,
          customer_email: request.customer_email,
          customer_name: request.customer_name,
          amount_cents: request.amount_cents,
          metadata: request.metadata,
        },
      },
    );

    if (error) {
      console.error("[PaymentServiceV312] Error creando pago prepaid:", error);
      throw new Error(`Failed to create prepaid payment: ${error.message}`);
    }

    if (!data?.payment_intent_id || !data?.client_secret) {
      throw new Error("Invalid response from create-prepaid-payment-v312");
    }

    console.log("[PaymentServiceV312] Pago prepaid creado:", {
      payment_intent_id: data.payment_intent_id,
      customer_id: data.customer_id,
      status: data.status,
    });

    return {
      payment_intent_id: data.payment_intent_id,
      client_secret: data.client_secret,
      customer_id: data.customer_id,
      amount_cents: data.amount_cents,
      status: data.status,
    };
  } catch (error) {
    console.error("[PaymentServiceV312] Error en createPrepaidPayment:", error);
    throw error;
  }
};

/**
 * CREAR SETUP INTENT (FLEXIBLE)
 *
 * Crea un SetupIntent para guardar el método de pago
 * No cobra nada, solo guarda la tarjeta para uso futuro
 */
export const createFlexibleSetupIntent = async (
  request: CreateSetupIntentRequest,
): Promise<CreateSetupIntentResponse> => {
  console.log("[PaymentServiceV312] Creando SetupIntent flexible:", {
    booking_id: request.booking_id,
    hold_amount_cents: request.metadata.hold_amount_cents,
  });

  try {
    // Llamar a la función de Supabase que crea el SetupIntent
    const { data, error } = await supabase.functions.invoke(
      "create-flexible-setup-v312",
      {
        body: {
          booking_id: request.booking_id,
          customer_email: request.customer_email,
          customer_name: request.customer_name,
          metadata: request.metadata,
        },
      },
    );

    if (error) {
      console.error("[PaymentServiceV312] Error creando SetupIntent:", error);
      throw new Error(`Failed to create setup intent: ${error.message}`);
    }

    if (!data?.setup_intent_id || !data?.client_secret) {
      throw new Error("Invalid response from create-flexible-setup-v312");
    }

    console.log("[PaymentServiceV312] SetupIntent creado:", {
      setup_intent_id: data.setup_intent_id,
      customer_id: data.customer_id,
      status: data.status,
    });

    return {
      setup_intent_id: data.setup_intent_id,
      client_secret: data.client_secret,
      customer_id: data.customer_id,
      status: data.status,
    };
  } catch (error) {
    console.error(
      "[PaymentServiceV312] Error en createFlexibleSetupIntent:",
      error,
    );
    throw error;
  }
};

/**
 * CREAR HOLD (T-24h)
 *
 * Crea un PaymentIntent con capture_method=manual
 * Se ejecuta automáticamente a T-24h del pickup
 */
export const createHold = async (
  request: CreateHoldRequest,
): Promise<CreateHoldResponse> => {
  console.log("[PaymentServiceV312] Creando hold:", {
    booking_id: request.booking_id,
    amount_cents: request.amount_cents,
  });

  try {
    // Llamar a la función de Supabase que crea el Hold
    const { data, error } = await supabase.functions.invoke(
      "create-hold-v312",
      {
        body: {
          booking_id: request.booking_id,
          customer_id: request.customer_id,
          payment_method_id: request.payment_method_id,
          amount_cents: request.amount_cents,
          metadata: request.metadata,
        },
      },
    );

    if (error) {
      console.error("[PaymentServiceV312] Error creando hold:", error);
      throw new Error(`Failed to create hold: ${error.message}`);
    }

    if (!data?.payment_intent_id) {
      throw new Error("Invalid response from create-hold-v312");
    }

    console.log("[PaymentServiceV312] Hold creado:", {
      payment_intent_id: data.payment_intent_id,
      status: data.status,
      requires_action: data.requires_action,
    });

    return {
      payment_intent_id: data.payment_intent_id,
      amount_cents: data.amount_cents,
      status: data.status,
      requires_action: data.requires_action,
      client_secret: data.client_secret,
    };
  } catch (error) {
    console.error("[PaymentServiceV312] Error en createHold:", error);
    throw error;
  }
};
