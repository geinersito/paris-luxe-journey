
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

export const useVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("base_price", { ascending: true });

      if (error) throw error;

      // Si no hay datos en la base de datos, usamos los datos estandarizados
      if (!data || data.length === 0) {
        const standardizedVehicles: Vehicle[] = [
          {
            id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
            name: "Mercedes Clase E",
            type: "business",
            description: "Ideal para traslados ejecutivos y viajes de negocios",
            technical_specs: "Motor 2.0L Turbo, Transmisión automática 9G-TRONIC, Interior en cuero",
            passenger_capacity: 3,
            luggage_capacity: 2,
            base_price: 80,
            image_url: "https://images.caradisiac.com/logos-ref/modele/modele--mercedes-classe-e-w214/S7-modele--mercedes-classe-e-w214.jpg",
            interior_image_url: "https://images.caradisiac.com/images/9/2/1/4/209214/S0-guide-d-achat-la-mercedes-classe-e-w214-s-impose-en-reference-757223.jpg",
            features: [
              "Wifi gratuito",
              "Agua embotellada",
              "Climatización individual",
              "Asientos de cuero",
              "Limpieza garantizada"
            ]
          },
          {
            id: "d290f1ee-6c54-4b01-90e6-d701748f0852",
            name: "Mercedes Clase V",
            type: "van",
            description: "Perfecta para familias y grupos pequeños",
            technical_specs: "Motor 2.0L Diesel, Configuración flexible de asientos, WiFi a bordo",
            passenger_capacity: 7,
            luggage_capacity: 7,
            base_price: 120,
            image_url: "https://images.caradisiac.com/images/1/9/7/7/197777/S0-mercedes-classe-v-un-restylage-dans-l-air-du-temps-642535.jpg",
            interior_image_url: "https://images.caradisiac.com/images/1/9/7/7/197777/S0-mercedes-classe-v-un-restylage-dans-l-air-du-temps-642539.jpg",
            features: [
              "Wifi gratuito",
              "Agua embotellada",
              "Climatización individual",
              "Asientos de cuero",
              "Limpieza garantizada"
            ]
          },
          {
            id: "d290f1ee-6c54-4b01-90e6-d701748f0853",
            name: "Mercedes Clase S",
            type: "luxury",
            description: "La máxima expresión del lujo para ocasiones especiales",
            technical_specs: "Motor 3.0L V6 Biturbo, Sistema de sonido Burmester®, Asientos ejecutivos",
            passenger_capacity: 3,
            luggage_capacity: 2,
            base_price: 200,
            image_url: "https://images.caradisiac.com/images/5/0/7/3/195073/S0-mercedes-classe-s-2021-les-prix-francais-671828.jpg",
            interior_image_url: "https://images.caradisiac.com/images/5/0/7/3/195073/S0-mercedes-classe-s-2021-les-prix-francais-671827.jpg",
            features: [
              "Wifi gratuito",
              "Agua embotellada",
              "Climatización individual",
              "Asientos de cuero",
              "Limpieza garantizada"
            ]
          }
        ];

        return standardizedVehicles;
      }

      return data;
    }
  });
};
