# Content SEO Prompt — Agent-Ready Template

**Purpose**: This prompt is designed for AI coding agents (Kimi K2, Claude Code, GitHub Copilot, etc.) to perform SEO audits and implement improvements following the system defined in `docs/seo/CONTENT_SEO_SYSTEM.md`.

**Usage**: Copy-paste this prompt into your agent interface when working on SEO/content tasks.

---

## Standard Agent Prompt Template

```text
ROLE: CTO Supervisor — Content SEO (Blog/Events/Excursions). Repo: paris-luxe-journey. Windows. Cross-repo strict.

PRE-FLIGHT (MANDATORY; paste outputs in PR description):
- pwd
- git rev-parse --show-toplevel
- git remote -v
- git status -sb
- git log -1 --oneline

CONTEXT:
- Main branch: main
- SEO System SSOT: docs/seo/CONTENT_SEO_SYSTEM.md
- Plan backlog: docs/plan/IMPROVEMENTS.md
- Current task: [SPECIFY ITEM ID, e.g., SEO-BLOG-META-CANONICALS-01]

CONSTRAINTS:
- Follow SEO system rules (docs/seo/CONTENT_SEO_SYSTEM.md)
- Micro-PR: <200 net lines, ≤4 files ideally
- Single concern per PR
- No content creation without explicit approval (audit/fixes only unless told otherwise)
- Events: manual curation only, source citation mandatory
- Blog: controlled batches (2–4/week), no mass generation

TASK (select one or customize):
[See §Audit Tasks or §Implementation Tasks below]

GATES (mandatory):
- npm run lint
- npx tsc --noEmit
- npm run build
- Manual smoke: verify page renders, schema validates (Google Rich Results Test)

DELIVERABLE:
- Branch: [e.g., seo/blog-meta-canonicals-01]
- Commit message: [e.g., "fix(seo): ensure unique title/meta across blog posts"]
- Evidence Pack in PR body:
  - Pre-flight outputs
  - Diffstat
  - Gates summary (pass/fail)
  - Manual smoke steps performed
  - SSOT lines updated (IMPROVEMENTS.md + STATUS.md)
```

---

## Audit Tasks (copy-paste as needed)

### Audit 1: Blog Meta/Canonical Uniqueness

```text
TASK (SEO-BLOG-META-CANONICALS-01):
1) Audit all blog posts:
   - Check for duplicate <title> tags
   - Check for duplicate meta descriptions
   - Verify canonical URLs are set correctly
   - Report any conflicts in PR description
2) Fix duplicates:
   - Rewrite conflicting titles/metas to be unique
   - Follow title/meta templates from CONTENT_SEO_SYSTEM.md §3
   - Max 60 chars for title, max 155 for meta
3) Add validation (optional, if trivial):
   - Script or CI check to detect future duplicates
4) Update IMPROVEMENTS.md: mark SEO-BLOG-META-CANONICALS-01 as DONE + PR/SHA
```

---

### Audit 2: Events Schema.org Implementation

```text
TASK (SEO-EVENTS-SCHEMA-01):
1) Audit all event pages:
   - Check if JSON-LD schema is present
   - Verify it follows Event schema (CONTENT_SEO_SYSTEM.md §5)
   - Check required fields: name, startDate, endDate, location, organizer
2) Implement missing schema:
   - Add JSON-LD to <head> of event pages
   - Use dynamic data (event name, date, venue from content)
   - Validate with Google Rich Results Test
3) Test:
   - Pick 2–3 event pages, verify schema renders correctly
   - Check Search Console preview (if available)
4) Update IMPROVEMENTS.md: mark SEO-EVENTS-SCHEMA-01 as DONE + PR/SHA
```

---

### Audit 3: Excursions Schema.org Implementation

```text
TASK (SEO-EXCURSIONS-SCHEMA-01):
1) Audit all excursion pages:
   - Check if JSON-LD schema is present
   - Decide: TouristTrip or Product schema (follow CONTENT_SEO_SYSTEM.md §5)
   - Verify required fields: name, description, itinerary, offers
2) Implement missing schema:
   - Add JSON-LD to <head> of excursion pages
   - Use dynamic data (destination name, description, booking link)
   - Validate with Google Rich Results Test
3) Test:
   - Pick 2–3 excursion pages, verify schema renders correctly
4) Update IMPROVEMENTS.md: mark SEO-EXCURSIONS-SCHEMA-01 as DONE + PR/SHA
```

