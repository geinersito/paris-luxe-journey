import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from './use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceLevel {
  id: string;
  name: string;
  description: Record<string, string>;
  features: Record<string, any>;
  multiplier?: number; // Optional: may not exist in database yet
}

export function useServiceLevels() {
  const [serviceLevels, setServiceLevels] = useState<ServiceLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchServiceLevels = async () => {
      try {
        setIsLoading(true);
        // TODO: Create service_levels table in Supabase
        // For now, use vehicles table as fallback
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .order('base_price');

        if (error) throw error;

        // Map vehicles to service levels format
        const mappedData = (data || []).map(vehicle => ({
          id: vehicle.id,
          name: vehicle.name,
          description: { en: vehicle.description || '' },
          features: vehicle.features || {},
          multiplier: 1.0 // Default multiplier
        }));

        setServiceLevels(mappedData);
      } catch (error) {
        console.error('Error fetching service levels:', error);
        toast({
          title: t.common.error,
          description: t.booking.errors.serviceLevelsNotLoaded,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceLevels();
  }, [toast, t]);

  return { serviceLevels, isLoading };
}