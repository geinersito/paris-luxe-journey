# BOOKING_MODEL - Paris Elite Services Booking System

**SSOT** for data model, state machines, invariants, and guarantees.

**Last updated**: 2026-02-03  
**Version**: 0.1

---

## 1. Entities & Tables

### 1.1 `bookings` (primary entity)

**Purpose**: Store booking reservations (transfers, hourly, tours).

**Schema** (assembled from migrations):

- **migrations**: `supabase/migrations/20250217_booking_system.sql`, `supabase/migrations/20250301_bookings_update.sql`

| Column | Type | Constraint | Purpose |
|--------|------|------------|---------|
| `id` | UUID | PK, default uuid_generate_v4() | Booking identifier |
| `tour_id` | UUID | FK -> tours(id), nullable | Reference to tour (if tour booking) |
| `user_id` | UUID | FK -> auth.users(id) | Owner (authenticated user) |
| `booking_date` | DATE | NOT NULL | Date of service |
| `tour_type` | tour_type | NOT NULL, default 'standard' | Tour tier (legacy, might be unused for transfers) |
| `participants` | INTEGER | NOT NULL | Number of participants (legacy tours) |
| `passengers` | INTEGER | NOT NULL, default 1 | Number of passengers (transfers) |
| `large_suitcases` | INTEGER | NOT NULL, default 0 | Luggage count |
| `carry_on` | INTEGER | NOT NULL, default 0 | Carry-on count |
| `extras` | JSONB | nullable | Additional services/metadata |
| `total_price` | DECIMAL(10,2) | NOT NULL | Final price paid |
| `calculated_price` | DECIMAL | NOT NULL, default 0 | Calculated price (before adjustments) |
| `status` | booking_status | NOT NULL, default 'pending' | Booking state (see state machine) |
| `payment_intent_id` | VARCHAR(255) | nullable | Stripe PaymentIntent ID |
| `special_requests` | TEXT | nullable | Customer notes |
| `booking_type` | TEXT | NOT NULL, default 'transfer' | Type: 'transfer', 'hourly', 'tour' |
| `hours` | INTEGER | nullable | Duration (for hourly bookings) |
| `service_level_id` | TEXT | FK -> service_levels(id), nullable | Service tier |
| `vehicle_category_id` | TEXT | FK -> vehicle_categories(id), nullable | Vehicle type |
| `pickup_details` | JSONB | nullable | Pickup location + metadata |
| `dropoff_details` | JSONB | nullable | Dropoff location + metadata |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() UTC | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, auto-updated | Last modification timestamp |

**Indexes**:
- `idx_bookings_tour_id`
- `idx_bookings_user_id`
- `idx_bookings_status`
- `idx_bookings_date`
- `idx_bookings_service_level`
- `idx_bookings_vehicle_category`
- `idx_bookings_type`

### 1.2 `tours` (secondary entity)

**Purpose**: Tour catalog (pre-defined tours, legacy or still in use).

**Schema**: `supabase/migrations/20250217_booking_system.sql`

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | PK |
| `name` | VARCHAR(255) | Tour name |
| `description` | TEXT | Tour description |
| `destination` | VARCHAR(100) | Destination city/area |
| `base_price` | DECIMAL(10,2) | Starting price |
| `duration_hours` | INTEGER | Tour duration |
| `max_participants` | INTEGER | Capacity |
| `included` | TEXT[] | Inclusions |
| `not_included` | TEXT[] | Exclusions |
| `meeting_point` | TEXT | Pickup info |
| `important_info` | TEXT | Notes |
| `created_at` / `updated_at` | TIMESTAMPTZ | Timestamps |

---

## 2. State Machines

### 2.1 Booking Status (`booking_status` enum)

**SSOT**: `supabase/migrations/20250217_booking_system.sql:2-7`

```sql
CREATE TYPE booking_status AS ENUM (
  'pending',           -- initial state (form submitted, no payment yet)
  'pending_payment',   -- payment intent created, awaiting capture
  'confirmed',         -- payment succeeded, booking finalized
  'cancelled'          -- user/admin cancelled
);
```

**State transitions** (expected flow):

```
pending -> pending_payment -> confirmed
  v              v
cancelled    cancelled
```

