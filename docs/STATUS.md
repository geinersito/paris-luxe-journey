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

- **OPS-FN-CREATE-BOOKING-PAYMENT-NO-RETRY-ON-CONFLICT-01** (P1/R2) - Stop retry loop on deterministic DB conflicts (23P01/23505)

## Siguientes 3 items del plan (priorizados)

1. **TZ-PARIS-DISPLAY-SSOT-01** (P2/R0) - Fix toLocaleString timezone violations
2. **CI-SEO-SITE-URL-01** (P2/R0) - Resolve VITE_PUBLIC_SITE_URL CI debt
3. **OPS-STRIPE-LEGACY-DEPRECATE-01** (P2/R1) - Deprecate legacy stripe-webhooks handler

## Regla de actualizacion

Cada PR debe actualizar este archivo con:

1. `main HEAD` (si cambió por merge reciente),
2. "Ahora en curso" (ID activo),
3. "Siguientes 3 items" (orden de prioridad).
