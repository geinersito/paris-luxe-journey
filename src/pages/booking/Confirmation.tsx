import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import BookingProgress from "@/components/booking/BookingProgress";
import { CheckCircle2, Calendar } from "lucide-react";
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
        
        <div className="mt-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-display text-primary mb-4">{t.booking.success.title}</h1>
          <p className="text-muted-foreground mb-8">
            {t.booking.success.description}
          </p>

          <div className="max-w-lg mx-auto space-y-6">
            <Button
              onClick={handleAddToCalendar}
              className="w-full"
              variant="outline"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {t.booking.success.addToCalendar}
            </Button>

            <Button
              onClick={() => navigate("/")}
              className="w-full"
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
