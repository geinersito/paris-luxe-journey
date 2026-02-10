import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BookingProgress from "@/components/booking/BookingProgress";
import { supabase } from "@/integrations/supabase/client";
import { TermsAndPayment } from "@/components/booking/TermsAndPayment";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocationDetails } from "@/hooks/booking/useLocationDetails";
import { StripePaymentForm } from "@/components/booking/StripePaymentForm";
import {
  Loader2,
  AlertCircle,
  MapPin,
  Calendar,
  Clock,
  Users,
  Shield,
} from "lucide-react";

const CONFLICT_ERROR_CODES = new Set(["23P01", "23505"]);

const extractCodeFromPayload = (payload: unknown): string | null => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const record = payload as Record<string, unknown>;
  const nestedError =
    record.error && typeof record.error === "object"
      ? (record.error as Record<string, unknown>)
      : null;
  const nestedData =
    record.data && typeof record.data === "object"
      ? (record.data as Record<string, unknown>)
      : null;

  const codes = [record.code, nestedError?.code, nestedData?.code];

  for (const code of codes) {
    if (typeof code === "string") {
      return code;
    }
  }

  return null;
};

const parseEmbeddedJson = (value: string): unknown | null => {
  const jsonStart = value.indexOf("{");
  const jsonEnd = value.lastIndexOf("}");

  if (jsonStart < 0 || jsonEnd <= jsonStart) {
    return null;
  }

  try {
    return JSON.parse(value.slice(jsonStart, jsonEnd + 1));
  } catch {
    return null;
  }
};

