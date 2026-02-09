import { useState, useEffect, useRef, memo, useCallback } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import type { PaymentIntent, StripeError } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentFormContentProps {
  clientSecret: string;
  isProcessing: boolean;
  onSuccess: () => void;
  onError: (error: Error) => void;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

type PaymentStatus = "initial" | "processing" | "success" | "error";

type ErrorCategory =
  | "network"
  | "card_declined"
  | "validation"
  | "server"
  | "unknown";

interface PaymentError {
  message: string;
  category: ErrorCategory;
  retryable: boolean;
}

const PAYMENT_TIMEOUT = 60000; // 1 minute

const categorizeStripeError = (error: StripeError | Error): PaymentError => {
  const message = error.message || "";

  if (
    message.includes("network") ||
    message.includes("connection") ||
    message.includes("timeout")
  ) {
    return {
      message,
      category: "network",
      retryable: true,
    };
  }

  if (
    message.includes("card") ||
    message.includes("declined") ||
    message.includes("insufficient")
  ) {
    return {
      message,
      category: "card_declined",
      retryable: true,
    };
  }

  if (message.includes("invalid") || message.includes("incomplete")) {
    return {
      message,
      category: "validation",
      retryable: true,
    };
  }

  if (
    message.includes("server") ||
    message.includes("500") ||
    message.includes("503")
  ) {
    return {
      message,
      category: "server",
      retryable: true,
    };
  }

  return {
    message,
    category: "unknown",
    retryable: true,
  };
};

const StripePaymentFormContent = memo(
  ({
    clientSecret,
    isProcessing: parentIsProcessing,
    onSuccess,
    onError,
    customerName,
    customerEmail,
    customerPhone,
  }: PaymentFormContentProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<PaymentError | null>(null);
    const [paymentStatus, setPaymentStatus] =
      useState<PaymentStatus>("initial");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const mounted = useRef(true);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const statusRef = useRef<PaymentStatus>(paymentStatus);
    const { toast } = useToast();
    const { t } = useLanguage();

    useEffect(() => {
      statusRef.current = paymentStatus;
    }, [paymentStatus]);

    useEffect(() => {
      const checkInitialStatus = async () => {
        if (!stripe || !clientSecret) return;

        try {
          const { paymentIntent } =
            await stripe.retrievePaymentIntent(clientSecret);
          console.log("[StripePaymentFormContent] Initial status:", {
            status: paymentIntent?.status,
            hasPaymentMethod: !!paymentIntent?.payment_method,
            requiresAction: !!paymentIntent?.next_action,
          });

          if (paymentIntent?.status === "requires_payment_method") {
            setPaymentStatus("initial");
          } else if (paymentIntent?.status === "processing") {
            setPaymentStatus("processing");
            startPaymentTimeout();
          } else if (paymentIntent?.status === "succeeded") {
            setPaymentStatus("success");
            onSuccess();
          }
        } catch (err) {
          console.error(
            "[StripePaymentFormContent] Error checking initial status:",
            err,
          );
          const categorizedError = categorizeStripeError(
            err instanceof Error ? err : new Error("Unknown error"),
          );
          setError(categorizedError);
          onError(err instanceof Error ? err : new Error("Unknown error"));
        }
      };

      checkInitialStatus();
    }, [stripe, clientSecret, onSuccess, onError]);

    useEffect(() => {
      return () => {
        mounted.current = false;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const startPaymentTimeout = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (mounted.current && statusRef.current === "processing") {
          console.log("[StripePaymentFormContent] Payment timeout reached");
          setPaymentStatus("initial");
          setError({
            message: t.booking.errors.networkError,
            category: "network",
            retryable: true,
          });
          toast({
            title: t.common.error,
            description: t.booking.errors.networkError,
            variant: "destructive",
          });
        }
      }, PAYMENT_TIMEOUT);
    }, [toast, t]);

    const handlePaymentMethodSubmission = async () => {
      if (!stripe || !elements || !clientSecret) {
        console.error("[StripePaymentFormContent] Missing dependencies");
        return;
      }

      setIsSubmitting(true);
      setPaymentStatus("processing");
      setError(null);
      startPaymentTimeout();

      try {
        console.log("[StripePaymentFormContent] Starting payment confirmation");

        const { error: submitError } = await elements.submit();
        if (submitError) {
          console.error(
            "[StripePaymentFormContent] Submit error:",
            submitError,
          );
          throw new Error(submitError.message);
        }

        const { error: confirmError, paymentIntent } =
          await stripe.confirmPayment({
            elements,
            redirect: "if_required",
            confirmParams: {
              return_url: `${window.location.origin}/booking/confirmation`,
              payment_method_data: {
                billing_details: {
                  name: customerName,
                  email: customerEmail,
                  phone: customerPhone,
                },
              },
            },
          });

        console.log("[StripePaymentFormContent] Confirmation result:", {
          error: confirmError?.message,
          status: paymentIntent?.status,
          paymentMethodId: paymentIntent?.payment_method,
        });

        if (confirmError) {
          const categorizedError = categorizeStripeError(confirmError);
          throw categorizedError;
        }

        if (paymentIntent?.status === "succeeded") {
          setPaymentStatus("success");
          setRetryCount(0);
          onSuccess();
        } else if (paymentIntent?.status === "processing") {
          setPaymentStatus("processing");
          toast({
            title: t.common.processing,
            description: t.booking.payment.processingPayment,
          });
        } else if (paymentIntent?.status === "requires_payment_method") {
          setPaymentStatus("initial");
          setError({
            message: t.booking.errors.generalPaymentError,
            category: "card_declined",
            retryable: true,
          });
        } else {
          setPaymentStatus("initial");
          setError({
            message: t.booking.errors.generalPaymentError,
            category: "unknown",
            retryable: true,
          });
        }
      } catch (err) {
        console.error("[StripePaymentFormContent] Confirmation error:", err);

        let categorizedError: PaymentError;
        if ("message" in err && "category" in err && "retryable" in err) {
          categorizedError = err as PaymentError;
        } else {
          categorizedError = categorizeStripeError(
            err instanceof Error
              ? err
              : new Error(t.booking.errors.generalPaymentError),
          );
        }

        setError(categorizedError);
        setPaymentStatus("initial");
        setIsSubmitting(false);
        setRetryCount((prev) => prev + 1);

        onError(new Error(categorizedError.message));
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!stripe || !elements) {
        toast({
          title: t.common.error,
          description: t.booking.errors.generalPaymentError,
          variant: "destructive",
        });
        return;
      }

      if (paymentStatus === "processing" || isSubmitting) {
        return;
      }

      await handlePaymentMethodSubmission();
    };

    if (paymentStatus === "success") {
      return (
        <Alert>
          <AlertDescription>
            {t.booking.payment.paymentSuccessRedirect}
          </AlertDescription>
        </Alert>
      );
    }

    const isProcessing = paymentStatus === "processing" || isSubmitting;

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentElement
          options={{
            layout: "tabs",
            paymentMethodOrder: ["card"],
            defaultValues: {
              billingDetails: {
                name: customerName,
                email: customerEmail,
                phone: customerPhone,
              },
            },
          }}
        />

        {error && (
          <Alert variant="destructive" className="space-y-3">
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-semibold">
                  {t.booking.payment.paymentError}
                </p>
                <p>{error.message}</p>
                {retryCount > 0 && (
                  <p className="text-sm text-muted-foreground">{retryCount}</p>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3">
          {error && error.retryable && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setError(null);
                setPaymentStatus("initial");
              }}
              disabled={isProcessing}
              className="flex-1"
            >
              {t.booking.payment.fixDetails}
            </Button>
          )}

          <Button
            type="submit"
            disabled={!stripe || isProcessing}
            className={error && error.retryable ? "flex-1" : "w-full"}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {t.booking.payment.processingPayment}
              </span>
            ) : error && error.retryable ? (
              t.booking.payment.retryPayment
            ) : (
              t.booking.payment.pay
            )}
          </Button>
        </div>
      </form>
    );
  },
);

StripePaymentFormContent.displayName = "StripePaymentFormContent";

export { StripePaymentFormContent };
