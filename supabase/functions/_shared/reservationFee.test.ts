import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import {
  buildIdempotencyKey,
  classifyStripeRetrieveError,
  decideSessionReuse,
  evaluateFeeConfirmation,
  type BookingSnapshot,
  type ExistingSessionSnapshot,
  type WebhookSessionInfo,
} from "./reservationFee.ts";

// --- buildIdempotencyKey ---

Deno.test("idempotency key: first-ever session for a booking+price", () => {
  assertEquals(
    buildIdempotencyKey("b1", 10000, null),
    "reservation_fee:v1:b1:10000:initial",
  );
});

Deno.test("idempotency key: rotates when replacing a previous session, same price", () => {
  const first = buildIdempotencyKey("b1", 10000, null);
  const second = buildIdempotencyKey("b1", 10000, "cs_old_123");
  assertEquals(second, "reservation_fee:v1:b1:10000:after:cs_old_123");
  // Must differ from the first-generation key, or Stripe would replay the
  // dead session instead of creating a new one.
  if (first === second) throw new Error("rotated key must differ from initial key");
});

Deno.test("idempotency key: same retry (same previous session id) is deterministic", () => {
  const a = buildIdempotencyKey("b1", 10000, "cs_old_123");
  const b = buildIdempotencyKey("b1", 10000, "cs_old_123");
  assertEquals(a, b);
});

Deno.test("idempotency key: different price produces a different key even for the same booking", () => {
  const a = buildIdempotencyKey("b1", 10000, null);
  const b = buildIdempotencyKey("b1", 12000, null);
  if (a === b) throw new Error("different price must produce a different idempotency key");
});

// --- decideSessionReuse (R3) ---

const REQUESTED = { bookingRequestId: "b1", quoteAmountCents: 10000, feeAmountCents: 1000 };

Deno.test("session reuse: identical price/booking, still open -> reuse", () => {
  const existing: ExistingSessionSnapshot = {
    status: "open",
    amountTotal: 1000,
    metadata: { booking_request_id: "b1", fee_type: "reservation_fee", quote_amount_cents: "10000" },
  };
  assertEquals(decideSessionReuse(existing, REQUESTED), { action: "reuse" });
});

Deno.test("session reuse: price changed, still open -> replace, not silent reuse", () => {
  const existing: ExistingSessionSnapshot = {
    status: "open",
    amountTotal: 900, // was 9000 cents quote, i.e. a different price than now requested
    metadata: { booking_request_id: "b1", fee_type: "reservation_fee", quote_amount_cents: "9000" },
  };
  const decision = decideSessionReuse(existing, REQUESTED);
  assertEquals(decision.action, "replace");
});

Deno.test("session reuse: already paid -> already_paid, never replace/reuse a paid session", () => {
  const existing: ExistingSessionSnapshot = {
    status: "complete",
    amountTotal: 1000,
    metadata: { booking_request_id: "b1", fee_type: "reservation_fee", quote_amount_cents: "10000" },
  };
  assertEquals(decideSessionReuse(existing, REQUESTED), { action: "already_paid" });
});

Deno.test("session reuse: expired session, same price -> replace (not reuse — Stripe wouldn't accept payment on it anyway)", () => {
  const existing: ExistingSessionSnapshot = {
    status: "expired",
    amountTotal: 1000,
    metadata: { booking_request_id: "b1", fee_type: "reservation_fee", quote_amount_cents: "10000" },
  };
  const decision = decideSessionReuse(existing, REQUESTED);
  assertEquals(decision.action, "replace");
});

Deno.test("session reuse: amount_total mismatch alone (metadata says right price, Stripe object disagrees) -> replace", () => {
  // Defense in depth: don't trust metadata alone, cross-check the real Stripe amount.
  const existing: ExistingSessionSnapshot = {
    status: "open",
    amountTotal: 1500, // real Stripe amount disagrees with metadata below
    metadata: { booking_request_id: "b1", fee_type: "reservation_fee", quote_amount_cents: "10000" },
  };
  assertEquals(decideSessionReuse(existing, REQUESTED).action, "replace");
});

// --- evaluateFeeConfirmation (R1 + staleness guard) ---

const BOOKING: BookingSnapshot = { currentSessionId: "cs_current", quoteAmountCents: 10000, status: "approved_pending_fee" };

function session(overrides: Partial<WebhookSessionInfo>): WebhookSessionInfo {
  return {
    eventType: "checkout.session.completed",
    paymentStatus: "paid",
    sessionId: "cs_current",
    amountTotal: 1000, // matches BOOKING.quoteAmountCents=10000 -> ceil(10000*0.1)=1000
    metadata: { booking_request_id: "b1", fee_type: "reservation_fee", quote_amount_cents: "10000", fee_amount_cents: "1000" },
    ...overrides,
  };
}

Deno.test("webhook: completed + paid + current session + matching price -> confirm", () => {
  assertEquals(evaluateFeeConfirmation(session({}), BOOKING), { action: "confirm" });
});

Deno.test("webhook: completed but payment_status unpaid (deferred method) -> wait, not confirm", () => {
  const decision = evaluateFeeConfirmation(session({ paymentStatus: "unpaid" }), BOOKING);
  assertEquals(decision.action, "wait");
});

