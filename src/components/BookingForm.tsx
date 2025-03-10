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
import { useVehicleAssignment } from "@/hooks/booking/useVehicleAssignment";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookingFormProps } from "@/types/components";

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
    totalPrice,      // Added price breakdown values
    luggageSurcharge,
    isSubmitting,
    handleChange,
    handleSubmit: submitBooking,
  } = useBookingForm();

  const { assignedVehicles } = useVehicleAssignment(formData);

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

    if (!assignedVehicles.length) {
      toast({
        title: t.common.error,
        description: t.booking.errors.noVehiclesAvailable,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const updatedFormData = {
      ...formData,
      tourId,
      tourName,
      basePrice,
      vehicleType: assignedVehicles[0]?.type || "",
      vehicle_id: assignedVehicles[0]?.id || "",
      largeLuggageCount: Number(formData.largeLuggageCount),
      smallLuggageCount: Number(formData.smallLuggageCount),
      passengers: Number(formData.passengers)
    };

    onSubmit(updatedFormData);
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
      className="glass-card p-8 rounded-xl max-w-md w-full mx-auto animate-fadeIn space-y-8 bg-white/95 dark:bg-primary-dark/95 backdrop-blur-lg shadow-xl border border-metallic/20"
    >
      <h2 className="text-2xl md:text-3xl font-display text-primary text-center">
        {t.booking.title}
      </h2>

      <div className="space-y-8">
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

        <div className="space-y-3">
          <Label>{t.booking.tripType}</Label>
          <RadioGroup
            value={formData.tripType}
            onValueChange={(value) => handleChange(value, 'tripType')}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one_way" id="one_way" />
              <Label htmlFor="one_way">{t.booking.oneWay}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="round_trip" id="round_trip" />
              <Label htmlFor="round_trip">{t.booking.roundTrip}</Label>
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

        {price && assignedVehicles.length > 0 && (
          <div className="bg-primary/10 p-4 rounded-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{t.booking.assignedVehicles}:</span>
              <div className="text-sm">
                {assignedVehicles.map((vehicle, index) => (
                  <div key={index} className="text-right">
                    1x {vehicle.type === 'berline' ? t.booking.vehicle.berline : t.booking.vehicle.van}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-primary/20 pt-2">
              <span className="font-semibold">{t.booking.price.estimated}:</span>
              <div className="text-right">
                {luggageSurcharge > 0 && (
                  <div className="text-sm text-muted-foreground mb-1">
                    <span>Base: €{price.toFixed(2)}</span>
                    <span className="ml-2">+ {t.booking.price.luggage}: €{luggageSurcharge.toFixed(2)}</span>
                  </div>
                )}
                <span className="text-xl font-display text-primary">
                  €{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
            {formData.tripType === 'round_trip' && (
              <p className="text-sm text-muted-foreground">
                {t.booking.price.roundTripIncluded}
              </p>
            )}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full silk-button font-medium text-base py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? t.common.processing : t.booking.continue}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
