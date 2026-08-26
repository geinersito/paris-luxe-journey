// Pure decision logic for the reservation-fee flow (create-reservation-fee-session
// + stripe-reservation-webhook), extracted so it's testable without a live Stripe
// account or Supabase project. No Deno/HTTP/Stripe-SDK imports here on purpose —
// keep this module importable from a plain `deno test` run.

/**
 * Idempotency key for creating a Stripe Checkout Session for a reservation fee.
 *
 * Stripe caches the result of a key for 24h and replays it verbatim on reuse,
 * REGARDLESS of the session's current state (expired, still open, whatever) —
 * and errors if the same key is reused with different request parameters
 * (confirmed against https://docs.stripe.com/api/idempotent_requests).
 *
 * That means a bare `booking:quote` key is unsafe across session generations:
 * if session #1 (price P) expires and we need a fresh session at the SAME
 * price P, reusing the same key would just replay the dead session #1, not
 * create a new one. `previousSessionId` breaks that: passing the id of the
 * session being replaced produces a distinct key for the new generation,
 * while staying deterministic (so a retry of the *same* creation attempt,
 * with the *same* previous session, still recovers the *same* new session
 * rather than creating duplicates).
 */
export function buildIdempotencyKey(
  bookingRequestId: string,
  quoteAmountCents: number,
  previousSessionId: string | null,
): string {
  const base = `reservation_fee:v1:${bookingRequestId}:${quoteAmountCents}`;
  return previousSessionId ? `${base}:after:${previousSessionId}` : `${base}:initial`;
}

export interface ExistingSessionSnapshot {
  status: string; // Stripe Checkout Session status: 'open' | 'complete' | 'expired'
  amountTotal: number | null;
  metadata: {
    booking_request_id?: string;
    fee_type?: string;
    quote_amount_cents?: string;
  };
}

export interface RequestedFee {
  bookingRequestId: string;
  quoteAmountCents: number;
  feeAmountCents: number;
}

export type ReuseDecision =
  | { action: "reuse" }
  | { action: "already_paid" }
  | { action: "replace"; reason: string };

/**
 * Decide what to do with an existing Stripe Checkout Session found on a
 * booking, given the currently requested price. Never silently reuses a
 * price-mismatched session — replaces it instead (R3).
 */
export function decideSessionReuse(
  existing: ExistingSessionSnapshot,
  requested: RequestedFee,
): ReuseDecision {
  if (existing.status === "complete") {
    return { action: "already_paid" };
  }

  const matches =
    existing.status === "open" &&
    existing.metadata.booking_request_id === requested.bookingRequestId &&
    existing.metadata.fee_type === "reservation_fee" &&
    existing.metadata.quote_amount_cents === String(requested.quoteAmountCents) &&
    existing.amountTotal === requested.feeAmountCents;

  if (matches) {
    return { action: "reuse" };
  }

  if (existing.status !== "open") {
    return { action: "replace", reason: `existing session status is '${existing.status}', not open` };
  }

  // status is 'open' but doesn't match — price (or booking/fee_type) changed
  // since this session was created.
  return { action: "replace", reason: "existing open session does not match the current requested price/booking" };
}

export interface WebhookSessionInfo {
  eventType: "checkout.session.completed" | "checkout.session.async_payment_succeeded" | "checkout.session.async_payment_failed";
  paymentStatus: string; // Stripe Checkout Session.payment_status
  sessionId: string;
  amountTotal: number | null; // real Stripe amount actually charged, cents
  metadata: {
    booking_request_id?: string;
    fee_type?: string;
    quote_amount_cents?: string;
    fee_amount_cents?: string;
  };
}

export interface BookingSnapshot {
  currentSessionId: string | null;
  quoteAmountCents: number | null;
  status: string;
}

export type FeeConfirmationDecision =
  | { action: "confirm" }
  | { action: "wait"; reason: string } // completed but payment_status not yet 'paid' (deferred method)
  | { action: "noted_failed"; reason: string } // async_payment_failed — never becomes 'rejected'
  | { action: "skip"; reason: string }; // not our session type, stale, or mismatched — leave for reconciliation

