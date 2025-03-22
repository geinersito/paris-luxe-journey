export interface BookingFormData {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: string;
  serviceLevel: string;
  largeLuggageCount: string;
  smallLuggageCount: string;
  calculatedPrice: number;
  basePrice?: number; // Precio base sin recargos
  luggageSurcharge?: number; // Recargo específico por maletas
}

export interface BookingDetails extends BookingFormData {
  id?: string;
  userId?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}
