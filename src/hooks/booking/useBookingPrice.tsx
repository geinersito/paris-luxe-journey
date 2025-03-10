
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const roundDownToMultipleOf5 = (value: number): number => {
  return Math.floor(value / 5) * 5;
};

export const useBookingPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [distance, setDistance] = useState<number>(0);

  const calculatePrice = async (
    origin: string | unknown,
    destination: string | unknown
  ) => {
    // Enhanced input validation
    if (!origin || !destination || 
        typeof origin !== 'string' || 
        typeof destination !== 'string' ||
        Array.isArray(origin) ||
        Array.isArray(destination)) {
      console.error('Invalid input:', { origin, destination });
      setError('Invalid location codes');
      setPrice(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: dbError } = await supabase
        .from('price_matrix')
        .select('base_price')
        .eq('origin_code', origin.toUpperCase())
        .eq('destination_code', destination.toUpperCase())
        .single();

      if (dbError || !data) {
        console.error('Route not found:', { error: dbError, origin, destination });
        setError('Route not available');
        setPrice(null);
        return;
      }

      const finalPrice = roundDownToMultipleOf5(data.base_price);
      setPrice(finalPrice);
    } catch (err) {
      console.error('Error calculating price:', err);
      setError('Error calculating price');
      setPrice(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDistanceCalculated = (newDistance: number) => {
    setDistance(newDistance);
  };

  return {
    price,
    isLoading,
    error,
    distance,
    calculatePrice,
    handleDistanceCalculated,
  };
};
