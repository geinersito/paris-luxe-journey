# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `c06d6c1`
- Last updated: `2026-02-08`

## Ultimos PRs mergeados en main

1. `#40` - Separate Hourly intent from `/booking` wizard (NAV-HOURLY-01) (`c06d6c1`)
2. `#38` - Global 404 fallback + dead-page protection (`74ec0b5`)
3. `#37` - Close OPS-MIG-01 and refresh STATUS (`5e135f0`)

## Ahora en curso

- `UX-HEADER-I18N-01` - dropdown de idioma nítido + navbar estable en traducciones largas (P1/R0)
  - PR: [#41](https://github.com/geinersito/paris-luxe-journey/pull/41)
  - Gates R0:
    - [ ] npm run type-check
    - [ ] npx eslint (touched files)
    - [ ] Smoke: switch FR/EN/ES on /, /booking, /hourly (navbar stable + dropdown closes + labels correct)

## Siguientes 3 items del plan (priorizados)

1. `(slot libre)` - definir siguiente item canónico en SSOT
2. `(slot libre)` - definir siguiente item canónico en SSOT
3. `(slot libre)` - definir siguiente item canónico en SSOT

## Regla de actualizacion

Cada PR debe actualizar este archivo con:

1. `main HEAD` (si cambió por merge reciente),
2. "Ahora en curso" (ID activo),
3. "Siguientes 3 items" (orden de prioridad).
