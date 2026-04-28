import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  type OpenAgendaEvent,
  hashPayload,
  mapOpenAgendaEvent,
} from "./mapper.ts";

const MAX_PAGES = 50;
const PAGE_SIZE = 100;

interface Source {
  id: string;
  provider: string;
  source_slug: string;
  external_source_id: string;
  source_name: string;
  source_url: string;
  api_base_url: string;
  fetch_window_days: number;
}

interface RunSummary {
  source_slug: string;
  run_id: string;
  status: string;
  fetched: number;
  inserted_raw: number;
  upserted_normalized: number;
  promoted_published: number;
  rejected: number;
  error?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const openAgendaKey = Deno.env.get("OPENAGENDA_API_KEY");

  if (!openAgendaKey) {
    return json({ error: "OPENAGENDA_API_KEY secret not set" }, 500);
  }

  const db = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  let sourceSlugFilter: string | null = null;
  try {
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      sourceSlugFilter = body?.source_slug ?? null;
    }
  } catch (_) {
    // ignore
  }

  let query = db
    .from("content_event_sources")
    .select("*")
    .eq("enabled", true)
    .eq("provider", "openagenda");

  if (sourceSlugFilter) {
    query = query.eq("source_slug", sourceSlugFilter);
  }

  const { data: sources, error: srcErr } = await query;
  if (srcErr) return json({ error: srcErr.message }, 500);
  if (!sources?.length) return json({ message: "no enabled sources found", summaries: [] });

  const summaries: RunSummary[] = [];

  for (const source of sources as Source[]) {
    const summary = await syncSource(db, source, openAgendaKey);
    summaries.push(summary);
  }

  const anyFailed = summaries.some((s) => s.status === "failed");
  return json({ summaries }, anyFailed ? 207 : 200);
});

async function syncSource(
  db: ReturnType<typeof createClient>,
  source: Source,
  apiKey: string,
): Promise<RunSummary> {
  const { data: runRow, error: runErr } = await db
    .from("content_event_ingest_runs")
    .insert({
      source_id: source.id,
      trigger_kind: "cron",
      mode: "evergreen",
      status: "running",
      window_start_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (runErr || !runRow) {
    return {
      source_slug: source.source_slug,
      run_id: "unknown",
      status: "failed",
      fetched: 0,
      inserted_raw: 0,
      upserted_normalized: 0,
      promoted_published: 0,
      rejected: 0,
      error: runErr?.message ?? "failed to create run",
    };
  }

  const runId = runRow.id as string;
  const summary: RunSummary = {
    source_slug: source.source_slug,
    run_id: runId,
    status: "running",
    fetched: 0,
    inserted_raw: 0,
    upserted_normalized: 0,
    promoted_published: 0,
    rejected: 0,
  };

  try {
    const windowStart = new Date();
    windowStart.setDate(windowStart.getDate() - 1); // include yesterday
    const windowEnd = new Date();
    windowEnd.setDate(windowEnd.getDate() + source.fetch_window_days);

    const dateFrom = windowStart.toISOString().split("T")[0];
    const dateTo = windowEnd.toISOString().split("T")[0];

    let afterCursor: unknown = undefined;
    let pageCount = 0;

    while (pageCount < MAX_PAGES) {
      const url = buildApiUrl(
        source.api_base_url,
        source.external_source_id,
        apiKey,
        dateFrom,
        dateTo,
        afterCursor,
      );

      const res = await fetch(url);
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`OpenAgenda API error ${res.status}: ${body.slice(0, 200)}`);
      }

      const data = await res.json();
      const events: OpenAgendaEvent[] = data.events ?? [];
      pageCount++;
      summary.fetched += events.length;

      for (const event of events) {
        await processEvent(db, source, runId, event, summary);
      }

      afterCursor = data.after ?? null;
      if (!afterCursor || events.length === 0) break;
    }

    await promotePublished(db, source.id, runId, summary);

    summary.status = summary.rejected > 0 && summary.inserted_raw === 0
      ? "partial"
      : "succeeded";

    await db.from("content_event_ingest_runs").update({
      status: summary.status,
      finished_at: new Date().toISOString(),
      window_end_at: new Date().toISOString(),
      fetched_count: summary.fetched,
      inserted_raw_count: summary.inserted_raw,
      upserted_normalized_count: summary.upserted_normalized,
      promoted_published_count: summary.promoted_published,
      rejected_count: summary.rejected,
    }).eq("id", runId);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    summary.status = "failed";
    summary.error = msg;
    await db.from("content_event_ingest_runs").update({
      status: "failed",
      finished_at: new Date().toISOString(),
      fetched_count: summary.fetched,
      inserted_raw_count: summary.inserted_raw,
      upserted_normalized_count: summary.upserted_normalized,
      promoted_published_count: summary.promoted_published,
      rejected_count: summary.rejected,
      error_summary: [{ message: msg }],
    }).eq("id", runId);
  }

  return summary;
}

