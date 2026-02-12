# Cross-Repo Governance — Booking (Paris Luxe Journey) + ERP (Paris Dispatcher)

## Purpose
Define who decides what, how we coordinate changes across repos, and how we avoid conflicts when multiple CTOs/agents work in parallel.

This document is **operational SSOT** for cross-repo work.

---

## 1) Roles & Decision Rights

### CTO Master (single source of coordination)
Owns:
- Cross-repo priorities and sequencing
- Integration contracts (versioning, idempotency format, secrets)
- Shared Supabase changes (project settings, auth policies, shared secrets)

Arbitrates:
- Conflicts between ERP vs Booking decisions
- "Which PR wins" when two implementations exist for the same goal

### CTO ERP (Repo Owner: paris-dispatcher)
Owns:
- ERP architecture, DB schema for dispatch domain
- ERP edge functions (including ingest endpoints)
- RLS, ledger/accounting rules, compliance exports (FEC/Sage)

Default **contract owner** for Booking→ERP ingestion.

### CTO Booking (Repo Owner: paris-luxe-journey)
Owns:
- Booking UX, pricing logic, SEO/blog/events
- Stripe checkout UX pages
- Booking DB tables (bookings/payments) and Stripe webhook handlers

Rule:
- If a change impacts both repos, CTO Master decides sequencing and final shape.

---

## 2) Which CTO to use (routing rule)

Use **CTO ERP** when you are:
- modifying ERP UI, DB, ledger, invoices/quotes, planning/dispatch, exports
- modifying ERP ingest endpoint (`ingest-booking-confirmed-v1`)
- changing ERP RLS or finance logic

Use **CTO Booking** when you are:
- modifying booking frontend UI/UX, pricing logic, SEO/blog/events
- Stripe checkout UX pages
- booking webhooks and booking-side integration caller

Use **CTO Master** when you are:
- changing the Booking→ERP contract (payload, idempotency format, event versioning, secrets)
- touching shared Supabase project settings/policies that impact both apps
- deciding merge order across repos or handling conflicts between agents/CTOs

---

## 3) Branch Safety Policy (critical)

### Shared branches are forbidden
Never work on a branch name already used by someone else.

If `fn/emit-booking-confirmed-v1` exists, create a new branch:
- `fn/emit-booking-confirmed-v1-rgpd`
- `fn/emit-booking-confirmed-v1-minimal`
- `fn/emit-booking-confirmed-v1-v2`

### Force-push policy
Force-push is allowed ONLY when:
- it is a private, single-owner branch AND
- no PR is open OR the PR owner explicitly approves

Default: **NO force-push**.

---

## 4) Integration Contract Policy (Booking → ERP)

### Contract owner
ERP repo owns the SSOT contract docs. Booking repo mirrors as "caller doc".

### SSOT
Stripe webhook (server-side) is SSOT for payment confirmation.
Success page is UX-only (polling allowed), must not be source of truth.

### Privacy
No PII in integration logs or payload unless explicitly required and approved by CTO Master.

### Idempotency
Idempotency key format is defined once in SSOT and must match on both sides.

---

## 5) Supabase Shared Project Policy (until SaaS multi-org)

We currently use one Supabase project for speed/ROI. To keep it safe:
- Separate domains by schema/prefix (booking_* vs dispatch_*)
- No service_role keys in frontend
- Secrets managed per function/environment
- RLS always enforced (invoker-safe)
- Cross-domain changes require CTO Master approval

---

## 6) Pre-flight Checklist (before running an agent)

1) Confirm repo folder (ERP vs Booking) + `git status -sb`
2) Confirm branch: `git rev-parse --abbrev-ref HEAD`
3) Confirm last commit: `git log -1 --oneline`
4) Confirm goal in SSOT: read relevant section in `docs/BOOKING_STATUS.md` or `docs/STATUS.md` (ERP)
5) For webhooks/integrations: confirm secrets & idempotency format

---

## 7) Merge & Release Rules

- One PR = one scope (no mixing webhook + UI)
- Webhook/integration PRs require:
  - timeout + never-throw behavior
  - logs without PII
  - rollback flag (e.g., `ERP_INGEST_ENABLED`)
  - manual smoke test Stripe → ERP events

---

## 8) Workspace Layout (SSOT — updated 2026-02-10)

```
C:\Users\paris\Desktop\WORKSPACE_VTC\
├── paris-dispatcher/          ← SSOT ERP (React+TS+Supabase)
├── paris-luxe-journey/        ← SSOT Booking (React+TS+Supabase+Stripe)
├── _lab/                      ← Projects under evaluation
│   └── boers-vtc-docs/        → VTC document templates (voucher/billet) — testing
└── _archive/                  ← Archived projects (21 folders, no active use)
```

### _lab audit policy
- Each project gets: inspect → test → verdict (KEEP / RECYCLE / ARCHIVE)
- Every archived project must have an `ARCHIVE_NOTE.md` (date, verdict, reason, value extracted)
- No `_lab` project may be imported/depended-on from SSOT repos without CTO Master approval

### _lab audit results (2026-02-10)
| Project | Verdict | Reason |
|---|---|---|
| VTC360-pricing-python | ARCHIVE | SSOT pricing superior (BDD, cents, TVA, commissions) |
| vtc-reservas-django | ARCHIVE | Empty Django scaffold, zero custom code |
| Gestion-PES-datos | ARCHIVE | Manual markdown/CSV, replaced by Supabase. **RGPD: repo PUBLIC with real PII — set to PRIVATE** |
| vtc-docu-genius | ARCHIVE | Lovable prototype, trivial PDF generator, covered by SSOT |
| boers-vtc-docs | TESTING | Document templates (voucher, billet) potentially valuable |

## 9) Conflict Resolution Protocol (when 2 PRs exist for same feature)

If two branches/PRs exist for the same goal (e.g., `fn/emit-booking-confirmed-v1` vs `fn/emit-booking-confirmed-v1-rgpd`):

1) Both PRs stay open (no force-push)
2) CTO Master picks one or merges aspects from both
3) Rejected PR gets documented reason in a comment
4) Contributor of rejected PR can challenge once (with evidence)
