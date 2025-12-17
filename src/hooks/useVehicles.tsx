import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  description: string;
  technical_specs: string;
  passenger_capacity: number;
  luggage_capacity: number;
  base_price: number;
  image_url: string;
  interior_image_url: string;
  features: string[];
}

const FALLBACK_VEHICLES: Vehicle[] = [
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    name: "Berlina Mercedes",
    type: "berline",
    description: "Vehículo elegante y confortable para 1-3 pasajeros",
    technical_specs:
      "Motor 2.0L Turbo, Transmisión automática 9G-TRONIC, Interior en cuero",
    passenger_capacity: 3,
    luggage_capacity: 2,
    base_price: 0,
    image_url:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&q=80",
    interior_image_url:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&q=80",
    features: ["wifi", "water", "airConditioning", "leatherSeats", "cleaning"],
  },
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0852",
    name: "Van Mercedes",
    type: "van",
    description: "Espacioso y versátil para grupos de hasta 7 pasajeros",
    technical_specs:
      "Motor 2.0L Diesel, Configuración flexible de asientos, WiFi a bordo",
    passenger_capacity: 7,
    luggage_capacity: 7,
    base_price: 0,
    image_url:
      "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop&q=80",
    interior_image_url:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop&q=80",
    features: ["wifi", "water", "airConditioning", "leatherSeats", "cleaning"],
  },
];

export const useVehicles = () => {
  return useQuery<Vehicle[]>({
    queryKey: ["vehicles"],
    queryFn: async (): Promise<Vehicle[]> => {
      try {
        // Optimización: Seleccionar solo las columnas necesarias
        const { data, error } = await supabase
          .from("vehicles")
          .select(
            "id, type, name, passenger_capacity, luggage_capacity, base_price, features, image_url, interior_image_url, description, technical_specs",
          )
          .order("base_price", { ascending: true });

        // If there's an error or no data, return fallback
        if (error) {
          console.warn("Supabase error, using fallback vehicles:", error);
          return FALLBACK_VEHICLES;
        }

        if (!data || data.length === 0) {
          console.log("No vehicles in database, using fallback");
          return FALLBACK_VEHICLES;
        }

        // Map Supabase data to Vehicle interface - data is already typed correctly
        return data.map(
          (item): Vehicle => ({
            id: item.id,
            name: item.name,
            type: item.type,
            description: item.description ?? "",
            technical_specs: item.technical_specs ?? "",
            passenger_capacity: item.passenger_capacity,
            luggage_capacity: item.luggage_capacity,
            base_price: item.base_price,
            image_url: item.image_url ?? "",
            interior_image_url: item.interior_image_url ?? "",
            features: item.features ?? [],
          }),
        );
      } catch (err) {
        console.error("Error fetching vehicles, using fallback:", err);
        return FALLBACK_VEHICLES;
      }
    },
    // Always return fallback on error instead of throwing
    retry: false,
    staleTime: 10 * 60 * 1000, // Aumentado a 10 minutos (los vehículos no cambian frecuentemente)
    gcTime: 30 * 60 * 1000, // Cache por 30 minutos (renamed from cacheTime in @tanstack/react-query v5)
  });
};
