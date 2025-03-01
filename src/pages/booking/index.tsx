import { useNavigate } from "react-router-dom";
import BookingForm from "@/components/booking/BookingForm";
import { useLanguage } from "@/contexts/LanguageContext";

const BookingPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t.booking.title}</h1>
      <BookingForm />
    </div>
  );
};

export default BookingPage;
