
import { useCallback } from "react";
import { addHours, isAfter } from "date-fns";
import { isValidEmail, isValidPhone } from "@/utils/validation";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const MAX_PAYMENT_AMOUNT = 100000;
const MIN_PAYMENT_AMOUNT = 1;

export const usePaymentValidation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const validateAmount = useCallback((amount: number): boolean => {
    return !isNaN(amount) && 
           amount >= MIN_PAYMENT_AMOUNT && 
           amount <= MAX_PAYMENT_AMOUNT;
  }, []);

  const validateDateTime = useCallback((dateStr: string, timeStr: string): boolean => {
    const dateTime = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
    const minDateTime = addHours(now, 1);
    return isAfter(dateTime, minDateTime);
  }, []);

  const validateBookingData = useCallback((bookingData: any, estimatedPrice: number) => {
    if (!validateAmount(Number(estimatedPrice))) {
      toast({
        title: t.common.error,
        description: "Monto de pago inválido",
        variant: "destructive",
      });
      navigate("/booking");
      return false;
    }

    if (!validateDateTime(bookingData.date, bookingData.time)) {
      toast({
        title: t.common.error,
        description: "La fecha y hora seleccionada debe ser futura",
        variant: "destructive",
      });
      navigate("/booking");
      return false;
    }

    if (!isValidEmail(bookingData.passengerInfo.email)) {
      toast({
        title: t.common.error,
        description: t.booking.errors.invalidEmail,
        variant: "destructive",
      });
      navigate("/booking/details");
      return false;
    }

    if (!isValidPhone(bookingData.passengerInfo.phone)) {
      toast({
        title: t.common.error,
        description: "Número de teléfono inválido",
        variant: "destructive",
      });
      navigate("/booking/details");
      return false;
    }

    return true;
  }, [navigate, toast, t, validateAmount, validateDateTime]);

  return {
    validateAmount,
    validateDateTime,
    validateBookingData,
  };
};
