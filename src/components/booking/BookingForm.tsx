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
import { supabase } from "@/integrations/supabase/client";

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
  const { t } = useLanguage();
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

        if (!data || data.length === 0) {
          throw new Error('No locations available');
        }

        const filteredLocations = data
          .filter(location => location.code !== '')
          .map(location => ({
            ...location,
            name: location.type === 'airport' ? `${location.name} (${location.code})` : location.name,
            name_es: location.type === 'airport' ? `${location.name_es} (${location.code})` : location.name_es,
            name_en: location.type === 'airport' ? `${location.name_en} (${location.code})` : location.name_en,
            name_fr: location.type === 'airport' ? `${location.name_fr} (${location.code})` : location.name_fr,
            name_pt: location.type === 'airport' ? `${location.name_pt} (${location.code})` : location.name_pt,
          }));

        setLocations(filteredLocations);
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

    if (!formData.serviceLevel) {
      toast({
        title: t.common.error,
        description: t.booking.errors.selectServiceLevel,
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
      vehicleType: assignedVehicles[0]?.type || "",
      vehicle_id: assignedVehicles[0]?.id || "",
      largeLuggageCount: Number(formData.largeLuggageCount),
      smallLuggageCount: Number(formData.smallLuggageCount),
      passengers: Number(formData.passengers),
      serviceLevel: formData.serviceLevel || 'standard'
    };

    navigate("/booking/details", { 
      state: { 
        bookingData: updatedFormData,
        estimatedPrice: formData.tripType === 'round_trip' ? price * 2 : price 
      } 
    });
  };

  if (isLoadingLocations || isLoadingServiceLevels) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg space-y-6 w-full max-w-md">
      <div className="space-y-4">
        {/* Tipo de servicio */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t('service_type')}</Label>
          <RadioGroup
            defaultValue="one_way"
            name="service_type"
            className="grid grid-cols-2 gap-4"
            value={formData.tripType}
            onValueChange={(value) => handleChange(value, 'tripType')}
          >
            <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="one_way" id="one_way" />
              <Label htmlFor="one_way" className="cursor-pointer">{t('one_way')}</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="round_trip" id="round_trip" />
              <Label htmlFor="round_trip" className="cursor-pointer">{t('round_trip')}</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Nivel de servicio */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t('service_level')}</Label>
          <RadioGroup
            defaultValue="standard"
            name="service_level"
            className="grid grid-cols-2 gap-4"
            value={formData.serviceLevel}
            onValueChange={(value) => handleChange(value, 'serviceLevel')}
          >
            {serviceLevels.map((level) => (
              <div key={level.id} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <RadioGroupItem value={level.id} id={level.id} />
                <Label htmlFor={level.id} className="cursor-pointer">{level.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Ubicaciones */}
        <div className="space-y-4">
          <LocationInputs
            locations={locations}
            formData={formData}
            onChange={handleChange}
          />
        </div>

        {/* Fecha y Hora */}
        <div className="space-y-4">
          <DateTimeInputs
            formData={formData}
            onChange={handleChange}
          />
        </div>

        {/* Pasajeros y Equipaje */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <PassengerCount
              value={formData.passengers}
              onChange={(value) => handleChange(value, 'passengers')}
            />
          </div>
          <div className="space-y-2">
            <LuggageSelector
              largeLuggage={formData.largeLuggageCount}
              smallLuggage={formData.smallLuggageCount}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Precio y Botón de Reserva */}
        <div className="pt-4 space-y-4">
          {price > 0 && (
            <div className="text-right text-lg font-semibold">
              {t('estimated_price')}: €{formData.tripType === 'round_trip' ? price * 2 : price}
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              t('continue_booking')
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