/**
 * Decide whether a Stripe webhook event should confirm fee_paid, wait, note a
 * failure, or skip. Pure function — the webhook handler is responsible for
 * actually performing the DB write when this returns "confirm".
 */
export function evaluateFeeConfirmation(
  session: WebhookSessionInfo,
  booking: BookingSnapshot | null,
): FeeConfirmationDecision {
  if (session.metadata.fee_type !== "reservation_fee" || !session.metadata.booking_request_id) {
    return { action: "skip", reason: "not_a_reservation_fee_session" };
  }

  if (session.eventType === "checkout.session.async_payment_failed") {
    // Deliberately NOT "rejected" — a failed deferred payment attempt is not
    // the same as Boris rejecting the request. Just observability.
    return { action: "noted_failed", reason: "async_payment_failed" };
  }

  if (session.paymentStatus !== "paid") {
    // checkout.session.completed can fire with payment_status='unpaid' for
    // deferred/asynchronous payment methods — the real confirmation arrives
    // later as checkout.session.async_payment_succeeded.
    return { action: "wait", reason: "payment_status is not 'paid' yet (deferred method in progress)" };
  }

  if (!booking) {
    return { action: "skip", reason: "booking_not_found" };
  }

  if (booking.currentSessionId !== session.sessionId) {
    // The session that just paid is not the CURRENT session on record for
    // this booking — it was superseded (see decideSessionReuse's "replace").
    // A superseded session paying late must not confirm the booking; it
    // needs human reconciliation, not an automatic status flip.
    return { action: "skip", reason: "stale_session_mismatch" };
  }

  // Must check for a missing quote BEFORE any string comparison against it —
  // String(null) === "null" would otherwise fall through as a coincidental
  // "price_mismatch" instead of the more accurate "booking_missing_quote"
  // (caught by a real test run, not spotted by inspection).
  if (booking.quoteAmountCents === null) {
    return { action: "skip", reason: "booking_missing_quote" };
  }

  if (session.metadata.quote_amount_cents !== String(booking.quoteAmountCents)) {
    return { action: "skip", reason: "price_mismatch" };
  }

  // Don't trust metadata alone for how much was actually charged — cross-check
  // against the real Stripe amount, same defense-in-depth principle already
  // applied on the create side (decideSessionReuse). quote_amount_cents is
  // the trip price; the fee actually charged is 10% of it, rounded up.
  const expectedFeeAmountCents = Math.ceil(booking.quoteAmountCents * 0.1);
  if (session.amountTotal !== expectedFeeAmountCents) {
    return { action: "skip", reason: "amount_total_mismatch" };
  }
  if (session.metadata.fee_amount_cents !== undefined && session.metadata.fee_amount_cents !== String(expectedFeeAmountCents)) {
    return { action: "skip", reason: "fee_amount_metadata_mismatch" };
  }

  return { action: "confirm" };
}

/**
 * Classify a Stripe SDK error for fail-closed handling when retrieving a
 * previous Checkout Session. Only a confirmed "genuinely does not exist"
 * error is safe to treat as "no previous session" — anything else
 * (connection failure, Stripe-side 5xx, rate limiting, auth problems) must
 * be treated as UNCERTAIN and abort rather than silently proceed to create
 * a second, possibly-duplicate, payable session.
 *
 * Verified against the Stripe Node SDK's own type definitions
 * (esm.sh/stripe@13.10.0/types/Errors.d.ts): `type` is one of a fixed set of
 * strings including 'StripeInvalidRequestError', 'StripeConnectionError',
 * 'StripeAPIError', etc. 'resource_missing' is Stripe's documented `code`
 * value for a not-found invalid-request error across object types.
 */
export function classifyStripeRetrieveError(err: { type?: string; code?: string } | null | undefined): "not_found" | "uncertain" {
  if (err?.type === "StripeInvalidRequestError" && err?.code === "resource_missing") {
    return "not_found";
  }
  return "uncertain";
}
