type AnalyticsEventName =
  | "cta_click"
  | "whatsapp_click"
  | "form_start"
  | "form_submit";

type AnalyticsParams = Record<
  string,
  string | number | boolean | null | undefined
>;

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

export const trackEvent = (
  eventName: AnalyticsEventName,
  params: AnalyticsParams = {},
): void => {
  if (typeof window === "undefined") return;

  const payload = cleanParams(params);
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
