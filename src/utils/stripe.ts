
import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "@/integrations/supabase/client";

let stripePromise: Promise<any> | null = null;

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchStripeKey = async (attempt: number = 1, maxAttempts: number = 3): Promise<string> => {
  try {
    console.log(`Intentando obtener la clave de Stripe (intento ${attempt} de ${maxAttempts})`);
    const { data, error } = await supabase.functions.invoke('get-stripe-key');
    
    if (error) {
      console.error('Error al obtener la clave de Stripe:', error);
      throw error;
    }

    if (!data?.publishableKey) {
      console.error('No se recibió la clave pública de Stripe');
      throw new Error('No Stripe publishable key returned');
    }

    console.log('Clave de Stripe obtenida exitosamente');
    return data.publishableKey;
  } catch (err) {
    console.error(`Error en el intento ${attempt}:`, err);
    if (attempt >= maxAttempts) {
      console.error('Error máximo de intentos alcanzado al obtener la clave de Stripe:', err);
      throw err;
    }

    const backoffDelay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
    console.log(`Reintentando en ${backoffDelay}ms...`);
    await wait(backoffDelay);
    
    return fetchStripeKey(attempt + 1, maxAttempts);
  }
};

export const getStripe = async () => {
  if (!stripePromise) {
    try {
      console.log('Obteniendo clave pública de Stripe...');
      const publishableKey = await fetchStripeKey();
      console.log('Inicializando cliente de Stripe...');
      stripePromise = loadStripe(publishableKey);
    } catch (err) {
      console.error('Error fatal al inicializar Stripe:', err);
      return null;
    }
  }
  return stripePromise;
};
