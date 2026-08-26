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

## Round 2 — three blockers from Boris's review, fixed

The first round left three real mechanism gaps. All three are now closed.

### Blocker 1 — R3 was fail-open on Stripe uncertainty

Previously: a failed `retrieve()` (any reason) or a failed `expire()` both
logged and **proceeded anyway** to create a replacement session. That could
leave two live payable Stripe sessions for the same booking — the old one
still `open`, un-expired, still acceptable for real payment.

Now, verified against the Stripe Node SDK's own type definitions
(`esm.sh/stripe@13.10.0/types/Errors.d.ts` — fetched and read directly, not
assumed): only a confirmed `StripeInvalidRequestError` with
`code === 'resource_missing'` is treated as "no previous session exists".
Any other error type (`StripeConnectionError`, `StripeAPIError`,
`StripeRateLimitError`, etc.) is **uncertain** and aborts with `502` instead
of proceeding — pure classifier `classifyStripeRetrieveError()`, 6 real
tests. A failed `expire()` on a still-`open` mismatched session also aborts
with `502` rather than creating a replacement next to a session that might
still be payable.

### Blocker 2 — R2's persist was not a compare-and-swap

Previously: the booking's `approved_pending_fee` status was checked once at
the top of the request; the final `UPDATE` after Stripe session creation
only re-checked `id`. A reject-mid-flight, or two concurrent calls at
different prices, could both pass their initial check and then have the
later `UPDATE` silently overwrite financial state written by the other.

Now: the persist `UPDATE`'s `WHERE` clause is a CAS —
`status = 'approved_pending_fee' AND stripe_checkout_session_id = <exactly
what was read at the top of this request>` (`.is(...null)` when there was no
previous session). If the CAS matches 0 rows, the Stripe session just
created is treated as **orphaned**: explicitly `expire()`d, no email sent,
`409 CONCURRENT_MODIFICATION` returned.

### Blocker 3 — the webhook's staleness guard was check-then-act, not atomic

Previously: the webhook `SELECT`ed the booking, decided the session was
current, then `UPDATE`d using only `id + status`. A session replacement
landing between the `SELECT` and the `UPDATE` could let an already-superseded
session confirm the booking in that window.

Now: the final `fee_paid` `UPDATE`'s `WHERE` clause itself requires
`status='approved_pending_fee' AND stripe_checkout_session_id=<paid session>
AND quote_amount_cents=<the quote the decision was computed from>`. The
transition is atomic — condition and write are the same statement. `0` rows
affected → `skipped: "cas_mismatch_at_write_time"`, left for reconciliation,
never silently reported as success.

### Additional R3 finding — verify the real amount, not only metadata

`evaluateFeeConfirmation()` now takes `session.amountTotal` (the real Stripe
amount, not the client-supplied metadata) and checks it equals
`ceil(booking.quoteAmountCents * 0.1)`, plus cross-checks
`metadata.fee_amount_cents` when present. Metadata alone was previously
sufficient to confirm `fee_paid` — a forged/tampered metadata value (were
that ever possible) would have been trusted at face value.

### SSOT follow-ups (in this PR, per Boris — not scope creep)

- `DEPLOY_MANIFEST.json`: the "known review finding, not yet fixed" note on
  `stripe-reservation-webhook` was stale as of this round — updated to point
  at this PR instead of describing an unfixed gap.
- `supabase/config.toml`: added `[functions.stripe-reservation-webhook]
  verify_jwt = false` — **verified against the live-deployed function**
  (`supabase functions list -o json`, confirmed `verify_jwt: false`
   2026-08-26), not guessed. This setting was live but unversioned anywhere
  in git; Stripe never sends a Supabase JWT, so if a future deploy from Git
  ever applied a default of `verify_jwt=true`, every webhook call would 401
  at the gateway before signature verification even ran.

### Tests added for the above (6 new, 27 total — see below)

## Contract fix (minor, in-scope)

`BookingRequests.tsx` reads `data?.session_id`; the function only ever
returned `stripe_session_id`. Both responses now include `session_id` as an
explicit alias of the same value — zero paris-dispatcher changes needed,
fixed entirely on this side. Local React state stops silently losing the
session id until the next reload.

## Test evidence

**27/27 real, executed** `deno test` assertions against
`supabase/functions/_shared/reservationFee.ts` — the extracted, pure decision
logic behind every one of R1/R2/R3/R4-adjacent's non-trivial branches
(idempotency key construction and rotation, session-reuse/replace decision,
webhook confirm/wait/skip/noted_failed decision, real-amount cross-check,
Stripe error classification for fail-closed retrieve handling). No Stripe
account, no Supabase project, no network — genuinely offline and
deterministic. Round 2 found and fixed one real ordering bug during this
same real-execution pass (a `booking.quoteAmountCents === null` check was
unreachable because a string comparison above it happened to also match —
caught by `deno test`, not by inspection; see git history).
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
| DB update fallido no envía email | Code structure makes the email call unreachable on that path (reviewed); CAS-mismatch → orphan-session-expire path structurally mirrors the fail-closed classifier (real test), but the HTTP-level "no email sent" itself is reviewed, not separately executed. |
| Retrieve/expire fail-closed (Blocker 1) | **Real test** — `classifyStripeRetrieveError()`, 6 scenarios (resource_missing, connection, API, rate-limit, wrong-code invalid-request, null). HTTP-level abort-with-502 wiring: reviewed, not executed. |
| Create-side CAS / concurrent modification (Blocker 2) | Reviewed, not executed — requires two concurrent live HTTP requests to exercise for real. |
| Webhook-side CAS / stale-at-write-time (Blocker 3) | Reviewed, not executed — same reason. The *staleness-at-decision-time* check it complements is real-tested (below). |
| Real amount_total / fee_amount_cents cross-check | **Real test**, two scenarios. |
| `completed+unpaid` no muta | **Real test** (`webhook: completed but payment_status unpaid -> wait`). |
| `completed+paid` sí | **Real test**. |
| `async_payment_succeeded` sí | **Real test**. |
| `async_payment_failed` no rechaza | **Real test**, with an explicit negative assertion that it can never resolve to `"rejected"`. |
| Replay no duplica transición | Decision layer determinism: **real test**. DB-level dedup itself is the pre-existing, unchanged `.eq("status","approved_pending_fee")` guard, now additionally scoped by the CAS in Blocker 3. |
| Stale/mismatched session no marca fee_paid | **Real test at decision time**, two scenarios (`stale_session_mismatch`, `price_mismatch`) + the CAS closes the same-instant write race (Blocker 3, reviewed not executed). |

## Files changed
- `supabase/functions/_shared/reservationFee.ts` — pure decision logic + Stripe error classifier.
- `supabase/functions/_shared/reservationFee.test.ts` — 27 real `deno test` assertions.
- `supabase/functions/create-reservation-fee-session/index.ts` — R4, R3 (fail-closed), R2 (CAS), contract fix.
- `supabase/functions/stripe-reservation-webhook/index.ts` — R1, staleness/price guard, atomic CAS on the fee_paid write.
- `supabase/functions/DEPLOY_MANIFEST.json` — stale finding note corrected.
- `supabase/config.toml` — `stripe-reservation-webhook` `verify_jwt=false` versioned (verified against live, not guessed).

## Status
**Draft. No merge, no deploy.**