---

### Audit 4: Internal Linking Compliance

```text
TASK (SEO-INTERNALLINK-RULES-01):
1) Audit internal links across Blog/Events/Excursions:
   - Blog posts: min 2 links to Excursions, 1 to /booking, 1 to Events (if relevant)
   - Event pages: min 1 to Excursion, 1 to /booking
   - Excursion pages: min 2 to related excursions, 1 to /booking
2) Report violations:
   - List pages that don't meet minimum link requirements
3) Fix violations:
   - Add contextually appropriate internal links
   - Use descriptive anchor text (not "click here")
   - Follow guidelines in CONTENT_SEO_SYSTEM.md §4
4) Quarterly check script (optional):
   - Create script to audit internal link counts
5) Update IMPROVEMENTS.md: mark SEO-INTERNALLINK-RULES-01 as DONE + PR/SHA
```

---

### Audit 5: Thin Content Detection

```text
TASK (SEO-THINCONTENT-GUARDRAILS-01):
1) Scan all content pages:
   - Count word count for Blog, Events, Excursions
   - Flag pages <500 words (Blog/Excursions) or <400 (Events)
2) Report thin content:
   - List violating pages in PR description
3) Recommend action per page:
   - Expand content (add FAQ, logistics, context)
   - Merge with related page (if duplicate intent)
   - Archive/delete (if no value)
4) (Optional) Add CI check:
   - Warn if new content is <minimum word count
5) Update IMPROVEMENTS.md: mark SEO-THINCONTENT-GUARDRAILS-01 as DONE + PR/SHA
```

---

## Implementation Tasks (copy-paste as needed)

### Implementation 1: Add FAQ Section to Blog Template

```text
TASK (SEO-BLOG-FAQ-TEMPLATE-01):
1) Identify blog template/component:
   - Locate BlogPost component or MDX template
2) Add FAQ section template:
   - H2: "Frequently Asked Questions"
   - Minimum 3 questions with answers
   - Use <details> or accordion UI (accessibility-friendly)
3) Add FAQ schema (optional, if not already done):
   - JSON-LD FAQPage schema
4) Apply to 2–3 existing blog posts as proof-of-concept:
   - Pick high-traffic or pillar posts
   - Add contextually relevant FAQ
5) Gates + smoke test
6) Update IMPROVEMENTS.md: mark item as DONE + PR/SHA
```

---

### Implementation 2: Canonical URL Enforcement

```text
TASK (SEO-CANONICAL-URL-ENFORCE-01):
1) Audit <link rel="canonical"> usage:
   - Check if set on all Blog/Events/Excursions pages
   - Verify it points to correct absolute URL
2) Fix missing/incorrect canonicals:
   - Use Helmet or Meta component to set canonical dynamically
   - Ensure HTTPS, correct domain, no query params (unless intentional)
3) Test:
   - View source on 5–10 pages, confirm canonical present and correct
4) Update IMPROVEMENTS.md: mark item as DONE + PR/SHA
```

---

### Implementation 3: Image Optimization Pass

```text
TASK (SEO-IMAGE-OPTIMIZATION-01):
1) Audit images on Blog/Events/Excursions:
   - Check file sizes (flag >200KB)
   - Check formats (flag non-WebP)
   - Check alt text (flag missing or generic)
2) Optimize violating images:
   - Convert to WebP
   - Compress to <200KB
   - Add descriptive alt text (include keyword naturally)
3) Implement lazy loading:
   - Verify images use loading="lazy" attribute
4) Gates + smoke test
5) Update IMPROVEMENTS.md: mark item as DONE + PR/SHA
```

---

## Content Creation Tasks (manual approval required)

**⚠️ Important**: Do NOT create content without explicit CTO approval.

### Blog Post Creation (if approved)

```text
TASK (SEO-BLOG-CREATE-PILLAR-01):
Pre-condition: CTO has approved topic, keyword, and outline.

1) Create blog post following template (CONTENT_SEO_SYSTEM.md §3):
   - Title (max 60 chars, unique)
   - Meta description (max 155 chars)
   - H1 (unique, not identical to title)
   - Required H2 sections: Intro, Main Content, FAQ, Logistics, CTA
   - Word count: 1500–2500 (pillar) or 800–1200 (standard)
2) Add internal links (mandatory):
   - Min 2 to Excursions
   - 1 to /booking
   - 1 to Events (if relevant)
3) Add schema (Article JSON-LD)
4) Optimize images (WebP, <200KB, alt text)
5) DoD checklist (CONTENT_SEO_SYSTEM.md §7):
   - All checkboxes must pass before PR submission
6) Manual smoke: render page, validate schema (Google Rich Results Test)
7) Update IMPROVEMENTS.md: mark item as DONE + PR/SHA
```

