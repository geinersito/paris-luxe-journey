
import { useNavigate } from "react-router-dom";
import BookingForm from "@/components/BookingForm";
import { useLanguage } from "@/contexts/LanguageContext";

const BookingPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleBookingSubmit = async (bookingDetails: any) => {
    try {
      navigate("/booking/details", {
        state: {
          bookingData: bookingDetails,
          estimatedPrice: bookingDetails.tripType === 'round_trip' 
            ? bookingDetails.basePrice * 2 
            : bookingDetails.basePrice
        }
      });
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BookingForm
        tourId="default"
        tourName="Standard Transfer"
        basePrice={80}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default BookingPage;
