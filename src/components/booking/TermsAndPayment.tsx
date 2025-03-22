
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface TermsAndPaymentProps {
  acceptedTerms: boolean;
  setAcceptedTerms: (accepted: boolean) => void;
  isProcessing: boolean;
  isLocationsLoading?: boolean; // Añadir prop para indicar si las ubicaciones se están cargando
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const TermsAndPayment = ({
  acceptedTerms,
  setAcceptedTerms,
  isProcessing,
  isLocationsLoading = false, // Valor por defecto para compatibilidad con código existente
  onSubmit,
  onBack
}: TermsAndPaymentProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Detalles del Pago</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Al continuar, podrás introducir los datos de tu tarjeta de forma segura.
          </p>
        </Card>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="terms" 
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm">
            Acepto los términos y condiciones del servicio
          </Label>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Volver
        </Button>
        <Button type="submit" disabled={!acceptedTerms || isProcessing || isLocationsLoading}>
          {isProcessing 
            ? "Procesando..." 
            : isLocationsLoading 
              ? "Cargando ubicaciones..." 
              : "Continuar"}
        </Button>
      </div>
    </form>
  );
};

export { TermsAndPayment };
