# Beta ERP - Tester Quickstart (1 page)

Last updated: 2026-03-01

## 1) What this beta is

You are testing the ERP beta used for real workflows:

- Dossier creation and editing
- Service management
- Invoice preparation and creation

Beta URL: `https://beta-erp.eliteparistransfer.com`

Access policy:

- Invite-only users
- No public signup
- Demo/anonymized data only

## 2) Login flow

1. Open invite email.
2. Accept invite and set password if requested.
3. Log in at the beta URL.

If login fails:

- Retry in private/incognito mode.
- Hard refresh (`Ctrl+F5`).
- Confirm you are using the invited email account.

## 3) Core scenario to test

### A) Dossier

- Go to Dossiers.
- Create a dossier with clear test title (example: `Beta Mission - D12`).

### B) D12 internal note behavior

Inside Dossier Detail:

1. Add internal note (TODO/incomplete note).
2. Save.
3. Refresh page.
4. Confirm note persists.
5. Edit note and save again.
6. Clear note (set null/empty) and save.
7. Refresh and confirm it remains cleared.

### C) Invoice warning guardrail

- In the same dossier, verify invoice actions show warning context when note exists.
- Try both invoice entry points (header and inline action).

### D) Dossiers list badge

- Return to Dossiers list.
- Confirm TODO badge appears when `internal_notes` is set.
- Confirm badge disappears after clear.

## 4) Build stamp to include in bug reports

Open Settings -> Build block and include:

- ENV
- Git SHA
- Build time

This is mandatory for reproducible reports.

## 5) What NOT to do

- Do not enter real passenger PII.
- Do not enter real payment data.
- Do not test in production ERP for beta scenarios.
- Do not share credentials.

## 6) Report format

Send all bugs with:

1. Steps performed (1 -> 2 -> 3)
2. Expected behavior
3. Actual behavior
4. Screenshot/video
5. Browser and device
6. Local time of issue
7. Build stamp values (ENV, SHA, Build time)

## 7) Fast troubleshooting

- Wrong environment: check Build stamp first.
- Old UI behavior: clear cache and hard refresh.
- Redirect/auth loop: verify Supabase redirect URLs include beta domain.
- Still blocked: provide full bug report using section 6.
