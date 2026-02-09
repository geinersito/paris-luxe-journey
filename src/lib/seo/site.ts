/**
 * Get the current site origin (domain + protocol)
 * Uses runtime window.location.origin to support multiple domains
 * Falls back to VITE_PUBLIC_SITE_URL for non-browser contexts.
 */
export function getSiteOrigin(): string {
  // Runtime: use actual domain (supports eliteparistransfer.com, parisluxejourney.com, etc.)
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  // Build/SSR fallback
  const envUrl = (
    import.meta.env?.VITE_PUBLIC_SITE_URL as string | undefined
  )?.trim();

  if (envUrl) {
    try {
      return new URL(envUrl).origin;
    } catch {
      return envUrl.replace(/\/+$/, "");
    }
  }

  return "https://eliteparistransfer.com";
}
