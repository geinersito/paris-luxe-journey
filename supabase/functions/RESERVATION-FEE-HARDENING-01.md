# Reservation Fee Hardening — 01

Closes R4 (real authorization) → R1 (payment confirmation correctness) → R3
(session/price consistency) → R2 (persist-before-communicate), in that order,
against `create-reservation-fee-session` and `stripe-reservation-webhook`.
Scope: exactly these two functions + the shared decision-logic module. No
`fee_paid → converted` automation, no ledger reconciliation, no cleanup of
`is_active_org_operator_backoffice()`'s ACL (tracked separately as
**AUTHZ-A2**), no deploy.

## R4 — real authorization, not "any authenticated user"

`create-reservation-fee-session` now builds a **second Supabase client scoped
to the caller's own JWT** (anon key + `Authorization: Bearer <jwt>`), and:

1. Calls `is_active_org_operator_backoffice()` through that client. `authErr`
   or a non-`true` result → `403` before touching Stripe or booking data.
2. Loads the booking through that same caller-scoped client, so RLS (from
   `SECURITY-BOOKING-REQUEST-AUTHZ-01`) governs visibility — a booking
   outside the caller's active org is invisible (`404`), independent of the
   authorization check above.
3. Only *after* both checks pass does it fall back to `service_role`, and
   only for the financial columns `authenticated` deliberately cannot write
   directly since PR A.

**New required env var**: `SUPABASE_ANON_KEY` (was previously only
`SUPABASE_SERVICE_ROLE_KEY`).

The underlying primitive (`is_active_org_operator_backoffice()`, RLS on
`public_booking_requests`) was already verified against **real production**
during PR A's rollout — the PES/RC smoke test showed an RC-active real admin
account gets exactly 0 visible rows and a 42501-rejected
`convert_booking_to_dossier` call. This PR wires that same, already-proven
primitive into `create-reservation-fee-session`'s own authorization gate,
closing the exact bypass Boris identified: a valid JWT alone used to be
enough to create/reuse a Stripe session for *any* booking, regardless of org.

## R1 — payment confirmation correctness

`stripe-reservation-webhook` now:
- Listens to `checkout.session.completed`, `checkout.session.async_payment_succeeded`,
  and `checkout.session.async_payment_failed` (previously: `completed` only).
- Never confirms `fee_paid` on `payment_status !== 'paid'` — `completed` with
  a deferred/asynchronous method can fire with `payment_status='unpaid'`; the
  handler now waits for `async_payment_succeeded` instead of confirming early.
- `async_payment_failed` is **observability only** — logged, ACKed, and the
  booking status is never touched. It must never be read as `rejected`.

## R3 — session/price consistency, no silent reuse

`create-reservation-fee-session`'s reuse branch now compares, against the
**real Stripe session object** (not just the local DB row): `status`,
`metadata.booking_request_id`, `metadata.fee_type`,
`metadata.quote_amount_cents`, and `amount_total`. Any mismatch (price
changed, wrong booking, wrong fee type, or Stripe's own recorded amount
disagreeing with metadata) → the old session is explicitly `expire()`d (if
still `open`) and a new one is created. A `complete` session is never
replaced or reused — `409` instead.

**Idempotency key**, verified against Stripe's own documented behavior
(`docs.stripe.com/api/idempotent_requests` — keys are cached 24h and
*replayed verbatim regardless of the object's current state*; reusing a key
with different parameters errors):

```
reservation_fee:v1:<booking_id>:<quote_cents>:initial            — first session for this booking+price
reservation_fee:v1:<booking_id>:<quote_cents>:after:<old_session> — replacement session, same or new price
```

A bare `booking:price` key would replay a dead/expired session forever if the
price never changes across regenerations — the `:after:<old_session_id>`
suffix forces a fresh Stripe request each time a session is actually
replaced, while staying deterministic for same-attempt retries (R2).

The webhook independently re-checks staleness on the receiving end: it
confirms `fee_paid` only if the paid session is still
`public_booking_requests.stripe_checkout_session_id` (i.e. not superseded)
**and** its `quote_amount_cents` metadata matches the current DB value.
Anything else is left for reconciliation, not auto-confirmed.

## R2 — persist before communicate

After Stripe session creation, the DB `UPDATE` is checked for **both** an
error **and** an actual returned row (`.select("id").maybeSingle()` — no
error is not proof of a write). On failure: no email is sent, `500` is
returned. A retry with the same `booking_request_id`/`quote_amount_cents`
hits the same (`:initial` or `:after:...`) idempotency key and recovers the
exact same Stripe session — no duplicate sessions from a retried failure.

## Contract fix (minor, in-scope)

`BookingRequests.tsx` reads `data?.session_id`; the function only ever
returned `stripe_session_id`. Both responses now include `session_id` as an
explicit alias of the same value — zero paris-dispatcher changes needed,
fixed entirely on this side. Local React state stops silently losing the
session id until the next reload.

## Test evidence

**18/18 real, executed** `deno test` assertions against
`supabase/functions/_shared/reservationFee.ts` — the extracted, pure decision
logic behind every one of R1/R2/R3's non-trivial branches (idempotency key
construction and rotation, session-reuse/replace decision, webhook
confirm/wait/skip/noted_failed decision). No Stripe account, no Supabase
project, no network — genuinely offline and deterministic.
`deno check` also passes clean on both edge function files (real type-check,
not just "looks right").

**Explicitly NOT executed** (same honesty boundary as PR A): the full HTTP
request handlers (`serve(...)` in both `index.ts` files) were not exercised
end-to-end — no live Stripe test-mode calls, no live Supabase RLS round-trip
through this specific new authorization wiring, no real email send/skip
observed. Mapping against the adversarial scenario list Boris asked for:

| Scenario | Coverage |
|---|---|
| PES autorizado crea/reutiliza | Reuse decision: **real test**. Full HTTP 200 path: reviewed, not executed. |
| RC autenticado rechazado (403/404) | Underlying primitive: **real production evidence from PR A's smoke test** (RC-active → 0 rows, 42501). This PR's *wiring* of that primitive into this function: reviewed, not executed. |
| Mismo precio reutiliza | **Real test** (`session reuse: identical price/booking... -> reuse`). |
| Precio cambiado rota | **Real test** (`session reuse: price changed... -> replace` + idempotency rotation tests). |
| DB update fallido no envía email | Code structure makes the email call unreachable on that path (reviewed); not separately executed with a mocked failure. |
| `completed+unpaid` no muta | **Real test** (`webhook: completed but payment_status unpaid -> wait`). |
| `completed+paid` sí | **Real test**. |
| `async_payment_succeeded` sí | **Real test**. |
| `async_payment_failed` no rechaza | **Real test**, with an explicit negative assertion that it can never resolve to `"rejected"`. |
| Replay no duplica transición | Decision layer determinism: **real test**. DB-level dedup itself is the pre-existing, unchanged `.eq("status","approved_pending_fee")` guard. |
| Stale/mismatched session no marca fee_paid | **Real test**, two scenarios (`stale_session_mismatch`, `price_mismatch`). |

## Files changed
- `supabase/functions/_shared/reservationFee.ts` — new, pure decision logic.
- `supabase/functions/_shared/reservationFee.test.ts` — new, 18 real `deno test` assertions.
- `supabase/functions/create-reservation-fee-session/index.ts` — R4, R3, R2, contract fix.
- `supabase/functions/stripe-reservation-webhook/index.ts` — R1, staleness/price guard.

## Status
**Draft. No merge, no deploy.**
