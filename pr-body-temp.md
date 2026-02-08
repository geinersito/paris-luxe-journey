## DOCS-PLAN-RECON-01 — docs-only SSOT reconciliation

### Summary
- Migrates 17 legacy items from PLAN_VIVO into SSOT `docs/plan/IMPROVEMENTS.md` with canonical IDs.
- Reconciles DONE vs TODO and backfills evidence for already-shipped work.

### Backfilled DONE evidence
- NAV-AIRPORTS-01 — commit 7c9bc64
- UX-EXCURSIONS-QUOTEFIRST-01 — commit 7168baa
- UX-EXCURSIONS-CURATION-01 — commit 7168baa
- UX-HEADER-I18N-01 — PR #41 (e40d506)

### Files changed
- docs/plan/IMPROVEMENTS.md
- docs/PLAN_VIVO_MEJORAS_UI.md
- docs/STATUS.md

### Post-merge
- SSOT is now complete; new work must reference canonical IDs only.
