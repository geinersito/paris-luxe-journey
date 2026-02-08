# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan vivo: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `372fce2`

## Ultimos PRs mergeados en main

1. `#33` - Stack normalization de z-index tokens (`372fce2`)
2. `#32` - Error inline especifico para `pickup === dropoff` (`f177a96`)
3. `#31` - CTA disabled hasta formulario valido + errores inline (`bd21e37`)

## Ahora en curso

- `PR #34` (`ux-details-sessionstorage-refresh-safe`)
- ID plan: `FLOW-DETAILS-SS-01`
- Risk class: `R1`
- Estado: pending merge review
- Gate R1:
  - `A)` Happy path ✅
  - `B)` Refresh details ✅
  - `C)` TTL expiry redirect ✅
  - `D)` Back/cancel consistency ✅
  - Security (`no sensitive data persisted`) ✅
  - Precedence (`state > session > redirect`) ✅

## Siguientes 3 items del plan (priorizados)

1. `PR-Doc1` - anclar trazabilidad Plan Vivo + STATUS en gobernanza
2. `PR-U1f` - top-nav coherence + dead-page protection
3. `PR-U1g` - separar `Hourly` del wizard `/booking`

## Regla de actualizacion

Cada PR debe actualizar este archivo con:

1. `main HEAD` (si cambió por merge reciente),
2. "Ahora en curso" (ID activo),
3. "Siguientes 3 items" (orden de prioridad).
