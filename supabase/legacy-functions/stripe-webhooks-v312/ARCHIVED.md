# ARCHIVED — stripe-webhooks-v312

**Do not move this into `supabase/functions/`. Do not deploy.**

## Status
Deployed and ACTIVE on the live Supabase project as of 2026-08-26 (confirmed via
`supabase functions list`), despite having been deleted from this repo's git history in commit
`86793ea` ("OPS-STRIPE-LEGACY-DEPRECATE-01 PR3 — delete legacy handlers", 2026-05-31). Deleting
the file from git did not undeploy it — this archive exists so that fact can never repeat: the
source is versioned, in a location no deploy tooling should ever read from.

## Why it's not going back into `supabase/functions/`
That directory is (or should become, see `DEPLOY_MANIFEST.json` in the governance PR) the set of
things that are allowed to be deployed. This handler's intended fate is retirement, pending one
confirmation only Boris can make: whether Stripe's own Dashboard webhook configuration still
targets this endpoint. Until that's confirmed, keeping the code available but structurally
inert (outside the deployable path, absent from any manifest) is safer than either deleting it
again (repeats the exact mistake that caused this whole reconciliation) or leaving it in the
normal functions directory (invites exactly the "it's just sitting there" confusion this
reconciliation exists to resolve).

## Known issues in this exact deployed version (documented during recovery, not fixed here)
- Its own idempotency table, `stripe_webhook_events`, does not exist in the database and is
  absent from every migration in either repo — the dedup check silently fails open.
- Its bundled `_shared/erpIngest.ts` predates `INGEST-AUTH-HARDENING-01` — sends a plain
  `x-ingest-secret` header instead of the HMAC signature the current
  `ingest-booking-confirmed-v1` (paris-dispatcher) requires. Even if Stripe still routes events
  here, the ERP-ingest call would be rejected with 401 on arrival.
- Requires secret `STRIPE_WEBHOOK_SECRET_V312`, which is still configured on the project as of
  2026-08-26 — unlike the canonical `stripe-webhooks`, whose required `STRIPE_WEBHOOK_SECRET` is
  entirely absent from the project's secrets.

## Provenance
Recovered verbatim via `supabase functions download stripe-webhooks-v312
--project-ref urjsnguzzzwcnaxwghbo` on 2026-08-26. Original raw recovery, alongside the other two
functions and the full investigation notes, is preserved at commit
[`ecc5f17`](https://github.com/geinersito/paris-luxe-journey/commit/ecc5f17f7eb2cddae1caebf3b1b085ed67cf538e)
on branch `snapshot/booking-prod-reconciliation-01`.

## Retirement checklist (not started — separate future PR, after this one)
1. Confirm in the Stripe Dashboard whether any webhook endpoint still targets
   `.../stripe-webhooks-v312`.
2. If none: safe to formally decommission (remove the deployed function via
   `supabase functions delete`, mark `retired` in `DEPLOY_MANIFEST.json`, optionally delete
   `STRIPE_WEBHOOK_SECRET_V312`).
3. If one still exists: repoint it or coordinate a real cutover before touching anything live —
   do not delete the deployed function first.
