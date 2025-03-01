
import { useState } from "react";
import { Vehicle } from "../useVehicles";

const BASE_PRICES = {
  berline: 80,
  van: 120,
};

const PRICE_PER_KM = {
  berline: 2,
  van: 2.5,
};

export const useBookingPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [distance, setDistance] = useState<number>(0);

  const calculatePrice = (
    vehicles: Vehicle[],
    distance: number,
    time: string
  ) => {
    let total = 0;

    // Calculate base price for all vehicles
    vehicles.forEach((vehicle) => {
      const basePrice = BASE_PRICES[vehicle.type as keyof typeof BASE_PRICES] || 0;
      const pricePerKm = PRICE_PER_KM[vehicle.type as keyof typeof PRICE_PER_KM] || 0;
      total += basePrice + (distance * pricePerKm);
    });

    // Night rate (22:00 - 06:00): 20% extra
    const hour = parseInt(time.split(":")[0]);
    if (hour >= 22 || hour < 6) {
      total *= 1.2;
    }

    setPrice(total);
  };

  const handleDistanceCalculated = (newDistance: number) => {
    setDistance(newDistance);
  };

  return {
    price,
    distance,
    calculatePrice,
    handleDistanceCalculated,
  };
};
