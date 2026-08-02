# Hostinger Deploy Runbook (Root + ERP + Beta + Focus)

Status: canonical SSOT
Last validated: 2026-08-02

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
- Focus Flow (`tasks.`) -> `public_html/tasks/` (single confirmed destination — see "Destination mapping" below)

In hPanel:

1. Create each subdomain in Domains -> Subdomains.
2. Assign a dedicated document root folder per app.
3. Upload each app build output (`dist/`) to the corresponding folder.

## SSH/SFTP Deploy Method (persistent key)

All four apps share the same Hostinger account/server — one SSH alias covers
all of them; only the destination folder changes.

- Expected local SSH alias (every operator sets this up themselves): `eliteparis-hostinger`
- The alias is defined only in each operator's local `~/.ssh/config`, which
  resolves the host, port, and account username. None of that — nor any
  host-key fingerprint — is recorded in this repo. It is operator-local
  configuration, not project state.
- The private key is ED25519, passphrase-protected, registered in the local
  OS keychain/agent. It never leaves the operator's machine: never committed,
  never pasted into chat/tool logs, never printed by any script.
- `StrictHostKeyChecking yes` is mandatory in the alias config — pin the
  observed host key to the operator's own `known_hosts` on first connect
  (trust-on-first-use); do not disable host-key checking.

Destination mapping — this table is the **official source of truth** for
where each repo's build goes. The SSH alias only identifies the server; it
never implies a destination. Each repo must declare its own remote target
explicitly (see "Planned: per-repo deploy config" below) rather than relying
on this being inferred, remembered, or improvised in conversation:

| Repository | Artifact | Remote destination |
|---|---|---|
| `paris-luxe-journey` | `dist/` | `public_html/` |
| `paris-dispatcher` (production) | ERP build | `public_html/erp/` |
| `paris-dispatcher` (beta) | ERP beta build | `public_html/beta-erp/` |
| Focus Flow / Tasks | corresponding build | `public_html/tasks/` |

A single SSOT destination per app, not a choice: `public_html/tasks/` is the
confirmed target. A separate `public_html/focus/` folder, if one turns out
to actually exist on the server, is not covered by this mapping — it would
need its own audit and its own row, as a distinct app, before any deploy
targets it.

Planned: per-repo deploy config (not yet implemented — tracked as follow-up
work, one micro-PR per repo). Each repo will declare its own non-secret
deploy target — e.g. in a versioned `.env.deploy.example` or inline in that
repo's own deploy script:

```bash
DEPLOY_SSH_ALIAS=eliteparis-hostinger
DEPLOY_REMOTE_DIR=public_html/
```

For `paris-dispatcher`:

```bash
DEPLOY_SSH_ALIAS=eliteparis-hostinger
DEPLOY_REMOTE_DIR=public_html/erp/
DEPLOY_BETA_REMOTE_DIR=public_html/beta-erp/
```

The eventual deploy script (`npm run deploy:hostinger`) must validate,
before transferring anything:

- Expected repository name.
- Exact SSH alias.
- Destination is inside an explicit allow-list.
- Presence of characteristic remote markers for that destination.
- Human confirmation showing source and destination before writing.
- No arbitrary destination accepted via a CLI argument.

Mandatory transfer rules (all apps, every deploy):

- Build the booking app with the production site URL explicitly set, or
  canonical/OG tags silently fall back to `localhost`:

  ```bash
  npm ci
  VITE_PUBLIC_SITE_URL=https://eliteparistransfer.com npm run build
  ```

- **Two-phase transfer, `index.html` always last.** Sync everything in
  `dist/` except `.htaccess` and `index.html` first. Only if that phase
  completes with zero failed transfers, sync `index.html`. This keeps the
  window where HTML could reference assets that haven't arrived yet as short
  as possible, and guarantees a failed asset sync never leaves a new
  `index.html` live pointing at missing hashed chunks.
- **Never upload `dist/.htaccess`.** The remote `.htaccess` (and
  `.htaccess.bk`) are managed independently per the fallback rules elsewhere
  in this doc and must not be overwritten by a routine app deploy.
- **Never use `--delete`, `rm`, or any remote cleanup step.** Merge/overwrite
  only. This is what keeps one app's deploy from ever touching another app's
  folder (`.private/`, `driver/`, `erp/`, `beta-driver/`, `beta-erp/`,
  `tasks/`, or any `images.*` backup folder) — those simply aren't part of
  any single app's `dist/`, so an additive-only sync leaves them untouched
  by construction.

