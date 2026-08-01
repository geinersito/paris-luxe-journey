# STATUS (Booking UI/UX)

Estado operativo rapido para saber "donde estamos" en menos de 30 segundos.

## SSOT

- Plan backlog (canonical): `docs/plan/IMPROVEMENTS.md`
- Plan narrativo detallado: `docs/PLAN_VIVO_MEJORAS_UI.md`
- Gobernanza: `docs/SUPERVISOR.md`
- Estado operativo: `docs/STATUS.md`
- Environments (Supabase A/B map, mirror): `docs/ops/ENVIRONMENTS.md` (SSOT in `paris-dispatcher`)
- Deploy runbooks canonical (Hostinger + beta tester): `docs/runbooks/HOSTINGER_ROOT_ERP_DEPLOY.md`, `docs/runbooks/BETA_TESTER_QUICKSTART.md`

## OPS Locks

## DEPLOY STATUS — 2026-04-29

**Status: HOLD — R0 sprint required**
**Reason: Strategic model not implemented. Events page has zero content. Homepage does not surface events/excursions.**
**Sprint plan: `docs/plan/CTO_PUBLICATION_SPRINT_2026_04_29.md`**
**Audit source: `docs/audits/STRATEGIC_REDESIGN_AUDIT_2026_04_29.md`**

### Technical blockers — ALL RESOLVED ✅
- ~~PUB-P0-001~~: ✅ DONE — PR #179 `dbe3ef7` — i18n blog keys
- ~~PUB-P0-002~~: ✅ DONE — PR #180 `62c6fad` — nav anchor absolutize
- ~~PUB-P0-003~~: ✅ DONE — PR #181 `c7a1039` — mobile hero clipping
- ~~PUB-P0-004~~: ✅ DONE — PR #182 `e00e8fb` — events transport fallback
- ~~PUB-P0-005~~: ✅ DONE — PR #183 `756fdcc` — versailles route + excursion links
- ~~PUB-P0-006~~: ✅ DONE — PR #184 `39b7909` — home JSON-LD brand fix
- ~~PUB-BUNDLE-001~~: ✅ DONE — PR #186 `e154c08` — production circular chunk crash fixed
- ~~PUB-P1-BRAND-META-001~~: ✅ DONE — PR #185 `f5f7943` — brand strings + PWA manifest → Paris Elite Services

**main HEAD: `f5f7943` — technically clean, CI green, Chrome production preview 6/6 routes OK**

### Strategic blockers — R0 sprint (open)

Active deploy gates from `docs/plan/CTO_PUBLICATION_SPRINT_2026_04_29.md`:

| ID | Blocker | Severity |
|---|---|---|
| ~~R0-05~~ | ~~Events feed stale~~ | ✅ RESOLVED — verified live 2026-05-30, feed has 10+ events May–Oct 2026 |
| ~~R0-06~~ | ~~Homepage: no Events surface~~ | ✅ RESOLVED — verified live 2026-05-30, 3 cards + See all events → present |
| ~~R0-07~~ | ~~Homepage: no Excursions preview~~ | ✅ RESOLVED — verified live 2026-05-30, 3 cards + Explore all excursions → present |
| ~~R0-01~~ | ~~Homepage: hero copy transport-SPA framing~~ | ✅ RESOLVED — verified live 2026-05-30, editorial/events/excursions framing active |
| ~~R0-02~~ | ~~Homepage: zero-stats block~~ | ✅ RESOLVED — verified live 2026-05-30, real testimonials (L.M./D.R./I.G.) — no fake stats |
| ~~R0-03~~ | ~~Mobile nav hamburger not functioning at 390px~~ | ✅ RESOLVED — verified live 2026-05-30, hamburger visible + functional at 390px |
| ~~R0-04~~ | ~~Mobile: booking widget in hero at 390px — both elements illegible~~ | ✅ RESOLVED — booking widget correctly hidden md:block in mobile, hero legible |
| ~~R0-08–10~~ | ~~Excursion detail pages~~ | ✅ RESOLVED — verified live 2026-05-30 |
| ~~R0-11~~ | ~~Blog CTA: Fiat 500~~ | ✅ RESOLVED PR-R0-11 + PR-R0-11b. All 4 occurrences of `1549317661` replaced. 0 remaining. |
| ~~R0-12~~ | ~~Airport CTAs English on ES~~ | ✅ RESOLVED — verified live 2026-05-30 |

Runtime hold (unchanged — separate from publication):
- EV ingest DB: NOT applied (PLJ-EV-INGEST-01A-DEPLOY-GATE R2 required)
- Edge Function: NOT deployed
- Payment/checkout: NOT activated
- Deploy target: content-only + quote-request (no DB/functions/payment)

## GOVERNANCE INCIDENT — 2026-04-28

