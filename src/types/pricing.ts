export interface ServiceLevel {
  id: string;
  name: string;
  description: Record<string, string>;
  features: {
    wifi: boolean | 'on request';
    water: boolean;
    meet_greet: boolean;
    flight_tracking: boolean;
    [key: string]: any;
  };
  multiplier: number;
}

export interface FixedRoute {
  id: string;
  route_type: string;
  origin_type: string;
  destination_type: string;
  base_price_1_3: number;
  base_price_4_7: number;
  description: Record<string, string>;
  estimated_duration?: number;
}

export interface HourlyRate {
  id: string;
  service_type: string;
  base_rate: number;
  min_hours: number;
  description: Record<string, string>;
}

export interface VehicleCategory {
  id: string;
  name: string;
  description: Record<string, string>;
  capacity_passengers: number;
  capacity_suitcases: number;
  capacity_carry_on: number;
  images?: Record<string, string[]>;
}

export interface BookingPriceRequest {
  pickup: {
    type: string;
    code?: string;
    zone?: string;
  };
  dropoff: {
    type: string;
    code?: string;
    zone?: string;
  };
  serviceLevel: string;
  passengers: number;
  luggage: {
    large: number;
    carryOn: number;
  };
  bookingType: 'transfer' | 'hourly';
  hours?: number;
}

export interface PriceCalculation {
  basePrice: number;
  serviceLevelMultiplier: number;
  vehicleSupplement: number;
  luggageSupplement: number;
  totalPrice: number;
  breakdown: {
    description: string;
    amount: number;
  }[];
}
