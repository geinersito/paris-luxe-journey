# BOOKING_STATUS - Paris Elite Services Booking System

**Current implementation status**: What's DONE, IN PROGRESS, BLOCKED, and NEXT.

**Last updated**: 2026-02-03  
**Version**: 0.1

---

## 1. DONE [OK]

### 1.1 Database Foundation

- [OK] **Bookings table schema** (`supabase/migrations/20250217_booking_system.sql`, `20250301_bookings_update.sql`)
  - Supports transfers, hourly, and tours
  - `booking_status` enum: pending -> pending_payment -> confirmed / cancelled
  - RLS policies: users own bookings, staff manage all
  - Indexes on user_id, status, date, tour_id
  
- [OK] **Tours table schema** (legacy or active)
  - Pre-defined tour catalog with pricing, duration, capacity
  - RLS: public read, admin write

- [OK] **Timezone-safe timestamps** (DB-level)
  - All `created_at` / `updated_at` use `TIMESTAMPTZ` with UTC storage
  - Trigger `update_updated_at_column()` maintains consistency

### 1.2 CI/CD Infrastructure

- [OK] **GitHub Actions CI** (PR #13 merged)
  - Workflow: `npx tsc --noEmit` + `npm run build` + `npm run lint:changed`
  - Changed-files-only lint gate (avoids blocking on 95 legacy lint errors)
  - Node 20 LTS, `npm ci`, fetch-depth: 0 for diffstat

### 1.3 Governance Docs (SSOT)

- [OK] **SUPERVISOR.md v0.2** (PR #16 merged)
  - Micro-PR rules: <=4 files, <200 lines, single concern
  - Hard-lane rules: secrets, timezone, idempotency, anti-double-booking
  - Fast-lane policy: trivial non-runtime changes (+1 file, <=10 lines)
  - Foundation exception: architectural constraints (strict TS + pre-commit)
  
- [OK] **PRODUCT_SCOPE.md** (PR #17 CI pending)
  - In-scope: booking funnel, content pages, 4 languages (EN/ES/FR/PT)
  - Out-of-scope: admin UI, driver dispatch, cancellations backend
  - Routes SSOT (20+ routes documented)
  - **HIGH RISK**: Security violations documented (secrets in VITE_*)

- [WIP] **BOOKING_MODEL.md** (PR-DOCS02, this PR)
  - Data model, state machines, invariants, RLS policies
  
- [WIP] **BOOKING_STATUS.md** (PR-DOCS02, this document)

- [WIP] **BOOKING_RUNBOOK.md** (PR-DOCS02, this PR)

### 1.4 i18n Foundation

- [WIP] **FND-I18N01** (PR #15 CI pending)
  - Added 10 hero keys to `src/types/i18n.ts` (Translation interface)
  - Translations in EN/ES/FR/PT (`src/i18n/*.ts`)
  - Enables UI-HOME02A/B (Hero widget i18n) PRs

---

## 2. IN PROGRESS [WIP]

### 2.1 SSOT Documentation (PR-DOCS02, this PR)

**Branch**: `docs/booking-ssot-02`

**Files**:
- `docs/BOOKING_MODEL.md` (created)
- `docs/BOOKING_STATUS.md` (this document)
- `docs/BOOKING_RUNBOOK.md` (next)

**Status**: Awaiting completion + CI validation.

### 2.2 Hero Widget i18n (UI-HOME02)

**Dependencies**: PR #15 (FND-I18N01) must merge first.

**Planned PRs**:
- **UI-HOME02A**: `src/components/booking/CompactBookingForm.tsx` uses `t('hero.*')` keys (1 file, UI-only)
- **UI-HOME02B**: `src/components/sections/HeroSection.tsx` uses `t('hero.*')` keys (1 file, UI-only)

**Manual test required**: Verify ES/EN/FR/PT display with no hardcoded English strings.

---

## 3. BLOCKED [RED]

### 3.1 Production Deployment (P0 BLOCKER)

**Blocker**: Critical security violations (secrets exposed to client bundle).

**Evidence** (from PRODUCT_SCOPE.md Section 6.1):

- `.env.example:7`: `VITE_STRIPE_SECRET_KEY` (exposes Stripe secret key)
- `.env.example:10`: `VITE_RESEND_API_KEY` (exposes Resend API key)
- `src/lib/email.ts:19`: uses `import.meta.env.VITE_RESEND_API_KEY` in client code

**Impact**:
- Full Stripe account compromise (refunds, payouts, customer data access)
- Email spoofing/abuse (send emails from your domain)

**Fix required** (micro-PR, P0):
1. Create Supabase Edge Function for email sending
2. Move `RESEND_API_KEY` to Edge Function env (no `VITE_` prefix)
3. Remove `src/lib/email.ts` or convert to proxy calling Edge Function
4. Same for Stripe: payment intent creation must be server-side (Edge Function)
5. Update `.env.example` to remove `VITE_STRIPE_SECRET_KEY` and `VITE_RESEND_API_KEY`

**Next PR**: `SEC-RESEND01` (security-only, <=4 files) - move Resend to Edge Function.

### 3.2 Booking Guarantees — Anti-Double-Booking ✅ RESOLVED

**Status**: ✅ DONE — DB-level guarantee implemented.

**Evidence** (IMPROVEMENTS.md items DONE):
- **PR #62** (`BOOKING-DB-ANTI-DOUBLEBOOK-01a`): Partial unique index on `(vehicle_id, pickup_datetime)` for active bookings — rejects exact duplicates (23505)
- **PR #64** (`BOOKING-DB-ANTI-DOUBLEBOOK-01b`): `EXCLUDE USING gist` constraint with `tstzrange(pickup_datetime, service_end_datetime)` — rejects overlapping time ranges (23P01)
- **PR #66** (`BOOKING-DB-ANTI-DOUBLEBOOK-01b-APP`): App persists real `service_end_datetime` + handles overlap errors from `FunctionsHttpError`

**Migrations** (official, in `supabase/migrations/`):
- `20260226120000_booking_unique_vehicle_pickup_active.sql`
- `20260226130000_booking_overlap_exclusion.sql`

*Docs reconciled by RB-00-CANONICAL-STACK-01.*

### 3.3 Stripe Webhooks — ⚠️ PARTIAL (handlers exist, idempotency incomplete)

**Status**: ⚠️ PARTIAL — Webhook handlers exist but canonical stack not yet decided.

**Evidence** (3 handlers coexist):
- `supabase/functions/stripe-webhooks/index.ts` — legacy, no idempotency
- `supabase/functions/stripe-webhooks-v312/index.ts` — v312 standalone
- `supabase/functions/stripe-webhooks-v312-integrated/index.ts` — v312 integrated, has idempotency logic

**Remaining gaps**:
1. No `processed_stripe_events` table for event deduplication (tracked: `OPS-WEBHOOK-IDEMPOTENCY-TABLE-01`)
2. Canonical webhook not yet decided (tracked: `RB-00-CANONICAL-STACK-01`)
3. Legacy handler not yet deprecated (tracked: `OPS-STRIPE-LEGACY-DEPRECATE-01`)

**Next**: RB-00 decides canonical stack → then add idempotency table → then deprecate legacy.

*Docs reconciled by RB-00-CANONICAL-STACK-01.*

---

## 4. NEXT (Top 5 Micro-PRs, priority order)

### 4.1 **SEC-RESEND01** - Move Resend to Edge Function (P0)

**Type**: Security + functions-only  
**Files**: <=4 (Edge Function + client proxy + .env.example + email.ts removal)  
**Blocks**: Production deploy  
**Risk**: CRITICAL

### 4.2 **DB-AVAILABILITY01** - Anti-double-booking DB guarantee (P0)

**Type**: DB-only (migration + RLS)  
**Files**: <=2 (migration + optional RLS policy)  
**Blocks**: Production deploy  
**Risk**: HIGH (customer service failure)

### 4.3 **FN-WEBHOOK01** - Stripe webhook with idempotency (P0)

**Type**: Functions-only + DB-only (Edge Function + `processed_stripe_events` table)  
**Files**: <=4 (Edge Function + migration + types)  
**Blocks**: Live payments  
**Risk**: HIGH (booking confirmations never sent)

### 4.4 **UI-HOME02A** - CompactBookingForm i18n (P1)

**Type**: UI-only  
**Files**: 1 (`src/components/booking/CompactBookingForm.tsx`)  
**Depends on**: PR #15 (FND-I18N01) merged  
**Manual test**: Verify ES/EN/FR/PT display

### 4.5 **UI-HOME02B** - HeroSection i18n (P1)

**Type**: UI-only  
**Files**: 1 (`src/components/sections/HeroSection.tsx`)  
**Depends on**: PR #15 merged  
**Manual test**: Verify ES/EN/FR/PT pills/links

---

## 5. Known Risks (Not Yet Mitigated)

| Risk | Severity | Mitigation | Status |
|------|----------|------------|--------|
| Secrets in VITE_* | [RED] CRITICAL | Move to Edge Functions | TODO (`SEC-RESEND01-SECRETS-HYGIENE-01`) |
| Canonical stack undefined | [RED] HIGH | RB-00 decision matrix | DOING (`RB-00-CANONICAL-STACK-01`) |
| Double-booking possible | ~~[RED]~~ ✅ | DB-level EXCLUDE + unique index | DONE (PRs #62, #64, #66) |
| Webhook idempotency incomplete | [YELLOW] HIGH | `processed_stripe_events` table + dedupe | TODO (`OPS-WEBHOOK-IDEMPOTENCY-TABLE-01`) |
| 3 webhook handlers coexist | [YELLOW] HIGH | Deprecate legacy after RB-00 | TODO (`OPS-STRIPE-LEGACY-DEPRECATE-01`) |
| Payment retry on conflicts | [YELLOW] MEDIUM | Skip retry on 23P01/23505 | BLOCKED by RB-00 (`OPS-FN-...`) |
| Timezone not enforced (frontend) | [YELLOW] MEDIUM | Audit `toLocaleString()` calls | TODO (`TZ-PARIS-DISPLAY-SSOT-01`) |
| RGPD: Gestion-PES repo PUBLIC | [RED] CRITICAL | Set repo to PRIVATE | TODO (out-of-repo) |
| 95 legacy lint errors | [GREEN] LOW | Changed-files-only gate | [OK] MITIGATED (PR #13) |

---

## 6. Dependencies & Sequencing

**Correct micro-PR order** (respecting dependencies):

1. **PR-DOCS02** (this PR) - Complete SSOT docs (no blockers)
2. **PR #15** (FND-I18N01) - i18n foundation (no blockers, awaiting CI)
3. **PR #16** (SUPERVISOR v0.2) - Governance update (no blockers, CI green, ready to merge)
4. **PR #17** (PRODUCT_SCOPE) - Scope documentation (no blockers, awaiting CI)
5. **SEC-RESEND01** - Move Resend to Edge Function (P0, blocks production)
6. **DB-AVAILABILITY01** - Anti-double-booking (P0, blocks production)
7. **FN-WEBHOOK01** - Stripe webhooks (P0, blocks live payments)
8. **UI-HOME02A/B** - Hero i18n (depends on #15 merged)

---

## 7. Related Docs

- **BOOKING_MODEL.md** - data model + invariants
- **BOOKING_RUNBOOK.md** - manual tests + incident procedures
- **PRODUCT_SCOPE.md** - features in/out of scope + security violations
- **SUPERVISOR.md** - governance + PR rules