**PR #176 branch-rescue included EV ingest scope (not reverted)**

- Files on main: `supabase/migrations/20260420110000_content_event_ingest_openagenda_01a.sql` + `supabase/functions/sync-events-openagenda/` + `supabase/functions/_shared/erpIngest.ts`
- Root cause: these files were already committed on `feat/ev-ingest-01b` before the cleanup session; base diff against main captured them.
- Production impact: **NONE** — DB migration NOT applied, Edge Function NOT deployed, runtime NOT active.
- Decision: Accept (no revert). Transform to controlled state: code in main, runtime BLOCKED pending PLJ-EV-INGEST-01A-DEPLOY-GATE (R2).
- **DO NOT run**: `supabase db push`, `supabase functions deploy`, any OpenAgenda sync.

## OPS — Hostinger deploy runbooks canonicalized (LOCKED ✅)

**main@bdda7bc**

- Added canonical runbooks:
  - `docs/runbooks/HOSTINGER_ROOT_ERP_DEPLOY.md`
  - `docs/runbooks/BETA_TESTER_QUICKSTART.md`
- Dispatcher mirrors must point to these canonical documents.

## Main HEAD (Last feature merge baseline)

Docs-only PRs may be newer than this SHA; see "Ultimos PRs" for exact merge order.

- Branch: `main`
- SHA: `f7ca7ec0aa45cbc5de3bfcdf77d6660193eb026b`
- Baseline feature: `BOOKING-REQUEST-INTAKE-01` — bridge table + edge fn + /booking/pending + Telegram ✅
- Last updated: `2026-08-01`

## Ultimos PRs mergeados en main

1. `6d3f2a7` fix(booking): TELEGRAM_CHAT_ID secret name fix — smoke verified ✅ (2026-05-31)
2. `8e4474f` feat(booking): BOOKING-REQUEST-INTAKE-01 — bridge table + edge fn + /booking/pending (2026-05-31) ✅
3. `8401f64` docs(ssot): correct HEAD SHA in STATUS.md (2026-05-31) ✅
4. `017e1c1` docs: CONTENT-HOURLY-CTA-POLISH-01 (2026-05-31) ✅
5. `7f0a007` FUNNEL-CTA-REWIRE-01 — contextual WA prefill (2026-05-31) ✅
2. `4600b90` fix(hourly): contextual WA prefill on /hourly + i18n hero button (2026-05-31) ✅ CONTENT-HOURLY-CTA-POLISH-01
3. `601a279` feat(hourly): CONTENT-HOURLY-ITINERARIES-01 — full page rewrite + i18n (2026-05-31) ✅
4. `86793ea` chore(webhooks): OPS-STRIPE-LEGACY-DEPRECATE-01 PR3 — delete legacy handlers (2026-05-31) ✅
5. `ce2ba56` fix(blog): correct cross-link paths — add missing /transport/ segment (2026-05-31) ✅
6. `3dcc22e` feat(blog): SEO-INTERNALLINK-RULES-01 — internal links EN articles (2026-05-31) ✅
7. `#226` - feat(launch): WA contextual, ES redirects, excursion SEO, events filter (2026-05-31) (`3b7ae2d`) ✅ LAUNCH SPRINT DONE
2. `#225` - fix(launch): cache headers, event CTA, broken images, remove unverified stars (2026-05-30) (`8545e36`) ✅
3. `#180` - fix(nav): absolutize fleet/about/contact anchors to /#hash (2026-04-28) (`62c6fad`) ✅ PUB-P0-002 DONE
2. `#179` - fix(i18n): add missing blog keys — pageTitle, readMore, notFound.* (2026-04-28) (`dbe3ef7`) ✅ PUB-P0-001 DONE
3. `#176` - chore: close booking UI/i18n/assets cleanup without DB changes (2026-04-28) (`bd48d89`) ⚠️ GOVERNANCE NOTE: included EV ingest scope — see GOVERNANCE INCIDENT above
2. `#159` - fix(pricing): align v312 partner floors to locked rates (2026-02) (`601ef9c`)
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

