import { useState, useEffect, useRef, memo, useCallback } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import type { PaymentIntent, StripeError } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

interface PaymentFormContentProps {
  clientSecret: string;
  isProcessing: boolean;
  onSuccess: () => void;
  onError: (error: Error) => void;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

type PaymentStatus = 'initial' | 'processing' | 'success' | 'error';

const PAYMENT_TIMEOUT = 60000; // 1 minuto

const StripePaymentFormContent = memo(({ 
  clientSecret, 
  isProcessing: parentIsProcessing, 
  onSuccess, 
  onError,
  customerName,
  customerEmail,
  customerPhone
}: PaymentFormContentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('initial');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mounted = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const statusRef = useRef<PaymentStatus>(paymentStatus);
  const { toast } = useToast();

  // Mantener la referencia actualizada del estado
  useEffect(() => {
    statusRef.current = paymentStatus;
  }, [paymentStatus]);

  // Verificar estado inicial del PaymentIntent
  useEffect(() => {
    const checkInitialStatus = async () => {
      if (!stripe || !clientSecret) return;

      try {
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
        console.log('[StripePaymentFormContent] Estado inicial:', {
          status: paymentIntent?.status,
          hasPaymentMethod: !!paymentIntent?.payment_method,
          requiresAction: !!paymentIntent?.next_action
        });

        if (paymentIntent?.status === 'requires_payment_method') {
          setPaymentStatus('initial');
        } else if (paymentIntent?.status === 'processing') {
          setPaymentStatus('processing');
          startPaymentTimeout();
        } else if (paymentIntent?.status === 'succeeded') {
          setPaymentStatus('success');
          onSuccess();
        }
      } catch (err) {
        console.error('[StripePaymentFormContent] Error al verificar estado inicial:', err);
        setError('Error al verificar el estado del pago');
        onError(err instanceof Error ? err : new Error('Error desconocido'));
      }
    };

    checkInitialStatus();
  }, [stripe, clientSecret, onSuccess, onError]);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      mounted.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startPaymentTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (mounted.current && statusRef.current === 'processing') {
        console.log('[StripePaymentFormContent] Timeout de pago alcanzado');
        setPaymentStatus('initial');
        setError('El proceso de pago ha excedido el tiempo límite. Por favor, intenta nuevamente.');
        toast({
          title: "Tiempo excedido",
          description: "El proceso tomó demasiado tiempo. Por favor, intenta nuevamente.",
          variant: "destructive",
        });
      }
    }, PAYMENT_TIMEOUT);
  }, [toast]);

  const handlePaymentMethodSubmission = async () => {
    if (!stripe || !elements || !clientSecret) {
      console.error('[StripePaymentFormContent] Faltan dependencias necesarias');
      return;
    }

    setIsSubmitting(true);
    setPaymentStatus('processing');
    setError(null);
    startPaymentTimeout();

    try {
      console.log('[StripePaymentFormContent] Iniciando confirmación del pago');
      
      // 1. Enviar formulario para validación inicial
      const { error: submitError } = await elements.submit();
      if (submitError) {
        console.error('[StripePaymentFormContent] Error en submit:', submitError);
        throw new Error(submitError.message);
      }

      // 2. Confirmar el PaymentIntent
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/booking/confirmation`,
          payment_method_data: {
            billing_details: {
              name: customerName,
              email: customerEmail,
              phone: customerPhone
            }
          }
        }
      });

      console.log('[StripePaymentFormContent] Resultado de confirmación:', {
        error: confirmError?.message,
        status: paymentIntent?.status,
        paymentMethodId: paymentIntent?.payment_method
      });

      // 3. Manejar resultado
      if (confirmError) {
        throw new Error(confirmError.message);
      }

      // 4. Verificar estado final
      if (paymentIntent?.status === 'succeeded') {
        setPaymentStatus('success');
        onSuccess();
      } else if (paymentIntent?.status === 'processing') {
        setPaymentStatus('processing');
        toast({
          title: "Procesando pago",
          description: "Tu pago está siendo procesado. Por favor, espera...",
        });
      } else if (paymentIntent?.status === 'requires_payment_method') {
        setPaymentStatus('initial');
        setError('El método de pago fue rechazado. Por favor, intenta con otro.');
      } else {
        setPaymentStatus('initial');
        setError('Error inesperado. Por favor, intenta nuevamente.');
      }
    } catch (err) {
      console.error('[StripePaymentFormContent] Error en confirmación:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al procesar el pago';
      setError(errorMessage);
      setPaymentStatus('initial');
      setIsSubmitting(false);
      onError(new Error(errorMessage));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Error",
        description: "El sistema de pago no está listo. Por favor, recarga la página.",
        variant: "destructive",
      });
      return;
    }

    if (paymentStatus === 'processing' || isSubmitting) {
      return;
    }

    await handlePaymentMethodSubmission();
  };

  if (paymentStatus === 'success') {
    return (
      <Alert>
        <AlertDescription>
          ¡Pago completado exitosamente! Redirigiendo...
        </AlertDescription>
      </Alert>
    );
  }

  const isProcessing = paymentStatus === 'processing' || isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement 
        options={{
          layout: 'tabs',
          paymentMethodOrder: ['card'],
          defaultValues: {
            billingDetails: {
              name: customerName,
              email: customerEmail,
              phone: customerPhone
            }
          }
        }}
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Procesando pago...
          </span>
        ) : (
          "Pagar"
        )}
      </Button>
    </form>
  );
});

StripePaymentFormContent.displayName = 'StripePaymentFormContent';

export { StripePaymentFormContent };
