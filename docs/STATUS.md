# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `8e00b02`
- Last updated: `2026-02-08`

## Ultimos PRs mergeados en main

1. `#34` - Details refresh-safe via session snapshot (`8e00b02`)
2. `#35` - Plan SSOT + status dashboard + PR governance (`feb13f7`)
3. `#33` - Stack normalization de z-index tokens (`372fce2`)

## Ahora en curso

- `OPS-MIG-01` - reconcile Supabase migrations (Remote = SSOT) en PR abierto [#28](https://github.com/geinersito/paris-luxe-journey/pull/28)

## Siguientes 3 items del plan (priorizados)

1. `NAV-COHERENCE-01` - top-nav coherence + dead-page protection (legacy: `PR-U1f`)
2. `NAV-HOURLY-01` - separar `Hourly` del wizard `/booking` (legacy: `PR-U1g`)
3. `UX-HEADER-I18N-01` - dropdown de idioma nitido + navbar estable en traducciones largas

## Regla de actualizacion

Cada PR debe actualizar este archivo con:

1. `main HEAD` (si cambió por merge reciente),
2. "Ahora en curso" (ID activo),
3. "Siguientes 3 items" (orden de prioridad).
