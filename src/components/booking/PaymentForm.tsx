
import { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { StripeCardInput } from "./StripeCardInput";

interface FormProps {
  onSubmit: (cardholderName: string) => Promise<void>;
  isProcessing: boolean;
  error?: string | null;
}

export const PaymentForm = ({ onSubmit, isProcessing, error }: FormProps) => {
  const [cardholderName, setCardholderName] = useState("");
  const [localIsProcessing, setLocalIsProcessing] = useState(false);
  const mounted = useRef(true);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isProcessing && mounted.current) {
      setLocalIsProcessing(false);
    }
  }, [isProcessing]);

  const getButtonText = () => {
    if (localIsProcessing && isProcessing) return "Procesando pago...";
    if (isProcessing) return "Finalizando...";
    if (localIsProcessing) return "Enviando datos...";
    return "Pagar";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isProcessing || localIsProcessing || !cardholderName.trim()) {
      return;
    }

    setLocalIsProcessing(true);
    
    try {
      await onSubmit(cardholderName.trim());
    } catch (error) {
      console.error('Error en el proceso de pago:', error);
    } finally {
      if (mounted.current) {
        setLocalIsProcessing(false);
      }
    }
  };

  const isButtonDisabled = isProcessing || localIsProcessing || !cardholderName.trim();

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-label="Formulario de pago"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="payment-cardholder-name">
            Nombre del titular
          </Label>
          <Input
            id="payment-cardholder-name"
            name="cardholderName"
            type="text"
            autoComplete="cc-name"
            required
            placeholder="Como aparece en la tarjeta"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            disabled={isButtonDisabled}
            className="w-full"
            aria-invalid={error ? "true" : "false"}
          />
        </div>

        <StripeCardInput />

        {error && (
          <div 
            className="text-sm text-red-600" 
            role="alert" 
            aria-live="polite"
          >
            {error}
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isButtonDisabled}
        className="w-full"
        aria-busy={isButtonDisabled}
      >
        {isButtonDisabled ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            {getButtonText()}
          </span>
        ) : (
          "Pagar"
        )}
      </Button>
    </form>
  );
};
