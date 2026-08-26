# Booking → ERP Integration (Caller)

> **Governance**: This integration spans two repos. See `docs/GOVERNANCE_CROSSREPO.md` for decision rights, branch policy, and merge/release protocols.

> **STATUS AS OF 2026-08 RECONCILIATION: NOT LIVE.** This doc describes the *intended* design.
> The canonical `stripe-webhooks` handler (the one actually reachable in normal operation) never
> calls the ERP ingest endpoint at all — this integration was only ever wired into
> `stripe-webhooks-v312`, which is now archived at
> `supabase/legacy-functions/stripe-webhooks-v312/` (see its `ARCHIVED.md`) pending a retirement
> decision. Even if v312 were still receiving traffic, the version of `_shared/erpIngest.ts` it
> ships with predates `INGEST-AUTH-HARDENING-01` (plain `x-ingest-secret` header) and would be
> rejected with 401 by the current `ingest-booking-confirmed-v1`, which requires HMAC signing
> (see "Configuration" below — that section already describes the *old* scheme, also stale).
> Do not assume bookings are flowing to the ERP through this path today.

## Purpose
After Stripe confirms a prepaid booking, the Booking webhook emits a `booking_confirmed v1` event to the ERP ingest endpoint.

## Trigger (SSOT) — historical / not currently live, see status banner above
- SSOT (as originally designed): Supabase Edge Function webhook `stripe-webhooks-v312` (now archived, not deployable — see `supabase/legacy-functions/stripe-webhooks-v312/ARCHIVED.md`)
- Event: Stripe `payment_intent.succeeded`
- The frontend success page is UX-only (must not be the source of truth for confirmation).
- The canonical `stripe-webhooks` (the currently-deployable handler) has never implemented this call. If this integration is revived, it needs to be added there, using the current HMAC auth scheme in `_shared/erpIngest.ts` — not the version bundled with the archived v312.

## Configuration (Supabase Edge Function secrets) — describes the current `_shared/erpIngest.ts` (HMAC), NOT what the archived v312 actually sends
- `ERP_INGEST_URL`: full URL to ERP ingest endpoint (`.../functions/v1/ingest-booking-confirmed-v1`)
- `BOOKING_INGEST_SECRET`: shared secret, used to compute an HMAC-SHA256 signature (see `x-ingest-timestamp`/`x-ingest-signature` below) — **not** sent as a plain `x-ingest-secret` header (that older scheme is what the archived v312 still uses, and is no longer accepted)
- `ERP_INGEST_ENABLED`: optional boolean (default true)
- Request headers: `x-ingest-timestamp` (unix ms) + `x-ingest-signature` (`hmacSha256Hex(BOOKING_INGEST_SECRET, "${timestamp}.${rawBody}")`) — required by `ingest-booking-confirmed-v1` (paris-dispatcher), which returns 401 without them.

## Behavior
- Fire-and-forget: never blocks webhook processing.
- Timeout: 2000ms (AbortController).
- No retries here (Stripe retries webhooks; ERP is idempotent).

## Privacy / Logs
- No PII in logs (no names, emails, phones).
- Logs include only bookingId + HTTP status.

## SSOT Contract (ERP side)
See ERP SSOT: `paris-dispatcher/docs/integrations/booking.md`
