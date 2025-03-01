
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { StripePaymentForm } from "@/components/booking/StripePaymentForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

const TestPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleInitiatePayment = async () => {
    try {
      setIsProcessing(true);
      setClientSecret(null);
      console.log('Creating test payment intent...');

      const { data: paymentIntent, error: paymentIntentError } = await supabase.functions.invoke('test-payment');

      if (paymentIntentError) {
        console.error('Payment intent creation error:', paymentIntentError);
        throw paymentIntentError;
      }

      if (!paymentIntent?.clientSecret) {
        throw new Error('No se recibió el client secret del payment intent');
      }

      console.log('Payment intent created successfully');
      setClientSecret(paymentIntent.clientSecret);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error en el pago",
        description: error instanceof Error ? error.message : "Hubo un error procesando el pago. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = () => {
    console.log('Payment successful!');
    setIsProcessing(false);
    setClientSecret(null);
    toast({
      title: "¡Pago exitoso!",
      description: "El pago de prueba de 1€ se ha procesado correctamente.",
    });
    navigate("/");
  };

  const handlePaymentError = (error: Error) => {
    console.error('Payment error:', error);
    setIsProcessing(false);
    setClientSecret(null);
    toast({
      title: "Error en el pago",
      description: error.message || "Hubo un error procesando el pago. Por favor, intenta de nuevo.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8">
        <h1 className="text-3xl font-display text-primary mb-6">Pago de Prueba - 1€</h1>
        
        <Card className="p-6">
          {!clientSecret ? (
            <div className="space-y-4">
              <h3 className="font-semibold mb-4">Iniciar Pago de Prueba</h3>
              <Button 
                onClick={handleInitiatePayment} 
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? "Procesando..." : "Iniciar Pago"}
              </Button>
            </div>
          ) : (
            <>
              <h3 className="font-semibold mb-4">Introduce los datos de tu tarjeta</h3>
              <StripePaymentForm
                clientSecret={clientSecret}
                isProcessing={isProcessing}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TestPayment;
