import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BookingProgress from "@/components/booking/BookingProgress";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { PaymentSummary } from "@/components/booking/PaymentSummary";
import { TermsAndPayment } from "@/components/booking/TermsAndPayment";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocationDetails } from "@/hooks/booking/useLocationDetails";
import { StripePaymentForm } from "@/components/booking/StripePaymentForm";

const BookingPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const { t } = useLanguage();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const bookingData = location.state?.bookingData;
  const estimatedPrice = location.state?.estimatedPrice;

  const { locationDetails, fetchLocationDetails, isLoading } = useLocationDetails();

  const initializePayment = useCallback(async () => {
    try {
      console.log('[BookingPayment] Inicializando proceso de pago:', {
        hasBookingData: !!bookingData,
        estimatedPrice
      });

      const pickupDateTime = new Date(`${bookingData.date}T${bookingData.time}`);
      
      const newBookingData = {
        pickup_location_id: bookingData.pickup,
        dropoff_location_id: bookingData.dropoff,
        pickup_datetime: pickupDateTime.toISOString(),
        passengers_count: parseInt(bookingData.passengers),
        vehicle_id: bookingData.vehicle_id,
        flight_number: bookingData.flight_number || null,
        address_details: bookingData.address_details || null,
        trip_type: bookingData.tripType || 'one_way',
        large_luggage_count: Number(bookingData.largeLuggageCount) || 0,
        small_luggage_count: Number(bookingData.smallLuggageCount) || 0,
        customer_name: bookingData.passengerInfo.fullName,
        customer_email: bookingData.passengerInfo.email,
        customer_phone: bookingData.passengerInfo.phone,
        special_instructions: bookingData.passengerInfo.specialInstructions || null,
        total_price: estimatedPrice
      };

      console.log('[BookingPayment] Creando reserva con datos:', newBookingData);

      const { data, error } = await supabase.functions.invoke('create-booking-payment', {
        body: { bookingData: newBookingData }
      });

      if (error) {
        console.error('[BookingPayment] Error al crear la reserva:', error);
        throw error;
      }

      if (!data?.client_secret || !data?.booking_id) {
        console.error('[BookingPayment] Datos incompletos del servidor:', data);
        throw new Error('No se recibieron los datos necesarios del servidor');
      }

      console.log('[BookingPayment] Reserva creada exitosamente:', {
        bookingId: data.booking_id,
        hasClientSecret: !!data.client_secret
      });

      setBookingId(data.booking_id);
      setClientSecret(data.client_secret);

      return data;
    } catch (error) {
      console.error('[BookingPayment] Error en inicialización del pago:', error);
      throw error;
    }
  }, [bookingData, estimatedPrice]);

  useEffect(() => {
    if (!bookingData || !estimatedPrice) {
      console.error('[BookingPayment] No hay datos de reserva o precio:', { bookingData, estimatedPrice });
      toast({
        title: t.common.error,
        description: t.booking.errors.noBookingData,
        variant: "destructive",
      });
      navigate("/booking");
      return;
    }

    console.log('[BookingPayment] Cargando detalles de ubicación:', {
      pickup: bookingData.pickup,
      dropoff: bookingData.dropoff
    });
    
    fetchLocationDetails(bookingData.pickup, bookingData.dropoff);
  }, [bookingData, estimatedPrice, navigate, toast, t, fetchLocationDetails]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      toast({
        title: t.common.error,
        description: t.booking.errors.acceptTerms,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      console.log('[BookingPayment] Iniciando proceso de pago');
      await initializePayment();
    } catch (error) {
      console.error('[BookingPayment] Error al inicializar pago:', error);
      setIsProcessing(false);
      toast({
        title: t.common.error,
        description: error instanceof Error ? error.message : t.booking.errors.generalPaymentError,
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      console.log('[BookingPayment] Pago exitoso, actualizando estado de la reserva');
      
      const { data: updatedBookingData, error } = await supabase
        .from('bookings')
        .select(`
          id,
          status,
          payment_id
        `)
        .eq('id', bookingId)
        .maybeSingle();

      if (error) {
        console.error(`[Payment] Error al obtener datos:` , error);
        throw error;
      }

      if (updatedBookingData) {
        console.log('[Payment] Datos encontrados:', {
          id: updatedBookingData.id,
          status: updatedBookingData.status,
          payment: updatedBookingData.payment_id
        });
      }

      // Enviar emails de confirmación
      console.log('[BookingPayment] Enviando emails de confirmación');
      
      const { error: emailError } = await supabase.functions.invoke('send-booking-emails', {
        body: {
          customerName: bookingData.passengerInfo.fullName,
          customerEmail: bookingData.passengerInfo.email,
          bookingId,
          pickupLocation: locationDetails?.pickup || bookingData.pickup,
          dropoffLocation: locationDetails?.dropoff || bookingData.dropoff,
          pickupDateTime: `${bookingData.date} ${bookingData.time}`,
          passengers: Number(bookingData.passengers),
          vehicleType: bookingData.vehicleType,
          totalPrice: estimatedPrice,
          flightNumber: bookingData.flight_number,
        },
      });

      if (emailError) {
        console.error('[BookingPayment] Error al enviar emails:', emailError);
        toast({
          title: "Advertencia",
          description: "La reserva se ha confirmado pero hubo un problema al enviar los emails de confirmación.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Reserva confirmada!",
          description: "Tu reserva ha sido procesada exitosamente. Hemos enviado un email de confirmación.",
        });
      }

      navigate("/booking/confirmation", { 
        replace: true,
        state: { 
          bookingData: {
            ...bookingData,
            status: 'confirmed',
            id: bookingId
          },
          totalPrice: estimatedPrice,
          bookingId
        }
      });
    } catch (error) {
      console.error('[BookingPayment] Error al finalizar el pago:', error);
      toast({
        title: "Error",
        description: "Hubo un error al finalizar la reserva.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentError = (error: Error) => {
    console.error('[BookingPayment] Error en el pago:', error);
    toast({
      title: "Error en el pago",
      description: error.message,
      variant: "destructive",
    });
    setIsProcessing(false);
  };

  if (!bookingData || !estimatedPrice) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8">
        <BookingProgress currentStep={2} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-display text-primary mb-6">
            {t.booking.payment.title}
          </h1>
          
          <div className="grid gap-8 md:grid-cols-2">
            <PaymentSummary 
              estimatedPrice={estimatedPrice}
              locationDetails={locationDetails}
              bookingData={bookingData}
            />

            <div>
              {!clientSecret ? (
                <TermsAndPayment
                  acceptedTerms={acceptedTerms}
                  setAcceptedTerms={setAcceptedTerms}
                  isProcessing={isProcessing}
                  onSubmit={handleSubmit}
                  onBack={() => navigate("/booking/details")}
                />
              ) : (
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">
                    {t.booking.payment.cardDetails}
                  </h3>
                  <StripePaymentForm
                    clientSecret={clientSecret}
                    isProcessing={isProcessing}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    customerName={bookingData.passengerInfo.fullName}
                    customerEmail={bookingData.passengerInfo.email}
                    customerPhone={bookingData.passengerInfo.phone}
                  />
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
