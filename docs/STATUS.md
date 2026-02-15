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
- SHA: `95aba65`
- Baseline feature: `chore(copy): coherence sweep for ES/EN/FR B2B wording (PR #135)`
- Last updated: `2026-02-15`

## Ultimos PRs mergeados en main

1. `#135` - chore(copy): coherence sweep for ES/EN/FR B2B wording (`95aba65`)
2. `#133` - feat(analytics): enrich GA4 payload with locale and attribution (`e990e7b`)
3. `#131` - chore(copy): qa PT wording for home and B2B pages (`200b434`)
4. `#129` - fix(copy): align footer wording with B2C+B2B framing (`87db9ec`)
5. `#127` - feat(analytics): track B2B page CTAs (agencies/companies) (`30c2cd3`)
6. `#125` - feat(analytics): GA4 events for CTA, WhatsApp and contact form (`409131a`)
7. `#123` - feat: B2B pages (/agencias, /empresas) + navbar B2B dropdown (`2d33719`)
8. `#121` - fix(copy): remove Premium Fleet heading (FleetSection) (`55e0a4f`)
9. `#120` - feat(copy): home conversion copy via centralized i18n (ES/PT/EN/FR) (`4c6df6b`)
10. `#119` - docs(ssot): defer UX-BRANDING-APPROACHABLE-01 after UI revert (#118) (`151e8e3`)
11. `#118` - revert(ui): restore previous design (revert PR1 tokens + PR2 components) (`5b25f7c`)
12. `#116` - ux(components): baseline buttons/cards/badges/inputs for approachable branding (PR2 UX-BRANDING-APPROACHABLE-01) (`afeafbb`)
13. `#115` - docs(ssot): mark PR1 tokens done; set PR2 components as next (UX-BRANDING-APPROACHABLE-01) (`49ac97b`)
14. `#114` - ux(theme): shift tokens to professional trustworthy palette (PR1 UX-BRANDING-APPROACHABLE-01) (`906a898`)
15. `#113` - docs(ssot): add approachable branding item (UX-BRANDING-APPROACHABLE-01) (`97d7e23`)
16. `#111` - seo(airports): metadata + canonical + JSON-LD (SEO-AIRPORTS-METADATA-01) (`85fa587`)
17. `#109` - UX-AIRPORTS-ADD-BOOKING-CTA-01 (`1508245`)
18. `#107` - content(airports): add terminal guide section (CONTENT-AIRPORTS-TERMINAL-GUIDE-01) (`a0108d6`)
19. `#105` - content(trust): add sitewide trust signals block (`97e0777`)

## Done / Shipped

- **COPY-COHERENCE-ES-EN-FR-01** ✅ DONE — PR **#135** — `95aba65db23db42fcb22a352cd6576cba64de936` — Copy-only coherence sweep for ES/EN/FR in B2B wording (accents, terminology, and non-touristic corporate tone)
- **GA4-ENRICHMENT-01** ✅ DONE — PR **#133** — `e990e7b80ec832e17dc2fc3d14b49d2b4a87d32b` — Enrich GA4 payload with `locale`, `placement`, `href` and URL `utm_*`; add explicit CTA placement/href in Home, Agencies and Companies
- **COPY-QA-PT-01** ✅ DONE — PR **#131** — `200b434e1319481e3cce77cec1e0390242e150bb` — PT copy QA for accents/orthography and terminology consistency across Home + B2B sections (copy-only, no functional changes)
- **FOOTER-COPY-ALIGN-01** ✅ DONE — PR **#129** — `87db9ec3220cd5a5d93785610766ef2cf4ca75ad` — Align footer framing to private transfers + B2B; remove legacy luxury/tours wording (i18n ES/PT/EN/FR)
- **GA4-EVENTS-01** ✅ DONE — PR **#125** — `409131af` — Home CTAs + WhatsApp + contact `form_start`/`form_submit` via centralized analytics helper
- **GA4-B2B-CTAS-01** ✅ DONE — PR **#127** — `30c2cd3c` — B2B CTA tracking on `/agencias` and `/empresas` (`cta_click` -> `/contact`)
- **B2B-PAGES-01** ✅ DONE — PR **#123** — `2d337191` — `/agencias` + `/empresas` + dropdown **B2B** en navbar

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