**Triggers** (current implementation):

| Transition | Trigger | Location |
|------------|---------|----------|
| pending -> pending_payment | User submits payment form (Stripe PaymentIntent created) | [WARN] TODO: cite frontend/edge function |
| pending_payment -> confirmed | Stripe webhook: `payment_intent.succeeded` | [WARN] TODO: cite webhook handler |
| * -> cancelled | User/admin action | [WARN] TODO: cite cancellation endpoint |

**Note**: Webhook handlers exist (3 coexist — see §3.3). Canonical handler TBD per `RB-00-CANONICAL-STACK-01`.

### 2.2 Payment Status (Stripe-side)

Booking status is **synchronized** with Stripe PaymentIntent status via webhooks:

| Stripe Event | Expected Booking Action |
|--------------|-------------------------|
| `payment_intent.succeeded` | Set `status = 'confirmed'` + send confirmation email |
| `payment_intent.payment_failed` | Keep `status = 'pending_payment'` (allow retry) OR set `cancelled` |
| `payment_intent.canceled` | Set `status = 'cancelled'` |

**Idempotency requirement** (HARD): Each Stripe event must be processed **once only** (see Section 4.3).

---

## 3. Invariants & Guarantees

### 3.1 Timezone SSOT (HARD)

**Rule**: All timestamps stored in **UTC** (`TIMESTAMPTZ`), displayed in **Europe/Paris**.

**Enforcement**:
- [OK] DB: `created_at` / `updated_at` use `TIMEZONE('utc'::text, NOW())`
- [WARN] Frontend: NO enforcement yet (no `timeZone: 'Europe/Paris'` in `toLocaleString()` calls) - HIGH RISK
- [WARN] User input: `booking_date` is stored as DATE (no TZ); must validate against Europe/Paris calendar

**Action required**: Audit all date/time display code for `toLocaleString()` without `timeZone` parameter (see BOOKING_STATUS.md blockers).

### 3.2 Anti-Double-Booking ✅ IMPLEMENTED

**Current guarantee**: ✅ **DB-level constraint (EXCLUDE USING gist + partial unique index)**

