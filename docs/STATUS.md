# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `6bdad32`
- Last updated: `2026-02-14`

## Ultimos PRs mergeados en main

1. `#87` - Register excursion detail routes in router (TECH-EXCURSIONS-ROUTER-HOTFIX-01) (`6bdad32`)
2. `#85` - Create missing excursion detail pages (CONTENT-EXCURSIONS-PAGES-ENRICH-01) (`7d45077`)
3. `#83` - Content integrity audit site-wide i18n (CONTENT-AUDIT-SITEWIDE-I18N-01) (`a58416c`)

## Ahora en curso

- **OPS-STRIPE-LEGACY-DEPRECATE-01** (P2/R1) — PR2 merged (#79 / `d7c8606`), telemetry enabled — monitoring 48-72h for zero hits before PR3

## Siguientes 3 items del plan (priorizados)

1. **CONTENT-EVENTS-FRESHNESS-01** (P0/R0) — Update stale Events data (2025-01-13) + establish freshness workflow
2. **MEDIA-IMAGES-LIBRARY-01** (P0/R0) — Replace ~50-80 image placeholders with real/licensed assets (priority: Excursions)
3. **CONTENT-EXCURSIONS-FAQ-BLOCKS-01** (P1/R1) — Add detail blocks to Excursion pages (FAQ, Logistics)

## Urgent out-of-repo

- **None** — Previous RGPD concern (`Gestion-PES`) confirmed already PRIVATE ✅

## Workspace _lab audit (2026-02-10)
- 5 projects audited in `_lab/`, 4 archived, 1 still testing (boers-vtc-docs)
- VTC360 pricing engine: **no portage** — SSOT pricing already superior
- Full audit table: `docs/GOVERNANCE_CROSSREPO.md` §8
- **RGPD action**: `geinersito/Gestion-PES` repo is PUBLIC with real PII — set to PRIVATE

## Regla de actualizacion

Cada PR debe actualizar este archivo con:

1. `main HEAD` (si cambió por merge reciente),
2. "Ahora en curso" (ID activo),
3. "Siguientes 3 items" (orden de prioridad).
