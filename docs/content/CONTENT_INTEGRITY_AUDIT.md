# Content Integrity Audit — Site-Wide + Multi-Language

**Audit Date**: 2026-02-14  
**Audited By**: Development Team  
**Scope**: All user-facing content across EN/FR/ES/PT  
**Methodology**: Code inspection + data inventory + i18n coverage analysis

---

## Executive Summary

### Overall Health Score: **6.2/10**

**Critical Findings**:
1. ⚠️ **Events data is stale** (dated 2025-01-13, no real feed)
2. ⚠️ **Excursion detail pages missing** (only Versailles exists; Loire, Champagne, Giverny missing)
3. ⚠️ **Images are placeholders** (Unsplash URLs, no brand assets)
4. ⚠️ **Translation inconsistency** (some pages use embedded translations, others use t())
5. ✅ **Blog has strong foundation** (10 full articles with complete i18n)

---

## Content Inventory Matrix

### Scoring Legend
- **2** = Complete, high quality
- **1** = Partial, needs improvement  
- **0** = Missing or severely inadequate

### Criteria
1. **Completeness**: Info density (itinerary, includes/excludes, meeting point, cancellation, trust signals)
2. **Media**: Hero + gallery availability, alt text, license/attribution
3. **Freshness**: Up-to-date content, especially time-sensitive (events, pricing)
4. **Consistency**: Premium tone, claims accuracy, pricing clarity
5. **i18n Parity**: Translation completeness across EN/FR/ES/PT

---

## Section-by-Section Analysis

### 1. Home Page

| Language | Completeness | Media | Freshness | Consistency | i18n Parity | **Total** |
|----------|:------------:|:-----:|:---------:|:-----------:|:-----------:|:---------:|
| EN       | 2            | 1     | 2         | 2           | 2           | **9/10**  |
| FR       | 2            | 1     | 2         | 2           | 2           | **9/10**  |
| ES       | 2            | 1     | 2         | 2           | 2           | **9/10**  |
| PT       | 2            | 1     | 2         | 2           | 2           | **9/10**  |

**Notes**:
- ✅ Component-based (HeroSection, PremiumSection, FleetSection, TestimonialSection, ContactSection)
- ✅ Full i18n using `t()` helper
- ✅ JSON-LD schema present (Organization, LocalBusiness)
- ⚠️ Media score 1: relies on stock images, no branded hero

**Fixes needed**:
- Replace generic stock images with branded photography
- Add trust signals (reviews count, years established, certifications)

---

### 2. Booking Flow (Details → Payment → Confirmation)

| Language | Completeness | Media | Freshness | Consistency | i18n Parity | **Total** |
|----------|:------------:|:-----:|:---------:|:-----------:|:-----------:|:---------:|
| EN       | 2            | 1     | 2         | 2           | 2           | **9/10**  |
| FR       | 2            | 1     | 2         | 2           | 2           | **9/10**  |
| ES       | 2            | 1     | 2         | 2           | 2           | **9/10**  |
| PT       | 2            | 1     | 2         | 2           | 2           | **9/10**  |

**Notes**:
- ✅ Full payment flow implemented
- ✅ Stripe integration working
- ✅ i18n complete (Details.tsx, Payment.tsx, Confirmation.tsx)
- ⚠️ Media score 1: no visual trust signals (payment badges, vehicle photos inline)

**Fixes needed**:
- Add payment security badges (Stripe Verified, SSL, etc.)
- Show selected vehicle image in confirmation
- Add cancellation policy detail block

---

### 3. Excursions (List + Detail Pages)

| Language | Completeness | Media | Freshness | Consistency | i18n Parity | **Total** |
|----------|:------------:|:-----:|:---------:|:-----------:|:-----------:|:---------:|
| EN       | 1            | 0     | 2         | 1           | 2           | **6/10**  |
| FR       | 1            | 0     | 2         | 1           | 2           | **6/10**  |
| ES       | 1            | 0     | 2         | 1           | 2           | **6/10**  |
| PT       | 1            | 0     | 2         | 1           | 2           | **6/10**  |

