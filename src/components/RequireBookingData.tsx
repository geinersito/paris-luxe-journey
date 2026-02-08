import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBooking } from "@/contexts/BookingContext";
import { loadBookingSession } from "@/lib/bookingSession";

interface RequireBookingDataProps {
  children: ReactNode;
}

export const RequireBookingData = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const location = useLocation();
  const { bookingData, estimatedPrice, priceTimestamp, updateBookingData } =
    useBooking();
  const isConfirmationRoute = location.pathname === "/booking/confirmation";

  // Añadir logs para depuración
  console.log("RequireBookingData - Renderizando componente");
  console.log("RequireBookingData - Estado de navegación:", location.state);
  console.log("RequireBookingData - Datos en contexto:", bookingData);
  console.log("RequireBookingData - Precio estimado:", estimatedPrice);

  // Obtener datos de la navegación
  const navigationBookingData = location.state?.bookingData;
  const navigationPrice = location.state?.estimatedPrice; // Añadir esta línea
  const sessionSnapshot = loadBookingSession();
  const sessionBookingData = sessionSnapshot?.bookingData;

  console.log(
    "RequireBookingData - Datos de sessionStorage:",
    sessionBookingData,
  );

  // Efecto para actualizar el contexto con los datos de navegación si existen
  useEffect(() => {
    const processNavigationData = async () => {
      if (navigationBookingData && !bookingData) {
        console.log(
          "[RequireBookingData] Encontrados datos de reserva en el estado de navegación:",
          navigationBookingData,
        );
        console.log(
          "[RequireBookingData] Precio estimado en navegación:",
          navigationPrice,
        );

        // Asegurarnos de que los datos de reserva incluyan la información correcta sobre el precio
        const updatedBookingData = {
          ...navigationBookingData,
          // Si no hay un precio base explícito, usar el precio estimado
          basePrice: navigationBookingData.basePrice || navigationPrice,
          // Calcular el recargo por maletas si no está incluido
          luggageSurcharge:
            navigationBookingData.luggageSurcharge ||
            (() => {
              const largeLuggage =
                Number(navigationBookingData.largeLuggageCount) || 0;
              // El precio base incluye 1 maleta grande
              const extraLargeLuggage = Math.max(0, largeLuggage - 1);
              return extraLargeLuggage * 10; // 10€ por maleta grande adicional
            })(),
        };

        console.log(
          "[RequireBookingData] Datos de reserva actualizados con precio:",
          updatedBookingData,
        );

        try {
          // Actualizar el contexto con los datos de la navegación
          await updateBookingData(updatedBookingData);
          console.log(
            "RequireBookingData - Contexto actualizado correctamente",
          );
        } catch (error) {
          console.error(
            "RequireBookingData - Error al actualizar contexto:",
            error,
          );
        }
      }
    };

    processNavigationData();
  }, [navigationBookingData, navigationPrice, bookingData, updateBookingData]); // Añadir navigationPrice a las dependencias

  // Modificar la verificación para ser más permisiva
  // Si hay datos en la navegación, permitir el acceso incluso si el contexto aún no está actualizado
  if (!bookingData && !navigationBookingData && !sessionBookingData) {
    if (isConfirmationRoute) {
      console.log(
        "RequireBookingData - Permitiendo /booking/confirmation sin contexto para mostrar fallback UI",
      );
      return <>{children}</>;
    }

    console.log(
      "RequireBookingData - No se encontraron datos de reserva, redirigiendo a /booking",
    );
    toast({
      title: t.common.error,
      description: t.booking.errors.selectLocations,
      variant: "destructive",
    });
    return <Navigate to="/booking" replace />;
  }

  // Check if price is stale (older than 30 minutes)
  const now = Date.now();
  const PRICE_STALE_THRESHOLD = 30 * 60 * 1000; // 30 minutes

  if (
    !isConfirmationRoute &&
    priceTimestamp &&
    now - priceTimestamp > PRICE_STALE_THRESHOLD
  ) {
    console.log(
      "RequireBookingData - Precio obsoleto, redirigiendo a /booking",
    );
    toast({
      title: t.common.warning,
      description: t.booking.errors.priceStale,
      variant: "destructive",
    });
    return <Navigate to="/booking" replace />;
  }

  console.log(
    "RequireBookingData - Datos de reserva válidos, mostrando children",
  );
  return <>{children}</>;
};
