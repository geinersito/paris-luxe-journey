/**
 * COMPONENT: BookingFlowV312
 * 
 * Flujo completo de booking integrado con V3.1.2
 * 
 * PASOS:
 * 1. Selección de ruta y vehículo
 * 2. Fetch de pricing desde API
 * 3. Selección de modo de pago
 * 4. Confirmación y pago
 */

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { usePricingV312, type RouteKey, type VehicleType } from '@/hooks/booking/usePricingV312';
import { usePaymentV312 } from '@/hooks/booking/usePaymentV312';
import { PaymentModeSelector, type PaymentMode } from './PaymentModeSelector';
import { StripePaymentForm } from './StripePaymentForm';
import { useToast } from '@/hooks/use-toast';

interface BookingFlowV312Props {
  routeKey: RouteKey;
  vehicleType: VehicleType;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const BookingFlowV312 = ({
  routeKey,
  vehicleType,
  bookingId,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onError,
}: BookingFlowV312Props) => {
  const { toast } = useToast();
  
  // Pricing
  const { pricing, isLoading: isPricingLoading, fetchPricing } = usePricingV312();
  
  // Payment
  const {
    isProcessing: isPaymentProcessing,
    createPrepaidPayment,
    createFlexibleSetup,
  } = usePaymentV312();

  // State
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('prepaid');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [step, setStep] = useState<'pricing' | 'payment_selection' | 'payment_confirm'>('pricing');

  /**
   * STEP 1: Fetch pricing
   */
  useEffect(() => {
    fetchPricing(routeKey, vehicleType);
  }, [routeKey, vehicleType, fetchPricing]);

  /**
   * STEP 2: Cuando tenemos pricing, mostrar selección de modo
   */
  useEffect(() => {
    if (pricing && step === 'pricing') {
      setStep('payment_selection');
      
      // Auto-seleccionar modo disponible
      if (!pricing.payment_modes_enabled.prepaid && pricing.payment_modes_enabled.flexible) {
        setPaymentMode('flexible');
      }
    }
  }, [pricing, step]);

  /**
   * STEP 3: Iniciar pago
   */
  const handleInitiatePayment = async () => {
    if (!pricing) {
      toast({
        title: 'Error',
        description: 'No se pudo obtener el precio',
        variant: 'destructive',
      });
      return;
    }

    const metadata = {
      booking_id: bookingId,
      route_key: routeKey,
      vehicle_type: vehicleType,
      pricing_version: 'v3.1.2' as const,
      payment_mode: paymentMode,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
    };

    try {
      if (paymentMode === 'prepaid') {
        // Crear PaymentIntent
        const amountCents = Math.round(pricing.prepaid_price * 100);
        const result = await createPrepaidPayment(amountCents, metadata);
        
        if (result) {
          setClientSecret(result.client_secret);
          setStep('payment_confirm');
        }
      } else {
        // Crear SetupIntent
        const result = await createFlexibleSetup(metadata);
        
        if (result) {
          setClientSecret(result.client_secret);
          setStep('payment_confirm');
        }
      }
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Unknown error'));
    }
  };

  /**
   * STEP 4: Pago exitoso
   */
  const handlePaymentSuccess = () => {
    toast({
      title: '¡Pago exitoso!',
      description: paymentMode === 'prepaid' 
        ? 'Tu reserva ha sido confirmada'
        : 'Tu método de pago ha sido guardado',
    });
    onSuccess();
  };

  /**
   * STEP 4: Error en pago
   */
  const handlePaymentError = (error: Error) => {
    toast({
      title: 'Error en el pago',
      description: error.message,
      variant: 'destructive',
    });
    onError(error);
  };

  // LOADING STATE
  if (isPricingLoading || step === 'pricing') {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Calculando precio...</p>
        </div>
      </Card>
    );
  }

  // ERROR STATE
  if (!pricing) {
    return (
      <Card className="p-8">
        <div className="text-center space-y-4">
          <p className="text-destructive">Error al obtener el precio</p>
          <Button onClick={() => fetchPricing(routeKey, vehicleType)}>
            Reintentar
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* PAYMENT MODE SELECTION */}
      {step === 'payment_selection' && (
        <>
          <PaymentModeSelector
            pricing={pricing}
            selectedMode={paymentMode}
            onModeChange={setPaymentMode}
            disabled={isPaymentProcessing}
          />

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => window.history.back()}>
              Volver
            </Button>
            <Button
              onClick={handleInitiatePayment}
              disabled={isPaymentProcessing}
            >
              {isPaymentProcessing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Continuar al pago
            </Button>
          </div>
        </>
      )}

      {/* PAYMENT CONFIRMATION */}
      {step === 'payment_confirm' && clientSecret && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">
            {paymentMode === 'prepaid' ? 'Pagar ahora' : 'Guardar método de pago'}
          </h3>
          <StripePaymentForm
            clientSecret={clientSecret}
            isProcessing={isPaymentProcessing}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            customerName={customerName}
            customerEmail={customerEmail}
            customerPhone={customerPhone}
          />
        </Card>
      )}
    </div>
  );
};