**Implementation** (PRs #62, #64, #66):
1. **Partial unique index** on `(vehicle_id, pickup_datetime)` WHERE status IN active states — rejects exact time duplicates (error 23505)
2. **EXCLUDE USING gist** constraint with `tstzrange(pickup_datetime, service_end_datetime)` — rejects overlapping time ranges (error 23P01)
3. **App layer** persists real `service_end_datetime` and handles overlap errors from `FunctionsHttpError`

**Migrations** (official):
- `supabase/migrations/20260226120000_booking_unique_vehicle_pickup_active.sql`
- `supabase/migrations/20260226130000_booking_overlap_exclusion.sql`

**Status**: ✅ DONE — DB-level guarantee active. See `IMPROVEMENTS.md` items `BOOKING-DB-ANTI-DOUBLEBOOK-01a/01b/01b-APP`.

*Reconciled by RB-00-CANONICAL-STACK-01.*

### 3.3 Webhook Idempotency (HARD) — ⚠️ PARTIAL

**Rule**: Stripe webhooks can retry -> each event ID must be processed **once only**.

**Current implementation**: ⚠️ PARTIAL — handlers exist, dedupe table missing.

**Evidence** (3 webhook handlers coexist):
- `supabase/functions/stripe-webhooks/index.ts` — legacy, no idempotency
- `supabase/functions/stripe-webhooks-v312/index.ts` — v312 standalone
- `supabase/functions/stripe-webhooks-v312-integrated/index.ts` — v312 integrated, has idempotency logic but no `processed_stripe_events` table

**Remaining gaps**:
1. No `processed_stripe_events` table exists → events can be double-processed on retry
2. Canonical webhook handler not yet decided (see `RB-00-CANONICAL-STACK-01` in IMPROVEMENTS.md)

**Required** (tracked as `OPS-WEBHOOK-IDEMPOTENCY-TABLE-01`):
- Create `processed_stripe_events` table with `event_id` PK
- On webhook receipt: check if `event.id` exists → if yes, return 200 OK; if no, process + insert

**Reference**: Stripe docs on [webhook idempotency](https://stripe.com/docs/webhooks/best-practices#event-ids).

*Reconciled by RB-00-CANONICAL-STACK-01.*

### 3.4 Secrets Hygiene (HARD)

**Rule**: **NO secrets in `VITE_*` env vars** (exposed to client bundle).

**Current violations** ([RED] CRITICAL):

- `.env.example:7`: `VITE_STRIPE_SECRET_KEY` - [ERROR] MUST be server-side only
- `.env.example:10`: `VITE_RESEND_API_KEY` - [ERROR] MUST be server-side only
- `src/lib/email.ts:19`: uses `import.meta.env.VITE_RESEND_API_KEY` in client code

**Impact**: Full Stripe account compromise + email spoofing/abuse.

**Fix required** (P0):
- Move to Supabase Edge Functions (server-side)
- Remove `VITE_` prefix
- Use `STRIPE_SECRET_KEY` + `RESEND_API_KEY` in Edge Function env only

**Status**: [RED] **BLOCKER for production** (see PRODUCT_SCOPE.md Section 6.1).

### 3.5 Shared Supabase Constraint

**Rule**: This project shares Supabase with ERP system.

**Constraints**:
- [ERROR] **NEVER** touch `dispatch_*` schema (ERP-owned)
- [OK] Only modify `booking_*` tables, `tours`, `service_levels`, `vehicle_categories`, `vehicles`
- All DB changes MUST be DB-only PRs with migration files

---

## 4. RLS Policies (Row-Level Security)

**SSOT**: `supabase/migrations/20250217_booking_system.sql:77-110`, `supabase/migrations/20250301_bookings_update.sql:20-52`

### 4.1 `bookings` table

| Policy | Role | Rule |
|--------|------|------|
| SELECT | `authenticated` | User can view **own** bookings (`auth.uid() = user_id`) |
| INSERT | `authenticated` | User can create bookings for **self** |
| UPDATE | `authenticated` | User can update **own** bookings if `status IN ('pending', 'pending_payment')` |
| ALL | `authenticated` (staff) | Staff can manage all bookings (if email in `app.admin_emails`) |

**Supabase key usage**:
- Client (frontend): **anon key** only (RLS enforced)
- Edge Functions (server): **service_role key** (bypasses RLS) - MUST be server-side only

### 4.2 `tours` table

| Policy | Role | Rule |
|--------|------|------|
| SELECT | `authenticated`, `anon` | Everyone can view tours |
| INSERT | `authenticated` (admin) | Only admins can create tours |

---

## 5. Known Gaps & TODOs

| Area | Status | Action Required | Tracking |
|------|--------|-----------------|----------|
| Canonical stack undefined | ⚠️ HIGH | RB-00 decision matrix (docs-only) | `RB-00-CANONICAL-STACK-01` DOING |
| Secrets in VITE_* | [RED] CRITICAL | Move to Edge Functions (P0 blocker) | `SEC-RESEND01-SECRETS-HYGIENE-01` TODO |
| Webhook idempotency table | ⚠️ HIGH | Create `processed_stripe_events` + dedupe | `OPS-WEBHOOK-IDEMPOTENCY-TABLE-01` TODO |
| Anti-double-booking | ✅ DONE | DB-level EXCLUDE + unique index | PRs #62, #64, #66 |
| Payment retry on conflicts | ⚠️ MEDIUM | Skip retry on 23P01/23505 | `OPS-FN-...` BLOCKED by RB-00 |
| Timezone enforcement (frontend) | ⚠️ MEDIUM | Audit `toLocaleString()` calls | `TZ-PARIS-DISPLAY-SSOT-01` TODO |
| 3 webhook handlers coexist | ⚠️ HIGH | Deprecate legacy after canonical decided | `OPS-STRIPE-LEGACY-DEPRECATE-01` TODO |
| Cancellation flow | ❌ Not defined | Define refund policy + state transitions | No item yet |

---

## 6. Related Docs

- **BOOKING_STATUS.md** - current implementation status (DONE/WIP/BLOCKED)
- **BOOKING_RUNBOOK.md** - manual tests + incident procedures
- **PRODUCT_SCOPE.md** - features in/out of scope
- **SUPERVISOR.md** - governance + PR rules
