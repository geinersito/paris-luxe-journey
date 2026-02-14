# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD (Last feature merge baseline)

Docs-only PRs may be newer than this SHA; see "Ultimos PRs" for exact merge order.

- Branch: `main`
- SHA: `61f838f`
- Last updated: `2026-02-14`

## Ultimos PRs mergeados en main

1. `#96` - docs(status): sync head after PR #94 (`46185a1`)
2. `#94` - docs(status): sync head after PR #93 (`61f838f`)
3. `#93` - docs(status): sync head after PR #92 (`ac8448e9`)
4. `#92` - SSOT post-merge sync after PR #91 (`e9eee59`)
5. `#91` - UX A11Y contrast fix for Excursions hero chips (UX-A11Y-EXCURSIONS-HERO-CHIPS-CONTRAST-01) (`b234e65`)
6. `#89` - UX excursions list compact pass (UX-EXCURSIONS-LIST-COMPACT-01) (`445cf19`)

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

1. `main HEAD` baseline (solo cuando cambie el ultimo merge de feature/hotfix, no por PRs docs-only),
2. "Ahora en curso" (ID activo),
3. "Siguientes 3 items" (orden de prioridad).
