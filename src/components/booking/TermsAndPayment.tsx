import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Lock } from "lucide-react";

interface TermsAndPaymentProps {
  acceptedTerms: boolean;
  setAcceptedTerms: (accepted: boolean) => void;
  isProcessing: boolean;
  isLocationsLoading?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const TermsAndPayment = ({
  acceptedTerms,
  setAcceptedTerms,
  isProcessing,
  isLocationsLoading = false,
  onSubmit,
  onBack,
}: TermsAndPaymentProps) => {
  const { t } = useLanguage();

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" />
          <h3 className="font-semibold">{t.booking.payment.paymentDetails}</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {t.booking.payment.secureCardIntro}
        </p>

        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm">
            {t.booking.payment.acceptTerms}
          </Label>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isProcessing}
        >
          {t.common.back}
        </Button>
        <Button
          type="submit"
          disabled={!acceptedTerms || isProcessing || isLocationsLoading}
          className="silk-button gap-2"
        >
          {isProcessing
            ? t.common.processing
            : isLocationsLoading
              ? t.booking.payment.loadingLocations
              : t.booking.payment.confirmAndPay}
          {!isProcessing && !isLocationsLoading && (
            <ArrowRight className="w-4 h-4" />
          )}
        </Button>
      </div>
    </form>
  );
};

export { TermsAndPayment };
