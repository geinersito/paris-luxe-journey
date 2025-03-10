import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from './use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceLevel {
  id: string;
  name: string;
  description: Record<string, string>;
  features: Record<string, any>;
  multiplier: number;
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
        setIsLoading(false);
      }
    };

    fetchServiceLevels();
  }, [toast, t]);

  return { serviceLevels, isLoading };
}