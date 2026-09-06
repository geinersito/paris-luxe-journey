// BOOKING-RESERVATION-FEE-WEBHOOK-06 — stripe-reservation-webhook
// Receives Stripe checkout.session.completed / async_payment_succeeded /
// async_payment_failed events. Mutates public_booking_requests.status →
// fee_paid, and ONLY fee_paid — never 'rejected', regardless of event.
// ONLY this function may set fee_paid status. Not the UI. Not
// create-reservation-fee-session.
// Idempotency: .eq("status","approved_pending_fee") guard — safe to replay,
// 0 rows updated = no-op.
// Signature: STRIPE_WEBHOOK_SECRET must be the secret for THIS endpoint (not
// the general webhook).
//
// SECURITY-RESERVATION-FEE-HARDENING-01 (R1): checkout.session.completed
// alone does NOT imply payment — deferred/asynchronous payment methods can
// fire it with payment_status='unpaid', with the real confirmation arriving
// later as checkout.session.async_payment_succeeded. This handler now checks
// session.payment_status === 'paid' explicitly before ever writing fee_paid,
// listens for the async event too, and treats async_payment_failed as
// observability only (never a status mutation). It also refuses to confirm a
// session that is no longer the CURRENT session on record for the booking
// (superseded by create-reservation-fee-session's replace-on-price-change
// path) or whose paid amount doesn't match the current DB quote — those are
// left for reconciliation, not auto-confirmed.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@13.10.0";
import { evaluateFeeConfirmation, type BookingSnapshot, type WebhookSessionInfo } from "../_shared/reservationFee.ts";
import { getAdminApiKey } from "../_shared/adminClient.ts";

const SUPABASE_URL              = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_ADMIN_KEY        = getAdminApiKey() ?? "";
const STRIPE_SECRET_KEY         = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const STRIPE_WEBHOOK_SECRET     = Deno.env.get("STRIPE_RESERVATION_WEBHOOK_SECRET") ?? "";

const HANDLED_EVENTS = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
]);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing stripe-signature header", { status: 400 });

  if (!STRIPE_SECRET_KEY)     return json({ error: "STRIPE_SECRET_KEY not configured" }, 500);
  if (!STRIPE_WEBHOOK_SECRET) return json({ error: "STRIPE_RESERVATION_WEBHOOK_SECRET not configured" }, 500);

  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
    httpClient: Stripe.createFetchHttpClient(),
  });

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe-reservation-webhook] Signature verification failed:", err);
    return new Response(
      `Webhook signature verification failed: ${err instanceof Error ? err.message : String(err)}`,
      { status: 400 },
    );
  }

  if (!HANDLED_EVENTS.has(event.type)) {
    return json({ received: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const sessionInfo: WebhookSessionInfo = {
    eventType: event.type as WebhookSessionInfo["eventType"],
    paymentStatus: session.payment_status,
    sessionId: session.id,
    amountTotal: session.amount_total ?? null,
    metadata: {
      booking_request_id: session.metadata?.booking_request_id,
      fee_type: session.metadata?.fee_type,
      quote_amount_cents: session.metadata?.quote_amount_cents,
      fee_amount_cents: session.metadata?.fee_amount_cents,
    },
  };

  // First pass: type/fee_type check doesn't need the booking loaded yet.
  if (sessionInfo.metadata.fee_type !== "reservation_fee" || !sessionInfo.metadata.booking_request_id) {
    console.warn("[stripe-reservation-webhook] skipping session — not a reservation_fee session:", session.id);
    return json({ received: true, skipped: "not_a_reservation_fee_session" });
  }

  const bookingRequestId = sessionInfo.metadata.booking_request_id;
  const adminSupabase = createClient(SUPABASE_URL, SUPABASE_ADMIN_KEY);

  const { data: bookingRow, error: fetchErr } = await adminSupabase
    .from("public_booking_requests")
    .select("stripe_checkout_session_id, quote_amount_cents, status")
    .eq("id", bookingRequestId)
    .maybeSingle();

  const booking: BookingSnapshot | null = bookingRow
    ? {
        currentSessionId: bookingRow.stripe_checkout_session_id,
        quoteAmountCents: bookingRow.quote_amount_cents,
        status: bookingRow.status,
      }
    : null;

  if (fetchErr) {
    // Transient infra error reading our own DB — 500 so Stripe retries.
    console.error("[stripe-reservation-webhook] failed to load booking:", fetchErr);
    return json({ error: fetchErr.message }, 500);
  }

  const decision = evaluateFeeConfirmation(sessionInfo, booking);

  // evaluateFeeConfirmation only ever returns "confirm" when `booking` is
  // non-null and `booking.quoteAmountCents` is non-null (see its own guards)
  // — capture that narrowing once, here, instead of asserting it again below.
  let expectedQuoteAmountCents: number;

  switch (decision.action) {
    case "noted_failed":
      console.warn("[stripe-reservation-webhook] async payment failed (observability only, no status change):", {
        bookingRequestId,
        session: session.id,
      });
      return json({ received: true, noted: "async_payment_failed", booking_request_id: bookingRequestId });

    case "wait":
      console.log("[stripe-reservation-webhook] awaiting async payment confirmation:", {
        bookingRequestId,
        session: session.id,
        reason: decision.reason,
      });
      return json({ received: true, status: "awaiting_payment" });

    case "skip":
      console.warn("[stripe-reservation-webhook] skipping — not confirming fee_paid:", {
        bookingRequestId,
        session: session.id,
        reason: decision.reason,
      });
      return json({ received: true, skipped: decision.reason });

    case "confirm":
      expectedQuoteAmountCents = booking!.quoteAmountCents!;
      break;
  }

  // Idempotent, atomic transition: approved_pending_fee → fee_paid.
  // The WHERE clause is a compare-and-swap against exactly the snapshot
  // `decision` was computed from (status + current session + quote) — not
  // just status. Without the session/quote in the WHERE itself, a session
  // replacement landing between our earlier SELECT and this UPDATE could
  // let an already-superseded session confirm the booking anyway
  // (check-then-act, not atomic). If status is already fee_paid/converted,
  // or the session/quote changed since we checked, this UPDATE matches 0
  // rows — safe no-op, left for reconciliation rather than reported as
  // success.
  const { data: updatedRow, error: dbErr } = await adminSupabase
    .from("public_booking_requests")
    .update({ status: "fee_paid" })
    .eq("id", bookingRequestId)
    .eq("status", "approved_pending_fee")
    .eq("stripe_checkout_session_id", session.id)
    .eq("quote_amount_cents", expectedQuoteAmountCents)
    .select("id")
    .maybeSingle();

  if (dbErr) {
    // Return 500 so Stripe retries — this is a transient infrastructure error
    console.error("[stripe-reservation-webhook] DB update failed:", dbErr);
    return json({ error: dbErr.message }, 500);
  }

  if (!updatedRow) {
    console.warn("[stripe-reservation-webhook] CAS mismatch at write time — booking changed between check and write, leaving for reconciliation", {
      bookingRequestId,
      session: session.id,
    });
    return json({ received: true, skipped: "cas_mismatch_at_write_time" });
  }

  console.log("[stripe-reservation-webhook] fee_paid set — booking:", bookingRequestId, "session:", session.id);
  return json({ received: true, booking_request_id: bookingRequestId });
});
