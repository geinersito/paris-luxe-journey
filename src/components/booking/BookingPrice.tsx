
import { Euro } from "lucide-react";

interface BookingPriceProps {
  price: number | null;
  distance?: number;
}

export const BookingPrice = ({ price, distance }: BookingPriceProps) => {
  return (
    <>
      {distance && distance > 0 && (
        <div className="bg-primary/5 p-3 rounded-md">
          <p className="text-sm text-gray-600">
            Distancia estimada: {distance.toFixed(1)} km
          </p>
        </div>
      )}

      {price && (
        <div className="bg-primary/10 p-4 rounded-md animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Precio Total:</span>
            <span className="text-xl font-display text-primary flex items-center">
              <Euro className="h-5 w-5 mr-1" />
              {price.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
