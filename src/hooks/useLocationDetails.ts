import { useEffect, useState } from 'react';

interface LocationDetails {
  pickup: string;
  dropoff: string;
}

interface UseLocationDetailsProps {
  pickupId?: string;
  dropoffId?: string;
}

export function useLocationDetails({ pickupId, dropoffId }: UseLocationDetailsProps) {
  const [locationDetails, setLocationDetails] = useState<LocationDetails | null>(null);

  useEffect(() => {
    if (!pickupId || !dropoffId) return;

    // Formatear los IDs para que sean más legibles
    const formatLocationId = (id: string) => {
      // Si es un UUID, mostrar solo los primeros 8 caracteres
      if (id.includes('-')) {
        return `Ubicación ${id.split('-')[0]}`;
      }
      return `Ubicación ${id.slice(0, 8)}`;
    };

    setLocationDetails({
      pickup: formatLocationId(pickupId),
      dropoff: formatLocationId(dropoffId)
    });
  }, [pickupId, dropoffId]);

  return { locationDetails };
}
