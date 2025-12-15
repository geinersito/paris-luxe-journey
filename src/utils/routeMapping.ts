/**
 * ROUTE MAPPING UTILITY
 *
 * Mapea códigos de ubicación de la base de datos a RouteKeys de V3.1.2
 * Resuelve discrepancias entre:
 * - Códigos DB: CDG, ORY, PAR, GDN, GDL, etc.
 * - RouteKeys V3.1.2: CDG_PARIS, ORLY_PARIS, GAREDUNORD_PARIS, etc.
 */

import { RouteKey } from "@/config/pricing-v312";

/**
 * Mapeo de códigos de ubicación de DB a identificadores normalizados
 */
const LOCATION_CODE_MAP: Record<string, string> = {
  // Aeropuertos
  CDG: "CDG",
  ORY: "ORLY",
  BVA: "BEAUVAIS",
  LBG: "LEBOURGET",

  // Ciudad
  PAR: "PARIS",

  // Estaciones de tren (Gares)
  GDN: "GAREDUNORD",
  GDL: "GARELYON",
  GDE: "GAREST",
  GDM: "GAREMONTPARNASSE",
  GSL: "GARELAZARE",

  // Atracciones
  DLP: "DISNEY",
  VRS: "VERSAILLES",
  LVR: "LOUVRE",
  EIF: "EIFFEL",
  ARC: "ARC",
};

/**
 * Normaliza un código o nombre de ubicación
 */
export const normalizeLocationCode = (location: string): string => {
  const upper = location.toUpperCase().trim();

  // Si es un código conocido, retornar el mapeo
  if (LOCATION_CODE_MAP[upper]) {
    return LOCATION_CODE_MAP[upper];
  }

  // Si contiene el nombre completo, extraer el código
  const normalized = location.toLowerCase().replace(/[^a-z]/g, "");

  // Aeropuertos
  if (normalized.includes("charlesde") || normalized.includes("cdg"))
    return "CDG";
  if (normalized.includes("orly") || normalized.includes("ory")) return "ORLY";
  if (normalized.includes("beauvais") || normalized.includes("bva"))
    return "BEAUVAIS";
  if (normalized.includes("lebourget") || normalized.includes("bourget"))
    return "LEBOURGET";

  // Ciudad
  if (normalized.includes("paris") || normalized.includes("centro"))
    return "PARIS";

  // Gares
  if (normalized.includes("garedunord") || normalized.includes("nord"))
    return "GAREDUNORD";
  if (normalized.includes("garelyon") || normalized.includes("lyon"))
    return "GARELYON";
  if (normalized.includes("garest") || normalized.includes("est"))
    return "GAREST";
  if (
    normalized.includes("garemontparnasse") ||
    normalized.includes("montparnasse")
  )
    return "GAREMONTPARNASSE";
  if (normalized.includes("garelazare") || normalized.includes("lazare"))
    return "GARELAZARE";

  // Atracciones
  if (normalized.includes("disney") || normalized.includes("disneyland"))
    return "DISNEY";
  if (normalized.includes("versailles") || normalized.includes("versalles"))
    return "VERSAILLES";
  if (normalized.includes("louvre")) return "LOUVRE";
  if (normalized.includes("eiffel") || normalized.includes("torre"))
    return "EIFFEL";
  if (normalized.includes("arc") || normalized.includes("triunfo"))
    return "ARC";

  // Si no se reconoce, retornar el código original
  return upper;
};

/**
 * Genera una RouteKey de V3.1.2 desde dos ubicaciones
 * Intenta combinaciones bidireccionales y retorna null si no existe
 */
export const generateRouteKeyV312 = (
  origin: string,
  destination: string,
): RouteKey | null => {
  const originNormalized = normalizeLocationCode(origin);
  const destNormalized = normalizeLocationCode(destination);

  // Lista de RouteKeys válidas en V3.1.2
  const validRoutes: RouteKey[] = [
    "CDG_PARIS",
    "ORLY_PARIS",
    "LEBOURGET_PARIS",
    "BEAUVAIS_PARIS",
    "CDG_ORLY",
    "CDG_LEBOURGET",
    "ORLY_LEBOURGET",
    "GAREDUNORD_PARIS",
    "GARELYON_PARIS",
    "GAREST_PARIS",
    "GAREMONTPARNASSE_PARIS",
    "GARELAZARE_PARIS",
    "DISNEY_PARIS",
    "VERSAILLES_PARIS",
    "CDG_DISNEY",
    "CDG_VERSAILLES",
    "ORLY_DISNEY",
  ];

  // Intentar combinaciones posibles
  const possibleKeys = [
    `${originNormalized}_${destNormalized}`,
    `${destNormalized}_${originNormalized}`, // Bidireccional
  ];

  for (const key of possibleKeys) {
    if (validRoutes.includes(key as RouteKey)) {
      return key as RouteKey;
    }
  }

  return null;
};

/**
 * Verifica si una ruta está soportada en V3.1.2
 */
export const isRouteSupported = (
  origin: string,
  destination: string,
): boolean => {
  return generateRouteKeyV312(origin, destination) !== null;
};

/**
 * Obtiene información sobre por qué una ruta no está soportada
 */
export const getUnsupportedRouteReason = (
  origin: string,
  destination: string,
): string | null => {
  const originNormalized = normalizeLocationCode(origin);
  const destNormalized = normalizeLocationCode(destination);

  // Ubicaciones que no tienen rutas definidas en V3.1.2
  const unsupportedLocations = ["LOUVRE", "EIFFEL", "ARC"];

  if (
    unsupportedLocations.includes(originNormalized) ||
    unsupportedLocations.includes(destNormalized)
  ) {
    return "Esta ubicación aún no tiene precios fijos configurados. Se calculará el precio basado en distancia.";
  }

  return "Esta combinación de origen-destino no tiene precio fijo configurado. Se calculará el precio basado en distancia.";
};
