# Content SEO System — Paris Luxe Journey

**Owner**: Marketing + Dev  
**Status**: Active  
**Last updated**: 2026-02-13

---

## 1. Objectives by Content Section

### Blog
- **Primary goal**: Build topical authority on Paris luxury travel, VIP services, and premium experiences
- **Secondary goal**: Long-tail keyword coverage (e.g., "private driver Paris to Versailles", "luxury airport transfer CDG")
- **User intent**: Informational → Commercial (educate, then convert)
- **Publishing cadence**: 2–4 articles/week in controlled batches
- **Quality over volume**: Start with 1–2 pillar articles to set standard before scaling

### Events
- **Primary goal**: Capture "things to do in Paris" intent with fresh, timely content
- **Secondary goal**: Associate brand with premium cultural experiences
- **User intent**: Discovery → Ride booking for event attendance
- **Content model**: **Manual curation only** — no auto-generated or unverified events
- **Source requirement**: **Mandatory** — every event must cite official source (venue site, official calendar, ticketing platform)
- **Freshness**: Regular updates; archive/remove past events to avoid stale content

### Excursions
- **Primary goal**: Commercial intent for "day trips from Paris", "private tours", "chauffeur-driven excursions"
- **Secondary goal**: Differentiate from generic tour operators (emphasize private/luxury angle)
- **User intent**: High commercial intent → quote/booking
- **Content model**: Evergreen destination guides with clear CTAs to quote/contact

---

## 2. Taxonomy & Organization

### Blog

**Categories** (max 5–7 to avoid dilution):
- Luxury Travel Tips
- Paris Insider Guides
- Airport Transfers
- Events & Culture
- Excursions & Day Trips
- Fleet & Services
- Corporate Travel

**Tags** (flexible, max 15–20 active):
- Use for specific topics: `CDG`, `Orly`, `Versailles`, `Champagne`, `Fashion Week`, `Business Travel`, etc.

**Rules**:
- Every post must belong to exactly 1 category
- Max 3 tags per post
- No orphan tags (minimum 2 posts per tag)

### Events

**Event Types**:
- Concerts & Music
- Art Exhibitions
- Fashion & Design
- Sports Events
- Cultural Festivals
- Seasonal Events

**Districts** (for local SEO):
- 1st–20th Arrondissements
- Major landmarks: `Eiffel Tower`, `Louvre`, `Champs-Élysées`, etc.

**Rules**:
- Every event must have: title, type, district/venue, date range, official source link
- Archive events 7 days after end date
- No invented or unverified events

### Excursions

