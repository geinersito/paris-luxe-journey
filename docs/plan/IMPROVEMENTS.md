# Improvements Plan (SSOT)

This file is the canonical backlog for active execution and PR traceability.

Rule: no PR is opened/merged without linking one or more Plan Item IDs and updating this table plus `docs/STATUS.md`.

Detailed product notes can continue in `docs/PLAN_VIVO_MEJORAS_UI.md`, but execution status lives here.

## Legend

- Priority: `P0` (must), `P1` (high), `P2` (nice)
- Status: `TODO` / `DOING` / `DONE` / `BLOCKED` / `DEFERRED`
- Risk:
  - `R0` UI-only
  - `R1` flow/state/routing/persistence
  - `R2` money/checkout

## Plan Items

| ID | Priority | Risk | Area | Description | Status | PR / Commit | Notes / DoD |
|---|---|---|---|---|---|---|---|
| OPS-MIG-01 | P0 | R1 | Ops | Reconcile Supabase migrations (Remote = SSOT) to unblock db push | DONE | [#28](https://github.com/geinersito/paris-luxe-journey/pull/28) / `e34ab9b` | Remote SSOT imported; local orphaned quarantined; evidence + runbook merged |
| UX-DT-01 | P0 | R0 | UX | Fix Date/Time popovers inside modal (z-layer) | DONE | [#29](https://github.com/geinersito/paris-luxe-journey/pull/29) | Verified in modal |
| FLOW-NAV-01 | P0 | R1 | Flow | Prevent fixed-price submit state reset / double navigation | DONE | [#30](https://github.com/geinersito/paris-luxe-journey/pull/30) | Ends in `/booking/details` reliably |
| UX-VAL-01 | P1 | R0 | UX | Disable CTA until valid + inline errors after submit attempt | DONE | [#31](https://github.com/geinersito/paris-luxe-journey/pull/31) | Inline errors for date/time/pax |
| UX-VAL-02 | P1 | R0 | UX | Inline error when `pickup === dropoff` | DONE | [#32](https://github.com/geinersito/paris-luxe-journey/pull/32) | Specific message shown |
| UX-ZTOK-01 | P1 | R0 | UI System | Z-index token system (`nav/overlay/floating/toast`) | DONE | [#33](https://github.com/geinersito/paris-luxe-journey/pull/33) | Tokens documented and applied |
| FLOW-DETAILS-SS-01 | P1 | R1 | Flow | Make `/booking/details` refresh-safe via session snapshot (TTL + cleanup) | DONE | [#34](https://github.com/geinersito/paris-luxe-journey/pull/34) / `8e00b02` | Smoke A/B/C/D + security + precedence validated |
| DOCS-SSOT-01 | P1 | R0 | Governance | Install SSOT plan + status dashboard + mandatory PR traceability | DONE | [#35](https://github.com/geinersito/paris-luxe-journey/pull/35) / `feb13f7` | Supervisor + status + SSOT alignment |
| NAV-COHERENCE-01 | P1 | R1 | Navigation | Top-nav coherence + dead-page protection | DONE | [#38](https://github.com/geinersito/paris-luxe-journey/pull/38) / `74ec0b5` | Global wildcard fallback + dedicated 404 with CTA |
| NAV-HOURLY-01 | P1 | R1 | Navigation | Separate `Hourly` intent from `/booking` wizard | DONE | [#40](https://github.com/geinersito/paris-luxe-journey/pull/40) / `c06d6c1` | Intent guard + no sessionStorage mix |
| UX-HEADER-I18N-01 | P1 | R0 | Header | Keep language dropdown crisp and navbar stable across locales | DONE | [#41](https://github.com/geinersito/paris-luxe-journey/pull/41) / `e40d506` | Compact selector (flag + code) + navbar flex stability |
| COPY-HOME-CONVERSION-01 | P0 | R0 | Content/Conversion | Ship-fast Home conversion copy with centralized i18n and coherent pricing anchors | DONE | [#120](https://github.com/geinersito/paris-luxe-journey/pull/120) / `4c6df6b` | Home hero/services/B2B copy moved to ES/PT/EN/FR i18n; pricing rules aligned: airport from 110, hourly from 70/h, tours tailored quote |
| B2B-PAGES-01 | P1 | R0 | Content/Navigation | Add dedicated B2B pages for agencies and companies with coherent navbar entry | DONE | [#123](https://github.com/geinersito/paris-luxe-journey/pull/123) / `2d337191` | `/agencias` + `/empresas` shipped with centralized i18n (ES/PT/EN/FR), CTA wiring to `/contact`, and navbar grouped under `B2B` dropdown |
| GA4-EVENTS-01 | P1 | R0 | Analytics | Instrument GA4 events for Home CTAs, WhatsApp clicks, and Contact form start/submit | DONE | [#125](https://github.com/geinersito/paris-luxe-journey/pull/125) / `409131af` | Centralized analytics helper (`dataLayer` + `gtag` fallback) and event schema: `cta_click`, `whatsapp_click`, `form_start`, `form_submit` |
| GA4-B2B-CTAS-01 | P1 | R0 | Analytics | Track B2B CTA clicks on `/agencias` and `/empresas` pages | DONE | [#127](https://github.com/geinersito/paris-luxe-journey/pull/127) / `30c2cd3c` | Added `cta_click` tracking for primary CTA to `/contact` with `cta_id`, `cta_label`, `page`, `destination` |
| GA4-ENRICHMENT-01 | P1 | R0 | Analytics | Enrich GA4 payload with locale and attribution params | DONE | [#133](https://github.com/geinersito/paris-luxe-journey/pull/133) / `e990e7b80ec832e17dc2fc3d14b49d2b4a87d32b` | Added analytics enrichment for `locale`, `placement`, `href`, and URL `utm_*` params; explicit `placement`/`href` on Home/Agencies/Companies primary CTAs |
| EVENTS-HERO-COMPACT-01 | P2 | R0 | UX/Layout | Reduce Events page hero top spacing to match compact header standard used in Excursions | DONE | [#137](https://github.com/geinersito/paris-luxe-journey/pull/137) / `1d3fd5c822c8030c61dd4fc2beb583eb9749d4f3` | Hero spacing normalized in `src/pages/Events.tsx` (`section-padding` removed from hero wrapper); layout-only, no logic/copy changes |
| COPY-COHERENCE-ES-EN-FR-01 | P2 | R0 | Content | Final copy coherence sweep in ES/EN/FR for B2B tone and terminology parity | DONE | [#135](https://github.com/geinersito/paris-luxe-journey/pull/135) / `95aba65db23db42fcb22a352cd6576cba64de936` | Copy-only i18n refinements across ES/EN/FR (accents, wording consistency, non-touristic corporate tone) in Home + B2B sections |
| COPY-QA-PT-01 | P2 | R0 | Content | QA Portuguese copy for accents, terminology consistency, and B2B tone alignment | DONE | [#131](https://github.com/geinersito/paris-luxe-journey/pull/131) / `200b434e1319481e3cce77cec1e0390242e150bb` | Copy-only PT i18n refinements in Home + Agencies + Companies (e.g., agências/opções/orçamento, La Défense), no layout or functional changes |
| FOOTER-COPY-ALIGN-01 | P2 | R0 | Content | Align footer framing to private transfers + B2B; remove legacy luxury/tours wording | DONE | [#129](https://github.com/geinersito/paris-luxe-journey/pull/129) / `87db9ec3220cd5a5d93785610766ef2cf4ca75ad` | Copy-only i18n update in ES/PT/EN/FR, no layout or functional changes |
| COPY-FLEET-WORDING-NEUTRAL-01 | P2 | R0 | Content | Remove visible "Premium Fleet" wording in Fleet section (copy-only) | DONE | [#121](https://github.com/geinersito/paris-luxe-journey/pull/121) / `55e0a4f` | Fleet heading/subtitle neutralized via i18n keys (ES/PT/EN/FR), no theme/layout changes |

## Deferred items

| ID | Priority | Risk | Area | Description | Status | PR / Commit | Notes / DoD |
|---|---|---|---|---|---|---|---|
| UX-BRANDING-APPROACHABLE-01 | P1 | R0 | Branding/UX | Shift visual perception toward "professional trustworthy" with subtle premium touches (reduce price intimidation) | DEFERRED | [#114](https://github.com/geinersito/paris-luxe-journey/pull/114) / `906a898`, [#116](https://github.com/geinersito/paris-luxe-journey/pull/116) / `afeafbb`, [#118](https://github.com/geinersito/paris-luxe-journey/pull/118) / `5b25f7c` | Reverted in #118 for time-to-ship; reverted UI to previous design. Revisit later with a measurement plan (n>=10 review panel + before/after evidence + KPI thresholds) before reactivation. References: `docs/PLAN_CORRECCION_COLORES.md`, `docs/RESUMEN_CORRECCION_COLORES.md`, `docs/PLAN_VIVO_MEJORAS_UI.md`. |

## Migrated from PLAN_VIVO_MEJORAS_UI.md (legacy backlog)

Items below were previously tracked in the narrative plan and are now reconciled into the canonical SSOT.

| ID | Legacy | Priority | Risk | Status | Title | Evidence (PR/Commit) | Notes |
|---|---|---:|:---:|:---:|---|---|---|
| NAV-AIRPORTS-01 | PR-U1b | P2 | R0 | DONE | Airports pages complete (CDG/Orly/Beauvais) + CTA to /booking | `7c9bc64` | Full airport landings with i18n, routing, and CTAs |
| NAV-ABOUT-CONTACT-FLEET-01 | PR-U1j | P2 | R1 | DONE | About/Contact/Fleet: anchors vs pages (coherence) | [#45](https://github.com/geinersito/paris-luxe-journey/pull/45) / `3398685` | All anchors on Home + client redirects + URL hash update |
| UX-EXCURSIONS-QUOTEFIRST-01 | PR-U1d | P2 | R0 | DONE | Excursions: quote-first CTAs (no /booking leakage) | `7168baa` | WhatsApp CTAs, no booking wizard navigation |
| UX-EXCURSIONS-CURATION-01 | PR-U1h | P2 | R0 | DONE | Excursions: curation pass (scroll tax + consistent CTAs) | `7168baa` | Same commit as quote-first refactor |
| UX-A11Y-EXCURSIONS-HERO-CHIPS-CONTRAST-01 | — | P1 | R0 | DONE | A11y contrast hardening for Excursions hero chips | [#91](https://github.com/geinersito/paris-luxe-journey/pull/91) / `b234e65` | Hero chips now use fixed high-contrast tokens + localized overlay behind hero content |
| UX-EVENTS-CONTEXT-CTA-01 | PR-U1e | P2 | R0 | DONE | Events: contextual CTA (improve intent) | [#46](https://github.com/geinersito/paris-luxe-journey/pull/46) / `dc928d3` | Card CTA + WhatsApp microcopy + dual bottom CTA |
| UX-EVENTS-CTA-PREFILL-01 | PR-U1i | P2 | R0 | DONE | Events CTA prefill (reduce friction) | [#47](https://github.com/geinersito/paris-luxe-journey/pull/47) / `331907f` | Prefill helpers + wired CTAs |
| UX-TYPOGRAPHY-01 | PR-U1-1 | P2 | R0 | DONE | Typography base (tokens/scale) | [#48](https://github.com/geinersito/paris-luxe-journey/pull/48) / `afcdaf7` | Fluid tokens wired to Tailwind + dead CSS pruned |
| UX-TOUCHTARGETS-48PX-01 | PR-U1-2 | P2 | R0 | DONE | Touch targets 48px (mobile) | [#49](https://github.com/geinersito/paris-luxe-journey/pull/49) / `fe1ac10` | Button/Input/Select → h-12 (48px) |
| UX-CONTRAST-AA-01 | PR-U1-3 | P2 | R0 | DONE | Contrast AA pass | [#50](https://github.com/geinersito/paris-luxe-journey/pull/50) / `646fe9d` | AA tokens: primary + muted-foreground darkened, contract doc added |
| UX-HOME-HERO-UBERLIKE-01 | PR-U2 | P2 | R0 | DONE | Home hero Uber-like + larger form | [#51](https://github.com/geinersito/paris-luxe-journey/pull/51) / `9bc49af` | Conversion-oriented: lg 2-col grid, widget right, trust dedup |
| UX-HOME-SIMPLIFY-SECTIONS-01 | PR-U3 | P2 | R0 | DONE | Simplify landing to 4–5 sections | [#52](https://github.com/geinersito/paris-luxe-journey/pull/52) / `9fedcfb` | IA + content pruning: 9→5 sections, About folded, -19% bundle |
| FIX-NAV-ABOUT-ANCHOR-SCROLL | Hotfix | P2 | R0 | DONE | SPA-safe anchor navigation (#about fix) | `21372f2` | Centralized hash handling in HashScroll component, removed Navbar setTimeout hack, fixed ContactSection anchor offset |
| UX-HOME-TRUST-LAYER-01 | PR-U4 | P2 | R0 | DONE | Trust layer + supporting CTA | [#53](https://github.com/geinersito/paris-luxe-journey/pull/53) / `e618fe3` | Inline trust badges in PremiumSection cards (above CTA), service-specific (not duplicated) |
| FIX-CTA-I18N-OVERFLOW-01 | Hotfix | P2 | R0 | DONE | i18n CTA overflow (ES locale) | [#53](https://github.com/geinersito/paris-luxe-journey/pull/53) / `e618fe3` | Allow text wrap + reduce px, maintain 48px touch target |
| FIX-I18N-SELECT-PLACEHOLDERS-01 | Hotfix | P2 | R0 | DONE | Shorten select placeholders + truncate safety | [#54](https://github.com/geinersito/paris-luxe-journey/pull/54) / `acde874` | Short i18n placeholders (labels provide context); `truncate` on `<select>` as safety net |
| UX-HOME-MOBILE-STICKY-CTA-01 | PR-U5 | P2 | R0 | DONE | Mobile sticky CTA booster | [#55](https://github.com/geinersito/paris-luxe-journey/pull/55) / `2c2c9cf` | Fixed bottom CTA on mobile; hidden when hero widget visible (IntersectionObserver); opens existing booking modal |
| UX-TIMEPICKER-COMPACT-01 | PR-U2c | P2 | R0 | DONE | Time picker compact | [#44](https://github.com/geinersito/paris-luxe-journey/pull/44) / `9daaa9a` | Native `<input type="time">` replaces 48-item popover |
| UX-BOOKING-DETAILS-REDESIGN-01 | PR-U3a | P2 | R0 | DONE | Redesign /booking/details | [#56](https://github.com/geinersito/paris-luxe-journey/pull/56) / `05275dd` | 2-col layout (form + sticky summary), i18n stepper, hardcoded ES strings fixed |
| UX-BOOKING-PAYMENT-OPTIMIZE-01 | PR-U3b | P2 | R0 | DONE | Optimize /booking/payment | [#57](https://github.com/geinersito/paris-luxe-journey/pull/57) / `049e252` | 2-col layout (form + sticky summary), i18n all hardcoded ES strings, trust microcopy, consistent with Details redesign |
| FLOW-BOOKING-CONFIRMATION-ROBUST-01 | PR-U3c | P2 | R1 | DONE | Robustify /booking/confirmation | [#43](https://github.com/geinersito/paris-luxe-journey/pull/43) / `4541326` | Refresh/back behavior via sessionStorage fallback + price display fix |

### SEO / Hygiene

| ID | Legacy | Priority | Risk | Status | Title | Evidence (PR/Commit) | Notes |
|---|---|---:|:---:|:---:|---|---|---|
| UX-SEO-METADATA-01 | PR-SEO1 | P2 | R0 | DONE | Events + BlogIndex meta/canonical/OG + JSON-LD | [#58](https://github.com/geinersito/paris-luxe-journey/pull/58) / `34060f1` | Localized title/desc, canonical, OG, JSON-LD for /events and /blog |
| UX-SEO-SITEMAP-ROBOTS-01 | PR-SEO3 | P2 | R0 | DONE | Automate sitemap.xml + robots.txt in build | [#59](https://github.com/geinersito/paris-luxe-journey/pull/59) / `a3a91ca` | Build-time `dist` generation, `VITE_PUBLIC_SITE_URL` fail-fast, CI env wired |
| UX-LOCATION-FALLBACKS-01 | PR-U6A | P2 | R0 | DONE | Centralize location fallbacks config | [#60](https://github.com/geinersito/paris-luxe-journey/pull/60) / `3712daf` | Extracted 3x duplicate array to `src/lib/locations/fallbacks.ts` |
| BOOKING-DB-ANTI-DOUBLEBOOK-01a | — | P0 | R2 | DONE | Anti-double-booking: unique index (vehicle_id, pickup_datetime) | [#62](https://github.com/geinersito/paris-luxe-journey/pull/62) / `164d193` | Partial unique index on active bookings; race test verified (23505) |
| BOOKING-DB-ANTI-DOUBLEBOOK-01b | — | P1 | R2 | DONE | Anti-double-booking: EXCLUDE USING gist with tstzrange | [#64](https://github.com/geinersito/paris-luxe-journey/pull/64) / `2daf54c` | service_end_datetime + is_active + EXCLUDE constraint; overlap test verified (23P01) |
| BOOKING-DB-ANTI-DOUBLEBOOK-01b-APP | — | P1 | R2 | DONE | Wire app: persist service_end_datetime + handle overlap (23P01) | [#66](https://github.com/geinersito/paris-luxe-journey/pull/66) / `a91a115` | App writes real `service_end_datetime`; overlap handling hardened for FunctionsHttpError payload parsing |
| RB-00-CANONICAL-STACK-01 | — | P0 | R0 | DONE | Docs-only: define canonical payments/webhooks stack + decision matrix | [#70](https://github.com/geinersito/paris-luxe-journey/pull/70) / `8140e44` | Decision: Candidate A canonical. See §RB-00 below |
| SEC-RESEND01-SECRETS-HYGIENE-01 | — | P0 | R0→R1 | DONE | Remove VITE_STRIPE_SECRET_KEY + VITE_RESEND_API_KEY from template; delete client-side Resend | [#71](https://github.com/geinersito/paris-luxe-journey/pull/71) / `e8c2ac2`, [#72](https://github.com/geinersito/paris-luxe-journey/pull/72) / `8e0b4a3` | .env.example cleaned + src/lib/email.ts deleted (dead, 0 imports) |
| OPS-WEBHOOK-IDEMPOTENCY-TABLE-01 | — | P1 | R2 | DONE | Create `processed_stripe_events` table + dedupe logic in canonical webhook | [#73](https://github.com/geinersito/paris-luxe-journey/pull/73) / `7e31067`, [#74](https://github.com/geinersito/paris-luxe-journey/pull/74) / `3e51bad` | DB migration + dedupe logic in stripe-webhooks; duplicate events return 200 + deduped:true |
| RGPD-GESTION-PES-REPO-PRIVATE-01 | — | P0 | — | TODO | Set `geinersito/Gestion-PES` repo to PRIVATE (real PII exposed) | | Out-of-repo tracking item. Urgent RGPD compliance |
| OPS-FN-CREATE-BOOKING-PAYMENT-NO-RETRY-ON-CONFLICT-01 | — | P1 | R2 | DONE | create-booking-payment: skip retry on deterministic conflicts (23P01/23505) | [#75](https://github.com/geinersito/paris-luxe-journey/pull/75) / `e219398` | Smart retry classifier + ConflictError class + HTTP 409 + conflict UX + vehicle_id guard; deterministic errors (23P01/23505/409) → no retry + structured response |
| TZ-PARIS-DISPLAY-SSOT-01 | — | P2 | R0 | DONE | Audit + fix toLocaleString without timeZone | [#76](https://github.com/geinersito/paris-luxe-journey/pull/76) / `382d9fa` | Created src/lib/datetime/paris.ts helper; fixed EventsFeed.tsx (2×), blog-utils.ts (1×); chart.tsx clarified (numeric, not date) |
| CI-SEO-SITE-URL-01 | — | P2 | R0 | DONE | Resolve VITE_PUBLIC_SITE_URL CI debt | [#77](https://github.com/geinersito/paris-luxe-journey/pull/77) / `8f33d2c` | Fallback to localhost:8082 when env var missing; scheme validation (http/https); prevents build crashes in local/CI environments |
| OPS-STRIPE-LEGACY-DEPRECATE-01 | — | P2 | R0→R1 | DOING | Deprecate legacy stripe-webhooks handler | [#78](https://github.com/geinersito/paris-luxe-journey/pull/78) / `8fd3365` (docs), [#79](https://github.com/geinersito/paris-luxe-journey/pull/79) / `d7c8606` (telemetry) | PR1 (cutover plan) ✅ PR2 (deprecation warnings + headers) ✅ — telemetry active; waiting 48–72h no-hit window for PR3 removal |

### Content SEO System

| ID | Legacy | Priority | Risk | Status | Title | Evidence (PR/Commit) | Notes |
|---|---|---:|:---:|:---:|---|---|---|
| SEO-SYSTEM-CONTENT-SSOT-01 | — | P2 | R0 | DONE | Create SEO system docs + agent prompt + backlog items | [#80](https://github.com/geinersito/paris-luxe-journey/pull/80) / `1ea27c5` | Docs-only: `docs/seo/CONTENT_SEO_SYSTEM.md` + `docs/seo/CONTENT_SEO_PROMPT.md`; establishes taxonomy, templates, schema.org, DoD for Blog/Events/Excursions |
| SEO-BLOG-META-CANONICALS-01 | — | P2 | R0 | DONE | Ensure unique title/meta/canonical across blog posts | [#82](https://github.com/geinersito/paris-luxe-journey/pull/82) / `c516aff` | Fixed hardcoded canonical URLs in BlogPost.tsx and BlogCategory.tsx; now use getSiteOrigin() helper for multi-domain support |
| SEO-AIRPORTS-METADATA-01 | — | P2 | R0 | DONE | Add Airports metadata/canonical/OG/Twitter + JSON-LD Service | [#111](https://github.com/geinersito/paris-luxe-journey/pull/111) / `85fa587` | Added localized SEO title/description for Airports (EN/FR/ES/PT), canonical without hash for `/airports` and `/:lang/airports`, and JSON-LD Service + LocalBusiness metadata on Airports page |
| SEO-EVENTS-SCHEMA-01 | — | P2 | R0 | TODO | Add Event schema.org (JSON-LD) to all event pages | | Implement Event schema with required fields (name, startDate, endDate, location, organizer); validate with Google Rich Results Test |
| SEO-EXCURSIONS-SCHEMA-01 | — | P2 | R0 | TODO | Add TouristTrip schema.org (JSON-LD) to excursion pages | | Implement TouristTrip or Product schema with itinerary, offers; validate with Google Rich Results Test |
| SEO-INTERNALLINK-RULES-01 | — | P2 | R0 | TODO | Audit + enforce internal linking rules | | Blog: min 2→Excursions, 1→/booking, 1→Events; Event: min 1→Excursion, 1→/booking; Excursion: min 2→related, 1→/booking |

### Content Integrity Program (Site-Wide + Multi-Language)

| ID | Legacy | Priority | Risk | Status | Title | Evidence (PR/Commit) | Notes |
|---|---|---:|:---:|:---:|---|---|---|
| CONTENT-AUDIT-SITEWIDE-I18N-01 | — | P2 | R0 | DONE | Site-wide content integrity audit (docs-only) | [#83](https://github.com/geinersito/paris-luxe-journey/pull/83) / `a58416c` | Inventory + scoring across 10 sections × 4 languages (EN/FR/ES/PT); identifies Top 10 fix targets (P0/P1/P2); deliverable: docs/content/CONTENT_INTEGRITY_AUDIT.md |
| CONTENT-EXCURSIONS-PAGES-ENRICH-01 | — | P0 | R1 | DONE | Create missing excursion detail pages (Loire, Champagne, Giverny) | [#85](https://github.com/geinersito/paris-luxe-journey/pull/85) / `7d45077` | 404 fix: 3 pages missing (only Versailles exists); use versailles.tsx as template; add FAQ, What's Included, Meeting Point, Cancellation blocks per page. **Required TECH-EXCURSIONS-ROUTER-HOTFIX-01 ([#87](https://github.com/geinersito/paris-luxe-journey/pull/87) / `6bdad32`) to register routes.** |
| CONTENT-EVENTS-FRESHNESS-01 | — | P0 | R0 | DONE | Update Events data + establish freshness workflow | [#95](https://github.com/geinersito/paris-luxe-journey/pull/95) / `09834ef` | Replaced stale 2025 feed with curated upcoming events; added generatedAt freshness signal + "Last updated" in UI; enforced per-event source attribution (sourceName/sourceUrl) and source link rendering |
| MEDIA-IMAGES-LIBRARY-01 | — | P0 | R0 | DONE | Replace image placeholders with real/licensed assets | [#99](https://github.com/geinersito/paris-luxe-journey/pull/99) / `013a0df` | Added local image library MVP with deterministic naming + docs/rules, wired Excursions hero/cards, Events feed/fallback, and Home trust avatars; removed runtime hotlinking in touched scope |
| CONTENT-EXCURSIONS-FAQ-BLOCKS-01 | — | P1 | R1 | DONE | Add detail blocks to Excursion pages (FAQ, Logistics) | [#101](https://github.com/geinersito/paris-luxe-journey/pull/101) / `2539c74` | Unified FAQ blocks across Versailles/Loire/Champagne/Giverny with shared EN/FR/ES/PT source-of-truth and concrete service answers (timing, pickup, tickets, cancellation, customization, accessibility, families) |
| UX-EXCURSIONS-ABOVE-FOLD-01 | — | P1 | R0 | DONE | Reduce pre-list scroll on Excursions list page | [#103](https://github.com/geinersito/paris-luxe-journey/pull/103) / `9ae13b0` | Tightened hero + How It Works spacing and moved Agencies/Groups CTA below the list so offers appear sooner on desktop while preserving mobile readability |
| CONTENT-TRUST-SIGNALS-01 | — | P1 | R0 | DONE | Add trust signals (Home, Booking flow) | [#105](https://github.com/geinersito/paris-luxe-journey/pull/105) / `97e0777` | Added compact process-trust block (licensed service, transparent pricing, door-to-door flexibility, secure payment/invoice on request, WhatsApp/email support) with EN/FR/ES/PT parity on Excursions and Events |
| CONTENT-AIRPORTS-TERMINAL-GUIDE-01 | — | P1 | R0 | DONE | Add terminal breakdown to Airport pages | [#107](https://github.com/geinersito/paris-luxe-journey/pull/107) / `a0108d6` | Added `/airports` and locale-aware terminal guide (CDG/ORY/BVA) with practical meet-point/tips and last-updated indicator backed by i18n keys (EN/FR/ES/PT) |
| UX-AIRPORTS-ADD-BOOKING-CTA-01 | — | P0 | R0 | DONE | Add conversion CTA layer and discoverable Terminal Guide nav entry on Airports | [#109](https://github.com/geinersito/paris-luxe-journey/pull/109) / `1508245` | Added localized "Terminal Guide" as first Airports dropdown item, localized `/:lang/airports#terminal-guide` entrypoint, and Airports CTA/navigation layer to improve booking discoverability and conversion |
| CONTENT-HOURLY-ITINERARIES-01 | — | P2 | R0 | TODO | Add sample hourly itineraries (3-5 use cases) | | Business meeting circuit, Paris by night, custom wine tour, wedding transport, family sightseeing; with photos + duration + example pricing |
| CONTENT-BLOG-EDITORIAL-MAP-01 | — | P2 | R0 | TODO | Create blog editorial calendar (next 12 posts) | | Plan 2-4 posts/week cadence per SEO strategy; topics aligned with keyword research; assign authors; schedule publication dates |
| CONTENT-FAQ-VISUAL-AIDS-01 | — | P2 | R0 | TODO | Add visual aids to FAQ/Legal pages | | Payment flow diagram, cancellation timeline, vehicle class comparison chart; improves comprehension + reduces support queries |
| TECH-I18N-EXCURSIONS-REFACTOR-01 | — | P2 | R1 | TODO | Refactor Excursions.tsx embedded translations to centralized i18n | | Move 1759 lines of embedded EN/FR/ES/PT translations to src/i18n/excursions.ts; standardize on t() pattern; improves maintainability |

## Risk Gates (DoD by Risk)

- `R0` (UI-only):
  - CI green
  - quick manual check in impacted screen

- `R1` (Flow):
  - all `R0`
  - manual smoke A/B/C/D:
    - A: happy path
    - B: refresh works
    - C: TTL expired/corrupt redirects safely
    - D: back/cancel keeps state consistent
  - no sensitive data persisted
  - precedence is `location.state > session snapshot > redirect`

- `R2` (Money/checkout):
  - all `R1`
  - idempotency and double-submit protection verified
  - cleanup only on success

---

## RB-00-CANONICAL-STACK-01 — Decision Matrix & Go/No-Go

### Context

Three webhook handlers coexist, two table families are referenced, and v312 schema lives in `_local_orphaned`. This section defines the canonical stack based on evidence, not assumption.

### Candidate Stacks

| Aspect | Candidate A (current production) | Candidate B (v312-integrated) |
|---|---|---|
| **Payment create** | `supabase/functions/create-booking-payment/index.ts` | `supabase/functions/create-prepaid-payment-v312/index.ts` |
| **Tables** | `bookings` + `payments` (standard migrations) | `bookings_v312` + v312 payment tables |
| **Webhook** | `supabase/functions/stripe-webhooks/index.ts` (legacy, no idempotency) | `supabase/functions/stripe-webhooks-v312-integrated/index.ts` (has idempotency logic) |
| **Frontend uses?** | ✅ Yes — `src/pages/booking/Payment.tsx:298` calls `create-booking-payment` | ❌ No frontend path found |
| **Schema official?** | ✅ Yes — standard migrations | ⚠️ **NO** — `supabase/migrations/_local_orphaned/20251214_v312_payment_system.sql` |
| **Runbooks test?** | ❌ Not directly | ✅ `TESTING_E2E_V312.md`, `RUNBOOK_DEPLOYMENT_V312.md` |

### Go/No-Go Checklist

Before declaring a canonical stack, ALL must be ✅:

| # | Check | Candidate A | Candidate B | Notes |
|---|---|---|---|---|
| 1 | Schema in official migrations (not `_local_orphaned`) | ✅ | ❌ FAIL | v312 schema not promoted |
| 2 | Frontend points to canonical create endpoint | ✅ | ❌ | Payment.tsx uses `create-booking-payment` |
| 3 | Runbooks aligned with canonical | ❌ PARTIAL | ✅ | Runbooks reference v312 |
| 4 | Webhook has idempotency (event_id stored) | ❌ FAIL | ⚠️ Logic exists, no table | Neither has `processed_stripe_events` table |
| 5 | Rollback plan documented | ❌ | ❌ | Neither has explicit rollback |

### Decision (Provisional)

**Canonical = Candidate A** (until v312 migration is promoted to official).

Rationale:
- v312 schema is in `_local_orphaned` → cannot be canonical
- Frontend already uses Candidate A endpoints
- Candidate A tables exist in official migrations

**Decision becomes final** when:
1. v312 migration is promoted to official → re-evaluate (B may become canonical), OR
2. Candidate A receives idempotency + conflict handling upgrades → A confirmed as canonical

### Deprecated Components (pending cutover)

| Component | Path | Reason | Remove condition |
|---|---|---|---|
| Legacy webhook | `supabase/functions/stripe-webhooks/index.ts` | No idempotency, no v312 features | After canonical webhook gets idempotency table |
| v312 webhook (standalone) | `supabase/functions/stripe-webhooks-v312/index.ts` | Superseded by v312-integrated | After RB-00 decision is final |
| v312-integrated webhook | `supabase/functions/stripe-webhooks-v312-integrated/index.ts` | Not canonical (migration not official) | Becomes canonical if v312 migration promoted |
| Orphaned migration | `supabase/migrations/_local_orphaned/20251214_v312_payment_system.sql` | Local-only, not in remote SSOT | Promote to official OR archive permanently |

### Dependency Chain (RB-00 → RB-04)

```
RB-00 (this item, docs-only)
  ├── Unblocks: OPS-FN-CREATE-BOOKING-PAYMENT-NO-RETRY-ON-CONFLICT-01 (RB-01)
  │              → apply conflict fix on canonical endpoint only
  ├── Unblocks: OPS-STRIPE-LEGACY-DEPRECATE-01 (RB-02)
  │              → cutover/remove legacy webhook after canonical has idempotency
  ├── Unblocks: SEC-RESEND01-SECRETS-HYGIENE-01 (RB-03)
  │              → move secrets to Edge Functions (canonical stack)
  └── Unblocks: TZ-PARIS-DISPLAY-SSOT-01 (RB-04)
       → timezone audit (independent but sequenced for focus)
```

### Validation Checklist (post-merge)

To confirm docs match code reality, grep:

```bash
# Canonical endpoint used by frontend
grep -r "create-booking-payment" src/
# Webhook functions that exist
ls supabase/functions/stripe-webhooks*/
# v312 orphaned migration
ls supabase/migrations/_local_orphaned/*v312*
# Tables in official migrations
grep -r "CREATE TABLE.*bookings" supabase/migrations/*.sql
```
