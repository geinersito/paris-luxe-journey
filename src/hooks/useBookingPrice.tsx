import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface PriceParams {
  origin: string;
  destination: string;
  passengers: number;
  largeLuggage?: number; // Maletas grandes
  carryOnLuggage?: number; // Maletas de mano
  serviceLevel?: 'standard' | 'business';
}

// Cache para evitar recálculos innecesarios
const priceCache = new Map<string, number>();

export const useBookingPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [basePrice, setBasePrice] = useState<number | null>(null); // Precio base sin recargos
  const [luggageSurcharge, setLuggageSurcharge] = useState<number>(0); // Recargo por maletas
  const [passengerSurcharge, setPassengerSurcharge] = useState<number>(0); // Recargo por pasajeros
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [priceBreakdown, setPriceBreakdown] = useState<any>(null);
  const [distance, setDistance] = useState<number>(0);

  // Función para manejar el cálculo de distancia (para compatibilidad con el otro hook)
  const handleDistanceCalculated = (calculatedDistance: number) => {
    setDistance(calculatedDistance);
  };

  // Función memoizada para calcular el precio
  const calculatePrice = useCallback(async (
    originParam: string | PriceParams,
    destinationParam?: string,
    passengersParam?: number,
    largeLuggageParam?: number,
    carryOnLuggageParam?: number
  ) => {
    // Determinar si estamos usando la nueva interfaz (objeto) o la antigua (parámetros separados)
    let params: PriceParams;
    
    if (typeof originParam === 'object') {
      params = originParam;
    } else {
      params = {
        origin: originParam,
        destination: destinationParam || '',
        passengers: passengersParam || 1,
        largeLuggage: largeLuggageParam,
        carryOnLuggage: carryOnLuggageParam
      };
    }

    if (!params.origin || !params.destination) {
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Valores por defecto
      const passengers = params.passengers || 1;
      // IMPORTANT: Use the exact luggage values passed in, don't derive from passengers
      const largeLuggage = params.largeLuggage !== undefined ? params.largeLuggage : 1;
      const carryOnLuggage = params.carryOnLuggage !== undefined ? params.carryOnLuggage : 1;
      const serviceLevel = params.serviceLevel || 'business';
      
      // Crear clave de caché
      const cacheKey = `${params.origin}-${params.destination}-${passengers}-${serviceLevel}`;
      
      // Verificar si ya tenemos este cálculo en caché (sin incluir maletas)
      if (priceCache.has(cacheKey)) {
        console.log('Using cached price for:', cacheKey);
        const cachedBasePrice = priceCache.get(cacheKey)!;
        
        // Calcular recargo por maletas adicionales
        // IMPORTANTE: El precio base ya incluye 1 maleta grande + 1 de mano
        const extraLargeLuggage = Math.max(0, largeLuggage - 1);
        const calculatedLuggageSurcharge = extraLargeLuggage * 10;
        
        // Determinar recargo por pasajeros (para compatibilidad con el otro hook)
        const calculatedPassengerSurcharge = passengers >= 4 && passengers <= 7 ? 10 : 0;
        
        const finalPrice = cachedBasePrice + calculatedLuggageSurcharge;
        
        // Guardar desglose de precios
        setPriceBreakdown({
          basePrice: cachedBasePrice,
          passengers,
          passengerRange: passengers <= 3 ? '1-3' : '4-7',
          luggageSurcharge: calculatedLuggageSurcharge,
          passengerSurcharge: calculatedPassengerSurcharge,
          extraLargeLuggage,
          serviceLevel,
          finalPrice
        });
        
        // Actualizar estados
        setBasePrice(cachedBasePrice);
        setLuggageSurcharge(calculatedLuggageSurcharge);
        setPassengerSurcharge(calculatedPassengerSurcharge);
        setPrice(finalPrice);
        
        setIsLoading(false);
        return finalPrice;
      }
      
      console.log('Calculating price for:', params);
      
      // Buscar precio en la base de datos para la ruta específica
      const { data, error } = await supabase
        .from('fixed_route_prices')
        .select('price_1_3_pax, price_4_7_pax')
        .eq('origin_code', params.origin)
        .eq('destination_code', params.destination)
        .single();
      
      if (error) throw error;
      
      console.log('Price data from DB:', data);
      
      if (!data) {
        throw new Error('No price found for this route');
      }
      
      // Determinar precio base según rango de pasajeros
      // IMPORTANTE: Solo cambia el precio base al cambiar de rango (1-3 o 4-7)
      let calculatedBasePrice = passengers <= 3 ? data.price_1_3_pax : data.price_4_7_pax;
      
      // Aplicar multiplicador según nivel de servicio
      if (serviceLevel === 'standard') {
        calculatedBasePrice = Math.round((calculatedBasePrice * 0.85) / 5) * 5; // Redondear a múltiplos de 5
      }
      
      // Guardar en caché el precio base (sin recargos por maletas)
      priceCache.set(cacheKey, calculatedBasePrice);
      
      // Calcular recargo por maletas adicionales
      // IMPORTANTE: El precio base ya incluye 1 maleta grande + 1 de mano
      const extraLargeLuggage = Math.max(0, largeLuggage - 1);
      const calculatedLuggageSurcharge = extraLargeLuggage * 10;
      
      // Determinar recargo por pasajeros (para compatibilidad con el otro hook)
      const calculatedPassengerSurcharge = passengers >= 4 && passengers <= 7 ? 10 : 0;
      
      const finalPrice = calculatedBasePrice + calculatedLuggageSurcharge;
      
      console.log('Price breakdown:', {
        basePrice: calculatedBasePrice,
        passengers,
        passengerRange: passengers <= 3 ? '1-3' : '4-7',
        luggageSurcharge: calculatedLuggageSurcharge,
        passengerSurcharge: calculatedPassengerSurcharge,
        extraLargeLuggage,
        serviceLevel,
        finalPrice
      });
      
      // Guardar desglose de precios
      setPriceBreakdown({
        basePrice: calculatedBasePrice,
        passengers,
        passengerRange: passengers <= 3 ? '1-3' : '4-7',
        luggageSurcharge: calculatedLuggageSurcharge,
        passengerSurcharge: calculatedPassengerSurcharge,
        extraLargeLuggage,
        serviceLevel,
        finalPrice
      });
      
      // Actualizar estados
      setBasePrice(calculatedBasePrice);
      setLuggageSurcharge(calculatedLuggageSurcharge);
      setPassengerSurcharge(calculatedPassengerSurcharge);
      setPrice(finalPrice);
      
      return finalPrice;
    } catch (err) {
      console.error('Error calculating price:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { 
    price, 
    basePrice,
    luggageSurcharge,
    passengerSurcharge,
    isLoading, 
    error, 
    calculatePrice, 
    priceBreakdown,
    distance,
    handleDistanceCalculated,
    // Para compatibilidad con el otro hook
    totalPrice: price
  };
};