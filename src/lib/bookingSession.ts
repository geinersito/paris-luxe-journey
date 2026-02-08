const BOOKING_SESSION_KEY = "booking_flow_state_v1";
export const BOOKING_SESSION_TTL_MS = 30 * 60 * 1000;

export interface BookingSessionSnapshot {
  bookingData: unknown;
  estimatedPrice: number;
  luggageSurcharge: number;
  savedAt: number;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const toFiniteNumber = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const saveBookingSession = (payload: {
  bookingData: unknown;
  estimatedPrice: number;
  luggageSurcharge?: number;
}): void => {
  if (typeof window === "undefined") {
    return;
  }

  const estimatedPrice = toFiniteNumber(payload.estimatedPrice);
  if (estimatedPrice === null) {
    return;
  }

  const luggageSurcharge = toFiniteNumber(payload.luggageSurcharge ?? 0) ?? 0;

  const snapshot: BookingSessionSnapshot = {
    bookingData: payload.bookingData,
    estimatedPrice,
    luggageSurcharge,
    savedAt: Date.now(),
  };

  window.sessionStorage.setItem(BOOKING_SESSION_KEY, JSON.stringify(snapshot));
};

export const loadBookingSession = (): BookingSessionSnapshot | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(BOOKING_SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      clearBookingSession();
      return null;
    }

    const estimatedPrice = toFiniteNumber(parsed.estimatedPrice);
    const luggageSurcharge = toFiniteNumber(parsed.luggageSurcharge);
    const savedAt = toFiniteNumber(parsed.savedAt);

    if (
      estimatedPrice === null ||
      luggageSurcharge === null ||
      savedAt === null ||
      !("bookingData" in parsed)
    ) {
      clearBookingSession();
      return null;
    }

    if (Date.now() - savedAt > BOOKING_SESSION_TTL_MS) {
      clearBookingSession();
      return null;
    }

    return {
      bookingData: parsed.bookingData,
      estimatedPrice,
      luggageSurcharge,
      savedAt,
    };
  } catch {
    clearBookingSession();
    return null;
  }
};

export const clearBookingSession = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(BOOKING_SESSION_KEY);
};
