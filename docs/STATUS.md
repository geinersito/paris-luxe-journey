# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`
- Environments (Supabase A/B map, mirror): `docs/ops/ENVIRONMENTS.md` (SSOT in `paris-dispatcher`)

## Main HEAD (Last feature merge baseline)

Docs-only PRs may be newer than this SHA; see "Ultimos PRs" for exact merge order.

- Branch: `main`
- SHA: `601ef9c`
- Baseline feature: `fix(pricing): align v312 partner floors to locked rates (PR #159)`
- Last updated: `2026-02-16`

## Ultimos PRs mergeados en main

1. `#159` - fix(pricing): align v312 partner floors to locked rates (2026-02) (`601ef9c`)
2. `#158` - fix(pricing): update fixed rates + hourly displayRate (2026-02) (`d110106`)
3. `#156` - fix(i18n): change "Live Updates" to "Updated" in events page (`37c38b1`)
4. `#155` - fix(i18n): add missing events translation keys + UX improvements (`dbcb9e1`)
5. `#154` - fix(events): listing-first layout order + reduced spacing (`2e8b0c7`)
6. `#142` - fix(blog): clamp hero media and align category page with sidebar layout (`050b179`)
7. `#141` - fix(events): tighten vertical spacing density on listing sections (`8478715`)
8. `#139` - feat(events): add quick filters sidebar jump menu (`61ccf5e`)
9. `#137` - fix(events): compact hero spacing to match excursions (`1d3fd5c`)
10. `#135` - chore(copy): coherence sweep for ES/EN/FR B2B wording (`95aba65`)
11. `#133` - feat(analytics): enrich GA4 payload with locale and attribution (`e990e7b`)
12. `#131` - chore(copy): qa PT wording for home and B2B pages (`200b434`)
13. `#129` - fix(copy): align footer wording with B2C+B2B framing (`87db9ec`)
14. `#127` - feat(analytics): track B2B page CTAs (agencies/companies) (`30c2cd3`)
15. `#125` - feat(analytics): GA4 events for CTA, WhatsApp and contact form (`409131a`)
16. `#123` - feat: B2B pages (/agencias, /empresas) + navbar B2B dropdown (`2d33719`)
17. `#121` - fix(copy): remove Premium Fleet heading (FleetSection) (`55e0a4f`)
18. `#120` - feat(copy): home conversion copy via centralized i18n (ES/PT/EN/FR) (`4c6df6b`)
19. `#119` - docs(ssot): defer UX-BRANDING-APPROACHABLE-01 after UI revert (#118) (`151e8e3`)
20. `#118` - revert(ui): restore previous design (revert PR1 tokens + PR2 components) (`5b25f7c`)
21. `#116` - ux(components): baseline buttons/cards/badges/inputs for approachable branding (PR2 UX-BRANDING-APPROACHABLE-01) (`afeafbb`)
22. `#115` - docs(ssot): mark PR1 tokens done; set PR2 components as next (UX-BRANDING-APPROACHABLE-01) (`49ac97b`)
23. `#114` - ux(theme): shift tokens to professional trustworthy palette (PR1 UX-BRANDING-APPROACHABLE-01) (`906a898`)
24. `#113` - docs(ssot): add approachable branding item (UX-BRANDING-APPROACHABLE-01) (`97d7e23`)
25. `#111` - seo(airports): metadata + canonical + JSON-LD (SEO-AIRPORTS-METADATA-01) (`85fa587`)
26. `#109` - UX-AIRPORTS-ADD-BOOKING-CTA-01 (`1508245`)
27. `#107` - content(airports): add terminal guide section (CONTENT-AIRPORTS-TERMINAL-GUIDE-01) (`a0108d6`)
28. `#105` - content(trust): add sitewide trust signals block (`97e0777`)

## Done / Shipped

- **PRICING-UPDATE-2026-02-V312** ✅ DONE — PR **#159** — `601ef9c` — Updated all 17 Partner Floor values in V3.1.2 pricing system to produce exact LOCKED prepaid prices (formula: PF = target - FC + PD). Revenue-critical hotfix: fixes €10-20 underpricing per ride across all routes. Changes: CDG 100/130, ORY 90/115, gares unified 80/100, DLP 120/145, VRS 95/120, etc. Gates: type-check + build PASS. No logic/fee changes (FC/PD/buffer intact).
- **PRICING-UPDATE-2026-02** ✅ DONE — PR **#158** — `d110106` — Updated pricing.ts (shadow/fallback system) with LOCKED rates v2.0: airports +40-50% (CDG 100/130, ORY 90/115), gares unified 80/100, city wait 30min, hourly displayRate 70€ (rate 75€ for calc). Serves as SSOT reference + legacy fallback. Version v1.0 → v2.0.
- **EVENTS-COPY-ACCURACY-01** ✅ DONE — PR **#156** — `37c38b1` — Changed "Live Updates" to "Updated" pill label in Events hero to avoid over-promising real-time data (feed is JSON-based). Copy-only change across 4 locales (ES/EN/FR/PT)
- **EVENTS-I18N-KEYS-UX-01** ✅ DONE — PR **#155** — `dbcb9e1` — Added missing `events.*` translation keys (getQuote, whatsappMicrocopy, ctaWhatsApp, ctaEmail, navigation) + safe fallbacks to prevent raw key display. Also fixed button text truncation ("Pedir Presupue..." → full "Pedir Presupuesto") by changing layout to vertical and improved category badge contrast (semi-transparent → solid bg-primary/90)
- **EVENTS-LISTING-FIRST-01** ✅ DONE — PR **#154** — `2e8b0c7` — Reordered Events page sections to listing-first approach (Hero → Listing → TrustSignals → CTA) and reduced hero padding/margins to display first event cards above-the-fold faster. Sidebar navigation and anchor scroll behavior preserved (layout-only)
- **BLOG-HERO-SIDEBAR-CONSISTENCY-01** ✅ DONE — PR **#142** — `050b179edd3fbba0b2fc4982c8cdcdf2efc8d2bb` — Clamp blog post hero media height (aspect ratio + max height) and align blog category layout to desktop 8/4 with sticky sidebar for visual family consistency with Events/Excursions (layout-only)
- **EVENTS-SPACE-DENSITY-01** ✅ DONE — PR **#141** — `8478715bd40245ac3a013f6a3f862ff9a5e0b005` — Reduce vertical spacing across Events page sections (trust/listings/CTA rhythm, inter-block gaps, and heading margins) while preserving sidebar behavior and event feed logic (layout-only)
- **EVENTS-QUICK-FILTERS-SIDEBAR-01** ✅ DONE — PR **#139** — `61ccf5eca98beef1318c2d21dd2fe4cd1ce06225` — Add Excursions-style quick-filters sidebar on Events page with anchor jump navigation (`events-week`, `events-month`) and active section highlight via `IntersectionObserver` (layout/navigation-only)
- **EVENTS-HERO-COMPACT-01** ✅ DONE — PR **#137** — `1d3fd5c822c8030c61dd4fc2beb583eb9749d4f3` — Reduce Events hero vertical spacing to compact standard aligned with Excursions (layout-only, no functional changes)
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
