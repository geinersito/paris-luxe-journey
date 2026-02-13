# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `8fd3365`
- Last updated: `2026-02-12`

## Ultimos PRs mergeados en main

1. `#78` - Stripe webhook cutover plan (OPS-STRIPE-LEGACY-DEPRECATE-01 / PR1 docs) (`8fd3365`)
2. `#77` - Make VITE_PUBLIC_SITE_URL optional with localhost fallback (CI-SEO-SITE-URL-01) (`8f33d2c`)
3. `#76` - Enforce Europe/Paris timezone for date display (TZ-PARIS-DISPLAY-SSOT-01) (`382d9fa`)

## Ahora en curso

- **OPS-STRIPE-LEGACY-DEPRECATE-01** (P2/R1) — Deprecate legacy stripe-webhooks handler (PR2 telemetry: #79 open)

## Siguientes 3 items del plan (priorizados)

1. **OPS-STRIPE-LEGACY-DEPRECATE-01 / PR3** (P2/R1) — Remove legacy handlers after 48-72h zero hits
2. **RGPD-GESTION-PES-REPO-PRIVATE-01** (P0) — Set Gestion-PES repo to PRIVATE (urgent)
3. (Next item from backlog)

## Urgent out-of-repo

- **RGPD-GESTION-PES-REPO-PRIVATE-01** (P0) — `geinersito/Gestion-PES` repo PUBLIC with real PII → set to PRIVATE

## Workspace _lab audit (2026-02-10)
- 5 projects audited in `_lab/`, 4 archived, 1 still testing (boers-vtc-docs)
- VTC360 pricing engine: **no portage** — SSOT pricing already superior
- Full audit table: `docs/GOVERNANCE_CROSSREPO.md` §8
- **RGPD action**: `geinersito/Gestion-PES` repo is PUBLIC with real PII — set to PRIVATE

## Regla de actualizacion

Cada PR debe actualizar este archivo con:

1. `main HEAD` (si cambió por merge reciente),
2. "Ahora en curso" (ID activo),
3. "Siguientes 3 items" (orden de prioridad).
