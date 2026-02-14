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
- SHA: `2539c74`
- Last updated: `2026-02-14`

## Ultimos PRs mergeados en main

1. `#101` - content(excursions): unify faq blocks across detail pages (`2539c74`)
2. `#100` - docs(ssot): post-merge sync after PR #99 (`6e48b9c`)
3. `#99` - feat(media): add local image library MVP for excursions events and trust (`013a0df`)
4. `#98` - docs(ssot): post-merge sync after PR #95 (`4799d01`)
5. `#95` - content(events): refresh feed freshness and source attribution (`09834ef`)
6. `#97` - docs(status): define stable baseline semantics (`11737de`)
7. `#96` - docs(status): sync head after PR #94 (`46185a1`)
8. `#94` - docs(status): sync head after PR #93 (`61f838f`)
9. `#93` - docs(status): sync head after PR #92 (`ac8448e9`)
10. `#92` - SSOT post-merge sync after PR #91 (`e9eee59`)

## Ahora en curso

- **CONTENT-TRUST-SIGNALS-01** (P1/R0) — Add trust signals (Home + Booking flow)

## Siguientes 3 items del plan (priorizados)

1. **CONTENT-TRUST-SIGNALS-01** (P1/R0) — Add trust signals (Home + Booking flow)
2. **CONTENT-AIRPORTS-TERMINAL-GUIDE-01** (P1/R0) — Add terminal breakdown + meeting-point guidance on airport pages
3. **SEO-INTERNALLINK-RULES-01** (P2/R0) — Audit + enforce internal linking rules across Blog/Events/Excursions

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
