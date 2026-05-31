import BookingForm from "@/components/BookingForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const BookingPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const intent = searchParams.get("intent");

  // Guard: prevent hourly intent from entering transfer wizard
  useEffect(() => {
    if (intent === "hourly") {
      navigate("/hourly", { replace: true });
    }
  }, [intent, navigate]);

  if (intent === "hourly") {
    return null;
  }

  const handleSubmit = async (bookingDetails: Record<string, unknown>) => {
    // Navigate to /booking/pending with trip data — contact info collected there
    navigate("/booking/pending", { state: { bookingDetails, language } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BookingForm
        tourId="default"
        tourName="Standard Transfer"
        basePrice={0}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default BookingPage;
