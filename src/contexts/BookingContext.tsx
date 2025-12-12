import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, memo } from 'react';
import { useBookingPrice } from '@/hooks/booking/useBookingPrice';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

// Define more specific types for better type safety
interface BookingData {
  pickup: string;
  dropoff: string;
  passengers: number;
  date: string;
  time: string;
  vehicle_id?: string;
  vehicleType?: string;
  tripType?: 'one_way' | 'round_trip';
  largeLuggageCount?: number;
  smallLuggageCount?: number;
  flight_number?: string;
  address_details?: string;
  luggageSurcharge?: number;
  passengerInfo?: {
    fullName: string;
    email: string;
    phone: string;
    specialInstructions?: string;
    flightNumber?: string;
  };
  [key: string]: any; // Allow for additional properties
}

interface PriceCache {
  [key: string]: {
    price: number;
    timestamp: number;
  };
}

interface BookingContextType {
  bookingData: BookingData | null;
  estimatedPrice: number;
  updateBookingData: (data: Partial<BookingData>) => Promise<void>;
  calculatePrice: (origin: string, destination: string, passengers: number) => Promise<number>;
  validatePriceWithBackend: () => Promise<boolean>;
  priceTimestamp: number | null;
  resetBooking: () => void;
}

const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes in milliseconds
const STORAGE_KEY = 'paris_luxe_booking_data';
const PRICE_CACHE_KEY = 'paris_luxe_price_cache';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Memoized children wrapper to prevent unnecessary re-renders
const MemoizedChildren = memo(({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
});
MemoizedChildren.displayName = 'MemoizedBookingChildren';

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
  const [priceCache, setPriceCache] = useState<PriceCache>({});
  const [priceTimestamp, setPriceTimestamp] = useState<number | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const { calculatePrice: apiCalculatePrice } = useBookingPrice();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Añadir una función de ayuda para gestionar errores de forma consistente
  const logError = useCallback((message: string, error: any) => {
    // Aquí podrías agregar analíticas de errores o logging remoto si lo necesitas
  }, []);

  // Load saved data from localStorage on initial render
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedCache = localStorage.getItem(PRICE_CACHE_KEY);
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const loadedBookingData = parsedData.bookingData || null;
        const loadedPrice = parsedData.estimatedPrice || 0;
        const loadedTimestamp = parsedData.priceTimestamp || null;

        setBookingData(loadedBookingData);
        setEstimatedPrice(loadedPrice);
        setPriceTimestamp(loadedTimestamp);
      }
      
      if (savedCache) {
        const parsedCache = JSON.parse(savedCache);
        
        // Filter out expired cache entries
        const now = Date.now();
        const validCache: PriceCache = {};
        
        Object.entries(parsedCache).forEach(([key, value]: [string, any]) => {
          if (now - value.timestamp < CACHE_EXPIRY) {
            validCache[key] = value;
          }
        });
        
        setPriceCache(validCache);
      }
    } catch (error) {
      logError('Error loading saved data', error);
    }
  }, [logError]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (bookingData || estimatedPrice) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          bookingData,
          estimatedPrice,
          priceTimestamp
        }));
      } catch (error) {
        logError('Error saving data', error);
      }
    }
  }, [bookingData, estimatedPrice, priceTimestamp, logError]);

  // Save price cache to localStorage
  useEffect(() => {
    if (Object.keys(priceCache).length > 0) {
      try {
        localStorage.setItem(PRICE_CACHE_KEY, JSON.stringify(priceCache));
      } catch (error) {
        logError('Error saving price cache', error);
      }
    }
  }, [priceCache, logError]);

  const calculatePrice = useCallback(async (origin: string, destination: string, passengers: number): Promise<number> => {
    // Validar que passengers sea un número válido
    if (isNaN(Number(passengers)) || Number(passengers) <= 0) {
      return 0;
    }

    const cacheKey = `${origin}-${destination}-${passengers}`;
    const now = Date.now();

    // Check if we have a valid cached price
    if (priceCache[cacheKey] && (now - priceCache[cacheKey].timestamp < CACHE_EXPIRY)) {
      return priceCache[cacheKey].price;
    }

    // Otherwise calculate new price
    const price = await apiCalculatePrice(origin, destination, passengers);
    
    // Update cache with new price
    setPriceCache(prev => ({
      ...prev,
      [cacheKey]: { price, timestamp: now }
    }));
    
    return price;
  }, [priceCache, apiCalculatePrice]);

  // In the updateBookingData function, around line 217
  const updateBookingData = async (data: Partial<BookingData>) => {
    const updatedData = { ...bookingData, ...data };
    setBookingData(updatedData as BookingData);

    if (updatedData.pickup && updatedData.dropoff && updatedData.passengers) {
      try {
        // Validar que passengers sea un número válido
        const passengersNum = Number(updatedData.passengers);
        if (isNaN(passengersNum) || passengersNum <= 0) {
          return;
        }

        // Si ya tenemos un precio base en los datos, usarlo directamente
        let basePrice = 0;
        if (typeof updatedData.basePrice === 'number' && updatedData.basePrice > 0) {
          basePrice = updatedData.basePrice;
        } else {
          // Si no tenemos precio base, calcularlo
          basePrice = await calculatePrice(
            updatedData.pickup,
            updatedData.dropoff,
            passengersNum
          );
        }

        // Calcular el recargo por maletas si no está incluido en los datos
        let luggageSurcharge = 0;
        if (typeof updatedData.luggageSurcharge === 'number') {
          // Si recibimos el recargo ya calculado, lo usamos directamente
          luggageSurcharge = updatedData.luggageSurcharge;
        } else if (updatedData.largeLuggageCount) {
          // Si no recibimos el recargo, lo calculamos según la lógica de negocio
          const largeLuggage = Number(updatedData.largeLuggageCount) || 0;
          // El precio base incluye 1 maleta grande
          const extraLargeLuggage = Math.max(0, largeLuggage - 1);
          luggageSurcharge = extraLargeLuggage * 10; // 10€ por maleta grande adicional

          // Actualizar los datos con el recargo calculado
          updatedData.luggageSurcharge = luggageSurcharge;
          setBookingData(updatedData as BookingData);
        }

        // Calcular el precio total incluyendo el recargo por maletas
        const totalPrice = basePrice + luggageSurcharge;

        const timestamp = Date.now();
        
        setEstimatedPrice(totalPrice);
        setPriceTimestamp(timestamp);
      } catch (error) {
        logError('Error calculating price', error);
      }
    }
  };
  
  const validatePriceWithBackend = useCallback(async (): Promise<boolean> => {
    if (!bookingData?.pickup || !bookingData?.dropoff || !bookingData?.passengers) {
      logError('Cannot validate price', 'missing required booking data');
      return false;
    }
    
    setIsValidating(true);

    try {
      // Get fresh price from API to validate
      const validPrice = await apiCalculatePrice(
        bookingData.pickup,
        bookingData.dropoff,
        Number(bookingData.passengers)
      );

      // Check if current price matches backend price
      const isValid = Math.abs(validPrice - estimatedPrice) < 0.01;

      if (!isValid) {
        // Update to correct price
        setEstimatedPrice(validPrice);
        setPriceTimestamp(Date.now());
      }
      
      return isValid;
    } catch (error) {
      logError('Error validating price', error);
      
      // Check if it's a network error
      if (error instanceof Error && (
        error.message.includes('network') || 
        error.message.includes('connection') ||
        error.message.includes('offline')
      )) {
        toast({
          title: t.common.error,
          description: t.booking.errors.networkError,
          variant: "destructive",
        });
      }
      
      // If we can't validate due to an error, we should be cautious
      // and not proceed with potentially incorrect pricing
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [bookingData, estimatedPrice, apiCalculatePrice, toast, t, logError]);

  const resetBooking = useCallback(() => {
    setBookingData(null);
    setEstimatedPrice(0);
    setPriceTimestamp(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const contextValue = React.useMemo(() => ({
    bookingData,
    estimatedPrice,
    updateBookingData,
    calculatePrice,
    validatePriceWithBackend,
    priceTimestamp,
    resetBooking
  }), [bookingData, estimatedPrice, updateBookingData, calculatePrice, validatePriceWithBackend, priceTimestamp, resetBooking]);

  return (
    <BookingContext.Provider value={contextValue}>
      <MemoizedChildren>{children}</MemoizedChildren>
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};