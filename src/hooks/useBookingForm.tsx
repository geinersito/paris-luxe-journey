
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
    fieldName?: string
  ) => {
    let updatedFormData;
    if (typeof e === 'string' && fieldName) {
      updatedFormData = { ...formData, [fieldName]: e };
    } else if (typeof e === 'object') {
      const { name, value } = e.target;
      updatedFormData = { ...formData, [name]: value };
    } else {
      return;
    }
    
    setFormData(updatedFormData);
    calculatePrice(assignedVehicles, distance, updatedFormData.time);
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
    
    const updatedFormData = {
      ...formData,
      vehicleType: selectedVehicle.type,
      vehicle_id: selectedVehicle.id,
      largeLuggageCount: Number(formData.largeLuggageCount),
      smallLuggageCount: Number(formData.smallLuggageCount),
      passengers: Number(formData.passengers)
    };

    console.log("Starting navigation to booking details with data:", {
      bookingData: updatedFormData,
      estimatedPrice: formData.tripType === 'round_trip' ? price * 2 : price,
    });

    setIsSubmitting(true);

    try {
      // Use replace: true to prevent going back to the form
      navigate("/booking/details", { 
        state: { 
          bookingData: updatedFormData,
          estimatedPrice: formData.tripType === 'round_trip' ? price * 2 : price 
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

  return {
    formData,
    price,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};