- **R0-01** ✅ RESOLVED — verified live 2026-05-30 — Hero copy editorial/events/excursions framing active. No PR needed.
- **R0-02** ✅ RESOLVED — verified live 2026-05-30 — Zero-stats block gone, real testimonials (L.M./D.R./I.G.) active. No PR needed.
- **R0-05** ✅ RESOLVED — verified live 2026-05-30 — Events feed has 10+ events May–Oct 2026. No PR needed.
- **R0-06** ✅ RESOLVED — verified live 2026-05-30 — Homepage Events 3-card grid + "See all events →" active. No PR needed.
- **R0-07** ✅ RESOLVED — verified live 2026-05-30 — Homepage Excursions 3-card grid + "Explore all excursions →" active. No PR needed.
- **PR-R0-11b** ✅ DONE — Hourly.tsx + FleetSection.tsx + useVehicles.tsx — `1549317661` (Fiat 500) → `1571607388263` (Mercedes interior) + `1563720223185` (Mercedes exterior). 0 occurrences remaining. Smoke: hero img confirmed, 0 old IDs on homepage. R0.
- **WA-CONTEXTUAL-02b** ✅ DONE — PR-02b — `8545e36` — Excursions.tsx 6 CTAs → buildExcursionWhatsAppUrl/buildGenericWhatsAppUrl. 0 hardcoded wa.me en CTAs activos. R0.
- **WA-CONTEXTUAL-02a** ✅ DONE — PR-02a — Airports CDG/ORY/BVA + FloatingWhatsApp + Footer → helpers contextual multilingual. eventsPrefill.ts +3 helpers. R0.
- **PR-01-ROUTES-ES** ✅ DONE — ES legacy redirects /b2b + /aeropuertos/*. R0.
- **R0-03** ✅ RESOLVED — verified live 2026-05-30 — Mobile hamburger functional at 390px. No PR needed.
- **R0-04** ✅ RESOLVED — verified live 2026-05-30 — Mobile hero legible, booking widget hidden md:block. No PR needed.
- **PUB-P0-002** ✅ DONE — PR **#180** — `62c6fad` — Absolutized nav anchors `#fleet`, `#about`, `#contact` → `/#fleet`, `/#about`, `/#contact` in Navbar.tsx. Relative hrefs resolved to current sub-page path on `/events`, `/airports/*`, `/excursions`. 1 file, 3-line change. Gates: type-check + build + smoke (4/4) PASS.
- **PUB-P0-001** ✅ DONE — PR **#179** — `dbe3ef7` — Added 16 missing blog i18n keys (`blog.pageTitle`, `blog.readMore`, `blog.notFound.*`, `blog.article/articles/searchInCategory/pageDescription`) across EN/ES/FR/PT + `Translation` type. Fixes raw key display in blog `<title>`, article cards, and 404 page. Gates: type-check + build + smoke PASS.
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

## SEO Sprint — 2026-06-03/04

Live Playwright audit confirmed gaps. CTO-approved sequence:

| # | ID | Status |
|---|---|---|
| 1 | PR-SEO-HOME-01 | ✅ DONE PR #231 `f3bfbef` — og:image `.jpg`→`.png` + canonical trailing slash. 12/12 smoke. |
| 2 | PR-SEO-COMMERCIAL-PAGES-01 | ✅ DONE PR #232 `60e6d0d` — Excursions/FAQ/Booking/Airports Helmet coverage. 30/30 smoke. |
| 3 | PR-SEO-FLEET-CANONICAL-01 | ✅ DONE PR #234 `2c08e95` — `/fleet` dedicated page, HashRedirect removed, canonical + H1 + OG. R1. |
| 3b | VISUAL-REFRESH-2026-04 | ✅ DONE PR #230 `cfa4309` — 2026 editorial design sitewide. Restored from stash after SEO rebase regression. 6/6 smoke. |
| 4 | PR-SEO-FAQ-SCHEMA-01 | TODO — FAQPage JSON-LD structured data |
| 5 | PR-SEO-HREFLANG-01 | TODO — hreflang global (EN/FR/ES/PT + x-default) |

**main HEAD:** `2c08e95` — 2026-06-04

**DEPLOY NOTE:** CI green on all merged PRs. Production (eliteparistransfer.com) requires manual Netlify deploy — old build still serving. Deploy needed before prod smoke can pass.

## Ahora en curso

- **CONTENT-FAQ-PAYMENT-SSOT-01B** (P0/R0) — **DOING** — Corrige `faq.questions.deposit.answer` en FR: retira el claim no respaldado de "acompte du 30% + solde", alineado con `TermsPage.tsx` ("100% online payment required") y `pricing.payment.method = "100%_online"`. Completa la alineación EN/FR/ES/PT con Terms/pricing (sigue a `01A`, PR [#238](https://github.com/geinersito/paris-luxe-journey/pull/238)). `PR-SEO-FAQ-SCHEMA-01` sigue BLOCKED — cancelación, anticipación y 24/7 siguen pendientes. Branch: `fix/content-faq-payment-ssot-01b`.
- **CONTENT-FAQ-PAYMENT-SSOT-01A** (P0/R0) — **DONE ✅** — Corrige `faq.questions.deposit.answer` en EN/ES/PT: retira el claim no respaldado de "depósito del 30% + saldo posterior", alineado con `TermsPage.tsx` ("100% online payment required") y `pricing.payment.method = "100%_online"`. Hallazgo de `AUDIT-FAQ-CLAIMS-01`: era un RUNTIME-MISMATCH directo entre FAQ y Terms/pricing. Sin cambios en `Confirmation.tsx`, `pricing.ts` ni Stripe. `01B` (FR) sigue inmediatamente después; luego `CONTENT-FAQ-CANCELLATION-SSOT-01`, `CONTENT-FAQ-ADVANCE-NOTICE-01`, `CONTENT-FAQ-24H-CLAIMS-*`. `PR-SEO-FAQ-SCHEMA-01` sigue BLOCKED hasta completar la secuencia. PR: [#238](https://github.com/geinersito/paris-luxe-journey/pull/238).
- **CONTENT-FAQ-FLEET-CONSISTENCY-01** (P2/R0) — **DONE ✅** — Retira BMW y los claims no validados de "menos de 2 años" / SUV de la respuesta `faq.questions.vehicleTypes` en EN/ES/PT (FR ya estaba libre de estos claims, sin tocar). Cambio de copy/i18n únicamente; requisito previo antes de autorizar `PR-SEO-FAQ-SCHEMA-01` para no amplificar vía datos estructurados una afirmación de flota inconsistente. PR: [#237](https://github.com/geinersito/paris-luxe-journey/pull/237).
- **OPS-HUSKY-HOOKS-01** (P0/R0) — **DONE ✅** — `pre-commit`/`pre-push` restaurados de `100644` a `100755` (nunca ejecutables desde el commit inicial). `post-merge` (`npm install` automático tras cada merge/pull, sin revisión) eliminado — recuperable del historial. Sin cambios en código de producto ni dependencias. PR: [#236](https://github.com/geinersito/paris-luxe-journey/pull/236).
- **OPS-CI-TEST-GATE-01** (P0/R0) — **DONE ✅** — Node 20 pinned via `engines.node`; new `test:ci` script (`vitest run`) added as mandatory CI gate before build. No product code touched. PR: [#235](https://github.com/geinersito/paris-luxe-journey/pull/235).
- **R0-SPRINT** (P0/R0) — **DONE ✅** — 10/10 blockers resolved. Sitio publicable. No hay blocker de publicación activo.
- **SEO-EXCURSIONS-DETAIL-01** (P1/R0) — **DONE ✅** — canonical + meta title/description + OG + 3×JSON-LD (BreadcrumbList + TouristTrip + FAQPage) en versailles/champagne/loire-valley. Helmet data-rh ✅. 3 archivos. TSC ✅ Build ✅ (40s). Smoke: 3/3 páginas con ld+json válido, canonical correcto, BMW 0.
- **PR-02c** (P2/R0) — **DONE ✅** — WA editoriales: BlogSidebar.tsx hardcoded EN → buildBlogWhatsAppUrl(i18n.language). FAQPage.tsx bare wa.me → helper con mensaje. BlogIndex.tsx eyebrows hardcoded → i18n keys. BMW eliminado de premiumVehicles en 7 archivos i18n (es/en/fr/pt .ts + es/en/fr .json). Smoke: 0 BMW, eyebrow FR "Découvrir Paris" ✅, FAQ WA con mensaje prefill ✅. TSC ✅ Build ✅.
- **PR-EV-INGEST-01A** (P1/R1) — **MERGED-CODE / DEPLOY-HOLD** — Code + migration on main (`bd48d89`) via PR #176. DB NOT applied. Function NOT deployed. Runtime NOT active. Next action: PLJ-EV-INGEST-01A-DEPLOY-GATE (R2) — see IMPROVEMENTS.md.
- **OPS-STRIPE-LEGACY-DEPRECATE-01** (P2/R0→R1) — **DOING** — PR1 ✅ PR2 ✅ telemetry activo; waiting 48–72h no-hit window para PR3 removal.
- **UX-BRANDING-APPROACHABLE-01** (P1/R0) — **DEFERRED** — Reverted en #118. Revisit con measurement plan antes de reactivar.

## Siguientes items (post-publicación, priorizados por revenue)

1. **PR-SEO-FAQ-SCHEMA-01** (P2/R0) — Add FAQPage JSON-LD structured data
2. **PR-SEO-HREFLANG-01** (P2/R0) — hreflang global (EN/FR/ES/PT + x-default)
3. **CONTENT-BLOG-CTA-UPSELL-01** (P1/R0) — Añadir CTA excursiones en artículos de aeropuerto (ticket medio)
4. **PLJ-EV-INGEST-01A-DEPLOY-GATE** (P1/R2) — BLOCKED: 6 gates required. No deploy until all pass.
5. **PLJ-DB-001** (P1/R1) — BLOCKED: dispatch_* cross-repo sign-off → paris-dispatcher

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