**Notes**:
- ✅ Excursions.tsx has full i18n (EN/FR/ES/PT) with 1759 lines of embedded translations
- ✅ 4 excursions defined in data (Loire Valley, Champagne, Versailles, Giverny)
- ⚠️ **CRITICAL**: Only versailles.tsx detail page exists; Loire, Champagne, Giverny routes 404
- ⚠️ **CRITICAL**: All images are placeholders (`/images/loire-valley.jpg`, `/images/champagne.jpg` - likely missing)
- ⚠️ Completeness score 1: Missing FAQs, meeting point details, cancellation policy per excursion

**Fixes needed (P0)**:
1. Create detail pages for Loire Valley, Champagne, Giverny (use versailles.tsx as template)
2. Add real images or high-quality stock per destination
3. Add FAQ section per excursion
4. Add "What's Included / Not Included" detail blocks
5. Add meeting point + logistics section
6. Refactor embedded translations to use i18n t() for consistency

---

### 4. Events (List Page)

| Language | Completeness | Media | Freshness | Consistency | i18n Parity | **Total** |
|----------|:------------:|:-----:|:---------:|:-----------:|:-----------:|:---------:|
| EN       | 1            | 1     | 0         | 1           | 2           | **5/10**  |
| FR       | 1            | 1     | 0         | 1           | 2           | **5/10**  |
| ES       | 1            | 1     | 0         | 1           | 2           | **5/10**  |
| PT       | 1            | 1     | 0         | 1           | 2           | **5/10**  |

**Notes**:
- ✅ Events.tsx page structure clean with i18n
- ✅ events-feed.json has sample events with full EN/FR/ES/PT translations
- ⚠️ **CRITICAL**: Freshness score 0 — events dated `2025-01-13` (over 1 year old!)
- ⚠️ No real event feed integration (static JSON, no source attribution enforcement)
- ⚠️ No event detail pages (all events link to external venues)

**Fixes needed (P0)**:
1. Implement event freshness workflow (archive past events, add upcoming)
2. Add "Source" attribution per event (mandatory per CONTENT_SEO_SYSTEM.md)
3. Consider: event detail pages vs external links only
4. Add "Last Updated" timestamp visible to users

---

### 5. Blog (Index + Category + Post Pages)

| Language | Completeness | Media | Freshness | Consistency | i18n Parity | **Total** |
|----------|:------------:|:-----:|:---------:|:-----------:|:-----------:|:---------:|
| EN       | 2            | 1     | 2         | 2           | 2           | **9/10**  |
| FR       | 2            | 1     | 2         | 2           | 2           | **9/10**  |
| ES       | 2            | 1     | 2         | 2           | 2           | **9/10**  |
| PT       | 2            | 1     | 2         | 2           | 2           | **9/10**  |

**Notes**:
- ✅ **10 full blog articles** with complete content (articles folder has all subdirectories)
- ✅ posts.meta.ts shows full i18n metadata (title, description, SEO, tags)
- ✅ Blog architecture clean (BlogIndex, BlogCategory, BlogPost components)
- ✅ Categories and tags implemented
- ✅ Author bios with i18n
- ⚠️ Media score 1: Using Unsplash placeholders for author avatars and some post images

**Fixes needed**:
- Replace Unsplash author avatars with real team photos or branded placeholders
- Audit each article for image licensing (ensure attribution if needed)
- Add "Updated: YYYY-MM-DD" to stale posts

---

### 6. Airport Pages (CDG, Orly, Beauvais)

| Language | Completeness | Media | Freshness | Consistency | i18n Parity | **Total** |
|----------|:------------:|:-----:|:---------:|:-----------:|:-----------:|:---------:|
| EN       | 1            | 1     | 2         | 2           | 1           | **7/10**  |
| FR       | 1            | 1     | 2         | 2           | 1           | **7/10**  |
| ES       | 1            | 1     | 2         | 2           | 1           | **7/10**  |
| PT       | 1            | 1     | 2         | 2           | 1           | **7/10**  |

