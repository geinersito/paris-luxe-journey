# CTO Publication Sprint Plan — Paris Elite Services

**Created:** 2026-04-29
**Author:** CTO
**Status:** ACTIVE
**Source audit:** `docs/audits/STRATEGIC_REDESIGN_AUDIT_2026_04_29.md`
**Deploy target:** After R0 sprint complete + final smoke green

---

## Situation Summary

Main is clean (`f5f7943`). Technical blockers resolved:
- ✅ PR #186 — PUB-BUNDLE-001: production build circular chunk fix (Chrome blank page resolved)
- ✅ PR #185 — PUB-P1-BRAND-META-001: brand strings + PWA manifest → Paris Elite Services

**New blocker identified:** The site is technically deployable but does not yet implement the strategic positioning model. The Events page — which is the primary organic acquisition layer — has zero real event content (feed is 71 days stale, all events past). The homepage does not surface events or excursions. Excursion detail pages have broken images and empty content sections.

**Deploy is HOLD pending R0 sprint.**

---

## Strategic Model (what we're building toward)

The site is NOT primarily a transport booking SPA. It is:

> **An editorial discovery platform for Paris cultural life, with private chauffeur as the premium enabler.**

Flow: Visitor discovers event/excursion/guide → understands Paris Elite Services provides private transport to get there → requests quote or contacts via WhatsApp.

Transport is the product. Discovery is the acquisition channel.

This model is documented in `docs/seo/CONTENT_SEO_SYSTEM.md` but was not implemented. The R0 sprint implements it minimally enough to publish.

---

## Sprint R0 — Deploy Gate

**Goal:** Minimum viable editorial site. Deploy after R0 complete.
**Target duration:** 3–5 days
**Risk class:** R0 (UI/content only, zero DB/functions/payment changes)

### Priority 1 — Critical (blocking deploy)

| ID | Task | File(s) | Effort |
|---|---|---|---|
| R0-01 | Hero copy → Option C: H1 "Discover Paris. Arrive in style." / Subheading "Events, excursions and private day trips with your own licensed chauffeur. Fixed price, 24/7, no surprises." / CTAs: "Plan my private transfer" + "Explore events & excursions" | `src/i18n/en.ts` + other locales | 1h |
| R0-02 | Remove zero-stats block ("0+ Clientes / 0.0 Valoración") → replace with 4-point trust module: Licensed VTC / Fixed Prices / Available 24/7 / English + Spanish speaking | `src/pages/Home.tsx` or stats component | 1h |
| R0-03 | Fix mobile nav hamburger — "Toggle menu" (ref_23) exists in DOM but not functioning at 390px | `src/components/Navbar.tsx` | 3h |
| R0-04 | Remove booking widget from hero on mobile — hero should be copy + single CTA only at ≤768px | `src/pages/Home.tsx` or hero component | 2h |
| R0-05 | Add 6–8 static hardcoded event cards to `src/data/events/events-feed.json` covering May–July 2026 (Roland Garros May 25–Jun 8, Paris Haute Couture Fashion Week Jul 6–10, Bastille Day Jul 14, Louvre summer exhibitions, Pompidou openings, Fête de la Musique Jun 21, Paris Jazz Festival Jun–Jul) | `src/data/events/events-feed.json` | 4h |
| R0-06 | Add Events discovery section to homepage — "Upcoming Events in Paris" with 3 event cards + "See all events →" link to /events | `src/pages/Home.tsx` | 2h |
| R0-07 | Add Excursions preview section to homepage — 3 excursion cards (Versailles, Champagne, Loire) + "Explore all excursions →" | `src/pages/Home.tsx` | 2h |
| R0-08 | Fix excursion detail page hero images (Versailles, Champagne, Giverny, Loire) — all fail to load (alt text visible) | `src/pages/excursions/` detail components | 2h |
| R0-09 | Fill Highlights and Why Visit content sections on excursion detail pages | `src/pages/excursions/` or data files | 3h |
| R0-10 | Remove "Entry tickets / Skip-the-line access / Guided tour" from Versailles tour card — replace with private chauffeur framing: "Private vehicle / Your itinerary / Your pace / No group waiting" | Versailles detail component or data | 1h |
| R0-11 | Replace Fiat 500 image in blog article CTA block with Mercedes E-Class or V-Class | `src/components/blog/` CTA component | 30min |
| R0-12 | Fix airport CTA language: "Get a Fixed Price" → "Obtener precio fijo" (ES), "Obtenir un prix fixe" (FR), "Obter preço fixo" (PT) | `src/i18n/*.ts` + airport page components | 30min |
| R0-13 | Remove "Atendemos en espanol" pill from hero, or replace with: "Servicio en español · Français · English" | `src/i18n/es.ts` + hero component | 15min |
| R0-14 | Canonicalize email domain — pick one (info@eliteparistransfer.com or contact@paris-elite-services.com) and apply sitewide | `src/i18n/*.ts`, `src/pages/Events.tsx`, footer component | 30min |
| R0-15 | Fix "Guías de Viaje" footer link: /guides/avoid-fake-taxis → /guides (once /guides index exists, or point to /blog as temp) | Footer component | 15min |
| R0-16 | Fix passenger counter default: 0 → 1 on /booking | `src/components/booking/` counter component | 15min |

**Total R0 Priority 1 estimated:** ~3 days (1 developer)

### Priority 2 — High value, include in R0 if time allows

