
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import BookingForm from '@/components/BookingForm';
import { PaymentForm } from '@/components/PaymentForm';
import { BookingConfirmation } from '@/components/BookingConfirmation';

interface BookingDetails {
  tourId: string;
  tourName: string;
  basePrice: number;
  // ... otros detalles de la reserva
}

interface PaymentDetails {
  paymentMethod: string;
  amount: number;
}

export default function BookingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = React.useState<'details' | 'payment' | 'confirmation'>('details');
  const [bookingDetails, setBookingDetails] = React.useState<BookingDetails>({
    tourId: 'default-tour',
    tourName: 'Default Tour',
    basePrice: 0
  });
  const [selectedTour, setSelectedTour] = React.useState<any>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleBookingSubmit = async (details: BookingDetails) => {
    try {
      setBookingDetails(details);
      setCurrentStep('payment');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la reserva');
    }
  };

  const handlePaymentSuccess = async (paymentDetails: PaymentDetails) => {
    try {
      setIsProcessing(true);
      // Procesar el pago aquí
      setCurrentStep('confirmation');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {currentStep === 'details' && (
        <BookingForm
          tourId={bookingDetails.tourId}
          tourName={bookingDetails.tourName}
          basePrice={bookingDetails.basePrice}
          onSubmit={handleBookingSubmit}
        />
      )}
      {currentStep === 'payment' && (
        <PaymentForm
          bookingData={bookingDetails}
          onSubmit={handlePaymentSuccess}
          isProcessing={isProcessing}
          error={error}
        />
      )}
      {currentStep === 'confirmation' && (
        <BookingConfirmation
          bookingId={bookingDetails.tourId}
          bookingData={bookingDetails}
          tourData={selectedTour}
        />
      )}
    </div>
  );
}
