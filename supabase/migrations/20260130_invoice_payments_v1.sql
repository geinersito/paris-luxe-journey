-- Invoice Payments Table (Acompte MVP)
-- Records partial payments per invoice

-- 1) Create table
CREATE TABLE IF NOT EXISTS public.dispatch_invoice_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid NOT NULL REFERENCES public.dispatch_invoices(id) ON DELETE CASCADE,
  amount numeric NOT NULL CHECK (amount > 0),
  paid_at timestamptz NOT NULL DEFAULT now(),
  method text NULL,
  note text NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
-- 2) Indexes
CREATE INDEX IF NOT EXISTS idx_invoice_payments_invoice_id
  ON public.dispatch_invoice_payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_invoice_payments_paid_at
  ON public.dispatch_invoice_payments(paid_at DESC);
-- 3) RLS
ALTER TABLE public.dispatch_invoice_payments ENABLE ROW LEVEL SECURITY;
-- Policies for authenticated users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='dispatch_invoice_payments' AND policyname='payments_select_auth'
  ) THEN
    CREATE POLICY payments_select_auth ON public.dispatch_invoice_payments
      FOR SELECT TO authenticated USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='dispatch_invoice_payments' AND policyname='payments_insert_auth'
  ) THEN
    CREATE POLICY payments_insert_auth ON public.dispatch_invoice_payments
      FOR INSERT TO authenticated WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='dispatch_invoice_payments' AND policyname='payments_update_auth'
  ) THEN
    CREATE POLICY payments_update_auth ON public.dispatch_invoice_payments
      FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;

  -- No DELETE policy: deny by default
END $$;
