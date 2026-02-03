# BOOKING_RUNBOOK - Paris Elite Services Booking System

**Operational procedures**: Manual tests, debugging guides, incident checklists.

**Last updated**: 2026-02-03  
**Version**: 0.1

---

## 1. Manual Tests (Pre-Merge Validation)

### 1.1 Happy Path - Transfer Booking + Payment + Confirmation

**Purpose**: Validate end-to-end booking flow (no errors, email sent, DB state correct).

**Prerequisites**:
- Local dev environment running (`npm run dev`)
- Supabase project accessible
- Stripe test mode keys configured (NOT `VITE_*` - see Section 5.1 for blocker)
- Resend API key configured (server-side only once SEC-RESEND01 merged)

**Steps**:

1. **Navigate to booking widget**:
   - Open `http://localhost:5173/`
   - Hero section visible with "Get Instant Quote" form

2. **Fill booking form**:
   - Pickup: "Charles de Gaulle Airport (CDG)"
   - Dropoff: "Eiffel Tower, Paris"
   - Date: Tomorrow's date
   - Time: 10:00 AM
   - Passengers: 2
   - Luggage: 1 large suitcase, 1 carry-on

3. **Get quote**:
   - Click "Get Instant Quote"
   - Expected: Route to `/booking/details` with calculated price displayed (e.g., "EUR70")

4. **Enter passenger details**:
   - Full name: "Test User"
   - Email: "test@example.com" (or your test email)
   - Phone: "+33 6 12 34 56 78"
   - Special requests: "Meet & Greet at CDG"

5. **Proceed to payment**:
   - Click "Continue to Payment"
   - Expected: Route to `/booking/payment` with Stripe payment form

6. **Complete payment** (Stripe test mode):
   - Card number: `4242 4242 4242 4242` (Stripe test card)
   - Expiry: Any future date (e.g., 12/34)
   - CVC: Any 3 digits (e.g., 123)
   - Click "Pay EUR70"

7. **Verify confirmation**:
   - Expected: Route to `/booking/confirmation` with success message
   - Display: Booking ID, pickup/dropoff details, date/time in **Europe/Paris timezone**

8. **Check DB** (Supabase dashboard):
   - Table: `bookings`
   - Filter: `user_id = {your_test_user_id}`
   - Expected:
     - Latest row with `status = 'confirmed'`
     - `payment_intent_id` populated (Stripe ID starting with `pi_`)
     - `created_at` / `updated_at` in UTC
     - `booking_date` matches selected date

9. **Check email** (once SEC-RESEND01 implemented):
   - Inbox: test@example.com
   - Expected: Confirmation email within 1 minute
   - Subject: "Booking Confirmation - Paris Elite Services"
   - Body: Booking details, pickup/dropoff, driver contact (if available)

**Result**: [OK] PASS if all steps succeed.

---

### 1.2 Payment Failed - Retry Logic

**Purpose**: Validate that failed payments do NOT create confirmed bookings.

**Steps**:

1. Follow steps 1-5 from Section 1.1 (Happy Path).

2. **Use Stripe test card for declined payment**:
   - Card number: `4000 0000 0000 0002` (Stripe test card - always declined)
   - Expiry: Any future date
   - CVC: Any 3 digits
   - Click "Pay EUR70"

3. **Verify error handling**:
   - Expected: Payment form shows error message (e.g., "Your card was declined")
   - Booking status remains `pending_payment` (NOT `confirmed`)

4. **Check DB**:
   - Table: `bookings`
   - Expected: Row exists with `status = 'pending_payment'`, `payment_intent_id` populated but payment NOT captured

5. **Retry payment** (if retry UI exists):
   - Use valid test card (`4242 4242 4242 4242`)
   - Expected: Payment succeeds, status updates to `confirmed`

**Result**: [OK] PASS if failed payment does NOT create confirmed booking + retry works.

---

### 1.3 Webhook Retry - Idempotency Check

**Purpose**: Validate that Stripe webhook retries do NOT cause duplicate actions (double emails, double status updates).

