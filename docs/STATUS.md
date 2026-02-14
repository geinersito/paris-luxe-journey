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
- SHA: `97e0777`
- Last updated: `2026-02-14`

## Ultimos PRs mergeados en main

1. `#105` - content(trust): add sitewide trust signals block (`97e0777`)
2. `#104` - docs(ssot): post-merge sync after PR #103 (`b889c96`)
3. `#103` - feat(excursions): reduce pre-list scroll above fold (`9ae13b0`)
4. `#102` - docs(ssot): post-merge sync after PR #101 (`431f18b`)
5. `#101` - content(excursions): unify faq blocks across detail pages (`2539c74`)
6. `#100` - docs(ssot): post-merge sync after PR #99 (`6e48b9c`)
7. `#99` - feat(media): add local image library MVP for excursions events and trust (`013a0df`)
8. `#98` - docs(ssot): post-merge sync after PR #95 (`4799d01`)
9. `#95` - content(events): refresh feed freshness and source attribution (`09834ef`)
10. `#97` - docs(status): define stable baseline semantics (`11737de`)

## Ahora en curso

- **CONTENT-AIRPORTS-TERMINAL-GUIDE-01** (P1/R0) — Add terminal breakdown + meeting-point guidance on airport pages

## Siguientes 3 items del plan (priorizados)

1. **CONTENT-AIRPORTS-TERMINAL-GUIDE-01** (P1/R0) — Add terminal breakdown + meeting-point guidance on airport pages
2. **SEO-INTERNALLINK-RULES-01** (P2/R0) — Audit + enforce internal linking rules across Blog/Events/Excursions
3. **CONTENT-HOURLY-ITINERARIES-01** (P2/R0) — Add sample hourly itineraries (3-5 use cases)

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
