import { vi } from "vitest";
import {
  render,
  screen,
  waitFor,
  act,
  renderHook,
} from "@testing-library/react";
import { BookingProvider, useBooking } from "@/contexts/BookingContext";
import * as apiService from "@/services/api";

// Mock LanguageContext FIRST (before BookingContext imports it)
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: vi.fn(() => ({
    t: {
      common: { error: "Error" },
      booking: { errors: { selectLocations: "Please select locations" } },
    },
    language: "en",
    setLanguage: vi.fn(),
  })),
}));

// Mock useToast
vi.mock("@/hooks/use-toast", () => ({
  useToast: vi.fn(() => ({
    toast: vi.fn(),
  })),
}));

// Mock de las APIs
vi.mock("@/services/api", () => ({
  calculatePrice: vi.fn(),
  validatePrice: vi.fn(),
}));

// Componente de prueba para acceder al contexto
const TestComponent = () => {
  const {
    bookingData,
    estimatedPrice,
    updateBookingData,
    validatePriceWithBackend,
  } = useBooking();

  return (
    <div>
      <div data-testid="booking-data">{JSON.stringify(bookingData)}</div>
      <div data-testid="estimated-price">{estimatedPrice}</div>
      <button
        data-testid="update-button"
        onClick={() =>
          updateBookingData({
            pickup: "Paris",
            dropoff: "CDG Airport",
            passengers: 2,
          })
        }
      >
        Update
      </button>
      <button
        data-testid="validate-button"
        onClick={() => validatePriceWithBackend()}
      >
        Validate
      </button>
    </div>
  );
};

describe("BookingContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should initialize with empty booking data and zero price", () => {
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>,
    );

    expect(screen.getByTestId("booking-data").textContent).toBe("null");
    expect(screen.getByTestId("estimated-price").textContent).toBe("0");
  });

  test("should update booking data and calculate price", async () => {
    // Mock de la API de cálculo de precio
    (apiService.calculatePrice as ReturnType<typeof vi.fn>).mockResolvedValue(
      105,
    );

    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>,
    );

    // Actualizar datos de reserva
    act(() => {
      screen.getByTestId("update-button").click();
    });

    // Verificar que se llama a la API y se actualiza el precio
    await waitFor(() => {
      expect(apiService.calculatePrice).toHaveBeenCalledWith(
        "Paris",
        "CDG Airport",
        2,
      );
      expect(screen.getByTestId("estimated-price").textContent).toBe("105");
    });

    // Verificar que los datos de reserva se actualizaron
    expect(screen.getByTestId("booking-data").textContent).toContain("Paris");
    expect(screen.getByTestId("booking-data").textContent).toContain(
      "CDG Airport",
    );
  });

  test("should validate price with backend and detect discrepancies", async () => {
    // Mock de la API de validación de precio
    (apiService.calculatePrice as ReturnType<typeof vi.fn>).mockResolvedValue(
      105,
    );
    (apiService.validatePrice as ReturnType<typeof vi.fn>).mockResolvedValue(
      110,
    );

    const { result } = renderHook(() => useBooking(), {
      wrapper: BookingProvider,
    });

    // Actualizar datos de reserva
    await act(async () => {
      await result.current.updateBookingData({
        pickup: "Paris",
        dropoff: "CDG Airport",
        passengers: 2,
      });
    });

    // Verificar precio inicial
    expect(result.current.estimatedPrice).toBe(105);

    // Validar precio con backend
    let isValid;
    await act(async () => {
      isValid = await result.current.validatePriceWithBackend();
    });

    // Verificar que se detectó la discrepancia
    expect(isValid).toBe(false);

    // Verificar que el precio se actualizó
    expect(result.current.estimatedPrice).toBe(110);
  });

  test("should handle network errors during price validation", async () => {
    // Mock de la API para simular un error de red
    (apiService.validatePrice as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Network error"),
    );

    const { result } = renderHook(() => useBooking(), {
      wrapper: BookingProvider,
    });

    // Actualizar datos de reserva
    await act(async () => {
      await result.current.updateBookingData({
        pickup: "Paris",
        dropoff: "CDG Airport",
        passengers: 2,
      });
    });

    // Intentar validar precio
    let isValid;
    await act(async () => {
      isValid = await result.current.validatePriceWithBackend();
    });

    // Verificar que la validación falló
    expect(isValid).toBe(false);

    // Verificar que el precio original se mantiene
    expect(result.current.estimatedPrice).toBe(105);
  });
});