---

### Event Page Creation (if approved)

```text
TASK (SEO-EVENT-CREATE-01):
Pre-condition: CTO has approved event and provided official source.

1) Verify event details from official source:
   - Date/time/venue accurate
   - Organizer confirmed
   - Event still scheduled (not canceled)
2) Create event page following template (CONTENT_SEO_SYSTEM.md §3):
   - Title (max 60 chars, unique)
   - Meta description (max 155 chars)
   - H1, overview, getting there, FAQ, CTA
   - Word count: ≥400
3) Cite official source (mandatory):
   - "Event details verified from [Source Name + Link]"
4) Add schema (Event JSON-LD with all required fields)
5) Add internal links:
   - Min 1 to related Excursion
   - 1 to /booking
6) DoD checklist (CONTENT_SEO_SYSTEM.md §7)
7) Set reminder: archive event 7 days after end date
8) Manual smoke + validate schema
9) Update IMPROVEMENTS.md: mark item as DONE + PR/SHA
```

---

### Excursion Page Creation (if approved)

```text
TASK (SEO-EXCURSION-CREATE-01):
Pre-condition: CTO has approved destination and pricing policy.

1) Create excursion page following template (CONTENT_SEO_SYSTEM.md §3):
   - Title (max 60 chars, unique)
   - Meta description (max 155 chars)
   - H1, why visit, included, itinerary, pricing, FAQ, related
   - Word count: ≥1000
2) Add internal links (mandatory):
   - Min 2 to related excursions
   - 1 to /booking
   - 1 to relevant blog post (if exists)
3) Add schema (TouristTrip or Product JSON-LD)
4) Optimize images (hero + gallery, WebP, <200KB, alt text)
5) Pricing disclaimer (if policy = "contact for quote"):
   - Clear messaging, no ambiguous pricing
6) DoD checklist (CONTENT_SEO_SYSTEM.md §7)
7) Manual smoke + validate schema
8) Update IMPROVEMENTS.md: mark item as DONE + PR/SHA
```

---

## Quarterly Maintenance Tasks

### Quarterly SEO Health Check

```text
TASK (SEO-QUARTERLY-HEALTH-CHECK):
Frequency: Every 3 months

1) Broken internal links audit:
   - Scan all pages for 404s
   - Fix or remove broken links
2) Outdated content review:
   - Blog: update stats, dates, screenshots if stale
   - Events: archive past events (>7 days old)
   - Excursions: refresh "Updated [Month Year]" signals
3) Duplicate content check:
   - Run title/meta uniqueness scan
   - Check for cannibalization (multiple pages targeting same keyword)
4) Schema validation:
   - Re-test 10–20 random pages with Google Rich Results Test
   - Fix any schema errors
5) Performance metrics review (if Search Console available):
   - Identify underperforming pages (low CTR, high bounce)
   - Recommend rewrites or archival
6) Report findings in GitHub issue or doc
7) Update IMPROVEMENTS.md: log quarterly check completion
```

---

## Notes for Agents

### When in doubt

- **Refer to CONTENT_SEO_SYSTEM.md** for all rules, templates, DoD
- **Ask CTO** before creating new content (blog/event/excursion)
- **Stick to micro-PR scope**: 1 concern, <200 lines, ≤4 files

### Common pitfalls to avoid

- **Don't batch multiple SEO fixes** in one PR (e.g., meta + schema + internal links = 3 PRs)
- **Don't invent events** or fabricate sources (always verify + cite)
- **Don't change pricing** or business logic without explicit approval
- **Don't skip DoD checklist** — it's mandatory for merge

### Validation tools

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **W3C Markup Validator**: https://validator.w3.org/

---

## Revision History

| Date | Change | Author |
|------|--------|--------|
| 2026-02-13 | Initial prompt template (SEO-SYSTEM-CONTENT-SSOT-01) | CTO + Agent |