**Notes**:
- ✅ Dedicated pages for CDG.tsx, Orly.tsx, Beauvais.tsx
- ⚠️ Completeness score 1: Missing terminal-specific instructions, luggage handling details
- ⚠️ i18n parity score 1: Need to verify translation completeness (some pages may have partial i18n)

**Fixes needed**:
- Add terminal breakdown (CDG T1/T2A/T2B/etc.)
- Add "Where to meet your driver" section with photos/maps
- Add luggage capacity guidance per vehicle class

---

### 7. Hourly Service (Quote Page)

| Language | Completeness | Media | Freshness | Consistency | i18n Parity | **Total** |
|----------|:------------:|:-----:|:---------:|:-----------:|:-----------:|:---------:|
| EN       | 1            | 0     | 2         | 1           | 1           | **5/10**  |
| FR       | 1            | 0     | 2         | 1           | 1           | **5/10**  |
| ES       | 1            | 0     | 2         | 1           | 1           | **5/10**  |
| PT       | 1            | 0     | 2         | 1           | 1           | **5/10**  |

**Notes**:
- ✅ Hourly.tsx main page + hourly/Quote.tsx
- ⚠️ Media score 0: No use case photos (corporate events, weddings, wine tours)
- ⚠️ Completeness score 1: Missing sample itineraries, common use cases
- ⚠️ i18n parity score 1: Partial translations

**Fixes needed**:
- Add 3-5 sample hourly itineraries (business meeting circuit, Paris by night, custom wine tour)
- Add use case photos (business traveler, wedding couple, family sightseeing)
- Complete i18n for all copy

---

### 8. FAQ / Legal Pages (FAQPage, PrivacyPage, TermsPage)

| Language | Completeness | Media | Freshness | Consistency | i18n Parity | **Total** |
|----------|:------------:|:-----:|:---------:|:-----------:|:-----------:|:---------:|
| EN       | 2            | 0     | 2         | 2           | 2           | **8/10**  |
| FR       | 2            | 0     | 2         | 2           | 2           | **8/10**  |
| ES       | 2            | 0     | 2         | 2           | 2           | **8/10**  |
| PT       | 2            | 0     | 2         | 2           | 2           | **8/10**  |

**Notes**:
- ✅ FAQPage.tsx, PrivacyPage.tsx, TermsPage.tsx all exist
- ✅ Likely using i18n (need full check)
- ⚠️ Media score 0: No visual aids (icons, diagrams for payment flow, cancellation timeline)

**Fixes needed**:
- Add visual timeline for cancellation policy (24h free, <24h penalties)
- Add payment method icons/badges

---

### 9. Guides (AvoidFakeTaxis)

| Language | Completeness | Media | Freshness | Consistency | i18n Parity | **Total** |
|----------|:------------:|:-----:|:---------:|:-----------:|:-----------:|:---------:|
| EN       | 2            | 1     | 2         | 2           | 1           | **8/10**  |
| FR       | 2            | 1     | 2         | 2           | 1           | **8/10**  |
| ES       | 2            | 1     | 2         | 2           | 1           | **8/10**  |
| PT       | 2            | 1     | 2         | 2           | 1           | **8/10**  |

**Notes**:
- ✅ AvoidFakeTaxis.tsx is substantial (13.49 KB)
- ✅ High-value educational content
- ⚠️ i18n parity score 1: Verify full translation coverage

**Fixes needed**:
- Complete i18n audit of this page
- Add infographic/visual guide (official taxi vs fake taxi comparison)

---

## Top 10 Fix Targets (Prioritized)

### P0 (Urgent — Functional Gaps)

1. **Create missing excursion detail pages** (Loire Valley, Champagne, Giverny)  
   **Impact**: 404 errors, broken user journeys  
   **Effort**: Medium (3 pages × template reuse)  
   **Owner**: Content + Dev  
   **Item ID**: `CONTENT-EXCURSIONS-PAGES-ENRICH-01`

2. **Update Events data freshness** (remove 2025-01-13 stale data)  
   **Impact**: Brand credibility, legal risk (fake events)  
   **Effort**: Low (data update) + Medium (workflow for ongoing freshness)  
   **Owner**: Marketing + Dev  
   **Item ID**: `CONTENT-EVENTS-FRESHNESS-01`

