import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  calculatePrice as calculatePriceFromConfig,
  generateRouteKey,
  PRICING,
} from "@/config/pricing";
import { calculateLuggageFee } from "@/utils/luggage";

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
  ) => Promise<void>;
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

      // Generar route key desde pricing.ts
      const routeKey = generateRouteKey(origin, destination);

      if (!routeKey) {
        // Si no hay ruta fija, intentar buscar en la base de datos (fallback)
        console.warn("No fixed route found in pricing.ts, trying database...");
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
    } catch (err) {
      console.error("Error in price calculation:", err);
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
