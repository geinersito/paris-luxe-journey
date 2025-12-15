import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  calculatePrice as calculatePriceFromConfig,
  generateRouteKey,
  PRICING,
} from "@/config/pricing";
import { calculateLuggageFee } from "@/utils/luggage";
import { generateRouteKeyV312, isRouteSupported } from "@/utils/routeMapping";
import { calculatePricing } from "@/services/pricing/calculatePricing";
import type { VehicleType } from "@/config/pricing-v312";

interface UseBookingPriceReturn {
  price: number; // Precio final total (base + recargos)
  basePrice: number; // Precio base puro sin recargos (directo de la DB)
  passengerSurcharge: number; // Recargo por grupo de pasajeros
  luggageSurcharge: number; // Recargo por equipaje adicional
  distance: number;
  calculatePrice: (
    origin: string | unknown,
    destination: string | unknown,
    passengers?: number,
    largeLuggage?: number,
    smallLuggage?: number,
  ) => Promise<number>; // Changed from Promise<void> to Promise<number>
  handleDistanceCalculated: (distance: number) => void;
}

// Función para redondear hacia abajo al múltiplo de 5 más cercano
const roundDownToMultipleOf5 = (num: number): number => {
  return Math.floor(num / 5) * 5;
};

export const useBookingPrice = (): UseBookingPriceReturn => {
  const [price, setPrice] = useState<number>(0); // Precio total final
  const [basePrice, setBasePrice] = useState<number>(0); // Precio base puro de la DB
  const [passengerSurcharge, setPassengerSurcharge] = useState<number>(0); // Recargo por pasajeros
  const [luggageSurcharge, setLuggageSurcharge] = useState<number>(0); // Recargo por equipaje
  const [distance, setDistance] = useState<number>(0);
  const [previousCalculatedParams, setPreviousCalculatedParams] = useState<{
    origin?: string;
    destination?: string;
    passengers?: number;
    largeLuggage?: number;
    smallLuggage?: number;
  }>({});

  const calculatePrice = async (
    origin: string | unknown,
    destination: string | unknown,
    passengers: number = 1, // Valor por defecto es 1 pasajero
    largeLuggage: number = 0, // Valor por defecto es 0 maletas grandes
    smallLuggage: number = 0, // Valor por defecto es 0 maletas pequeñas
  ) => {
    // Verificamos si los parámetros son iguales a los anteriores para evitar recalcular innecesariamente
    if (
      typeof origin === "string" &&
      typeof destination === "string" &&
      origin === previousCalculatedParams.origin &&
      destination === previousCalculatedParams.destination &&
      passengers === previousCalculatedParams.passengers &&
      largeLuggage === previousCalculatedParams.largeLuggage &&
      smallLuggage === previousCalculatedParams.smallLuggage
    ) {
      console.log("Skip price calculation - same parameters as before");
      return;
    }
    // Validación de entrada
    if (
      !origin ||
      !destination ||
      typeof origin !== "string" ||
      typeof destination !== "string"
    ) {
      console.error("Invalid origin or destination:", { origin, destination });
      return;
    }

    try {
      console.log("Calculating price for:", {
        origin,
        destination,
        passengers,
        largeLuggage,
        smallLuggage,
      });

      // 🆕 PASO 1: Intentar usar V3.1.2 primero (sistema nuevo)
      if (isRouteSupported(origin, destination)) {
        const routeKeyV312 = generateRouteKeyV312(origin, destination);

        if (routeKeyV312) {
          console.log(
            "✅ Using V3.1.2 pricing system for route:",
            routeKeyV312,
          );

          // Determinar tipo de vehículo basado en pasajeros
          const vehicleType: VehicleType = passengers <= 3 ? "sedan" : "van";

          try {
            const pricingResult = calculatePricing(routeKeyV312, vehicleType);

            // Convertir de céntimos a euros
            const prepaidPrice = pricingResult.prepaid_price / 100;

            console.log("V3.1.2 pricing result:", {
              routeKey: routeKeyV312,
              vehicleType,
              prepaidPrice,
              flexiblePrice: pricingResult.flexible_price / 100,
            });

            // Actualizar estados con precios de V3.1.2
            setBasePrice(prepaidPrice);
            setPassengerSurcharge(0); // V3.1.2 ya incluye todo en el precio
            setLuggageSurcharge(0); // V3.1.2 ya incluye equipaje estándar
            setPrice(prepaidPrice);

            if (typeof origin === "string" && typeof destination === "string") {
              setPreviousCalculatedParams({
                origin,
                destination,
                passengers,
                largeLuggage,
                smallLuggage,
              });
            }

            return prepaidPrice;
          } catch (v312Error) {
            console.warn(
              "V3.1.2 calculation failed, falling back to legacy system:",
              v312Error,
            );
            // Continuar con el sistema antiguo
          }
        }
      }

      // PASO 2: Fallback al sistema antiguo (pricing.ts)
      console.log("Using legacy pricing system");

      // Generar route key desde pricing.ts
      const routeKey = generateRouteKey(origin, destination);

      if (!routeKey) {
        // TODO: Create fixed_routes table in Supabase
        // For now, return a default price when route not found in pricing.ts
        console.warn(
          "No fixed route found in pricing.ts. Database fallback disabled until fixed_routes table is created.",
        );

        // Use a default base price as fallback
        const pureDatabaseBasePrice = passengers <= 3 ? 80 : 100;
        console.log(
          "Using default base price (no fixed_routes table):",
          pureDatabaseBasePrice,
        );

        /* COMMENTED OUT: Requires fixed_routes table
        const { data, error: dbError } = await supabase
          .from("fixed_routes")
          .select("base_price_1_3, base_price_4_7, route_type")
          .or(
            `route_type.eq.${origin.toLowerCase()}_${destination.toLowerCase()},route_type.eq.${destination.toLowerCase()}_${origin.toLowerCase()}`,
          )
          .single();

        if (dbError || !data) {
          console.error("Error fetching price data:", dbError);
          return;
        }

        const pureDatabaseBasePrice =
          passengers <= 3 ? data.base_price_1_3 : data.base_price_4_7;
        console.log(
          "Pure base price from DB without any surcharges:",
          pureDatabaseBasePrice,
        );
        */

        let passengersSurcharge = 0;
        if (passengers >= 4 && passengers <= 7) {
          passengersSurcharge = 10;
          console.log("Adding 10€ fixed surcharge for 4-7 passengers group");
        }

        // POLÍTICA DE EQUIPAJE V1.1: 1 grande + 1 pequeña por pasajero incluida
        // Recargo: €15 por cada grande extra (centralizado en utils/luggage.ts)
        const luggageSurcharge = calculateLuggageFee(passengers, largeLuggage);
        if (luggageSurcharge > 0) {
          console.log(
            `Adding ${luggageSurcharge}€ for extra large luggage (${passengers} passengers, ${largeLuggage} bags)`,
          );
        }

        const totalPriceBeforeRounding =
          pureDatabaseBasePrice + passengersSurcharge + luggageSurcharge;
        const finalPrice = roundDownToMultipleOf5(totalPriceBeforeRounding);

        setBasePrice(pureDatabaseBasePrice);
        setPassengerSurcharge(passengersSurcharge);
        setLuggageSurcharge(luggageSurcharge);
        setPrice(finalPrice);

        if (typeof origin === "string" && typeof destination === "string") {
          setPreviousCalculatedParams({
            origin,
            destination,
            passengers,
            largeLuggage,
            smallLuggage,
          });
        }

        return;
      }

      // Usar pricing.ts para calcular el precio
      // POLÍTICA DE EQUIPAJE V1.1: 1 grande + 1 pequeña por pasajero incluida
      // Recargo: €15 por cada grande extra (centralizado en utils/luggage.ts)
      const pureDatabaseBasePrice = calculatePriceFromConfig(
        routeKey,
        passengers,
        { extraBags: 0 },
      );
      const luggageSurcharge = calculateLuggageFee(passengers, largeLuggage);

      // El precio base ya incluye el ajuste por número de pasajeros
      // No necesitamos agregar recargos adicionales por pasajeros
      const totalPriceBeforeRounding = pureDatabaseBasePrice + luggageSurcharge;
      console.log("Total price breakdown:", {
        routeKey,
        basePrice: pureDatabaseBasePrice,
        luggageSurcharge,
        totalBeforeRounding: totalPriceBeforeRounding,
      });

      const finalPrice = roundDownToMultipleOf5(totalPriceBeforeRounding);
      console.log("Final price after rounding:", finalPrice);

      // IMPORTANTE: Guardamos el precio base puro, sin modificaciones
      // Este valor NUNCA debe cambiar cuando se añaden maletas
      setBasePrice(pureDatabaseBasePrice);
      setPassengerSurcharge(0); // No hay recargo por pasajeros, está incluido en el precio base
      setLuggageSurcharge(luggageSurcharge);
      setPrice(finalPrice);

      // Guardamos los parámetros actuales para evitar recalculos innecesarios
      if (typeof origin === "string" && typeof destination === "string") {
        setPreviousCalculatedParams({
          origin,
          destination,
          passengers,
          largeLuggage,
          smallLuggage,
        });
      }

      return finalPrice; // Return the calculated price
    } catch (err) {
      console.error("Error in price calculation:", err);
      return 0; // Return 0 on error
    }
  };

  const handleDistanceCalculated = (calculatedDistance: number) => {
    setDistance(calculatedDistance);
  };

  return {
    price,
    basePrice,
    passengerSurcharge,
    luggageSurcharge,
    distance,
    calculatePrice,
    handleDistanceCalculated,
  };
};
