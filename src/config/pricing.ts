// src/config/pricing.ts
// Versión PROD v1.0 - Paris Elite Services

export const ROUTES = {
  'cdg-paris': 'CDG ↔ París Centro',
  'orly-paris': 'Orly ↔ París Centro',
  'lebourget-paris': 'Le Bourget ↔ París Centro',
  'beauvais-paris': 'Beauvais ↔ París Centro',
  'cdg-orly': 'CDG ↔ Orly',
  'cdg-lebourget': 'CDG ↔ Le Bourget',
  'orly-lebourget': 'Orly ↔ Le Bourget',
  'garedunord-paris': 'Gare du Nord ↔ París Centro',
  'garelyon-paris': 'Gare de Lyon ↔ París Centro',
  'garest-paris': 'Gare de l\'Est ↔ París Centro',
  'garemontparnasse-paris': 'Gare Montparnasse ↔ París Centro',
  'garelazare-paris': 'Gare Saint-Lazare ↔ París Centro',
  'disney-paris': 'Disneyland ↔ París Centro',
  'versailles-paris': 'Versalles ↔ París Centro',
  'cdg-disney': 'CDG → Disneyland',
  'cdg-versailles': 'CDG → Versalles',
  'orly-disney': 'Orly → Disneyland',
} as const;

export const PRICING = {
  standard: {
    'cdg-paris': { '1-3': 70, '4-7': 90 },
    'orly-paris': { '1-3': 60, '4-7': 78 },
    'lebourget-paris': { '1-3': 77, '4-7': 99 },
    'beauvais-paris': { '1-3': 130, '4-7': 150 },
    'cdg-orly': { '1-3': 105, '4-7': 135 },
    'cdg-lebourget': { '1-3': 77, '4-7': 99 },
    'orly-lebourget': { '1-3': 85, '4-7': 110 },
    'garedunord-paris': { '1-3': 55, '4-7': 72 },
    'garelyon-paris': { '1-3': 60, '4-7': 78 },
    'garest-paris': { '1-3': 55, '4-7': 72 },
    'garemontparnasse-paris': { '1-3': 60, '4-7': 78 },
    'garelazare-paris': { '1-3': 60, '4-7': 78 },
    'disney-paris': { '1-3': 95, '4-7': 120 },
    'versailles-paris': { '1-3': 75, '4-7': 98 },
    'cdg-disney': { '1-3': 95, '4-7': 120 },
    'cdg-versailles': { '1-3': 80, '4-7': 104 },
    'orly-disney': { '1-3': 90, '4-7': 117 },
  },
  surcharges: {
    night: 0.20,      // +20% (MANUAL en V1)
    extraBag: 10,     // €10 por maleta extra (manual)
    waitingTime: 15,  // €15 por 15min
  },
  waitTimePolicy: {
    airport: { freeMinutes: 60, extraFee: 15 },
    city: { freeMinutes: 15, extraFee: 15 },
  },
  hourly: { rate: 75, minimum: 3 },
  cancelPolicy: {
    fullRefundHours: 24,
    partialRefundHours: 12,
  },
  payment: {
    method: '100%_online',
    stripeFee: 0.014,
  },
} as const;

type PassengerCategory = '1-3' | '4-7';
export type RouteKey = keyof typeof PRICING.standard;

/**
 * Mapea códigos de ubicación a route keys
 * Ejemplos: CDG -> cdg, ORY -> orly, GDN -> garedunord, DLP -> disney
 */
export const mapLocationToRouteKey = (location: string): string => {
  const normalized = location.toLowerCase().replace(/[^a-z]/g, '');

  // Mapeo de códigos de aeropuertos (códigos IATA de 3 letras)
  if (normalized === 'cdg' || normalized.includes('charlesde')) return 'cdg';
  if (normalized === 'ory' || normalized.includes('orly')) return 'orly';
  if (normalized === 'lbg' || normalized.includes('lebourget') || normalized.includes('bourget')) return 'lebourget';
  if (normalized === 'bva' || normalized.includes('beauvais')) return 'beauvais';

  // Mapeo de estaciones de tren (códigos personalizados de 3 letras)
  if (normalized === 'gdn' || normalized.includes('garedunord') || normalized.includes('nord')) return 'garedunord';
  if (normalized === 'gdl' || normalized.includes('garedelyon') || normalized.includes('lyon')) return 'garelyon';
  if (normalized === 'gde' || normalized.includes('garedelest') || normalized.includes('est')) return 'garest';
  if (normalized === 'gdm' || normalized.includes('garemontparnasse') || normalized.includes('montparnasse')) return 'garemontparnasse';
  if (normalized === 'gsl' || normalized.includes('garesaintlazare') || normalized.includes('lazare')) return 'garelazare';

  // Mapeo de atracciones (códigos personalizados de 3 letras)
  if (normalized === 'dlp' || normalized.includes('disney') || normalized.includes('disneyland')) return 'disney';
  if (normalized === 'vrs' || normalized.includes('versailles') || normalized.includes('versalles')) return 'versailles';

  // París centro (códigos posibles: PAR, PARIS, PC, etc.)
  if (normalized === 'par' || normalized === 'pc' || normalized.includes('paris') || normalized.includes('centro') || normalized.includes('centre')) return 'paris';

  return normalized;
};

/**
 * Genera la route key completa a partir de origen y destino
 * Ejemplos: (CDG, Paris) -> cdg-paris, (Orly, Disney) -> orly-disney
 */
export const generateRouteKey = (origin: string, destination: string): RouteKey | null => {
  const originKey = mapLocationToRouteKey(origin);
  const destKey = mapLocationToRouteKey(destination);

  // Intentar combinaciones posibles
  const possibleKeys = [
    `${originKey}-${destKey}`,
    `${destKey}-${originKey}`, // Rutas bidireccionales
  ];

  for (const key of possibleKeys) {
    if (key in PRICING.standard) {
      return key as RouteKey;
    }
  }

  return null;
};

export const calculatePrice = (
  route: RouteKey,
  passengers: number,
  options: { extraBags?: number } = {}
): number => {
  const category: PassengerCategory = passengers <= 3 ? '1-3' : '4-7';
  const basePrice = PRICING.standard[route][category];

  let finalPrice = basePrice;
  if (options.extraBags) finalPrice += options.extraBags * PRICING.surcharges.extraBag;

  return Math.round(finalPrice);
};

