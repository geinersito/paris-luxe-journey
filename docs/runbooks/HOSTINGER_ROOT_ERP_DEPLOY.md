# Hostinger Deploy Runbook (Root + ERP + Beta + Focus)

Status: canonical SSOT
Last validated: 2026-03-01

## Scope

This runbook defines deployment for:

- `eliteparistransfer.com` (public booking app, root)
- `erp.eliteparistransfer.com` (Paris Dispatcher ERP production)
- `beta-erp.eliteparistransfer.com` (Paris Dispatcher closed beta)
- `tasks.eliteparistransfer.com` or `focus.eliteparistransfer.com` (Focus Flow app)

## Supabase Project Mapping

- Project A (PROD): `urjsnguzzzwcnaxwghbo`
  - `paris-luxe-journey` (booking prod)
  - `paris-dispatcher` (ERP prod)
- Project B (BETA): `ytdvkklycayhvnnemvie`
  - `paris-dispatcher` beta only
- Focus Flow project: `scouogydjegfjalfyqla`
  - `focus-flow` only

Rule:

- Never build or deploy beta (`beta-erp`) with Project A credentials.
- Never point booking or ERP to the Focus Flow project.

## Hostinger Subdomain + Folder Targets

Recommended mapping:

- Root booking (`eliteparistransfer.com`) -> `public_html/`
- ERP prod (`erp.`) -> `public_html/erp/`
- ERP beta (`beta-erp.`) -> `public_html/beta-erp/`
- Focus Flow (`tasks.` or `focus.`) -> `public_html/tasks/` or `public_html/focus/`

In hPanel:

1. Create each subdomain in Domains -> Subdomains.
2. Assign a dedicated document root folder per app.
3. Upload each app build output (`dist/`) to the corresponding folder.

## Build Matrix

### Booking (paris-luxe-journey)

- Domain: `eliteparistransfer.com`
- Supabase: Project A
- Build:

```bash
npm ci
npm run build
```

### ERP Production (paris-dispatcher)

- Domain: `erp.eliteparistransfer.com`
- Supabase: Project A
- Build:

```bash
npm ci
npm run build
```

### ERP Beta (paris-dispatcher)

- Domain: `beta-erp.eliteparistransfer.com`
- Supabase: Project B
- Build:

```bash
npm ci
node scripts/build-env.cjs vite build --mode staging
```

### Focus Flow (focus-flow)

- Domain: `tasks.eliteparistransfer.com` (or `focus.eliteparistransfer.com`)
- Supabase: `scouogydjegfjalfyqla`
- Build:

```bash
npm ci
npm run build
```

## ERP and Focus SPA Fallback (.htaccess)

Use this in subdomain roots (`erp`, `beta-erp`, `tasks`/`focus`):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteRule ^index\.html$ - [L]

  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  RewriteRule ^ index.html [L]
</IfModule>
```

## Root Booking Fallback (B2, keep /api/* untouched)

Path: `public_html/.htaccess`

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteRule ^api/ - [L]
  RewriteRule ^index\.html$ - [L]

  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  RewriteRule ^ index.html [L]
</IfModule>
```

Expected:

- SPA routes refresh correctly.
- `/api/*` no longer returns `index.html` fallback.

## Supabase Auth URL Configuration

### Project A (PROD)

- Site URL: `https://eliteparistransfer.com`
- Redirect URLs:
  - `https://eliteparistransfer.com/*`
  - `https://erp.eliteparistransfer.com/*`
  - `http://localhost:8082/*` (luxe local)
  - `http://localhost:8080/*` (dispatcher local)

### Project B (BETA)

- Disable public signup (invite-only)
- Site URL: `https://beta-erp.eliteparistransfer.com`
- Redirect URLs:
  - `https://beta-erp.eliteparistransfer.com/*`
  - `http://localhost:8080/*`

### Focus Flow project

- Site URL: your focus domain (`https://tasks.eliteparistransfer.com` or equivalent)
- Redirect URLs:
  - focus production domain wildcard
  - focus localhost port wildcard (if used)

## Build Stamp Sanity Check (Dispatcher)

After deploy of ERP prod or beta:

1. Open Settings page.
2. In Build block, verify:
   - ENV matches expected mode (`production` or `staging`)
   - Git SHA is not `unknown`
   - Build time is not `unknown`
3. If stale values appear, clear cache and hard refresh.

## Cache Busting and Stale Content Recovery

After upload:

1. Purge Hostinger/LiteSpeed cache (if enabled).
2. Hard refresh (`Ctrl+F5`).
3. Test in private/incognito window.
4. If PWA cache is active:
   - DevTools -> Application -> Service Workers -> Unregister
   - DevTools -> Application -> Storage -> Clear site data

## Deploy Order (No Downtime, Low Risk)

1. Deploy ERP beta (`beta-erp`) first.
2. Validate beta login + deep-route refresh.
3. Deploy ERP production (`erp`).
4. Deploy booking root (`eliteparistransfer.com`) with B2 `.htaccess`.
5. Deploy Focus Flow on its dedicated subdomain.
6. Purge Hostinger cache and run smoke checks.

## Smoke Checklist (minimum)

- Root booking loads and deep routes refresh.
- `erp.` loads and deep routes refresh.
- `beta-erp.` loads and deep routes refresh.
- Build stamp on ERP pages shows non-unknown SHA/time.
- Supabase auth redirect works on each environment.
- `https://eliteparistransfer.com/api/...` no longer returns HTML fallback.
- Focus Flow domain loads and authenticates against `scouogydjegfjalfyqla`.

## Security Guardrails

- Never store secrets in `VITE_*` variables.
- Keep privileged keys only in backend or Edge Function secrets.
- Keep beta data anonymized and separate from production.

## Change Log

- 2026-03-01: Canonicalized root/erp/beta/focus deployment runbook.
- 2026-03-01: Added Project A/B/focus mapping, auth redirects, and build stamp sanity checks.
