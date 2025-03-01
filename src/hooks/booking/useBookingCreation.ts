
import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useBookingCreation = () => {
  const { user } = useAuth();

  const createBookingAndPayment = useCallback(async (
    bookingData: any,
    estimatedPrice: number,
    validateAmount: (amount: number) => boolean,
    bookingWindow: number,
    setBookingId: (id: string) => void,
    setPaymentId: (id: string) => void
  ) => {
    try {
      console.log('Creating booking with complete data:', {
        bookingData,
        vehicle_id: bookingData.vehicle_id,
        vehicleType: bookingData.vehicleType,
        userId: user?.id
      });
      
      if (!bookingData?.vehicle_id) {
        console.error('Missing vehicle_id in bookingData:', bookingData);
        throw new Error('No se ha seleccionado un vehículo válido');
      }

      const finalPrice = Number(estimatedPrice);
      if (!validateAmount(finalPrice)) {
        throw new Error('Monto de pago inválido');
      }

      const pickupDateTime = new Date(`${bookingData.date}T${bookingData.time}`);
      const endDateTime = new Date(pickupDateTime.getTime() + bookingWindow);

      if (!bookingData.pickup || !bookingData.dropoff) {
        throw new Error('Faltan datos de ubicación');
      }

      const { data: conflicts, error: availabilityError } = await supabase
        .from('bookings')
        .select('id')
        .eq('vehicle_id', bookingData.vehicle_id)
        .eq('status', 'confirmed')
        .or(`pickup_datetime.gte.${pickupDateTime.toISOString()},pickup_datetime.lt.${endDateTime.toISOString()}`)
        .limit(1);

      if (availabilityError) throw availabilityError;

      if (conflicts && conflicts.length > 0) {
        throw new Error('Vehículo no disponible para el horario seleccionado');
      }

      const newBookingData = {
        pickup_location_id: bookingData.pickup,
        dropoff_location_id: bookingData.dropoff,
        pickup_datetime: pickupDateTime.toISOString(),
        passengers_count: parseInt(bookingData.passengers),
        vehicle_id: bookingData.vehicle_id,
        flight_number: bookingData.flight_number || null,
        address_details: bookingData.address_details || null,
        trip_type: bookingData.tripType || 'one_way',
        large_luggage_count: Number(bookingData.largeLuggageCount) || 0,
        small_luggage_count: Number(bookingData.smallLuggageCount) || 0,
        customer_name: bookingData.passengerInfo.fullName,
        customer_email: bookingData.passengerInfo.email,
        customer_phone: bookingData.passengerInfo.phone,
        special_instructions: bookingData.passengerInfo.specialInstructions || null,
        status: 'pending',
        user_id: user?.id,
        total_price: finalPrice
      };

      console.log('Inserting booking with complete data:', {
        newBookingData,
        vehicle_id: newBookingData.vehicle_id,
        user_id: newBookingData.user_id
      });

      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert([newBookingData])
        .select()
        .single();

      if (bookingError) {
        console.error('Booking creation error:', bookingError);
        throw bookingError;
      }

      if (!booking) {
        throw new Error('Error al crear la reserva');
      }

      setBookingId(booking.id);

      const newPaymentData = {
        amount: finalPrice,
        booking_id: booking.id,
        customer_email: bookingData.passengerInfo.email,
        customer_name: bookingData.passengerInfo.fullName,
        user_id: user?.id,
        status: 'processing',
        currency: 'EUR'
      };

      console.log('Creating payment with data:', newPaymentData);

      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert(newPaymentData)
        .select()
        .single();

      if (paymentError) {
        console.error('Payment creation error:', paymentError);
        // Rollback: eliminar la reserva si falla el pago
        await supabase
          .from('bookings')
          .delete()
          .eq('id', booking.id);
        throw paymentError;
      }

      if (!payment) {
        throw new Error('Error al crear el registro de pago');
      }

      setPaymentId(payment.id);
      return payment.id;
    } catch (error) {
      console.error('Error creating booking and payment records:', error);
      throw error;
    }
  }, [user]);

  return {
    createBookingAndPayment
  };
};
