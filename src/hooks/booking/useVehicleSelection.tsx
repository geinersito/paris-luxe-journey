
import { BookingFormData } from "./types";

export const useVehicleSelection = (
  setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>,
  calculatePrice: (vehicleType: string, distance: number, time: string) => void,
  distance: number,
  formData: BookingFormData
) => {
  const selectVehicleByPassengers = (passengers: string) => {
    const passengerCount = parseInt(passengers);
    let vehicleType = "";

    if (passengerCount >= 1 && passengerCount <= 3) {
      vehicleType = "berline";
    } else if (passengerCount >= 4 && passengerCount <= 7) {
      vehicleType = "van";
    }

    setFormData(prev => ({ ...prev, vehicleType }));
    calculatePrice(
      vehicleType,
      distance,
      formData.time
    );
  };

  return {
    selectVehicleByPassengers,
  };
};
