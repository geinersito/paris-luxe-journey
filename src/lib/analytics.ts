type AnalyticsEventName =
  | "cta_click"
  | "whatsapp_click"
  | "form_start"
  | "form_submit";

type AnalyticsParams = Record<
  string,
  string | number | boolean | null | undefined
>;

const SUPPORTED_LOCALES = new Set(["en", "es", "fr", "pt"]);
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const cleanParams = (params: AnalyticsParams): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );

const getLocaleFromPath = (pathname: string): string | undefined => {
  const [firstSegment] = pathname.split("/").filter(Boolean);
  if (!firstSegment) return undefined;

  const normalized = firstSegment.toLowerCase();
  return SUPPORTED_LOCALES.has(normalized) ? normalized : undefined;
};

const getLocaleFromDocument = (): string | undefined => {
  if (typeof document === "undefined") return undefined;

  const htmlLang = document.documentElement.lang?.toLowerCase();
  if (!htmlLang) return undefined;

  const normalized = htmlLang.split("-")[0];
  return SUPPORTED_LOCALES.has(normalized) ? normalized : undefined;
};

const getLocale = (): string => {
  if (typeof window === "undefined") return "unknown";

  return (
    getLocaleFromDocument() ??
    getLocaleFromPath(window.location.pathname) ??
    "unknown"
  );
};

const getUtmParams = (): AnalyticsParams => {
  if (typeof window === "undefined") return {};

  const search = new URLSearchParams(window.location.search);
  const utmParams: AnalyticsParams = {};

  for (const key of UTM_KEYS) {
    const value = search.get(key);
    if (value) utmParams[key] = value;
  }

  return utmParams;
};

const getDefaultPlacement = (eventName: AnalyticsEventName): string => {
  if (eventName === "form_start" || eventName === "form_submit") {
    return "contact_section";
  }
  if (eventName === "whatsapp_click") return "floating_button";
  return "unspecified";
};

const enrichEventParams = (
  eventName: AnalyticsEventName,
  params: AnalyticsParams,
): Record<string, unknown> => {
  const explicitParams = cleanParams(params);
  const destination =
    typeof explicitParams.destination === "string"
      ? explicitParams.destination
      : undefined;

  const baseParams = cleanParams({
    locale: getLocale(),
    placement: getDefaultPlacement(eventName),
    href:
      destination ??
      (typeof window === "undefined"
        ? undefined
        : `${window.location.pathname}${window.location.search}`),
  });

  return {
    ...baseParams,
    ...getUtmParams(),
    ...explicitParams,
  };
};

export const trackEvent = (
  eventName: AnalyticsEventName,
  params: AnalyticsParams = {},
): void => {
  if (typeof window === "undefined") return;

  const payload = enrichEventParams(eventName, params);
  const dataLayerPayload = { event: eventName, ...payload };

  const pushedToDataLayer = Array.isArray(window.dataLayer)
    ? (window.dataLayer.push(dataLayerPayload), true)
    : false;

  const sentToGtag =
    typeof window.gtag === "function"
      ? (window.gtag("event", eventName, payload), true)
      : false;

  if (!pushedToDataLayer && !sentToGtag && import.meta.env.DEV) {
    console.debug("[analytics:no-op]", dataLayerPayload);
  }
};
