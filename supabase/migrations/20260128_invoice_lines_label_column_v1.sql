-- Schema Sync: dispatch_invoice_lines.label column
-- Fixes: "Could not find the 'label' column of 'dispatch_invoice_lines' in the schema cache"
-- SAFE: ADD COLUMN IF NOT EXISTS, nullable, no constraints

ALTER TABLE public.dispatch_invoice_lines
  ADD COLUMN IF NOT EXISTS label text NULL;
-- Backfill existing rows without label
UPDATE public.dispatch_invoice_lines
SET label = 'Ligne'
WHERE label IS NULL;