**Destinations**:
- Versailles
- Giverny (Monet's Garden)
- Champagne Region
- Loire Valley Châteaux
- Mont Saint-Michel
- Normandy Beaches
- Fontainebleau
- Disneyland Paris

**Duration**:
- Half-day (4h)
- Full-day (8h)
- Multi-day (custom)

**Rules**:
- Each excursion page = 1 destination
- Clear pricing disclaimer: "Contact for quote" or range (if policy allows)
- Emphasize private/chauffeur-driven angle

---

## 3. On-Page SEO Templates

### Blog Post Template

**Title** (max 60 chars):
- Pattern: `[Keyword Phrase] | Paris Luxe Journey`
- Example: `Private Driver Paris to Versailles: Complete Guide | Paris Luxe Journey`

**Meta Description** (max 155 chars):
- Include primary keyword + value prop + CTA
- Example: `Discover how to book a private driver from Paris to Versailles. Luxury, comfort, and expert local knowledge. Get a quote today.`

**H1** (unique, not identical to Title):
- Example: `Your Complete Guide to Private Drivers from Paris to Versailles`

**Required H2 sections**:
1. Introduction (context + hook)
2. Main content (listicle, guide, or narrative)
3. FAQ (3–5 questions)
4. Logistics / Practical Info
5. Call-to-Action

**Content length**:
- Pillar articles: 1500–2500 words
- Standard posts: 800–1200 words
- Avoid thin content (<500 words)

**Internal links** (mandatory):
- Minimum 2 links to Excursions pages
- 1 link to `/booking` or relevant service page
- 1 link to related Events (if applicable)

**Images**:
- Hero image: optimized WebP, max 200KB
- Alt text: descriptive, includes keyword naturally
- Lazy loading enabled

---

### Event Page Template

**Title** (max 60 chars):
- Pattern: `[Event Name] — [Month Year] | Paris Luxe Journey`
- Example: `Paris Fashion Week — September 2026 | Paris Luxe Journey`

**Meta Description** (max 155 chars):
- Include event type, venue, date, CTA
- Example: `Attend Paris Fashion Week in style with our private chauffeur service. Sep 24–Oct 2, 2026. Book your ride now.`

**H1**:
- Example: `Paris Fashion Week 2026: Your VIP Transport Solution`

**Required sections**:
1. Event overview (what, when, where)
2. Why attend (brief cultural/commercial hook)
3. Getting there with Paris Luxe Journey (service pitch)
4. FAQ
5. CTA: Book your ride

**Source citation**:
- Must include: "Event details verified from [Official Source Name + Link]"
- If event is canceled/rescheduled, update immediately or archive

**Schema.org**: `Event` (see §5)

---

### Excursion Page Template

**Title** (max 60 chars):
- Pattern: `Private [Destination] Tour from Paris | Paris Luxe Journey`
- Example: `Private Versailles Tour from Paris | Paris Luxe Journey`

**Meta Description** (max 155 chars):
- Include destination, duration, unique angle, CTA
- Example: `Explore Versailles in luxury with a private chauffeur. Half-day or full-day tours. Expert local guides. Request a quote.`

**H1**:
- Example: `Luxury Private Tour to Versailles from Paris`

**Required H2 sections**:
1. Why visit [Destination]
2. What's included in our private tour
3. Itinerary options (half-day / full-day)
4. Pricing & booking
5. FAQ
6. Related excursions

**Internal links** (mandatory):
- Link to 2–3 related excursions
- Link to `/booking` or contact form
- Link to relevant blog posts (if exist)

**Schema.org**: `TouristTrip` or `Product` (see §5)

---

## 4. Internal Linking Strategy

### Rules (quantifiable)

**Every Blog post**:
- Min 2 links to Excursions
- Min 1 link to `/booking` or service page
- Min 1 link to Events (if contextually relevant)

**Every Event page**:
- Min 1 link to related Excursion (e.g., Fashion Week → Shopping Tours)
- Min 1 link to `/booking`
- Optional: link to related blog post

**Every Excursion page**:
- Min 2 links to related excursions
- Min 1 link to blog content (if relevant)
- Min 1 link to `/booking`

### Anchor text guidelines

- Use natural, descriptive anchors (not "click here")
- Include primary keyword when contextually appropriate
- Vary anchor text (don't repeat exact match excessively)

### Link maintenance

- Quarterly audit: check for broken internal links
- Update links when URL structure changes
- Remove links to archived/deleted content

---

## 5. Schema.org Structured Data

### Blog: `Article`

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": {
    "@type": "Organization",
    "name": "Paris Luxe Journey"
  },
  "datePublished": "2026-02-13T10:00:00+01:00",
  "dateModified": "2026-02-13T10:00:00+01:00",
  "image": "https://eliteparistransfer.com/images/article-hero.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Paris Luxe Journey",
    "logo": {
      "@type": "ImageObject",
      "url": "https://eliteparistransfer.com/logo.png"
    }
  }
}
```

### Events: `Event`

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Paris Fashion Week 2026",
  "startDate": "2026-09-24T09:00:00+02:00",
  "endDate": "2026-10-02T18:00:00+02:00",
  "location": {
    "@type": "Place",
    "name": "Grand Palais",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenue Winston Churchill",
      "addressLocality": "Paris",
      "postalCode": "75008",
      "addressCountry": "FR"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Fédération de la Haute Couture et de la Mode"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://eliteparistransfer.com/booking",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
}
```

### Excursions: `TouristTrip`

```json
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Private Versailles Tour from Paris",
  "description": "Luxury chauffeur-driven tour to Versailles Palace and Gardens",
  "tourBookingPage": "https://eliteparistransfer.com/booking",
  "itinerary": [
    {
      "@type": "Place",
      "name": "Palace of Versailles",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Versailles",
        "addressCountry": "FR"
      }
    }
  ],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
}
```

---

## 6. Content Quality & Anti-Risk Guidelines

### Thin Content (avoid)

- No posts <500 words
- No duplicate content across pages
- No keyword stuffing or over-optimization
- Every page must provide unique value

### Events Verification (mandatory)

