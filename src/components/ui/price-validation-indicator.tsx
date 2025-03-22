import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceValidationIndicatorProps {
  isValidating: boolean;
}

export const PriceValidationIndicator = ({ isValidating }: PriceValidationIndicatorProps) => {
  const { t } = useLanguage();
  
  if (!isValidating) return null;
  
  return (
    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground bg-muted p-2 rounded-md animate-pulse">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{t.booking.validatingPrice}</span>
    </div>
  );
};