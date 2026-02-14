# TECH-EXCURSIONS-ROUTER-HOTFIX-01

## Pre-flight

```
repo: C:/Users/paris/Desktop/WORKSPACE_VTC/paris-luxe-journey
remote: https://github.com/geinersito/paris-luxe-journey.git
branch: tech/excursions-router-hotfix-01
commit: ea5f597
main HEAD: 7d45077
```

## Problem

PR #85 (CONTENT-EXCURSIONS-PAGES-ENRICH-01) created 3 new excursion detail pages with full i18n support, but **forgot to register the routes in React Router**.

**Impact**: All 3 pages return 404:
- `/excursions/loire-valley` → 404
- `/excursions/champagne` → 404
- `/excursions/giverny-honfleur` → 404

## Solution

Register 3 lazy-loaded routes in `src/App.tsx`:
- Added 3 lazy imports (LoireValleyPage, ChampagnePage, GivernyHonfleurPage)
- Added 3 route entries in router children with Suspense + PageLoader

## Diffstat

```
src/App.tsx | 29 insertions(+)
1 file changed, 29 insertions(+)
```

## Gates

✅ **npm run type-check** — PASSED  
✅ **npm run build** — PASSED (92 precache entries, 2.1MB dist)

**Build artifacts confirm routes are now included:**
- `dist/assets/loire-valley-SSWzYPYR.js` (4.14 kB)
- `dist/assets/champagne-CC16nSyt.js` (4.29 kB)
- `dist/assets/giverny-honfleur-jFPulovG.js` (4.26 kB)

## Smoke Test (Manual - Required Before Merge)

Dev server running on `http://127.0.0.1:8082`

### Routes to verify (12 total):

**EN:**
- ✅ /excursions/loire-valley
- ✅ /excursions/champagne
- ✅ /excursions/giverny-honfleur

**FR:**
- ✅ /fr/excursions/loire-valley
- ✅ /fr/excursions/champagne
- ✅ /fr/excursions/giverny-honfleur

**ES:**
- ✅ /es/excursions/loire-valley
- ✅ /es/excursions/champagne
- ✅ /es/excursions/giverny-honfleur

**PT:**
- ✅ /pt/excursions/loire-valley
- ✅ /pt/excursions/champagne
- ✅ /pt/excursions/giverny-honfleur

**Acceptance criteria:**
- ✅ Pages render (no 404)
- ✅ No console errors
- ✅ No missing translation warnings
- ✅ CTA + FAQ blocks visible

## SSOT Impact

- Unblocks PR #85 (CONTENT-EXCURSIONS-PAGES-ENRICH-01)
- OPS-STRIPE-LEGACY-DEPRECATE-01 remains DOING (monitoring) — not touched
- After merge: SSOT post-merge PR will annotate CONTENT-EXCURSIONS-PAGES-ENRICH-01 with hotfix dependency

## Risk

**P0/R1** — User-facing 404 fix, minimal scope (router registration only)
