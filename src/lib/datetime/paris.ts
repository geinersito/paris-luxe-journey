/**
 * Paris timezone utilities
 * SSOT for all user-facing date/time displays
 */

export const PARIS_TZ = "Europe/Paris" as const;

/**
 * Safely convert input to Date object
 */
function toDate(input: string | number | Date): Date {
  if (input instanceof Date) {
    return input;
  }
  return new Date(input);
}

/**
 * Format date/time for display in Paris timezone
 * Preserves user's locale preference while enforcing Europe/Paris timeZone
 */
export function formatParisDateTime(
  input: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = toDate(input);
  const mergedOptions: Intl.DateTimeFormatOptions = {
    ...options,
    timeZone: PARIS_TZ,
  };

  return date.toLocaleString(undefined, mergedOptions);
}

/**
 * Format date only (no time) for display in Paris timezone
 * Preserves user's locale preference while enforcing Europe/Paris timeZone
 */
export function formatParisDate(
  input: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = toDate(input);
  const mergedOptions: Intl.DateTimeFormatOptions = {
    ...options,
    timeZone: PARIS_TZ,
  };

  return date.toLocaleDateString(undefined, mergedOptions);
}

/**
 * Format date with specific locale in Paris timezone
 * Use when you need to override the user's locale
 */
export function formatParisDateWithLocale(
  input: string | number | Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = toDate(input);
  const mergedOptions: Intl.DateTimeFormatOptions = {
    ...options,
    timeZone: PARIS_TZ,
  };

  return date.toLocaleDateString(locale, mergedOptions);
}
