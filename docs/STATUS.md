# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `c516aff`
- Last updated: `2026-02-14`

## Ultimos PRs mergeados en main

1. `#82` - Fix canonical URLs for multi-domain support (SEO-BLOG-META-CANONICALS-01) (`c516aff`)
2. `#80` - Create content SEO system + agent prompt (SEO-SYSTEM-CONTENT-SSOT-01) (`1ea27c5`)
3. `#79` - Add deprecation telemetry to legacy webhooks (OPS-STRIPE-LEGACY-DEPRECATE-01 / PR2) (`d7c8606`)

## Ahora en curso

- **OPS-STRIPE-LEGACY-DEPRECATE-01** (P2/R1) — PR2 merged (#79 / `d7c8606`), telemetry enabled — monitoring 48-72h for zero hits before PR3
- **CONTENT-AUDIT-SITEWIDE-I18N-01** (P2/R0) — PR open (docs-only audit: 10 sections × 4 languages, Top 10 fix targets identified)

## Siguientes 3 items del plan (priorizados)

1. **CONTENT-EXCURSIONS-PAGES-ENRICH-01** (P0/R1) — Create missing excursion detail pages (Loire, Champagne, Giverny) - 404 fix
2. **CONTENT-EVENTS-FRESHNESS-01** (P0/R0) — Update stale Events data (2025-01-13) + establish freshness workflow
3. **MEDIA-IMAGES-LIBRARY-01** (P0/R0) — Replace ~50-80 image placeholders with real/licensed assets (priority: Excursions)
4. **OPS-STRIPE-LEGACY-DEPRECATE-01 / PR3** (P2/R1) — Remove/410 legacy handlers after 48-72h zero hits

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
