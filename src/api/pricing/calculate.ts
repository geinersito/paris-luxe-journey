/**
 * PUBLIC API ENDPOINT - PRICING CALCULATOR
 *
 * GET /api/pricing/calculate
 *
 * Endpoint público para calcular precios sin exponer Partner Floor
 * Cache opcional de 5 minutos por route_key + vehicle_type
 */

import { RouteKey, VehicleType } from "@/config/pricing-v312";
import {
  calculatePricing,
  PricingResult,
} from "@/services/pricing/calculatePricing";

/**
 * REQUEST INTERFACE
 */
export interface PricingCalculateRequest {
  route_key: RouteKey;
  vehicle_type: VehicleType;
}

/**
 * RESPONSE INTERFACE (sin datos internos)
 */
export interface PricingCalculateResponse {
  currency: "EUR";
  pricing_version: "v3.1.2";
  prepaid_price: number;
  flexible_price: number;
  hold_amount: number;
  payment_modes_enabled: {
    prepaid: boolean;
    flexible: boolean;
  };
}

/**
 * ERROR RESPONSE
 */
export interface PricingErrorResponse {
  error: string;
  code:
    | "INVALID_ROUTE"
    | "INVALID_VEHICLE"
    | "INSUFFICIENT_MARGIN"
    | "INTERNAL_ERROR";
  message: string;
}

/**
 * CACHE SIMPLE (en memoria, 5 minutos)
 * En producción, usar Redis o similar
 */
const priceCache = new Map<
  string,
  { result: PricingCalculateResponse; timestamp: number }
>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

/**
 * GENERAR CACHE KEY
 */
const getCacheKey = (routeKey: RouteKey, vehicleType: VehicleType): string => {
  return `${routeKey}:${vehicleType}`;
};

/**
 * OBTENER DESDE CACHE
 */
const getFromCache = (
  routeKey: RouteKey,
  vehicleType: VehicleType,
): PricingCalculateResponse | null => {
  const key = getCacheKey(routeKey, vehicleType);
  const cached = priceCache.get(key);

  if (!cached) return null;

  const now = Date.now();
  if (now - cached.timestamp > CACHE_TTL_MS) {
    priceCache.delete(key);
    return null;
  }

  return cached.result;
};

/**
 * GUARDAR EN CACHE
 */
const saveToCache = (
  routeKey: RouteKey,
  vehicleType: VehicleType,
  result: PricingCalculateResponse,
): void => {
  const key = getCacheKey(routeKey, vehicleType);
  priceCache.set(key, {
    result,
    timestamp: Date.now(),
  });
};

/**
 * LOGGING (en producción, usar logger apropiado)
 */
const logPricingRequest = (
  routeKey: RouteKey,
  vehicleType: VehicleType,
  result: PricingCalculateResponse,
  cached: boolean,
): void => {
  console.log("[PRICING API]", {
    route_key: routeKey,
    vehicle_type: vehicleType,
    prepaid_price: result.prepaid_price,
    flexible_price: result.flexible_price,
    hold_amount: result.hold_amount,
    pricing_version: result.pricing_version,
    cached,
    timestamp: new Date().toISOString(),
  });
};

/**
 * HANDLER PRINCIPAL
 */
export const handlePricingCalculate = (
  request: PricingCalculateRequest,
): PricingCalculateResponse | PricingErrorResponse => {
  const { route_key, vehicle_type } = request;

  // Validar vehicle_type
  if (vehicle_type !== "sedan" && vehicle_type !== "van") {
    return {
      error: "Invalid vehicle type",
      code: "INVALID_VEHICLE",
      message: `Vehicle type must be 'sedan' or 'van', got '${vehicle_type}'`,
    };
  }

  // Intentar obtener desde cache
  const cached = getFromCache(route_key, vehicle_type);
  if (cached) {
    logPricingRequest(route_key, vehicle_type, cached, true);
    return cached;
  }

  // Calcular precios (sin datos internos)
  let result: PricingResult | null;
  try {
    result = calculatePricing(route_key, vehicle_type, false);
  } catch (error) {
    // Error de margen insuficiente
    return {
      error: "Pricing calculation failed",
      code: "INSUFFICIENT_MARGIN",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }

  // Validar que la ruta existe
  if (!result) {
    return {
      error: "Invalid route",
      code: "INVALID_ROUTE",
      message: `Route '${route_key}' not found`,
    };
  }

  // Preparar respuesta (sin _internal)
  const response: PricingCalculateResponse = {
    currency: result.currency,
    pricing_version: result.pricing_version,
    prepaid_price: result.prepaid_price,
    flexible_price: result.flexible_price,
    hold_amount: result.hold_amount,
    payment_modes_enabled: result.payment_modes_enabled,
  };

  // Guardar en cache
  saveToCache(route_key, vehicle_type, response);

  // Log
  logPricingRequest(route_key, vehicle_type, response, false);

  return response;
};

/**
 * LIMPIAR CACHE (útil para testing o actualizaciones)
 */
export const clearPricingCache = (): void => {
  priceCache.clear();
};
