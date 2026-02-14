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
- SHA: `85fa587`
- Last updated: `2026-02-14`

## Ultimos PRs mergeados en main

1. `#111` - seo(airports): metadata + canonical + JSON-LD (SEO-AIRPORTS-METADATA-01) (`85fa587`)
2. `#109` - UX-AIRPORTS-ADD-BOOKING-CTA-01 (`1508245`)
3. `#107` - content(airports): add terminal guide section (CONTENT-AIRPORTS-TERMINAL-GUIDE-01) (`a0108d6`)
4. `#105` - content(trust): add sitewide trust signals block (`97e0777`)
5. `#104` - docs(ssot): post-merge sync after PR #103 (`b889c96`)
6. `#103` - feat(excursions): reduce pre-list scroll above fold (`9ae13b0`)
7. `#102` - docs(ssot): post-merge sync after PR #101 (`431f18b`)
8. `#101` - content(excursions): unify faq blocks across detail pages (`2539c74`)
9. `#100` - docs(ssot): post-merge sync after PR #99 (`6e48b9c`)
10. `#99` - feat(media): add local image library MVP for excursions events and trust (`013a0df`)
11. `#98` - docs(ssot): post-merge sync after PR #95 (`4799d01`)
12. `#95` - content(events): refresh feed freshness and source attribution (`09834ef`)

## Ahora en curso

- **SEO-INTERNALLINK-RULES-01** (P2/R0) — Audit + enforce internal linking rules across Blog/Events/Excursions

## Siguientes 3 items del plan (priorizados)

1. **SEO-INTERNALLINK-RULES-01** (P2/R0) — Audit + enforce internal linking rules across Blog/Events/Excursions
2. **CONTENT-HOURLY-ITINERARIES-01** (P2/R0) — Add sample hourly itineraries (3-5 use cases)
3. **CONTENT-FAQ-VISUAL-AIDS-01** (P2/R0) — Add visual aids to FAQ/Legal pages

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
