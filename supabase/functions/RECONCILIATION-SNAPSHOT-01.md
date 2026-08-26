# Booking-flow production reconciliation snapshot — 2026-08-26

**Status: SNAPSHOT OF PRODUCTION, NOT AN APPROVED DESIGN.** These three functions were
recovered verbatim from the live Supabase project (`urjsnguzzzwcnaxwghbo` / reservavtc) via
`supabase functions download`, because they exist deployed but had never been committed to
either git repo. Nothing in their behavior has been modified. This commit exists so that
Git/PR becomes source of truth going forward — it does not imply the recovered code is
correct, final, or free of the issues documented below.

## Functions recovered in this commit

| Function | Why it's here | Repo assignment rationale |
|---|---|---|
| `stripe-webhooks-v312` | Deployed and ACTIVE on Supabase; deleted from this repo's git history in commit `86793ea` (2026-05-31) but never actually undeployed | Booking repo already owned it before deletion |
| `create-reservation-fee-session` | Deployed and ACTIVE; never committed to any repo | Per `paris-dispatcher/docs/GOVERNANCE_CROSSREPO.md` §1: "CTO Booking (paris-luxe-journey) owns ... Stripe checkout UX pages" — this creates a Stripe Checkout Session |
| `stripe-reservation-webhook` | Deployed and ACTIVE; never committed to any repo | Same doc: "CTO Booking owns ... booking webhooks" — this is a Stripe webhook handler |

Both new functions are called from `paris-dispatcher`'s `BookingRequests.tsx` (authenticated
ERP session) but their *domain* is booking/Stripe per the governance doc's ownership rule, not
their caller. **Boris: confirm this assignment — it's a reasoned default, not an
uncontested fact.** If you disagree, moving them to paris-dispatcher is a rename, not a rewrite.

## NOT recovered / already consistent (no action needed)
- `stripe-webhooks` (canonical) — already in git, but see drift finding below.
- `submit-booking-request` — already in git, byte-for-byte identical to what's deployed.
- `supabase/functions/_shared/env.ts` — already in git, identical to deployed (only
  line-ending/whitespace noise in a naive diff).
- `convert_booking_to_dossier` RPC — already correctly versioned in
  `paris-dispatcher/supabase/migrations/20260601000003_dossier_booking_fk_and_convert_rpc.sql`,
  no later redefinition found.

## Environment variables these functions depend on (NAMES ONLY — no values committed, no values in this doc)
- `stripe-webhooks-v312`: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET_V312`, `SUPABASE_URL`,
  `SUPABASE_SERVICE_ROLE_KEY`, `ERP_INGEST_URL`, `BOOKING_INGEST_SECRET`, `ERP_INGEST_ENABLED` (optional bool)
- `create-reservation-fee-session`: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `RESEND_API_KEY`
- `stripe-reservation-webhook`: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_RESERVATION_WEBHOOK_SECRET`
- `stripe-webhooks` (canonical, already in git): `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

Confirmed present as project secrets today (name only, via `supabase secrets list`, values never
read): `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET_V312`, `STRIPE_RESERVATION_WEBHOOK_SECRET`,
`ERP_INGEST_URL`, `BOOKING_INGEST_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`.

**`STRIPE_WEBHOOK_SECRET` (no suffix — required by the *canonical* `stripe-webhooks` handler)
is ABSENT from the project's secrets entirely.** This is a root-cause finding, not a config
nitpick: without it, `stripe.webhooks.constructEvent()` in `stripe-webhooks/index.ts` cannot
succeed for any request, real or test — every invocation fails signature verification and
returns HTTP 400 before touching any table. This alone accounts for `processed_stripe_events`
never having a row for this handler, independent of the missing-idempotency-code drift below.

## Known issues found in the recovered code (documented, not fixed here)
1. **`stripe-webhooks-v312` references a table that does not exist**: `stripe_webhook_events`
   (its own idempotency table) returns `relation "stripe_webhook_events" does not exist` when
   queried directly. Never appears in any migration in either repo — created and/or dropped
   outside version control, or never actually created. Practical effect: the idempotency guard
   silently fails open (SELECT error is swallowed, so every event looks "new"; the INSERT that
   would record it also fails silently) — a Stripe retry would be reprocessed as if it were new,
   though the actual business updates (to `bookings`) are not otherwise gated by this check
   succeeding, so this degrades to "no real idempotency" rather than "totally broken."
2. **`stripe-webhooks-v312`'s bundled `_shared/erpIngest.ts` is the OLD pre-hardening version**
   (plain `x-ingest-secret` header) — NOT the current git version (HMAC-signed
   `x-ingest-timestamp`/`x-ingest-signature`, from `INGEST-AUTH-HARDENING-01`). The live
   `ingest-booking-confirmed-v1` (paris-dispatcher) requires the HMAC headers and returns 401
   `MISSING_SIGNATURE` otherwise. **Net effect: even if Stripe were still routing events to
   `stripe-webhooks-v312` today, its ERP-ingest call would be rejected by the current ERP
   endpoint.** This is a second, independent reason the booking→ERP bridge doesn't work via this
   path, on top of it never being wired into the canonical handler at all.
3. **Canonical `stripe-webhooks` deployed code is missing the idempotency block** present in git
   since commit `3e51bad` (2026-02-12) — confirmed via `supabase functions download` + diff.
   Moot in practice given finding above (missing secret), but is real drift that a redeploy from
   current git HEAD would silently fix as a side effect.

## What this snapshot does NOT tell us
- Whether Stripe's own Dashboard webhook endpoint configuration currently points at
  `stripe-webhooks`, `stripe-webhooks-v312`, both, or neither — not checkable from this repo or
  the Supabase CLI used here. Needs a manual look at the Stripe Dashboard.
- Full behavioral diff for every other live-but-uncommitted function
  (`notify-status-change`, `save-push-subscription`, `send-push-notification`,
  `link-driver-telegram`) — out of scope for this booking-focused pass.
