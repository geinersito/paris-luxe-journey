/**
 * PARIS ELITE SERVICES - PRICING CALCULATOR V3.1.2
 *
 * Motor de cálculo de precios basado en Partner Floor
 *
 * FÓRMULAS:
 * - flexible_price = PF + FC
 * - prepaid_price = flexible_price - PD
 * - Beauvais: prepaid_price = PF + buffer_extra_long (sin flexible)
 *
 * VALIDACIÓN:
 * - prepaid_price - SF_WORST_CASE(prepaid_price) - PF >= 2€ (200 céntimos)
 */

import {
  RouteKey,
  VehicleType,
  ROUTES_V312,
  PRICING_CONSTANTS,
  isFlexibleEnabled,
  getRouteConfig,
} from "@/config/pricing-v312";

/**
 * RESULTADO DEL CÁLCULO DE PRECIOS
 */
export interface PricingResult {
  currency: "EUR";
  pricing_version: "v3.1.2";
  prepaid_price: number; // en céntimos
  flexible_price: number; // en céntimos
  hold_amount: number; // en céntimos
  payment_modes_enabled: {
    prepaid: boolean;
    flexible: boolean;
  };
  // Campos internos (no expuestos en API pública)
  _internal?: {
    partner_floor: number;
    flexible_commission: number;
    prepaid_discount: number;
    margin_after_fees: number;
  };
}

/**
 * CONFIGURACIÓN DE STRIPE FEE
 * Valores por defecto, pueden ser sobrescritos por variables de entorno
 */
export const STRIPE_FEE_CONFIG = {
  WORST_CASE_PERCENT: parseFloat(
    process.env.STRIPE_WORST_CASE_FEE_PERCENT || "3.5",
  ),
  WORST_CASE_FIXED_EUR: parseFloat(
    process.env.STRIPE_WORST_CASE_FEE_FIXED_EUR || "0.25",
  ),
};

/**
 * CALCULAR STRIPE FEE (WORST CASE)
 * @param amountCents - Monto en céntimos
 * @returns Fee en céntimos
 */
export const computeWorstCaseFee = (amountCents: number): number => {
  const percentFee = Math.round(
    amountCents * (STRIPE_FEE_CONFIG.WORST_CASE_PERCENT / 100),
  );
  const fixedFee = Math.round(STRIPE_FEE_CONFIG.WORST_CASE_FIXED_EUR * 100);
  return percentFee + fixedFee;
};

/**
 * CALCULAR PRECIOS PARA UNA RUTA
 *
 * @param routeKey - Clave de la ruta (ej: 'CDG_PARIS')
 * @param vehicleType - Tipo de vehículo ('sedan' | 'van')
 * @param includeInternal - Si incluir datos internos (solo para admin)
 * @returns Resultado del cálculo o null si la ruta no existe
 * @throws Error si el margen es insuficiente
 */
export const calculatePricing = (
  routeKey: RouteKey,
  vehicleType: VehicleType,
  includeInternal: boolean = false,
): PricingResult | null => {
  // Obtener configuración de la ruta
  const routeConfig = getRouteConfig(routeKey);
  if (!routeConfig) {
    return null;
  }

  // Partner Floor (PF)
  const partnerFloor = routeConfig.partnerFloor[vehicleType];

  // Comisión Flexible (FC)
  const flexibleCommission = PRICING_CONSTANTS.FLEXIBLE_COMMISSION[vehicleType];

  // Descuento Prepaid (PD)
  const prepaidDiscount = PRICING_CONSTANTS.PREPAID_DISCOUNT;

  // Hold Amount según distancia
  const holdAmount = PRICING_CONSTANTS.HOLD_AMOUNT[routeConfig.distance];

  // Verificar si flexible está habilitado
  const flexibleEnabled = isFlexibleEnabled(routeKey);

  let prepaidPrice: number;
  let flexiblePrice: number;

  if (routeKey === "BEAUVAIS_PARIS") {
    // CASO ESPECIAL: Beauvais (prepaid-only)
    prepaidPrice = partnerFloor + PRICING_CONSTANTS.BEAUVAIS_BUFFER;
    flexiblePrice = 0; // No disponible
  } else {
    // CASO NORMAL
    flexiblePrice = partnerFloor + flexibleCommission;
    prepaidPrice = flexiblePrice - prepaidDiscount;
  }

  // VALIDACIÓN DE MARGEN
  // prepaid_price - SF_WORST_CASE(prepaid_price) - PF >= 2€ (200 céntimos)
  const stripeFee = computeWorstCaseFee(prepaidPrice);
  const marginAfterFees = prepaidPrice - stripeFee - partnerFloor;
  const MIN_MARGIN = 200; // €2.00

  if (marginAfterFees < MIN_MARGIN) {
    throw new Error(
      `Insufficient margin for ${routeKey} ${vehicleType}: ` +
        `margin=${marginAfterFees}¢ (min=${MIN_MARGIN}¢). ` +
        `prepaid=${prepaidPrice}¢, fee=${stripeFee}¢, pf=${partnerFloor}¢`,
    );
  }

  // Construir resultado
  const result: PricingResult = {
    currency: "EUR",
    pricing_version: "v3.1.2",
    prepaid_price: prepaidPrice,
    flexible_price: flexibleEnabled ? flexiblePrice : 0,
    hold_amount: holdAmount,
    payment_modes_enabled: {
      prepaid: true,
      flexible: flexibleEnabled,
    },
  };

  // Agregar datos internos si se solicita (solo para admin)
  if (includeInternal) {
    result._internal = {
      partner_floor: partnerFloor,
      flexible_commission: flexibleCommission,
      prepaid_discount: prepaidDiscount,
      margin_after_fees: marginAfterFees,
    };
  }

  return result;
};

/**
 * VALIDAR CONFIGURACIÓN DE STRIPE FEE
 * Para endpoint admin
 */
export const validateStripeFeeConfig = (
  percentFee: number,
  fixedFeeEur: number,
): { valid: boolean; error?: string } => {
  if (percentFee < 0 || percentFee > 10) {
    return { valid: false, error: "Percent fee must be between 0 and 10" };
  }
  if (fixedFeeEur < 0 || fixedFeeEur > 2) {
    return { valid: false, error: "Fixed fee must be between 0 and 2 EUR" };
  }
  return { valid: true };
};
