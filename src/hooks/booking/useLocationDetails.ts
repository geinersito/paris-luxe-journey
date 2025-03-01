
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const useLocationDetails = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [locationDetails, setLocationDetails] = useState<{
    pickup: string;
    dropoff: string;
  }>({ pickup: '', dropoff: '' });
  const [isLoading, setIsLoading] = useState(true);

  const fetchLocationDetails = useCallback(async (pickupId: string, dropoffId: string) => {
    if (!pickupId || !dropoffId) {
      console.error('Missing pickup or dropoff IDs:', { pickupId, dropoffId });
      return;
    }

    try {
      setIsLoading(true);
      console.log('Fetching location details for:', { pickupId, dropoffId });

      const [pickupLocation, dropoffLocation] = await Promise.all([
        supabase.from('locations').select('name').eq('id', pickupId).single(),
        supabase.from('locations').select('name').eq('id', dropoffId).single()
      ]);

      if (pickupLocation.error) {
        console.error('Error fetching pickup location:', pickupLocation.error);
        throw new Error(pickupLocation.error.message);
      }

      if (dropoffLocation.error) {
        console.error('Error fetching dropoff location:', dropoffLocation.error);
        throw new Error(dropoffLocation.error.message);
      }

      console.log('Location details fetched:', {
        pickup: pickupLocation.data?.name,
        dropoff: dropoffLocation.data?.name
      });

      setLocationDetails({
        pickup: pickupLocation.data?.name || '',
        dropoff: dropoffLocation.data?.name || ''
      });
    } catch (error) {
      console.error('Error fetching location details:', error);
      toast({
        title: t.common.error,
        description: t.booking.errors.locationsNotLoaded,
        variant: "destructive",
      });
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
