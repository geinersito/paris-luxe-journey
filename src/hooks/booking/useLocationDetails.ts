
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface LocationDetail {
  name: string;
  id: string;  // UUID de la ubicación
  code: string; // Código de la ubicación (ej. "CDG")
}

export const useLocationDetails = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [locationDetails, setLocationDetails] = useState<{
    pickup: string;
    dropoff: string;
    pickupId?: string; // UUID para guardar en la base de datos
    dropoffId?: string; // UUID para guardar en la base de datos
  }>({ pickup: '', dropoff: '' });
  const [isLoading, setIsLoading] = useState(true);

  const fetchLocationDetails = useCallback(async (pickupCode: string | null | undefined, dropoffCode: string | null | undefined) => {
    if (!pickupCode || !dropoffCode) {
      console.error('Invalid location codes:', { pickupCode, dropoffCode });
      setLocationDetails({ pickup: '', dropoff: '' });
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('Fetching locations with codes:', { pickup: pickupCode, dropoff: dropoffCode });

      // Convertir los códigos a string seguros
      let pickupString = '';
      let dropoffString = '';

      if (typeof pickupCode === 'object' && pickupCode !== null) {
        pickupString = pickupCode.id || '';
      } else if (typeof pickupCode === 'string') {
        pickupString = pickupCode;
      }

      if (typeof dropoffCode === 'object' && dropoffCode !== null) {
        dropoffString = dropoffCode.id || '';
      } else if (typeof dropoffCode === 'string') {
        dropoffString = dropoffCode;
      }

      // Validar que tenemos códigos válidos antes de hacer las consultas
      if (!pickupString || !dropoffString) {
        throw new Error('Códigos de ubicación inválidos');
      }

      const [pickupLocation, dropoffLocation] = await Promise.all([
        supabase.from('locations')
          .select('id, name, code') // Obtener también el ID y código
          .eq('code', pickupString) // Usar la nueva variable pickupString 
          .single(),
        supabase.from('locations')
          .select('id, name, code') // Obtener también el ID y código
          .eq('code', dropoffString) // Usar la nueva variable dropoffString
          .single()
      ]);

      if (pickupLocation.error || dropoffLocation.error) {
        console.error('Query errors:', {
          pickup: pickupLocation.error,
          dropoff: dropoffLocation.error
        });
        throw new Error('Failed to fetch location details');
      }

      const pickupData = pickupLocation.data as LocationDetail;
      const dropoffData = dropoffLocation.data as LocationDetail;

      const details = {
        pickup: pickupData?.name || '',
        dropoff: dropoffData?.name || '',
        pickupId: pickupData?.id, // Guardar el UUID
        dropoffId: dropoffData?.id, // Guardar el UUID
        pickupCode: pickupData?.code, // Guardar también el código
        dropoffCode: dropoffData?.code // Guardar también el código
      };

      console.log('Successfully fetched location details:', details);
      setLocationDetails(details);

    } catch (error) {
      console.error('Location fetch error:', error);
      toast({
        title: t.common.error,
        description: t.booking.errors.locationsNotLoaded,
        variant: "destructive",
      });
      setLocationDetails({ pickup: '', dropoff: '' });
    } finally {
      setIsLoading(false);
    }
  }, [toast, t]);

  return {
    locationDetails,
    fetchLocationDetails,
    isLoading
  };
};
