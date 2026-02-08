import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LocationInputs } from "./booking/LocationInputs";
import { useBookingForm } from "@/hooks/useBookingForm";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { DateTimeInputs } from "./booking/DateTimeInputs";
import { PassengerCount } from "./booking/PassengerCount";
import { LuggageSelector } from "./booking/LuggageSelector";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookingFormProps } from "@/types/components";
import { useBooking } from "@/contexts/BookingContext";
import { MessageCircle } from "lucide-react";

interface Location {
  id: string;
  name: string;
  name_en: string | null;
  name_es: string | null;
  name_fr: string | null;
  name_pt: string | null;
  type: string;
  code: string;
}

const BookingForm = ({
  tourId,
  tourName,
  basePrice,
  onSubmit,
  compact = false,
  initialData,
}: BookingFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const hasPrefilledRef = useRef(false);

  const {
    formData,
    price,
    totalPrice,
    luggageSurcharge,
    isSubmitting,
    handleChange,
    handleSubmit: submitBooking, // This is imported but not used
    setFormData,
  } = useBookingForm();

  // Prellenar el formulario con initialData si existe (después de cargar ubicaciones)
  useEffect(() => {
    if (
      initialData &&
      !isLoadingLocations &&
      locations.length > 0 &&
      !hasPrefilledRef.current
    ) {
      hasPrefilledRef.current = true;
      setFormData((prev) => ({
        ...prev,
        ...(initialData.pickup && { pickup: initialData.pickup }),
        ...(initialData.dropoff && { dropoff: initialData.dropoff }),
        ...(initialData.passengers && { passengers: initialData.passengers }),
      }));
    }
  }, [initialData, isLoadingLocations, locations.length, setFormData]);

  // Memoizar fetchLocations para evitar recrearla en cada render
  const fetchLocations = useCallback(async () => {
    try {
      setIsLoadingLocations(true);

      // Timeout para detectar si Supabase está colgado
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 5000),
      );

      const fetchPromise = supabase
        .from("locations")
        .select("id, name, name_en, name_es, name_fr, name_pt, type, code")
        .order("name");

      const { data, error } = (await Promise.race([
        fetchPromise,
        timeoutPromise,
      ])) as Awaited<typeof fetchPromise>;

      if (error) {
        console.error("Error loading locations:", error);
        // Usar ubicaciones hardcodeadas como fallback
        const fallbackLocations = [
          {
            id: "1",
            name: "Paris CDG Airport",
            name_en: "Paris CDG Airport",
            name_es: "Aeropuerto CDG de París",
            name_fr: "Aéroport CDG Paris",
            name_pt: "Aeroporto CDG Paris",
            type: "airport",
            code: "cdg",
          },
          {
            id: "2",
            name: "Paris Orly Airport",
            name_en: "Paris Orly Airport",
            name_es: "Aeropuerto Orly de París",
            name_fr: "Aéroport Orly Paris",
            name_pt: "Aeroporto Orly Paris",
            type: "airport",
            code: "orly",
          },
          {
            id: "3",
            name: "Paris City Center",
            name_en: "Paris City Center",
            name_es: "Centro de París",
            name_fr: "Centre de Paris",
            name_pt: "Centro de Paris",
            type: "city",
            code: "paris",
          },
          {
            id: "4",
            name: "Disneyland Paris",
            name_en: "Disneyland Paris",
            name_es: "Disneyland París",
            name_fr: "Disneyland Paris",
            name_pt: "Disneyland Paris",
            type: "attraction",
            code: "disneyland",
          },
          {
            id: "5",
            name: "Versailles",
            name_en: "Versailles",
            name_es: "Versalles",
            name_fr: "Versailles",
            name_pt: "Versalhes",
            type: "city",
            code: "versailles",
          },
        ];
        setLocations(fallbackLocations);
        return;
      }

      if (!data || data.length === 0) {
        console.warn("No locations found in database, using fallback");
        // Usar ubicaciones hardcodeadas como fallback
        const fallbackLocations = [
          {
            id: "1",
            name: "Paris CDG Airport",
            name_en: "Paris CDG Airport",
            name_es: "Aeropuerto CDG de París",
            name_fr: "Aéroport CDG Paris",
            name_pt: "Aeroporto CDG Paris",
            type: "airport",
            code: "cdg",
          },
          {
            id: "2",
            name: "Paris Orly Airport",
            name_en: "Paris Orly Airport",
            name_es: "Aeropuerto Orly de París",
            name_fr: "Aéroport Orly Paris",
            name_pt: "Aeroporto Orly Paris",
            type: "airport",
            code: "orly",
          },
          {
            id: "3",
            name: "Paris City Center",
            name_en: "Paris City Center",
            name_es: "Centro de París",
            name_fr: "Centre de Paris",
            name_pt: "Centro de Paris",
            type: "city",
            code: "paris",
          },
          {
            id: "4",
            name: "Disneyland Paris",
            name_en: "Disneyland Paris",
            name_es: "Disneyland París",
            name_fr: "Disneyland Paris",
            name_pt: "Disneyland Paris",
            type: "attraction",
            code: "disneyland",
          },
          {
            id: "5",
            name: "Versailles",
            name_en: "Versailles",
            name_es: "Versalles",
            name_fr: "Versailles",
            name_pt: "Versalhes",
            type: "city",
            code: "versailles",
          },
        ];
        setLocations(fallbackLocations);
        return;
      }

      setLocations(data);
    } catch (error) {
      console.error("Exception loading locations:", error);
      // Usar ubicaciones hardcodeadas como fallback
      const fallbackLocations = [
        {
          id: "1",
          name: "Paris CDG Airport",
          name_en: "Paris CDG Airport",
          name_es: "Aeropuerto CDG de París",
          name_fr: "Aéroport CDG Paris",
          name_pt: "Aeroporto CDG Paris",
          type: "airport",
          code: "cdg",
        },
        {
          id: "2",
          name: "Paris Orly Airport",
          name_en: "Paris Orly Airport",
          name_es: "Aeropuerto Orly de París",
          name_fr: "Aéroport Orly Paris",
          name_pt: "Aeroporto Orly Paris",
          type: "airport",
          code: "orly",
        },
        {
          id: "3",
          name: "Paris City Center",
          name_en: "Paris City Center",
          name_es: "Centro de París",
          name_fr: "Centre de Paris",
          name_pt: "Centro de Paris",
          type: "city",
          code: "paris",
        },
        {
          id: "4",
          name: "Disneyland Paris",
          name_en: "Disneyland Paris",
          name_es: "Disneyland París",
          name_fr: "Disneyland Paris",
          name_pt: "Disneyland Paris",
          type: "attraction",
          code: "disneyland",
        },
        {
          id: "5",
          name: "Versailles",
          name_en: "Versailles",
          name_es: "Versalles",
          name_fr: "Versailles",
          name_pt: "Versalhes",
          type: "city",
          code: "versailles",
        },
      ];
      setLocations(fallbackLocations);
    } finally {
      setIsLoadingLocations(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  // Memoizar validateForm para evitar recrearla en cada render
  const validateForm = useCallback(() => {
    if (!formData.pickup || !formData.dropoff) {
      toast({
        title: t.common.error,
        description: t.booking.errors.selectLocations,
        variant: "destructive",
      });
      return false;
    }

    if (!formData.date || !formData.time) {
      toast({
        title: t.common.error,
        description: t.booking.errors.selectDateTime,
        variant: "destructive",
      });
      return false;
    }

    if (
      formData.tripType === "round_trip" &&
      (!formData.returnDate || !formData.returnTime)
    ) {
      toast({
        title: t.common.error,
        description: t.booking.errors.selectReturnDateTime,
        variant: "destructive",
      });
      return false;
    }

    if (!formData.passengers || parseInt(formData.passengers) < 1) {
      toast({
        title: t.common.error,
        description: t.booking.errors.selectPassengers,
        variant: "destructive",
      });
      return false;
    }

    return true;
  }, [formData, toast, t]);

  // Obtener updateBookingData del contexto
  const { updateBookingData } = useBooking();

  // Memoizar el cálculo del precio total estimado
  const totalEstimatedPrice = useMemo(() => {
    const isRoundTrip = formData.tripType === "round_trip";
    const basePrice = isRoundTrip ? price * 2 : price;
    return basePrice + luggageSurcharge;
  }, [price, luggageSurcharge, formData.tripType]);

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      try {
        // Actualizar formData con la información del tour
        const updatedFormData = {
          ...formData,
          tourId,
          tourName,
        };

        // Actualizar el estado local primero
        setFormData(updatedFormData);

        // Calcular el precio final con recargos
        const isRoundTrip = updatedFormData.tripType === "round_trip";
        const basePrice = isRoundTrip ? price * 2 : price;
        const totalEstimatedPrice = basePrice + luggageSurcharge;

        // Buscar los UUIDs de las ubicaciones seleccionadas
        const pickupLocation = locations.find(
          (loc) => loc.code === updatedFormData.pickup,
        );
        const dropoffLocation = locations.find(
          (loc) => loc.code === updatedFormData.dropoff,
        );

        // Verificar que se encontraron las ubicaciones
        if (!pickupLocation || !pickupLocation.id) {
          toast({
            title: t.common.error,
            description: t.booking.errors.locationNotFound,
            variant: "destructive",
          });
          return;
        }

        if (!dropoffLocation || !dropoffLocation.id) {
          toast({
            title: t.common.error,
            description: t.booking.errors.locationNotFound,
            variant: "destructive",
          });
          return;
        }

        // Preparar datos para navegación y contexto con UUIDs de ubicaciones
        const bookingDataWithSurcharge = {
          ...updatedFormData,
          passengers: Number(updatedFormData.passengers), // Convert string to number
          luggageSurcharge,
          basePrice, // Añadir el precio base explícitamente
          // Añadir los UUIDs de las ubicaciones
          pickupLocationId: pickupLocation.id,
          dropoffLocationId: dropoffLocation.id,
          // También incluir los nombres completos para mostrar
          pickupLocationName: pickupLocation.name,
          dropoffLocationName: dropoffLocation.name,
        };

        const navigationState = {
          bookingData: bookingDataWithSurcharge,
          estimatedPrice: totalEstimatedPrice,
        };

        // Actualizar el contexto de reserva ANTES de navegar
        if (updateBookingData) {
          try {
            await updateBookingData(bookingDataWithSurcharge);
          } catch (updateError) {
            console.error(
              "[BookingForm] Error updating booking context:",
              updateError,
            );
            // Continuar con la navegación aunque falle la actualización del contexto
          }
        }

        // Navegar directamente sin setTimeout (anti-pattern eliminado)
        try {
          navigate("/booking/details", {
            state: navigationState,
          });

          // Llamar al onSubmit prop si existe (para compatibilidad)
          if (typeof onSubmit === "function") {
            onSubmit(bookingDataWithSurcharge);
          }
        } catch (navError) {
          console.error("[BookingForm] Navigation error:", navError);
          toast({
            title: t.common.error,
            description: t.booking.errors.bookingCreationError,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: t.common.error,
          description: t.booking.errors.bookingCreationError,
          variant: "destructive",
        });
      }
    },
    [
      validateForm,
      formData,
      setFormData,
      price,
      luggageSurcharge,
      locations,
      toast,
      t,
      updateBookingData,
      navigate,
      onSubmit,
      tourId,
      tourName,
    ],
  );

  if (isLoadingLocations) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className={
        compact
          ? "w-full"
          : "glass-card px-6 py-8 md:px-10 md:py-10 rounded-3xl max-w-2xl w-full mx-auto animate-fadeIn bg-white/95 dark:bg-primary-dark/95 backdrop-blur-lg shadow-2xl ring-1 ring-primary/10 hover:shadow-[0_25px_50px_-12px_rgba(11,37,69,0.25)] transition-shadow duration-300 border border-metallic/20"
      }
    >
      {!compact && (
        <h2 className="text-xl md:text-2xl font-sans font-semibold text-primary text-center mb-8">
          {t.booking.title}
        </h2>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-7">
          <LocationInputs
            pickup={formData.pickup}
            dropoff={formData.dropoff}
            onChange={handleChange}
            standardLocations={locations}
            isLoadingLocations={isLoadingLocations}
          />

          <DateTimeInputs
            date={formData.date}
            time={formData.time}
            returnDate={formData.returnDate}
            returnTime={formData.returnTime}
            onChange={handleChange}
            isRoundTrip={formData.tripType === "round_trip"}
          />
        </div>

        {/* Columna derecha */}
        <div className="space-y-7">
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t.booking.tripType}</Label>
            <RadioGroup
              value={formData.tripType}
              onValueChange={(value) => handleChange(value, "tripType")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one_way" id="one_way" />
                <Label htmlFor="one_way" className="text-sm cursor-pointer">
                  {t.booking.oneWay}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="round_trip" id="round_trip" />
                <Label htmlFor="round_trip" className="text-sm cursor-pointer">
                  {t.booking.roundTrip}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <PassengerCount
            value={formData.passengers}
            onChange={(value) => handleChange(value, "passengers")}
          />

          {/* Aviso para grupos de 8+ pasajeros */}
          <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>
                {t.booking.groupNotice?.title || "Groups of 8+ passengers"}:
              </strong>{" "}
              {t.booking.groupNotice?.description ||
                "For groups of 8 or more passengers, please contact us via WhatsApp for a personalized quote."}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => window.open("https://wa.me/33668251102", "_blank")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {t.booking.groupNotice?.cta || "Contact via WhatsApp"}
            </Button>
          </div>

          <LuggageSelector
            largeLuggageCount={Number(formData.largeLuggageCount) || 0}
            smallLuggageCount={Number(formData.smallLuggageCount) || 0}
            passengers={Number(formData.passengers) || 1}
            onLargeLuggageChange={(count) =>
              handleChange(count, "largeLuggageCount")
            }
            onSmallLuggageChange={(count) =>
              handleChange(count, "smallLuggageCount")
            }
          />
        </div>
      </div>

      {price > 0 && (
        <div className="bg-primary/10 p-3 rounded-md mt-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">
              {t.booking.price.estimated}:
            </span>
            <span className="text-lg font-display text-primary">
              €{totalPrice.toFixed(2)}
            </span>
          </div>

          {luggageSurcharge > 0 && (
            <div className="text-xs text-muted-foreground mt-1">
              <span>Base: €{price.toFixed(2)}</span>
              <span className="ml-2">
                + Equipaje extra: €{luggageSurcharge.toFixed(2)}
              </span>
            </div>
          )}

          {formData.tripType === "round_trip" && (
            <p className="text-xs text-muted-foreground mt-1">
              {t.booking.price.roundTripIncluded}
            </p>
          )}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold text-base py-6 mt-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? t.common.processing
          : t.booking.submitButton || "Voir Votre Prix Fixe"}
      </Button>

      <p className="mt-4 px-4 text-sm text-center text-muted-foreground">
        {t.booking.noPaymentRequired ||
          "Aucun paiement requis - l'étape suivante affiche votre prix final"}
      </p>
    </form>
  );
};

export default BookingForm;