**Prerequisites**: Webhook handler implemented (FN-WEBHOOK01) + `processed_stripe_events` table exists.

**Steps**:

1. Complete a successful booking (Happy Path, Section 1.1).

2. **Simulate webhook retry** (Stripe CLI or dashboard):
   - In Stripe dashboard: Events -> find the `payment_intent.succeeded` event for your test payment
   - Click "Resend event" (simulates webhook retry)

3. **Check DB** (`processed_stripe_events` table):
   - Expected: `event_id` appears **once only** (not duplicated)

4. **Check booking status**:
   - Expected: Status remains `confirmed` (not updated twice)

5. **Check email inbox**:
   - Expected: **Only one** confirmation email received (NOT two)

6. **Check webhook handler logs** (Supabase Edge Function logs):
   - Expected: Second webhook call logs "Event already processed" and returns 200 OK (idempotent)

**Result**: [OK] PASS if webhook retry does NOT cause duplicate side effects.

---

### 1.4 Double-Booking Attempt - Availability Guarantee

**Purpose**: Validate that overlapping bookings are rejected (anti-double-booking guarantee).

**Prerequisites**: DB-AVAILABILITY01 implemented (resource model + unique constraint).

**Steps**:

1. **Create first booking**:
   - Pickup: CDG
   - Dropoff: Eiffel Tower
   - Date: Tomorrow
   - Time: 10:00 AM
   - Passengers: 2
   - Complete payment -> booking confirmed

2. **Check assigned vehicle** (if vehicle assignment visible):
   - Note: Vehicle ID (e.g., "Mercedes E-Class #123")

3. **Attempt second booking** (overlapping):
   - Same pickup: CDG
   - Same dropoff: Eiffel Tower
   - **Same date: Tomorrow**
   - **Overlapping time: 10:30 AM** (within service window of first booking)
   - Passengers: 1

4. **Verify rejection**:
   - **Expected (DB-level guarantee)**: Booking insert fails with error (e.g., "No vehicles available for selected time")
   - **Current behavior (NO guarantee)**: [RED] Booking succeeds -> DOUBLE-BOOKED (HIGH RISK)

5. **Check DB**:
   - Table: `bookings`
   - Expected: Two rows with overlapping `booking_date` and assigned vehicle (if no guarantee)
   - Desired: Second booking rejected OR assigned to different vehicle

**Result**: 
- [OK] PASS if second booking is rejected OR assigned to different vehicle
- [ERROR] FAIL if second booking is accepted with same vehicle (indicates double-booking risk)

**Status**: [RED] **CURRENTLY FAILS** (no DB guarantee implemented yet - see BOOKING_STATUS.md Section 3.2).

---

### 1.5 Timezone Sanity - Europe/Paris Display

