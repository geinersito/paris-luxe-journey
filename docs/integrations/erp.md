# Booking → ERP Integration (Caller - RGPD-safe)

## Purpose
After Stripe confirms a prepaid booking, the Booking webhook emits a minimal `booking_confirmed v1` event to the ERP ingest endpoint.

## RGPD Compliance
**No PII in transit**: Payload contains only `booking_id` and `idempotency_key`. The ERP retrieves customer/service details from its own DB via the booking reference after validation.

## Trigger (SSOT)
- **SSOT**: Supabase Edge Function webhook `stripe-webhooks-v312`
- **Event**: Stripe `payment_intent.succeeded` (prepaid bookings only)
- **Frontend**: Success page is UX-only (must not be the source of truth for confirmation)

## Configuration (Supabase Edge Function secrets)
Required env vars:
- `ERP_INGEST_URL`: Full URL to ERP ingest endpoint (e.g., `https://<ERP_PROJECT>.supabase.co`)
- `BOOKING_INGEST_SECRET`: Shared secret (sent as `x-ingest-secret` header)

Optional feature flag:
- `ERP_INGEST_ENABLED`: Boolean (default `true`). Set to `false` to disable integration without removing secrets.

## Behavior
- **Fire-and-forget**: Never blocks webhook processing (void call with try/catch)
- **Timeout**: 2000ms (AbortController)
- **No retries**: Stripe retries webhooks automatically; ERP handles idempotency

## Privacy / Logs
- **No PII in logs**: Only `bookingId` + HTTP status
- **No PII in payload**: Customer/service data retrieved by ERP via internal query
- **Truncated errors**: Max 200 chars in error logs

## Payload (Minimal)
```json
{
  "event": "booking_confirmed",
  "version": "v1",
  "booking_id": "<uuid>",
  "idempotency_key": "booking_confirmed:<uuid>:v1"
}
```

## Implementation
- **Modular**: `_shared/env.ts`, `_shared/erpIngest.ts` (reusable across Edge Functions)
- **Production-grade**: Timeout, abort, truncation, never throws
- **RGPD-first**: No customer data in transit

## SSOT Contract (ERP side)
See ERP SSOT: [paris-dispatcher/docs/integrations/booking.md](https://github.com/geinersito/paris-dispatcher/blob/main/docs/integrations/booking.md)

## Future Enhancement (if needed)
If ERP requires richer payload (service details, pricing), add in follow-up PR with:
- Only non-PII fields (service_type, pickup_datetime, amount_cents, currency)
- Explicit consent check before including any customer-identifying data
