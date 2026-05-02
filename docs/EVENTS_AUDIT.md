# AUDIT REPORT — Paris Elite Services · `/events` Page

**Audit date:** 2 May 2026 | **Environment:** localhost:8082 | **Auditor:** Claude Sonnet 4.6

---

## 1. EXECUTIVE VERDICT

| | |
|---|---|
| **Publishable as-is?** | **NO — CONDITIONAL** |
| **Confidence** | High (9/10 data coverage from full DOM + visual inspection) |
| **Main reason** | Three critical blockers: (1) "Coming Soon" label is live on the hero section — destroys trust on a published page; (2) "This Week" and "This Month" show **identical cards in identical order** — reads as copy-paste error; (3) hero has no image, no editorial intro, no category filters — feels like a placeholder stub. Everything else is fixable in a single polish PR. |
| **Deploy gate** | HOLD — require PR-1 + PR-2 before Hostinger deploy. PR-3 strongly recommended in same window. |

---

## 2. SCORECARD

| Dimension | Score | Notes |
|---|---|---|
| **Editorial authority** | 4 / 10 | No editorial voice, no intro paragraph, no curation rationale |
| **Visual credibility** | 5 / 10 | Cards look decent; hero is bare; no hero image; "Coming Soon" label is fatal |
| **Event usefulness** | 5 / 10 | 6 good events but no date-range context, no "why this matters" hook |
| **Conversion quality** | 6 / 10 | WhatsApp CTAs work; pre-filled messages are smart; CTA placement too far down |
| **Premium feel** | 5 / 10 | Typography good; colour palette right; card images feel generic stock |
| **SEO potential** | 4 / 10 | No H2 per event, no schema markup, no editorial paragraphs, no category taxonomy |
| **Mobile readiness** | 4 / 10 | Sidebar + 3-col grid breaks badly on mobile — does not collapse to single column |

**Overall: 4.7 / 10** — Below publishable threshold. Requires one pre-launch polish PR.

---

## 3. TOP 10 PROBLEMS

### P0-1 — "Coming Soon" badge is live in the section header

**Directly visible** above "This Week in Paris" heading. The italic gold *"Coming Soon"* renders as the section's eyebrow on the published page.

**Why it matters:** A visitor landing on /events sees "Coming Soon" on the page's main content section. Signals the page is not ready. Single most damaging trust signal on the entire page — directly contradicts the hero's "Updated on 29/04/2026 · Official sources verified" claim.

**Fix:** Remove `Coming Soon` from `This Week in Paris` entirely, or replace with a static editorial kicker such as *"Curated for you"* or the current month name (e.g. *"May 2026"*). The `Plan Ahead` kicker on `This Month in Paris` is fine — keep it.

**File:** `src/i18n/en.ts` → `events.comingSoon` key + all locale files. Or remove usage in `Events.tsx`.

---

### P0-2 — "This Week" and "This Month" show identical cards in identical order

**Both sections display the same three cards** — Roland-Garros, VivaTech, Fête de la Musique — in the same sequence. Then "This Month" adds three more. But the first three are pixel-identical duplicates.

**Why it matters:** A user who scrolls past the first section immediately sees the exact same content again. The cognitive response is "this site copy-pasted its own content" — a newspaper-level editorial failure. Destroys the credibility of a "curated guide" positioning instantly.

**Fix option A:** Rename "This Week" to "Coming Up" / "Next 2 Weeks" and include only the 3 month-only events there, dropping the weekly section entirely.
**Fix option B:** Genuinely filter "This Week" to events starting ≤ 7 days from today. Today (2 May 2026) → zero qualifying events → render graceful empty-state: *"No events this week — explore this month's calendar below."*

**File:** `src/pages/Events.tsx` — section rendering logic + `src/data/events/events-feed.json` if restructuring arrays.

---

### P1-3 — Hero has no background image and no editorial paragraph

The hero is a plain cream/beige background with title, subtitle, date, and two buttons. No visual anchors, no Paris photography.

**Why it matters:** Every credible Paris event guide opens with at minimum a hero image and a 2–3 sentence editorial intro. Without these, the page reads as a functional directory, not a premium discovery platform.

**Fix (static only):** Add a licensed static `<img>` or CSS background-image of a Paris venue/event photograph. Add a 2-sentence editorial intro block below the subtitle. Example: *"Each week our editorial team selects the most significant events in Paris — from international sports finals to fashion week appearances. Every listing includes a direct chauffeur transfer link so you can arrive without compromise."*

---

### P1-4 — No category filters exist

