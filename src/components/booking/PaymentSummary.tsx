
import { Card } from "../ui/card";
import { BookingPrice } from "./BookingPrice";

interface PaymentSummaryProps {
  estimatedPrice: number;
  locationDetails: {
    pickup: string;
    dropoff: string;
  };
  bookingData: any;
}

const PaymentSummary = ({ estimatedPrice, locationDetails, bookingData }: PaymentSummaryProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Resumen de la Reserva</h2>
      <div className="space-y-4">
        <BookingPrice price={estimatedPrice} />
        <div className="text-sm space-y-2 mt-4">
          <p><strong>Origen:</strong> {locationDetails?.pickup || 'Cargando...'}</p>
          <p><strong>Destino:</strong> {locationDetails?.dropoff || 'Cargando...'}</p>
          <p><strong>Fecha:</strong> {bookingData?.date}</p>
          <p><strong>Hora:</strong> {bookingData?.time}</p>
          <p><strong>Pasajeros:</strong> {bookingData?.passengers}</p>
          {bookingData?.tripType === 'round_trip' && (
            <p><strong>Vuelta:</strong> {bookingData?.returnDateTime}</p>
          )}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Tarjeta de prueba:</strong> 4242 4242 4242 4242
            <br />
            <strong>Fecha:</strong> Cualquier fecha futura
            <br />
            <strong>CVC:</strong> Cualquier número de 3 dígitos
          </p>
        </div>
      </div>
    </Card>
  );
};

export { PaymentSummary };
