import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";

interface PaymentProps {
  clientSecret: string;
  bookingId: string;
  paymentIntentId: string;
  estimatedPrice: number;
  bookingData: any;
  onInitializePayment?: (normalizedPrice: number) => void;
}

export const Payment = ({ 
  clientSecret, 
  bookingId, 
  paymentIntentId, 
  estimatedPrice, 
  bookingData,
  onInitializePayment 
}: PaymentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [normalizedPrice, setNormalizedPrice] = useState(0);

  useEffect(() => {
    // Ensure price is a number and round it to avoid decimal issues
    const roundedPrice = Math.round(Number(estimatedPrice));
    setNormalizedPrice(roundedPrice);

    // Call the onInitializePayment callback with the normalized price
    // This ensures the parent component has the correct price
    if (onInitializePayment) {
      onInitializePayment(roundedPrice);
    }
  }, [estimatedPrice, bookingData, onInitializePayment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!termsAccepted) {
      toast({
        title: t.common.error,
        description: t.booking.errors.acceptTerms,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking/success?booking_id=${bookingId}&payment_intent=${paymentIntentId}&price=${normalizedPrice}`,
        },
      });

      if (error) {
        toast({
          title: t.common.error,
          description: error.message || t.booking.errors.generalPaymentError,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t.common.error,
        description: t.booking.errors.generalPaymentError,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t.booking.payment.title}</h2>
        <p className="text-sm text-muted-foreground">{t.booking.payment.cardDetails}</p>
        
        <PaymentElement />
        
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox 
            id="terms" 
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm">
            I accept the terms and conditions
          </Label>
        </div>
      </div>
      
      <Button 
        type="submit" 
        disabled={isProcessing || !stripe || !elements} 
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t.common.processing}
          </>
        ) : (
          `${t.booking.submit} (€${normalizedPrice})`
        )}
      </Button>
    </form>
  );
};
