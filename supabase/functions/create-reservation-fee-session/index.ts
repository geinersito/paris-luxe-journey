// BOOKING-RESERVATION-FEE-05 — create-reservation-fee-session
// Called from paris-dispatcher ERP (authenticated session).
// Creates a Stripe Custom Checkout Session for 10% reservation fee.
// Sends payment link by email via Resend.
// No status mutation here — that belongs to BOOKING-RESERVATION-FEE-WEBHOOK-06.
//
// SECURITY-RESERVATION-FEE-HARDENING-01 (R4): authorization is checked using a
// Supabase client scoped to the CALLER's own JWT (not service_role), calling
// is_active_org_operator_backoffice() and loading the booking through RLS.
// service_role is used only afterward, for the financial columns that
// `authenticated` deliberately cannot write directly since
// SECURITY-BOOKING-REQUEST-AUTHZ-01 (PR A). A caller who is authenticated but
// not an operator-backoffice member of their active org (e.g. an RC Transport
// admin) gets 403 before touching Stripe or booking data at all.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@13.10.0";
import { Resend } from "npm:resend@2.0.0";
import { buildIdempotencyKey, decideSessionReuse, type ExistingSessionSnapshot } from "../_shared/reservationFee.ts";

const SUPABASE_URL              = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_ANON_KEY         = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const STRIPE_SECRET_KEY         = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const RESEND_API_KEY            = Deno.env.get("RESEND_API_KEY") ?? "";

const FROM_EMAIL = "Paris Elite Services <info@eliteparistransfer.com>";
const SITE_URL   = "https://eliteparistransfer.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// --- Email templates (EN / FR) ---

function emailSubject(lang: string | null): string {
  return lang === "fr"
    ? "Votre lien de réservation — Paris Elite Services"
    : "Your reservation link — Paris Elite Services";
}

function emailHtml(
  name: string | null,
  feeEuros: number,
  checkoutUrl: string,
  lang: string | null,
): string {
  const greeting = name ? (lang === "fr" ? `Bonjour ${name},` : `Hello ${name},`) : (lang === "fr" ? "Bonjour," : "Hello,");
  const feeStr = feeEuros.toFixed(2).replace(".", ",");

  if (lang === "fr") {
    return `
<p>${greeting}</p>
<p>Votre demande de chauffeur privé a bien été reçue. Pour confirmer votre réservation, nous vous invitons à régler les <strong>frais de réservation de ${feeStr} €</strong> (10 % du prix du trajet).</p>
<p style="margin:24px 0">
  <a href="${checkoutUrl}" style="background:#1a1a2e;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:600">
    Payer les frais de réservation →
  </a>
</p>
<p style="font-size:13px;color:#666">Ce lien est valable 24 heures. Aucun autre paiement ne vous sera demandé avant confirmation complète de votre service.</p>
<p style="font-size:13px;color:#666">Une question ? Répondez à cet email ou contactez-nous par WhatsApp.</p>
<p>Cordialement,<br>L'équipe Paris Elite Services</p>`;
  }

  return `
<p>${greeting}</p>
<p>Your private chauffeur request has been received. To confirm your booking, please pay the <strong>reservation fee of €${feeEuros.toFixed(2)}</strong> (10% of the total trip price).</p>
<p style="margin:24px 0">
  <a href="${checkoutUrl}" style="background:#1a1a2e;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:600">
    Pay reservation fee →
  </a>
</p>
<p style="font-size:13px;color:#666">This link is valid for 24 hours. No further payment will be requested before your service is fully confirmed.</p>
<p style="font-size:13px;color:#666">Any questions? Reply to this email or contact us on WhatsApp.</p>
<p>Best regards,<br>The Paris Elite Services team</p>`;
}

