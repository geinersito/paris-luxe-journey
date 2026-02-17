import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { RequireBookingData } from "@/components/RequireBookingData";
import { BookingProvider } from "@/contexts/BookingContext";
import { useBooking } from "@/contexts/BookingContext";
import { useToast } from "@/hooks/use-toast";

// Mock LanguageContext FIRST (before BookingContext imports it)
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: vi.fn(() => ({
    t: {
      common: { error: "Error", warning: "Warning" },
      booking: {
        errors: {
          selectLocations: "Please select locations",
          priceStale: "Price has expired",
          priceExpired: "Price has expired",
        },
      },
    },
    language: "en",
    setLanguage: vi.fn(),
  })),
}));

// Mock de los hooks
vi.mock("@/hooks/use-toast", () => ({
  useToast: vi.fn(),
}));

vi.mock("@/contexts/BookingContext", async () => {
  const originalModule = await vi.importActual<
    typeof import("@/contexts/BookingContext")
  >("@/contexts/BookingContext");
  return {
    ...originalModule,
    useBooking: vi.fn(),
  };
});

describe("RequireBookingData", () => {
  const mockToast = vi.fn();

  beforeEach(() => {
    (useToast as ReturnType<typeof vi.fn>).mockReturnValue({
      toast: mockToast,
    });
  });

  test("should render children when booking data exists", () => {
    // Mock de datos de reserva válidos
    (useBooking as ReturnType<typeof vi.fn>).mockReturnValue({
      bookingData: { pickup: "Paris", dropoff: "CDG" },
      priceTimestamp: Date.now(),
    });

    render(
      <MemoryRouter initialEntries={["/booking/details"]}>
        <BookingProvider>
          <RequireBookingData>
            <div data-testid="protected-content">Protected Content</div>
          </RequireBookingData>
        </BookingProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
    expect(mockToast).not.toHaveBeenCalled();
  });

  test("should redirect when booking data is missing", () => {
    // Mock de datos de reserva nulos
    (useBooking as ReturnType<typeof vi.fn>).mockReturnValue({
      bookingData: null,
      priceTimestamp: null,
    });

    render(
      <MemoryRouter initialEntries={["/booking/details"]}>
        <Routes>
          <Route
            path="/booking/details"
            element={
              <RequireBookingData>
                <div data-testid="protected-content">Protected Content</div>
              </RequireBookingData>
            }
          />
          <Route
            path="/booking"
            element={<div data-testid="booking-page">Booking Page</div>}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
    expect(screen.getByTestId("booking-page")).toBeInTheDocument();
    expect(mockToast).toHaveBeenCalledWith({
      title: "Error",
      description: "Please select locations",
      variant: "destructive",
    });
  });

  test("should redirect when price is stale", () => {
    // Mock de datos con precio caducado (más de 30 minutos)
    const staleTimestamp = Date.now() - 31 * 60 * 1000;

    (useBooking as ReturnType<typeof vi.fn>).mockReturnValue({
      bookingData: { pickup: "Paris", dropoff: "CDG" },
      priceTimestamp: staleTimestamp,
    });

    render(
      <MemoryRouter initialEntries={["/booking/details"]}>
        <Routes>
          <Route
            path="/booking/details"
            element={
              <RequireBookingData>
                <div data-testid="protected-content">Protected Content</div>
              </RequireBookingData>
            }
          />
          <Route
            path="/booking"
            element={<div data-testid="booking-page">Booking Page</div>}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
    expect(screen.getByTestId("booking-page")).toBeInTheDocument();
    expect(mockToast).toHaveBeenCalledWith({
      title: "Warning",
      description: "Price has expired",
      variant: "destructive",
    });
  });
});
