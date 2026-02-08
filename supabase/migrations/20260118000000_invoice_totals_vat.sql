DO $$
BEGIN
  IF to_regclass('public.dispatch_invoice_lines') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.dispatch_invoice_lines ADD COLUMN IF NOT EXISTS vat_rate numeric';
    EXECUTE 'ALTER TABLE public.dispatch_invoice_lines ADD COLUMN IF NOT EXISTS line_total_ht numeric';
    EXECUTE 'ALTER TABLE public.dispatch_invoice_lines ADD COLUMN IF NOT EXISTS vat_amount numeric';
    EXECUTE 'ALTER TABLE public.dispatch_invoice_lines ADD COLUMN IF NOT EXISTS line_total_ttc numeric';
  END IF;
END
$$;
DO $$
BEGIN
  IF to_regclass('public.dispatch_invoices') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.dispatch_invoices ADD COLUMN IF NOT EXISTS subtotal_ht numeric';
    EXECUTE 'ALTER TABLE public.dispatch_invoices ADD COLUMN IF NOT EXISTS vat_total numeric';
    EXECUTE 'ALTER TABLE public.dispatch_invoices ADD COLUMN IF NOT EXISTS total_ttc numeric';
    EXECUTE 'ALTER TABLE public.dispatch_invoices ADD COLUMN IF NOT EXISTS vat_breakdown jsonb';
    IF to_regclass('public.billing_entities') IS NOT NULL THEN
      EXECUTE 'ALTER TABLE public.dispatch_invoices ADD COLUMN IF NOT EXISTS billing_entity_id uuid';
    END IF;
  END IF;
END
$$;
