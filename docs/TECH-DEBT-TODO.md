# Technical Debt Tracker

## ⚠️ TEMPORARY HOOK POLICY

**Status:** 🟡 ACTIVE (Temporary)
**Effective Date:** 2025-12-16
**Retirement Criteria:** When TypeScript errors = 0
**Owner:** Tech Lead

### Policy

Pre-commit and pre-push hooks have been **temporarily disabled** to unblock development while we fix accumulated TypeScript errors.

**What's disabled:**
- `npm run type-check` in pre-commit
- `npm run build` in pre-push
- Full project type validation

**What's still active:**
- ESLint on staged files
- Prettier formatting
- lint-staged workflow

### Retirement Plan

This policy will be **removed** when:
1. All TypeScript errors are fixed (currently 141 errors)
2. `npm run type-check` passes cleanly
3. `npm run build` succeeds without errors

**Target Date:** 2025-12-20 (4 days)

### Tracking

- **Current TS Errors:** 141
- **Baseline (2025-12-16):** 155
- **Progress:** -14 errors (9% reduction)

See PR (X2) "Fix TypeScript Debt" for remediation plan.

---

## 🔴 CRITICAL: Fix TypeScript Debt (141 errors remaining)

**Status:** 🟡 IN PROGRESS
**Priority:** P0 (Must fix by 2025-12-20)
**Created:** 2025-12-16
**Updated:** 2025-12-16
**Assignee:** TBD

### Problem

The `main` branch has **141 TypeScript errors** across 39 files. Pre-commit hooks are temporarily disabled (see "Temporary Hook Policy" above).

**Progress:**
- ✅ Phase 1 complete: 155 → 141 errors (9% reduction)
- 🔄 Phase 2 in progress: Fix remaining 141 errors

### Root Causes

1. **Missing Dependencies:**
   - `vitest` not installed (affects all test files)
   - `stripe` package not installed (affects payment integrations)

2. **Type Definition Issues:**
   - `BlogAuthor` and `BlogPost` not exported from `@/types/blog`
   - `BookingStatus` not properly exported from `BookingStateMachine`
   - `LocalizedString` type not defined in `@/types/events`

3. **i18n Type Mismatches:**
   - Missing properties: `couponError`, `couponRemoved`, `confirmationNumber`, `events`, `subtitle`
   - Affects: `en.ts`, `es.ts`, `fr.ts`, `pt.ts`

4. **React Query API Changes:**
   - `cacheTime` deprecated → should be `gcTime`
   - Affects: `src/hooks/useVehicles.tsx`

5. **Supabase RPC Type Issues:**
   - `log_booking_state_transition` and `get_booking_state_history` not recognized
   - Affects: `src/services/logging/bookingStateLogger.ts`

### Sample Errors

```typescript
// 1. Missing vitest (affects ~20 test files)
src/test/setup.ts:6:39 - error TS2307: Cannot find module 'vitest'

// 2. Missing stripe (affects payment services)
src/services/stripe/holdPaymentIntent.ts:7:20 - error TS2307: Cannot find module 'stripe'

// 3. i18n type mismatches (affects 4 language files)
src/i18n/en.ts:11:5 - error TS2353: Property 'events' does not exist on type 'nav'

// 4. Blog types not exported
src/data/blog/authors.ts:1:10 - error TS2305: Module '"@/types/blog"' has no exported member 'BlogAuthor'

// 5. BookingStatus export issue
src/services/booking/BookingOrchestrator.ts:15:8 - error TS2459: Module declares 'BookingStatus' locally, but it is not exported

// 6. React Query deprecated API
src/hooks/useVehicles.tsx:84:5 - error TS2769: 'cacheTime' does not exist (use 'gcTime')

// 7. Supabase RPC not recognized
src/services/logging/bookingStateLogger.ts:55:48 - error TS2345: Argument of type '"log_booking_state_transition"' is not assignable

// 8. LocalizedString not defined
src/types/events.ts:18:10 - error TS2304: Cannot find name 'LocalizedString'
```

### Impact

- ✅ **Does NOT affect runtime** (app works in dev/prod)
- ❌ **Blocks normal git workflow** (requires `--no-verify`)
- ❌ **Prevents CI/CD** (if type-check is in pipeline)
- ❌ **Blocks PRs c-e** (cannot continue REV B implementation safely)

### Action Plan

#### Phase 1: Install Missing Dependencies (5 min)

```bash
npm install --save-dev vitest @vitest/ui
npm install stripe
```

#### Phase 2: Fix Type Exports (10 min)

1. **Blog types** (`src/types/blog.ts`):
   ```typescript
   export interface BlogAuthor { ... }
   export interface BlogPost { ... }
   ```

2. **BookingStatus** (`src/services/state-machine/BookingStateMachine.ts`):
   ```typescript
   export type { BookingStatus } from '@/types/payment-v312';
   ```

3. **LocalizedString** (`src/types/events.ts`):
   ```typescript
   import type { LocalizedString } from '@/types/i18n';
   ```

#### Phase 3: Fix i18n Types (15 min)

