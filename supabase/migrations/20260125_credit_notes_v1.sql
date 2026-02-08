-- Credit Notes groundwork: document_type + credit_note_of_invoice_id
-- PR24: feat/db-credit-notes-v1

-- 1) Add document_type column with default 'invoice'
ALTER TABLE public.dispatch_invoices
  ADD COLUMN IF NOT EXISTS document_type text NOT NULL DEFAULT 'invoice';
-- 2) Add CHECK constraint for document_type values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'chk_dispatch_invoices_document_type'
      AND conrelid = 'public.dispatch_invoices'::regclass
  ) THEN
    ALTER TABLE public.dispatch_invoices
      ADD CONSTRAINT chk_dispatch_invoices_document_type
      CHECK (document_type IN ('invoice', 'credit_note'));
  END IF;
END
$$;
-- 3) Add credit_note_of_invoice_id column (FK to self)
ALTER TABLE public.dispatch_invoices
  ADD COLUMN IF NOT EXISTS credit_note_of_invoice_id uuid NULL;
-- 4) Add FK constraint to dispatch_invoices(id)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'fk_dispatch_invoices_credit_note_of'
      AND conrelid = 'public.dispatch_invoices'::regclass
  ) THEN
    ALTER TABLE public.dispatch_invoices
      ADD CONSTRAINT fk_dispatch_invoices_credit_note_of
      FOREIGN KEY (credit_note_of_invoice_id)
      REFERENCES public.dispatch_invoices(id)
      ON DELETE RESTRICT;
  END IF;
END
$$;
-- 5) CHECK: credit_note_of_invoice_id only allowed if document_type='credit_note'
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'chk_dispatch_invoices_credit_note_link_type'
      AND conrelid = 'public.dispatch_invoices'::regclass
  ) THEN
    ALTER TABLE public.dispatch_invoices
      ADD CONSTRAINT chk_dispatch_invoices_credit_note_link_type
      CHECK (credit_note_of_invoice_id IS NULL OR document_type = 'credit_note');
  END IF;
END
$$;
-- 6) CHECK: if document_type='credit_note' then credit_note_of_invoice_id must be NOT NULL
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'chk_dispatch_invoices_credit_note_requires_link'
      AND conrelid = 'public.dispatch_invoices'::regclass
  ) THEN
    ALTER TABLE public.dispatch_invoices
      ADD CONSTRAINT chk_dispatch_invoices_credit_note_requires_link
      CHECK (document_type <> 'credit_note' OR credit_note_of_invoice_id IS NOT NULL);
  END IF;
END
$$;
-- 7) Trigger: ensure credit_note_of_invoice_id points to a row with document_type='invoice'
CREATE OR REPLACE FUNCTION public.trg_check_credit_note_target()
RETURNS TRIGGER AS $$
DECLARE
  target_doc_type text;
BEGIN
  -- Only validate when document_type is credit_note and link is provided
  IF NEW.document_type = 'credit_note' AND NEW.credit_note_of_invoice_id IS NOT NULL THEN
    SELECT document_type INTO target_doc_type
    FROM public.dispatch_invoices
    WHERE id = NEW.credit_note_of_invoice_id;

    IF target_doc_type IS NULL THEN
      RAISE EXCEPTION 'credit_note_of_invoice_id references non-existent invoice';
    END IF;

    IF target_doc_type <> 'invoice' THEN
      RAISE EXCEPTION 'credit_note_of_invoice_id must reference a document with document_type=invoice, got %', target_doc_type;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS trg_dispatch_invoices_check_credit_note ON public.dispatch_invoices;
CREATE TRIGGER trg_dispatch_invoices_check_credit_note
  BEFORE INSERT OR UPDATE ON public.dispatch_invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_check_credit_note_target();
-- 8) Index for querying credit notes by their parent invoice
CREATE INDEX IF NOT EXISTS idx_dispatch_invoices_credit_note_of
  ON public.dispatch_invoices (credit_note_of_invoice_id)
  WHERE credit_note_of_invoice_id IS NOT NULL;
