export interface OpenAgendaEvent {
  uid: number;
  slug?: string;
  title?: Record<string, string>;
  description?: Record<string, string>;
  longDescription?: Record<string, string>;
  image?: { base?: string; thumb?: { url?: string } };
  location?: {
    name?: string;
    address?: string;
    city?: string;
    department?: string;
    postalCode?: string;
    timezone?: string;
  };
  keywords?: Record<string, string[]>;
  category?: Array<{ id: number; name: Record<string, string> }>;
  timings?: Array<{ begin: string; end: string }>;
  firstDate?: string;
  lastDate?: string;
  status?: number; // 1=confirmed, 0=cancelled, 2=postponed
  updatedAt?: string;
  createdAt?: string;
  links?: Array<{ link: string }>;
  originAgenda?: { uid: number; title: string };
}

export interface NormalizedEventData {
  external_event_id: string;
  source_updated_at: string | null;
  title: string;
  description: string | null;
  category: string | null;
  organizer_name: string | null;
  venue_name: string | null;
  venue_address: string | null;
  city: string;
  district: string | null;
  country_code: string;
  start_at: string;
  end_at: string | null;
  timezone: string;
  event_url: string;
  image_url: string | null;
  event_status: "scheduled" | "cancelled" | "postponed" | "unknown";
  validation_status: "valid" | "needs_review" | "rejected";
  validation_errors: string[];
}

function pickText(
  obj: Record<string, string> | undefined,
  langs = ["fr", "en"],
): string | null {
  if (!obj) return null;
  for (const lang of langs) {
    const val = obj[lang];
    if (val && val.trim()) return val.trim();
  }
  const values = Object.values(obj).filter((v) => v?.trim());
  return values[0]?.trim() ?? null;
}

export function mapOpenAgendaEvent(
  event: OpenAgendaEvent,
  sourceUrl: string,
  sourceName: string,
): NormalizedEventData {
  const errors: string[] = [];

  const title = pickText(event.title);
  if (!title) errors.push("missing_title");

  const startAt = event.timings?.[0]?.begin ?? event.firstDate ?? null;
  if (!startAt) errors.push("missing_start_at");

  const lastTiming = event.timings?.[event.timings.length - 1];
  const endAt = lastTiming?.end ?? event.lastDate ?? null;

  const eventUrl = event.slug
    ? `${sourceUrl.replace(/\/$/, "")}/events/${event.slug}`
    : sourceUrl;

  const imageUrl = event.image?.base ?? event.image?.thumb?.url ?? null;

  const eventStatus: NormalizedEventData["event_status"] =
    event.status === 0
      ? "cancelled"
      : event.status === 2
        ? "postponed"
        : event.status === 1
          ? "scheduled"
          : "unknown";

  let category: string | null = null;
  if (event.category?.length) {
    category = pickText(event.category[0].name);
  } else if (event.keywords) {
    const kws = event.keywords["fr"] ?? event.keywords["en"] ?? [];
    category = kws[0] ?? null;
  }

  const description =
    pickText(event.description) ?? pickText(event.longDescription) ?? null;

  const validationStatus: NormalizedEventData["validation_status"] =
    errors.length > 0 ? "needs_review" : "valid";

  return {
    external_event_id: String(event.uid),
    source_updated_at: event.updatedAt ?? null,
    title: title ?? `Event ${event.uid}`,
    description,
    category,
    organizer_name: sourceName,
    venue_name: event.location?.name ?? null,
    venue_address: event.location?.address ?? null,
    city: event.location?.city ?? "Paris",
    district: event.location?.department ?? null,
    country_code: "FR",
    start_at: startAt ?? new Date().toISOString(),
    end_at: endAt ?? null,
    timezone: "Europe/Paris",
    event_url: eventUrl,
    image_url: imageUrl,
    event_status: eventStatus,
    validation_status: validationStatus,
    validation_errors: errors,
  };
}

export async function hashPayload(payload: unknown): Promise<string> {
  const text = JSON.stringify(payload);
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
