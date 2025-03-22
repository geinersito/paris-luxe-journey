import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Payment } from '@/components/booking/Payment';
import { useBooking } from '@/contexts/BookingContext';
import { useStripe, useElements } from '@stripe/react-stripe-js';

// Mocks
jest.mock('@stripe/react-stripe-js', () => ({
  useStripe: jest.fn(),
  useElements: jest.fn()
}));

jest.mock('@/contexts/BookingContext', () => ({
  useBooking: jest.fn()
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

jest.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: {
      common: { error: 'Error', processing: 'Processing' },
      booking: { 
        errors: { 
          acceptTerms: 'Please accept terms',
          generalPaymentError: 'Payment error'
        },
        payment: {
          title: 'Payment',
          cardDetails: 'Enter card details'
        },
        submit: 'Pay'
      }
    }
  })
}));

describe('Payment Component', () => {
  const mockStripe = {
    confirmPayment: jest.fn()
  };
  
  const mockElements = {};
  
  const mockBookingContext = {
    bookingData: {
      pickup: 'Paris',
      dropoff: 'CDG Airport',
      passengers: 2,
      tripType: 'one-way',
      largeLuggageCount: 1,
      smallLuggageCount: 1
    },
    estimatedPrice: 105,
    validatePriceWithBackend: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useStripe as jest.Mock).mockReturnValue(mockStripe);
    (useElements as jest.Mock).mockReturnValue(mockElements);
    (useBooking as jest.Mock).mockReturnValue(mockBookingContext);
  });

  test('should render payment form correctly', () => {
    render(
      <Payment 
        clientSecret="test_secret"
        bookingId="test_booking"
        paymentIntentId="test_intent"
        onInitializePayment={jest.fn()}
      />
    );

    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('Enter card details')).toBeInTheDocument();
    expect(screen.getByText('I accept the terms and conditions')).toBeInTheDocument();
    expect(screen.getByText('Pay (€105)')).toBeInTheDocument();
  });

  test('should validate price before processing payment', async () => {
    // Mock de validación exitosa
    mockBookingContext.validatePriceWithBackend.mockResolvedValue(true);
    mockStripe.confirmPayment.mockResolvedValue({ error: null });

    render(
      <Payment 
        clientSecret="test_secret"
        bookingId="test_booking"
        paymentIntentId="test_intent"
        onInitializePayment={jest.fn()}
      />
    );

    // Aceptar términos
    fireEvent.click(screen.getByText('I accept the terms and conditions'));
    
    // Enviar formulario
    fireEvent.click(screen.getByText('Pay (€105)'));

    // Verificar que se valida el precio
    await waitFor(() => {
      expect(mockBookingContext.validatePriceWithBackend).toHaveBeenCalled();
    });

    // Verificar que se procesa el pago
    await waitFor(() => {
      expect(mockStripe.confirmPayment).toHaveBeenCalledWith({
        elements: mockElements,
        confirmParams: {
          return_url: expect.stringContaining('booking_id=test_booking')
        }
      });
    });
  });

  test('should not proceed if price validation fails', async () => {
    // Mock de validación fallida
    mockBookingContext.validatePriceWithBackend.mockResolvedValue(false);

    render(
      <Payment 
        clientSecret="test_secret"
        bookingId="test_booking"
        paymentIntentId="test_intent"
        onInitializePayment={jest.fn()}
      />
    );

    // Aceptar términos
    fireEvent.click(screen.getByText('I accept the terms and conditions'));
    
    // Enviar formulario
    fireEvent.click(screen.getByText('Pay (€105)'));

    // Verificar que se valida el precio
    await waitFor(() => {
      expect(mockBookingContext.validatePriceWithBackend).toHaveBeenCalled();
    });

    // Verificar que NO se procesa el pago
    await waitFor(() => {
      expect(mockStripe.confirmPayment).not.toHaveBeenCalled();
    });
  });

  test('should handle payment errors gracefully', async () => {
    // Mock de validación exitosa pero error en el pago
    mockBookingContext.validatePriceWithBackend.mockResolvedValue(true);
    mockStripe.confirmPayment.mockResolvedValue({ 
      error: { message: 'Card declined' } 
    });

    const { getByText } = render(
      <Payment 
        clientSecret="test_secret"
        bookingId="test_booking"
        paymentIntentId="test_intent"
        onInitializePayment={jest.fn()}
      />
    );

    // Aceptar términos
    fireEvent.click(getByText('I accept the terms and conditions'));
    
    // Enviar formulario
    fireEvent.click(getByText('Pay (€105)'));

    // Verificar que se valida el precio
    await waitFor(() => {
      expect(mockBookingContext.validatePriceWithBackend).toHaveBeenCalled();
    });

    // Verificar que se intenta procesar el pago
    await waitFor(() => {
      expect(mockStripe.confirmPayment).toHaveBeenCalled();
    });
  });

  test('should show loading state during price validation', async () => {
    // Simular validación que toma tiempo
    let resolveValidation: (value: boolean) => void;
    const validationPromise = new Promise<boolean>(resolve => {
      resolveValidation = resolve;
    });
    
    mockBookingContext.validatePriceWithBackend.mockReturnValue(validationPromise);

    render(
      <Payment 
        clientSecret="test_secret"
        bookingId="test_booking"
        paymentIntentId="test_intent"
        onInitializePayment={jest.fn()}
      />
    );

    // Aceptar términos
    fireEvent.click(screen.getByText('I accept the terms and conditions'));
    
    // Enviar formulario
    fireEvent.click(screen.getByText('Pay (€105)'));

    // Verificar que aparece el indicador de validación
    await waitFor(() => {
      expect(screen.getByText('Processing')).toBeInTheDocument();
    });

    // Resolver la validación
    resolveValidation!(true);
    
    // Verificar que se procesa el pago después de la validación
    await waitFor(() => {
      expect(mockStripe.confirmPayment).toHaveBeenCalled();
    });
  });

  test('should not allow submission without accepting terms', async () => {
    const mockToast = jest.fn();
    jest.mock('@/hooks/use-toast', () => ({
      useToast: () => ({
        toast: mockToast
      })
    }));

    render(
      <Payment 
        clientSecret="test_secret"
        bookingId="test_booking"
        paymentIntentId="test_intent"
        onInitializePayment={jest.fn()}
      />
    );
    
    // Intentar enviar sin aceptar términos
    fireEvent.click(screen.getByText('Pay (€105)'));

    // Verificar que no se valida el precio
    expect(mockBookingContext.validatePriceWithBackend).not.toHaveBeenCalled();
    
    // Verificar que no se procesa el pago
    expect(mockStripe.confirmPayment).not.toHaveBeenCalled();
  });
});