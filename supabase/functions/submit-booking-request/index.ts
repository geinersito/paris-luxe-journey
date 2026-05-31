import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingRequestPayload {
  customer_name?: string;
  customer_email: string;
  customer_phone?: string;
  pickup: string;
  dropoff: string;
  pickup_date: string;
  pickup_time: string;
  return_date?: string;
  return_time?: string;
  passengers?: number;
  luggage?: string;
  trip_type?: string;
  notes?: string;
  language?: string;
  source_path?: string;
}

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

// --- Validation helpers ---

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;
const MAX_TEXT = 500;
const MAX_NAME = 150;

function validatePayload(p: BookingRequestPayload): string | null {
  if (!p.customer_email?.trim()) return "customer_email is required";
  if (!EMAIL_RE.test(p.customer_email.trim())) return "customer_email is invalid";
  if (p.customer_email.length > MAX_NAME) return "customer_email too long";

  if (!p.pickup?.trim()) return "pickup is required";
  if (!p.dropoff?.trim()) return "dropoff is required";
  if (p.pickup.length > MAX_TEXT || p.dropoff.length > MAX_TEXT)
    return "pickup/dropoff too long";

  if (!p.pickup_date?.trim()) return "pickup_date is required";
  if (!DATE_RE.test(p.pickup_date)) return "pickup_date must be YYYY-MM-DD";

  if (!p.pickup_time?.trim()) return "pickup_time is required";
  if (!TIME_RE.test(p.pickup_time)) return "pickup_time must be HH:MM";

  // Reject dates in the past (UTC day comparison)
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const requestedDate = new Date(p.pickup_date + "T00:00:00Z");
  if (requestedDate < today) return "pickup_date cannot be in the past";

  if (p.customer_name && p.customer_name.length > MAX_NAME)
    return "customer_name too long";
  if (p.customer_phone && p.customer_phone.length > 30)
    return "customer_phone too long";
  if (p.notes && p.notes.length > MAX_TEXT) return "notes too long";

  return null;
}

// --- Telegram ---

function shortId(uuid: string): string {
  return uuid.replace(/-/g, "").substring(0, 8).toUpperCase();
}

function formatTelegramMessage(
  req: BookingRequestPayload,
  id: string
): string {
  const lines: string[] = [];
  lines.push("🆕 *Nouvelle demande — eliteparistransfer.com*");
  lines.push("");

  if (req.customer_name) lines.push(`👤 ${req.customer_name}`);
  lines.push(`📧 ${req.customer_email}`);
  if (req.customer_phone) lines.push(`📱 ${req.customer_phone}`);
  lines.push("");

  lines.push(`🚗 ${req.pickup} → ${req.dropoff}`);
  const tripLabel =
    req.trip_type === "round_trip" ? "Aller-retour" : "Aller simple";
  lines.push(`🔁 ${tripLabel}`);
  lines.push(`📅 ${req.pickup_date} à ${req.pickup_time}`);
  if (req.return_date && req.return_time) {
    lines.push(`↩️ Retour: ${req.return_date} à ${req.return_time}`);
  }
  lines.push("");

  if (req.passengers) lines.push(`👥 ${req.passengers} pax`);
  if (req.luggage && req.luggage !== "none") lines.push(`🧳 ${req.luggage}`);
  if (req.language) lines.push(`🌐 ${req.language.toUpperCase()}`);
  if (req.notes) lines.push(`📝 ${req.notes}`);

  lines.push("");
  lines.push(`🆔 Ref: \`${shortId(id)}\``);

  return lines.join("\n");
}

async function sendTelegram(text: string): Promise<{ ok: boolean; error?: string }> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return { ok: false, error: "TELEGRAM_BOT_TOKEN or TELEGRAM_ALLOWED_CHAT_ID not configured" };
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: "Markdown",
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    return { ok: false, error: `Telegram API ${res.status}: ${errBody}` };
  }
  return { ok: true };
}

// --- Handler ---

const handler = async (req: Request): Promise<Response> => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // POST only
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let payload: BookingRequestPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Validate
  const validationError = validatePayload(payload);
  if (validationError) {
    return new Response(
      JSON.stringify({ error: validationError }),
      { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Insert via service_role (bypasses RLS — no anon INSERT policy exists)
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data, error: dbError } = await supabase
    .from("public_booking_requests")
    .insert({
      customer_name: payload.customer_name?.trim() || null,
      customer_email: payload.customer_email.trim(),
      customer_phone: payload.customer_phone?.trim() || null,
      pickup: payload.pickup.trim(),
      dropoff: payload.dropoff.trim(),
      pickup_date: payload.pickup_date,
      pickup_time: payload.pickup_time,
      return_date: payload.return_date || null,
      return_time: payload.return_time || null,
      passengers: payload.passengers ?? null,
      luggage: payload.luggage || null,
      trip_type: payload.trip_type || "one_way",
      notes: payload.notes?.trim() || null,
      language: payload.language || null,
      source_path: payload.source_path || null,
      status: "pending_review",
    })
    .select("id")
    .single();

  if (dbError) {
    console.error("[submit-booking-request] DB insert error:", dbError);
    return new Response(
      JSON.stringify({ error: "Failed to save booking request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const id: string = data.id;

  // Telegram notification: non-blocking on the response, but failure is logged.
  // DB insert is source of truth — a Telegram failure does NOT cancel the request.
  const tgResult = await sendTelegram(formatTelegramMessage(payload, id)).catch(
    (err): { ok: boolean; error: string } => ({
      ok: false,
      error: String(err),
    })
  );

  if (!tgResult.ok) {
    // Log for ops visibility but do not fail the request
    console.error("[submit-booking-request] Telegram notification failed (non-fatal):", tgResult.error);
  }

  return new Response(
    JSON.stringify({ success: true, id }),
    { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
};

serve(handler);
