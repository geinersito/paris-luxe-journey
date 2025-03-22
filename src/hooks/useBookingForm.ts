import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useBookingPrice } from "./booking/useBookingPrice";
import { useVehicleAssignment } from "./booking/useVehicleAssignment";
import { useBookingValidation } from "./booking/useBookingValidation";
import { BookingFormData } from "./booking/types";
import { useVehicles } from "./useVehicles";
import { useLanguage } from "@/contexts/LanguageContext";

export const useBookingForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: vehicles } = useVehicles();
  
  // Add new states for price tracking
  const [luggageSurcharge, setLuggageSurcharge] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState<BookingFormData>({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: "", // Debe ser string para coincidir con BookingFormData
    vehicleType: "",
    vehicle_id: "",
    flight_number: "",
    address_details: "",
    tripType: "one_way",
    largeLuggageCount: 0,
    smallLuggageCount: 0,
    serviceLevel: "standard",
    passengerInfo: {
      fullName: "",
      email: "",
      phone: "",
      specialInstructions: "",
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { price, distance, calculatePrice, handleDistanceCalculated } = useBookingPrice();
  const { assignedVehicles } = useVehicleAssignment(formData);
  const { validateForm } = useBookingValidation();

  // Función para manejar cambios específicamente en el campo de pasajeros
  // sin afectar el número de maletas
  // Modificamos handlePassengerChange para usar la nueva función de cálculo de precio total
  const handlePassengerChange = useCallback((value: string | number) => {
  // Convertir value a string para coincidir con BookingFormData
  const passengerValue = typeof value === 'number' ? String(value) : value;
  
  setFormData(prev => ({
    ...prev,
    passengers: passengerValue
  }));
  
  // Ya no necesitamos llamar a calculatePrice aquí, el efecto se encargará
  // de actualizar el precio cuando cambie el estado
  }, []);
  
  // Simplificamos handleChange para evitar lógica condicional compleja
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string | number,
  fieldName?: string
  ) => {
  let updatedFormData;
  
  // Si es un cambio en el campo de pasajeros, usamos la función especializada
  if ((fieldName === 'passengers') || 
      (typeof e === 'object' && e.target.name === 'passengers')) {
    const value = typeof e === 'object' ? e.target.value : e;
    handlePassengerChange(value);
    return;
  }
  
  // Para otros campos, procesamos normalmente
  if ((typeof e === 'string' || typeof e === 'number') && fieldName) {
    const value = ['largeLuggageCount', 'smallLuggageCount'].includes(fieldName)
      ? Number(e) || 0
      : e;
    updatedFormData = { ...formData, [fieldName]: value };
  } else if (typeof e === 'object') {
    const { name, value } = e.target;
    const processedValue = ['largeLuggageCount', 'smallLuggageCount'].includes(name)
      ? Number(value) || 0
      : value;
    updatedFormData = { ...formData, [name]: processedValue };
  } else {
    return;
  }
  
  setFormData(updatedFormData);
  
  // Simplificamos: solo recalculamos el precio base cuando cambian origen/destino
  // Para todo lo demás, el efecto se encargará de actualizar el precio total
  const pickup = updatedFormData.pickup;
  const dropoff = updatedFormData.dropoff;
  const isLocationChange = 
    fieldName === 'pickup' || 
    fieldName === 'dropoff' || 
    (typeof e === 'object' && (e.target.name === 'pickup' || e.target.name === 'dropoff'));
  
  if (isLocationChange && 
      typeof pickup === 'string' && 
      typeof dropoff === 'string' && 
      pickup.trim() && 
      dropoff.trim()) {
    
    const passengers = Number(updatedFormData.passengers) || 1;
    const largeLuggage = Number(updatedFormData.largeLuggageCount) || 0;
    const smallLuggage = Number(updatedFormData.smallLuggageCount) || 0;
    
    // Solo recalculamos el precio base cuando cambia la ubicación
    calculatePrice(pickup, dropoff, passengers, largeLuggage, smallLuggage);
  }
};

  // Cálculo de recargo por equipaje según la política: 1 maleta grande + 1 pequeña incluida en total
  // Cada maleta grande adicional (con su pequeña) cuesta 10€
  // Cálculo de recargo por equipaje según la política: 1 maleta grande por pasajero incluida
  // Separamos la lógica de cálculo de precio en una función pura
  const calculateTotalPrice = useCallback((
    basePrice: number,
    largeLuggage: number,
    passengerCount: number,
    isRoundTrip: boolean
  ) => {
    // Aseguramos valores válidos
    const passengers = Math.max(1, passengerCount);
    const luggage = Math.max(0, largeLuggage);
    
    // Calculamos el recargo por maletas
    const extraLargeLuggage = Math.max(0, luggage - passengers);
    const surcharge = extraLargeLuggage * 10; // 10€ por cada maleta grande adicional
    
    // Calculamos el precio base según el tipo de viaje
    const adjustedBasePrice = isRoundTrip ? basePrice * 2 : basePrice;
    
    // Precio total
    return {
      basePrice: adjustedBasePrice,
      luggageSurcharge: surcharge,
      totalPrice: adjustedBasePrice + surcharge
    };
  }, []);
  
  // Reemplazamos la función existente con una versión simplificada
  const calculateLuggageSurcharge = useCallback((largeLuggage: number, passengerCount: number) => {
    const passengers = Math.max(1, passengerCount);
    const extraLargeLuggage = Math.max(0, largeLuggage - passengers);
    return extraLargeLuggage * 10;
  }, []);
  
  // Eliminamos la primera definición duplicada de handleSubmit y mantenemos solo esta
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      return;
    }
  
    if (assignedVehicles.length === 0) {
      toast({
        title: t.common.error,
        description: t.booking.errors.noVehiclesAvailable,
        variant: "destructive",
      });
      return;
    }
  
    const selectedVehicle = assignedVehicles[0];
    const largeLuggage = Number(formData.largeLuggageCount);
    const passengerCount = Number(formData.passengers) || 1;
    const isRoundTrip = formData.tripType === 'round_trip';
    
    // Usamos la misma función pura para calcular el precio final
    const priceData = calculateTotalPrice(price, largeLuggage, passengerCount, isRoundTrip);
    
    const updatedFormData = {
      ...formData,
      vehicleType: selectedVehicle.type,
      vehicle_id: selectedVehicle.id,
      largeLuggageCount: Number(formData.largeLuggageCount),
      smallLuggageCount: Number(formData.smallLuggageCount),
      passengers: Number(formData.passengers)
    };
  
    setIsSubmitting(true);
  
    try {
      navigate("/booking/details", { 
        state: { 
          bookingData: updatedFormData,
          estimatedPrice: priceData.totalPrice,
          luggageSurcharge: priceData.luggageSurcharge
        },
        replace: true
      });
    } catch (error) {
      console.error("Navigation error:", error);
      toast({
        title: t.common.error,
        description: t.booking.errors.bookingCreationError,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  // Update formData when assignedVehicles changes
  useEffect(() => {
    if (assignedVehicles.length > 0) {
      const selectedVehicle = assignedVehicles[0];
      setFormData(prev => ({
        ...prev,
        vehicleType: selectedVehicle.type,
        vehicle_id: selectedVehicle.id
      }));
    }
  }, [assignedVehicles]);
  
  // Update prices whenever relevant data changes - usando la nueva función calculateTotalPrice
  useEffect(() => {
    if (price <= 0) return; // No calculamos si no hay precio base válido
  
    const largeLuggage = Number(formData.largeLuggageCount) || 0;
    const passengerCount = Number(formData.passengers) || 1;
    const isRoundTrip = formData.tripType === 'round_trip';
  
    // Usamos la función pura para calcular todos los precios de una vez
    const priceData = calculateTotalPrice(price, largeLuggage, passengerCount, isRoundTrip);
  
    // Actualizamos el estado una sola vez con valores consistentes
    setLuggageSurcharge(priceData.luggageSurcharge);
    setTotalPrice(priceData.totalPrice);
  
    console.log('Price updated:', {
      ...priceData,
      passengers: passengerCount,
      largeLuggage
    });
  }, [formData.largeLuggageCount, formData.passengers, formData.tripType, price, calculateTotalPrice]);

  // Añadimos un nuevo efecto para recalcular el precio base cuando cambian pasajeros o maletas
  // pero solo si ya tenemos origen y destino válidos
  useEffect(() => {
    const pickup = formData.pickup;
    const dropoff = formData.dropoff;
    
    if (typeof pickup === 'string' && 
        typeof dropoff === 'string' && 
        pickup.trim() && 
        dropoff.trim()) {
      
      const passengers = Number(formData.passengers) || 1;
      const largeLuggage = Number(formData.largeLuggageCount) || 0;
      const smallLuggage = Number(formData.smallLuggageCount) || 0;
      
      // Debounce para evitar múltiples llamadas durante cambios rápidos
      const timer = setTimeout(() => {
        calculatePrice(pickup, dropoff, passengers, largeLuggage, smallLuggage);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [formData.passengers, formData.largeLuggageCount, formData.smallLuggageCount, calculatePrice, formData.pickup, formData.dropoff]);

  return {
    formData,
    price,           // Base price
    totalPrice,      // Price including luggage surcharge
    luggageSurcharge, // Extra luggage fee only
    isSubmitting,
    handleChange,
    handlePassengerChange,
    handleSubmit,
    distance,
    // Eliminamos assignedVehicles del retorno
    setFormData
  };
};
