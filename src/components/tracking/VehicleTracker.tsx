import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Map, Marker } from 'mapbox-gl';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { Car } from 'lucide-react';

interface Vehicle {
  id: string;
  location: [number, number];
  status: 'available' | 'busy' | 'maintenance';
}

const mockVehicles: Vehicle[] = [
  { id: '1', location: [2.3522, 48.8566], status: 'available' },
  { id: '2', location: [2.3488, 48.8534], status: 'busy' },
];

export const VehicleTracker = () => {
  const { toast } = useToast();
  const [map, setMap] = useState<Map | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const { data: vehicles = mockVehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      // En un entorno real, esto sería una llamada a la API
      return mockVehicles;
    },
    refetchInterval: 10000, // Actualizar cada 10 segundos
  });

  useEffect(() => {
    if (!map) {
      const newMap = new Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [2.3522, 48.8566], // París
        zoom: 12,
      });

      setMap(newMap);
      return () => newMap.remove();
    }

    // Actualizar marcadores
    vehicles.forEach(vehicle => {
      const el = document.createElement('div');
      el.className = 'vehicle-marker';
      el.innerHTML = `<div class="p-2 bg-primary text-white rounded-full">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4.34a3 3 0 0 0-2.91 2.27L.36 11.54c-.24.959-.24 1.962 0 2.92L1 17h2"></path>
          <path d="M14 17H9"></path>
          <circle cx="6.5" cy="17.5" r="2.5"></circle>
          <circle cx="16.5" cy="17.5" r="2.5"></circle>
        </svg>
      </div>`;

      new Marker({ element: el })
        .setLngLat(vehicle.location)
        .addTo(map);
    });
  }, [map, vehicles]);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    map?.flyTo({
      center: vehicle.location,
      zoom: 14,
    });
    toast({
      title: "Vehículo seleccionado",
      description: `ID: ${vehicle.id} - Estado: ${vehicle.status}`,
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {vehicles.map(vehicle => (
          <Button
            key={vehicle.id}
            variant={selectedVehicle?.id === vehicle.id ? "default" : "outline"}
            onClick={() => handleVehicleSelect(vehicle)}
            className="flex items-center gap-2"
          >
            <Car className="h-4 w-4" />
            <span>Vehículo {vehicle.id}</span>
          </Button>
        ))}
      </div>
      <div id="map" className="h-[400px] rounded-lg shadow-lg"></div>
    </div>
  );
};