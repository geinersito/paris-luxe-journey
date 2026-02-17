import { vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Payment } from "@/components/booking/Payment";
import { useBooking } from "@/contexts/BookingContext";
import { useStripe, useElements } from "@stripe/react-stripe-js";

const renderPayment = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

// Mocks
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: vi.fn(() => ({
    t: {
      common: { error: "Error", processing: "Processing" },
      booking: {
        errors: {
          acceptTerms: "Please accept terms",
          generalPaymentError: "Payment error",
        },
        payment: {
          title: "Payment",
          cardDetails: "Enter card details",
        },
        submit: "Pay",
      },
    },
    language: "en",
    setLanguage: vi.fn(),
  })),
}));

vi.mock("@stripe/react-stripe-js", () => ({
  useStripe: vi.fn(),
  useElements: vi.fn(),
  PaymentElement: () => <div data-testid="payment-element" />,
}));

vi.mock("@/contexts/BookingContext", () => ({
  useBooking: vi.fn(),
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Payment Component", () => {
  const mockStripe = {
    confirmPayment: vi.fn(),
  };

  const mockElements = {};

  const mockBookingContext = {
    bookingData: {
      pickup: "Paris",
      dropoff: "CDG Airport",
      passengers: 2,
      tripType: "one-way",
      largeLuggageCount: 1,
      smallLuggageCount: 1,
    },
    estimatedPrice: 105,
    validatePriceWithBackend: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useStripe as ReturnType<typeof vi.fn>).mockReturnValue(mockStripe);
    (useElements as ReturnType<typeof vi.fn>).mockReturnValue(mockElements);
    (useBooking as ReturnType<typeof vi.fn>).mockReturnValue(
      mockBookingContext,
    );
  });

  test("should render payment form correctly", () => {
    renderPayment(
      <Payment
        clientSecret="test_secret"
        bookingId="test_booking"
        paymentIntentId="test_intent"
        onInitializePayment={vi.fn()}
        estimatedPrice={105}
        bookingData={{ pickup: "Paris", dropoff: "CDG", passengers: 2 }}
      />,
    );

    expect(screen.getByText("Payment")).toBeInTheDocument();
    expect(screen.getByText("Enter card details")).toBeInTheDocument();
    expect(
      screen.getByText("I accept the terms and conditions"),
    ).toBeInTheDocument();
    expect(screen.getByText("Pay (€105)")).toBeInTheDocument();
  });

  test("should call stripe.confirmPayment when terms accepted", async () => {
    mockStripe.confirmPayment.mockResolvedValue({ error: null });

    renderPayment(
      <Payment
        clientSecret="test_secret"
        bookingId="test_booking"
        paymentIntentId="test_intent"
        onInitializePayment={vi.fn()}
        estimatedPrice={105}
        bookingData={{ pickup: "Paris", dropoff: "CDG", passengers: 2 }}
      />,
    );

    fireEvent.click(screen.getByText("I accept the terms and conditions"));
    fireEvent.click(screen.getByText("Pay (€105)"));

    await waitFor(() => {
      expect(mockStripe.confirmPayment).toHaveBeenCalledWith({
        elements: mockElements,
        confirmParams: {
          return_url: expect.stringContaining("booking_id=test_booking"),
        },
      });
    });
  });

  test("should not call confirmPayment without terms accepted", async () => {
    renderPayment(
      <Payment
        clientSecret="test_secret"
        bookingId="test_booking"
        paymentIntentId="test_intent"
        onInitializePayment={vi.fn()}
        estimatedPrice={105}
        bookingData={{ pickup: "Paris", dropoff: "CDG", passengers: 2 }}
      />,
    );

    // Submit without accepting terms
    fireEvent.click(screen.getByText("Pay (€105)"));

    // Payment should not be attempted
    expect(mockStripe.confirmPayment).not.toHaveBeenCalled();
  });

  test("should handle stripe payment errors gracefully", async () => {
    mockStripe.confirmPayment.mockResolvedValue({
      error: { message: "Card declined" },
    });

    const { getByText } = renderPayment(
      <Payment
        clientSecret="test_secret"
        bookingId="test_booking"
        paymentIntentId="test_intent"
        onInitializePayment={vi.fn()}
        estimatedPrice={105}
        bookingData={{ pickup: "Paris", dropoff: "CDG", passengers: 2 }}
      />,
    );

    fireEvent.click(getByText("I accept the terms and conditions"));
    fireEvent.click(getByText("Pay (€105)"));

    await waitFor(() => {
      expect(mockStripe.confirmPayment).toHaveBeenCalled();
    });
  });

  test("should show loading state during price validation", async () => {
    // Simular validación que toma tiempo
    let resolveValidation: (value: boolean) => void;
    const validationPromise = new Promise<boolean>((resolve) => {
      resolveValidation = resolve;
    });

    mockBookingContext.validatePriceWithBackend.mockReturnValue(
      validationPromise,
    );

    renderPayment(
      <Payment
        clientSecret="test_secret"
        bookingId="test_booking"
        paymentIntentId="test_intent"
        onInitializePayment={vi.fn()}
        estimatedPrice={105}
        bookingData={{ pickup: "Paris", dropoff: "CDG", passengers: 2 }}
      />,
    );

    // Aceptar términos
    fireEvent.click(screen.getByText("I accept the terms and conditions"));

    // Enviar formulario
    fireEvent.click(screen.getByText("Pay (€105)"));

    // Verificar que aparece el indicador de validación
    await waitFor(() => {
      expect(screen.getByText("Processing")).toBeInTheDocument();
    });

    // Resolver la validación
    resolveValidation!(true);

    // Verificar que se procesa el pago después de la validación
    await waitFor(() => {
      expect(mockStripe.confirmPayment).toHaveBeenCalled();
    });
  });

  test("should not allow submission without accepting terms", async () => {
    renderPayment(
      <Payment
        clientSecret="test_secret"
        bookingId="test_booking"
        paymentIntentId="test_intent"
        onInitializePayment={vi.fn()}
        estimatedPrice={105}
        bookingData={{ pickup: "Paris", dropoff: "CDG", passengers: 2 }}
      />,
    );

    // Intentar enviar sin aceptar términos
    fireEvent.click(screen.getByText("Pay (€105)"));

    // Verificar que no se valida el precio
    expect(mockBookingContext.validatePriceWithBackend).not.toHaveBeenCalled();

    // Verificar que no se procesa el pago
    expect(mockStripe.confirmPayment).not.toHaveBeenCalled();
  });
});
