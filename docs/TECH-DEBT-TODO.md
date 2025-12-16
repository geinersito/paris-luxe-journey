# Technical Debt & TODO Tracking

This document tracks technical debt items and follow-up tasks that need to be addressed.

## Active Items

### X2 Follow-up: Model FlexibleSubStatus (hold_pending/hold_confirmed)

**Priority:** Medium  
**Related PR:** [fix/x2-state-machine](https://github.com/geinersito/paris-luxe-journey/pull/TBD)  
**Created:** 2025-12-16

**Issue:**
Currently, `hold_pending` and `hold_confirmed` are mapped as temporary legacy states in `normalizeBookingStatus()`:
- `hold_pending` → `confirmed` (temporary)
- `hold_confirmed` → `driver_assigned` (temporary)

These are NOT canonical `BookingStatus` states. They represent sub-states specific to flexible payment mode.

**Solution:**
1. Model these as `FlexibleSubStatus` values instead of `BookingStatus`
2. Update the booking data model to use:
   ```typescript
   {
     status: BookingStatus;           // Main canonical state
     flexible_sub_status?: FlexibleSubStatus;  // Optional sub-state for flexible mode
   }
   ```
3. Remove the temporary mappings from `normalizeBookingStatus()`
4. Update state machine logic to handle sub-states properly

**Files to modify:**
- `src/types/payment-v312.ts` - Define `FlexibleSubStatus` type
- `src/services/state-machine/BookingStateMachine.ts` - Remove temporary mappings
- `src/services/booking/BookingRepository.ts` - Update data model
- Tests - Update to use new sub-status model

**Acceptance Criteria:**
- [ ] `FlexibleSubStatus` type defined with values: `hold_pending`, `hold_confirmed`, etc.
- [ ] Booking model includes optional `flexible_sub_status` field
- [ ] Temporary mappings removed from `normalizeBookingStatus()`
- [ ] All tests passing
- [ ] No new TypeScript errors introduced

---

## Completed Items

_(Items will be moved here once resolved)_

