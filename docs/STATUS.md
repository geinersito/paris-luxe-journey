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
- SHA: `55e0a4f`
- Last updated: `2026-02-15`

## Ultimos PRs mergeados en main

1. `#121` - fix(copy): remove Premium Fleet heading (FleetSection) (`55e0a4f`)
2. `#120` - feat(copy): home conversion copy via centralized i18n (ES/PT/EN/FR) (`4c6df6b`)
3. `#119` - docs(ssot): defer UX-BRANDING-APPROACHABLE-01 after UI revert (#118) (`151e8e3`)
4. `#118` - revert(ui): restore previous design (revert PR1 tokens + PR2 components) (`5b25f7c`)
5. `#116` - ux(components): baseline buttons/cards/badges/inputs for approachable branding (PR2 UX-BRANDING-APPROACHABLE-01) (`afeafbb`)
6. `#115` - docs(ssot): mark PR1 tokens done; set PR2 components as next (UX-BRANDING-APPROACHABLE-01) (`49ac97b`)
7. `#114` - ux(theme): shift tokens to professional trustworthy palette (PR1 UX-BRANDING-APPROACHABLE-01) (`906a898`)
8. `#113` - docs(ssot): add approachable branding item (UX-BRANDING-APPROACHABLE-01) (`97d7e23`)
9. `#111` - seo(airports): metadata + canonical + JSON-LD (SEO-AIRPORTS-METADATA-01) (`85fa587`)
10. `#109` - UX-AIRPORTS-ADD-BOOKING-CTA-01 (`1508245`)
11. `#107` - content(airports): add terminal guide section (CONTENT-AIRPORTS-TERMINAL-GUIDE-01) (`a0108d6`)
12. `#105` - content(trust): add sitewide trust signals block (`97e0777`)

## Ahora en curso

- **UX-BRANDING-APPROACHABLE-01** (P1/R0) — **DEFERRED** (time-to-ship). PR1 (`#114` / `906a898`) and PR2 (`#116` / `afeafbb`) were reverted by `#118` (`5b25f7c`) to restore the previous design. Follow-up copy-only improvements shipped in `#120` (`4c6df6b`) and `#121` (`55e0a4f`) without reactivating the full branding redesign. Revisit later with a measurement plan before reactivation.

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