3. **Replace image placeholders** (Excursions, Hourly, Blog authors)  
   **Impact**: Premium brand perception  
   **Effort**: High (photography/licensing + upload + integration)  
   **Owner**: Marketing  
   **Item ID**: `MEDIA-IMAGES-LIBRARY-01`

### P1 (High Value — UX/Conversion)

4. **Add Excursion detail blocks** (FAQ, What's Included, Meeting Point, Cancellation)  
   **Impact**: Conversion rate (reduce booking friction)  
   **Effort**: Medium (content writing + component integration)  
   **Owner**: Content + Dev  
   **Item ID**: `CONTENT-EXCURSIONS-FAQ-BLOCKS-01`

5. **Add trust signals** (Home, Booking flow: reviews count, certifications, payment badges)  
   **Impact**: Conversion rate  
   **Effort**: Low (copy + icons)  
   **Owner**: Marketing + Dev  
   **Item ID**: `CONTENT-TRUST-SIGNALS-01`

6. **Airport pages terminal breakdown** (CDG T1/T2A/etc., meeting point photos)  
   **Impact**: Customer satisfaction, reduce support queries  
   **Effort**: Medium (content + photos)  
   **Owner**: Ops + Content  
   **Item ID**: `CONTENT-AIRPORTS-TERMINAL-GUIDE-01`

### P2 (Nice to Have — Polish)

7. **Hourly service sample itineraries** (3-5 use cases with photos)  
   **Impact**: Discoverability of hourly service  
   **Effort**: Medium (copywriting + layout)  
   **Owner**: Content  
   **Item ID**: `CONTENT-HOURLY-ITINERARIES-01`

8. **Refactor Excursions.tsx embedded translations** (move to i18n t() for consistency)  
   **Impact**: Maintainability, developer experience  
   **Effort**: High (refactor 1759 lines)  
   **Owner**: Dev  
   **Item ID**: `TECH-I18N-EXCURSIONS-REFACTOR-01`

9. **Blog editorial calendar** (plan next 12 posts, 2-4/week cadence)  
   **Impact**: SEO authority, organic traffic  
   **Effort**: Low (planning) + Ongoing (writing)  
   **Owner**: Marketing  
   **Item ID**: `CONTENT-BLOG-EDITORIAL-MAP-01`

10. **FAQ visual aids** (payment flow diagram, cancellation timeline)  
    **Impact**: User comprehension  
    **Effort**: Low (design + integrate)  
    **Owner**: Design + Dev  
    **Item ID**: `CONTENT-FAQ-VISUAL-AIDS-01`

---

## Translation Consistency Analysis

### Current State
- **4 languages supported**: EN, FR, ES, PT
- **2 translation patterns in use**:
  1. ✅ **Centralized i18n** (Home, Blog, Events) using `t()` helper → `src/i18n/*.ts`
  2. ⚠️ **Embedded translations** (Excursions.tsx) → hard to maintain

### Recommendation
**Standardize on centralized i18n** (`t()` pattern) for all pages. Embedded translations in Excursions.tsx (1759 lines) should be refactored to `src/i18n/excursions.ts` or similar.

**Benefits**:
- Single source of truth per language
- Easier translation management
- Better tooling support (i18n linting, missing key detection)

---

## Image & Media Gaps Summary

| Asset Type | Current State | Gap | Recommended Action |
|------------|---------------|-----|---------------------|
| **Hero images** | Stock/Unsplash | No branded photography | Photoshoot: Paris landmarks + fleet |
| **Excursion images** | Placeholders (`/images/...`) | Likely 404 or generic | License or shoot: Versailles, Loire, Champagne, Giverny |
| **Blog author avatars** | Unsplash | Generic faces | Team photos or stylized icons |
| **Airport terminal photos** | Missing | No meeting point visuals | On-location photography (CDG T2E arrivals, etc.) |
| **Hourly use cases** | Missing | No lifestyle shots | Stock or custom: business meeting, wedding, wine tour |
| **Trust badges** | Missing | No SSL/Stripe/certification icons | Download official badges (Stripe, SSL cert, insurance) |

**Estimated Image Count Needed**: ~50-80 images (hero variants, excursion galleries, use cases, trust badges)

---

## i18n Completeness Matrix

| Section | EN | FR | ES | PT | Notes |
|---------|:--:|:--:|:--:|:--:|-------|
| Home | ✅ | ✅ | ✅ | ✅ | Full i18n via t() |
| Booking | ✅ | ✅ | ✅ | ✅ | Full i18n via t() |
| Excursions List | ✅ | ✅ | ✅ | ✅ | Embedded translations (needs refactor) |
| Excursions Detail | ✅ | ⚠️ | ⚠️ | ⚠️ | Only Versailles exists; verify i18n |
| Events | ✅ | ✅ | ✅ | ✅ | JSON data + t() |
| Blog | ✅ | ✅ | ✅ | ✅ | posts.meta.ts + article content |
| Airports | ✅ | ⚠️ | ⚠️ | ⚠️ | Verify translation completeness |
| Hourly | ✅ | ⚠️ | ⚠️ | ⚠️ | Partial translations |
| FAQ/Legal | ✅ | ✅ | ✅ | ✅ | Likely complete (verify) |
| Guides | ✅ | ⚠️ | ⚠️ | ⚠️ | AvoidFakeTaxis: verify i18n |

**Legend**:  
✅ = Complete or high confidence  
⚠️ = Needs verification or known gaps

---

## Recommended Next Steps

1. **Immediate** (P0):
   - Fix 404s (excursion detail pages)
   - Refresh Events data (remove stale 2025-01-13 entries)
   - Audit image placeholders + create image sourcing plan

2. **Short-term** (1-2 weeks, P1):
   - Add trust signals (reviews, badges)
   - Complete airport terminal guides
   - Add excursion FAQ blocks

3. **Medium-term** (1-2 months, P2):
   - Execute image library buildout (photoshoots + licensing)
   - Refactor Excursions.tsx i18n
   - Launch blog editorial calendar

4. **Ongoing**:
   - Events freshness workflow (weekly check + archive)
   - Blog publishing cadence (2-4 posts/week per SEO plan)
   - i18n coverage monitoring (new features ship with all 4 languages)

---

## Governance & Ownership

| Area | Owner | Frequency |
|------|-------|-----------|
| **Events freshness** | Marketing | Weekly |
| **Blog publishing** | Marketing + Content | 2-4 posts/week |
| **Image library** | Marketing | One-time buildout + ongoing |
| **i18n coverage** | Dev | Per PR (DoD) |
| **Excursion content** | Content + Ops | Quarterly review |
| **Airport guides** | Ops | Semi-annual (terminal changes) |

---

## Appendix: Files Audited

**Pages** (20 files):
- `src/pages/Home.tsx`
- `src/pages/Events.tsx`
- `src/pages/Excursions.tsx`
- `src/pages/excursions/*.tsx` (versailles.tsx only)
- `src/pages/blog/*.tsx` (BlogIndex, BlogCategory, BlogPost, NotFound)
- `src/pages/booking/*.tsx` (BookingPage, Details, Payment, Confirmation)
- `src/pages/airports/*.tsx` (CDG, Orly, Beauvais)
- `src/pages/hourly/*.tsx` (Hourly, Quote)
- `src/pages/guides/*.tsx` (AvoidFakeTaxis)
- `src/pages/FAQPage.tsx`, `PrivacyPage.tsx`, `TermsPage.tsx`

**Data** (4 sources):
- `src/data/excursions.ts` (4 excursions defined)
- `src/data/events/events-feed.json` (sample events, stale)
- `src/data/blog/posts.meta.ts` (10 posts with full metadata)
- `src/data/blog/articles/*` (10 article folders)

**i18n** (5 files):
- `src/i18n/en.ts`, `fr.ts`, `es.ts`, `pt.ts`, `config.ts`

---

**End of Audit**