async function processEvent(
  db: ReturnType<typeof createClient>,
  source: Source,
  runId: string,
  event: OpenAgendaEvent,
  summary: RunSummary,
): Promise<void> {
  const payloadHash = await hashPayload(event);

  const eventUrl = event.slug
    ? `${source.source_url.replace(/\/$/, "")}/events/${event.slug}`
    : source.source_url;

  const rawTitle =
    event.title?.fr ??
    event.title?.en ??
    Object.values(event.title ?? {})[0] ??
    `Event ${event.uid}`;

  const { data: rawRow, error: rawErr } = await db
    .from("content_event_raw")
    .insert({
      source_id: source.id,
      run_id: runId,
      external_event_id: String(event.uid),
      source_event_url: eventUrl,
      source_created_at: event.createdAt ?? null,
      source_updated_at: event.updatedAt ?? null,
      start_at: event.timings?.[0]?.begin ?? event.firstDate ?? null,
      end_at:
        event.timings?.[event.timings.length - 1]?.end ??
        event.lastDate ??
        null,
      title: rawTitle,
      payload_hash: payloadHash,
      payload: event,
      fetched_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (rawErr) {
    // unique constraint (source_id, external_event_id, payload_hash) = same payload, no change
    if (rawErr.code !== "23505") {
      summary.rejected++;
      console.warn("[sync-events] raw insert error", rawErr.message);
    }
    return;
  }
  summary.inserted_raw++;

  const normalized = mapOpenAgendaEvent(event, source.source_url, source.source_name);

  const { error: normErr } = await db
    .from("content_event_normalized")
    .upsert(
      {
        source_id: source.id,
        external_event_id: normalized.external_event_id,
        latest_raw_id: rawRow.id,
        last_run_id: runId,
        source_updated_at: normalized.source_updated_at,
        last_seen_at: new Date().toISOString(),
        title: normalized.title,
        description: normalized.description,
        category: normalized.category,
        organizer_name: normalized.organizer_name,
        venue_name: normalized.venue_name,
        venue_address: normalized.venue_address,
        city: normalized.city,
        district: normalized.district,
        country_code: normalized.country_code,
        start_at: normalized.start_at,
        end_at: normalized.end_at,
        timezone: normalized.timezone,
        event_url: normalized.event_url,
        image_url: normalized.image_url,
        source_name: source.source_name,
        source_url: source.source_url,
        event_status: normalized.event_status,
        validation_status: normalized.validation_status,
        validation_errors: normalized.validation_errors,
        normalized_payload: event,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "source_id,external_event_id",
        ignoreDuplicates: false,
      },
    );

  if (normErr) {
    summary.rejected++;
    console.warn("[sync-events] normalized upsert error", normErr.message);
    return;
  }
  summary.upserted_normalized++;
}

async function promotePublished(
  db: ReturnType<typeof createClient>,
  sourceId: string,
  runId: string,
  summary: RunSummary,
): Promise<void> {
  const { data: candidates } = await db
    .from("content_event_normalized")
    .select("id, external_event_id, title, description, category, organizer_name, venue_name, venue_address, city, district, start_at, end_at, timezone, event_url, image_url, source_name, source_url")
    .eq("source_id", sourceId)
    .eq("promote_to_published", true)
    .eq("validation_status", "valid")
    .is("archived_at", null);

  if (!candidates?.length) return;

  for (const row of candidates) {
    const { error } = await db.from("content_event_published").upsert(
      {
        normalized_id: row.id,
        published_from_run_id: runId,
        source_id: sourceId,
        external_event_id: row.external_event_id,
        title: row.title,
        short_summary: row.description ?? null,
        category: row.category ?? null,
        organizer_name: row.organizer_name ?? null,
        venue_name: row.venue_name ?? null,
        venue_address: row.venue_address ?? null,
        city: row.city ?? "Paris",
        district: row.district ?? null,
        start_at: row.start_at,
        end_at: row.end_at ?? null,
        timezone: row.timezone ?? "Europe/Paris",
        event_url: row.event_url,
        source_name: row.source_name,
        source_url: row.source_url,
        image_url: row.image_url ?? null,
        publish_status: "published",
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "normalized_id",
        ignoreDuplicates: false,
      },
    );

    if (error) {
      console.warn("[sync-events] publish upsert error", error.message);
      summary.rejected++;
    } else {
      summary.promoted_published++;
    }
  }
}

function buildApiUrl(
  apiBase: string,
  agendaUid: string,
  apiKey: string,
  dateFrom: string,
  dateTo: string,
  after: unknown,
): string {
  const base = apiBase.replace(/\/$/, "");
  const params = new URLSearchParams({
    key: apiKey,
    size: String(PAGE_SIZE),
    "timings[gte]": `${dateFrom}T00:00:00`,
    "timings[lte]": `${dateTo}T23:59:59`,
    includeLabels: "1",
    detailed: "1",
  });
  if (after !== undefined && after !== null) {
    params.set("after", JSON.stringify(after));
  }
  return `${base}/agendas/${agendaUid}/events?${params}`;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
