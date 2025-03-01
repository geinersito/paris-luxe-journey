import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface RouteMapProps {
  pickup: string;
  dropoff: string;
  onDistanceCalculated: (distance: number) => void;
}

const RouteMap = ({ pickup, dropoff, onDistanceCalculated }: RouteMapProps) => {
  // Temporary fixed distance calculation while Maps API is disabled
  const calculateApproximateDistance = () => {
    // Default to 10km for testing
    const defaultDistance = 10;
    onDistanceCalculated(defaultDistance);
  };

  // Calculate distance when pickup or dropoff changes
  React.useEffect(() => {
    if (pickup && dropoff) {
      calculateApproximateDistance();
    }
  }, [pickup, dropoff]);

  return (
    <div className="w-full h-[400px] rounded-lg border border-muted bg-muted/10 p-6 flex items-center justify-center">
      <Alert variant="default" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Servicio de mapas temporalmente deshabilitado</AlertTitle>
        <AlertDescription>
          Estamos actualizando nuestro servicio de mapas para mejorar tu experiencia.
          Por favor, ten en cuenta que las distancias mostradas son aproximadas.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default RouteMap;