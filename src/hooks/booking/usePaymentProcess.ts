
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const PAYMENT_TIMEOUT = 300000; // 5 minutes
const BOOKING_WINDOW = 7200000; // 2 hours in milliseconds

export const usePaymentProcess = (mounted: React.MutableRefObject<boolean>) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [paymentTimeout, setPaymentTimeout] = useState<NodeJS.Timeout | null>(null);

  const handlePaymentCleanup = useCallback(async () => {
    if (!mounted.current) return;

    setIsProcessing(false);
    if (paymentTimeout) {
      clearTimeout(paymentTimeout);
      setPaymentTimeout(null);
    }

    try {
      if (bookingId) {
        await supabase
          .from('bookings')
          .update({ status: 'cancelled' })
          .eq('id', bookingId)
          .eq('status', 'pending');
      }
      
      if (paymentId) {
        await supabase
          .from('payments')
          .update({ status: 'cancelled' })
          .eq('id', paymentId)
          .in('status', ['pending', 'processing']);
      }
    } catch (error) {
      console.error('Error during cleanup:', error);
    } finally {
      if (mounted.current) {
        setBookingId(null);
        setPaymentId(null);
        setClientSecret(null);
      }
    }
  }, [bookingId, paymentId, paymentTimeout, mounted]);

  const handlePaymentTimeout = useCallback(async () => {
    console.log('Payment timeout reached');
    await handlePaymentCleanup();
    if (mounted.current) {
      toast({
        title: t.common.error,
        description: "El tiempo para completar el pago ha expirado. Por favor, intente nuevamente.",
        variant: "destructive",
      });
      navigate("/booking");
    }
  }, [handlePaymentCleanup, navigate, toast, t]);

  const handlePaymentSuccess = useCallback(async (bookingData: any, estimatedPrice: number) => {
    try {
      console.log('Payment successful!');
      
      if (!paymentId || !bookingId) {
        throw new Error(t.booking.errors.missingIds);
      }

      if (paymentTimeout) {
        clearTimeout(paymentTimeout);
        setPaymentTimeout(null);
      }

      const { data: payment, error: checkError } = await supabase
        .from('payments')
        .select('status')
        .eq('id', paymentId)
        .maybeSingle();

      if (checkError) throw checkError;

      if (!payment) {
        throw new Error('Pago no encontrado');
      }

      if (!['processing', 'pending'].includes(payment.status)) {
        throw new Error(`Estado de pago inválido: ${payment.status}`);
      }

      const { error: paymentError } = await supabase
        .from('payments')
        .update({ status: 'completed' })
        .eq('id', paymentId)
        .in('status', ['processing', 'pending']);

      if (paymentError) throw paymentError;

      const { error: bookingError } = await supabase
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', bookingId)
        .eq('status', 'pending');

      if (bookingError) throw bookingError;

      if (mounted.current) {
        setIsProcessing(false);
        toast({
          title: t.booking.success.title,
          description: t.booking.success.description,
        });

        navigate("/booking/confirmation", { 
          state: { 
            bookingData,
            totalPrice: estimatedPrice,
            paymentId,
            bookingId
          }
        });
      }
    } catch (error) {
      console.error('Error finalizing booking:', error);
      if (mounted.current) {
        toast({
          title: t.common.error,
          description: error instanceof Error ? error.message : t.booking.errors.finalizationError,
          variant: "destructive",
        });
        await handlePaymentCleanup();
      }
    }
  }, [bookingId, paymentId, paymentTimeout, navigate, toast, t, handlePaymentCleanup]);

  const handlePaymentError = useCallback(async (error: Error) => {
    console.error('Payment error:', error);
    if (mounted.current) {
      setIsProcessing(false);
      toast({
        title: t.common.error,
        description: error.message || t.booking.errors.generalPaymentError,
        variant: "destructive",
      });
      await handlePaymentCleanup();
    }
  }, [toast, t, handlePaymentCleanup]);

  return {
    isProcessing,
    setIsProcessing,
    clientSecret,
    setClientSecret,
    bookingId,
    setBookingId,
    paymentId,
    setPaymentId,
    paymentTimeout,
    setPaymentTimeout,
    handlePaymentCleanup,
    handlePaymentTimeout,
    handlePaymentSuccess,
    handlePaymentError,
    PAYMENT_TIMEOUT,
    BOOKING_WINDOW
  };
};
