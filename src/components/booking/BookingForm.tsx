import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LocationInputs } from "@/components/booking/LocationInputs";
import { useBookingForm } from "@/hooks/useBookingForm";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DateTimeInputs } from "@/components/booking/DateTimeInputs";
import { PassengerCount } from "@/components/booking/PassengerCount";
import { LuggageSelector } from "@/components/booking/LuggageSelector";
import { useVehicleAssignment } from "@/hooks/booking/useVehicleAssignment";
import { useServiceLevels } from "@/hooks/useServiceLevels";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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

interface ServiceLevel {
  id: string;
  name: string;
  description: Record<string, string>;
  features: Record<string, any>;
  multiplier: number;
}

const BookingForm = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const { serviceLevels, isLoading: isLoadingServiceLevels } = useServiceLevels();

  const {
    formData,
    price,
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
        
        if (error) throw error;
        setLocations(data || []);
      } catch (error) {
        console.error('Error fetching locations:', error);
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

    if (!formData.serviceLevel) {
      toast({
        title: t.common.error,
        description: t.booking.errors.selectServiceLevel,
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
      serviceLevel: formData.serviceLevel || 'standard'
    };

    navigate("/booking/details", { 
      state: { 
        bookingData: updatedFormData,
      }
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Service Level Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{t.booking.serviceLevel}</h3>
          {isLoadingServiceLevels ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <RadioGroup
              value={formData.serviceLevel || 'standard'}
              onValueChange={(value) => handleChange({ target: { name: 'serviceLevel', value } } as any)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {serviceLevels.map((level) => (
                <div key={level.id} className="relative">
                  <RadioGroupItem
                    value={level.id}
                    id={level.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={level.id}
                    className="flex flex-col p-4 border rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-primary peer-checked:bg-primary/5"
                  >
                    <span className="font-medium">{level.name}</span>
                    <span className="text-sm text-gray-500">{level.description[language]}</span>
                    {price && (
                      <span className="mt-2 text-lg font-semibold">
                        {(price * level.multiplier).toFixed(2)}€
                      </span>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        <LocationInputs 
          locations={locations}
          isLoading={isLoadingLocations}
          formData={formData}
          onChange={handleChange}
        />

        <DateTimeInputs 
          formData={formData}
          onChange={handleChange}
        />

        <PassengerCount 
          value={formData.passengers}
          onChange={(value) => handleChange({ target: { name: 'passengers', value } } as any)}
        />

        // Replace the current LuggageSelector implementation with:
        <LuggageSelector 
          largeLuggageCount={Number(formData.largeLuggageCount)}
          smallLuggageCount={Number(formData.smallLuggageCount)}
          onLargeLuggageChange={(count) => 
            handleChange({ target: { name: 'largeLuggageCount', value: count } } as any)}
          onSmallLuggageChange={(count) => 
            handleChange({ target: { name: 'smallLuggageCount', value: count } } as any)}
        />

        <Button 
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? t.common.processing : t.booking.continue}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
