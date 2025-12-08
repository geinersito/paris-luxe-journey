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
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookingFormProps } from "@/types/components";
import { useBooking } from "@/contexts/BookingContext";

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

const BookingForm = ({ tourId, tourName, basePrice, onSubmit }: BookingFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  
  const {
    formData,
    price,
    totalPrice,
    luggageSurcharge,
    isSubmitting,
    handleChange,
    handleSubmit: submitBooking, // This is imported but not used
    setFormData
  } = useBookingForm();
  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoadingLocations(true);
        const { data, error } = await supabase
          .from('locations')
          .select('*')
          .order('name');
        
        if (error) {
          console.error('Error fetching locations:', error);
          toast({
            title: t.common.error,
            description: t.booking.errors.locationsNotLoaded,
            variant: "destructive",
          });
          return;
        }

        if (!data || data.length === 0) {
          console.warn('No locations available in database');
          toast({
            title: t.common.error,
            description: t.booking.errors.locationsNotLoaded,
            variant: "destructive",
          });
          return;
        }

        setLocations(data);
      } catch (error) {
        console.error('Error in fetchLocations:', error);
        toast({
          title: t.common.error,
          description: t.booking.errors.locationsNotLoaded,
          variant: "destructive",
        });
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchLocations();
  }, [toast, t]);

  const validateForm = () => {
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

    if (formData.tripType === 'round_trip' && (!formData.returnDate || !formData.returnTime)) {
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
  };

  // Obtener updateBookingData del contexto
  const { updateBookingData } = useBooking();
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('BookingForm - handleFormSubmit llamado');
    
    if (!validateForm()) {
      console.log('BookingForm - Validación del formulario falló');
      return;
    }
  
    try {
      // Actualizar formData con la información del tour
      const updatedFormData = {
        ...formData,
        tourId,
        tourName
      };
      
      console.log('BookingForm - FormData actualizado:', updatedFormData);
      
      // Actualizar el estado local primero
      setFormData(updatedFormData);
      
      // Calcular el precio final con recargos
      const isRoundTrip = updatedFormData.tripType === 'round_trip';
      const basePrice = isRoundTrip ? price * 2 : price;
      const totalEstimatedPrice = basePrice + luggageSurcharge;
      
      // Buscar los UUIDs de las ubicaciones seleccionadas
      const pickupLocation = locations.find(loc => loc.code === updatedFormData.pickup);
      const dropoffLocation = locations.find(loc => loc.code === updatedFormData.dropoff);
      
      console.log('BookingForm - Ubicaciones encontradas:', { 
        pickup: pickupLocation, 
        dropoff: dropoffLocation 
      });
      
      // Verificar que se encontraron las ubicaciones
      if (!pickupLocation || !pickupLocation.id) {
        console.error('BookingForm - No se encontró el ID de la ubicación de recogida:', updatedFormData.pickup);
        toast({
          title: t.common.error,
          description: t.booking.errors.locationNotFound,
          variant: "destructive",
        });
        return;
      }
      
      if (!dropoffLocation || !dropoffLocation.id) {
        console.error('BookingForm - No se encontró el ID de la ubicación de destino:', updatedFormData.dropoff);
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
        luggageSurcharge,
        basePrice, // Añadir el precio base explícitamente
        // Añadir los UUIDs de las ubicaciones
        pickupLocationId: pickupLocation.id,
        dropoffLocationId: dropoffLocation.id,
        // También incluir los nombres completos para mostrar
        pickupLocationName: pickupLocation.name,
        dropoffLocationName: dropoffLocation.name
      };
      
      console.log('BookingForm - Datos completos con IDs de ubicaciones:', bookingDataWithSurcharge);
      
      const navigationState = {
        bookingData: bookingDataWithSurcharge,
        estimatedPrice: totalEstimatedPrice
      };
      
      console.log('BookingForm - Datos para navegación:', navigationState);
      
      // Actualizar el contexto de reserva ANTES de navegar
      if (updateBookingData) {
        console.log('BookingForm - Actualizando contexto con:', bookingDataWithSurcharge);
        try {
          await updateBookingData(bookingDataWithSurcharge);
          console.log('BookingForm - Contexto actualizado correctamente');
        } catch (updateError) {
          console.error('BookingForm - Error al actualizar contexto:', updateError);
          // Continuar con la navegación aunque falle la actualización del contexto
        }
      } else {
        console.warn('BookingForm - updateBookingData no está disponible');
      }
      
      // Al final del handleFormSubmit, justo después de actualizar el contexto
      console.log('BookingForm - Intentando navegar a /booking/details con estado:', navigationState);
      
      // Usar setTimeout para garantizar que se completen las actualizaciones del estado
      setTimeout(() => {
        try {
          navigate("/booking/details", {
            state: navigationState
          });
          console.log('BookingForm - Navegación iniciada');
        } catch (navError) {
          console.error('Error al navegar:', navError);
        }
      }, 200); // Aumentado a 200ms para dar más tiempo
      
      // Llamar al onSubmit prop si existe (para compatibilidad)
      if (typeof onSubmit === 'function') {
        console.log('BookingForm - Llamando a onSubmit para compatibilidad');
        onSubmit(updatedFormData);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        title: t.common.error,
        description: t.booking.errors.bookingCreationError,
        variant: "destructive",
      });
    }
  };

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
      className="glass-card px-6 py-8 md:px-10 md:py-10 rounded-3xl max-w-2xl w-full mx-auto animate-fadeIn bg-white/95 dark:bg-primary-dark/95 backdrop-blur-lg shadow-xl border border-metallic/20"
    >
      <h2 className="text-xl md:text-2xl font-display text-primary text-center mb-6">
        {t.booking.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-6">
          <LocationInputs
            pickup={formData.pickup}
            dropoff={formData.dropoff}
            onChange={handleChange}
            standardLocations={locations}
          />

          <DateTimeInputs
            date={formData.date}
            time={formData.time}
            returnDate={formData.returnDate}
            returnTime={formData.returnTime}
            onChange={handleChange}
            isRoundTrip={formData.tripType === 'round_trip'}
          />
        </div>

        {/* Columna derecha */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t.booking.tripType}</Label>
            <RadioGroup
              value={formData.tripType}
              onValueChange={(value) => handleChange(value, 'tripType')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one_way" id="one_way" />
                <Label htmlFor="one_way" className="text-sm cursor-pointer">{t.booking.oneWay}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="round_trip" id="round_trip" />
                <Label htmlFor="round_trip" className="text-sm cursor-pointer">{t.booking.roundTrip}</Label>
              </div>
            </RadioGroup>
          </div>

          <PassengerCount
            value={formData.passengers}
            onChange={(value) => handleChange(value, 'passengers')}
          />

          <LuggageSelector
            largeLuggageCount={Number(formData.largeLuggageCount) || 0}
            smallLuggageCount={Number(formData.smallLuggageCount) || 0}
            onLargeLuggageChange={(count) => handleChange(count, 'largeLuggageCount')}
            onSmallLuggageChange={(count) => handleChange(count, 'smallLuggageCount')}
          />
        </div>
      </div>

      {price > 0 && (
        <div className="bg-primary/10 p-3 rounded-md mt-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">{t.booking.price.estimated}:</span>
            <span className="text-lg font-display text-primary">
              €{totalPrice.toFixed(2)}
            </span>
          </div>

          {luggageSurcharge > 0 && (
            <div className="text-xs text-muted-foreground mt-1">
              <span>Base: €{price.toFixed(2)}</span>
              <span className="ml-2">+ Equipaje extra: €{luggageSurcharge.toFixed(2)}</span>
            </div>
          )}

          {formData.tripType === 'round_trip' && (
            <p className="text-xs text-muted-foreground mt-1">
              {t.booking.price.roundTripIncluded}
            </p>
          )}
        </div>
      )}

      <Button
        type="submit"
        className="w-full silk-button font-medium text-base py-3 mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? t.common.processing : "See Your Fixed Price"}
      </Button>

      <p className="mt-6 px-4 text-xs text-center text-slate-500">
        No payment required yet – next step shows your final price
      </p>
    </form>
  );
};

export default BookingForm;
