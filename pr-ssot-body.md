# SSOT Post-Merge Annotation (PR #87 + #85)

## Changes

**docs/plan/IMPROVEMENTS.md:**
- CONTENT-EXCURSIONS-PAGES-ENRICH-01: DOING → DONE
- Added PR #85 SHA (7d45077)
- Added hotfix dependency note: "Required TECH-EXCURSIONS-ROUTER-HOTFIX-01 (PR #87 / 6bdad32) to register routes"

**docs/STATUS.md:**
- Updated Main HEAD: a58416c → 6bdad32
- Updated "Ultimos PRs mergeados" with PR #87 and #85
- Removed CONTENT-EXCURSIONS-PAGES-ENRICH-01 from "Ahora en curso" (now DONE)
- Kept OPS-STRIPE-LEGACY-DEPRECATE-01 as DOING (monitoring)

## Commit

- Branch: docs/ssot-post-merge-87
- Commit: 1cf883d
- Diffstat: 2 files, +5/-6

## Context

PR #85 created 3 excursion detail pages but forgot to register routes.
PR #87 (hotfix) registered the 3 routes in App.tsx to fix 404s.
This PR annotates SSOT to reflect the dependency between the two PRs.
