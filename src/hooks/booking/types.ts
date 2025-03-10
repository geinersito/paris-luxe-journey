export interface BookingFormData {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  returnDate?: string;
  returnTime?: string;
  passengers: string;
  vehicleType: string;
  vehicle_id: string;
  flight_number?: string;
  address_details?: string;
  tripType: 'one_way' | 'round_trip';
  largeLuggageCount: number;
  smallLuggageCount: number;
  serviceLevel?: string;
  passengerInfo: {
    fullName: string;
    email: string;
    phone: string;
    specialInstructions?: string;
  };
}
