import { supabase } from '@/integrations/supabase/client';

let isLoading = false;
let isLoaded = false;
const callbacks: Array<() => void> = [];

export const loadGoogleMapsScript = async () => {
  // If already loaded, resolve immediately
  if (isLoaded && window.google?.maps) {
    return Promise.resolve();
  }

  // If loading, add to callback queue
  if (isLoading) {
    return new Promise<void>((resolve) => {
      callbacks.push(resolve);
    });
  }

  try {
    isLoading = true;
    
    // Get API key from Supabase Edge Function with retries
    const maxRetries = 3;
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const { data, error } = await supabase.functions.invoke('get-map-key', {
          method: 'POST'
        });
        
        if (error) throw error;
        if (!data?.GOOGLE_MAPS_API_KEY) throw new Error('Google Maps API key not found');
        
        const GOOGLE_MAPS_API_KEY = data.GOOGLE_MAPS_API_KEY;

        return new Promise<void>((resolve, reject) => {
          // Create script element
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;

          // Handle script load
          script.onload = () => {
            isLoaded = true;
            isLoading = false;
            callbacks.forEach(callback => callback());
            callbacks.length = 0;
            resolve();
          };

          // Handle script error
          script.onerror = () => {
            isLoading = false;
            callbacks.length = 0;
            reject(new Error('Failed to load Google Maps script'));
          };

          // Add script to document
          document.head.appendChild(script);
        });
      } catch (retryError) {
        lastError = retryError;
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
    
    throw lastError || new Error('Failed to load Google Maps after retries');
  } catch (error) {
    isLoading = false;
    console.error('Error loading Google Maps:', error);
    throw error;
  }
};