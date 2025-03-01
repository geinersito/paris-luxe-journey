
import { useToast } from "@/hooks/use-toast";
import { BookingFormData } from "./types";
import { useLanguage } from "@/contexts/LanguageContext";

export const useBookingValidation = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const validateForm = (formData: BookingFormData) => {
    // Validación de ubicaciones
    if (!formData.pickup || !formData.dropoff) {
      toast({
        title: t.common.error,
        description: t.booking.errors.selectLocations,
        variant: "destructive",
      });
      return false;
    }

    // Validación de pickup igual a dropoff
    if (formData.pickup === formData.dropoff) {
      toast({
        title: t.common.error,
        description: "El punto de recogida y destino no pueden ser el mismo",
        variant: "destructive",
      });
      return false;
    }

    // Validación de fecha y hora
    if (!formData.date || !formData.time) {
      toast({
        title: t.common.error,
        description: t.booking.errors.selectDateTime,
        variant: "destructive",
      });
      return false;
    }

    // Validación de fecha de retorno para viajes de ida y vuelta
    if (formData.tripType === 'round_trip' && (!formData.returnDate || !formData.returnTime)) {
      toast({
        title: t.common.error,
        description: t.booking.errors.selectReturnDateTime,
        variant: "destructive",
      });
      return false;
    }

    // Validación de número de pasajeros
    if (!formData.passengers || parseInt(formData.passengers) < 1) {
      toast({
        title: t.common.error,
        description: t.booking.errors.selectPassengers,
        variant: "destructive",
      });
      return false;
    }

    // Validación de cantidad máxima de pasajeros
    if (parseInt(formData.passengers) > 16) {
      toast({
        title: t.common.error,
        description: "El número máximo de pasajeros es 16",
        variant: "destructive",
      });
      return false;
    }

    // Validación de fecha pasada
    const selectedDate = new Date(`${formData.date}T${formData.time}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast({
        title: t.common.error,
        description: "La fecha seleccionada no puede ser anterior a hoy",
        variant: "destructive",
      });
      return false;
    }

    // Validación de fecha de retorno para viajes de ida y vuelta
    if (formData.tripType === 'round_trip' && formData.returnDate && formData.returnTime) {
      const returnDate = new Date(`${formData.returnDate}T${formData.returnTime}`);
      if (returnDate <= selectedDate) {
        toast({
          title: t.common.error,
          description: "La fecha de retorno debe ser posterior a la fecha de ida",
          variant: "destructive",
        });
        return false;
      }
    }

    // Validación de equipaje
    const totalLuggage = (
      (typeof formData.largeLuggageCount === 'number' ? formData.largeLuggageCount : parseInt(formData.largeLuggageCount || '0')) +
      (typeof formData.smallLuggageCount === 'number' ? formData.smallLuggageCount : parseInt(formData.smallLuggageCount || '0'))
    );

    if (totalLuggage > 32) {
      toast({
        title: t.common.error,
        description: "El número total de equipajes no puede exceder 32 piezas",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  return {
    validateForm,
  };
};
