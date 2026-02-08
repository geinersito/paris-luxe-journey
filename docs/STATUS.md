# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `74ec0b5`
- Last updated: `2026-02-08`
- Current working branch: `nav-hourly-01`

## Ultimos PRs mergeados en main

1. `#38` - Global 404 fallback + dead-page protection (`74ec0b5`)
2. `#37` - Close OPS-MIG-01 and refresh STATUS (`5e135f0`)
3. `#28` - Reconcile Supabase migration history (Remote = SSOT) (`e34ab9b`)

## Ahora en curso

- `NAV-HOURLY-01` - Separating Hourly intent from `/booking` wizard (PR #39, branch `nav-hourly-01`)
  - ✅ Created `/hourly/quote` page with `intent=hourly` guard
  - ✅ Updated Hourly CTAs to route to `/hourly/quote?intent=hourly`
  - ✅ Added guard in `/booking` to redirect `intent=hourly` to `/hourly`
  - ✅ Verified sessionStorage separation (hourly uses contact flow, no booking snapshot)
  - ⏳ Gates: type-check, build, eslint pending
  - ⏳ Manual smoke R1 (A/B/C/D) pending

## Siguientes 3 items del plan (priorizados)

1. `NAV-HOURLY-01` - separar `Hourly` del wizard `/booking` (legacy: `PR-U1g`)
2. `UX-HEADER-I18N-01` - dropdown de idioma nitido + navbar estable en traducciones largas
3. `(slot libre)` - definir siguiente item canonico en SSOT

## Regla de actualizacion

Cada PR debe actualizar este archivo con:

1. `main HEAD` (si cambió por merge reciente),
2. "Ahora en curso" (ID activo),
3. "Siguientes 3 items" (orden de prioridad).
