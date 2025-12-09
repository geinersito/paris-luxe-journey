import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { calculatePrice as calculatePriceFromConfig, generateRouteKey, PRICING } from '@/config/pricing';

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

      // Generar route key desde pricing.ts
      const routeKey = generateRouteKey(params.origin, params.destination);

      if (!routeKey) {
        // Si no hay ruta fija, intentar buscar en la base de datos (fallback)
        console.warn('No fixed route found in pricing.ts, trying database...');
        const { data, error } = await supabase
          .from('fixed_routes')
          .select('base_price_1_3, base_price_4_7, route_type')
          .or(`route_type.eq.${params.origin.toLowerCase()}_${params.destination.toLowerCase()},route_type.eq.${params.destination.toLowerCase()}_${params.origin.toLowerCase()}`)
          .single();

        if (error || !data) {
          throw new Error('No price found for this route');
        }

        let calculatedBasePrice = passengers <= 3 ? data.base_price_1_3 : data.base_price_4_7;

        // Aplicar multiplicador según nivel de servicio (solo Standard está activo)
        // Standard ya tiene los precios finales en la BD (no necesita multiplicador)

        priceCache.set(cacheKey, calculatedBasePrice);

        const extraLargeLuggage = Math.max(0, largeLuggage - 1);
        const calculatedLuggageSurcharge = extraLargeLuggage * PRICING.surcharges.extraBag;
        const calculatedPassengerSurcharge = passengers >= 4 && passengers <= 7 ? 10 : 0;
        const finalPrice = calculatedBasePrice + calculatedLuggageSurcharge;

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

        setBasePrice(calculatedBasePrice);
        setLuggageSurcharge(calculatedLuggageSurcharge);
        setPassengerSurcharge(calculatedPassengerSurcharge);
        setPrice(finalPrice);

        return finalPrice;
      }

      // Usar pricing.ts para calcular el precio
      const extraLargeLuggage = Math.max(0, largeLuggage - 1);
      const calculatedBasePrice = calculatePriceFromConfig(routeKey, passengers, { extraBags: 0 });
      const calculatedLuggageSurcharge = extraLargeLuggage * PRICING.surcharges.extraBag;
      const finalPrice = calculatedBasePrice + calculatedLuggageSurcharge;

      console.log('Price calculated from pricing.ts:', {
        routeKey,
        basePrice: calculatedBasePrice,
        extraBags: extraLargeLuggage,
        luggageSurcharge: calculatedLuggageSurcharge,
        finalPrice
      });

      // Guardar en caché el precio base (sin recargos por maletas)
      priceCache.set(cacheKey, calculatedBasePrice);
      
      // Determinar recargo por pasajeros (para compatibilidad con el otro hook)
      const calculatedPassengerSurcharge = passengers >= 4 && passengers <= 7 ? 10 : 0;

      console.log('Price breakdown:', {
        basePrice: calculatedBasePrice,
        passengers,
        passengerRange: passengers <= 3 ? '1-3' : '4-7',
        luggageSurcharge: calculatedLuggageSurcharge,
        passengerSurcharge: calculatedPassengerSurcharge,
        extraLargeLuggage,
        serviceLevel,
        finalPrice,
        routeKey
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
        finalPrice,
        routeKey
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