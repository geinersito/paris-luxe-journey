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

## Known current limitation — manifest scope

`DEPLOY_MANIFEST.json` today only covers the 5 functions touched by the 2026-08 booking-flow
reconciliation. Running `npm run check:functions-drift` right now will correctly report the
*other* 8 functions already committed in this repo (`create-booking-payment`,
`create-payment-intent`, `get-map-key`, `get-stripe-key`, `send-booking-emails`,
`send-contact-confirmation`, `send-email`, `test-payment`) as "DRIFT: no manifest entry" — this
is expected, not a bug: they were simply outside this pass's scope, not separately re-verified
against production. Extending the manifest to the full function set (and doing the same for
paris-dispatcher's functions) is real, deliberate follow-up work, not done here. Don't read a
clean run of this script today as "the whole project is governed" — only the booking flow is.

## Legacy function policy
A function marked `"status": "legacy-preserved-no-deploy"` in the manifest:
- Lives in `supabase/legacy-functions/<slug>/`, never `supabase/functions/`.
- Ships with an `ARCHIVED.md` documenting why, its known issues, and a retirement checklist.
- `check:functions-drift` warns (not fails) if it's still live — expected until retirement is
  actually executed, not a bug in the check.
- Retirement (actually deleting the deployed function) is a separate, deliberate action gated on
  its own checklist — never a side effect of a git change.
