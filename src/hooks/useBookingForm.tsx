import { useState } from 'react';
import { useBookingPrice } from './booking/useBookingPrice';

export const useBookingForm = () => {
  const [formData, setFormData] = useState({
    pickup: '',      // Now expects location code (e.g., 'PAR', 'CDG')
    dropoff: '',     // Now expects location code (e.g., 'CDG', 'PAR')
    // ... rest of the form data ...
  });

  const { calculatePrice } = useBookingPrice();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
    fieldName?: string
  ) => {
    let updatedFormData;
    if (typeof e === 'string' && fieldName) {
      updatedFormData = { ...formData, [fieldName]: e };
    } else if (typeof e === 'object') {
      const { name, value } = e.target;
      updatedFormData = { ...formData, [name]: value };
    } else {
      return;
    }
    
    setFormData(updatedFormData);

    // Calculate price when both location codes are available
    if (updatedFormData.pickup && updatedFormData.dropoff) {
      calculatePrice(updatedFormData.pickup, updatedFormData.dropoff);
    }
  };

  // ... rest of the code ...
};