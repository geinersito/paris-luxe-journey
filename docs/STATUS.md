# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `e219398`
- Last updated: `2026-02-12`

## Ultimos PRs mergeados en main

1. `#75` - Smart retry classifier for create-booking-payment (OPS-FN-CREATE-BOOKING-PAYMENT-NO-RETRY-ON-CONFLICT-01) (`e219398`)
2. `#74` - Dedupe logic in stripe-webhooks (OPS-WEBHOOK-IDEMPOTENCY-TABLE-01 PR2) (`3e51bad`)
3. `#73` - DB migration for processed_stripe_events (OPS-WEBHOOK-IDEMPOTENCY-TABLE-01 PR1) (`7e31067`)

## Ahora en curso

- **TZ-PARIS-DISPLAY-SSOT-01** (P2/R0) — Audit + fix toLocaleString without timeZone (PR #76 open)

## Siguientes 3 items del plan (priorizados)

1. **TZ-PARIS-DISPLAY-SSOT-01** (P2) — Audit + fix toLocaleString without timeZone (PR #76 open)
2. **CI-SEO-SITE-URL-01** (P2) — Resolve VITE_PUBLIC_SITE_URL CI debt
3. **OPS-STRIPE-LEGACY-DEPRECATE-01** (P2) — Deprecate legacy stripe-webhooks handler

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