The DOM has no filter bar. Events carry category tags ("festival", "concert", "fashion") in card metadata but there is no way to filter or browse by category.

**Why it matters:** A guide with 6 events and no filters is just a list. Category filters signal editorial structure, enable future scalability, and are a primary SEO + UX differentiator.

**Fix (static only):** Add a static horizontal pill/chip filter bar above the event grid. For launch with 6 events, these can be JavaScript toggle buttons that show/hide cards based on their existing category data attribute. No backend required.

---

### P1-5 — Sidebar "Navigation" is underpowered and mislabelled

The sidebar contains exactly two buttons: "This Week in Paris" and "This Month in Paris." The heading is literally "Navigation."

**Why it matters:** A sidebar on an events guide is prime editorial real estate. The current sidebar is empty scaffolding that makes the page look skeletal.

**Fix (static only):** Rename "Navigation" to *"Browse Events"* or *"Quick Access."* Add category quick-links. Consider adding a small "Arrive in Style" promo card inside the sidebar linking to the WhatsApp quote.

**File:** `src/pages/Events.tsx` or sidebar component.

---

### P1-6 — VivaTech source link points to third-party aggregator, not official site

The `Source:` field for VivaTech shows "TechUp Connect" (connect.tech-up.org), not vivatechnology.com. The "Official Details" button correctly links to vivatechnology.com.

**Why it matters:** Listing a third-party aggregator as the source for Europe's largest tech conference undermines the "Official sources verified" claim in the hero.

**Fix:** Change VivaTech `source.name` → `"VivaTech"` and `source.url` → `"https://vivatechnology.com/"`.

**File:** `src/data/events/events-feed.json`

---

### P1-7 — Bastille Day "Official Details" links to paris.fr homepage, not a dedicated page

The "Official Details" link for Bastille Day 2026 points to `https://www.paris.fr/` — the homepage.

**Why it matters:** Landing on a homepage when a user expects a specific event page signals the curator didn't find the right URL. Undermines "Official sources verified."

**Fix:** Use `https://www.paris.fr/pages/le-14-juillet-a-paris-4637` or the specific 2026 parade/feux d'artifice page.

**File:** `src/data/events/events-feed.json`

---

### P1-8 — Date formatting is inconsistent and non-premium

Cards show `Mon, May 18, 11:00 AM` (US-style) while the hero update badge shows `29/04/2026` (EU-style). Two date formats on the same page.

**Why it matters:** Premium luxury services do not tolerate formatting inconsistency. Mixed `GB EN` language switcher + US date format on cards is jarring.

**Fix:** Standardize to one format. Recommended: `Monday 18 May 2026` (full, unambiguous, European) or `18 May 2026`. Pure frontend change in date rendering logic.

**File:** `src/components/events/EventsFeed.tsx` — date formatter call.

---

### P1-9 — No editorial intro paragraph between hero and event sections

The hero CTA buttons are immediately followed by the sidebar + event grid. Zero editorial context.

**Fix (static only):** Add a short editorial intro block (static HTML/JSX) between hero and the event grid. ~50 words, pure static content. Example: *"Paris never stops. Each month, we curate the cultural, sporting and social events that matter most to our clients — from Roland-Garros VIP enclosures to Haute Couture front rows. Below, every listing includes a one-click chauffeur quote request."*

**File:** `src/pages/Events.tsx`

---

### P2-10 — "Paris Plages 2026 (provisional dates)" exposes backend uncertainty in card title

The card title literally reads `"Paris Plages 2026 (provisional dates)."` Headlines must be assertive.

**Fix:** Remove `(provisional dates)` from the title. Uncertainty signal already exists inside the description body — that is the correct location.

**File:** `src/data/events/events-feed.json` — title field for `paris-plages-2026`.

---

## 4. RECOMMENDED PRE-LAUNCH FIXES

All static / content / frontend. No backend, no DB, no payment, no OpenAgenda.

| # | Fix | Effort | Blocker? |
|---|---|---|---|
| 1 | Remove or replace "Coming Soon" label | 1 line | **YES** |
| 2 | Resolve section overlap — rename or filter "This Week" | 1–2h | **YES** |
| 3 | Remove "(provisional dates)" from Paris Plages title | 1-word edit | Recommended |
| 4 | Fix VivaTech source: `name = "VivaTech"`, `url = "https://vivatechnology.com/"` | 1 line | Recommended |
| 5 | Fix Bastille Day "Official Details" URL to specific paris.fr page | 1 line | Recommended |
| 6 | Standardize date format across all cards and hero | 30 min | Recommended |
| 7 | Rename sidebar heading from "Navigation" to "Browse Events" | 1 string | Recommended |
| 8 | Add static editorial intro paragraph (~50 words) | 30 min | Recommended |

