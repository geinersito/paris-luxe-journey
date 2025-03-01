import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
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
  const [serviceLevels, setServiceLevels] = useState<ServiceLevel[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const [isLoadingServiceLevels, setIsLoadingServiceLevels] = useState(true);

  const {
    formData,
    price,
    isSubmitting,
    handleChange,
    handleSubmit: submitBooking,
  } = useBookingForm();

  const { assignedVehicles } = useVehicleAssignment(formData);

  useEffect(() => {
    const fetchServiceLevels = async () => {
      try {
        setIsLoadingServiceLevels(true);
        const { data, error } = await supabase
          .from('service_levels')
          .select('*')
          .order('multiplier');
        
        if (error) throw error;
        setServiceLevels(data || []);
      } catch (error) {
        console.error('Error fetching service levels:', error);
        toast({
          title: t.common.error,
          description: t.booking.errors.serviceLevelsNotLoaded,
          variant: "destructive",
        });
      } finally {
        setIsLoadingServiceLevels(false);
      }
    };

    fetchServiceLevels();
  }, [toast, t]);

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

        <LuggageSelector 
          formData={formData}
          onChange={handleChange}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {t.booking.submit}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
