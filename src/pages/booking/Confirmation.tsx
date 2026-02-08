import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import BookingProgress from "@/components/booking/BookingProgress";
import {
  CheckCircle2,
  Calendar,
  Info,
  MapPin,
  Clock,
  Users,
  Luggage,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { loadBookingSession } from "@/lib/bookingSession";

interface ConfirmationBookingData {
  id?: string;
  status?: string;
  pickup_location_id?: string;
  pickup?: string;
  dropoff_location_id?: string;
  dropoff?: string;
  pickup_datetime?: string;
  date?: string; // Added: from booking form (separate)
  time?: string; // Added: from booking form (separate)
  passengers_count?: number | string;
  passengers?: number | string;
  large_luggage_count?: number | string;
  small_luggage_count?: number | string;
  total_price?: number | string;
  estimatedPrice?: number | string;
}

interface ConfirmationLocationState {
  bookingData?: ConfirmationBookingData;
  totalPrice?: number; // Added: top-level from Payment.tsx navigation
}

const PARIS_TIME_LABEL = "Paris time";

const PARIS_DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Paris",
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatParisDateTime(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return PARIS_DATE_TIME_FORMATTER.format(date);
}

function toNumber(value: number | string | undefined, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();

  const sessionSnapshot = loadBookingSession();
  const bookingData =
    location.state?.bookingData ?? sessionSnapshot?.bookingData;

  // DEBUG: log booking data to identify field names
  console.log("🔍 Confirmation - bookingData:", bookingData);
  console.log("🔍 Confirmation - sessionSnapshot:", sessionSnapshot);

  const hasValidBookingData =
    Boolean(bookingData?.id) && bookingData?.status === "confirmed";

  // Construct pickup datetime from either combined field or separate date+time
  const pickupDateTimeValue = bookingData?.pickup_datetime
    ? bookingData.pickup_datetime
    : bookingData?.date && bookingData?.time
      ? `${bookingData.date}T${bookingData.time}`
      : null;

  const formattedPickupDateTime = formatParisDateTime(pickupDateTimeValue);
  const passengersCount = toNumber(
    bookingData?.passengers_count ?? bookingData?.passengers,
    1,
  );
  const largeLuggageCount = toNumber(bookingData?.large_luggage_count, 0);
  const smallLuggageCount = toNumber(bookingData?.small_luggage_count, 0);
  const hasLuggage = largeLuggageCount > 0 || smallLuggageCount > 0;

  // Get price from location.state.totalPrice (Payment.tsx navigation) or fallbacks
  const displayPrice =
    (location.state as ConfirmationLocationState)?.totalPrice ??
    bookingData?.total_price ??
    bookingData?.estimatedPrice ??
    sessionSnapshot?.estimatedPrice ??
    0;

  const handleAddToCalendar = () => {
    toast({
      title: t.booking.success.addToCalendar,
      description: t.booking.success.description,
    });
  };

  if (!hasValidBookingData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-3xl py-10">
          <div className="max-w-xl mx-auto bg-card border rounded-xl p-6 md:p-8 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-display text-primary mb-3">
              No booking found
            </h1>
            <p className="text-muted-foreground mb-6">
              Please return to booking to generate a confirmation.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/booking")}
                className="w-full"
                size="lg"
              >
                Go to Booking
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="w-full"
                size="lg"
                variant="outline"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8">
        <BookingProgress currentStep={3} />

        <div className="mt-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-in zoom-in-50 duration-500" />
            <h1 className="text-3xl md:text-4xl font-display text-primary mb-3">
              {t.booking.success.title}
            </h1>
            <p className="text-muted-foreground mb-2 text-lg">
              {t.booking.success.description}
            </p>
            {bookingData.id && (
              <p className="text-sm text-muted-foreground">
                Confirmation number:{" "}
                <span className="font-mono font-bold text-primary">
                  {bookingData.id.slice(0, 8).toUpperCase()}
                </span>
              </p>
            )}
          </div>

          {/* Booking Summary Card */}
          <div className="max-w-2xl mx-auto mb-8 bg-card border-2 border-primary/20 rounded-xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl md:text-2xl font-display font-bold text-primary mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              Booking Details
            </h2>

            <div className="space-y-4">
              {/* Route */}
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Route</p>
                  <p className="font-semibold text-foreground">
                    {bookingData.pickup_location_id ||
                      bookingData.pickup ||
                      "Pickup location"}
                    <span className="text-primary mx-2">→</span>
                    {bookingData.dropoff_location_id ||
                      bookingData.dropoff ||
                      "Dropoff location"}
                  </p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    Pickup Date & Time ({PARIS_TIME_LABEL})
                  </p>
                  <p className="font-semibold text-foreground">
                    {formattedPickupDateTime || "Invalid date"}
                  </p>
                </div>
              </div>

              {/* Passengers */}
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    Passengers
                  </p>
                  <p className="font-semibold text-foreground">
                    {passengersCount} passenger{passengersCount > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Luggage */}
              {hasLuggage && (
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Luggage className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      Luggage
                    </p>
                    <p className="font-semibold text-foreground">
                      {largeLuggageCount} large suitcase
                      {largeLuggageCount !== 1 ? "s" : ""}, {smallLuggageCount}{" "}
                      small bag{smallLuggageCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              )}

              {/* Total Price */}
              <div className="border-t-2 border-primary/20 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-muted-foreground">
                    Total Paid:
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    €{displayPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="max-w-2xl mx-auto mb-8 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-amber-900 dark:text-amber-100">
              <Info className="w-5 h-5 text-amber-600" />
              Cancellation Policy
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>
                  <strong>Free cancellation</strong> up to 24 hours before
                  pickup
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">⚠</span>
                <span>
                  <strong>50% refund</strong> for cancellations 12-24 hours
                  before pickup
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">✗</span>
                <span>
                  <strong>No refund</strong> for cancellations less than 12
                  hours before pickup
                </span>
              </li>
            </ul>
          </div>

          {/* What's Next */}
          <div className="max-w-2xl mx-auto mb-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-primary">
              What happens next?
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">1.</span>
                <span>
                  You'll receive a confirmation email with all booking details
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">2.</span>
                <span>
                  24 hours before pickup, we'll send you your driver's contact
                  details and photo
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">3.</span>
                <span>
                  Your driver will track your flight and adjust pickup time if
                  needed
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">4.</span>
                <span>
                  Your driver will wait at the arrivals hall with a name sign
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="max-w-lg mx-auto space-y-4">
            <Button
              onClick={handleAddToCalendar}
              className="w-full"
              variant="outline"
              size="lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              {t.booking.success.addToCalendar}
            </Button>

            <Button
              onClick={() => navigate("/")}
              className="w-full silk-button"
              size="lg"
            >
              {t.booking.success.backToHome}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
