# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `7336aa7`
- Last updated: `2026-02-10`

## Ultimos PRs mergeados en main

1. `#65` - Post-merge SSOT BOOKING-DB-ANTI-DOUBLEBOOK-01b DONE (`7336aa7`)
2. `#64` - EXCLUDE USING gist anti-overlap constraint (BOOKING-DB-ANTI-DOUBLEBOOK-01b) (`2daf54c`)
3. `#63` - Post-merge SSOT BOOKING-DB-ANTI-DOUBLEBOOK-01a DONE (`1679a54`)

## Ahora en curso

- **BOOKING-DB-ANTI-DOUBLEBOOK-01b-APP** (P1/R2) - Wire app: persist service_end_datetime + handle overlap (23P01)

## Siguientes 3 items del plan (priorizados)

1. **TZ-PARIS-DISPLAY-SSOT-01** (P2/R0) - Fix toLocaleString timezone violations
2. **CI-SEO-SITE-URL-01** (P2/R0) - Resolve VITE_PUBLIC_SITE_URL CI debt
3. **OPS-STRIPE-LEGACY-DEPRECATE-01** (P2/R1) - Deprecate legacy stripe-webhooks handler

## Regla de actualizacion

Cada PR debe actualizar este archivo con:

1. `main HEAD` (si cambió por merge reciente),
2. "Ahora en curso" (ID activo),
3. "Siguientes 3 items" (orden de prioridad).
