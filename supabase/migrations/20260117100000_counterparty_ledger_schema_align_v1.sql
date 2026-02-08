ALTER TABLE public.dispatch_counterparty_ledger_entries
  ADD COLUMN IF NOT EXISTS label text;
