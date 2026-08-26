// BOOKING-RESERVATION-FEE-WEBHOOK-06 — stripe-reservation-webhook
// Receives Stripe checkout.session.completed events.
// Mutates public_booking_requests.status → fee_paid.
// ONLY this function may set fee_paid status. Not the UI. Not create-reservation-fee-session.
// Idempotency: .eq("status","approved_pending_fee") guard — safe to replay, 0 rows updated = no-op.
// Signature: STRIPE_WEBHOOK_SECRET must be the secret for THIS endpoint (not the general webhook).

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@13.10.0";

const SUPABASE_URL              = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const STRIPE_SECRET_KEY         = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const STRIPE_WEBHOOK_SECRET     = Deno.env.get("STRIPE_RESERVATION_WEBHOOK_SECRET") ?? "";

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

  // Ignore all events except checkout.session.completed
  if (event.type !== "checkout.session.completed") {
    return json({ received: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const bookingRequestId = session.metadata?.booking_request_id;
  const feeType          = session.metadata?.fee_type;

  // Guard: only process sessions explicitly created by create-reservation-fee-session.
  // Any other Checkout Session (future flows, test sessions, etc.) must not mutate booking status.
  if (feeType !== "reservation_fee" || !bookingRequestId) {
    console.warn("[stripe-reservation-webhook] skipping session — fee_type:", feeType, "booking_request_id:", bookingRequestId, "session:", session.id);
    return json({ received: true, skipped: "not_a_reservation_fee_session" });
  }

  const adminSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Idempotent transition: approved_pending_fee → fee_paid
  // If status is already fee_paid or converted, .eq guard matches 0 rows — UPDATE is a no-op.
  const { error: dbErr } = await adminSupabase
    .from("public_booking_requests")
    .update({ status: "fee_paid" })
    .eq("id", bookingRequestId)
    .eq("status", "approved_pending_fee");

  if (dbErr) {
    // Return 500 so Stripe retries — this is a transient infrastructure error
    console.error("[stripe-reservation-webhook] DB update failed:", dbErr);
    return json({ error: dbErr.message }, 500);
  }

  console.log("[stripe-reservation-webhook] fee_paid set — booking:", bookingRequestId, "session:", session.id);
  return json({ received: true, booking_request_id: bookingRequestId });
});
