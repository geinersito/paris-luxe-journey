
import { useState, useEffect } from 'react';
import { BookingFormData } from './types';
import { Vehicle, useVehicles } from '../useVehicles';

export const useVehicleAssignment = (formData: BookingFormData) => {
  const [assignedVehicles, setAssignedVehicles] = useState<Vehicle[]>([]);
  const { data: vehicles, isLoading } = useVehicles();

  useEffect(() => {
    const calculateRequiredVehicles = () => {
      if (!vehicles || isLoading) {
        console.log('Esperando datos de vehículos...');
        return;
      }

      if (!formData.passengers) {
        console.log('Esperando selección de pasajeros...');
        return;
      }

      // Update number conversions to use Number() instead of parseInt
      const passengers = Number(formData.passengers);
      const largeLuggage = Number(formData.largeLuggageCount) || 0;
      const smallLuggage = Number(formData.smallLuggageCount) || 0;

      let selectedVehicles: Vehicle[] = [];

      // Calcula el total de equipaje ponderado (maleta grande = 1.5 unidades, maleta pequeña = 1 unidad)
      const totalWeightedLuggage = (largeLuggage * 1.5) + smallLuggage;
      
      // Encuentra los vehículos disponibles de cada tipo
      const availableBerlines = vehicles.filter(v => v.type?.toLowerCase() === 'berline');
      const availableVans = vehicles.filter(v => v.type?.toLowerCase() === 'van');

      console.log('Available vehicles breakdown:', {
        berlines: availableBerlines.length,
        vans: availableVans.length,
        total: vehicles.length,
        types: vehicles.map(v => v.type)
      });

      // Capacidades por tipo de vehículo
      const BERLINE_MAX_PASSENGERS = 4;
      const VAN_MAX_PASSENGERS = 7;
      const BERLINE_MAX_LUGGAGE = 3;
      const VAN_MAX_LUGGAGE = 8;

      // Lógica de asignación basada en pasajeros y equipaje
      if (passengers > 12 || totalWeightedLuggage > 16) {
        selectedVehicles = availableVans.slice(0, 2);
      } else if (passengers > 7 || totalWeightedLuggage > 8) {
        selectedVehicles = [
          ...availableVans.slice(0, 1),
          ...availableBerlines.slice(0, 1)
        ];
      } else if (passengers > 4 || totalWeightedLuggage > 3) {
        selectedVehicles = availableVans.slice(0, 1);
      } else if (passengers > 0) {
        if (availableBerlines.length > 0) {
          selectedVehicles = availableBerlines.slice(0, 1);
        } else if (availableVans.length > 0) {
          selectedVehicles = availableVans.slice(0, 1);
        }
      }

      // Verifica si la asignación cumple con los requisitos mínimos
      // Fallback mechanism - only runs if no vehicles were selected
      if (selectedVehicles.length === 0 && vehicles.length > 0) {
        console.log('No vehicles selected by normal logic, using fallback');
        console.log('Available vehicle types:', [...new Set(vehicles.map(v => v.type))]);
        selectedVehicles = vehicles.slice(0, 1);
      }

      // Update capacity calculations to handle unknown types
      const totalPassengerCapacity = selectedVehicles.reduce((sum, vehicle) => {
        return sum + (vehicle.type?.toLowerCase() === 'van' ? VAN_MAX_PASSENGERS : BERLINE_MAX_PASSENGERS);
      }, 0);

      const totalLuggageCapacity = selectedVehicles.reduce((sum, vehicle) => {
        return sum + (vehicle.type?.toLowerCase() === 'van' ? VAN_MAX_LUGGAGE : BERLINE_MAX_LUGGAGE);
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
