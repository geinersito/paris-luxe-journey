
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
      console.error('Invalid location IDs:', { pickupId, dropoffId });
      setLocationDetails({ pickup: '', dropoff: '' });
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('Fetching locations with codes:', { pickup: pickupId, dropoff: dropoffId });

      const processedPickupId = typeof pickupId === 'object' ? pickupId.id : pickupId;
      const processedDropoffId = typeof dropoffId === 'object' ? dropoffId.id : dropoffId;

      const [pickupLocation, dropoffLocation] = await Promise.all([
        supabase.from('locations')
          .select('name')
          .filter('code', 'eq', processedPickupId)
          .single(),
        supabase.from('locations')
          .select('name')
          .filter('code', 'eq', processedDropoffId)
          .single()
      ]);

      if (pickupLocation.error || dropoffLocation.error) {
        console.error('Query errors:', {
          pickup: pickupLocation.error,
          dropoff: dropoffLocation.error
        });
        throw new Error('Failed to fetch location details');
      }

      const details = {
        pickup: pickupLocation.data?.name || '',
        dropoff: dropoffLocation.data?.name || ''
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
