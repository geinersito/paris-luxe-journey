# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `8e0b4a3`
- Last updated: `2026-02-12`

## Ultimos PRs mergeados en main

1. `#72` - Delete unused client-side Resend helper (SEC-RESEND01 PR2) (`8e0b4a3`)
2. `#71` - Remove Stripe/Resend secrets from .env.example (SEC-RESEND01 PR1) (`e8c2ac2`)
3. `#70` - Canonical payments stack + register P0/P1 gaps (RB-00-CANONICAL-STACK-01) (`8140e44`)

## Ahora en curso

- **OPS-WEBHOOK-IDEMPOTENCY-TABLE-01** (P1/R2) — Create `processed_stripe_events` table + dedupe logic in canonical webhook

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
