
import { CardElement } from "@stripe/react-stripe-js";
import { Label } from "../ui/label";
import { memo } from "react";

const StripeCardInput = memo(() => {
  return (
    <div className="space-y-2">
      <Label htmlFor="payment-card-element">Datos de la tarjeta</Label>
      <div 
        id="payment-card-element"
        className="p-3 border rounded-md bg-white" 
        role="group" 
        aria-label="Datos de la tarjeta"
      >
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
            hidePostalCode: true
          }}
        />
      </div>
    </div>
  );
});

StripeCardInput.displayName = 'StripeCardInput';

export { StripeCardInput };

