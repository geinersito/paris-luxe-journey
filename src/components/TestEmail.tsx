'use client';

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

interface EmailResponse {
  success: boolean;
  data?: any;
  error?: {
    message: string;
    name?: string;
    statusCode?: number;
  };
}

export function TestEmail() {
  const [response, setResponse] = useState<EmailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTestEmail = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-booking-emails', {
        body: {
          customerName: "Geiner Boris",
          customerEmail: "borisgeiner@gmail.com",
          bookingId: "TEST-" + new Date().getTime(),
          pickupLocation: "Charles de Gaulle Airport (CDG)",
          dropoffLocation: "Eiffel Tower",
          pickupDateTime: new Date().toISOString(),
          passengers: 2,
          vehicleType: "Luxury Sedan",
          totalPrice: 150,
          flightNumber: "AF123"
        }
      });

      if (error) {
        console.error('Error details:', error);
        throw error;
      }

      setResponse(data);
      toast({
        title: "Email enviado",
        description: "El email de prueba se ha enviado correctamente",
      });
    } catch (error) {
      console.error('Error sending test email:', error);
      setResponse({
        success: false,
        error: {
          message: error.message || 'Error desconocido',
          name: error.name,
          statusCode: error.statusCode
        }
      });
      toast({
        title: "Error",
        description: "No se pudo enviar el email de prueba",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prueba de Email de Reserva</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleTestEmail} 
          disabled={loading}
        >
          {loading ? (
            "Enviando..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Enviar Email de Prueba
            </>
          )}
        </Button>

        {response && (
          <>
            {response.error ? (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error al enviar email</AlertTitle>
                <AlertDescription>
                  {response.error.message}
                  {response.error.name && (
                    <p className="text-sm text-gray-500">
                      Tipo de error: {response.error.name}
                    </p>
                  )}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="mt-4">
                <AlertTitle>Email enviado correctamente</AlertTitle>
                <AlertDescription>
                  El email de prueba se ha enviado a borisgeiner@gmail.com
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
