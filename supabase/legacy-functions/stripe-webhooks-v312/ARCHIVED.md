# ARCHIVED — stripe-webhooks-v312 (historical snapshot)

This file remains the historical recovery record. The earlier retirement
hypothesis was corrected by the P0-B-07 Stripe LIVE endpoint review: Stripe
does still target `/functions/v1/stripe-webhooks-v312`, so immediate retirement
would be incorrect.

The runtime is therefore being re-canonicalized temporarily under
`supabase/functions/stripe-webhooks-v312/` with its v51 event contract and
compatibility helpers preserved. This archive remains immutable historical
evidence; it is not the deployable source and must not be deleted.

## Status

Deployed and ACTIVE on the live Supabase project as of the recovery snapshot
and confirmed again during P0-B-07. It had been deleted from this repo's git
history in commit `86793ea` ("OPS-STRIPE-LEGACY-DEPRECATE-01 PR3 — delete
legacy handlers") without undeploying the runtime. The archive exists so that
this history remains explicit.

## Why this is temporary compatibility

Stripe LIVE currently targets this endpoint and sends the v3.1.2 payment,
setup, and hold event set. The deployable copy is intentionally a compatibility
handler pending a later payment-architecture cleanup. It must preserve the
recovered v51 behavior except for the single administrative credential source
change authorized in P0-B-08.

## Known issues in this exact deployed version (documented, not fixed here)

- Its own idempotency table, `stripe_webhook_events`, does not exist in the
  database and is absent from every migration in either repo — the dedup check
  silently fails open.
- Its recovered `_compat/erpIngest.ts` uses the historical plain
  `x-ingest-secret` header rather than the modern HMAC helper. This is preserved
  intentionally for contract compatibility and is not fixed in this slice.
- It requires `STRIPE_WEBHOOK_SECRET_V312`, which remains the dedicated secret
  for the live endpoint.

## Provenance

The entrypoint was recovered verbatim via
`supabase functions download stripe-webhooks-v312 --project-ref
urjsnguzzzwcnaxwghbo` and compares byte-for-byte with the archived index after
line-ending normalization. The compatibility helpers are preserved under
`supabase/functions/stripe-webhooks-v312/_compat/` so deploy tooling cannot
silently substitute the modern shared ERP helper.

## Later retirement checklist

1. Coordinate a real Stripe LIVE cutover preserving all eight enabled event
   types and verify delivery success.
2. Only then delete the deployed function and mark this compatibility handler
   retired in `DEPLOY_MANIFEST.json`.
3. Do not remove `STRIPE_WEBHOOK_SECRET_V312` until the endpoint is deleted and
   the final smoke proves no remaining consumer needs it.
