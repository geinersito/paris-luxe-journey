-- PR15A: Add commission_enabled flag to invoice lines
-- Allows explicit control over commission calculation per line

DO $$
BEGIN
  IF to_regclass('public.dispatch_invoice_lines') IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'dispatch_invoice_lines'
        AND column_name = 'commission_enabled'
    ) THEN
      ALTER TABLE public.dispatch_invoice_lines
        ADD COLUMN commission_enabled boolean NOT NULL DEFAULT false;
    END IF;
  END IF;
END
$$;
