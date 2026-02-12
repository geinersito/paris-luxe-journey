# Stripe Webhook Cutover & Deprecation Plan

**Item**: OPS-STRIPE-LEGACY-DEPRECATE-01  
**Status**: In Progress  
**Risk**: R1 (Functions-only changes, monitored rollout)  
**Owner**: DevOps/Backend

## Objective

Consolidate all Stripe webhook traffic to the **canonical handler** (`stripe-webhooks`) and safely deprecate legacy v3.1.2 handlers without breaking production.

## Inventory

| Handler | Endpoint | Secret Env Var | Status | Features |
|---------|----------|----------------|--------|----------|
| **stripe-webhooks** | `/functions/v1/stripe-webhooks` | `STRIPE_WEBHOOK_SECRET` | ✅ **CANONICAL** | Idempotence via `processed_stripe_events` (PR #73, #74) |
| stripe-webhooks-v312 | `/functions/v1/stripe-webhooks-v312` | `STRIPE_WEBHOOK_SECRET_V312` | ⚠️ **DEPRECATED** | Legacy V3.1.2 handler (prepaid/flexible/hold) |
| stripe-webhooks-v312-integrated | `/functions/v1/stripe-webhooks-v312-integrated` | `STRIPE_WEBHOOK_SECRET_V312` | ⚠️ **DEPRECATED** | Experimental state-machine version |

## Events Handled

All handlers listen to:

- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `payment_intent.amount_capturable_updated` (hold)
- `payment_intent.canceled` (hold)
- `charge.captured` (hold)
- `setup_intent.succeeded` (flexible)
- `setup_intent.setup_failed` (flexible)

**Canonical handler** (`stripe-webhooks`) handles all of these events + deduplication.

## Cutover Plan (3 PRs)

### PR1: Documentation (R0) — **THIS PR**

- ✅ Inventory of handlers
- ✅ Cutover procedure
- ✅ Rollback plan
- ✅ Monitoring criteria

**Merge**: Safe, docs-only

---

### PR2: Telemetry & Soft Deprecation (R1)

**Branch**: `fn/ops-stripe-legacy-telemetry-01`

**Changes**:
1. Add deprecation warning to legacy handlers:
   ```ts
   console.warn('[DEPRECATED] stripe-webhooks-v312 hit. Use /stripe-webhooks instead.');
   ```
2. Optional: Log to deprecation tracking table or structured logs
3. Return 200 with payload:
   ```json
   {
     "ok": true,
     "deprecated": true,
     "canonical": "/functions/v1/stripe-webhooks"
   }
   ```
4. Do NOT break existing functionality

**Gates**:
- TypeScript: `npx tsc --noEmit`
- Build: `npm run build`
- Manual test: trigger webhook to legacy → verify warning logged + 200 response

**Outcome**: Visibility into legacy handler usage without breaking prod

---

### PR3: Removal (R1)

**Branch**: `fn/ops-stripe-legacy-remove-01`

**Prerequisite**: Zero hits on legacy handlers for 48-72h (verified via logs/telemetry)

**Changes**:
1. Remove directories:
   - `supabase/functions/stripe-webhooks-v312/`
   - `supabase/functions/stripe-webhooks-v312-integrated/`
2. Or, safer alternative: replace with 410 Gone response

**Gates**:
- Same as PR2
- Manual smoke: verify canonical handler still works

**Outcome**: Reduced surface area, single webhook handler

---

## Stripe Dashboard Configuration

### Current Setup (VERIFY FIRST)

1. Go to: [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Check active endpoints:
   - Which Supabase function URL is currently receiving events?
   - Which events are subscribed?
   - Which webhook secret is being used?

### Target Configuration (After Cutover)

**Active Endpoint**:
```
https://<project-ref>.supabase.co/functions/v1/stripe-webhooks
```

**Secret**: `STRIPE_WEBHOOK_SECRET` (set in Supabase Edge Functions secrets)

**Events** (minimum):
- ✅ `payment_intent.succeeded`
- ✅ `payment_intent.payment_failed`
- ✅ `payment_intent.amount_capturable_updated`
- ✅ `payment_intent.canceled`
- ✅ `charge.captured`
- ✅ `setup_intent.succeeded`
- ✅ `setup_intent.setup_failed`

**Steps**:
1. Create new webhook endpoint (or update existing)
2. Copy webhook signing secret
3. Set in Supabase: `supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...`
4. Verify: trigger test event from Stripe dashboard → check Edge Function logs
5. Monitor: `processed_stripe_events` table should show new rows

---

## Post-Cutover Verification

### Immediate (within 1h)

1. **Edge Function Logs** (Supabase Dashboard → Edge Functions → stripe-webhooks):
   - ✅ Events being received
   - ✅ No signature errors
   - ✅ Successful event processing

2. **Database**: Check `processed_stripe_events`:
   ```sql
   SELECT event_type, COUNT(*) 
   FROM processed_stripe_events 
   WHERE created_at > NOW() - INTERVAL '1 hour'
   GROUP BY event_type;
   ```
   - Should see recent events

3. **Test Payment**:
   - Complete a test booking + payment
   - Verify: booking status updated, confirmation email sent

### Ongoing (48-72h)

4. **Legacy Handler Hits**: Monitor logs for:
   ```
   [stripe-webhooks-v312] Webhook recibido
   ```
   - Target: **ZERO hits** after cutover

5. **Error Rate**: Compare before/after cutover
   - Canonical handler error rate should remain stable

---

## Rollback Procedure

If canonical handler fails after cutover:

1. **Re-enable legacy endpoint in Stripe Dashboard**:
   - Add `https://<project-ref>.supabase.co/functions/v1/stripe-webhooks-v312`
   - Use existing secret `STRIPE_WEBHOOK_SECRET_V312`
   - Subscribe to same events

2. **Verify** legacy handler is receiving events (check logs)

3. **Investigate** canonical handler error:
   - Check Edge Function logs
   - Check `processed_stripe_events` table for duplicates/errors
   - Verify webhook secret is correct

4. **Fix** canonical handler, test, then re-cutover

---

## Success Criteria (PR2 → PR3)

Before removing legacy handlers (PR3):

- ✅ Canonical handler receiving 100% of webhook traffic
- ✅ Zero legacy handler hits for 48-72h consecutive
- ✅ `processed_stripe_events` table growing (dedup working)
- ✅ No increase in booking/payment errors
- ✅ Confirmation emails sending correctly

---

## Security Notes

- **Webhook secrets** are different:
  - `STRIPE_WEBHOOK_SECRET` = canonical
  - `STRIPE_WEBHOOK_SECRET_V312` = legacy (can be deleted after PR3)
- Always verify signature before processing events
- Never log full `event.data` (contains PII/PCI data)

---

## References

- PR #73: DB migration `processed_stripe_events` (`7e31067`)
- PR #74: Dedupe logic in canonical webhook (`3e51bad`)
- Stripe webhook docs: https://stripe.com/docs/webhooks/best-practices
