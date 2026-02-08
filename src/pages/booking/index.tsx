import BookingForm from "@/components/BookingForm";
import { useLanguage } from "@/contexts/LanguageContext";

const BookingPage = () => {
  const { t } = useLanguage();

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
