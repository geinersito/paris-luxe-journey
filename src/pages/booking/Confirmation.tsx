import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import BookingProgress from "@/components/booking/BookingProgress";
import { CheckCircle2, Calendar, Info, MapPin, Clock, Users, Luggage } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BookingConfirmation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();
  const bookingData = location.state?.bookingData;

  useEffect(() => {
    if (!location.state || !location.state.bookingData) {
      console.log('[BookingConfirmation] No booking data found in location state');
      navigate("/booking", { replace: true });
      return;
    }
    
    // Validate booking data
    const { bookingData } = location.state;
    if (!bookingData.id || bookingData.status !== 'confirmed') {
      console.log('[BookingConfirmation] Invalid booking data:', bookingData);
      navigate("/booking", { replace: true });
      return;
    }
  }, [location.state, navigate]);

  const handleAddToCalendar = () => {
    toast({
      title: t.booking.success.addToCalendar,
      description: t.booking.success.description,
    });
  };

  if (!bookingData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8">
        <BookingProgress currentStep={3} />

        <div className="mt-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-in zoom-in-50 duration-500" />
            <h1 className="text-3xl md:text-4xl font-display text-primary mb-3">{t.booking.success.title}</h1>
            <p className="text-muted-foreground mb-2 text-lg">
              {t.booking.success.description}
            </p>
            {bookingData.id && (
              <p className="text-sm text-muted-foreground">
                Confirmation number: <span className="font-mono font-bold text-primary">{bookingData.id.slice(0, 8).toUpperCase()}</span>
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
                    {bookingData.pickup_location_id || bookingData.pickup || 'Pickup location'}
                    <span className="text-primary mx-2">→</span>
                    {bookingData.dropoff_location_id || bookingData.dropoff || 'Dropoff location'}
                  </p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Pickup Date & Time</p>
                  <p className="font-semibold text-foreground">
                    {bookingData.pickup_datetime
                      ? new Date(bookingData.pickup_datetime).toLocaleString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : `${bookingData.date || 'Date'} at ${bookingData.time || 'Time'}`
                    }
                  </p>
                </div>
              </div>

              {/* Passengers */}
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Passengers</p>
                  <p className="font-semibold text-foreground">
                    {bookingData.passengers_count || bookingData.passengers || 1} passenger{(bookingData.passengers_count || bookingData.passengers || 1) > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Luggage */}
              {(bookingData.large_luggage_count > 0 || bookingData.small_luggage_count > 0) && (
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Luggage className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Luggage</p>
                    <p className="font-semibold text-foreground">
                      {bookingData.large_luggage_count || 0} large suitcase{(bookingData.large_luggage_count || 0) !== 1 ? 's' : ''}, {bookingData.small_luggage_count || 0} small bag{(bookingData.small_luggage_count || 0) !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              )}

              {/* Total Price */}
              <div className="border-t-2 border-primary/20 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-muted-foreground">Total Paid:</span>
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    €{bookingData.total_price || bookingData.estimatedPrice || '0'}
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
                <span><strong>Free cancellation</strong> up to 24 hours before pickup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">⚠</span>
                <span><strong>50% refund</strong> for cancellations 12-24 hours before pickup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">✗</span>
                <span><strong>No refund</strong> for cancellations less than 12 hours before pickup</span>
              </li>
            </ul>
          </div>

          {/* What's Next */}
          <div className="max-w-2xl mx-auto mb-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-primary">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">1.</span>
                <span>You'll receive a confirmation email with all booking details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">2.</span>
                <span>24 hours before pickup, we'll send you your driver's contact details and photo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">3.</span>
                <span>Your driver will track your flight and adjust pickup time if needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">4.</span>
                <span>Your driver will wait at the arrivals hall with a name sign</span>
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
