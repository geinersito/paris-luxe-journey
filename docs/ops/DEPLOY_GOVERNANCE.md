# Edge Function Deploy Governance

## Why this exists
During the 2026-08 booking-flow reconciliation we found `create-reservation-fee-session`,
`stripe-reservation-webhook`, `stripe-webhooks-v312`, and several unrelated functions
(`notify-status-change`, `save-push-subscription`, `send-push-notification`,
`link-driver-telegram`) live and ACTIVE on the shared Supabase project with **no corresponding
commit in any repo**. Deleting `stripe-webhooks-v312`'s file from git (commit `86793ea`) also did
not undeploy it. Git had silently stopped being source of truth for what's actually running.

## What `DEPLOY_MANIFEST.json` is
`supabase/functions/DEPLOY_MANIFEST.json` is the single declared list of what's allowed to be
deployed. Any deploy tooling — CI, a script, a Makefile target — must read function slugs from
this file and this file only. It must never `ls supabase/functions/` and deploy whatever it
finds. `npm run check:functions-drift` compares this manifest against what's actually live and
exits non-zero on drift, so it can gate a CI job.

## What this manifest is NOT

**It is a guardrail for our own tooling, not a security boundary.** `DEPLOY_MANIFEST.json` and
`check:functions-drift` can only stop *our scripts and CI* from deploying something undeclared.
Neither can stop a person who holds a valid Supabase access token from running, by hand:

```
supabase functions deploy stripe-webhooks-v312 --project-ref urjsnguzzzwcnaxwghbo
```

That command talks directly to Supabase's Management API. It doesn't know or care that a
manifest file exists in some git branch. **This is exactly how we got here** — the functions
recovered in `recovery/production-source-01` were deployed this way, bypassing git entirely, and
nothing technical stopped it at the time.

## What `check:functions-drift` does NOT detect

**This check detects function inventory/classification drift, not deployed source-code drift.**
It answers "does this slug exist where we expect it to (or not)" — never "does the code running
under this slug match git HEAD." A green run means every live *slug* is accounted for. It says
nothing about whether the *bytes* deployed under an accounted-for slug are the same bytes in git.

We have a real, already-documented example of exactly this gap: `stripe-webhooks` exists in git
*and* is live *and* is correctly listed as `active` in the manifest — so this check reports zero
drift for it — yet the actual deployed code was confirmed (by downloading it and diffing, during
the reconciliation that produced this PR) to be missing the idempotency block that's been in git
since commit `3e51bad`. Someone could deploy an old or modified version under a governed,
manifest-listed slug tomorrow and this script would stay green throughout.

**Primary control for this gap is the same one that closes the "who can deploy" gap** (see next
section): if deploys only ever happen through CI from a specific git ref, deployed code and git
HEAD are the same thing by construction — there's no separate "source drift" problem to detect,
because there's no path for the two to diverge. Detecting it after the fact is a weaker,
secondary control.

**Optional future secondary detector, not built here**: extend `check:functions-drift` (or a
sibling script) to `supabase functions download` each manifest-governed function and diff it
against the corresponding file in git, failing on any mismatch. Deliberately not built now —
adding it wouldn't have prevented anything CI-only-deploy doesn't already prevent by construction,
and building it today would be scope creep against diminishing returns: this reconciliation
already found and fixed the two real classes of drift it set out to find. A green
`check:functions-drift` today means **"every live function is accounted for,"** not **"production
matches git."** Don't let that distinction erode over time.

## What actually enforces "Git/PR is mandatory" (the real controls)

The manifest is necessary but not sufficient. Closing the gap for real means restricting
**who can deploy and how**, not just what gets *listed* as deployable:

1. **Audit who currently holds a Supabase access token (PAT) with write access to this
   project.** Any personal access token generated via the Supabase dashboard can deploy
   functions from anyone's laptop, indefinitely, until revoked. This should be inventoried —
   not assumed to be "just Boris."
2. **Move deploys to a CI service account, stop deploying from personal machines.** A GitHub
   Actions workflow (or equivalent) using a scoped, rotatable secret, triggered only on merge to
   `main` (or a tag), running `check:functions-drift` as a pre-deploy gate, becomes the *only*
   path that ever calls `supabase functions deploy`. This is a process change, not a code
   change — flagging it here as the next real step, not implementing it in this PR.
