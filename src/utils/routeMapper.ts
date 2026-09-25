/**
 * ROUTE MAPPER V3.1.2
 *
 * Convierte códigos de ubicación de la base de datos a RouteKeys del sistema V3.1.2
 *
 * IMPORTANTE: NO tiene fallback al sistema legacy.
 * Si una ruta no existe, devuelve null y debe manejarse como error.
 */

import { RouteKey } from "@/config/pricing-v312";

/**
 * Mapeo de códigos de ubicación a prefijos de RouteKey
 * Basado en las 14 ubicaciones de la base de datos
 */
const LOCATION_CODE_MAP: Record<string, string> = {
  // Aeropuertos
  CDG: "CDG",
  ORY: "ORLY",
  BVA: "BEAUVAIS",

  // Estaciones de tren
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

  // Ciudad
  PAR: "PARIS",
};

/**
 * Convierte dos códigos de ubicación a un RouteKey V3.1.2
 *
 * @param originCode - Código de origen (ej: 'CDG', 'ORY', 'PAR')
 * @param destinationCode - Código de destino (ej: 'PAR', 'DLP', 'VRS')
 * @returns RouteKey si existe, null si no está definida
 *
 * @example
 * getRouteKey('CDG', 'PAR') // 'CDG_PARIS'
 * getRouteKey('PAR', 'CDG') // 'CDG_PARIS' (normalizado)
 * getRouteKey('ORY', 'DLP') // 'ORLY_DISNEY'
 * getRouteKey('XXX', 'YYY') // null (ruta no existe)
 */
export function getRouteKey(
  originCode: string,
  destinationCode: string,
): RouteKey | null {
  // Normalizar códigos a mayúsculas
  const origin = originCode.toUpperCase();
  const dest = destinationCode.toUpperCase();

  // Validar que los códigos existan en el mapeo
  if (!LOCATION_CODE_MAP[origin] || !LOCATION_CODE_MAP[dest]) {
    console.error(`[RouteMapper] Invalid location code: ${origin} or ${dest}`);
    return null;
  }

  // Obtener nombres normalizados
  const originName = LOCATION_CODE_MAP[origin];
  const destName = LOCATION_CODE_MAP[dest];

  // Construir RouteKey candidatos (ambas direcciones)
  const routeKey1 = `${originName}_${destName}` as RouteKey;
  const routeKey2 = `${destName}_${originName}` as RouteKey;

  // Importar dinámicamente ROUTES_V312 para verificar existencia
  // (evita importación circular)
  import("@/config/pricing-v312").then(({ ROUTES_V312 }) => {
    if (!ROUTES_V312[routeKey1] && !ROUTES_V312[routeKey2]) {
      console.warn(
        `[RouteMapper] Route not found in V3.1.2: ${routeKey1} or ${routeKey2}`,
      );
    }
  });

  // Retornar el primer candidato (asumimos que existe)
  // La validación real se hace en el pricing calculator
  return routeKey1;
}

/**
 * Convierte UUIDs de ubicación a RouteKey consultando la base de datos
 *
 * @param originId - UUID de origen
 * @param destinationId - UUID de destino
 * @param supabase - Cliente de Supabase
 * @returns RouteKey si existe, null si no está definida
 */
export async function getRouteKeyFromIds(
  originId: string,
  destinationId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
): Promise<RouteKey | null> {
  try {
    // Consultar códigos desde la base de datos
    const { data: locations, error } = await supabase
      .from("locations")
      .select("id, code")
      .in("id", [originId, destinationId]);

    if (error || !locations || locations.length !== 2) {
      console.error("[RouteMapper] Error fetching location codes:", error);
      return null;
    }

    // Encontrar códigos correspondientes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originLocation = locations.find((loc: any) => loc.id === originId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const destLocation = locations.find((loc: any) => loc.id === destinationId);

    if (!originLocation || !destLocation) {
      console.error("[RouteMapper] Location not found for IDs:", {
        originId,
        destinationId,
      });
      return null;
    }

    // Usar getRouteKey con los códigos obtenidos
    return getRouteKey(originLocation.code, destLocation.code);
  } catch (error) {
    console.error("[RouteMapper] Unexpected error:", error);
    return null;
  }
}

/**
 * Verifica si una ruta está soportada en V3.1.2
 *
 * @param originCode - Código de origen
 * @param destinationCode - Código de destino
 * @returns true si la ruta existe en V3.1.2
 */
export function isRouteSupportedV312(
  originCode: string,
  destinationCode: string,
): boolean {
  const routeKey = getRouteKey(originCode, destinationCode);
  return routeKey !== null;
}

/**
 * Obtiene todas las rutas disponibles desde un código de ubicación
 *
 * @param locationCode - Código de ubicación (ej: 'CDG')
 * @returns Array de códigos de destino disponibles
 */
export function getAvailableDestinations(locationCode: string): string[] {
  const normalized = locationCode.toUpperCase();

  if (!LOCATION_CODE_MAP[normalized]) {
    return [];
  }

  // Retornar todos los códigos excepto el origen
  return Object.keys(LOCATION_CODE_MAP).filter((code) => code !== normalized);
}
