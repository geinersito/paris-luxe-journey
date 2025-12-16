-- Migration: Create payment_cost_ledger table
-- Purpose: Track PSP (Payment Service Provider) costs for margin monitoring
-- REV B: Observability-based pricing (non-blocking)
-- Date: 2025-12-16

-- ============================================================================
-- TABLE: payment_cost_ledger
-- ============================================================================

CREATE TABLE IF NOT EXISTS payment_cost_ledger (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign key to bookings
  booking_id UUID NOT NULL,

  -- PSP information
  provider VARCHAR(30) NOT NULL,        -- 'stripe', 'adyen', 'paypal', etc.
  method VARCHAR(30) NOT NULL,          -- 'card', 'sepa_debit', 'cash', etc.

  -- Cost tracking (all in cents)
  fee_estimated_cents INT NOT NULL,     -- Estimated fee when creating PaymentIntent
  fee_actual_cents INT,                 -- Actual fee from PSP (NULL until known)
  currency VARCHAR(3) NOT NULL DEFAULT 'EUR',

  -- Metadata (flexible JSONB for PSP-specific details)
  details JSONB,                        -- { bps, fixed_cents, profile, country, card_brand, ... }

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Foreign key constraint
  CONSTRAINT fk_payment_cost_ledger_booking
    FOREIGN KEY (booking_id)
    REFERENCES bookings(id)
    ON DELETE CASCADE
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Index on booking_id (most common query: get ledger for a booking)
CREATE INDEX IF NOT EXISTS idx_payment_cost_ledger_booking
  ON payment_cost_ledger(booking_id);

-- Index on provider (for analytics: costs by PSP)
CREATE INDEX IF NOT EXISTS idx_payment_cost_ledger_provider
  ON payment_cost_ledger(provider);

-- Index on created_at (for time-based queries in monitoring job)
CREATE INDEX IF NOT EXISTS idx_payment_cost_ledger_created
  ON payment_cost_ledger(created_at DESC);

-- Composite index for monitoring queries (provider + created_at)
CREATE INDEX IF NOT EXISTS idx_payment_cost_ledger_provider_created
  ON payment_cost_ledger(provider, created_at DESC);

-- ============================================================================
-- TRIGGER: Auto-update updated_at
-- ============================================================================

-- Note: update_updated_at_column() function already exists from previous migrations
-- Create trigger
DROP TRIGGER IF EXISTS update_payment_cost_ledger_updated_at ON payment_cost_ledger;

CREATE TRIGGER update_payment_cost_ledger_updated_at
  BEFORE UPDATE ON payment_cost_ledger
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

