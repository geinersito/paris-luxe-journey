/**
 * PARIS ELITE SERVICES - PRICING V3.1.2
 *
 * Sistema de precios basado en Partner Floor (PF)
 * Fuente de verdad: Documento V3.1.2 aprobado
 *
 * CONCEPTOS:
 * - PF (Partner Floor): Precio garantizado al conductor (TTC)
 * - FC (Flexible Commission): Comisión por pago flexible
 * - PD (Prepaid Discount): Descuento por pago anticipado
 * - Hold Amount: Cantidad retenida para cancelaciones tardías
 *
 * FÓRMULAS:
 * - flexible_price = PF + FC
 * - prepaid_price = flexible_price - PD
 * - Beauvais: prepaid_price = PF + buffer_extra_long (sin flexible)
 *
 * TODOS LOS IMPORTES EN CÉNTIMOS (integers)
 */

export type VehicleType = "sedan" | "van";
export type RouteKey =
  | "CDG_PARIS"
  | "ORLY_PARIS"
  | "LEBOURGET_PARIS"
  | "BEAUVAIS_PARIS"
  | "CDG_ORLY"
  | "CDG_LEBOURGET"
  | "ORLY_LEBOURGET"
  | "GAREDUNORD_PARIS"
  | "GARELYON_PARIS"
  | "GAREST_PARIS"
  | "GAREMONTPARNASSE_PARIS"
  | "GARELAZARE_PARIS"
  | "DISNEY_PARIS"
  | "VERSAILLES_PARIS"
  | "CDG_DISNEY"
  | "CDG_VERSAILLES"
  | "ORLY_DISNEY";

export type RouteDistance = "short" | "medium" | "long" | "extra_long";

interface RouteConfig {
  partnerFloor: {
    sedan: number; // en céntimos
    van: number; // en céntimos
  };
  distance: RouteDistance;
  description: {
    en: string;
    es: string;
    fr: string;
    pt: string;
  };
}

/**
 * COMISIONES Y DESCUENTOS (en céntimos)
 */
export const PRICING_CONSTANTS = {
  // Comisión Flexible (lo que cobra la plataforma en modo flexible)
  FLEXIBLE_COMMISSION: {
    sedan: 1000, // €10.00
    van: 1300, // €13.00
  },

  // Descuento Prepaid (incentivo por pagar por adelantado)
  PREPAID_DISCOUNT: 500, // €5.00

  // Hold Amounts (retención para cancelaciones tardías)
  HOLD_AMOUNT: {
    short: 1500, // €15.00 (Gares)
    medium: 3000, // €30.00 (CDG, Orly, Disney, Versailles)
    long: 3000, // €30.00 (Le Bourget)
    extra_long: 0, // €0.00 (Beauvais - no tiene flexible)
  },

  // Buffer para Beauvais (ruta extra larga sin flexible)
  BEAUVAIS_BUFFER: 1000, // €10.00
} as const;

/**
 * CONFIGURACIÓN DE RUTAS
 * Partner Floor (PF) por ruta y tipo de vehículo
 */
