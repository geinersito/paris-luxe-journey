import { useState } from 'react';
import { supabase } from "@/lib/supabaseClient";

interface UseBookingPriceReturn {
  price: number;           // Precio final total (base + recargos)
  basePrice: number;       // Precio base puro sin recargos (directo de la DB)
  passengerSurcharge: number; // Recargo por grupo de pasajeros
  luggageSurcharge: number;   // Recargo por equipaje adicional
  distance: number;
  calculatePrice: (origin: string | unknown, destination: string | unknown, passengers?: number, largeLuggage?: number, smallLuggage?: number) => Promise<void>;
  handleDistanceCalculated: (distance: number) => void;
}

// Función para redondear hacia abajo al múltiplo de 5 más cercano
const roundDownToMultipleOf5 = (num: number): number => {
  return Math.floor(num / 5) * 5;
};

export const useBookingPrice = (): UseBookingPriceReturn => {
  const [price, setPrice] = useState<number>(0);  // Precio total final
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
    smallLuggage: number = 0 // Valor por defecto es 0 maletas pequeñas
  ) => {
    // Verificamos si los parámetros son iguales a los anteriores para evitar recalcular innecesariamente
    if (
      typeof origin === 'string' && 
      typeof destination === 'string' &&
      origin === previousCalculatedParams.origin &&
      destination === previousCalculatedParams.destination &&
      passengers === previousCalculatedParams.passengers &&
      largeLuggage === previousCalculatedParams.largeLuggage &&
      smallLuggage === previousCalculatedParams.smallLuggage
    ) {
      console.log('Skip price calculation - same parameters as before');
      return;
    }
    // Validación de entrada
    if (!origin || !destination || typeof origin !== 'string' || typeof destination !== 'string') {
      console.error('Invalid origin or destination:', { origin, destination });
      return;
    }

    try {
        console.log('Calculating price for:', { 
          origin, 
          destination, 
          passengers, 
          largeLuggage, 
          smallLuggage 
        });
        
        const { data, error: dbError } = await supabase
          .from('price_matrix')
          .select('base_price')
          .eq('origin_code', origin.toUpperCase())
          .eq('destination_code', destination.toUpperCase())
          .single();
    
        if (dbError || !data) {
          console.error('Error fetching price data:', dbError);
          return;
        }
    
        console.log('Price data from DB:', data);
    
        // 1. Precio base tomado de Supabase - NUNCA SE MODIFICA
        const pureDatabaseBasePrice = data.base_price;
        console.log('Pure base price from DB without any surcharges:', pureDatabaseBasePrice);
        
        // 2. Surcharge para grupos de 4-7 pasajeros (fijo de 10€)
        let passengersSurcharge = 0;
        if (passengers >= 4 && passengers <= 7) {
          passengersSurcharge = 10; 
          console.log('Adding 10€ fixed surcharge for 4-7 passengers group');
        }
        
        // 3. Lógica para el equipaje - SIEMPRE SE CALCULA DESDE CERO
        // IMPORTANTE: El equipaje incluido es FIJO (1 maleta grande) y NO DEPENDE del número de pasajeros
        let luggageSurcharge = 0;
        
        // Siempre incluimos solo 1 maleta grande en el precio base, independientemente del número de pasajeros
        if (largeLuggage > 1) {
          // Calculamos cuántas maletas grandes adicionales hay (más allá de la primera)
          const extraLargeLuggage = largeLuggage - 1;
          luggageSurcharge = extraLargeLuggage * 10; // 10€ por cada maleta grande adicional
          console.log(`Adding ${luggageSurcharge}€ for ${extraLargeLuggage} extra large luggage(s)`);
        } else {
          console.log('No extra large luggage, no surcharge applied');
        }
        
        // Para el cálculo del precio final, sumamos todo
        const totalPriceBeforeRounding = pureDatabaseBasePrice + passengersSurcharge + luggageSurcharge;
        console.log('Total price breakdown:', {
          basePrice: pureDatabaseBasePrice,
          passengersSurcharge,
          luggageSurcharge,
          totalBeforeRounding: totalPriceBeforeRounding
        });
    
        const finalPrice = roundDownToMultipleOf5(totalPriceBeforeRounding);
        console.log('Final price after rounding:', finalPrice);
        
        // IMPORTANTE: Guardamos el precio base puro de la DB, sin modificaciones
        // Este valor NUNCA debe cambiar cuando se añaden maletas
        setBasePrice(pureDatabaseBasePrice);
        setPassengerSurcharge(passengersSurcharge);
        setLuggageSurcharge(luggageSurcharge);
        setPrice(finalPrice);
      
      // Guardamos los parámetros actuales para evitar recalculos innecesarios
      if (typeof origin === 'string' && typeof destination === 'string') {
        setPreviousCalculatedParams({
          origin,
          destination,
          passengers,
          largeLuggage,
          smallLuggage
        });
      }
    } catch (err) {
      console.error('Error in price calculation:', err);
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