**Purpose**: Validate that all date/time displays respect Europe/Paris timezone (not UTC, not user's browser timezone).

**Steps**:

1. Complete a booking (Happy Path, Section 1.1) with date/time:
   - Date: Tomorrow
   - Time: 10:00 AM (assume selected in Europe/Paris context)

2. **Check confirmation page**:
   - Display: Booking date/time should show "Tomorrow, 10:00 AM" (or formatted as "Jan 15, 2026, 10:00")
   - **Verify**: Time shown is **10:00 AM Europe/Paris** (NOT adjusted to your browser's timezone)

3. **Change browser timezone** (dev tools):
   - Chrome DevTools -> Sensors -> Location -> Set timezone to "New York" (UTC-5)
   - Refresh `/booking/confirmation`

4. **Re-check display**:
   - Expected: Time still shows **10:00 AM** (Europe/Paris), NOT converted to 4:00 AM (New York)

5. **Check code** (audit):
   - Search codebase for `toLocaleString()` calls:
     ```bash
     grep -r "toLocaleString" src/
     ```
   - Expected: All calls include `{ timeZone: 'Europe/Paris' }` parameter
   - [RED] **Current status**: NO enforcement (see BOOKING_MODEL.md Section 3.1)

**Result**: 
- [OK] PASS if all times display in Europe/Paris timezone regardless of user's browser
- [ERROR] FAIL if times shift based on browser timezone

**Status**: [WARN] **PARTIAL** (DB storage is UTC [OK], frontend display not enforced [ERROR]).

---

## 2. Incident Checklists

### 2.1 "Booking confirmed but no confirmation email"

**Symptoms**: User completed payment, booking status is `confirmed`, but no email received.

**Diagnosis**:

1. **Check booking record** (Supabase dashboard):
   - Table: `bookings`
   - Verify: `status = 'confirmed'`, `payment_intent_id` populated

2. **Check webhook logs** (Supabase Edge Functions -> `stripe-webhook`):
   - Filter: `payment_intent_id = {booking_payment_intent_id}`
   - Expected: Webhook received `payment_intent.succeeded` event
   - Check: Did email sending succeed or fail<=

3. **Check Resend logs** (Resend dashboard -> Logs):
   - Filter: `to = {user_email}`
   - Expected: Email sent successfully
   - If failed: Check error message (e.g., "Invalid API key", "Rate limit exceeded")

**Common causes**:

- [ERROR] Webhook not triggered (Stripe webhook URL not registered)
- [ERROR] Webhook handler crashed (check Edge Function logs for errors)
- [ERROR] Resend API key invalid or missing (check env vars)
- [ERROR] Email template broken (HTML rendering error)

**Resolution**:

- If webhook not triggered: Register webhook URL in Stripe dashboard
- If handler crashed: Fix bug + redeploy Edge Function + manually resend email
- If Resend error: Verify API key + check Resend quota

---

### 2.2 "Payment succeeded in Stripe but booking still 'pending_payment'"

**Symptoms**: User's card charged, Stripe dashboard shows `payment_intent.succeeded`, but booking status stuck at `pending_payment`.

**Diagnosis**:

1. **Check Stripe event** (Stripe dashboard -> Events):
   - Find: `payment_intent.succeeded` for the payment
   - Note: Event ID (e.g., `evt_abc123`)

2. **Check webhook delivery** (Stripe dashboard -> Webhooks -> endpoint):
   - Filter: Event ID
   - Expected: Webhook delivered successfully (200 OK)
   - If failed: Check HTTP status code + error message

3. **Check `processed_stripe_events` table** (Supabase):
   - Query: `SELECT * FROM processed_stripe_events WHERE event_id = 'evt_abc123'`
   - Expected: Row exists (event was processed)
   - If missing: Webhook not received or handler failed

4. **Check Edge Function logs** (Supabase):
   - Filter: Webhook function, timestamp around payment time
   - Look for: Errors, exceptions, or missing logic to update booking status

**Common causes**:

- [ERROR] Webhook endpoint not reachable (firewall, DNS issue)
- [ERROR] Webhook signature verification failed (secret mismatch)
- [ERROR] Handler logic incomplete (event received but status not updated)

**Resolution**:

- If webhook not delivered: Check Stripe webhook endpoint configuration + test redelivery
- If signature failed: Verify `STRIPE_WEBHOOK_SECRET` env var matches Stripe dashboard
- If handler incomplete: Fix logic + manually update booking status + resend confirmation email

**Manual fix** (if handler can't be redeployed immediately):

```sql
-- Update booking status manually (use with caution)
UPDATE bookings
SET status = 'confirmed', updated_at = NOW()
WHERE payment_intent_id = 'pi_abc123' AND status = 'pending_payment';
```

Then manually trigger confirmation email via Resend API or Edge Function.

---

### 2.3 "Double-booking detected - two bookings for same vehicle/time"

**Symptoms**: Two confirmed bookings assigned to same vehicle for overlapping time slots.

**Diagnosis**:

1. **Query bookings table**:
   ```sql
   SELECT id, booking_date, pickup_details, dropoff_details, status, vehicle_category_id
   FROM bookings
   WHERE booking_date = '2026-01-15' AND status = 'confirmed'
   ORDER BY created_at;
   ```

2. **Identify overlap**:
   - Check: Same `booking_date` + overlapping pickup times (if stored)
   - Check: Same `vehicle_category_id` (if vehicle assignment exists)

3. **Check capacity model** (if `vehicle_assignments` table exists):
   - Query: `SELECT * FROM vehicle_assignments WHERE date = '2026-01-15'`
   - Expected: Unique constraint should have prevented second booking

**Root cause**:

- [RED] **Most likely**: No DB-level anti-double-booking guarantee (see BOOKING_MODEL.md Section 3.2)
- Race condition: Two bookings submitted concurrently, both passed app-level availability check

**Immediate mitigation**:

1. **Contact both customers** (phone/email):
   - Apologize for overbooking
   - Offer: Alternative vehicle OR alternative time OR full refund

2. **Assign second vehicle** (if available):
   - Update `vehicle_category_id` for one booking
   - Notify customer of vehicle change

3. **Issue refund** (if no alternative):
   - Stripe dashboard -> find `payment_intent` -> Refund
   - Update booking: `status = 'cancelled'`
   - Send apology email + refund confirmation

**Long-term fix**:

- Implement DB-AVAILABILITY01 (resource model + unique constraint) - P0 blocker

---

## 3. Debugging Guides

### 3.1 "Booking not appearing in DB"

**Possible causes**:

1. **RLS policy blocking insert**:
   - Check: User is authenticated (`auth.uid()` not null)
   - Check: `user_id` matches `auth.uid()` (RLS policy requires match)

2. **Frontend error before submission**:
   - Open browser DevTools -> Console
   - Look for: JavaScript errors, failed `fetch()` calls

3. **Supabase client using wrong key**:
   - Check: Frontend uses `VITE_SUPABASE_ANON_KEY` (NOT service_role key)
   - Verify: `.env` file has correct anon key

**Debug steps**:

```javascript
// In browser console (on booking submission):
console.log('Auth user:', supabase.auth.getUser());
console.log('Booking payload:', bookingData);
```

Check network tab for `/rest/v1/bookings` POST request - response should be 201 Created.

---

### 3.2 "Timezone displaying incorrectly"

**Symptoms**: Booking confirmation shows time in UTC or user's local timezone (not Europe/Paris).

**Diagnosis**:

1. **Check DB value**:
   ```sql
   SELECT id, booking_date, created_at AT TIME ZONE 'Europe/Paris' AS created_paris
   FROM bookings
   WHERE id = '{booking_id}';
   ```

2. **Check frontend code**:
   - Search: `toLocaleString()` calls in confirmation page component
   - Expected: `date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })`
   - [RED] **If missing**: Add `timeZone` parameter

**Fix** (example):

```typescript
// [ERROR] WRONG (uses browser's timezone)
const displayTime = new Date(booking.created_at).toLocaleString();

// [OK] CORRECT (forces Europe/Paris)
const displayTime = new Date(booking.created_at).toLocaleString('en-US', {
  timeZone: 'Europe/Paris',
  dateStyle: 'medium',
  timeStyle: 'short'
});
```

---

### 3.3 "Stripe webhook not being received"

**Symptoms**: Payments succeed in Stripe dashboard, but webhook handler never executes.

**Debug steps**:

1. **Check webhook endpoint URL** (Stripe dashboard -> Developers -> Webhooks):
   - Expected: `https://{project-ref}.supabase.co/functions/v1/stripe-webhook`
   - Verify: URL is accessible (not localhost, not behind firewall)

2. **Test webhook delivery** (Stripe CLI):
   ```bash
   stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook
   ```

3. **Check webhook logs** (Stripe dashboard -> Webhooks -> endpoint -> Recent deliveries):
   - Look for: HTTP status code (should be 200 OK)
   - If 401/403: Check authentication (webhook secret)
   - If 500: Check Edge Function logs for errors

4. **Check Edge Function logs** (Supabase dashboard -> Edge Functions -> stripe-webhook):
   - Filter: Recent invocations
   - Look for: Errors, stack traces, missing env vars

---

## 4. Emergency Procedures

### 4.1 "Production site down - critical bug"

**Immediate actions** (within 5 minutes):

1. **Rollback to last stable version**:
   ```bash
   git revert HEAD  # Revert last commit
   git push origin main --force  # Deploy rollback
   ```

2. **Notify users** (if downtime > 5 minutes):
   - Update status page (if exists)
   - Social media: "We're experiencing technical difficulties, investigating now"

3. **Check logs** (Supabase, Stripe, Vercel/Netlify):
   - Identify: Error message, stack trace, affected component

4. **Hotfix** (if rollback not possible):
   - Create branch: `hotfix/emergency-fix`
   - Fix bug (minimal change)
   - Deploy immediately (bypass normal PR process)
   - Open PR post-mortem after resolution

---

### 4.2 "Stripe API key compromised"

**Immediate actions** (within 1 minute):

1. **Rotate API key** (Stripe dashboard -> API keys -> Roll secret key):
   - Generate new secret key
   - Update `.env` (Edge Function env vars)
   - Redeploy Edge Functions

2. **Check for unauthorized activity** (Stripe dashboard -> Payments):
   - Filter: Last 24 hours
   - Look for: Suspicious refunds, payouts, charges

3. **Notify Stripe support** (if fraud detected):
   - Contact: support@stripe.com
   - Report: Compromised key + suspicious activity

---

### 4.3 "Customer data leak suspected"

**Immediate actions**:

1. **Secure the vulnerability**:
   - Identify: RLS policy gap, exposed endpoint, insecure direct object reference (IDOR)
   - Fix: Patch vulnerability immediately (hotfix)

2. **Assess impact**:
   - Query: Affected user IDs, leaked data fields (emails, phone numbers, payment methods)
   - Check logs: Who accessed the data, when, from where (IP addresses)

3. **Notify affected users** (GDPR compliance, within 72 hours):
   - Email: "We detected a security incident affecting your account..."
   - Offer: Free identity protection service (if PII leaked)

4. **Report to authorities** (if GDPR applies):
   - France: CNIL (Commission Nationale de l'Informatique et des Libertes)
   - Form: [cnil.fr](https://www.cnil.fr/)

---

## 5. Known Issues & Workarounds

### 5.1 Secrets in VITE_* env vars (CRITICAL)

**Issue**: `.env.example` exposes `VITE_STRIPE_SECRET_KEY` and `VITE_RESEND_API_KEY` to client bundle.

**Impact**: Anyone can view secrets in browser DevTools -> Network tab -> JS bundle.

**Workaround**: DO NOT deploy to production until SEC-RESEND01 merged.

**Permanent fix**: PR SEC-RESEND01 (move to Edge Functions) - see BOOKING_STATUS.md Section 3.1.

---

### 5.2 Double-booking not prevented (CRITICAL)

**Issue**: No DB-level guarantee against overlapping bookings for same vehicle.

**Impact**: Two customers can book same vehicle for same time -> service failure.

**Workaround**: Manual coordination (check bookings table before confirming).

**Permanent fix**: PR DB-AVAILABILITY01 (resource model) - see BOOKING_STATUS.md Section 3.2.

---

### 5.3 Webhook idempotency not implemented (HIGH)

**Issue**: Stripe webhook retries can cause duplicate emails/status updates.

**Impact**: Customer receives multiple confirmation emails (poor UX).

**Workaround**: None (webhooks not in production yet).

**Permanent fix**: PR FN-WEBHOOK01 (idempotent handler) - see BOOKING_STATUS.md Section 3.3.

---

## 6. Related Docs

- **BOOKING_MODEL.md** - data model + invariants
- **BOOKING_STATUS.md** - current implementation status
- **PRODUCT_SCOPE.md** - features in/out of scope + security violations
- **SUPERVISOR.md** - governance + PR rules
