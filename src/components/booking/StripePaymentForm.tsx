
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect, memo } from "react";
import { useToast } from "@/hooks/use-toast";
import { getStripe } from "@/utils/stripe";
import { StripePaymentFormContent } from "./StripePaymentFormContent";
import Loader from "@/components/Loader";
import { useLanguage } from "@/contexts/LanguageContext";

interface PaymentFormProps {
  clientSecret: string;
  isProcessing: boolean;
  onSuccess: () => void;
  onError: (error: Error) => void;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

const StripePaymentForm = memo(({ 
  clientSecret, 
  isProcessing, 
  onSuccess, 
  onError,
  customerName,
  customerEmail,
  customerPhone
}: PaymentFormProps) => {
  const [stripePromise] = useState(() => getStripe());
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    console.log('[StripePaymentForm] Inicialización:', {
      hasStripePromise: !!stripePromise,
      hasClientSecret: !!clientSecret,
      clientSecretLength: clientSecret?.length,
      isProcessing
    });
  }, [stripePromise, clientSecret, isProcessing]);

  if (!stripePromise) {
    console.error('[StripePaymentForm] No se pudo inicializar Stripe');
    toast({
      title: t.common.error,
      description: "No se pudo inicializar el procesador de pagos. Por favor, contacta a soporte.",
      variant: "destructive",
    });
    return <Loader />;
  }

  return (
    <Elements 
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#0F172A',
            colorBackground: '#ffffff',
            colorText: '#1e293b',
            colorDanger: '#ef4444',
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          },
        },
        loader: 'auto',
      }}
    >
      <StripePaymentFormContent 
        clientSecret={clientSecret}
        isProcessing={isProcessing}
        onSuccess={onSuccess}
        onError={onError}
        customerName={customerName}
        customerEmail={customerEmail}
        customerPhone={customerPhone}
      />
    </Elements>
  );
});

StripePaymentForm.displayName = 'StripePaymentForm';

export { StripePaymentForm };