// --- Handler ---

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  // --- Auth: verify caller has a valid JWT ---
  const authHeader = req.headers.get("Authorization") ?? "";
  const jwt = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!jwt) return json({ error: "Unauthorized" }, 401);

  const adminSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error: authErr } = await adminSupabase.auth.getUser(jwt);
  if (authErr || !user) return json({ error: "Unauthorized" }, 401);

  // --- Authorization: caller-scoped client, respects RLS as this specific
  //     user. Never use adminSupabase for this check — service_role bypasses
  //     RLS entirely and would silently defeat the whole point. ---
  if (!SUPABASE_ANON_KEY) return json({ error: "SUPABASE_ANON_KEY not configured" }, 500);
  const callerSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${jwt}` } },
  });

  const { data: authorized, error: authzErr } = await callerSupabase.rpc(
    "is_active_org_operator_backoffice",
  );
  if (authzErr || authorized !== true) {
    return json({ error: "Forbidden" }, 403);
  }

  // --- Parse body ---
  let body: { booking_request_id: string; quote_amount_cents: number };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const { booking_request_id, quote_amount_cents } = body;
  if (!booking_request_id) return json({ error: "booking_request_id is required" }, 400);
  if (!quote_amount_cents || quote_amount_cents < 100) {
    return json({ error: "quote_amount_cents must be at least 100 (€1.00)" }, 400);
  }

  // --- Load booking request THROUGH THE CALLER'S OWN RLS ---
  // A booking outside the caller's active org is invisible here (0 rows),
  // independent of the authorization check above — defense in depth, not a
  // redundant check: it also means loading always reflects exactly what this
  // caller is allowed to see, not what service_role can see.
  const { data: booking, error: dbErr } = await callerSupabase
    .from("public_booking_requests")
    .select("*")
    .eq("id", booking_request_id)
    .single();

  if (dbErr || !booking) return json({ error: "Booking request not found" }, 404);
  if (booking.status !== "approved_pending_fee") {
    return json({ error: `Booking status is '${booking.status}', expected 'approved_pending_fee'` }, 409);
  }

  const feeAmountCents = Math.ceil(quote_amount_cents * 0.1);

  // --- Stripe ---
  if (!STRIPE_SECRET_KEY) return json({ error: "STRIPE_SECRET_KEY not configured" }, 500);
  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

  const previousSessionId: string | null = booking.stripe_checkout_session_id ?? null;

  // --- Reuse / replace decision (R3) ---
  if (previousSessionId) {
    try {
      const existing = await stripe.checkout.sessions.retrieve(previousSessionId);
      const snapshot: ExistingSessionSnapshot = {
        status: existing.status ?? "expired",
        amountTotal: existing.amount_total ?? null,
        metadata: {
          booking_request_id: existing.metadata?.booking_request_id,
          fee_type: existing.metadata?.fee_type,
          quote_amount_cents: existing.metadata?.quote_amount_cents,
        },
      };
      const decision = decideSessionReuse(snapshot, {
        bookingRequestId: booking_request_id,
        quoteAmountCents: quote_amount_cents,
        feeAmountCents,
      });

      if (decision.action === "reuse") {
        return json({
          checkout_url: existing.url,
          stripe_session_id: existing.id,
          session_id: existing.id, // alias — BookingRequests.tsx reads data?.session_id
          fee_amount_cents: feeAmountCents,
          reused: true,
        });
      }

      if (decision.action === "already_paid") {
        return json({ error: "Reservation fee already paid for this booking" }, 409);
      }

      // decision.action === "replace": explicitly expire a still-open but
      // mismatched session so it can never be paid after we move on — never
      // leave two live sessions for the same booking.
      console.log("[create-reservation-fee-session] replacing existing session:", decision.reason);
      if (existing.status === "open") {
        try {
          await stripe.checkout.sessions.expire(existing.id);
        } catch (expireErr) {
          console.error("[create-reservation-fee-session] failed to expire stale session (non-fatal, proceeding)", expireErr);
        }
      }
    } catch (retrieveErr) {
      // Session id on file doesn't resolve on Stripe's side — treat as no
      // previous session, but keep its id for idempotency-key rotation below
      // (harmless even if Stripe never heard of it).
      console.warn("[create-reservation-fee-session] could not retrieve previous session, creating new one", retrieveErr);
    }
  }

  const idempotencyKey = buildIdempotencyKey(booking_request_id, quote_amount_cents, previousSessionId);

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      currency: "eur",
      customer_email: booking.customer_email,
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: {
            name: "Frais de réservation — Paris Elite Services",
            description: `${booking.pickup_date} · ${booking.pickup} → ${booking.dropoff}`,
          },
          unit_amount: feeAmountCents,
        },
        quantity: 1,
      }],
      metadata: {
        booking_request_id,
        fee_type: "reservation_fee",
        quote_amount_cents: String(quote_amount_cents),
        fee_amount_cents: String(feeAmountCents),
        customer_email: booking.customer_email,
      },
      success_url: `${SITE_URL}/?reservation=confirmed`,
      cancel_url:  `${SITE_URL}/?reservation=cancelled`,
    },
    { idempotencyKey },
  );

  if (!session.url) return json({ error: "Stripe did not return a checkout URL" }, 500);

  // --- Persist BEFORE communicating anything to the client (R2) ---
  // Financial columns are not authenticated-writable since PR A — this write
  // must use service_role. Check the error AND that a row actually changed;
  // "no error" alone is not proof of a successful write.
  const { data: updated, error: updateErr } = await adminSupabase
    .from("public_booking_requests")
    .update({
      stripe_checkout_session_id: session.id,
      stripe_checkout_url: session.url,
      quote_amount_cents,
    })
    .eq("id", booking_request_id)
    .select("id")
    .maybeSingle();

  if (updateErr || !updated) {
    console.error("[create-reservation-fee-session] local persistence failed after Stripe session created", {
      session_id: session.id,
      updateErr,
    });
    // Do NOT send the email — the client never learns a URL it can't recover
    // via retry. A retry with the same booking_request_id/quote_amount_cents
    // hits the same idempotency key and gets back this exact Stripe session,
    // then (if the earlier DB failure was transient) persists successfully.
    return json({
      error: "LOCAL_PERSIST_FAILED",
      message: "Stripe session created but could not be saved locally. Retry with the same parameters — the same Stripe session will be recovered via idempotency.",
    }, 500);
  }

  // Send email via Resend (non-fatal on failure) — only after confirmed persistence
  if (RESEND_API_KEY) {
    try {
      const resend = new Resend(RESEND_API_KEY);
      const feeEuros = feeAmountCents / 100;
      await resend.emails.send({
        from: FROM_EMAIL,
        to: booking.customer_email,
        subject: emailSubject(booking.language),
        html: emailHtml(booking.customer_name, feeEuros, session.url, booking.language),
      });
    } catch (emailErr) {
      console.error("[create-reservation-fee-session] Resend error (non-fatal):", emailErr);
    }
  }

  return json({
    checkout_url: session.url,
    stripe_session_id: session.id,
    session_id: session.id, // alias — BookingRequests.tsx reads data?.session_id
    fee_amount_cents: feeAmountCents,
    reused: false,
  });
});
