import BookingForm from "@/components/BookingForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const BookingPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const intent = searchParams.get("intent");

  // Guard: prevent hourly intent from entering transfer wizard
  // Redirect to /hourly if intent=hourly is detected
  useEffect(() => {
    if (intent === "hourly") {
      navigate("/hourly", { replace: true });
    }
  }, [intent, navigate]);

  // Prevent flash while redirecting
  if (intent === "hourly") {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t.booking.title}</h1>
      <BookingForm
        tourId="default"
        tourName="Standard Transfer"
        basePrice={0}
        onSubmit={async () => {}}
      />
    </div>
  );
};

export default BookingPage;
