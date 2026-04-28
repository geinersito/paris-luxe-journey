# PLJ-DB-001 — Cross-Repo Governance Audit

**Status**: BLOCKED — pending cross-repo sign-off (CTO Master + DBA)  
**Created**: 2026-04-28  
**Blocks**: PLJ-DB-001, PLJ-DB-002, PLJ-DB-003  

---

## Context

The Booking repo (`paris-luxe-journey`) shares the same Supabase project as the ERP (`paris-dispatcher`):
- Project ref: `urjsnguzzzwcnaxwghbo`
- All migrations in both repos run against the same DB

The pending working-tree changes in `supabase/migrations/` are replay-safety patches
(`ADD COLUMN IF NOT EXISTS`, `DO $$ IF EXISTS` guards, explicit FK naming).
Although the changes are defensive and non-destructive, every file touches `dispatch_*`
objects — which belong to the ERP namespace.

SUPERVISOR.md §3.5 rule: *"NEVER touch `dispatch_*` from booking code."*
A migration touching `dispatch_*` has **more impact than application code**, not less.

---

## Migration Inventory

### PLJ-DB-001 scope (6 modified files — replay-safety patches only)

| File | Objects touched | Change type | Risk if applied | Risk if not applied |
|---|---|---|---|---|
| `20260100_base_tables.sql` | `dispatch_user_roles`, `dispatch_clients`, `dispatch_drivers`, `dispatch_services`, `dispatch_vehicles`, `dispatch_trips`, `is_role()` helper fn | Reorder `is_role()` before RLS policies (was after); no schema change | Low — reorder only, no DDL change. Could fail if file already applied in different order | Low — migration was already applied; replay would fail without guard |
| `20260117100000_counterparty_ledger_schema_align_v1.sql` | `dispatch_counterparty_ledger_entries` | Wrap `ALTER TABLE ... ADD COLUMN label` in `DO $$ IF EXISTS` guard | Low — idempotent guard, no new schema | Low — replay fails with duplicate column error |
| `20260117110000_ledger08a_manual_entries_v1.sql` | `dispatch_block_posted_mutations()`, `dispatch_post_manual_ledger_entry()`, `dispatch_reverse_ledger_entry()` | Wrap function creation in guards; add explicit FK naming | Low — defensive, no logic change | Low — replay fails on duplicate function/FK |
| `20260117120000_counterparty_ledger_reversal_linkage_v1.sql` | `dispatch_counterparty_ledger_entries` | Wrap in guard; explicit constraint naming on reversal FK | Low — defensive only | Low — replay fails on duplicate constraint |
| `20260118174747_counterparty_create_rpc_email.sql` | `dispatch_counterparties`, `dispatch_create_counterparty()` RPC | Wrap RPC creation in `DO $$ IF EXISTS` guard | Low — no-op if already exists | Low — replay fails on duplicate function |
| `20260118191000_counterparty_set_email_rpc_v1.sql` | `dispatch_counterparties`, `dispatch_set_counterparty_email()` RPC | Wrap RPC creation in guard | Low — no-op if already exists | Low — replay fails on duplicate function |

### PLJ-DB-002 scope (1 untracked file — new schema)

| File | Objects touched | Change type | Risk if applied | Risk if not applied |
|---|---|---|---|---|
| `20260119050000_counterparty_ledger_entries_foundation_v1.sql` | New tables/triggers (counterparty ledger foundation) | New schema: tables + RLS + trigger + indexes | **R2** — new money-critical schema; needs DBA sign-off | Feature unavailable; no data loss |

### PLJ-DB-003 scope (1 modified file — HOLD / ERP contaminated)

| File | Objects touched | Change type | Verdict |
|---|---|---|---|
| `20260119101728_clientfiche01a_dispatch_clients_profile_fields.sql` | `dispatch_clients` (ADD COLUMN client_type, company_name) | Adds `IF NOT EXISTS` guards to existing columns | **Category B — ERP namespace**. Already committed to HEAD without guard. Working tree adds IF NOT EXISTS (same replay-safety pattern). Does not belong in Booking repo. |

---

## Governance Analysis

### Why these migrations exist in the Booking repo

Historical pattern: this repo has been used as a migration vehicle for the shared Supabase
project, predating strict Booking/ERP governance separation. The migrations were committed
when the `dispatch_*` namespace governance rule was not yet enforced.

### Risk classification

| Risk | Description |
|---|---|
| **Replay conflict** | If paris-dispatcher also applies these migrations, double execution could fail or corrupt schema. Need to verify paris-dispatcher migration history. |
| **Ownership drift** | `dispatch_*` objects have two potential owners (both repos). Changes in one repo could conflict with changes in the other. |
| **Rollback complexity** | Rolling back a migration that touches shared schema requires coordination with paris-dispatcher ops. |

### Rollback strategy

For PLJ-DB-001 (replay-safety patches):
- All changes are wrapped in `IF NOT EXISTS` / `IF EXISTS` guards
- Safe to revert: original SQL (without guards) is still in HEAD; can `git checkout HEAD -- <file>`
- No data loss — guards only prevent replay errors, no data changes

For PLJ-DB-002 (new schema):
- Requires explicit `DROP TABLE` / `DROP FUNCTION` rollback migration
- Must be coordinated with paris-dispatcher team
- Cannot be auto-rolled back

---

## Required Sign-Off Before Proceeding

Before any PLJ-DB-* PR is opened:

- [ ] **Cross-repo check**: verify same migrations do NOT exist in `paris-dispatcher/supabase/migrations/`
- [ ] **DBA sign-off**: confirm dispatch_* objects are safe to modify from Booking repo
- [ ] **CTO Master decision**: clarify ownership model — should dispatch_* migrations live in paris-dispatcher only?
- [ ] **PLJ-DB-002 specifically**: R2 sign-off required (new ledger schema = money-critical)
- [ ] **clientfiche01a**: decide if it moves to paris-dispatcher or stays as PLJ-DB-003

---

## Cross-Repo Verification Commands

Run in `paris-dispatcher` to check for overlap:

```bash
ls supabase/migrations/ | grep -E "20260117|20260118|20260119|counterparty|clientfiche"
```

If any of these files exist in paris-dispatcher → coordination required before applying from Booking repo.

---

## Decision Log

| Date | Decision | By |
|---|---|---|
| 2026-04-28 | PLJ-DB-001/002/003 BLOCKED — cross-repo governance sign-off required | CTO |