Backup before deploy:

- Hostinger maintains managed backups according to the hosting plan — this
  is not purely a DIY/manual situation. Before deploying, confirm a recent
  backup exists for the target folder (hPanel -> Files -> Backups), or
  trigger a manual one if the most recent one is too old. A remote tarball
  snapshot over the SSH alias is an optional extra a deploy script may take
  in addition — it is not a substitute for the hPanel-managed backup.

Post-deploy smoke (public, visitor-facing):

- Load the production URL in a real browser — not just `curl` — since a CDN
  or reverse-proxy layer can return `200` on a stale cached page.
- Diff the remote `index.html` against the local `dist/index.html`; they
  must be byte-identical.
- Confirm `robots.txt`/`sitemap.xml` reference the production domain, not
  `localhost`.

Service worker check (returning visitors) — read this before declaring a
deploy visually confirmed:

1. Load the production URL in a clean/incognito session first. This only
   tells you the new build is being served at all — it says nothing about
   returning visitors.
2. Then load it in a normal, already-visited browser session. This is the
   case that actually matters: this app registers a PWA service worker, and
   a returning visitor's browser can keep serving the previous build even
   after a fully successful deploy, independent of any server-side cache.
3. If that recurring session still shows the old version, try an ordinary
   reload first (Cmd-R / Ctrl-R) and record what happens — don't skip
   straight to clearing state.
4. Unregistering the service worker and clearing site data (DevTools ->
   Application -> Service Workers -> Unregister; Application -> Storage ->
   Clear site data) is a last-resort **local diagnostic** step to confirm
   the new build exists at all. It is **not** a valid way to declare the
   deploy itself correct for returning visitors — doing that destroys
   exactly the "returning visitor" state you were supposed to be checking.

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

## Pre-Deploy: Validate dist/ Is Complete (CRITICAL)

Before uploading, verify the build output is real — `npm run build` exits 0
even if Vite finds no entry point and produces only `index.html`.

A valid build must contain:
- `dist/index.html`
- `dist/assets/*.js` (multiple JS chunks)
- `dist/assets/*.css`

Quick check:
```bash
ls dist/assets/ | grep -c "\.js"   # must be > 10
```

If `dist/assets/` is empty or missing: the build is broken. Do NOT deploy.
Known cause: `index.html` entry point not a static `<script type="module" src="...">`.
See commit `6572389` (2026-03-19) for the fix.

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
2. Load in a clean/incognito session first — confirms the new build is
   being served at all.
3. Load in a normal, already-visited (recurring) session — this is the case
   that actually matters for this PWA-enabled app.
4. If the recurring session still shows the old version, try an ordinary
   reload first (`Cmd-R` / `Ctrl-R`) and record what happens.
5. Only as a last-resort **local diagnostic** — never as the criterion for
   declaring the deploy correct — unregister the service worker and clear
   site data (DevTools -> Application -> Service Workers -> Unregister;
   Application -> Storage -> Clear site data). This confirms the new build
   exists, but it destroys the exact "returning visitor" state you were
   supposed to be checking, so it can't validate that case.

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

## Rollback Procedure

Hostinger maintains managed backups according to the hosting plan — this is
not a manual/DIY-only situation.

1. **Preferred: restore from hPanel — selectively, never the whole folder.**
   For ERP prod/beta/Tasks, whose destination folders (`public_html/erp/`,
   `public_html/beta-erp/`, `public_html/tasks/`) are dedicated to that one
   app, a full-folder restore from a recent backup (hPanel -> Files ->
   Backups) is safe.

   For **Booking**, the destination is `public_html/` itself, which is
   **shared** with `.htaccess`, `.private/`, `driver/`, `erp/`, `beta-driver/`,
   `beta-erp/`, `tasks/`, and any `images.*` folders that belong to other
   apps. A blind full-folder restore of `public_html/` would silently roll
   those back too, or delete ones created after the backup was taken. For
   Booking, restore (or manually re-copy from the backup) **only the files
   Booking's own build actually owns** — `index.html`, `assets/`,
   `images/library/`, and the other root-level static files listed in the
   Build Matrix section — and explicitly leave `.htaccess`, `.private/`,
   `driver/`, `erp/`, `beta-driver/`, `beta-erp/`, `tasks/`, and `images.*`
   untouched. Never restore all of `public_html/` wholesale for a Booking
   rollback.
