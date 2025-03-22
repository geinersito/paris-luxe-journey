import { Card } from "../ui/card";
import { BookingPrice } from "./BookingPrice";
import { useEffect, useState } from "react";
import { Euro } from "lucide-react";

interface PaymentSummaryProps {
  estimatedPrice: number;
  locationDetails: {
    pickup: string;
    dropoff: string;
  };
  bookingData: any;
  luggageSurcharge?: number; // Añadimos esta prop para recibir el recargo ya calculado
}

const PaymentSummary = ({ estimatedPrice, locationDetails, bookingData, luggageSurcharge }: PaymentSummaryProps) => {
  // Asegurar que los precios sean números enteros y consistentes
  const [consistentPrice, setConsistentPrice] = useState<number | null>(null);
  const [basePrice, setBasePrice] = useState<number | null>(null);
  const [calculatedLuggageSurcharge, setCalculatedLuggageSurcharge] = useState<number>(0);
  
  // Procesamiento del precio para garantizar consistencia
  useEffect(() => {
    // Convertir a número y redondear para evitar problemas con decimales
    const normalizedPrice = typeof estimatedPrice === 'number' 
      ? Math.round(estimatedPrice) 
      : typeof estimatedPrice === 'string' 
        ? Math.round(Number(estimatedPrice))
        : null;
    
    // Determinar el recargo por maletas - usar el proporcionado o calcularlo si no existe
    let finalLuggageSurcharge = 0;
    if (typeof luggageSurcharge === 'number') {
      // Si recibimos el recargo ya calculado, lo usamos directamente
      finalLuggageSurcharge = luggageSurcharge;
      console.log('PaymentSummary - Usando recargo por maletas proporcionado:', finalLuggageSurcharge);
    } else if (bookingData) {
      // Si no recibimos el recargo, lo calculamos según la lógica de negocio
      const largeLuggage = Number(bookingData.largeLuggageCount) || 0;
      // El precio base incluye 1 maleta grande
      const extraLargeLuggage = Math.max(0, largeLuggage - 1);
      finalLuggageSurcharge = extraLargeLuggage * 10; // 10€ por maleta grande adicional
      console.log('PaymentSummary - Recargo por maletas calculado localmente:', finalLuggageSurcharge);
    }
    
    setCalculatedLuggageSurcharge(finalLuggageSurcharge);
        
    // Extraer o calcular el precio base
    let calculatedBasePrice: number | null = null;
    
    if (normalizedPrice !== null && bookingData) {
      // IMPORTANTE: Si recibimos explícitamente un precio base, usarlo directamente
      if (typeof bookingData.basePrice === 'number') {
        calculatedBasePrice = Math.round(bookingData.basePrice);
        console.log('PaymentSummary - Usando precio base proporcionado:', calculatedBasePrice);
      } else {
        // Si no tenemos precio base, calcularlo restando el recargo por maletas del precio total
        // IMPORTANTE: Esto asume que el precio total ya incluye todos los recargos
        calculatedBasePrice = normalizedPrice - finalLuggageSurcharge;
        
        // Para viajes de ida y vuelta, el precio base es por trayecto
        if (bookingData.tripType === 'round_trip') {
          calculatedBasePrice = Math.round(calculatedBasePrice / 2);
        }
        
        console.log('PaymentSummary - Precio base calculado:', calculatedBasePrice);
      }
    }
    
    // Logs detallados para seguimiento del precio
    console.log('PaymentSummary - Precio original recibido:', estimatedPrice);
    console.log('PaymentSummary - Precio normalizado:', normalizedPrice);
    console.log('PaymentSummary - Precio base calculado:', calculatedBasePrice);
    console.log('PaymentSummary - Recargo por maletas final:', finalLuggageSurcharge);
    
    setConsistentPrice(normalizedPrice);
    setBasePrice(calculatedBasePrice);
  }, [estimatedPrice, bookingData, luggageSurcharge]);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Resumen de la Reserva</h2>
      <div className="space-y-4">
        <BookingPrice 
          price={consistentPrice} 
          basePrice={basePrice} 
          largeLuggage={Number(bookingData?.largeLuggageCount) || 0}
          smallLuggage={Number(bookingData?.smallLuggageCount) || 0}
          luggageSurcharge={calculatedLuggageSurcharge}
          passengerSurcharge={bookingData?.passengers >= 4 && bookingData?.passengers <= 7 ? 10 : 0}
        />
        
        {/* Desglose del precio para validar */}
        <div className="text-xs text-gray-500 -mt-2">
          {bookingData?.tripType === 'round_trip' && (
            <p>Viaje de ida y vuelta incluido</p>
          )}
          {Number(bookingData?.largeLuggageCount) > 0 && (
            <p>Equipaje grande: {bookingData?.largeLuggageCount}</p>
          )}
          {Number(bookingData?.smallLuggageCount) > 0 && (
            <p>Equipaje pequeño: {bookingData?.smallLuggageCount}</p>
          )}
          {Number(bookingData?.passengers) >= 4 && (
            <p>Suplemento por {bookingData?.passengers} pasajeros aplicado</p>
          )}
        </div>

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
          <p className="text-sm text-blue-700">
            Su pago será procesado de forma segura. Recibirá una confirmación por correo electrónico después de completar la reserva.
          </p>
        </div>
      </div>
    </Card>
  );
};

export { PaymentSummary };