Deno.test("webhook: async_payment_succeeded + paid -> confirm", () => {
  const decision = evaluateFeeConfirmation(
    session({ eventType: "checkout.session.async_payment_succeeded", paymentStatus: "paid" }),
    BOOKING,
  );
  assertEquals(decision.action, "confirm");
});

Deno.test("webhook: async_payment_failed -> noted_failed, NEVER 'rejected'", () => {
  const decision = evaluateFeeConfirmation(
    session({ eventType: "checkout.session.async_payment_failed", paymentStatus: "unpaid" }),
    BOOKING,
  );
  assertEquals(decision.action, "noted_failed");
  // Explicit negative assertion: this must never be interpreted as a status
  // transition to 'rejected' anywhere in the caller.
  if ((decision as { action: string }).action === "rejected") {
    throw new Error("async_payment_failed must never map to 'rejected'");
  }
});

Deno.test("webhook: stale session (paid session id != booking's current session) -> skip, not confirm", () => {
  const decision = evaluateFeeConfirmation(
    session({ sessionId: "cs_old_superseded" }),
    BOOKING, // currentSessionId is 'cs_current', not 'cs_old_superseded'
  );
  assertEquals(decision, { action: "skip", reason: "stale_session_mismatch" });
});

Deno.test("webhook: price mismatch between paid session metadata and current DB quote -> skip", () => {
  const decision = evaluateFeeConfirmation(
    session({ metadata: { booking_request_id: "b1", fee_type: "reservation_fee", quote_amount_cents: "9999" } }),
    BOOKING, // quoteAmountCents: 10000
  );
  assertEquals(decision, { action: "skip", reason: "price_mismatch" });
});

Deno.test("webhook: not a reservation_fee session -> skip", () => {
  const decision = evaluateFeeConfirmation(
    session({ metadata: { booking_request_id: "b1", fee_type: "something_else", quote_amount_cents: "10000" } }),
    BOOKING,
  );
  assertEquals(decision, { action: "skip", reason: "not_a_reservation_fee_session" });
});

Deno.test("webhook: booking not found -> skip", () => {
  const decision = evaluateFeeConfirmation(session({}), null);
  assertEquals(decision, { action: "skip", reason: "booking_not_found" });
});

Deno.test("webhook: replay of the same confirm-worthy event is safe (pure function, same input -> same output, no duplication risk)", () => {
  const first = evaluateFeeConfirmation(session({}), BOOKING);
  const second = evaluateFeeConfirmation(session({}), BOOKING);
  assertEquals(first, second);
  assertEquals(first.action, "confirm");
  // Actual duplicate-write safety comes from the caller's
  // .eq("status","approved_pending_fee") guard on the UPDATE, unchanged by
  // this refactor — this test documents the decision layer's contribution:
  // it never varies its answer for the same inputs.
});

Deno.test("webhook: real Stripe amount_total disagrees with expected fee -> skip, not confirm (don't trust metadata alone)", () => {
  const decision = evaluateFeeConfirmation(session({ amountTotal: 1 }), BOOKING);
  assertEquals(decision, { action: "skip", reason: "amount_total_mismatch" });
});

Deno.test("webhook: metadata.fee_amount_cents disagrees with expected fee -> skip", () => {
  const decision = evaluateFeeConfirmation(
    session({ metadata: { booking_request_id: "b1", fee_type: "reservation_fee", quote_amount_cents: "10000", fee_amount_cents: "1" } }),
    BOOKING,
  );
  assertEquals(decision, { action: "skip", reason: "fee_amount_metadata_mismatch" });
});

Deno.test("webhook: booking with no quote on file -> skip, never confirm against an unknown price", () => {
  const decision = evaluateFeeConfirmation(session({}), { ...BOOKING, quoteAmountCents: null });
  assertEquals(decision, { action: "skip", reason: "booking_missing_quote" });
});

// --- classifyStripeRetrieveError (fail-closed on Stripe uncertainty) ---

Deno.test("stripe error classification: confirmed resource_missing -> not_found (safe to treat as no previous session)", () => {
  assertEquals(
    classifyStripeRetrieveError({ type: "StripeInvalidRequestError", code: "resource_missing" }),
    "not_found",
  );
});

Deno.test("stripe error classification: StripeConnectionError -> uncertain (fail closed, do not proceed)", () => {
  assertEquals(classifyStripeRetrieveError({ type: "StripeConnectionError" }), "uncertain");
});

Deno.test("stripe error classification: StripeAPIError (Stripe-side 5xx) -> uncertain", () => {
  assertEquals(classifyStripeRetrieveError({ type: "StripeAPIError" }), "uncertain");
});

Deno.test("stripe error classification: StripeRateLimitError -> uncertain", () => {
  assertEquals(classifyStripeRetrieveError({ type: "StripeRateLimitError" }), "uncertain");
});

Deno.test("stripe error classification: invalid_request but NOT resource_missing (some other bad-parameter error) -> uncertain, not blindly treated as not-found", () => {
  assertEquals(
    classifyStripeRetrieveError({ type: "StripeInvalidRequestError", code: "parameter_invalid_empty" }),
    "uncertain",
  );
});

Deno.test("stripe error classification: null/undefined error -> uncertain", () => {
  assertEquals(classifyStripeRetrieveError(null), "uncertain");
  assertEquals(classifyStripeRetrieveError(undefined), "uncertain");
});