Update `src/types/i18n.ts` to include missing properties:
```typescript
nav: {
  // ... existing
  events: string;
}
booking: {
  // ... existing
  couponError: string;
  couponRemoved: string;
  couponRemovedDesc: string;
  success: {
    // ... existing
    confirmationNumber: string;
  }
}
faq: {
  // ... existing
  subtitle: string;
}
```

#### Phase 4: Fix React Query (2 min)

```typescript
// src/hooks/useVehicles.tsx
- cacheTime: 30 * 60 * 1000,
+ gcTime: 30 * 60 * 1000,
```

#### Phase 5: Fix Supabase RPC Types (10 min)

Option A: Add to `database.types.ts`
Option B: Use type assertion (temporary)

### Estimated Time

**Total:** ~45 minutes

### Acceptance Criteria

- [ ] `npm run type-check` passes with 0 errors
- [ ] `git commit` (without `--no-verify`) succeeds
- [ ] All test files can import `vitest`
- [ ] All payment services can import `stripe`
- [ ] No type errors in i18n files
- [ ] CI/CD pipeline passes (if applicable)

### Related PRs

- **PR (b):** `db/payment-cost-ledger-migration` (used `--no-verify` due to this issue)
- **Blocked:** PR (c-e) should NOT proceed until this is fixed

### Notes

- This is **pre-existing tech debt**, not introduced by REV B work
- Migration PR (b) is safe because it only contains SQL (no TypeScript)
- **MUST** be fixed before continuing with PRs c-e

---

## 📋 PR (X2) "Fix TypeScript Debt" - Remediation Plan

**Target:** Fix 141 remaining TypeScript errors
**Strategy:** Break into small, focused PRs by error category

### Bucket 1: Blog Posts (15 errors) - PR (X2.1)

**Files affected:**
- `src/data/blog/posts.ts`
- `src/pages/blog/BlogCategory.tsx`
- `src/lib/seo/json-ld.ts`

**Changes needed:**
- Convert string literals to `LocalizedString` objects
- Fix blog categories to match `BlogCategory` enum
- Fix SEO metadata types

**Estimated effort:** 1-2 hours

### Bucket 2: Booking State Machine (17 errors) - PR (X2.2)

**Files affected:**
- `src/services/state-machine/BookingStateMachine.ts`
- `src/services/state-machine/__tests__/BookingStateMachine.test.ts`
- `src/services/booking/__tests__/BookingOrchestrator.test.ts`

**Changes needed:**
- Add missing states to `BookingStatus` enum: `pending_payment`, `partner_assigned`, `hold_pending`, `hold_confirmed`
- Update state machine transitions
- Fix test assertions

**Estimated effort:** 2-3 hours

### Bucket 3: Supabase Types (20+ errors) - PR (X2.3)

**Files affected:**
- `src/services/logging/bookingStateLogger.ts`
- `src/jobs/CreateHoldJob.ts`
- `src/jobs/SCATimeoutJob.ts`
- `src/services/booking/flexiblePaymentFlow.ts`
- `src/api/webhooks/handlers/*.ts`

**Changes needed:**
- Regenerate Supabase types: `npx supabase gen types typescript`
- Add RPC function signatures
- Fix database column types

**Estimated effort:** 2-3 hours

### Bucket 4: Test Files (24 errors) - PR (X2.4)

**Files affected:**
- `src/test/pricing/beauvaisBuffer.test.ts`
- `src/test/pricing/marginValidation.test.ts`
- `src/test/pricing/routes.test.ts`
- `src/test/webhooks/stripe.test.ts`

**Changes needed:**
- Create missing modules: `@/config/pricing/routesV312`, `@/config/pricing/partnerCostsV312`
- Fix test imports
- Update test assertions

**Estimated effort:** 2-3 hours

### Bucket 5: Stripe API (2 errors) - PR (X2.5)

**Files affected:**
- `src/services/stripe/holdPaymentIntent.ts`
- `src/services/stripe/setupIntent.ts`

**Changes needed:**
- Update `apiVersion: '2024-11-20.acacia'` → `'2025-11-17.clover'`

**Estimated effort:** 15 minutes

### Bucket 6: Miscellaneous (10+ errors) - PR (X2.6)

**Files affected:**
- `src/pages/api/webhooks/stripe.ts` (wrong framework import)
- `src/hooks/booking/useVehicleAssignment.ts` (vehicle type errors)
- `src/i18n/*.ts` (missing `route` property)

**Changes needed:**
- Fix framework imports
- Add missing i18n properties
- Fix vehicle assignment logic

**Estimated effort:** 1-2 hours

### Total Estimated Effort

- **Total:** 8-14 hours
- **Timeline:** 2-3 days (if done sequentially)
- **Parallelizable:** Buckets 1, 5, 6 can be done in parallel

### Success Criteria for X2

- [ ] All 141 TypeScript errors fixed
- [ ] `npm run type-check` passes with 0 errors
- [ ] `npm run build` succeeds
- [ ] Pre-commit hooks re-enabled (remove temporary policy)
- [ ] "Temporary Hook Policy" retired from TECH-DEBT-TODO.md

---

**Last Updated:** 2025-12-16
**Tracking Issue:** #TBD (create GitHub issue)

