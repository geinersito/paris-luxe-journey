import { ServiceLevel, BookingPriceRequest, PriceCalculation } from '../types/pricing';
import { supabase } from '../lib/supabaseClient';

export class PriceCalculationService {
  private static instance: PriceCalculationService;
  private fixedRoutes: Map<string, any> = new Map();
  private serviceLevels: Map<string, ServiceLevel> = new Map();

  private constructor() {}

  public static getInstance(): PriceCalculationService {
    if (!PriceCalculationService.instance) {
      PriceCalculationService.instance = new PriceCalculationService();
    }
    return PriceCalculationService.instance;
  }

  public async initialize(): Promise<void> {
    await this.loadFixedRoutes();
    await this.loadServiceLevels();
  }

  private async loadFixedRoutes(): Promise<void> {
    // TODO: Create fixed_routes table in Supabase
    // For now, skip loading from database
    console.warn('Fixed routes table not available. Using pricing.ts constants only.');

    /* COMMENTED OUT: Requires fixed_routes table
    const { data, error } = await supabase
      .from('fixed_routes')
      .select('*');

    if (error) throw error;

    data?.forEach(route => {
      const key = this.generateRouteKey(route.origin_type, route.destination_type);
      this.fixedRoutes.set(key, route);
    });
    */
  }

  private async loadServiceLevels(): Promise<void> {
    // TODO: Create service_levels table in Supabase
    // For now, use vehicles table as fallback
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*');

      if (error) throw error;

      data?.forEach(vehicle => {
        this.serviceLevels.set(vehicle.id, {
          id: vehicle.id,
          name: vehicle.name,
          description: { en: vehicle.description || '' },
          features: vehicle.features || {},
          multiplier: 1.0 // Default multiplier
        });
      });
    } catch (error) {
      console.error('Error loading service levels from vehicles:', error);
    }
  }

  private generateRouteKey(origin: string, destination: string): string {
    return `${origin.toLowerCase()}_${destination.toLowerCase()}`;
  }

  public async calculatePrice(request: BookingPriceRequest): Promise<PriceCalculation> {
    try {
      // 1. Buscar ruta fija
      const fixedRoute = this.getFixedRoute(request);
      if (fixedRoute) {
        return this.calculateFixedRoutePrice(fixedRoute, request);
      }

      // 2. Si no es ruta fija, calcular precio dinámico
      return this.calculateDynamicPrice(request);
    } catch (error) {
      console.error('Error calculating price:', error);
      throw error;
    }
  }

  private getFixedRoute(request: BookingPriceRequest): any | null {
    const key = this.generateRouteKey(
      this.getLocationType(request.origin),
      this.getLocationType(request.destination)
    );
    return this.fixedRoutes.get(key) || null;
  }

  private getLocationType(location: string): string {
    // Implementar lógica para determinar el tipo de ubicación
    if (location.toLowerCase().includes('cdg')) return 'cdg_airport';
    if (location.toLowerCase().includes('orly')) return 'orly_airport';
    if (location.toLowerCase().includes('beauvais')) return 'beauvais_airport';
    if (location.toLowerCase().includes('disney')) return 'disney';
    return 'other';
  }

  private calculateFixedRoutePrice(route: any, request: BookingPriceRequest): PriceCalculation {
    const basePrice = request.passengers <= 3 ? route.base_price_1_3 : route.base_price_4_7;
    const serviceLevel = this.serviceLevels.get(request.serviceLevel);
    
    if (!serviceLevel) {
      throw new Error(`Service level ${request.serviceLevel} not found`);
    }

    return {
      basePrice,
      finalPrice: Math.round(basePrice * serviceLevel.multiplier),
      multiplier: serviceLevel.multiplier,
      currency: 'EUR',
      breakdown: {
        base: basePrice,
        serviceLevelAdjustment: basePrice * (serviceLevel.multiplier - 1),
        extras: 0
      }
    };
  }

  private async calculateDynamicPrice(request: BookingPriceRequest): Promise<PriceCalculation> {
    // Aquí implementaremos el cálculo basado en Google Maps y zonas
    // Por ahora, usamos un precio base temporal
    const basePrice = 100; // Temporal
    const serviceLevel = this.serviceLevels.get(request.serviceLevel);
    
    if (!serviceLevel) {
      throw new Error(`Service level ${request.serviceLevel} not found`);
    }

    return {
      basePrice,
      finalPrice: Math.round(basePrice * serviceLevel.multiplier),
      multiplier: serviceLevel.multiplier,
      currency: 'EUR',
      breakdown: {
        base: basePrice,
        serviceLevelAdjustment: basePrice * (serviceLevel.multiplier - 1),
        extras: 0
      }
    };
  }
}

export default PriceCalculationService;
