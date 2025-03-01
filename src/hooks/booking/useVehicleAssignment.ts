
import { useState, useEffect } from 'react';
import { BookingFormData } from './types';
import { Vehicle, useVehicles } from '../useVehicles';

export const useVehicleAssignment = (formData: BookingFormData) => {
  const [assignedVehicles, setAssignedVehicles] = useState<Vehicle[]>([]);
  const { data: vehicles, isLoading } = useVehicles();

  useEffect(() => {
    const calculateRequiredVehicles = () => {
      // No calcular si no hay datos de vehículos o si está cargando
      if (!vehicles || isLoading) {
        console.log('Esperando datos de vehículos...');
        return;
      }

      // No calcular si no hay pasajeros seleccionados
      if (!formData.passengers) {
        console.log('Esperando selección de pasajeros...');
        return;
      }

      console.log('Calculating required vehicles with:', {
        passengers: formData.passengers,
        largeLuggage: formData.largeLuggageCount,
        smallLuggage: formData.smallLuggageCount,
        availableVehicles: vehicles
      });

      const passengers = parseInt(formData.passengers);
      const largeLuggage = parseInt(String(formData.largeLuggageCount)) || 0;
      const smallLuggage = parseInt(String(formData.smallLuggageCount)) || 0;

      let selectedVehicles: Vehicle[] = [];

      // Calcula el total de equipaje ponderado (maleta grande = 1.5 unidades, maleta pequeña = 1 unidad)
      const totalWeightedLuggage = (largeLuggage * 1.5) + smallLuggage;
      
      // Encuentra los vehículos disponibles de cada tipo
      const availableBerlines = vehicles.filter(v => v.type === 'berline');
      const availableVans = vehicles.filter(v => v.type === 'van');

      // Capacidades por tipo de vehículo
      const BERLINE_MAX_PASSENGERS = 4;
      const VAN_MAX_PASSENGERS = 7;
      const BERLINE_MAX_LUGGAGE = 3;
      const VAN_MAX_LUGGAGE = 8;

      // Lógica de asignación basada en pasajeros y equipaje
      if (passengers > 12 || totalWeightedLuggage > 16) {
        // Caso: Grupo muy grande o mucho equipaje - 2 vans
        selectedVehicles = availableVans.slice(0, 2);
      } else if (passengers > 7 || totalWeightedLuggage > 8) {
        // Caso: Grupo grande o equipaje considerable - 1 van + 1 berline
        selectedVehicles = [
          ...availableVans.slice(0, 1),
          ...availableBerlines.slice(0, 1)
        ];
      } else if (passengers > 4 || totalWeightedLuggage > 3) {
        // Caso: Grupo mediano o equipaje mediano - 1 van
        selectedVehicles = availableVans.slice(0, 1);
      } else if (passengers > 0) { // Solo asignar berline si hay al menos 1 pasajero
        // Caso: Grupo pequeño y poco equipaje - 1 berline
        selectedVehicles = availableBerlines.slice(0, 1);
      }

      // Verifica si la asignación cumple con los requisitos mínimos
      const totalPassengerCapacity = selectedVehicles.reduce((sum, vehicle) => {
        return sum + (vehicle.type === 'berline' ? BERLINE_MAX_PASSENGERS : VAN_MAX_PASSENGERS);
      }, 0);

      const totalLuggageCapacity = selectedVehicles.reduce((sum, vehicle) => {
        return sum + (vehicle.type === 'berline' ? BERLINE_MAX_LUGGAGE : VAN_MAX_LUGGAGE);
      }, 0);

      // Si la capacidad no es suficiente, intenta ajustar
      if (totalPassengerCapacity < passengers || totalLuggageCapacity < totalWeightedLuggage) {
        if (availableVans.length > 0) {
          selectedVehicles = [...selectedVehicles, availableVans[0]];
        } else if (availableBerlines.length > 0) {
          selectedVehicles = [...selectedVehicles, availableBerlines[0]];
        }
      }

      console.log('Selected vehicles:', {
        vehicles: selectedVehicles,
        totalPassengerCapacity,
        totalLuggageCapacity,
        requiredPassengers: passengers,
        requiredLuggage: totalWeightedLuggage
      });
      
      // Solo actualiza si se encontraron vehículos y hay pasajeros
      if (selectedVehicles.length > 0 && passengers > 0) {
        setAssignedVehicles(selectedVehicles);
      } else {
        setAssignedVehicles([]); // Limpiar asignación si no hay pasajeros o vehículos
      }
    };

    calculateRequiredVehicles();
  }, [formData.passengers, formData.largeLuggageCount, formData.smallLuggageCount, vehicles, isLoading]);

  return { assignedVehicles };
};
