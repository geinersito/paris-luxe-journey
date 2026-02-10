# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `c9d845b`
- Last updated: `2026-02-10`

## Ultimos PRs mergeados en main

1. `#67` - Foundation i18n: add vehicleUnavailable booking error key (`c9d845b`)
2. `#68` - Post-merge SSOT BOOKING-DB-ANTI-DOUBLEBOOK-01b-APP (`9f0a3e4`)
3. `#66` - Persist service_end_datetime + robust overlap handling (BOOKING-DB-ANTI-DOUBLEBOOK-01b-APP) (`a91a115`)

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
