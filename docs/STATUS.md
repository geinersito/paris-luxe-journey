# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`

## Main HEAD

- Branch: `main`
- SHA: `1ea27c5`
- Last updated: `2026-02-14`

## Ultimos PRs mergeados en main

1. `#80` - Create content SEO system + agent prompt (SEO-SYSTEM-CONTENT-SSOT-01) (`1ea27c5`)
2. `#79` - Add deprecation telemetry to legacy webhooks (OPS-STRIPE-LEGACY-DEPRECATE-01 / PR2) (`d7c8606`)
3. `#78` - Stripe webhook cutover plan (OPS-STRIPE-LEGACY-DEPRECATE-01 / PR1 docs) (`8fd3365`)

## Ahora en curso

- **OPS-STRIPE-LEGACY-DEPRECATE-01** (P2/R1) — PR2 merged (#79 / `d7c8606`), telemetry enabled — monitoring 48-72h for zero hits before PR3

## Siguientes 3 items del plan (priorizados)

1. **OPS-STRIPE-LEGACY-DEPRECATE-01 / PR3** (P2/R1) — Remove/410 legacy handlers after 48-72h zero hits
2. **SEO-BLOG-META-CANONICALS-01** (P2/R0) — Ensure unique title/meta/canonical across blog posts
3. **SEO-EVENTS-SCHEMA-01** (P2/R0) — Add Event schema.org (JSON-LD) to all event pages

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
