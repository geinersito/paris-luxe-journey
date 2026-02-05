/**
 * Get the current site origin (domain + protocol)
 * Uses runtime window.location.origin to support multiple domains
 * Falls back to VITE_SITE_URL env var or eliteparistransfer.com
 */
export function getSiteOrigin(): string {
  // Runtime: use actual domain (supports eliteparistransfer.com, parisluxejourney.com, etc.)
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  // Build/SSR fallback
  return (
    (import.meta.env?.VITE_SITE_URL as string | undefined) ||
    "https://eliteparistransfer.com"
  );
}
