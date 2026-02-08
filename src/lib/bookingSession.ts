export const BOOKING_SESSION_KEY = "plj.booking.snapshot.v1";
export const BOOKING_SESSION_TTL_MS = 30 * 60 * 1000;

type BookingScalar = string | number | boolean | null;
type SessionBookingData = Record<string, BookingScalar>;

const ALLOWED_BOOKING_KEYS = [
  "pickup",
  "dropoff",
  "passengers",
  "date",
  "time",
  "tripType",
  "returnDate",
  "returnTime",
  "largeLuggageCount",
  "smallLuggageCount",
  "luggageSurcharge",
  "basePrice",
  "tourId",
  "tourName",
  "pickupLocationId",
  "dropoffLocationId",
  "pickupLocationName",
  "dropoffLocationName",
  "vehicle_id",
  "vehicleType",
  "flight_number",
  "address_details",
] as const;

export interface BookingSessionSnapshot {
  bookingData: SessionBookingData;
  estimatedPrice: number;
  luggageSurcharge: number;
  savedAt: number;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isBookingScalar = (value: unknown): value is BookingScalar =>
  value === null || ["string", "number", "boolean"].includes(typeof value);

const sanitizeBookingData = (value: unknown): SessionBookingData | null => {
  if (!isRecord(value)) {
    return null;
  }

  const sanitized: SessionBookingData = {};

  for (const key of ALLOWED_BOOKING_KEYS) {
    const current = value[key];
    if (current !== undefined && isBookingScalar(current)) {
      sanitized[key] = current;
    }
  }

  if (!sanitized.pickup || !sanitized.dropoff) {
    return null;
  }

  return sanitized;
};

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

  const bookingData = sanitizeBookingData(payload.bookingData);
  const estimatedPrice = toFiniteNumber(payload.estimatedPrice);
  if (!bookingData || estimatedPrice === null) {
    return;
  }

  const luggageSurcharge = toFiniteNumber(payload.luggageSurcharge ?? 0) ?? 0;

  const snapshot: BookingSessionSnapshot = {
    bookingData,
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

    const bookingData = sanitizeBookingData(parsed.bookingData);
    const estimatedPrice = toFiniteNumber(parsed.estimatedPrice);
    const luggageSurcharge = toFiniteNumber(parsed.luggageSurcharge);
    const savedAt = toFiniteNumber(parsed.savedAt);

    if (
      !bookingData ||
      estimatedPrice === null ||
      luggageSurcharge === null ||
      savedAt === null
    ) {
      clearBookingSession();
      return null;
    }

    if (Date.now() - savedAt > BOOKING_SESSION_TTL_MS) {
      clearBookingSession();
      return null;
    }

    return {
      bookingData,
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
