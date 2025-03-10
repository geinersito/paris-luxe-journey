import { useState, useEffect } from "react";
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
    passengers: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string | number,
    fieldName?: string
  ) => {
    let updatedFormData;
    
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
  
    // Only calculate price when both location codes are valid strings
    const pickup = updatedFormData.pickup;
    const dropoff = updatedFormData.dropoff;
  
    if (typeof pickup === 'string' && 
        typeof dropoff === 'string' && 
        !Array.isArray(pickup) && 
        !Array.isArray(dropoff) &&
        pickup.trim() && 
        dropoff.trim()) {
      calculatePrice(pickup, dropoff);
    }
  };

  const calculateLuggageSurcharge = (passengers: number, largeLuggage: number) => {
    const includedLargeLuggage = passengers;
    const extraLargeLuggage = Math.max(0, largeLuggage - includedLargeLuggage);
    return extraLargeLuggage * 10; // 10€ per extra large luggage
  };

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
    const passengers = Number(formData.passengers);
    const largeLuggage = Number(formData.largeLuggageCount);
    const luggageSurcharge = calculateLuggageSurcharge(passengers, largeLuggage);
    
    const updatedFormData = {
      ...formData,
      vehicleType: selectedVehicle.type,
      vehicle_id: selectedVehicle.id,
      largeLuggageCount: Number(formData.largeLuggageCount),
      smallLuggageCount: Number(formData.smallLuggageCount),
      passengers: Number(formData.passengers)
    };

    const basePrice = formData.tripType === 'round_trip' ? price * 2 : price;
    const totalPrice = basePrice + luggageSurcharge;

    setIsSubmitting(true);

    try {
      navigate("/booking/details", { 
        state: { 
          bookingData: updatedFormData,
          estimatedPrice: totalPrice,
          luggageSurcharge
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

  // Update prices whenever relevant data changes
  useEffect(() => {
    const passengers = Number(formData.passengers) || 0;
    const largeLuggage = Number(formData.largeLuggageCount) || 0;
    const surcharge = calculateLuggageSurcharge(passengers, largeLuggage);
    
    setLuggageSurcharge(surcharge);
    
    const basePrice = formData.tripType === 'round_trip' ? price * 2 : price;
    setTotalPrice(basePrice + surcharge);
  }, [formData.passengers, formData.largeLuggageCount, formData.tripType, price]);

  return {
    formData,
    price,           // Base price
    totalPrice,      // Price including luggage surcharge
    luggageSurcharge, // Extra luggage fee only
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};
