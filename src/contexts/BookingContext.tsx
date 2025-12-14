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

interface CouponData {
  code: string;
  discount: number; // Percentage (e.g., 10 for 10%)
  valid: boolean;
  email?: string;
  expiresAt?: string;
}

interface BookingContextType {
  bookingData: BookingData | null;
  estimatedPrice: number;
  coupon: CouponData | null;
  finalPrice: number;
  updateBookingData: (data: Partial<BookingData>) => Promise<void>;
  calculatePrice: (origin: string, destination: string, passengers: number) => Promise<number>;
  validatePriceWithBackend: () => Promise<boolean>;
  validateCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
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
  const [coupon, setCoupon] = useState<CouponData | null>(null);
  const { calculatePrice: apiCalculatePrice } = useBookingPrice();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Calculate final price with coupon discount
  const finalPrice = coupon?.valid
    ? estimatedPrice * (1 - coupon.discount / 100)
    : estimatedPrice;
  
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

  // Validate coupon code
  const validateCoupon = useCallback(async (code: string): Promise<boolean> => {
    if (!code || code.trim() === '') {
      setCoupon(null);
      return false;
    }

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration missing');
      }

      // Call Supabase function to validate coupon
      const response = await fetch(
        `${supabaseUrl}/rest/v1/rpc/validate_coupon`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify({
            p_coupon_code: code.toUpperCase().trim()
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to validate coupon');
      }

      const data = await response.json();

      // Check if we got a valid response
      if (data && data.length > 0) {
        const couponData = data[0];

        if (couponData.valid) {
          setCoupon({
            code: code.toUpperCase().trim(),
            discount: couponData.discount_percent || 10,
            valid: true,
            email: couponData.email,
            expiresAt: couponData.expires_at
          });

          toast({
            title: t.booking.couponApplied || 'Coupon applied!',
            description: `${couponData.discount_percent}% discount applied to your booking.`,
          });

          return true;
        }
      }

      // Invalid or expired coupon
      setCoupon(null);
      toast({
        title: t.booking.invalidCoupon || 'Invalid coupon',
        description: t.booking.couponExpired || 'This coupon is invalid or has expired.',
        variant: 'destructive'
      });

      return false;

    } catch (error) {
      console.error('Error validating coupon:', error);
      setCoupon(null);
      toast({
        title: t.common.error || 'Error',
        description: t.booking.couponError || 'Failed to validate coupon. Please try again.',
        variant: 'destructive'
      });
      return false;
    }
  }, [toast, t]);

  // Remove coupon
  const removeCoupon = useCallback(() => {
    setCoupon(null);
    toast({
      title: t.booking.couponRemoved || 'Coupon removed',
      description: t.booking.couponRemovedDesc || 'The discount has been removed from your booking.',
    });
  }, [toast, t]);

  // Detect coupon code in URL query params
  // Note: This runs only once on mount to check for coupon in URL
  useEffect(() => {
    // Check URL params for coupon code
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const couponCode = params.get('coupon');

      if (couponCode && !coupon) {
        // Auto-validate coupon from URL
        validateCoupon(couponCode);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const resetBooking = useCallback(() => {
    setBookingData(null);
    setEstimatedPrice(0);
    setPriceTimestamp(null);
    setCoupon(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const contextValue = React.useMemo(() => ({
    bookingData,
    estimatedPrice,
    coupon,
    finalPrice,
    updateBookingData,
    calculatePrice,
    validatePriceWithBackend,
    validateCoupon,
    removeCoupon,
    priceTimestamp,
    resetBooking
  }), [bookingData, estimatedPrice, coupon, finalPrice, updateBookingData, calculatePrice, validatePriceWithBackend, validateCoupon, removeCoupon, priceTimestamp, resetBooking]);

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