const extractDbCode = async (err: unknown): Promise<string | null> => {
  if (!err) {
    return null;
  }

  const message = err instanceof Error ? err.message : String(err);

  for (const code of CONFLICT_ERROR_CODES) {
    if (message.includes(code)) {
      return code;
    }
  }

  const parsedFromMessage = parseEmbeddedJson(message);
  const codeFromMessage = extractCodeFromPayload(parsedFromMessage);
  if (codeFromMessage) {
    return codeFromMessage;
  }

  const errRecord =
    err && typeof err === "object" ? (err as Record<string, unknown>) : null;
  const codeFromErrorObject = extractCodeFromPayload(errRecord);
  if (codeFromErrorObject) {
    return codeFromErrorObject;
  }

  const context =
    errRecord?.context && typeof errRecord.context === "object"
      ? (errRecord.context as Record<string, unknown>)
      : null;
  const response = context?.response;

  if (response instanceof Response) {
    try {
      const body = await response.clone().json();
      const codeFromBody = extractCodeFromPayload(body);
      if (codeFromBody) {
        return codeFromBody;
      }

      const bodyText = JSON.stringify(body);
      for (const code of CONFLICT_ERROR_CODES) {
        if (bodyText.includes(code)) {
          return code;
        }
      }
    } catch {
      try {
        const bodyText = await response.clone().text();
        for (const code of CONFLICT_ERROR_CODES) {
          if (bodyText.includes(code)) {
            return code;
          }
        }

        const parsedBody = parseEmbeddedJson(bodyText);
        const codeFromBody = extractCodeFromPayload(parsedBody);
        if (codeFromBody) {
          return codeFromBody;
        }
      } catch {
        // Ignore body parsing issues and keep fallback matching below.
      }
    }
  }

  if (
    message.includes("exclusion constraint") ||
    message.includes("bookings_no_overlap") ||
    message.includes("bookings_unique_vehicle_pickup")
  ) {
    return "CONFLICT";
  }

  return null;
};

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

  // Recover from location.state first, then sessionStorage
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

  const luggageSurcharge = Number(location.state?.luggageSurcharge ?? 0);

  const { locationDetails, fetchLocationDetails, isLoading } =
    useLocationDetails();

  const canProceedToPayment = useMemo(() => {
    if (!bookingData) return false;

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

    // Price is in EUROS — the Edge function converts to cents for Stripe
    const normalizedPrice = Math.round(Number(estimatedPrice));
    if (isNaN(normalizedPrice) || normalizedPrice <= 0) {
      throw new Error("Invalid price");
    }

    const pickupDateTime = new Date(`${bookingData.date}T${bookingData.time}`);

    // Calculate service_end_datetime for anti-overlap constraint
    const BOOKING_WINDOW_MS = 7200000; // 2 hours in milliseconds
    let serviceEndDateTime: Date;
    if (
      bookingData.tripType === "round_trip" &&
      bookingData.returnDate &&
      bookingData.returnTime
    ) {
      serviceEndDateTime = new Date(
        `${bookingData.returnDate}T${bookingData.returnTime}`,
      );
    } else {
      serviceEndDateTime = new Date(
        pickupDateTime.getTime() + BOOKING_WINDOW_MS,
      );
    }

    const pickupId =
      bookingData?.pickupLocationId || locationDetails?.pickupId || "";
    const dropoffId =
      bookingData?.dropoffLocationId || locationDetails?.dropoffId || "";

    if (!pickupId || !dropoffId) {
      throw new Error(t.booking.payment.incompleteLocationData);
    }

    const newBookingData = {
      pickup_location_id: pickupId,
      dropoff_location_id: dropoffId,
      pickup_datetime: pickupDateTime.toISOString(),
      service_end_datetime: serviceEndDateTime.toISOString(),
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

    if (
      !newBookingData.customer_name ||
      !newBookingData.customer_email ||
      !newBookingData.customer_phone
    ) {
      throw new Error(t.booking.errors.requiredFields);
    }

    const { data, error } = await supabase.functions.invoke(
      "create-booking-payment",
      {
        body: { bookingData: newBookingData },
      },
    );

    if (error) {
      const dbCode = await extractDbCode(error);
      if (dbCode === "23P01" || dbCode === "23505" || dbCode === "CONFLICT") {
        throw new Error(
          "Este vehículo ya está reservado en ese horario. Elige otra hora o vehículo.",
        );
      }
      throw error;
    }

    if (!data?.client_secret || !data?.booking_id) {
      throw new Error(t.booking.errors.paymentIntentError);
    }

    setBookingId(data.booking_id);
    setClientSecret(data.client_secret);

    return data;
  }, [
    bookingData,
    estimatedPrice,
    locationDetails?.pickupId,
    locationDetails?.dropoffId,
    t,
  ]);

  useEffect(() => {
    if (!bookingData || !estimatedPrice) {
      const savedBookingData = sessionStorage.getItem("payment_bookingData");
      const savedPrice = sessionStorage.getItem("payment_estimatedPrice");

      if (savedBookingData && savedPrice) {
        console.log("[Payment] Recovering data from sessionStorage");
        setBookingData(JSON.parse(savedBookingData));
        setEstimatedPrice(parseFloat(savedPrice));
        return;
      }

      toast({
        title: t.booking.payment.sessionExpired,
        description: t.booking.payment.sessionExpiredDesc,
        variant: "destructive",
      });
      navigate("/booking");
      return;
    }

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

    if (!canProceedToPayment) {
      toast({
        title: t.common.error,
        description: t.booking.payment.incompleteLocationData,
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
          title: t.common.warning,
          description: t.booking.payment.emailWarning,
          variant: "destructive",
        });
      } else {
        toast({
          title: t.booking.payment.bookingConfirmed,
          description: t.booking.payment.bookingConfirmedDesc,
        });
      }

      // sessionStorage is NOT cleared here — Confirmation.tsx handles cleanup
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
        title: t.common.error,
        description: t.booking.payment.finalizationError,
        variant: "destructive",
      });
    }
  };

  const handlePaymentError = (error: Error) => {
    toast({
      title: t.booking.payment.paymentError,
      description: error.message,
      variant: "destructive",
    });
    setIsProcessing(false);
  };

  if (!bookingData || !estimatedPrice) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-6xl py-8 px-4 sm:px-6">
          <BookingProgress currentStep={2} />

          <div className="flex flex-col items-center justify-center mt-12 py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-lg">{t.booking.payment.loadingLocations}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!locationDetails?.pickupId || !locationDetails?.dropoffId) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-6xl py-8 px-4 sm:px-6">
          <BookingProgress currentStep={2} />

          <div className="flex flex-col items-center justify-center mt-12 py-12">
            <AlertCircle className="h-10 w-10 text-destructive mb-4" />
            <p className="text-lg mb-4">{t.booking.payment.locationError}</p>
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
              onClick={() => navigate("/booking/details")}
            >
              {t.common.back}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const normalizedEstimatedPrice = Math.round(Number(estimatedPrice));

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl py-8 px-4 sm:px-6">
        <BookingProgress currentStep={2} />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Left column — Payment form */}
          <div className="lg:col-span-7">
            <h1 className="text-2xl md:text-3xl font-display text-primary mb-6">
              {t.booking.payment.title}
            </h1>

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
              <div className="rounded-2xl border border-border bg-white p-5 md:p-6 shadow-sm">
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
              </div>
            )}
          </div>

          {/* Right column — Sticky summary */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Route & schedule summary */}
              <div className="rounded-2xl border border-border bg-white p-5 md:p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-secondary">
                  {t.booking.summary?.title || t.booking.priceSummary}
                </h2>

                {/* Route */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        {t.booking.form?.from || t.booking.pickup}
                      </span>
                      <p className="font-medium">
                        {locationDetails?.pickup ||
                          bookingData?.pickupLocationName ||
                          bookingData?.pickup}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        {t.booking.form?.to || t.booking.dropoff}
                      </span>
                      <p className="font-medium">
                        {locationDetails?.dropoff ||
                          bookingData?.dropoffLocationName ||
                          bookingData?.dropoff}
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-border" />

                {/* Date, time, passengers */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {bookingData?.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <span>{bookingData.date}</span>
                    </div>
                  )}
                  {bookingData?.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <span>{bookingData.time}</span>
                    </div>
                  )}
                  {bookingData?.passengers && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary shrink-0" />
                      <span>
                        {bookingData.passengers}{" "}
                        {t.booking.success?.passenger || "pax"}
                      </span>
                    </div>
                  )}
                </div>

                {bookingData?.tripType === "round_trip" && (
                  <>
                    <hr className="border-border" />
                    <p className="text-xs text-muted-foreground">
                      {t.booking.price.roundTripIncluded}
                    </p>
                  </>
                )}

                <hr className="border-border" />

                {/* Price breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.booking.price?.basePrice || "Base price"}
                    </span>
                    <span>
                      €
                      {(normalizedEstimatedPrice - luggageSurcharge).toFixed(2)}
                    </span>
                  </div>
                  {luggageSurcharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t.booking.price.luggageSurcharge}
                      </span>
                      <span>€{luggageSurcharge.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                    <span>{t.booking.price?.total || "Total"}</span>
                    <span className="text-primary">
                      €{normalizedEstimatedPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust microcopy */}
              <div className="rounded-2xl border border-border bg-primary/5 p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    {t.hero.fixedPrice} · {t.hero.freeCancellation}
                  </p>
                  <p>
                    {t.trustBar?.securePayment} · {t.hero.support247}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