2. **Fallback: rebuild from git in a fresh, isolated worktree — never on the
   current working tree**, since checking out a commit directly on top of
   whatever the operator has open would destroy any local uncommitted work.
   Use a freshly created, empty directory — do not assume a fixed path like
   `/tmp/rollback-build` is free; another process or a previous rollback may
   already be using it:

   ```bash
   ROLLBACK_PARENT=$(mktemp -d /tmp/rollback-build.XXXXXX)
   ROLLBACK_DIR="$ROLLBACK_PARENT/worktree"
   git worktree add "$ROLLBACK_DIR" <last-good-sha>
   cd "$ROLLBACK_DIR"
   npm ci
   VITE_PUBLIC_SITE_URL=https://eliteparistransfer.com npm run build
   ```

   `git worktree add` fails if its target path already exists — `mktemp -d`
   creates the parent directory itself, so the worktree goes one level
   below it, in a path that is guaranteed not to exist yet.

   Remove both afterward:

   ```bash
   git worktree remove "$ROLLBACK_DIR"
   rmdir "$ROLLBACK_PARENT"
   ```
3. If rebuilding, re-run the same two-phase transfer (everything except
   `.htaccess`/`index.html` first, `index.html` last) against the same
   destination folder, and — for Booking specifically — only the files it
   owns, per point 1 above. Same rules apply: no `--delete`, no `rm`, no
   remote cleanup.
4. Re-run the full post-deploy smoke checklist above, including the
   returning-visitor service worker check (clean session, then recurring
   session, then plain reload before any unregister/clear-data diagnostic).

A remote tarball snapshot (see "Backup before deploy") is an optional extra,
not a substitute for the hPanel-managed backup — don't rely on it as the
only rollback path.

## Security Guardrails

- Never store secrets in `VITE_*` variables.
- Keep privileged keys only in backend or Edge Function secrets.
- Keep beta data anonymized and separate from production.

## Change Log

- 2026-08-02: Documented the persistent SSH/SFTP deploy method (renamed from an earlier draft that mentioned `rsync`, which was not the tool actually validated) — expected local alias `eliteparis-hostinger`, a single-destination-per-app mapping table as source of truth, applied consistently everywhere in this doc (Focus/Tasks resolved to the one confirmed target, `public_html/tasks/`, not an "or" choice — a second pass found and fixed a leftover contradiction in the older "Hostinger Subdomain + Folder Targets" section), mandatory two-phase transfer (`.htaccess` excluded, `index.html` always last, no `--delete`/`rm`/remote cleanup), and planned per-repo deploy config (`DEPLOY_SSH_ALIAS`/`DEPLOY_REMOTE_DIR`, allow-listed destinations, human confirmation before write) as tracked follow-up work, one micro-PR per repo. Corrected the backup/rollback section: Hostinger maintains managed backups per the hosting plan (an earlier draft incorrectly claimed there was none) — hPanel restore is the preferred rollback path, but for Booking (`public_html/` is shared with ERP/beta/Tasks and other apps) the restore must be selective, restoring only Booking-owned files and explicitly preserving `.htaccess`, `.private/`, `driver/`, `erp/`, `beta-driver/`, `beta-erp/`, `tasks/`, and `images.*` — never a blind full-folder restore; a remote tarball is optional and not a substitute. The git-rebuild fallback now uses a freshly created (`mktemp`) isolated `git worktree` rather than a fixed path or the operator's working tree. Corrected the service-worker check (both here and in the older "Cache Busting" section, which previously contradicted it) to test clean session vs. recurring session vs. plain reload, in that order — unregister/clear-data is a last-resort local diagnostic, not the criterion for declaring a deploy correct. `docs/STATUS.md` corrected from "SFTP/rsync manual" to "SFTP manual" to match the actually-validated method. No secrets, IP, port, username, or fingerprints recorded — those stay in each operator's local `~/.ssh/config`.
- 2026-03-19: Added pre-deploy dist/ validation guardrail (incident: broken build from dynamic entry point).
- 2026-03-01: Canonicalized root/erp/beta/focus deployment runbook.
- 2026-03-01: Added Project A/B/focus mapping, auth redirects, and build stamp sanity checks.