export const ROUTES_V312: Record<RouteKey, RouteConfig> = {
  CDG_PARIS: {
    partnerFloor: { sedan: 9500, van: 12200 }, // €95 / €122 (target 100/130)
    distance: "medium",
    description: {
      en: "CDG ↔ Paris Center",
      es: "CDG ↔ Centro de París",
      fr: "CDG ↔ Centre de Paris",
      pt: "CDG ↔ Centro de Paris",
    },
  },

  ORLY_PARIS: {
    partnerFloor: { sedan: 8500, van: 10700 }, // €85 / €107 (target 90/115)
    distance: "medium",
    description: {
      en: "Orly ↔ Paris Center",
      es: "Orly ↔ Centro de París",
      fr: "Orly ↔ Centre de Paris",
      pt: "Orly ↔ Centro de Paris",
    },
  },

  LEBOURGET_PARIS: {
    partnerFloor: { sedan: 10000, van: 12200 }, // €100 / €122 (target 105/130)
    distance: "long",
    description: {
      en: "Le Bourget ↔ Paris Center",
      es: "Le Bourget ↔ Centro de París",
      fr: "Le Bourget ↔ Centre de Paris",
      pt: "Le Bourget ↔ Centro de Paris",
    },
  },

  BEAUVAIS_PARIS: {
    partnerFloor: { sedan: 15000, van: 16200 }, // €150 / €162 (target 155/170 - buffer +10)
    distance: "extra_long",
    description: {
      en: "Beauvais ↔ Paris Center",
      es: "Beauvais ↔ Centro de París",
      fr: "Beauvais ↔ Centre de Paris",
      pt: "Beauvais ↔ Centro de Paris",
    },
  },

  CDG_ORLY: {
    partnerFloor: { sedan: 12500, van: 14700 }, // €125 / €147 (target 130/155)
    distance: "medium",
    description: {
      en: "CDG ↔ Orly",
      es: "CDG ↔ Orly",
      fr: "CDG ↔ Orly",
      pt: "CDG ↔ Orly",
    },
  },

  CDG_LEBOURGET: {
    partnerFloor: { sedan: 10500, van: 12200 }, // €105 / €122 (target 110/130)
    distance: "long",
    description: {
      en: "CDG ↔ Le Bourget",
      es: "CDG ↔ Le Bourget",
      fr: "CDG ↔ Le Bourget",
      pt: "CDG ↔ Le Bourget",
    },
  },

  ORLY_LEBOURGET: {
    partnerFloor: { sedan: 11500, van: 13700 }, // €115 / €137 (target 120/145)
    distance: "medium",
    description: {
      en: "Orly ↔ Le Bourget",
      es: "Orly ↔ Le Bourget",
      fr: "Orly ↔ Le Bourget",
      pt: "Orly ↔ Le Bourget",
    },
  },

  GAREDUNORD_PARIS: {
    partnerFloor: { sedan: 7500, van: 9200 }, // €75 / €92 (target 80/100 - gares unified)
    distance: "short",
    description: {
      en: "Gare du Nord ↔ Paris Center",
      es: "Gare du Nord ↔ Centro de París",
      fr: "Gare du Nord ↔ Centre de Paris",
      pt: "Gare du Nord ↔ Centro de Paris",
    },
  },

  GARELYON_PARIS: {
    partnerFloor: { sedan: 7500, van: 9200 }, // €75 / €92 (target 80/100 - gares unified)
    distance: "short",
    description: {
      en: "Gare de Lyon ↔ Paris Center",
      es: "Gare de Lyon ↔ Centro de París",
      fr: "Gare de Lyon ↔ Centre de Paris",
      pt: "Gare de Lyon ↔ Centro de Paris",
    },
  },

  GAREST_PARIS: {
    partnerFloor: { sedan: 7500, van: 9200 }, // €75 / €92 (target 80/100 - gares unified)
    distance: "short",
    description: {
      en: "Gare de l'Est ↔ Paris Center",
      es: "Gare de l'Est ↔ Centro de París",
      fr: "Gare de l'Est ↔ Centre de Paris",
      pt: "Gare de l'Est ↔ Centro de Paris",
    },
  },

  GAREMONTPARNASSE_PARIS: {
    partnerFloor: { sedan: 7500, van: 9200 }, // €75 / €92 (target 80/100 - gares unified)
    distance: "short",
    description: {
      en: "Gare Montparnasse ↔ Paris Center",
      es: "Gare Montparnasse ↔ Centro de París",
      fr: "Gare Montparnasse ↔ Centre de Paris",
      pt: "Gare Montparnasse ↔ Centro de Paris",
    },
  },

  GARELAZARE_PARIS: {
    partnerFloor: { sedan: 7500, van: 9200 }, // €75 / €92 (target 80/100 - gares unified)
    distance: "short",
    description: {
      en: "Gare Saint-Lazare ↔ Paris Center",
      es: "Gare Saint-Lazare ↔ Centro de París",
      fr: "Gare Saint-Lazare ↔ Centre de Paris",
      pt: "Gare Saint-Lazare ↔ Centro de Paris",
    },
  },

  DISNEY_PARIS: {
    partnerFloor: { sedan: 11500, van: 13700 }, // €115 / €137 (target 120/145)
    distance: "medium",
    description: {
      en: "Disneyland ↔ Paris Center",
      es: "Disneyland ↔ Centro de París",
      fr: "Disneyland ↔ Centre de Paris",
      pt: "Disneyland ↔ Centro de Paris",
    },
  },

  VERSAILLES_PARIS: {
    partnerFloor: { sedan: 9000, van: 11200 }, // €90 / €112 (target 95/120)
    distance: "medium",
    description: {
      en: "Versailles ↔ Paris Center",
      es: "Versalles ↔ Centro de París",
      fr: "Versailles ↔ Centre de Paris",
      pt: "Versalhes ↔ Centro de Paris",
    },
  },

  CDG_DISNEY: {
    partnerFloor: { sedan: 12000, van: 14200 }, // €120 / €142 (target 125/150)
    distance: "medium",
    description: {
      en: "CDG → Disneyland",
      es: "CDG → Disneyland",
      fr: "CDG → Disneyland",
      pt: "CDG → Disneyland",
    },
  },

  CDG_VERSAILLES: {
    partnerFloor: { sedan: 10500, van: 12700 }, // €105 / €127 (target 110/135)
    distance: "medium",
    description: {
      en: "CDG → Versailles",
      es: "CDG → Versalles",
      fr: "CDG → Versailles",
      pt: "CDG → Versalhes",
    },
  },

  ORLY_DISNEY: {
    partnerFloor: { sedan: 11000, van: 13200 }, // €110 / €132 (target 115/140)
    distance: "medium",
    description: {
      en: "Orly → Disneyland",
      es: "Orly → Disneyland",
      fr: "Orly → Disneyland",
      pt: "Orly → Disneyland",
    },
  },
} as const;

