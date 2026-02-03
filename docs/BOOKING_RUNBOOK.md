# BOOKING RUNBOOK — Manual Tests + Incident Checklist

## Manual Test Scripts

### 1) Happy Path Booking + Payment + Confirmation Email

**Preconditions:**
- App running on http://localhost:8080
- Stripe test mode enabled
- Valid test card: 4242 4242 4242 4242

**Steps:**
1. Navigate to `/` (home page)
2. Click "Book Now" or use compact booking form
3. Fill booking form:
   - Origin: "CDG Airport"
   - Destination: "Paris Center"
   - Date/Time: Tomorrow 10:00 AM
   - Passengers: 2
   - Luggage: 1
   - Vehicle: Sedan
4. Click "Continue to Details"
5. Verify details page shows correct information
6. Click "Continue to Payment"
7. Fill payment form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "+33123456789"
   - Card: 4242 4242 4242 4242 / 12/34 / 123 / 12345
8. Click "Confirm Booking"
9. Verify redirect to confirmation page
10. Check email inbox for confirmation email

**Expected Results:**
- ✅ Booking created in `bookings_v312` table
- ✅ `status = 'confirmed'`
- ✅ Stripe payment intent created and succeeded
- ✅ Confirmation email sent via Resend
- ✅ No console errors

**Database Checks:**
```sql
SELECT id, status, customer_email, stripe_payment_intent_id
FROM bookings_v312
WHERE customer_email = 'test@example.com'
ORDER BY created_at DESC LIMIT 1;
```

### 2) Payment Failed Scenario

**Preconditions:**
- Same as happy path

**Steps:**
1-7. Same as happy path
8. Use failing test card: 4000 0000 0000 0002
9. Click "Confirm Booking"

**Expected Results:**
- ❌ Payment fails with clear error message
- ✅ Booking status remains 'pending_payment'
- ✅ No confirmation email sent
- ✅ User can retry payment

**Database Checks:**
```sql
SELECT status, stripe_payment_intent_id
FROM bookings_v312
WHERE customer_email = 'test@example.com'
ORDER BY created_at DESC LIMIT 1;
-- Status should be 'failed' or 'pending_payment'
```

### 3) Webhook Retry Idempotency Test

**Preconditions:**
- Stripe CLI installed: `stripe listen --forward-to localhost:54321/functions/v1/stripe-webhooks-v312-integrated`
- Webhook endpoint configured

**Steps:**
1. Complete a successful booking (test 1)
2. Manually trigger webhook retry in Stripe Dashboard
3. Or use Stripe CLI to resend event

**Expected Results:**
- ✅ Webhook processes successfully (200 response)
- ✅ No duplicate booking or double-charging
- ✅ `stripe_webhook_events` shows event processed once

**Database Checks:**
```sql
SELECT event_id, processed_at
FROM stripe_webhook_events
WHERE event_type = 'payment_intent.succeeded'
ORDER BY processed_at DESC;
-- Should show only ONE entry per event_id
```

### 4) Double-Booking Attempt (Current Behavior)

**Preconditions:**
- Two browser tabs/windows

**Steps:**
1. In Tab 1: Start booking process, reach payment step
2. In Tab 2: Start identical booking (same time, route, vehicle)
3. Complete payment in Tab 1
4. Complete payment in Tab 2

**Expected Results (Current - HIGH RISK):**
- ⚠️ Both bookings may succeed (app-level check only)
- ⚠️ Manual intervention required to cancel duplicate

**Database Checks:**
```sql
SELECT id, pickup_datetime, vehicle_type, status
FROM bookings_v312
WHERE pickup_datetime::date = CURRENT_DATE + INTERVAL '1 day'
  AND vehicle_type = 'sedan'
ORDER BY created_at DESC;
-- Check for overlapping bookings
```

### 5) Timezone Sanity Check

**Preconditions:**
- System timezone ≠ Europe/Paris

**Steps:**
1. Create booking for pickup at 14:00 tomorrow
2. Check database storage
3. Check display in UI
4. Check confirmation email

**Expected Results:**
- ✅ Database: UTC timestamp
- ✅ UI Display: Europe/Paris time (14:00)
- ✅ Email: Europe/Paris time

**Database Checks:**
```sql
SELECT pickup_datetime AT TIME ZONE 'Europe/Paris' as paris_time
FROM bookings_v312
ORDER BY created_at DESC LIMIT 1;
```

## Incident Response Checklist

### Payment Webhook Failure
1. **Check webhook logs:** Supabase Edge Function logs
2. **Verify Stripe event:** Stripe Dashboard → Events
3. **Check idempotency:** Query `stripe_webhook_events`
4. **Manual retry:** Use Stripe CLI or Dashboard
5. **Monitor booking status:** Update if needed

### Double-Booking Detected
1. **Identify duplicates:** Query overlapping bookings
2. **Contact customers:** Explain situation
3. **Refund duplicate:** Process via Stripe Dashboard
4. **Cancel booking:** Update status to 'cancelled'
5. **Log incident:** Add to `booking_state_logs`

### Email Delivery Failure
1. **Check Resend logs:** Resend Dashboard
2. **Verify email address:** Customer provided valid email
3. **Retry manually:** Use Resend API
4. **Update notification status:** Mark as 'failed'
5. **Contact customer:** Alternative communication

### Timezone Display Bug
1. **Check system timezone:** Browser dev tools
2. **Verify toLocaleString usage:** Code audit
3. **Test with different timezones:** Browser settings
4. **Fix with explicit timezone:** Add `timeZone: 'Europe/Paris'`

## Monitoring Queries

### Active Bookings by Status
```sql
SELECT status, COUNT(*) as count
FROM bookings_v312
WHERE created_at >= CURRENT_DATE
GROUP BY status
ORDER BY count DESC;
```

### Recent Payment Failures
```sql
SELECT id, customer_email, stripe_payment_intent_id, created_at
FROM bookings_v312
WHERE status = 'failed'
  AND created_at >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### Webhook Processing Health
```sql
SELECT
  DATE(processed_at),
  COUNT(*) as events_processed,
  COUNT(DISTINCT event_id) as unique_events
FROM stripe_webhook_events
WHERE processed_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY DATE(processed_at)
ORDER BY DATE(processed_at) DESC;
```

### Booking Volume Trends
```sql
SELECT
  DATE(created_at) as date,
  COUNT(*) as bookings_created,
  SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
  SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
FROM bookings_v312
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```</content>
</xai:function_call name="TodoWrite">
<parameter name="todos">[{"id":"create_booking_supervisor","content":"Create docs/SUPERVISOR.md for booking system governance","status":"completed"},{"id":"create_booking_product_scope","content":"Create docs/PRODUCT_SCOPE.md with routes and funnel SSOT","status":"completed"},{"id":"create_booking_model","content":"Create docs/BOOKING_MODEL.md with tables, states, invariants","status":"completed"},{"id":"create_booking_status","content":"Create docs/BOOKING_STATUS.md with current project status","status":"completed"},{"id":"create_booking_runbook","content":"Create docs/BOOKING_RUNBOOK.md with manual tests and checklist","status":"completed"}]