| ID | Task | Effort |
|---|---|---|
| R0-17 | Add trust strip above booking form: "Licensed VTC · Fixed Price · No payment required to quote" | 30min |
| R0-18 | Add WhatsApp alternative below booking form CTA | 15min |
| R0-19 | Fix "Most Popular" badge → "Más Solicitado" | 15min |
| R0-20 | Fix "Chofer/Chófer" accent consistency sitewide | 1h |
| R0-21 | Fix "Licensed Chauffeurs · Meet & Greet · Flight Tracking" language consistency (EN text in ES page) | 30min |

---

## Sprint R1 — Post-Deploy (within 7 days of launch)

**Goal:** Full editorial model operational. Organic traffic acquisition layer working.

| ID | Task | Area |
|---|---|---|
| R1-01 | Full homepage section redesign per audit proposal (Section 3.1) | Homepage |
| R1-02 | Add Blog/Guides teaser section to homepage | Homepage |
| R1-03 | Create /guides index page (card grid of all guides) | Guides |
| R1-04 | Move fashion guide chauffeur CTA from page-end to mid-guide placement | Guides |
| R1-05 | Add inline CTA after "Semana de la Moda" section in fashion guide | Guides |
| R1-06 | Add "Related services" module to blog articles (transport articles → airport pages; destination articles → excursions) | Blog |
| R1-07 | Add starting price anchor near airport CTA ("From €110") | Airports |
| R1-08 | Add FAQ accordion to airport pages | Airports |
| R1-09 | Add "Also in Paris" internal links module to airport pages | Airports |
| R1-10 | Simplify nav: remove Flota/Nosotros/Contacto from top-level, add "Reservar →" CTA button | Navigation |
| R1-11 | Mobile sticky bottom bar (WhatsApp + Quote) | Mobile |
| R1-12 | Suggested itinerary section on excursion detail pages | Excursions |
| R1-13 | Quote CTA above fold on excursion detail pages | Excursions |

---

## Sprint R2 — Post-Launch (no deadline, driven by real usage data)

| ID | Task | Notes |
|---|---|---|
| R2-01 | Real fleet photography (exterior + interior, E-Class + V-Class) | Requires photoshoot |
| R2-02 | Named chauffeur profile on homepage or /nosotros | Requires Boris approval |
| R2-03 | OpenAgenda live event ingest pipeline | PR #173 (DRAFT) — requires DB deploy gate |
| R2-04 | Booking price reveal + Stripe activation | R2 risk — requires full backend readiness |
| R2-05 | Testimonials with photos + platform attribution | Requires client outreach |
| R2-06 | VTC association badge / press mention | Requires external validation |

---

## Deploy Gate Checklist

Before any public deploy, ALL of the following must be green:

### Technical (already satisfied on main `f5f7943`)
- [x] `npm run build` — no circular chunk warning
- [x] Chrome installed production preview — 6/6 routes render, zero createContext errors
- [x] `grep "Paris Luxe Journey" src/ dist/` — zero hits
- [x] `manifest.webmanifest` — name: "Paris Elite Services", short_name: "PES"
- [x] CI Lint & Build — SUCCESS

### Strategic (must be completed in R0 sprint)
- [ ] Events page has minimum 6 real event cards with dates, venues, CTAs
- [ ] Homepage surfaces events (3 cards) and excursions (3 cards)
- [ ] Hero copy updated to Option C
- [ ] Zero-stats block removed
- [ ] Excursion detail page images load correctly
- [ ] Excursion detail content sections filled (Highlights, Why Visit)
- [ ] No Fiat 500 image in blog CTA
- [ ] Mobile nav collapses at 390px
- [ ] Booking widget removed from hero on mobile
- [ ] Email domain canonicalized
- [ ] Airport CTA language consistent with page language

### Final smoke (run after R0 complete)
- [ ] `npm run build`
- [ ] `npm run preview -- --host 127.0.0.1 --port 4173`
- [ ] Chrome installed smoke: /, /events, /blog, /booking, /excursions, /guides/paris-fashion
- [ ] Manual check: events page shows real event cards with dates
- [ ] Manual check: homepage shows events + excursions sections
- [ ] Manual check: excursion detail pages load hero images and content
- [ ] Manual check: mobile nav collapses at 390px

---

## Decision Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-04-29 | Deploy HOLD pending R0 sprint | Strategic model not implemented. Events page is primary acquisition layer and has zero content. Deploy now = launching a transport SPA, not the editorial discovery model. |
| 2026-04-29 | R0 sprint scope: static hardcoded events only (no DB/functions) | PR #173 (OpenAgenda ingest) is DRAFT and requires R2 DB deploy gate. Static JSON is sufficient for launch and can be replaced by live ingest post-deploy. |
| 2026-04-29 | Hero Option C selected | Hybrid discovery + chauffeur. Serves both upper-funnel (editorial) and lower-funnel (airport transfer) intent. SEO-friendly for both query types. |
| 2026-04-28 | PR #186 merged | PUB-BUNDLE-001: circular chunk fix. Production build was crashing on all routes in Chrome. |
| 2026-04-28 | PR #185 merged | PUB-P1-BRAND-META-001: brand strings + PWA manifest aligned to Paris Elite Services. |

---

## Open Questions for CTO

1. **Events content:** Who curates the 6–8 static event cards for R0? Agent or manual editorial?
2. **Email domain:** Which canonical domain — eliteparistransfer.com or paris-elite-services.com?
3. **Fleet photography:** Is there existing photography of the Mercedes vehicles, or does R2 require a photoshoot?
4. **Hero language:** Option C is English ("Discover Paris. Arrive in style.") — should the hero be in French or Spanish for the primary audience?
5. **Chauffeur profile:** Is there a named chauffeur who can be featured on the site for trust purposes?
