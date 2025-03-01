import { useState } from 'react';
import { BookingFormData } from '@/types/booking';

export function useBookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    passengers: '1',
    serviceLevel: 'standard',
    largeLuggageCount: '0',
    smallLuggageCount: '0',
    calculatedPrice: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [price, setPrice] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string | number } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Aquí iría la lógica de envío del formulario
      return true;
    } catch (error) {
      console.error('Error submitting form:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    price,
    setPrice,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}
