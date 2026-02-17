-- FIX-BOOKING-INSERT-02
-- The `payments` table was missing from the production database.
-- `create-booking-payment` Edge Function fails at step 6 (insert payment record)
-- because this table does not exist, causing a 42P01 error that returns HTTP 500
-- to the frontend even though the booking row and Stripe PaymentIntent were already
-- created successfully.
--
-- This migration creates the table with the exact columns the Edge Function inserts.
--
-- Rollback:
--   DROP TABLE IF EXISTS public.payments;

CREATE TABLE IF NOT EXISTS public.payments (
  id                        uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id                uuid        REFERENCES public.bookings(id) ON DELETE SET NULL,
  amount                    numeric     NOT NULL,
  customer_email            text        NOT NULL,
  customer_name             text        NOT NULL,
  stripe_customer_id        text,
  stripe_payment_intent_id  text,
  status                    text        NOT NULL DEFAULT 'pending',
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now()
);

-- Index for fast lookup by booking
CREATE INDEX IF NOT EXISTS payments_booking_id_idx
  ON public.payments (booking_id);

-- Index for Stripe PI deduplication
CREATE UNIQUE INDEX IF NOT EXISTS payments_stripe_pi_idx
  ON public.payments (stripe_payment_intent_id)
  WHERE stripe_payment_intent_id IS NOT NULL;

-- RLS: service role key (used by Edge Functions) bypasses RLS.
-- Anon/authenticated users should not access payments directly.
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
