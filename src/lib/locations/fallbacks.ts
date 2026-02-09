export interface LocationFallback {
  id: string;
  name: string;
  name_en: string;
  name_es: string;
  name_fr: string;
  name_pt: string;
  type: string;
  code: string;
}

const LOCATION_FALLBACKS: ReadonlyArray<LocationFallback> = [
  {
    id: "1",
    name: "Paris CDG Airport",
    name_en: "Paris CDG Airport",
    name_es: "Aeropuerto CDG de París",
    name_fr: "Aéroport CDG Paris",
    name_pt: "Aeroporto CDG Paris",
    type: "airport",
    code: "cdg",
  },
  {
    id: "2",
    name: "Paris Orly Airport",
    name_en: "Paris Orly Airport",
    name_es: "Aeropuerto Orly de París",
    name_fr: "Aéroport Orly Paris",
    name_pt: "Aeroporto Orly Paris",
    type: "airport",
    code: "orly",
  },
  {
    id: "3",
    name: "Paris City Center",
    name_en: "Paris City Center",
    name_es: "Centro de París",
    name_fr: "Centre de Paris",
    name_pt: "Centro de Paris",
    type: "city",
    code: "paris",
  },
  {
    id: "4",
    name: "Disneyland Paris",
    name_en: "Disneyland Paris",
    name_es: "Disneyland París",
    name_fr: "Disneyland Paris",
    name_pt: "Disneyland Paris",
    type: "attraction",
    code: "disneyland",
  },
  {
    id: "5",
    name: "Versailles",
    name_en: "Versailles",
    name_es: "Versalles",
    name_fr: "Versailles",
    name_pt: "Versalhes",
    type: "city",
    code: "versailles",
  },
];

export const getLocationFallbacks = (): LocationFallback[] =>
  LOCATION_FALLBACKS.map((location) => ({ ...location }));
