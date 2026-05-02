# Complete Image Readiness Audit — Paris Elite Services

*Audited: 2026-05-01 · Desktop 1440px · localhost:8082*
*Sources: VS Code agent (technical) + Chrome Claude (art director)*
*Updated: 2026-05-02 — post IMG-R0-REPLACE-001 (#193) + Events editorial audit*

---

## 1. Executive Verdict

| | |
|---|---|
| **Publish with current images?** | **CONDITIONAL — see remaining blockers below** |
| **Confidence** | High |
| **Post-#193 state** | All 10 P0 image blockers resolved. Excursion heroes, fleet (Tesla/Multivan/EQV), event cards (Roland-Garros/VivaTech), blog card — all replaced. Deploy image gate closed. |
| **Remaining pre-deploy blocker** | `EVENTS-POLISH-PRELAUNCH-001` — Fête de la Musique still shows generic placeholder; 3 events duplicated in week/month sections; source attribution barely visible. Static/frontend fix only. |
| **What can wait R1/R2** | Airport differentiation, fashion guide hero, B2B visual proof, interior photos, real chauffeur photos, author avatars |

---

## 2. Image Inventory Scorecard

| Area | Score /10 | Verdict | Main Issue | Deploy Impact |
|---|---|---|---|---|
| Home | 5/10 | Conditional | Event cards all same image; Versailles card shows Eiffel Tower; Loire card shows tropical resort | HIGH — visible on first scroll |
| Fleet | 4/10 | Fail | Tesla = Model 3 not Y; VW Multivan = parking lot aerial; EQV = man with brush; no interior photos | HIGH — fleet is core conversion |
| Events | 6/10 | Conditional | ✅ Roland-Garros/VivaTech fixed (#193). ⚠️ Fête de la Musique = local placeholder. ⚠️ 3 events duplicated week/month. ⚠️ Source badge barely visible. | MEDIUM — `EVENTS-POLISH-PRELAUNCH-001` required |
| Excursions | 2/10 | Fail | Loire hero = graffiti; Versailles hero = skyscraper; Giverny hero = mountain/pine forest; Versailles cards = Eiffel Tower | CRITICAL — factually misleading |
| Blog | 5/10 | Conditional | One broken image card (VTC vs Taxi). CDG articles use airplane wing (acceptable). | MEDIUM |
| Guides | 4/10 | Weak | Paris Fashion guide hero = plain dark gradient, no fashion imagery | MEDIUM |
| Airports | 4/10 | Weak | All 3 airports use identical airplane wing/sky stock; no terminal, chauffeur, or Paris context | MEDIUM |
| Booking | 8/10 | Pass | No hero needed for form page; clean layout | LOW |
| B2B / Trust | 2/10 | Fail | /agencias and /empresas 100% text-only; no proof image, no vehicle, no logo | HIGH for conversion |
| Mobile | N/A | Not fully tested | Viewport resize blocked in test env; architecture appears responsive from source | — |

---

## 3. Missing or Broken Image List

| Priority | Route/Page | Current Image | Issue | Required Replacement | Deploy Blocker? |
|---|---|---|---|---|---|
| **P0** | `/excursions/loire-valley` | ~~Graffiti face artwork~~ | ~~Wrong destination~~ | ~~Château de Chambord~~ | ✅ FIXED #193 |
| **P0** | `/excursions/versailles` hero | ~~Angular modern skyscraper~~ | ~~Wrong destination~~ | ~~Palace of Versailles~~ | ✅ FIXED #193 |
| **P0** | Fleet — Volkswagen Multivan | ~~Aerial drone of parking lot~~ | ~~Wrong vehicle~~ | ~~Clean VW Multivan exterior~~ | ✅ FIXED #193 |
| **P0** | Fleet — Mercedes EQV Tourer | ~~Man holding cleaning brush~~ | ~~Wrong subject~~ | ~~EQV Tourer exterior~~ | ✅ FIXED #193 |
| **P0** | Fleet — Tesla Model Y | ~~White Tesla Model 3 on dirt road~~ | ~~Wrong model~~ | ~~Tesla Model Y exterior~~ | ✅ FIXED #193 |
| **P0** | Events home + /events — Roland-Garros | ~~Generic concert silhouette~~ | ~~Tennis shown as rock concert~~ | ~~Clay court aerial~~ | ✅ FIXED #193 |
| **P0** | Events home + /events — VivaTech | ~~Same concert silhouette~~ | ~~Tech conference as rock concert~~ | ~~Conference hall~~ | ✅ FIXED #193 |
| **P0** | Events — Fête de la Musique | Local placeholder (`event-placeholder-800x600.jpg`) | Generic image, no street concert context | Unsplash: Paris street musicians / open-air concert | **YES** — `EVENTS-POLISH-PRELAUNCH-001` |
| **P1** | `/excursions/giverny-honfleur` hero | ~~Rocky mountain landscape~~ | ~~Wrong hemisphere~~ | ~~Monet garden~~ | ✅ FIXED #193 |
| **P1** | `/excursions/champagne` hero | ~~Industrial fermentation tanks~~ | ~~Factory-feel~~ | ~~Champagne vineyard~~ | ✅ FIXED #193 |
| **P1** | `/blog` — VTC vs Taxi article card | ~~Broken image~~ | ~~Failed to load~~ | ~~Paris transport~~ | ✅ FIXED #193 |
| **P1** | `/excursions` list — Versailles cards | ~~Eiffel Tower stock~~ | ~~Wrong destination~~ | ~~Versailles facade~~ | ✅ FIXED #193 |
| **P1** | `/excursions` list — Giverny + Loire cards | ~~Tropical resort~~ | ~~Wrong continent~~ | ~~Correct destination~~ | ✅ FIXED #193 |
| **P2** | `/guides/paris-fashion` | Plain dark blue gradient — no image | Fashion guide with no fashion — looks unfinished | Parisian fashion boutique, runway, or elegant couple in Paris | NO |
| **P2** | `/airports/cdg`, `/orly`, `/beauvais` | All three identical airplane wing/sunset | Zero differentiation between airports; no chauffeur, no Paris | Different airport exterior for each; at minimum different crop | NO |
| **P2** | `/agencias` | No image at all | B2B page entirely text | Vehicle exterior or Paris street with executive framing | NO |
| **P2** | `/empresas` | No image at all | Same as /agencias | Corporate vehicle or La Défense backdrop | NO |
| **P3** | Blog — featured article hero | Airplane wing/sky | Generic; same image used on all airport pages | CDG terminal exterior or chauffeur/signboard at arrivals | NO |
| **P3** | All fleet cards | No interior photos (all NULL) | Users cannot see cabin quality | Leather interior of S-Class or V-Class | NO |
| **P3** | Testimonials section | No avatar photos | Name initials only | Silhouette or optional avatar | NO |

---

## 4. Weak or Misleading Image List

| Priority | Route/Page | Current Visual | Why Weak/Misleading | Recommended Replacement | Stock OK? | Real Photo Later? |
|---|---|---|---|---|---|---|
| **P0** | Events — Fête de la Musique | Concert stage silhouette | Same image as Roland-Garros and VivaTech | Street musicians, open-air concert Paris boulevard | YES | Later |
| **P0** | Home — all 3 event cards | Identical concert silhouette ×3 | Roland-Garros + VivaTech + Fête de la Musique all same — destroys editorial trust | Three distinct images: clay court / tech hall / street music | YES | Later |
| **P1** | `/excursions` — Versailles card | Eiffel Tower photo | Versailles trip with Paris tower — dissonant, wrong destination | Actual Palace of Versailles | YES | Later |
| **P1** | `/excursions/champagne` hero | Industrial fermentation tank interior | Wine-adjacent but feels like industrial plant — opposite of luxury | Rolling vineyards Épernay or Champagne house tasting room | YES | Later |
| **P2** | Fleet — Mercedes Classe S | Real local photo, Paris street | Good quality, correct vehicle. Slightly candid angle. | Acceptable as-is for deploy | — | YES eventually |
| **P2** | Fleet — Mercedes V-Class | Real local photo, Haussmann building | Correct vehicle + Paris context. Slightly washed-out. | Acceptable as-is | — | YES eventually |
| **P2** | Fleet — Mercedes G-Class | Blue G-Class on Paris street | Correct vehicle + Paris setting. Blue color — may not match actual fleet (black). | Acceptable; verify actual fleet color | — | YES eventually |
| **P2** | All airport pages | Airplane tail + sunset ×3 | Acceptable stock for deploy but zero differentiation + zero chauffeur context | At least 2 different shots; one with uniformed driver or sign | YES | YES medium-term |
| **P2** | `/guides/paris-fashion` | Dark blue gradient | Fashion guide with no fashion — misses editorial value entirely | Parisian fashion week street photo or Rue du Faubourg Saint-Honoré | YES | Later |
| **P3** | Blog — author avatar (Pierre Dubois) | Generic stock headshot | Looks stock; undermines "real chauffeur expert" credibility | Real team photo or portrait with Paris setting | YES (temp) | YES eventually |
| **P3** | Blog — CDG article | Airplane wing repeated | Same image as CDG airport hero — cross-page repetition | Different airport image (terminal interior, boarding gate) | YES | NO |

---

## 5. Fleet-Specific Recommendation

| Vehicle | Current Image | Status | Use Now? | Replace Before Deploy? | Real Photo Needed Later? | Notes |
|---|---|---|---|---|---|---|
| Mercedes Classe S | Real local — black S-Class, Paris street | ✅ Correct model + context | YES | NO | YES — cleaner 3/4 front angle | 7/10 — accurate, credible |
| Mercedes V-Class | Real local — black V-Class, Haussmann building | ✅ Correct model + Paris context | YES | NO | YES — interior shot needed | 7/10 — accurate + Paris-authentic |
| Mercedes G-Class | Real local — blue G-Class, Paris street | ✅ Correct model, Paris setting | YES | Borderline — verify fleet is blue | YES — if fleet is black, get correct color | 7/10 — check actual color |
| Tesla Model Y | White Tesla **Model 3** on rocky dirt road | ❌ Wrong model, wrong context | NO | **YES — P0** | YES | Replace immediately with correct Model Y |
| Volkswagen Multivan | Aerial drone of parking lot | ❌ No Multivan visible | NO | **YES — P0** | YES | Any clean VW Multivan T7 exterior acceptable |
| Mercedes EQV Tourer | Man holding cleaning brush | ❌ No vehicle visible | NO | **YES — P0** | YES | EQV 300 or V-Class EQ exterior, black preferred |

**Booking stays berline/van only:** ✅ No changes needed.

**6-vehicle public showcase:** Acceptable with "Sur demande" badges. Badges already implemented on Tesla, Multivan, EQV, G-Class. Verify badge renders on mobile 390px.

---

## 6. Minimum Pre-Deploy Image PR

**PR Name:** `fix/critical-image-replacements-v1`
**Risk:** Low — static asset swap only, no logic, no backend

| # | Target | Current | Replacement | Source |
|---|---|---|---|---|
| 1 | `excursions/loire-valley` hero | Graffiti | Château de Chambord/Chenonceau | Unsplash: "château loire valley" |
| 2 | `excursions/versailles` hero | Skyscraper | Palace of Versailles facade/Grand Canal | Unsplash: "palace of versailles" |
| 3 | `excursions/giverny-honfleur` hero | Mountain/pine forest | Monet water lily garden or Honfleur harbor | Unsplash: "monet garden giverny" |
| 4 | Fleet — Tesla Model Y | Model 3 on dirt road | Tesla Model Y, urban/neutral | Unsplash: "tesla model y" |
| 5 | Fleet — Volkswagen Multivan | Parking lot aerial | VW Multivan T7 exterior, dark color | Unsplash: "volkswagen multivan" |
| 6 | Fleet — Mercedes EQV Tourer | Man with brush | EQV 300 or V-Class EQ exterior | Unsplash: "mercedes eqv" |
| 7 | Events — Roland-Garros (home + /events) | Concert silhouette | Clay court aerial or Roland-Garros stadium | Unsplash: "tennis clay court crowd" |
| 8 | Events — VivaTech (home + /events) | Same concert silhouette | Tech conference hall or expo floor | Unsplash: "technology conference hall" |
| 9 | Excursion list cards — Versailles ×2 + Giverny + Loire | Eiffel Tower + tropical resort | Correct destination images | Same as items 1–3 (crop variants) |
| 10 | Blog — VTC vs Taxi card | Broken/missing | Any Paris cars/transport street | Unsplash: "paris street cars" |

**Do NOT touch:**
- Classe S, V-Class, G-Class local photos
- Homepage Eiffel Tower hero
- All text, prices, CTAs, forms, backend
- Airport images (P1/P2 — acceptable for launch)

**Smoke gates after merge:**
1. `/excursions/loire-valley` — no graffiti
2. `/excursions/versailles` — Versailles palace visible
3. `/#fleet` — Tesla = Model Y, VW = Multivan, EQV = van
4. `/events` — Roland-Garros ≠ VivaTech image
5. `/blog` — VTC article card loads image

---

## 7. Post-Deploy Real Photo Shot List

| # | Subject | Location | Orientation | Priority | Use Case |
|---|---|---|---|---|---|
| 1 | Classe S exterior 3/4 front | Avenue Montaigne or Rue de Rivoli | Landscape | P1 | Fleet card hero |
| 2 | Classe S exterior rear | Same | Landscape | P2 | Fleet second photo |
| 3 | Classe S interior — rear cabin, leather | Parked, clean | Landscape | P1 | Fleet interior, booking trust |
| 4 | V-Class exterior 3/4 front | Pont de l'Alma or Trocadéro (Eiffel soft bg) | Landscape | P1 | Fleet card, van booking image |
| 5 | V-Class interior — 7 seats visible | Parked, natural light | Landscape | P1 | Fleet interior, group transfer proof |
| 6 | Chauffeur with welcome sign "PARIS ELITE SERVICES" | CDG Terminal 2E arrivals or Orly T4 | Portrait | **P0** | Airport pages, meet-and-greet proof, homepage trust |
| 7 | Chauffeur loading luggage into S-Class trunk | Hotel entrance or Haussmann block | Landscape | P1 | Service proof, blog articles |
| 8 | Chauffeur driving — profile through window | Moving, Champs-Élysées or Bd Haussmann | Landscape | P2 | Blog CTAs, about page |
| 9 | Passenger in rear seat — discreet, no face | S-Class interior | Portrait | P2 | Homepage trust visual, B2B |
| 10 | Vehicle at CDG terminal | Terminal 2 exterior, departure level | Landscape | P1 | /airports/cdg hero |
| 11 | Vehicle at Orly terminal | ORY Terminal 4 exterior | Landscape | P2 | /airports/orly differentiation |
| 12 | Paris city transfer — vehicle on Seine quays | Pont de Sully or Quai de la Tournelle | Landscape | P1 | Homepage hero alt, about section |
| 13 | Corporate exec boarding V-Class | La Défense or CNIT forecourt | Portrait | P2 | /empresas hero, B2B proof |
| 14 | Group with luggage beside V-Class | CDG Terminal or Paris hotel entrance | Landscape | P1 | Group transfer, excursion proof |
| 15 | Versailles transfer — vehicle at main gate | Place d'Armes, Versailles | Landscape | P2 | Versailles excursion real proof |
| 16 | Champagne transfer — vehicle on Route du Champagne | N51 near Épernay with vineyard | Landscape | P2 | Champagne excursion page |

---

## 8. Art Direction Recommendation

The site's typography, color palette, and card structure already establish credible premium positioning — gold tones, editorial serif headings, and layout are well-executed. The failure is entirely in photographs, sourced without consistency rules or destination validation.

Every image should be evaluated against one brief: **"Does this show a premium, Paris-anchored, chauffeur-service reality?"** Images must be geographically accurate to their labeled destination, tonally dark or neutral (no tropical colors, no graffiti, no off-road dust), and always imply movement, arrival, or premium urban life.

The Eiffel Tower is acceptable as a global Paris anchor on generic pages, but must never represent Versailles, Champagne, Giverny, or Loire Valley — each has instantly recognizable, freely available imagery that costs nothing and immediately corrects what today reads as a placeholder website.

The fleet section is the most commercial section of the site. The two real local photos of Classe S and V-Class are strong — do not touch them. The three CDN placeholders are currently more damaging than having no image at all. Replace those three before anything else.

Once 10 images are fixed, the site will look like a professional chauffeur service. The first real photo investment should be: actual vehicle with chauffeur holding a signboard at CDG arrivals. That single image, placed on the CDG airport page and homepage trust strip, will permanently separate this site from AI-generated template competitors.

---

---

## 9. Events Feed — Post-Audit 2026-05-02

*Source: editorial audit of `src/data/events/events-feed.json` + `/events` page components*

### 9.1 Current Feed State (post-#193)

| Event | Image | Status |
|---|---|---|
| Roland-Garros | Unsplash CDN `photo-1750856698142` | ✅ Correct |
| VivaTech | Unsplash CDN `photo-1762968269894` | ✅ Correct |
| Fête de la Musique | `/images/library/events/event-placeholder-800x600.jpg` | ⚠️ Placeholder — replace |
| Paris Plages | Unsplash CDN `photo-1768577087534` | ✅ Acceptable |
| Paris Haute Couture | Unsplash CDN `photo-1762430815439` | ✅ Correct |
| Bastille Day | Unsplash CDN `photo-1721005248725` | ✅ Correct |

### 9.2 Orphaned Assets

9 local `.jpg` files in `public/images/library/events/` are **not referenced** by any event in the current feed. Leftover from a previous feed version.

```
art-capital-grand-palais-800x600.jpg
ecotrail-paris-2026-800x600.jpg
festival-mondial-magie-2026-800x600.jpg
jeu-de-paume-festival-800x600.jpg
l2p-convention-2026-800x600.jpg
paris-world-tourism-fair-2026-800x600.jpg
salon-agriculture-2026-800x600.jpg
salon-du-dessin-800x600.jpg
six-invitational-paris-800x600.jpg
```

**Action:** Delete all 9 in `EVENTS-POLISH-PRELAUNCH-001` unless explicitly reserved for next feed update.

### 9.3 UX Issues (non-image) — Summary

Full editorial audit: **`docs/EVENTS_AUDIT.md`**

| Sev | Issue | File | Fix |
|---|---|---|---|
| **P0** | "Coming Soon" label live in section header | `Events.tsx` + `src/i18n/*.ts` | Remove or replace with "May 2026" |
| **P0** | Week + Month sections show identical cards in identical order | `Events.tsx` | Filter "This Week" to ≤ 7 days OR rename + deduplicate |
| P1 | Hero has no image and no editorial intro paragraph | `Events.tsx` | Add static image + ~50-word intro block |
| P1 | No category filter bar | `EventsFeed.tsx` | Add pill/chip filter — R1 post-launch |
| P1 | Sidebar heading "Navigation" — adds no value | `Events.tsx` | Rename to "Browse Events" |
| P1 | VivaTech source → third-party aggregator, not vivatechnology.com | `events-feed.json` | Fix `source.name` + `source.url` |
| P1 | Bastille Day "Official Details" → paris.fr homepage, not event page | `events-feed.json` | Fix to specific Bastille Day URL |
| P1 | Date format inconsistent: US on cards, EU in hero badge | `EventsFeed.tsx` | Standardize to `Monday 18 May 2026` |
| P1 | No editorial intro between hero and grid | `Events.tsx` | Add ~50-word static block |
| P2 | "Paris Plages 2026 (provisional dates)" in card title | `events-feed.json` | Remove parenthetical from title |
| P2 | Source attribution `text-xs text-gray-500` — invisible | `EventsFeed.tsx:220–230` | Bump to `text-sm` + icon |
| P2 | Featured events (3/6) only have tiny gold star badge | `EventsFeed.tsx:131–136` | R1 — larger cards or featured-first sort |

### 9.4 Deploy Gate

**Two hard blockers from `docs/EVENTS_AUDIT.md`:**
- "Coming Soon" label live in production → `PR-1 fix/events-critical-labels`
- Identical duplicate sections → `PR-2 fix/events-section-deduplication`

**Estimated fix time: 4–6h across PR-1 + PR-2 + PR-3 (editorial polish).**

### 9.5 Next PRs

| PR | Name | Risk | Blocker? |
|---|---|---|---|
| PR-1 | `fix/events-critical-labels` | R0 | **Hard** |
| PR-2 | `fix/events-section-deduplication` | R0/R1 | **Hard** |
| PR-3 | `content/events-editorial-polish` | R0 | Strongly rec. |
| PR-4 | `feature/events-category-filters` | R1 | Post-launch |
| PR-5 | `content/events-seo-schema` | R0 | Post-launch |

Forbidden for all PRs: `package.json`, `Supabase`, `Stripe`, `OpenAgenda`, `migrations`, layout redesign.

---

## Format Cible Rappel

| Usage | Dimensions | Format | Max size |
|---|---|---|---|
| Hero / fleet exterior | 1200×800 | JPEG | 300 KB |
| Card / thumbnail | 800×600 | JPEG | 150 KB |
| Testimonial avatar | 400×400 | JPEG/PNG | 50 KB |
| Interior photo | 1200×800 | JPEG | 300 KB |

## Workflow Ajout Photo

1. Fournir photo brute (WhatsApp / ChatGPT / appareil)
2. Agent traite: crop landscape, blur plaque si besoin, resize 1200×800 + card 800×600
3. Fichier → `public/images/library/[section]/`
4. URL update: code source OU Supabase selon section
5. Rebuild `npm run build` → re-upload `dist/`
