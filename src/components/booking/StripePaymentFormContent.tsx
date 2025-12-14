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

type ErrorCategory = 'network' | 'card_declined' | 'validation' | 'server' | 'unknown';

interface PaymentError {
  message: string;
  category: ErrorCategory;
  retryable: boolean;
}

const PAYMENT_TIMEOUT = 60000; // 1 minuto

// Categorizar errores de Stripe
const categorizeStripeError = (error: StripeError | Error): PaymentError => {
  const message = error.message || 'Error desconocido';

  // Errores de red
  if (message.includes('network') || message.includes('connection') || message.includes('timeout')) {
    return {
      message: 'Error de conexión. Por favor, verifica tu internet e intenta nuevamente.',
      category: 'network',
      retryable: true
    };
  }

  // Errores de tarjeta
  if (message.includes('card') || message.includes('declined') || message.includes('insufficient')) {
    return {
      message: 'Tu tarjeta fue rechazada. Por favor, verifica los datos o usa otra tarjeta.',
      category: 'card_declined',
      retryable: true
    };
  }

  // Errores de validación
  if (message.includes('invalid') || message.includes('incomplete')) {
    return {
      message: 'Datos de pago incompletos o inválidos. Por favor, revisa la información.',
      category: 'validation',
      retryable: true
    };
  }

  // Errores del servidor
  if (message.includes('server') || message.includes('500') || message.includes('503')) {
    return {
      message: 'Error del servidor. Por favor, intenta nuevamente en unos momentos.',
      category: 'server',
      retryable: true
    };
  }

  // Error desconocido
  return {
    message: message,
    category: 'unknown',
    retryable: true
  };
};

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
  const [error, setError] = useState<PaymentError | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('initial');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
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
        const categorizedError = categorizeStripeError(err instanceof Error ? err : new Error('Error desconocido'));
        setError(categorizedError);
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
        setError({
          message: 'El proceso de pago ha excedido el tiempo límite. Por favor, intenta nuevamente.',
          category: 'network',
          retryable: true
        });
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
        const categorizedError = categorizeStripeError(confirmError);
        throw categorizedError;
      }

      // 4. Verificar estado final
      if (paymentIntent?.status === 'succeeded') {
        setPaymentStatus('success');
        setRetryCount(0); // Reset retry count on success
        onSuccess();
      } else if (paymentIntent?.status === 'processing') {
        setPaymentStatus('processing');
        toast({
          title: "Procesando pago",
          description: "Tu pago está siendo procesado. Por favor, espera...",
        });
      } else if (paymentIntent?.status === 'requires_payment_method') {
        setPaymentStatus('initial');
        setError({
          message: 'El método de pago fue rechazado. Por favor, intenta con otro.',
          category: 'card_declined',
          retryable: true
        });
      } else {
        setPaymentStatus('initial');
        setError({
          message: 'Error inesperado. Por favor, intenta nuevamente.',
          category: 'unknown',
          retryable: true
        });
      }
    } catch (err) {
      console.error('[StripePaymentFormContent] Error en confirmación:', err);

      // Categorizar el error
      let categorizedError: PaymentError;
      if ('message' in err && 'category' in err && 'retryable' in err) {
        categorizedError = err as PaymentError;
      } else {
        categorizedError = categorizeStripeError(err instanceof Error ? err : new Error('Error al procesar el pago'));
      }

      setError(categorizedError);
      setPaymentStatus('initial');
      setIsSubmitting(false);
      setRetryCount(prev => prev + 1);

      onError(new Error(categorizedError.message));
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
        <Alert variant="destructive" className="space-y-3">
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">
                {error.category === 'network' && '🌐 Error de conexión'}
                {error.category === 'card_declined' && '💳 Tarjeta rechazada'}
                {error.category === 'validation' && '⚠️ Datos inválidos'}
                {error.category === 'server' && '🔧 Error del servidor'}
                {error.category === 'unknown' && '❌ Error'}
              </p>
              <p>{error.message}</p>
              {retryCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  Intentos: {retryCount}
                </p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3">
        {error && error.retryable && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setError(null);
              setPaymentStatus('initial');
            }}
            disabled={isProcessing}
            className="flex-1"
          >
            Corregir datos
          </Button>
        )}

        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className={error && error.retryable ? "flex-1" : "w-full"}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Procesando pago...
            </span>
          ) : error && error.retryable ? (
            "Reintentar pago"
          ) : (
            "Pagar"
          )}
        </Button>
      </div>
    </form>
  );
});

StripePaymentFormContent.displayName = 'StripePaymentFormContent';

export { StripePaymentFormContent };
