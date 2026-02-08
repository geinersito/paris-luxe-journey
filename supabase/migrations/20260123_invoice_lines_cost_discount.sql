DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'dispatch_invoice_lines'
      AND column_name = 'discount_cents'
  ) THEN
    ALTER TABLE public.dispatch_invoice_lines
      ADD COLUMN discount_cents integer NOT NULL DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'dispatch_invoice_lines_discount_cents_nonneg'
      AND conrelid = 'public.dispatch_invoice_lines'::regclass
  ) THEN
    ALTER TABLE public.dispatch_invoice_lines
      ADD CONSTRAINT dispatch_invoice_lines_discount_cents_nonneg
      CHECK (discount_cents >= 0);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'dispatch_invoice_lines'
      AND column_name = 'cost_cents'
  ) THEN
    ALTER TABLE public.dispatch_invoice_lines
      ADD COLUMN cost_cents integer NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'dispatch_invoice_lines_cost_cents_nonneg'
      AND conrelid = 'public.dispatch_invoice_lines'::regclass
  ) THEN
    ALTER TABLE public.dispatch_invoice_lines
      ADD CONSTRAINT dispatch_invoice_lines_cost_cents_nonneg
      CHECK (cost_cents IS NULL OR cost_cents >= 0);
  END IF;
END
$$;
