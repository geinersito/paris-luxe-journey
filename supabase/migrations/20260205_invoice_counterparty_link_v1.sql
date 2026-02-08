-- LEDGER05A - Link invoices to counterparties (nullable, DB-only).

ALTER TABLE public.dispatch_invoices
  ADD COLUMN IF NOT EXISTS counterparty_id uuid NULL;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.dispatch_invoices'::regclass
      AND conname = 'dispatch_invoices_counterparty_id_fkey'
  ) THEN
    ALTER TABLE public.dispatch_invoices
      ADD CONSTRAINT dispatch_invoices_counterparty_id_fkey
      FOREIGN KEY (counterparty_id)
      REFERENCES public.dispatch_counterparties(id)
      ON DELETE SET NULL;
  END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_dispatch_invoices_counterparty_id
  ON public.dispatch_invoices (counterparty_id)
  WHERE counterparty_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_dispatch_invoices_billing_entity_counterparty
  ON public.dispatch_invoices (billing_entity_id, counterparty_id)
  WHERE counterparty_id IS NOT NULL;
