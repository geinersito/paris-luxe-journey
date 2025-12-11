/**
 * Luggage Policy Utilities - Paris Elite Services
 *
 * POLÍTICA V1.1:
 * - Incluido: 1 grande (23kg) + 1 pequeña (cabina) por pasajero
 * - Recargo: €15 por cada grande extra
 * - Pequeñas extra: Gratis (limitadas a capacidad)
 *
 * CAPACIDADES REALISTAS:
 * - Berlina (1-3 pax): Máx 3 grandes + 3 pequeñas
 * - Van (4-7 pax): Máx 7 grandes + 7 pequeñas
 */

import { PRICING } from "@/config/pricing";

export type LuggageCapacity = {
  maxLarge: number; // Máximo de maletas grandes que caben físicamente
  maxSmall: number; // Máximo de maletas pequeñas (= pasajeros)
  includedLarge: number; // Maletas grandes incluidas en el precio (1 por pax)
  pricePerExtraLarge: number; // Precio por cada grande extra (€15)
};

/**
 * Calcula la capacidad de equipaje según número de pasajeros
 *
 * @param passengers - Número de pasajeros (1-7)
 * @returns Capacidades y precios de equipaje
 *
 * @example
 * // 2 pasajeros (Berlina)
 * getLuggageCapacity(2)
 * // => { maxLarge: 3, maxSmall: 2, includedLarge: 2, pricePerExtraLarge: 15 }
 *
 * @example
 * // 5 pasajeros (Van)
 * getLuggageCapacity(5)
 * // => { maxLarge: 7, maxSmall: 5, includedLarge: 5, pricePerExtraLarge: 15 }
 */
export const getLuggageCapacity = (passengers: number): LuggageCapacity => {
  // Validación: mínimo 1 pasajero
  const validPassengers = Math.max(1, passengers);

  // Determinar tipo de vehículo
  const isVan = validPassengers >= 4;

  // Capacidades físicas del vehículo
  const maxLarge = isVan ? 7 : 3;

  // Máximo de pequeñas = número de pasajeros (1 por persona)
  const maxSmall = validPassengers;

  // Maletas grandes incluidas: 1 por pasajero, hasta capacidad del vehículo
  const includedLarge = Math.min(validPassengers, maxLarge);

  // Precio por maleta grande extra (sincronizado con pricing.ts)
  const pricePerExtraLarge = PRICING.surcharges.extraBag;

  return {
    maxLarge,
    maxSmall,
    includedLarge,
    pricePerExtraLarge,
  };
};

/**
 * Calcula el recargo por maletas grandes extra
 *
 * @param passengers - Número de pasajeros
 * @param largeBags - Número de maletas grandes seleccionadas
 * @returns Recargo en euros (0 si no hay extras)
 *
 * @example
 * // 2 pasajeros, 2 maletas grandes → 0€ (2 incluidas)
 * calculateLuggageFee(2, 2) // => 0
 *
 * @example
 * // 2 pasajeros, 3 maletas grandes → 15€ (2 incluidas + 1 extra)
 * calculateLuggageFee(2, 3) // => 15
 *
 * @example
 * // 5 pasajeros, 7 maletas grandes → 30€ (5 incluidas + 2 extras)
 * calculateLuggageFee(5, 7) // => 30
 */
export const calculateLuggageFee = (
  passengers: number,
  largeBags: number,
): number => {
  const { includedLarge, pricePerExtraLarge } = getLuggageCapacity(passengers);

  // Calcular cuántas maletas grandes son extra
  const extraLarge = Math.max(0, largeBags - includedLarge);

  // Recargo total
  return extraLarge * pricePerExtraLarge;
};

/**
 * Valida si la cantidad de equipaje es válida para el número de pasajeros
 *
 * @param passengers - Número de pasajeros
 * @param largeBags - Número de maletas grandes
 * @param smallBags - Número de maletas pequeñas
 * @returns true si es válido, false si excede capacidad
 */
export const isLuggageValid = (
  passengers: number,
  largeBags: number,
  smallBags: number,
): boolean => {
  const { maxLarge, maxSmall } = getLuggageCapacity(passengers);

  return largeBags <= maxLarge && smallBags <= maxSmall;
};

/**
 * Obtiene el tipo de vehículo según pasajeros
 *
 * @param passengers - Número de pasajeros
 * @returns 'sedan' o 'van'
 */
export const getVehicleType = (passengers: number): "sedan" | "van" => {
  return passengers >= 4 ? "van" : "sedan";
};