---

## 5. R1 / R2 IMPROVEMENTS (Post-Launch)

**R1 — First iteration after launch:**
- Static category filter bar (pill/chip row) with JS toggle on existing `data-category` attributes — no backend
- Hero photograph or atmospheric Paris visual (licensed, CSS background)
- Expand event inventory from 6 to 12–15 events; add exhibition, gastronomy categories
- "Why arrive by chauffeur" micro-section near top — 3 bullet points with icons
- Sticky sidebar conversion nudge: small "Book your transfer" card pinned on desktop
- Replace "We reply fast on WhatsApp" with: "Our team confirms within the hour"
- `schema.org/Event` JSON-LD structured data for all 6 events (pure frontend, major SEO benefit)

**R2 — Second iteration:**
- Per-event detail pages (`/events/roland-garros-2026`) for SEO depth
- Editorial "Chauffeur Tips" per event (e.g. "Book 72h ahead for Roland-Garros — road access restricted on match days")
- "Recently Featured" / "Past Events" section for evergreen SEO
- Integrate OpenAgenda when runtime approved
- Newsletter/WhatsApp broadcast opt-in
- Featured event "hero card" — full-width at top of grid for most premium/upcoming event

---

## 6. PROPOSED PAGE STRUCTURE (Static/Frontend)

```
/events — Proposed Structure

┌────────────────────────────────────────────────────────┐
│  HERO                                                   │
│  Background: atmospheric Paris venue photo              │
│  Badge: "Updated 2 May 2026 · Verified Sources"        │
│  H1: "Events in Paris"                                 │
│  Subtitle: [2 lines, luxury positioning]               │
│  [Book a Transfer — WhatsApp] [Browse by Category]     │
├────────────────────────────────────────────────────────┤
│  EDITORIAL INTRO (static, ~50 words)                   │
│  "Each month, our editorial team curates…"             │
├────────────────────────────────────────────────────────┤
│  CATEGORY FILTER BAR                                   │
│  [All] [Sport] [Fashion] [Music & Festivals]           │
│  [Exhibitions] [Corporate] [National Days]             │
├────────────────────────────────────────────────────────┤
│  LAYOUT: Left sidebar (desktop) + Main content         │
│                                                        │
│  SIDEBAR                    MAIN CONTENT               │
│  ─────────────────────      ──────────────────────     │
│  Browse Events              SECTION: "This Month"      │
│  › This Month               Eyebrow: "May 2026"        │
│  › Coming Up                [3-col card grid]          │
│                                                        │
│  Featured Event             SECTION: "Coming Up"       │
│  ┌─────────────────────┐    Eyebrow: "June → July"     │
│  │ Roland-Garros image │    [3-col card grid]          │
│  │ "Book your transfer"│                               │
│  └─────────────────────┘                               │
│                                                        │
│  Quick tip block                                       │
│  "Chauffeur tip: Book                                  │
│   72h ahead for major                                  │
│   sporting events"                                     │
├────────────────────────────────────────────────────────┤
│  EVENT CARD ANATOMY                                    │
│  [Image]  [Category pill]  [Featured badge?]           │
│  H2: Event Name                                        │
│  📅 Monday 18 May 2026, 11:00                          │
│  📍 Stade Roland-Garros · 16ème                        │
│  Description (2–3 lines, editorial voice)              │
│  [Get a Quote — WhatsApp]  [Official Site ↗]           │
│  Source: Roland-Garros (official)                      │
├────────────────────────────────────────────────────────┤
│  TRUST & GUARANTEES BLOCK (keep current — good as-is) │
├────────────────────────────────────────────────────────┤
│  CHAUFFEUR CTA BANNER                                  │
│  "Need a Ride to Your Event?"                          │
│  [Get a Quote on WhatsApp]  [Email Us]                 │
└────────────────────────────────────────────────────────┘
```

---

## 7. MICRO-PR PLAN

### PR-1 · `fix/events-critical-labels`

**Objective:** Kill "Coming Soon" label, remove "(provisional dates)" from Paris Plages, fix VivaTech source, fix Bastille Day URL.

**Files:**
- `src/data/events/events-feed.json`
- `src/i18n/en.ts` + `es.ts` + `fr.ts` + `pt.ts` — remove/replace `events.comingSoon` usage, or
- `src/pages/Events.tsx` — remove `comingSoon` eyebrow rendering

