DO $$
BEGIN
  IF to_regclass('public.dispatch_invoice_lines') IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'dispatch_invoice_lines' AND column_name = 'catalog_item_id'
    ) THEN
      ALTER TABLE public.dispatch_invoice_lines ADD COLUMN catalog_item_id uuid;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'dispatch_invoice_lines' AND column_name = 'partner_id'
    ) THEN
      ALTER TABLE public.dispatch_invoice_lines ADD COLUMN partner_id uuid;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'dispatch_invoice_lines' AND column_name = 'commission_mode'
    ) THEN
      ALTER TABLE public.dispatch_invoice_lines ADD COLUMN commission_mode text;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'dispatch_invoice_lines' AND column_name = 'commission_value'
    ) THEN
      ALTER TABLE public.dispatch_invoice_lines ADD COLUMN commission_value integer;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'dispatch_invoice_lines' AND column_name = 'commission_amount_cents'
    ) THEN
      ALTER TABLE public.dispatch_invoice_lines ADD COLUMN commission_amount_cents integer;
    END IF;
  END IF;
END
$$;
DO $$
BEGIN
  IF to_regclass('public.dispatch_invoice_lines') IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint
      WHERE conrelid = 'public.dispatch_invoice_lines'::regclass
        AND conname = 'dispatch_invoice_lines_commission_mode_check'
    ) THEN
      ALTER TABLE public.dispatch_invoice_lines
        ADD CONSTRAINT dispatch_invoice_lines_commission_mode_check
        CHECK (commission_mode IN ('PERCENT', 'FIXED_CENTS'));
    END IF;
  END IF;
END
$$;
DO $$
BEGIN
  IF to_regclass('public.dispatch_invoice_lines') IS NOT NULL
     AND to_regclass('public.dispatch_pricing_catalog_items') IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint
      WHERE conrelid = 'public.dispatch_invoice_lines'::regclass
        AND conname = 'dispatch_invoice_lines_catalog_item_id_fkey'
    ) THEN
      ALTER TABLE public.dispatch_invoice_lines
        ADD CONSTRAINT dispatch_invoice_lines_catalog_item_id_fkey
        FOREIGN KEY (catalog_item_id)
        REFERENCES public.dispatch_pricing_catalog_items(id)
        ON DELETE SET NULL;
    END IF;
  END IF;
END
$$;
DO $$
BEGIN
  IF to_regclass('public.dispatch_invoice_lines') IS NOT NULL
     AND to_regclass('public.dispatch_partners') IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint
      WHERE conrelid = 'public.dispatch_invoice_lines'::regclass
        AND conname = 'dispatch_invoice_lines_partner_id_fkey'
    ) THEN
      ALTER TABLE public.dispatch_invoice_lines
        ADD CONSTRAINT dispatch_invoice_lines_partner_id_fkey
        FOREIGN KEY (partner_id)
        REFERENCES public.dispatch_partners(id)
        ON DELETE SET NULL;
    END IF;
  END IF;
END
$$;
DO $$
BEGIN
  IF to_regclass('public.dispatch_invoice_lines') IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_indexes
      WHERE schemaname = 'public'
        AND tablename = 'dispatch_invoice_lines'
        AND indexname = 'dispatch_invoice_lines_catalog_item_id_idx'
    ) THEN
      CREATE INDEX dispatch_invoice_lines_catalog_item_id_idx
        ON public.dispatch_invoice_lines(catalog_item_id);
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_indexes
      WHERE schemaname = 'public'
        AND tablename = 'dispatch_invoice_lines'
        AND indexname = 'dispatch_invoice_lines_partner_id_idx'
    ) THEN
      CREATE INDEX dispatch_invoice_lines_partner_id_idx
        ON public.dispatch_invoice_lines(partner_id);
    END IF;
  END IF;
END
$$;
