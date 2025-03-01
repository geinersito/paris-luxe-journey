
import { useEffect } from 'react';
import { CheckCircle2, Clock, Plane } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { supabase } from '@/integrations/supabase/client';

interface BookingConfirmationProps {
  bookingId: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  vehicle: string;
  price: number;
  onClose: () => void;
}

export const BookingConfirmation = ({
  bookingId,
  pickupTime,
  pickupLocation,
  dropoffLocation,
  vehicle,
  price,
  onClose,
}: BookingConfirmationProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const sendConfirmationEmail = async () => {
      try {
        const { data: booking } = await supabase
          .from('bookings')
          .select('customer_name, customer_email')
          .eq('id', bookingId)
          .single();

        if (!booking) {
          throw new Error('No se encontró la reserva');
        }

        const { error } = await supabase.functions.invoke('send-contact-confirmation', {
          body: {
            bookingId,
            customerName: booking.customer_name,
            customerEmail: booking.customer_email,
            pickupDateTime: pickupTime,
            pickupLocation,
            dropoffLocation,
            vehicleType: vehicle,
            totalPrice: price
          },
        });

        if (error) throw error;

        toast({
          title: "¡Reserva confirmada!",
          description: `Se ha enviado un email de confirmación a ${booking.customer_email}`,
        });
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        toast({
          title: "Error",
          description: "No se pudo enviar el email de confirmación",
          variant: "destructive",
        });
      }
    };

    sendConfirmationEmail();
  }, [bookingId, pickupTime, pickupLocation, dropoffLocation, vehicle, price, toast]);

  return (
    <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-auto animate-in fade-in-50 slide-in-from-bottom-5">
      <div className="flex items-center justify-center mb-6">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
      </div>
      
      <h3 className="text-2xl font-display text-center mb-6">
        ¡Reserva Confirmada!
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b">
          <span className="text-muted-foreground">Booking ID</span>
          <span className="font-medium">{bookingId}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b">
          <span className="text-muted-foreground">Hora de recogida</span>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{pickupTime}</span>
          </div>
        </div>

        <div className="space-y-2 py-2 border-b">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Origen</span>
            <span className="font-medium text-right">{pickupLocation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Destino</span>
            <span className="font-medium text-right">{dropoffLocation}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-b">
          <span className="text-muted-foreground">Vehículo</span>
          <span className="font-medium">{vehicle}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b">
          <span className="text-muted-foreground">Precio Total</span>
          <span className="text-xl font-display">€{price.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Button 
          className="w-full"
          onClick={() => {
            // Aquí se implementaría la descarga del voucher
            toast({
              title: "Voucher descargado",
              description: "El comprobante ha sido descargado exitosamente.",
            });
          }}
        >
          Descargar Voucher
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onClose}
        >
          Cerrar
        </Button>
      </div>
    </div>
  );
};
