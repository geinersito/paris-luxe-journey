# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `e40d506`
- Last updated: `2026-02-08`

## Ultimos PRs mergeados en main

1. `#41` - Compact language selector + navbar stability (UX-HEADER-I18N-01) (`e40d506`)
2. `#40` - Separate Hourly intent from `/booking` wizard (NAV-HOURLY-01) (`c06d6c1`)
3. `#38` - Global 404 fallback + dead-page protection (`74ec0b5`)

## Ahora en curso

- **DOCS-PLAN-RECON-01** (P0/R0) - Reconcile legacy PLAN_VIVO items into canonical SSOT

## Siguientes 3 items del plan (priorizados)

After reconciliation complete, recommended next items:

1. **FLOW-BOOKING-CONFIRMATION-ROBUST-01** (P2/R1) - Robustify `/booking/confirmation` (refresh/back behavior + explicit Paris timezone)
2. **NAV-ABOUT-CONTACT-FLEET-01** (P2/R1) - About/Contact/Fleet: anchors vs pages (coherence)
3. **UX-TIMEPICKER-COMPACT-01** (P2/R0) - Time picker compact (quick win: "selector demasiado largo")

## Regla de actualizacion

Cada PR debe actualizar este archivo con:

1. `main HEAD` (si cambió por merge reciente),
2. "Ahora en curso" (ID activo),
3. "Siguientes 3 items" (orden de prioridad).
