# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `72cea85`
- Last updated: `2026-02-10`

## Ultimos PRs mergeados en main

1. `#61` - Post-merge SSOT UX-LOCATION-FALLBACKS-01 DONE (`72cea85`)
2. `#60` - Centralize fallback locations (UX-LOCATION-FALLBACKS-01) (`3712daf`)
3. `#59` - Build-time sitemap.xml + robots.txt (UX-SEO-SITEMAP-ROBOTS-01) (`a3a91ca`)

## Ahora en curso

- **BOOKING-DB-ANTI-DOUBLEBOOK-01a** (P0/R2) - Anti-double-booking unique index

## Siguientes 3 items del plan (priorizados)

1. **BOOKING-DB-ANTI-DOUBLEBOOK-01b** (P1/R2) - Full tstzrange EXCLUDE constraint
2. **TZ-PARIS-DISPLAY-SSOT-01** (P2/R0) - Fix toLocaleString timezone violations
3. **CI-SEO-SITE-URL-01** (P2/R0) - Resolve VITE_PUBLIC_SITE_URL CI debt

## Regla de actualizacion

Cada PR debe actualizar este archivo con:

1. `main HEAD` (si cambió por merge reciente),
2. "Ahora en curso" (ID activo),
3. "Siguientes 3 items" (orden de prioridad).
