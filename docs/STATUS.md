# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `2daf54c`
- Last updated: `2026-02-10`

## Ultimos PRs mergeados en main

1. `#64` - EXCLUDE USING gist anti-overlap constraint (BOOKING-DB-ANTI-DOUBLEBOOK-01b) (`2daf54c`)
2. `#63` - Post-merge SSOT BOOKING-DB-ANTI-DOUBLEBOOK-01a DONE (`1679a54`)
3. `#62` - Anti-double-booking unique index (BOOKING-DB-ANTI-DOUBLEBOOK-01a) (`164d193`)

## Ahora en curso

- (none)

## Siguientes 3 items del plan (priorizados)

1. **BOOKING-DB-ANTI-DOUBLEBOOK-01b-APP** (P1/R2) - Wire app to set service_end_datetime + handle overlap error
2. **TZ-PARIS-DISPLAY-SSOT-01** (P2/R0) - Fix toLocaleString timezone violations
3. **CI-SEO-SITE-URL-01** (P2/R0) - Resolve VITE_PUBLIC_SITE_URL CI debt

## Regla de actualizacion

Cada PR debe actualizar este archivo con:

1. `main HEAD` (si cambió por merge reciente),
2. "Ahora en curso" (ID activo),
3. "Siguientes 3 items" (orden de prioridad).