/**
 * MAPEO DE UBICACIONES A ROUTE KEYS
 * Normaliza nombres de ubicaciones a claves de ruta
 */
export const mapLocationToRouteKey = (location: string): string => {
  const normalized = location.toLowerCase().replace(/[^a-z]/g, "");

  // Aeropuertos
  if (normalized === "cdg" || normalized.includes("charlesde")) return "cdg";
  if (normalized === "ory" || normalized.includes("orly")) return "orly";
  if (
    normalized === "lbg" ||
    normalized.includes("lebourget") ||
    normalized.includes("bourget")
  )
    return "lebourget";
  if (normalized === "bva" || normalized.includes("beauvais"))
    return "beauvais";

  // Estaciones
  if (normalized.includes("garedunord") || normalized.includes("garenord"))
    return "garedunord";
  if (normalized.includes("garelyon")) return "garelyon";
  if (normalized.includes("garedel") || normalized.includes("gareest"))
    return "garest";
  if (
    normalized.includes("garemontparnasse") ||
    normalized.includes("montparnasse")
  )
    return "garemontparnasse";
  if (normalized.includes("garelazare") || normalized.includes("saintlazare"))
    return "garelazare";

  // Atracciones
  if (normalized.includes("disney") || normalized === "dlp") return "disney";
  if (normalized.includes("versailles") || normalized.includes("versalles"))
    return "versailles";

  // París
  if (normalized.includes("paris") || normalized.includes("centre"))
    return "paris";

  return normalized;
};

/**
 * GENERAR ROUTE KEY DESDE ORIGEN Y DESTINO
 * Intenta combinaciones bidireccionales
 */
export const generateRouteKey = (
  origin: string,
  destination: string,
): RouteKey | null => {
  const originKey = mapLocationToRouteKey(origin);
  const destKey = mapLocationToRouteKey(destination);

  // Intentar combinaciones posibles
  const possibleKeys = [
    `${originKey.toUpperCase()}_${destKey.toUpperCase()}`,
    `${destKey.toUpperCase()}_${originKey.toUpperCase()}`, // Bidireccional
  ];

  for (const key of possibleKeys) {
    if (key in ROUTES_V312) {
      return key as RouteKey;
    }
  }

  return null;
};

/**
 * OBTENER CONFIGURACIÓN DE RUTA
 */
export const getRouteConfig = (routeKey: RouteKey): RouteConfig | null => {
  return ROUTES_V312[routeKey] || null;
};

/**
 * VERIFICAR SI UNA RUTA PERMITE FLEXIBLE
 * Beauvais es prepaid-only
 */
export const isFlexibleEnabled = (routeKey: RouteKey): boolean => {
  return routeKey !== "BEAUVAIS_PARIS";
};
