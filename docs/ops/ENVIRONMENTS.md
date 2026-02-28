# ENVIRONMENTS (Mirror)

**Mirror copy — Source of Truth (SSOT):**
`paris-dispatcher/docs/ops/ENVIRONMENTS.md`
- Update the canonical file first.
- Then sync this mirror.

# Environments (Supabase) — PROD / STAGING / Focus-flow

Status: SSOT ✅ (LOCKED)  
Last updated: 2026-02-28

## Purpose
Prevent accidental deploys/builds against the wrong Supabase project and standardize environment usage across local/dev/staging/prod.

## Supabase Projects Map

### A — PROD (Dispatcher + Luxe)
- Project ref: `urjsnguzzzwcnaxwghbo`
- Supabase URL: `https://urjsnguzzzwcnaxwghbo.supabase.co`
- Used by:
  - `paris-dispatcher` (ERP prod)
  - `paris-luxe-journey` (public booking prod)
- Domains:
  - `https://erp.eliteparistransfer.com` (ERP prod)
  - `https://eliteparistransfer.com` (booking prod)

### B — STAGING / BETA (ERP closed beta)
- Project ref: `ytdvkklycayhvnnemvie`
- Supabase URL: `https://ytdvkklycayhvnnemvie.supabase.co`
- Used by:
  - `paris-dispatcher` staging (closed beta)
  - (optional later) `paris-luxe-journey` staging
- Domains:
  - `https://beta-erp.eliteparistransfer.com` (ERP beta)

### Focus-flow (separate product)
- Project ref: `scouogydjegfjalfyqla`
- Used by:
  - `focus-flow` only
- Rule:
  - Never reuse this project for dispatcher/luxe environments.

### Extra project (reserved)
- Status: available
- Recommended use:
  - `focus-flow` staging OR a dedicated “danger sandbox” (experiments).

## Environment Files (Vite)
Vite bakes env variables at build time. Always build with the correct mode/env file.

### `.env.production` (PROD = Supabase A)
Required:
- `VITE_SUPABASE_URL=https://urjsnguzzzwcnaxwghbo.supabase.co`
- `VITE_SUPABASE_ANON_KEY=...`
Optional:
- `VITE_ENV=production`

### `.env.staging` (STAGING/BETA = Supabase B)
Required:
- `VITE_SUPABASE_URL=https://ytdvkklycayhvnnemvie.supabase.co`
- `VITE_SUPABASE_ANON_KEY=...`
Optional:
- `VITE_ENV=staging`

## Build Commands (safe)
- PROD build:
  - `npm run build` (uses production defaults)
- STAGING build:
  - `npm run build -- --mode staging`

## Guardrails (security)
- Never put secrets in `VITE_*` variables.
  - `VITE_*` is public in the browser bundle.
- Privileged keys belong in backend/Edge Functions secrets only (Supabase secrets).
- Treat STAGING data as non-sensitive: use demo/anonymized data.

## Supabase Auth URLs (minimum)
For STAGING/BETA project (`ytdv...`):
- Disable public signups (invite-only)
- Site URL: `https://beta-erp.eliteparistransfer.com`
- Redirect URLs:
  - `https://beta-erp.eliteparistransfer.com/*`
  - `http://localhost:8080/*`

## Operational Rule
Before applying migrations or pushing schema, verify:
- Current linked project (`supabase link --project-ref ...`)
- Supabase URL in active env file
- Domain being deployed (prod vs beta)

