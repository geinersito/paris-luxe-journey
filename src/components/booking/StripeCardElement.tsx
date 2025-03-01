
import { CardElement } from "@stripe/react-stripe-js";
import { memo } from "react";

const StripeCardElement = memo(() => {
  return (
    <div className="p-4 border rounded-md bg-white">
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
          hidePostalCode: true,
        }}
      />
    </div>
  );
});

StripeCardElement.displayName = 'StripeCardElement';

export { StripeCardElement };
