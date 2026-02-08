-- Schema Sync S1: dispatch_invoices columns (SAFE - columns only)
-- NO triggers, NO CHECK constraints, NO foreign keys
-- All columns nullable or with safe defaults

-- 1) VAT/Totals columns
ALTER TABLE public.dispatch_invoices
  ADD COLUMN IF NOT EXISTS subtotal_ht numeric,
  ADD COLUMN IF NOT EXISTS vat_total numeric,
  ADD COLUMN IF NOT EXISTS total_ttc numeric,
  ADD COLUMN IF NOT EXISTS vat_breakdown jsonb;
-- 2) Dossier link (nullable, no FK)
ALTER TABLE public.dispatch_invoices
  ADD COLUMN IF NOT EXISTS dossier_id uuid NULL;
-- 3) Export tracking columns
ALTER TABLE public.dispatch_invoices
  ADD COLUMN IF NOT EXISTS export_status text DEFAULT 'NOT_EXPORTED',
  ADD COLUMN IF NOT EXISTS exported_at timestamptz NULL,
  ADD COLUMN IF NOT EXISTS export_run_id uuid NULL;
-- 4) Billing entity link (nullable, no FK)
ALTER TABLE public.dispatch_invoices
  ADD COLUMN IF NOT EXISTS billing_entity_id uuid NULL;
-- 5) Reminder columns
ALTER TABLE public.dispatch_invoices
  ADD COLUMN IF NOT EXISTS issued_at timestamptz NULL,
  ADD COLUMN IF NOT EXISTS due_date date NULL,
  ADD COLUMN IF NOT EXISTS reminder_stage smallint DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_reminder_at timestamptz NULL,
  ADD COLUMN IF NOT EXISTS reminder_hold boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS reminder_opt_out boolean DEFAULT false;
-- 6) Credit notes columns (nullable, no constraints)
ALTER TABLE public.dispatch_invoices
  ADD COLUMN IF NOT EXISTS document_type text DEFAULT 'invoice',
  ADD COLUMN IF NOT EXISTS credit_note_of_invoice_id uuid NULL;
-- 7) Safe indexes
CREATE INDEX IF NOT EXISTS idx_dispatch_invoices_status
  ON public.dispatch_invoices (status);
CREATE INDEX IF NOT EXISTS idx_dispatch_invoices_created_at
  ON public.dispatch_invoices (created_at DESC);
