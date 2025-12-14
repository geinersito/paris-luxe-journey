/**
 * HOOK: usePaymentV312
 * 
 * Hook para manejar pagos con el sistema V3.1.2
 * - Prepaid: PaymentIntent automático
 * - Flexible: SetupIntent + Hold diferido
 */

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { PaymentMode } from '@/components/booking/PaymentModeSelector';

export interface PaymentMetadata {
  booking_id: string;
  route_key: string;
  vehicle_type: 'sedan' | 'van';
  pricing_version: 'v3.1.2';
  payment_mode: PaymentMode;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
}

export interface PrepaidPaymentResult {
  client_secret: string;
  payment_intent_id: string;
  amount_cents: number;
}

export interface FlexibleSetupResult {
  client_secret: string;
  setup_intent_id: string;
  customer_id: string;
}

export const usePaymentV312 = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Crear PaymentIntent para pago prepaid
   */
  const createPrepaidPayment = useCallback(async (
    amountCents: number,
    metadata: PaymentMetadata
  ): Promise<PrepaidPaymentResult | null> => {
    setIsProcessing(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        'create-prepaid-payment-v312',
        {
          body: {
            amount_cents: amountCents,
            currency: 'eur',
            customer_email: metadata.customer_email,
            customer_name: metadata.customer_name,
            customer_phone: metadata.customer_phone,
            metadata: {
              booking_id: metadata.booking_id,
              route_key: metadata.route_key,
              vehicle_type: metadata.vehicle_type,
              pricing_version: metadata.pricing_version,
              payment_mode: 'prepaid',
            },
          },
        }
      );

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (!data?.client_secret) {
        throw new Error('No client_secret received from payment service');
      }

      return {
        client_secret: data.client_secret,
        payment_intent_id: data.payment_intent_id,
        amount_cents: data.amount_cents,
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      toast({
        title: 'Error al crear pago',
        description: errorMessage,
        variant: 'destructive',
      });

      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  /**
   * Crear SetupIntent para pago flexible
   */
  const createFlexibleSetup = useCallback(async (
    metadata: PaymentMetadata
  ): Promise<FlexibleSetupResult | null> => {
    setIsProcessing(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        'create-flexible-setup-v312',
        {
          body: {
            customer_email: metadata.customer_email,
            customer_name: metadata.customer_name,
            customer_phone: metadata.customer_phone,
            metadata: {
              booking_id: metadata.booking_id,
              route_key: metadata.route_key,
              vehicle_type: metadata.vehicle_type,
              pricing_version: metadata.pricing_version,
              payment_mode: 'flexible',
            },
          },
        }
      );

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (!data?.client_secret) {
        throw new Error('No client_secret received from setup service');
      }

      return {
        client_secret: data.client_secret,
        setup_intent_id: data.setup_intent_id,
        customer_id: data.customer_id,
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      toast({
        title: 'Error al configurar pago',
        description: errorMessage,
        variant: 'destructive',
      });

      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  /**
   * Reset state
   */
  const resetPayment = useCallback(() => {
    setError(null);
    setIsProcessing(false);
  }, []);

  return {
    isProcessing,
    error,
    createPrepaidPayment,
    createFlexibleSetup,
    resetPayment,
  };
};

