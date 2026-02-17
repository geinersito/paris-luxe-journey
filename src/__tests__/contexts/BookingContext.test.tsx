import { vi } from "vitest";
import {
  render,
  screen,
  waitFor,
  act,
  renderHook,
} from "@testing-library/react";
import { BookingProvider, useBooking } from "@/contexts/BookingContext";
import { useBookingPrice } from "@/hooks/booking/useBookingPrice";

// Mock LanguageContext FIRST (before BookingContext imports it)
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: vi.fn(() => ({
    t: {
      common: { error: "Error" },
      booking: {
        errors: {
          selectLocations: "Please select locations",
          networkError: "Network error occurred",
        },
      },
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

// Mock the pricing hook used internally by BookingContext
vi.mock("@/hooks/booking/useBookingPrice", () => ({
  useBookingPrice: vi.fn(),
}));

const mockCalculatePrice = vi.fn();

// Test component to access context
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
    localStorage.clear();
    (useBookingPrice as ReturnType<typeof vi.fn>).mockReturnValue({
      price: 0,
      basePrice: 0,
      passengerSurcharge: 0,
      luggageSurcharge: 0,
      distance: 0,
      calculatePrice: mockCalculatePrice,
      handleDistanceCalculated: vi.fn(),
    });
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
    mockCalculatePrice.mockResolvedValue(100);

    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>,
    );

    act(() => {
      screen.getByTestId("update-button").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("estimated-price").textContent).toBe("100");
    });

    expect(screen.getByTestId("booking-data").textContent).toContain("Paris");
    expect(screen.getByTestId("booking-data").textContent).toContain(
      "CDG Airport",
    );
  });

  test("should validate price with backend and detect discrepancies", async () => {
    // First call (updateBookingData) returns 100; second call (validatePriceWithBackend) returns 110
    mockCalculatePrice.mockResolvedValueOnce(100).mockResolvedValueOnce(110);

    const { result } = renderHook(() => useBooking(), {
      wrapper: BookingProvider,
    });

    await act(async () => {
      await result.current.updateBookingData({
        pickup: "Paris",
        dropoff: "CDG Airport",
        passengers: 2,
      });
    });

    // Price set by updateBookingData
    expect(result.current.estimatedPrice).toBe(100);

    let isValid;
    await act(async () => {
      isValid = await result.current.validatePriceWithBackend();
    });

    // Backend returned different price → discrepancy detected
    expect(isValid).toBe(false);
    // Price updated to backend value
    expect(result.current.estimatedPrice).toBe(110);
  });

  test("should handle network errors during price validation", async () => {
    // First call succeeds (updateBookingData), second throws a network error
    mockCalculatePrice
      .mockResolvedValueOnce(100)
      .mockRejectedValueOnce(new Error("network connection error"));

    const { result } = renderHook(() => useBooking(), {
      wrapper: BookingProvider,
    });

    await act(async () => {
      await result.current.updateBookingData({
        pickup: "Paris",
        dropoff: "CDG Airport",
        passengers: 2,
      });
    });

    let isValid;
    await act(async () => {
      isValid = await result.current.validatePriceWithBackend();
    });

    // Validation failed due to network error
    expect(isValid).toBe(false);
    // Price unchanged after failed validation
    expect(result.current.estimatedPrice).toBe(100);
  });
});
