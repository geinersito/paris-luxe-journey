import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RequireBookingData } from '@/components/RequireBookingData';
import { BookingProvider } from '@/contexts/BookingContext';
import { useBooking } from '@/contexts/BookingContext';
import { useToast } from '@/hooks/use-toast';

// Mock de los hooks
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn()
}));

jest.mock('@/contexts/BookingContext', () => {
  const originalModule = jest.requireActual('@/contexts/BookingContext');
  return {
    ...originalModule,
    useBooking: jest.fn()
  };
});

jest.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: {
      common: { error: 'Error' },
      booking: { errors: { selectLocations: 'Please select locations', priceExpired: 'Price has expired' } }
    }
  })
}));

describe('RequireBookingData', () => {
  const mockToast = jest.fn();
  
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  test('should render children when booking data exists', () => {
    // Mock de datos de reserva válidos
    (useBooking as jest.Mock).mockReturnValue({
      bookingData: { pickup: 'Paris', dropoff: 'CDG' },
      priceTimestamp: Date.now()
    });

    render(
      <MemoryRouter initialEntries={['/booking/details']}>
        <BookingProvider>
          <RequireBookingData>
            <div data-testid="protected-content">Protected Content</div>
          </RequireBookingData>
        </BookingProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(mockToast).not.toHaveBeenCalled();
  });

  test('should redirect when booking data is missing', () => {
    // Mock de datos de reserva nulos
    (useBooking as jest.Mock).mockReturnValue({
      bookingData: null,
      priceTimestamp: null
    });

    render(
      <MemoryRouter initialEntries={['/booking/details']}>
        <Routes>
          <Route path="/booking/details" element={
            <RequireBookingData>
              <div data-testid="protected-content">Protected Content</div>
            </RequireBookingData>
          } />
          <Route path="/booking" element={<div data-testid="booking-page">Booking Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('booking-page')).toBeInTheDocument();
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Please select locations',
      variant: 'destructive'
    });
  });

  test('should redirect when price is stale', () => {
    // Mock de datos con precio caducado (más de 30 minutos)
    const staleTimestamp = Date.now() - (31 * 60 * 1000);
    
    (useBooking as jest.Mock).mockReturnValue({
      bookingData: { pickup: 'Paris', dropoff: 'CDG' },
      priceTimestamp: staleTimestamp
    });

    render(
      <MemoryRouter initialEntries={['/booking/details']}>
        <Routes>
          <Route path="/booking/details" element={
            <RequireBookingData>
              <div data-testid="protected-content">Protected Content</div>
            </RequireBookingData>
          } />
          <Route path="/booking" element={<div data-testid="booking-page">Booking Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('booking-page')).toBeInTheDocument();
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Price has expired',
      variant: 'warning'
    });
  });
});