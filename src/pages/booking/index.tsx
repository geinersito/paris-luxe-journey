import { useNavigate } from "react-router-dom";
import BookingForm from "@/components/BookingForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBooking } from "@/contexts/BookingContext";

const BookingPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { updateBookingData } = useBooking();

  const handleBookingSubmit = async (bookingDetails: any): Promise<void> => {
    try {
      console.log('BookingPage - handleBookingSubmit llamado');
      console.log('BookingPage - Datos de reserva recibidos:', bookingDetails);
      
      // Calcular precio final en base al precio dinámico de Supabase
      const basePrice = bookingDetails.basePrice || 0;
      const luggageSurcharge = (bookingDetails.largeLuggageCount || 0) * 5 + (bookingDetails.smallLuggageCount || 0) * 2;
      
      // Calcular el precio estimado: duplicado si es ida y vuelta + recargo por equipaje
      const estimatedPrice = (bookingDetails.tripType === 'round_trip' ? basePrice * 2 : basePrice) + luggageSurcharge;
      
      console.log('BookingPage - Precio estimado final:', estimatedPrice);
      
      // IMPORTANTE: Actualizar el contexto de reserva primero
      console.log('BookingPage - Actualizando contexto de reserva...');
      await updateBookingData({
        ...bookingDetails,
        // Asegurarnos de que todos los campos numéricos sean realmente números
        passengers: Number(bookingDetails.passengers),
        largeLuggageCount: Number(bookingDetails.largeLuggageCount) || 0,
        smallLuggageCount: Number(bookingDetails.smallLuggageCount) || 0,
      });
      
      // Navegar a la página de detalles con los datos de la reserva
      console.log('BookingPage - Navegando a /booking/details');
      navigate("/booking/details", {
        state: {
          bookingData: bookingDetails,
          estimatedPrice: estimatedPrice
        }
      });
      
      // Añadir un retardo antes de hacer un segundo intento por si la navegación falló
      setTimeout(() => {
        console.log('BookingPage - Verificando si la navegación se completó');
        // Intentar navegar nuevamente si seguimos en la misma página
        if (window.location.pathname === '/booking') {
          console.log('BookingPage - Segundo intento de navegación a /booking/details');
          navigate("/booking/details", {
            state: {
              bookingData: bookingDetails,
              estimatedPrice: estimatedPrice
            }
          });
        }
      }, 500);
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t.booking.title}</h1>
      <BookingForm 
        tourId="default"
        tourName="Standard Transfer"
        basePrice={0}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default BookingPage;
