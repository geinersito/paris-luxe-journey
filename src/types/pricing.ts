export interface ServiceLevel {
  id: string;
  name: string;
  description: Record<string, string>;
  features: {
    wifi: boolean;
    water: boolean;
    meet_greet: boolean;
    flight_tracking: boolean;
    [key: string]: any;
  };
  multiplier: number;
}

export interface BookingPriceRequest {
  origin: string;
  destination: string;
  passengers: number;
  serviceLevel: string;
  date: string;
  time: string;
  luggage?: {
    large: number;
    small: number;
  };
}

export interface PriceCalculation {
  basePrice: number;
  finalPrice: number;
  multiplier: number;
  currency: string;
  breakdown: {
    base: number;
    serviceLevelAdjustment: number;
    extras: number;
  };
}

export interface Zone {
  id: string;
  name: string;
  center: {
    lat: number;
    lng: number;
  };
  minPrice: number;
  type: 'airport' | 'city' | 'landmark' | 'other';
}

export interface FixedRoute {
  id: string;
  origin_type: string;
  destination_type: string;
  base_price_1_3: number;
  base_price_4_7: number;
  estimated_duration: number;
  description: Record<string, string>;
}