- **Every event must cite official source**: venue website, official calendar, ticketing platform
- **No inventing events** for SEO purposes
- **Update/archive policy**: remove or mark as "past event" within 7 days after end date
- **Disclaimer on event pages**: "Event details subject to change; verify with official source before booking transport"

### Duplicate Title/Meta Prevention

- Before publishing: search existing content for title/meta conflicts
- Use canonical URLs if content is syndicated or repurposed
- Maintain a title/meta registry (optional: automated check in CI)

### Brand Voice & Tone

- Premium but approachable (not pretentious)
- Informative, not salesy in blog content
- Clear CTAs without aggressive marketing language
- Consistent terminology: "private chauffeur" (not "driver"), "luxury transfer" (not "taxi"), etc.

---

## 7. Definition of Done (DoD) — SEO PR Checklist

Every PR that touches Blog, Events, or Excursions content must satisfy:

### Technical SEO

- [ ] Unique `<title>` (max 60 chars, verified no duplicate)
- [ ] Unique meta description (max 155 chars)
- [ ] H1 present and unique (not identical to title)
- [ ] Structured data (JSON-LD) added: `Article`, `Event`, or `TouristTrip`
- [ ] Canonical URL set correctly
- [ ] Images optimized (WebP, <200KB) with descriptive alt text
- [ ] Internal links meet minimum requirements (see §4)

### Content Quality

- [ ] Word count meets minimum (Blog: ≥800, Events: ≥400, Excursions: ≥1000)
- [ ] FAQ section included (min 3 questions)
- [ ] No duplicate content (verified via search or tool)
- [ ] CTA present and contextually appropriate
- [ ] Readability: clear headings, short paragraphs, bullet points where helpful

### Events-Specific

- [ ] Official source cited and linked
- [ ] Date/time/venue verified as accurate
- [ ] Event type and district assigned

### Governance

- [ ] PR description references Plan Item ID (e.g., `SEO-BLOG-META-CANONICALS-01`)
- [ ] Gates pass: `npm run lint`, `npx tsc --noEmit`, `npm run build`
- [ ] Manual smoke: page renders correctly, schema validates (Google Rich Results Test)

---

## 8. Workflow & Cadence

### Blog Publishing

**Phase 0** (Foundation):
- Publish 1–2 pillar articles (1500–2500 words, highly polished)
- Establish baseline quality standard

**Phase 1** (Controlled Growth):
- 2–4 articles/week
- Focus on one category at a time (avoid spreading thin across all topics)
- Monitor performance: CTR, time on page, conversions

**Phase 2** (Scaling):
- Once DoD is consistently met and metrics are positive, consider increasing cadence
- Introduce content calendar (plan 4 weeks ahead)

### Events Management

**Manual curation workflow**:
1. Identify event from official source
2. Draft event page following template (§3)
3. Verify details (date/time/venue/ticketing)
4. Cite source in content
5. Publish
6. Set reminder: archive 7 days post-event

**No batch automation** (for now):
- Auto-draft helpers can assist, but human verification is mandatory before publish

### Excursions

- Evergreen content: less frequent updates
- Quarterly review: verify pricing disclaimers, internal links, freshness signals (e.g., "Updated February 2026")

---

## 9. Performance Tracking (future)

Once Google Search Console is integrated:

**Key metrics**:
- Impressions & CTR by page type (Blog vs Events vs Excursions)
- Top-performing keywords
- Internal link click-through
- Bounce rate & time on page (via analytics)

**Action thresholds**:
- If CTR <2% after 30 days → review title/meta
- If bounce rate >70% → review content quality & CTA placement
- If zero conversions from content in 90 days → reassess strategy

---

## 10. Governance & Ownership

**Content creation**: Marketing + Dev (until dedicated content role exists)

**Technical SEO**: Dev (schema, canonical, site structure)

**Curation & sourcing**: Marketing (Events especially)

**SSOT for this system**: `docs/seo/CONTENT_SEO_SYSTEM.md` (this file)

**Backlog**: `docs/plan/IMPROVEMENTS.md` (canonical IDs: `SEO-*`)

**Operational prompt**: `docs/seo/CONTENT_SEO_PROMPT.md` (for agent-driven audits/implementations)

---

## 11. Revision History

| Date | Change | Author |
|------|--------|--------|
| 2026-02-13 | Initial system doc (SEO-SYSTEM-CONTENT-SSOT-01) | CTO + Agent |
