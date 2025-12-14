
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
    technical_specs: "Motor 2.0L Turbo, Transmisión automática 9G-TRONIC, Interior en cuero",
    passenger_capacity: 3,
    luggage_capacity: 2,
    base_price: 0,
    image_url: "https://images.caradisiac.com/logos-ref/modele/modele--mercedes-classe-e-w214/S7-modele--mercedes-classe-e-w214.jpg",
    interior_image_url: "https://images.caradisiac.com/images/9/2/1/4/209214/S0-guide-d-achat-la-mercedes-classe-e-w214-s-impose-en-reference-757223.jpg",
    features: ["wifi", "water", "airConditioning", "leatherSeats", "cleaning"]
  },
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0852",
    name: "Van Mercedes",
    type: "van",
    description: "Espacioso y versátil para grupos de hasta 7 pasajeros",
    technical_specs: "Motor 2.0L Diesel, Configuración flexible de asientos, WiFi a bordo",
    passenger_capacity: 7,
    luggage_capacity: 7,
    base_price: 0,
    image_url: "https://images.caradisiac.com/images/1/9/7/7/197777/S0-mercedes-classe-v-un-restylage-dans-l-air-du-temps-642535.jpg",
    interior_image_url: "https://images.caradisiac.com/images/1/9/7/7/197777/S0-mercedes-classe-v-un-restylage-dans-l-air-du-temps-642539.jpg",
    features: ["wifi", "water", "airConditioning", "leatherSeats", "cleaning"]
  }
];

export const useVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      try {
        // Optimización: Seleccionar solo las columnas necesarias
        const { data, error } = await supabase
          .from("vehicles")
          .select("id, type, name, capacity, base_price, features, image_url")
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

        return data;
      } catch (err) {
        console.error("Error fetching vehicles, using fallback:", err);
        return FALLBACK_VEHICLES;
      }
    },
    // Always return fallback on error instead of throwing
    retry: false,
    staleTime: 10 * 60 * 1000, // Aumentado a 10 minutos (los vehículos no cambian frecuentemente)
    cacheTime: 30 * 60 * 1000, // Cache por 30 minutos
  });
};
