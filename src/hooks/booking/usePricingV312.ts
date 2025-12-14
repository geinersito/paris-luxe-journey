/**
 * HOOK: usePricingV312
 * 
 * Hook para integrar con el nuevo Pricing API V3.1.2
 * Reemplaza el cálculo de precios local por llamadas al endpoint público
 */

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export type RouteKey = 
  | 'CDG_PARIS' | 'PARIS_CDG'
  | 'ORLY_PARIS' | 'PARIS_ORLY'
  | 'DISNEY_PARIS' | 'PARIS_DISNEY'
  | 'VERSAILLES_PARIS' | 'PARIS_VERSAILLES'
  | 'BEAUVAIS_PARIS' | 'PARIS_BEAUVAIS'
  | 'GARE_NORD_PARIS' | 'PARIS_GARE_NORD'
  | 'GARE_EST_PARIS' | 'PARIS_GARE_EST'
  | 'GARE_LYON_PARIS' | 'PARIS_GARE_LYON'
  | 'GARE_MONTPARNASSE_PARIS' | 'PARIS_GARE_MONTPARNASSE';

export type VehicleType = 'sedan' | 'van';

export interface PricingResult {
  currency: 'EUR';
  pricing_version: 'v3.1.2';
  prepaid_price: number; // En euros
  flexible_price: number; // En euros
  hold_amount: number; // En euros
  payment_modes_enabled: {
    prepaid: boolean;
    flexible: boolean;
  };
}

interface UsePricingV312Options {
  routeKey?: RouteKey;
  vehicleType?: VehicleType;
  autoFetch?: boolean; // Fetch automático cuando cambian los parámetros
}

export const usePricingV312 = (options: UsePricingV312Options = {}) => {
  const { routeKey, vehicleType, autoFetch = false } = options;
  const { toast } = useToast();

  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch pricing desde el API
   */
  const fetchPricing = useCallback(async (
    route: RouteKey,
    vehicle: VehicleType
  ): Promise<PricingResult | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/pricing/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route_key: route,
          vehicle_type: vehicle,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error calculating pricing');
      }

      const data: PricingResult = await response.json();
      
      // Convertir de céntimos a euros si es necesario
      // (El API debería devolver en euros, pero por si acaso)
      const normalizedData: PricingResult = {
        ...data,
        prepaid_price: data.prepaid_price > 1000 
          ? data.prepaid_price / 100 
          : data.prepaid_price,
        flexible_price: data.flexible_price > 1000 
          ? data.flexible_price / 100 
          : data.flexible_price,
        hold_amount: data.hold_amount > 100 
          ? data.hold_amount / 100 
          : data.hold_amount,
      };

      setPricing(normalizedData);
      return normalizedData;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      toast({
        title: 'Error al calcular precio',
        description: errorMessage,
        variant: 'destructive',
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  /**
   * Auto-fetch cuando cambian los parámetros
   */
  useEffect(() => {
    if (autoFetch && routeKey && vehicleType) {
      fetchPricing(routeKey, vehicleType);
    }
  }, [autoFetch, routeKey, vehicleType, fetchPricing]);

  /**
   * Reset pricing
   */
  const resetPricing = useCallback(() => {
    setPricing(null);
    setError(null);
  }, []);

  return {
    pricing,
    isLoading,
    error,
    fetchPricing,
    resetPricing,
    
    // Helpers
    hasPricing: pricing !== null,
    isPrepaidAvailable: pricing?.payment_modes_enabled.prepaid ?? false,
    isFlexibleAvailable: pricing?.payment_modes_enabled.flexible ?? false,
  };
};

/**
 * Helper: Determinar route_key desde ubicaciones
 */
export const getRouteKeyFromLocations = (
  pickup: string,
  dropoff: string
): RouteKey | null => {
  const normalize = (str: string) => str.toLowerCase().trim();
  
  const p = normalize(pickup);
  const d = normalize(dropoff);

  // CDG
  if (p.includes('cdg') || p.includes('charles de gaulle')) {
    if (d.includes('paris')) return 'CDG_PARIS';
  }
  if (d.includes('cdg') || d.includes('charles de gaulle')) {
    if (p.includes('paris')) return 'PARIS_CDG';
  }

  // Orly
  if (p.includes('orly')) {
    if (d.includes('paris')) return 'ORLY_PARIS';
  }
  if (d.includes('orly')) {
    if (p.includes('paris')) return 'PARIS_ORLY';
  }

  // Disneyland
  if (p.includes('disney')) {
    if (d.includes('paris')) return 'DISNEY_PARIS';
  }
  if (d.includes('disney')) {
    if (p.includes('paris')) return 'PARIS_DISNEY';
  }

  // Versailles
  if (p.includes('versailles')) {
    if (d.includes('paris')) return 'VERSAILLES_PARIS';
  }
  if (d.includes('versailles')) {
    if (p.includes('paris')) return 'PARIS_VERSAILLES';
  }

  // Beauvais
  if (p.includes('beauvais')) {
    if (d.includes('paris')) return 'BEAUVAIS_PARIS';
  }
  if (d.includes('beauvais')) {
    if (p.includes('paris')) return 'PARIS_BEAUVAIS';
  }

  return null;
};

