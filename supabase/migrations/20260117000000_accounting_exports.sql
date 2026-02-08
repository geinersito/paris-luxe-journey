CREATE TABLE public.dispatch_accounting_export_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  export_type text NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  status text NOT NULL DEFAULT 'GENERATED',
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NULL
);
CREATE TABLE public.dispatch_accounting_export_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  export_run_id uuid NOT NULL REFERENCES public.dispatch_accounting_export_runs(id) ON DELETE CASCADE,
  source_invoice_id uuid NULL,
  line_no int NOT NULL,
  journal_code text NOT NULL DEFAULT 'VE',
  account text NOT NULL,
  label text NOT NULL,
  debit numeric NOT NULL DEFAULT 0,
  credit numeric NOT NULL DEFAULT 0,
  piece text NULL,
  tier text NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
DO $$
BEGIN
  IF to_regclass('public.dispatch_invoices') IS NOT NULL THEN
    ALTER TABLE public.dispatch_accounting_export_lines
      ADD CONSTRAINT fk_export_lines_invoice
      FOREIGN KEY (source_invoice_id) REFERENCES public.dispatch_invoices(id) ON DELETE SET NULL;
  END IF;
END $$;
CREATE TABLE public.dispatch_accounting_account_map (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'DEFAULT',
  journal_code text NOT NULL DEFAULT 'VE',
  ar_account text NOT NULL DEFAULT '411000',
  revenue_account text NOT NULL DEFAULT '706000',
  vat_account text NOT NULL DEFAULT '445710',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.dispatch_accounting_export_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatch_accounting_export_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatch_accounting_account_map ENABLE ROW LEVEL SECURITY;
CREATE POLICY export_runs_select ON public.dispatch_accounting_export_runs
  FOR SELECT TO authenticated
  USING (true);
CREATE POLICY export_runs_insert ON public.dispatch_accounting_export_runs
  FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY export_runs_update ON public.dispatch_accounting_export_runs
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY export_runs_delete ON public.dispatch_accounting_export_runs
  FOR DELETE TO authenticated
  USING (is_role('admin'));
CREATE POLICY export_lines_select ON public.dispatch_accounting_export_lines
  FOR SELECT TO authenticated
  USING (true);
CREATE POLICY export_lines_insert ON public.dispatch_accounting_export_lines
  FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY export_lines_update ON public.dispatch_accounting_export_lines
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY export_lines_delete ON public.dispatch_accounting_export_lines
  FOR DELETE TO authenticated
  USING (is_role('admin'));
CREATE POLICY account_map_select ON public.dispatch_accounting_account_map
  FOR SELECT TO authenticated
  USING (true);
CREATE POLICY account_map_insert ON public.dispatch_accounting_account_map
  FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY account_map_update ON public.dispatch_accounting_account_map
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY account_map_delete ON public.dispatch_accounting_account_map
  FOR DELETE TO authenticated
  USING (is_role('admin'));
DO $$
BEGIN
  IF to_regclass('public.dispatch_invoices') IS NOT NULL THEN
    ALTER TABLE public.dispatch_invoices
      ADD COLUMN IF NOT EXISTS export_status text NOT NULL DEFAULT 'NOT_EXPORTED';
    ALTER TABLE public.dispatch_invoices
      ADD COLUMN IF NOT EXISTS exported_at timestamptz NULL;
    ALTER TABLE public.dispatch_invoices
      ADD COLUMN IF NOT EXISTS export_run_id uuid NULL REFERENCES public.dispatch_accounting_export_runs(id) ON DELETE SET NULL;
  END IF;
END $$;
