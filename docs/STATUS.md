# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `a91a115`
- Last updated: `2026-02-10`

## Ultimos PRs mergeados en main

1. `#66` - Persist service_end_datetime + robust overlap handling (BOOKING-DB-ANTI-DOUBLEBOOK-01b-APP) (`a91a115`)
2. `#65` - Post-merge SSOT BOOKING-DB-ANTI-DOUBLEBOOK-01b DONE (`7336aa7`)
3. `#64` - EXCLUDE USING gist anti-overlap constraint (BOOKING-DB-ANTI-DOUBLEBOOK-01b) (`2daf54c`)

## Ahora en curso

- **RB-00-CANONICAL-STACK-01** (P0/R0) — Docs-only: define canonical payments/webhooks stack. Decision matrix + Go/No-Go checklist. BLOCKER for all payments work.

## BLOCKED (waiting for RB-00)

- **OPS-FN-CREATE-BOOKING-PAYMENT-NO-RETRY-ON-CONFLICT-01** (P1/R2) — BLOCKED by RB-00: must know canonical endpoint before applying conflict fix

## Siguientes 3 items del plan (priorizados, post RB-00)

1. **SEC-RESEND01-SECRETS-HYGIENE-01** (P0) — Move secrets out of VITE_* to Edge Functions (production blocker)
2. **OPS-WEBHOOK-IDEMPOTENCY-TABLE-01** (P1) — `processed_stripe_events` table + dedupe in canonical webhook
3. **OPS-FN-CREATE-BOOKING-PAYMENT-NO-RETRY-ON-CONFLICT-01** (P1) — Skip retry on 23P01/23505 in canonical endpoint

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
