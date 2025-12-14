/**
 * Tests for Booking State Machine V3.1.2
 */

import { describe, it, expect } from 'vitest';
import {
  executeTransition,
  executeTransitionWithValidation,
  isValidTransition,
  getNextState,
  getValidEvents,
  isFinalState,
  validateBusinessRules,
  type BookingEvent,
  type BookingStatus,
} from '../BookingStateMachine';

describe('BookingStateMachine', () => {
  describe('State Transitions', () => {
    it('should allow valid transition: pending_payment -> confirmed (PAYMENT_SUCCEEDED)', () => {
      const result = executeTransition('pending_payment', 'PAYMENT_SUCCEEDED');
      
      expect(result.success).toBe(true);
      expect(result.from_state).toBe('pending_payment');
      expect(result.to_state).toBe('confirmed');
      expect(result.event).toBe('PAYMENT_SUCCEEDED');
    });

    it('should allow valid transition: pending_payment -> confirmed (SETUP_SUCCEEDED)', () => {
      const result = executeTransition('pending_payment', 'SETUP_SUCCEEDED');
      
      expect(result.success).toBe(true);
      expect(result.to_state).toBe('confirmed');
    });

    it('should allow valid transition: confirmed -> partner_assigned', () => {
      const result = executeTransition('confirmed', 'PARTNER_ASSIGNED');
      
      expect(result.success).toBe(true);
      expect(result.to_state).toBe('partner_assigned');
    });

    it('should allow valid transition: partner_assigned -> hold_pending', () => {
      const result = executeTransition('partner_assigned', 'HOLD_CREATED');
      
      expect(result.success).toBe(true);
      expect(result.to_state).toBe('hold_pending');
    });

    it('should allow valid transition: hold_pending -> hold_confirmed', () => {
      const result = executeTransition('hold_pending', 'HOLD_CONFIRMED');
      
      expect(result.success).toBe(true);
      expect(result.to_state).toBe('hold_confirmed');
    });

    it('should allow valid transition: hold_confirmed -> in_progress', () => {
      const result = executeTransition('hold_confirmed', 'SERVICE_STARTED');
      
      expect(result.success).toBe(true);
      expect(result.to_state).toBe('in_progress');
    });

    it('should allow valid transition: in_progress -> completed', () => {
      const result = executeTransition('in_progress', 'SERVICE_COMPLETED');
      
      expect(result.success).toBe(true);
      expect(result.to_state).toBe('completed');
    });

    it('should reject invalid transition', () => {
      const result = executeTransition('completed', 'PAYMENT_SUCCEEDED');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid transition');
    });

    it('should allow cancellation from most states', () => {
      const states: BookingStatus[] = [
        'pending_payment',
        'confirmed',
        'partner_assigned',
        'hold_pending',
        'hold_confirmed',
        'in_progress',
      ];

      states.forEach((state) => {
        const result = executeTransition(state, 'CANCEL_REQUESTED');
        expect(result.success).toBe(true);
        expect(result.to_state).toBe('cancelled');
      });
    });
  });

  describe('Validation Helpers', () => {
    it('should correctly identify valid transitions', () => {
      expect(isValidTransition('pending_payment', 'PAYMENT_SUCCEEDED')).toBe(true);
      expect(isValidTransition('pending_payment', 'SERVICE_STARTED')).toBe(false);
      expect(isValidTransition('completed', 'PAYMENT_SUCCEEDED')).toBe(false);
    });

    it('should return correct next state', () => {
      expect(getNextState('pending_payment', 'PAYMENT_SUCCEEDED')).toBe('confirmed');
      expect(getNextState('confirmed', 'PARTNER_ASSIGNED')).toBe('partner_assigned');
      expect(getNextState('completed', 'PAYMENT_SUCCEEDED')).toBe(null);
    });

    it('should return valid events for a state', () => {
      const events = getValidEvents('pending_payment');
      expect(events).toContain('PAYMENT_SUCCEEDED');
      expect(events).toContain('PAYMENT_FAILED');
      expect(events).toContain('SETUP_SUCCEEDED');
      expect(events).toContain('CANCEL_REQUESTED');
    });

    it('should identify final states', () => {
      expect(isFinalState('completed')).toBe(true);
      expect(isFinalState('cancelled')).toBe(true);
      expect(isFinalState('failed')).toBe(true);
      expect(isFinalState('pending_payment')).toBe(false);
      expect(isFinalState('confirmed')).toBe(false);
    });
  });

  describe('Business Rules Validation', () => {
    it('should reject HOLD_CREATED for prepaid mode', () => {
      const validation = validateBusinessRules('confirmed', 'HOLD_CREATED', {
        payment_mode: 'prepaid',
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.error).toContain('flexible payment mode');
    });

    it('should allow HOLD_CREATED for flexible mode within 24h', () => {
      const pickupIn12h = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
      
      const validation = validateBusinessRules('confirmed', 'HOLD_CREATED', {
        payment_mode: 'flexible',
        pickup_datetime: pickupIn12h,
      });
      
      expect(validation.valid).toBe(true);
    });

    it('should reject HOLD_CREATED outside 24h window', () => {
      const pickupIn48h = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
      
      const validation = validateBusinessRules('confirmed', 'HOLD_CREATED', {
        payment_mode: 'flexible',
        pickup_datetime: pickupIn48h,
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.error).toContain('within 24h');
    });
  });
});

