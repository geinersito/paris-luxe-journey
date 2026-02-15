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
- SHA: `906a898`
- Last updated: `2026-02-15`

## Ultimos PRs mergeados en main

1. `#114` - ux(theme): shift tokens to professional trustworthy palette (PR1 UX-BRANDING-APPROACHABLE-01) (`906a898`)
2. `#113` - docs(ssot): add approachable branding item (UX-BRANDING-APPROACHABLE-01) (`97d7e23`)
3. `#111` - seo(airports): metadata + canonical + JSON-LD (SEO-AIRPORTS-METADATA-01) (`85fa587`)
4. `#109` - UX-AIRPORTS-ADD-BOOKING-CTA-01 (`1508245`)
5. `#107` - content(airports): add terminal guide section (CONTENT-AIRPORTS-TERMINAL-GUIDE-01) (`a0108d6`)
6. `#105` - content(trust): add sitewide trust signals block (`97e0777`)
7. `#104` - docs(ssot): post-merge sync after PR #103 (`b889c96`)
8. `#103` - feat(excursions): reduce pre-list scroll above fold (`9ae13b0`)
9. `#102` - docs(ssot): post-merge sync after PR #101 (`431f18b`)
10. `#101` - content(excursions): unify faq blocks across detail pages (`2539c74`)
11. `#100` - docs(ssot): post-merge sync after PR #99 (`6e48b9c`)
12. `#99` - feat(media): add local image library MVP for excursions events and trust (`013a0df`)

## Ahora en curso

- **UX-BRANDING-APPROACHABLE-01** (P1/R0) — PR1 DONE (`#114` / `906a898`, tokens-only). PR2 NOW: baseline components (Button/Card/Badge/Input) with strict no-pages scope.

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
