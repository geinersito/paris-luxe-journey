# BOOKING MODEL — Entities, States, Invariants

## Entities/Tables

### bookings_v312 (supabase/migrations/20251214_v312_payment_system.sql)
**Purpose:** Main booking table with V3.1.2 payment system
**Key fields:**
- `id` (UUID, PK)
- `route_key`, `vehicle_type`, `origin`, `destination`
- `customer_name`, `customer_email`, `customer_phone`
- `passengers`, `luggage_count`, `special_instructions`
- `pickup_datetime` (TIMESTAMPTZ)
- `pricing_version`, `prepaid_price_cents`, `flexible_price_cents`, `hold_amount_cents`, `partner_floor_cents`
- `payment_mode` ('prepaid'|'flexible')
- `stripe_payment_intent_id`, `stripe_setup_intent_id`, `stripe_payment_method_id`, `hold_payment_intent_id`
- `stripe_customer_id`
- `status` (see State Machine below)
- `hold_auth_deadline`, `hold_captured_at`, `hold_cancelled_at` (TIMESTAMPTZ)

### stripe_webhook_events (supabase/migrations/20251214_v312_payment_system.sql)
**Purpose:** Idempotency for Stripe webhooks
**Key fields:**
- `event_id` (VARCHAR, UNIQUE) - Stripe event ID
- `event_type` (VARCHAR) - payment_intent.succeeded, etc.
- `processed_at` (TIMESTAMPTZ)

### booking_state_logs (supabase/migrations/20251214_v312_payment_system.sql)
**Purpose:** Audit trail of booking state changes
**Key fields:**
- `booking_id` (FK to bookings_v312)
- `from_state`, `to_state` (VARCHAR)
- `event` (VARCHAR) - what triggered the change
- `changed_by` (VARCHAR) - 'system', 'admin', 'webhook'
- `reason` (TEXT), `metadata` (JSONB)

### notifications (supabase/migrations/20251214_v312_payment_system.sql)
**Purpose:** Email/SMS/WhatsApp delivery tracking
**Key fields:**
- `booking_id` (FK to bookings_v312)
- `type` ('booking_confirmed', 'payment_received', etc.)
- `channel` ('email', 'sms', 'whatsapp')
- `recipient`, `status` ('pending'|'sent'|'failed')

### vehicles (supabase/migrations/20260203_create_vehicles_table.sql)
**Purpose:** Vehicle catalog for booking
**Key fields:**
- `id` (UUID, PK)
- `type` ('berline'|'van'), `name`
- `passenger_capacity`, `luggage_capacity`
- `base_price` (INTEGER cents)
- `features` (TEXT[]), `image_url`, `interior_image_url`

## State Machine (Booking Status)

### Canonical States (V3.1.2)
1. `pending_payment` - Initial state, waiting for payment/setup
2. `confirmed` - Payment confirmed, booking active
3. `partner_assigned` - Driver assigned
4. `hold_pending` - Hold created, waiting for auth
5. `hold_confirmed` - Hold auth successful
6. `in_progress` - Service in progress
7. `completed` - Service completed
8. `cancelled` - Booking cancelled
9. `failed` - Payment/setup failed

### State Transitions
- `pending_payment` → `confirmed` (payment captured)
- `confirmed` → `partner_assigned` (driver assigned)
- `confirmed` → `hold_pending` (flexible payment hold created)
- `hold_pending` → `hold_confirmed` (hold auth successful)
- `hold_confirmed` → `in_progress` (service started)
- `in_progress` → `completed` (service finished)
- Any state → `cancelled` (cancellation)
- Any state → `failed` (payment failure)

## Invariants

### Idempotency Keys (Stripe Webhooks)
**Rule:** Each Stripe `event_id` processed exactly once
**Implementation:** `stripe_webhook_events.event_id` UNIQUE constraint
**Evidence:** supabase/functions/stripe-webhooks-v312-integrated/index.ts:88-89

### Timezone SSOT
**Storage:** All timestamps as `timestamptz` (UTC)
**Display:** Always `Europe/Paris` timezone
**Prohibition:** No `toLocaleString()` without explicit `timeZone` param

### Secrets Hygiene
**Rule:** No secrets in `VITE_*` environment variables
**Allowed in VITE_:** Public keys only (Stripe publishable key)
**Server-only:** `STRIPE_SECRET_KEY`, `RESEND_API_KEY`, Supabase service_role

### Anti-Double-Booking
**Current guarantee:** App-level (no DB constraint)
**Risk level:** HIGH - Documented as potential issue
**Evidence:** No unique constraints on time slots in schema

### Email Validation
**Rule:** `customer_email` must match regex pattern
**Implementation:** CHECK constraint in bookings_v312 table
**Pattern:** `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`

### Payment Amount Validation
**Rules:**
- `prepaid_price_cents > 0`
- `flexible_price_cents >= 0`
- `hold_amount_cents >= 0`
- `partner_floor_cents > 0`

## RLS Policies

### bookings_v312
- Authenticated users can read their own bookings
- Service role can read/write all (for webhooks)

### stripe_webhook_events
- Service role only (webhook processing)

### booking_state_logs
- Audit trail, service role only

### notifications
- Service role for sending, authenticated for user notifications

### vehicles
- Public read access (anon)
- Admin write access (authenticated with admin email)</content>
</xai:function_call name="Write">
<parameter name="file_path">c:\Users\basur\Paris Elite Services Nuevo\docs/BOOKING_STATUS.md