# Hostinger Deploy Runbook (Root + ERP)

## Scope

This runbook defines the production deploy model for:

- `eliteparistransfer.com` (public booking site, root)
- `erp.eliteparistransfer.com` (Paris Dispatcher ERP, subdomain)

Both apps use the same Supabase project.

Last validated: 2026-02-28.

---

## Architecture Decision

- Root site (`eliteparistransfer.com`) stays on `paris-luxe-journey`.
- ERP goes to subdomain (`erp.eliteparistransfer.com`) from `paris-dispatcher`.
- Root `.htaccess` must use **B2**: exclude `/api/*` from SPA fallback.
- ERP `.htaccess` uses normal SPA fallback.

Why B2:

- Avoid false `200 index.html` responses for missing API endpoints.
- Fail fast on real missing backend routes.

---

## Current Reality Check (2026-02-28)

`https://eliteparistransfer.com/api/pricing/calculate` currently returns HTML (index), not API JSON.

- `GET` returned `200 text/html`
- `POST` returned `200 text/html`

So `/api/*` is currently not a real backend on the domain root.

---

## hPanel File Targets

- Root booking app:
  - `public_html/`
- ERP subdomain app:
  - `public_html/erp/` (or Hostinger subdomain document root if different)

---

## Final .htaccess (Root, booking)

Path: `public_html/.htaccess`

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Do not rewrite /api/*
  RewriteRule ^api/ - [L]

  # Do not rewrite index
  RewriteRule ^index\.html$ - [L]

  # Serve existing files/folders directly
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # SPA fallback
  RewriteRule ^ index.html [L]
</IfModule>
```

Expected behavior:

- `/` works
- deep routes work with refresh
- `/api/...` no longer falls back to HTML

---

## Final .htaccess (ERP subdomain)

Path: subdomain root, for example `public_html/erp/.htaccess`

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

Expected behavior:

- `/` works
- `/dossiers` works
- refresh on deep ERP routes works

---

## Build Inputs (Do Not Skip)

Vite bakes env at build time. Correct env must exist before `npm run build`.

### paris-luxe-journey

Required:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Optional (still public if present, do not put secrets):

- `VITE_PUBLIC_SITE_URL`

### paris-dispatcher

Required:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Optional:

- `VITE_INVOICING_DATASOURCE`

---

## Security Guardrails (Critical)

- Never put private credentials in `VITE_*`.
- `VITE_*` is public in browser bundles.
- Keep privileged keys (SendGrid, Twilio, service-role) in Supabase secrets or backend only.

---

## Supabase Auth URL Configuration

Auth > URL Configuration:

- Site URL:
  - `https://eliteparistransfer.com`
- Redirect URLs:
  - `https://eliteparistransfer.com/*`
  - `https://erp.eliteparistransfer.com/*`
  - `http://localhost:8082/*` (luxe local)
  - `http://localhost:8080/*` (dispatcher local)

---

## No-Downtime Deploy Order

1. Deploy ERP subdomain first.
2. Validate ERP deep route refresh.
3. Deploy root booking site with B2 `.htaccess`.
4. Clear PWA cache for root site.
5. Run smoke tests for both apps.

---

## Post-Deploy Smoke Checklist (10 points)

1. `https://erp.eliteparistransfer.com/` loads.
2. `https://erp.eliteparistransfer.com/dossiers` loads.
3. Refresh deep ERP route (no 404).
4. `https://eliteparistransfer.com/` loads.
5. Refresh deep booking route (no 404).
6. Booking flow active path still works (details -> payment -> confirmation).
7. Supabase login/logout redirect works on both domains.
8. `https://eliteparistransfer.com/api/pricing/calculate` does not return HTML fallback.
9. Browser console has no new fatal runtime errors.
10. Network tab has no unexpected 404/500 on active user flows.

---

## PWA Cache Reset Procedure (Root Site)

After root deploy, if behavior looks stale:

1. Open site in incognito/private mode.
2. Hard refresh (`Ctrl+F5`).
3. Chrome DevTools > Application > Service Workers > Unregister.
4. DevTools > Application > Storage > Clear site data.

---

## Hostinger Cache Purge (If Enabled)

If Hostinger/LiteSpeed cache is enabled, purge it after deploy.

Why:

- Old HTML/assets may still be served even if files were updated.
- This can look like deploy did not apply.

Minimum action:

1. hPanel > website cache section > purge/clear cache.
2. Re-test with hard refresh and incognito.

---

## Security Headers (Optional, Recommended)

If managed at hosting/app edge, add baseline headers:

- `X-Frame-Options: SAMEORIGIN` (or CSP `frame-ancestors`)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

Use a CSP policy only after validating all external scripts/services used by both apps.

---

## `/api/*` Audit Result (Current)

Only one local `/api/*` call was found in `src`:

- `src/hooks/booking/usePricingV312.ts` -> `fetch('/api/pricing/calculate')`

Current state:

- This path is tied to V312 flow code not mounted in the main router.
- Active booking payment flow uses Supabase functions, not `/api/pricing/calculate`.

Operational decision:

- Keep B2 in production.
- If V312 flow is reactivated, migrate this call to a real backend/Edge Function first.

---

## Future Activation Rule (V312)

Before enabling BookingFlow V312 in production:

1. Replace `/api/pricing/calculate` call with real endpoint.
2. Validate CORS + auth strategy.
3. Add explicit error message for "Pricing API not deployed".
4. Re-run smoke tests on booking flow.

---

## Change Log

- 2026-02-28: Initial consolidated runbook created (root + ERP + B2 + PWA + security guardrails).
- 2026-02-28: Added Hostinger cache purge note and optional security headers section.
