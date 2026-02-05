# Booking → ERP Integration (Caller)

> **Governance**: This integration spans two repos. See `docs/GOVERNANCE_CROSSREPO.md` for decision rights, branch policy, and merge/release protocols.

## Purpose
After Stripe confirms a prepaid booking, the Booking webhook emits a `booking_confirmed v1` event to the ERP ingest endpoint.

## Trigger (SSOT)
- SSOT: Supabase Edge Function webhook `stripe-webhooks-v312`
- Event: Stripe `payment_intent.succeeded`
- The frontend success page is UX-only (must not be the source of truth for confirmation).

## Configuration (Supabase Edge Function secrets)
- `ERP_INGEST_URL`: full URL to ERP ingest endpoint (`.../functions/v1/ingest-booking-confirmed-v1`)
- `BOOKING_INGEST_SECRET`: shared secret (sent as `x-ingest-secret`)
- `ERP_INGEST_ENABLED`: optional boolean (default true)

## Behavior
- Fire-and-forget: never blocks webhook processing.
- Timeout: 2000ms (AbortController).
- No retries here (Stripe retries webhooks; ERP is idempotent).

## Privacy / Logs
- No PII in logs (no names, emails, phones).
- Logs include only bookingId + HTTP status.

## SSOT Contract (ERP side)
See ERP SSOT: `paris-dispatcher/docs/integrations/booking.md`
