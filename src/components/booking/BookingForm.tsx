// ... existing code ...

// Función para manejar cambios en el número de pasajeros
const handlePassengerChange = (value: number) => {
  console.log('handlePassengerChange - Antes de actualizar:', {
    currentPassengers: formData.passengers,
    newPassengers: value,
    currentLargeLuggage: formData.largeLuggage,
    currentCarryOnLuggage: formData.carryOnLuggage
  });
  
  // Actualizar el estado local
  setFormData(prev => ({
    ...prev,
    passengers: value
    // IMPORTANT: Do NOT update luggage here
  }));
  
  // Recalcular el precio con el nuevo número de pasajeros
  if (formData.pickup && formData.dropoff) {
    console.log('handlePassengerChange - Llamando a calculatePrice con:', {
      origin: formData.pickupCode || formData.pickup,
      destination: formData.dropoffCode || formData.dropoff,
      passengers: value,
      largeLuggage: formData.largeLuggage,
      carryOnLuggage: formData.carryOnLuggage,
      serviceLevel: formData.serviceLevel
    });
    
    calculatePrice({
      origin: formData.pickupCode || formData.pickup,
      destination: formData.dropoffCode || formData.dropoff,
      passengers: value,
      largeLuggage: formData.largeLuggage, // Mantener el mismo número de maletas
      carryOnLuggage: formData.carryOnLuggage, // Mantener el mismo número de maletas de mano
      serviceLevel: formData.serviceLevel
    });
  }
};

// Función para manejar cambios en el número de maletas
const handleLuggageChange = (type: 'large' | 'carryOn', value: number) => {
  console.log('handleLuggageChange - Antes de actualizar:', {
    type,
    currentValue: type === 'large' ? formData.largeLuggage : formData.carryOnLuggage,
    newValue: value,
    passengers: formData.passengers
  });
  
  // Actualizar el estado local
  setFormData(prev => ({
    ...prev,
    [type === 'large' ? 'largeLuggage' : 'carryOnLuggage']: value
  }));
  
  // Recalcular el precio con el nuevo número de maletas
  if (formData.pickup && formData.dropoff) {
    const newLargeLuggage = type === 'large' ? value : formData.largeLuggage;
    const newCarryOnLuggage = type === 'carryOn' ? value : formData.carryOnLuggage;
    
    console.log('handleLuggageChange - Llamando a calculatePrice con:', {
      origin: formData.pickupCode || formData.pickup,
      destination: formData.dropoffCode || formData.dropoff,
      passengers: formData.passengers,
      largeLuggage: newLargeLuggage,
      carryOnLuggage: newCarryOnLuggage,
      serviceLevel: formData.serviceLevel
    });
    
    calculatePrice({
      origin: formData.pickupCode || formData.pickup,
      destination: formData.dropoffCode || formData.dropoff,
      passengers: formData.passengers,
      largeLuggage: newLargeLuggage,
      carryOnLuggage: newCarryOnLuggage,
      serviceLevel: formData.serviceLevel
    });
  }
};