# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `3e51bad`
- Last updated: `2026-02-12`

## Ultimos PRs mergeados en main

1. `#74` - Dedupe logic in stripe-webhooks (OPS-WEBHOOK-IDEMPOTENCY-TABLE-01 PR2) (`3e51bad`)
2. `#73` - DB migration for processed_stripe_events (OPS-WEBHOOK-IDEMPOTENCY-TABLE-01 PR1) (`7e31067`)
3. `#72` - Delete unused client-side Resend helper (SEC-RESEND01 PR2) (`8e0b4a3`)

## Ahora en curso

- **OPS-FN-CREATE-BOOKING-PAYMENT-NO-RETRY-ON-CONFLICT-01** (P1/R2) — Skip retry on deterministic conflicts (23P01/23505) in canonical endpoint

## Siguientes 3 items del plan (priorizados)

1. **OPS-FN-CREATE-BOOKING-PAYMENT-NO-RETRY-ON-CONFLICT-01** (P1) — Skip retry on 23P01/23505 in canonical endpoint (unblocked by RB-00)
2. **TZ-PARIS-DISPLAY-SSOT-01** (P2) — Audit + fix toLocaleString without timeZone
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