3. **Rotate the tokens currently in use once the CI path exists**, so old personal tokens that
   made direct deploys possible stop working. Until this happens, the manifest is documentation
   of intent, not enforcement.
4. **Supabase org-level role restrictions**, if the plan/org tier supports scoping which members
   can deploy Edge Functions vs. only read logs/config — worth checking, not yet verified as
   available on this project.
5. **Treat a live function with no manifest entry as an incident, not a curiosity** — that's what
   `check:functions-drift` is for; wiring its non-zero exit into an actual recurring check (even
   a manual `npm run check:functions-drift` run weekly, before real CI exists) beats not
   noticing for months.

Until steps 1-3 happen, assume Git/PR is a strong convention, not a hard guarantee — the same
caveat that was true before this reconciliation, just now written down instead of implicit.

## Classification model — why "unknown" always fails

Every live function must land in exactly one bucket, and only specific buckets are allowed to
avoid failing the check:

| Bucket | Fails the check? | Meaning |
|---|---|---|
| `functions` | No (unless `status: active` but not live, or vice versa) | Governed by this manifest — this repo's own audited, deployable functions |
| `owned_by_sibling_repo` | No | Verified (not guessed) to belong to paris-dispatcher — re-verify the list if that repo's functions change |
| `known_out_of_scope_local` | No | Already in this repo's git, already shipped before this reconciliation, deliberately not re-audited in this pass |
| `known_unreconciled` | **Yes** | Live, no git presence in *either* repo, not yet investigated — this is exactly the failure mode this whole reconciliation exists to catch, so it stays red until resolved |
| *(none — totally unclassified)* | **Yes** | The default. A brand-new live function appearing tomorrow with no manifest entry and no local folder fails loudly instead of being guessed into "probably fine" |

**As of this PR, `npm run check:functions-drift` exits non-zero** — the 4 `known_unreconciled`
functions (`notify-status-change`, `save-push-subscription`, `send-push-notification`,
`link-driver-telegram`) are still live and still unaudited. That's the honest current state, not
a bug to silence: resolving it means either recovering each into a repo (the same process used
for `create-reservation-fee-session`) or making a deliberate, documented decision to
deprioritize them into `known_out_of_scope_local` instead — never by silently deleting the
`known_unreconciled` entries.

`known_out_of_scope_local` covers the 8 functions already committed in this repo's git before
this reconciliation (`create-booking-payment`, `create-payment-intent`, `get-map-key`,
`get-stripe-key`, `send-booking-emails`, `send-contact-confirmation`, `send-email`,
`test-payment`) — deliberately not re-verified against production in this pass, but not
"unknown" either. Extending `DEPLOY_MANIFEST.json`'s governed `functions` block to actually
cover them requires auditing each one with the same rigor as the booking flow, not just moving
names between buckets.

Don't read a clean run of this script as "the whole project is governed" — only what's in
`functions` is actually audited; the other buckets are explicitly-tracked debt, not clean bills
of health.

## `status` vs `deploy_allowed` — deployed is not the same as authorized

A function can be `status: "active"` (it's the intended, currently-running handler for its job)
while `deploy_allowed: false` (it is *not* safe to rely on or redeploy right now). `stripe-webhooks`
is the concrete example: it's the canonical booking-payment handler by design, but its required
secret (`STRIPE_WEBHOOK_SECRET`) doesn't exist on the project, so it cannot verify a single Stripe
signature today. Marking it merely "active" without this distinction would let a future CI step
treat that as a green light. `check:functions-drift` surfaces any `active`-but-blocked function in
its own loud, non-failing "BLOCKED" section — visible, but not conflated with new drift, since
it's a known, already-documented condition rather than something that just changed.

## Legacy function policy
A function marked `"status": "legacy-preserved-no-deploy"` in the manifest:
- Lives in `supabase/legacy-functions/<slug>/`, never `supabase/functions/`.
- Ships with an `ARCHIVED.md` documenting why, its known issues, and a retirement checklist.
- `check:functions-drift` warns (not fails) if it's still live — expected until retirement is
  actually executed, not a bug in the check.
- Retirement (actually deleting the deployed function) is a separate, deliberate action gated on
  its own checklist — never a side effect of a git change.
