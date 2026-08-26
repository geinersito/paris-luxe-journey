// BOOKING-RESERVATION-FEE-05 — create-reservation-fee-session
// Called from paris-dispatcher ERP (authenticated session).
// Creates a Stripe Custom Checkout Session for 10% reservation fee.
// Sends payment link by email via Resend.
// Idempotency: if active session exists, returns it without creating a new one.
// No status mutation here — that belongs to BOOKING-RESERVATION-FEE-WEBHOOK-06.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@13.10.0";
import { Resend } from "npm:resend@2.0.0";

const SUPABASE_URL              = Deno.env.get("SUPABASE_URL") ?? "";
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

  // --- Auth: verify caller is an authenticated ERP user ---
  const authHeader = req.headers.get("Authorization") ?? "";
  const jwt = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!jwt) return json({ error: "Unauthorized" }, 401);

  const adminSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error: authErr } = await adminSupabase.auth.getUser(jwt);
  if (authErr || !user) return json({ error: "Unauthorized" }, 401);

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

  // --- Load booking request ---
  const { data: booking, error: dbErr } = await adminSupabase
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

  // Idempotency: reuse active session if it exists
  if (booking.stripe_checkout_session_id) {
    try {
      const existing = await stripe.checkout.sessions.retrieve(booking.stripe_checkout_session_id);
      if (existing.status === "open") {
        return json({
          checkout_url: existing.url,
          stripe_session_id: existing.id,
          fee_amount_cents: feeAmountCents,
          reused: true,
        });
      }
      if (existing.status === "complete") {
        return json({ error: "Reservation fee already paid for this booking" }, 409);
      }
      // expired → fall through to create a new session
    } catch {
      // Stripe session not found → create new one
    }
  }

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create({
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
  });

  if (!session.url) return json({ error: "Stripe did not return a checkout URL" }, 500);

  // Persist session ID + URL + quote amount
  await adminSupabase
    .from("public_booking_requests")
    .update({
      stripe_checkout_session_id: session.id,
      stripe_checkout_url: session.url,
      quote_amount_cents,
    })
    .eq("id", booking_request_id);

  // Send email via Resend (non-fatal on failure)
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
    fee_amount_cents: feeAmountCents,
    reused: false,
  });
});
