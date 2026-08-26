# Production Source Recovery — 01

**Scope: exclusively historical.** "These functions already exist in production; Git now
contains them again." No refactors, no observability, no `fee_paid` automation, no branding,
no behavior changes of any kind.

## What this PR adds

- `supabase/functions/create-reservation-fee-session/index.ts`
- `supabase/functions/stripe-reservation-webhook/index.ts`

Both recovered verbatim via `supabase functions download --project-ref urjsnguzzzwcnaxwghbo`
from the live, ACTIVE deployment. Byte-identical to what is running today. Secret/PII-scanned
clean before this branch was created (no `sk_live_`/`sk_test_`/`whsec_`/JWT/AWS/PEM patterns,
no hardcoded customer data — only the existing business sender address
`info@eliteparistransfer.com`).

Repo assignment: both fall under **CTO Booking (paris-luxe-journey)** per
`paris-dispatcher/docs/GOVERNANCE_CROSSREPO.md` §1 ("owns ... Stripe checkout UX pages" /
"... booking webhooks"), even though both are called from the paris-dispatcher ERP UI.

## `<200 net lines` exception (SUPERVISOR.md)

This PR's diff is **+902 / -0 lines**, well over the normal cap. **The exception is deliberate
and narrow**: every line here is verbatim recovery of code already executing in production — it
is not new logic being proposed for review. There is nothing to review for correctness (it's
already running); the review scope is "does this match what's live," not "is this good code."
The original recovery investigation notes (the audit that found these functions, cross-checked
them against secrets/migrations/traffic) are not duplicated here — they live in commit
[`ecc5f17`](https://github.com/geinersito/paris-luxe-journey/commit/ecc5f17f7eb2cddae1caebf3b1b085ed67cf538e)
on branch `snapshot/booking-prod-reconciliation-01` (pushed, unmerged, kept permanently as the
historical record of the raw recovery).

## `stripe-webhooks-v312` — included in this PR, but archived outside the deployable path
It **is** part of this diff (see the file list above) — it is not excluded. What's deliberate is
*where*: `supabase/legacy-functions/stripe-webhooks-v312/`, not `supabase/functions/`. It is
legacy, its intended fate is retirement, and putting its source back under the normal deployable
path risks exactly the kind of "it's just sitting there, someone might redeploy it" confusion
this whole reconciliation exists to prevent. See
`supabase/legacy-functions/stripe-webhooks-v312/ARCHIVED.md` for the full rationale, known
issues, and retirement checklist.

## What is NOT in this PR at all
- Any observability change (action-queue badge, Telegram deep-link, test/live field).
- Any change to the `fee_paid → converted` flow.
- The `DEPLOY_MANIFEST.json` / drift-check governance work — separate PR, see
  `chore/deployment-governance-01` (#252).
