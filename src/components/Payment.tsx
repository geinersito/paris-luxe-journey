// ... existing code ...

// First, let's check how the component is trying to access location IDs
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  console.log('[BookingPayment] Inicializando proceso de pago:', {
    hasBookingData: !!bookingData,
    originalPrice: estimatedPrice,
    normalizedPrice: normalizedPrice
  });
  
  try {
    // Check if we have location IDs in bookingData or from useLocationDetails hook
    // Intentamos obtener IDs de múltiples fuentes posibles
    const pickupId = bookingData?.pickupLocationId || locationDetails?.pickupId || '';
    const dropoffId = bookingData?.dropoffLocationId || locationDetails?.dropoffId || '';
    
    console.log('[BookingPayment] IDs de ubicación obtenidos:', {
      fromBookingData: {
        pickup: bookingData?.pickupLocationId,
        dropoff: bookingData?.dropoffLocationId
      },
      fromLocationDetails: {
        pickup: locationDetails?.pickupId,
        dropoff: locationDetails?.dropoffId
      },
      resolved: {
        pickup: pickupId,
        dropoff: dropoffId
      }
    });
    
    if (!pickupId || !dropoffId) {
      console.log('[BookingPayment] Faltan los UUIDs de las ubicaciones:', {
        bookingData,
        locationDetails
      });
      throw new Error('No se pudieron obtener los identificadores de las ubicaciones. Por favor, inténtalo de nuevo.');
    }
    
    // ... rest of the payment processing code ...
  } catch (error) {
    // ... error handling ...
  }
};

// ... existing code ...