**Risk class:** R0 — pure data/content edits, zero logic change

**Acceptance criteria:**
- No "Coming Soon" text visible on `/events` in any viewport
- Paris Plages title reads "Paris Plages 2026" only
- VivaTech source reads "VivaTech" → vivatechnology.com
- Bastille Day "Official Details" links to specific paris.fr Bastille Day page

**Smoke test:** `localhost:8082/events` — Ctrl+F "Coming Soon" → 0 results; inspect all 6 card source + external links

---

### PR-2 · `fix/events-section-deduplication`

**Objective:** Eliminate duplicate cards between "This Week" and "This Month."

**Files:**
- `src/pages/Events.tsx` — section rendering logic
- `src/data/events/events-feed.json` — array restructure if needed

**Risk class:** R0/R1 — rendering logic change; requires testing empty-state fallback

**Acceptance criteria:**
- "This Week" shows ONLY events ≤ 7 days from current date, OR is renamed/replaced with no-duplicate structure
- Zero event cards appear in both sections simultaneously
- If "This Week" is empty: renders *"No events this week — explore this month's calendar below"*

**Smoke test:** Verify at today (2 May 2026): "This Week" empty or renamed; "This Month" shows all 6. Verify at May 18: Roland-Garros appears in "This Week" only, not both.

---

### PR-3 · `content/events-editorial-polish`

**Objective:** Editorial intro paragraph, standardize date format, rename sidebar heading.

**Files:**
- `src/pages/Events.tsx` — editorial intro block, sidebar heading
- `src/components/events/EventsFeed.tsx` — date format
- `src/i18n/*.ts` — sidebar heading key update

**Risk class:** R0 — static content additions and cosmetic changes

**Acceptance criteria:**
- Editorial intro paragraph (~50 words) visible between hero and first event section
- All event card dates use consistent format: `Monday 18 May 2026, 11:00`
- Hero date badge and card dates use same format locale
- Sidebar heading reads "Browse Events"

**Smoke test:** Visual review at 1280px and 390px; verify date format consistency across all 6 cards

---

### PR-4 · `feature/events-category-filters` *(R1 — post launch)*

**Objective:** Static category filter bar above event grid, JS toggle, no backend.

**Files:**
- `src/components/events/EventFilters.tsx` (new)
- `src/pages/Events.tsx` — import + placement
- Event cards — expose `data-category` attribute

**Risk class:** R1 — pure frontend JS/CSS; must not break SSR

**Acceptance criteria:**
- Filter pills: [All] [Sport] [Fashion] [Festivals] [Music] [National Days]
- Clicking filter hides non-matching cards (CSS or opacity toggle)
- "All" resets to showing all cards
- No console errors

**Smoke test:** Click "Fashion" → only Haute Couture visible; click "All" → all 6 cards visible

---

### PR-5 · `content/events-seo-schema` *(R1 — post launch)*

**Objective:** Add `schema.org/Event` JSON-LD for all events.

**Files:**
- `src/pages/Events.tsx` — `<head>` JSON-LD injection

**Risk class:** R0 — additive only; no impact on render

**Acceptance criteria:**
- Google Rich Results Test passes for /events
- All 6 events have: `name`, `startDate`, `location.name`, `location.address`, `url`
- Zero schema validation errors

---

## 8. WHAT IS ALREADY GOOD — DO NOT TOUCH

- Trust & Guarantees block — well-written and well-positioned. Keep as-is.
- Per-card WhatsApp quote pre-fill messages — event title + date + venue in message body is excellent conversion UX. Do not simplify.
- "Official Details" external link pattern — smart. Keep.
- Typography and colour palette — premium and appropriate.
- Footer — complete and professional.
- `Source:` attribution pattern — correct instinct; needs data quality to match ambition.

---

## 9. FINAL RECOMMENDATION

**The gap between current state and publishable state is ~4–6 hours of frontend work across PR-1, PR-2, and PR-3.**

This page should not miss a deploy window over it, but it also should not ship as-is.

| PR | Blocker? | Effort |
|---|---|---|
| PR-1 `fix/events-critical-labels` | **Hard blocker** | 30 min |
| PR-2 `fix/events-section-deduplication` | **Hard blocker** | 1–2h |
| PR-3 `content/events-editorial-polish` | Strongly recommended | 1–2h |
| PR-4 `feature/events-category-filters` | R1 post-launch | — |
| PR-5 `content/events-seo-schema` | R1 post-launch | — |
