
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { memo } from "react";

interface PaymentButtonProps {
  isDisabled: boolean;
}

const PaymentButton = memo(({ isDisabled }: PaymentButtonProps) => {
  return (
    <Button 
      type="submit" 
      disabled={isDisabled}
      className="w-full"
      aria-busy={isDisabled}
    >
      {isDisabled ? (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Procesando...
        </span>
      ) : (
        "Pagar"
      )}
    </Button>
  );
});

PaymentButton.displayName = 'PaymentButton';

export { PaymentButton };

