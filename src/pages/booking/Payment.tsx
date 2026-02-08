import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BookingProgress from "@/components/booking/BookingProgress";
import TrustBar from "@/components/TrustBar";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { PaymentSummary } from "@/components/booking/PaymentSummary";
import { TermsAndPayment } from "@/components/booking/TermsAndPayment";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocationDetails } from "@/hooks/booking/useLocationDetails";
import { StripePaymentForm } from "@/components/booking/StripePaymentForm";
import { Loader2, AlertCircle } from "lucide-react";
import { clearBookingSession } from "@/lib/bookingSession";

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

  // Intentar recuperar de location.state primero, luego de sessionStorage
  const [bookingData, setBookingData] = useState(() => {
    if (location.state?.bookingData) {
      return location.state.bookingData;
    }
    const saved = sessionStorage.getItem("payment_bookingData");
    return saved ? JSON.parse(saved) : null;
  });

  const [estimatedPrice, setEstimatedPrice] = useState(() => {
    if (location.state?.estimatedPrice) {
      return location.state.estimatedPrice;
    }
    const saved = sessionStorage.getItem("payment_estimatedPrice");
    return saved ? parseFloat(saved) : null;
  });

  const { locationDetails, fetchLocationDetails, isLoading } =
    useLocationDetails();

  // Verificación explícita de que tenemos todos los datos necesarios para proceder con el pago
  const canProceedToPayment = useMemo(() => {
    if (!bookingData) return false;

    // Verificar que tenemos los UUIDs de las ubicaciones, ya sea en bookingData o en locationDetails
    const hasPickupId = !!(
      bookingData.pickupLocationId ||
      (locationDetails && locationDetails.pickupId)
    );
    const hasDropoffId = !!(
      bookingData.dropoffLocationId ||
      (locationDetails && locationDetails.dropoffId)
    );

    return hasPickupId && hasDropoffId && (!locationDetails || !isLoading);
  }, [bookingData, locationDetails, isLoading]);

  useEffect(() => {
    if (estimatedPrice) {
      const normalizedPrice = Math.round(Number(estimatedPrice));
    }
  }, [estimatedPrice, location.state]);

  const initializePayment = useCallback(async () => {
    if (!estimatedPrice || !bookingData) {
      throw new Error("Missing booking data or price");
    }

    // Ensure price is normalized and valid
    // IMPORTANTE: Este precio está en EUROS, la función Edge lo convertirá a CÉNTIMOS para Stripe
    const normalizedPrice = Math.round(Number(estimatedPrice));
    if (isNaN(normalizedPrice) || normalizedPrice <= 0) {
      throw new Error("El precio debe ser un número válido mayor que cero");
    }

    const pickupDateTime = new Date(`${bookingData.date}T${bookingData.time}`);

    // Intentar obtener los IDs de ubicación de todas las fuentes posibles
    const pickupId =
      bookingData?.pickupLocationId || locationDetails?.pickupId || "";
    const dropoffId =
      bookingData?.dropoffLocationId || locationDetails?.dropoffId || "";

    // Validar que tengamos los IDs (UUIDs) de las ubicaciones
    if (!pickupId || !dropoffId) {
      throw new Error(
        "No se pudieron obtener los identificadores de las ubicaciones. Por favor, inténtalo de nuevo.",
      );
    }

    // Convertir valores a su tipo correcto para evitar problemas de validación
    const newBookingData = {
      pickup_location_id: pickupId, // Usar UUID obtenido de cualquier fuente disponible
      dropoff_location_id: dropoffId, // Usar UUID obtenido de cualquier fuente disponible
      pickup_datetime: pickupDateTime.toISOString(),
      passengers_count: Number(bookingData.passengers),
      vehicle_id: bookingData.vehicle_id || "",
      flight_number: bookingData.flight_number || null,
      address_details: bookingData.address_details || null,
      trip_type: bookingData.tripType || "one_way",
      large_luggage_count: Number(bookingData.largeLuggageCount) || 0,
      small_luggage_count: Number(bookingData.smallLuggageCount) || 0,
      customer_name: bookingData.passengerInfo?.fullName || "",
      customer_email: bookingData.passengerInfo?.email || "",
      customer_phone: bookingData.passengerInfo?.phone || "",
      special_instructions:
        bookingData.passengerInfo?.specialInstructions || null,
      total_price: normalizedPrice,
    };

    // Validar datos críticos
    if (
      !newBookingData.customer_name ||
      !newBookingData.customer_email ||
      !newBookingData.customer_phone
    ) {
      throw new Error("Faltan datos del cliente necesarios para el pago");
    }

    const { data, error } = await supabase.functions.invoke(
      "create-booking-payment",
      {
        body: { bookingData: newBookingData },
      },
    );

    if (error) {
      throw error;
    }

    if (!data?.client_secret || !data?.booking_id) {
      throw new Error("No se recibieron los datos necesarios del servidor");
    }

    setBookingId(data.booking_id);
    setClientSecret(data.client_secret);

    return data;
  }, [
    bookingData,
    estimatedPrice,
    locationDetails?.pickupId,
    locationDetails?.dropoffId,
  ]);

  useEffect(() => {
    if (!bookingData || !estimatedPrice) {
      // Intentar recuperar de sessionStorage una última vez
      const savedBookingData = sessionStorage.getItem("payment_bookingData");
      const savedPrice = sessionStorage.getItem("payment_estimatedPrice");

      if (savedBookingData && savedPrice) {
        console.log("[Payment] Recuperando datos de sessionStorage");
        setBookingData(JSON.parse(savedBookingData));
        setEstimatedPrice(parseFloat(savedPrice));
        return;
      }

      // Si no hay datos en ningún lado, redirigir
      toast({
        title: "Sesión expirada",
        description: "Por favor, completa el formulario de reserva nuevamente.",
        variant: "destructive",
      });
      navigate("/booking");
      return;
    }

    // Guardar en sessionStorage para recuperación en caso de reload
    sessionStorage.setItem("payment_bookingData", JSON.stringify(bookingData));
    sessionStorage.setItem("payment_estimatedPrice", estimatedPrice.toString());

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

    // Verificación adicional para evitar procesar el pago sin los UUIDs
    if (!canProceedToPayment) {
      toast({
        title: t.common.error,
        description:
          "Datos de ubicación incompletos. Por favor, inténtalo nuevamente.",
        variant: "destructive",
      });

      return;
    }

    try {
      setIsProcessing(true);
      await initializePayment();
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: t.common.error,
        description:
          error instanceof Error
            ? error.message
            : t.booking.errors.generalPaymentError,
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const { data: updatedBookingData, error } = await supabase
        .from("bookings")
        .select(
          `
          id,
          status,
          payment_id,
          total_price
        `,
        )
        .eq("id", bookingId)
        .maybeSingle();

      if (error) {
        throw error;
      }

      // Enviar emails de confirmación

      const { error: emailError } = await supabase.functions.invoke(
        "send-booking-emails",
        {
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
        },
      );

      if (emailError) {
        toast({
          title: "Advertencia",
          description:
            "La reserva se ha confirmado pero hubo un problema al enviar los emails de confirmación.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Reserva confirmada!",
          description:
            "Tu reserva ha sido procesada exitosamente. Hemos enviado un email de confirmación.",
        });
      }

      // Note: sessionStorage is NOT cleared here to allow confirmation page to be refresh-safe
      // Confirmation.tsx will clear it after successful display
      console.log(
        "[Payment] Navigating to confirmation (sessionStorage preserved for refresh-safety)",
      );

      navigate("/booking/confirmation", {
        replace: true,
        state: {
          bookingData: {
            ...bookingData,
            status: "confirmed",
            id: bookingId,
          },
          totalPrice: estimatedPrice,
          bookingId,
        },
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al finalizar la reserva.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentError = (error: Error) => {
    toast({
      title: "Error en el pago",
      description: error.message,
      variant: "destructive",
    });
    setIsProcessing(false);
  };

  // Si no hay datos básicos, no mostramos nada
  if (!bookingData || !estimatedPrice) {
    return null;
  }

  // Mostrar un indicador de carga mientras se obtienen los datos de ubicación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl py-8">
          <BookingProgress currentStep={2} />

          <div className="flex flex-col items-center justify-center mt-12 py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-lg">Cargando datos de ubicación...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar un mensaje de error si hay problemas con los datos de ubicación
  if (!locationDetails?.pickupId || !locationDetails?.dropoffId) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl py-8">
          <BookingProgress currentStep={2} />

          <div className="flex flex-col items-center justify-center mt-12 py-12">
            <AlertCircle className="h-10 w-10 text-destructive mb-4" />
            <p className="text-lg mb-4">Error al cargar datos de ubicación</p>
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
              onClick={() => navigate("/booking/details")}
            >
              {t.common.back || "Volver"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8">
        <BookingProgress currentStep={2} />

        {/* TrustBar - Señales de confianza para aumentar conversión */}
        <div className="mt-8 -mx-4 sm:mx-0">
          <TrustBar />
        </div>

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
                  isLocationsLoading={isLoading}
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
