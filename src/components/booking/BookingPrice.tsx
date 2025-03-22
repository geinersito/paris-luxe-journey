import { Euro } from "lucide-react";
import { useEffect, useState } from "react";

interface BookingPriceProps {
  price: number | null;
  basePrice: number | null; // Nueva prop para recibir directamente el precio base
  distance?: number;
  largeLuggage?: number;
  smallLuggage?: number;
  luggageSurcharge?: number;
  passengerSurcharge?: number; // Nueva prop para recibir el recargo por pasajeros
}

export const BookingPrice = ({ 
  price, 
  basePrice, 
  distance, 
  largeLuggage = 0, 
  smallLuggage = 0, 
  luggageSurcharge = 0,
  passengerSurcharge = 0 
}: BookingPriceProps) => {
  useEffect(() => {
    console.log('BookingPrice recibiendo:', { 
      price, 
      basePrice, 
      luggageSurcharge,
      passengerSurcharge,
      largeLuggage,
      smallLuggage
    });
  }, [price, basePrice, luggageSurcharge, passengerSurcharge, largeLuggage, smallLuggage]);

  // Asegurarnos de que el precio sea un número antes de formatearlo
  const formattedPrice = typeof price === 'number' ? Math.round(price) : null;
  
  // Ya no calculamos el precio base, lo recibimos directamente como prop
  const formattedBasePrice = typeof basePrice === 'number' ? Math.round(basePrice) : null;
  
  return (
    <>
      {distance && distance > 0 && (
        <div className="bg-primary/5 p-3 rounded-md">
          <p className="text-sm text-gray-600">
            Distancia estimada: {distance.toFixed(1)} km
          </p>
        </div>
      )}

      {formattedPrice !== null && (
        <div className="bg-primary/10 p-4 rounded-md animate-fadeIn">
          {/* Precio base */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Precio base:</span>
            <span className="text-sm font-medium flex items-center">
              <Euro className="h-4 w-4 mr-1" />
              {formattedBasePrice} €
            </span>
          </div>
          
          {/* Políticas de precio */}
          <div className="text-xs text-gray-600 mb-2 pb-2 border-b border-gray-200">
            <p>Incluye: 1 maleta grande + 1 pequeña en total</p>
            
            {/* Recargo por grupo de 4-7 pasajeros - Mostrar solo si hay recargo */}
            {passengerSurcharge > 0 && (
              <div className="flex items-center justify-between mt-1">
                <span>Grupo 4-7 pasajeros:</span>
                <span className="font-medium flex items-center">
                  <Euro className="h-3 w-3 mr-1" />
                  {passengerSurcharge} €
                </span>
              </div>
            )}
            
            {/* Recargo por maletas adicionales */}
            {luggageSurcharge > 0 && (
              <div className="flex items-center justify-between mt-1">
                <span>Maletas adicionales:</span>
                <span className="font-medium flex items-center">
                  <Euro className="h-3 w-3 mr-1" />
                  {luggageSurcharge} €
                </span>
              </div>
            )}
          </div>
          
          {/* Precio total */}
          <div className="flex items-center justify-between mt-2 pt-1">
            <span className="font-semibold">Precio Total:</span>
            <span className="text-xl font-display text-primary flex items-center">
              <Euro className="h-5 w-5 mr-1" />
              {formattedPrice} €
            </span>
          </div>
          
          {/* Detalle de equipaje */}
          {largeLuggage > 0 && (
            <div className="mt-2 text-xs text-gray-600">
              Equipaje seleccionado: {largeLuggage} maleta{largeLuggage !== 1 ? 's' : ''} grande{largeLuggage !== 1 ? 's' : ''}
              {smallLuggage > 0 && (
                <>, {smallLuggage} maleta{smallLuggage !== 1 ? 's' : ''} pequeña{smallLuggage !== 1 ? 's' : ''}</>  
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
