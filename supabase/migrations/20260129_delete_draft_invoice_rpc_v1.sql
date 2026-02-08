-- RPC: delete_draft_invoice
-- Safely delete a DRAFT invoice (no number) and its lines atomically
-- For development/testing hygiene - prevents polluting numbering

CREATE OR REPLACE FUNCTION public.delete_draft_invoice(p_invoice_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_status text;
  v_invoice_number text;
BEGIN
  -- Lock the invoice row to prevent concurrent operations
  SELECT status, invoice_number INTO v_status, v_invoice_number
  FROM public.dispatch_invoices
  WHERE id = p_invoice_id
  FOR UPDATE;

  -- Validate invoice exists
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invoice not found';
  END IF;

  -- Only allow delete if draft AND no invoice_number
  IF v_status != 'draft' THEN
    RAISE EXCEPTION 'Cannot delete: invoice is not a draft (status: %)', v_status;
  END IF;

  IF v_invoice_number IS NOT NULL AND v_invoice_number != '' THEN
    RAISE EXCEPTION 'Cannot delete: invoice has been assigned a number';
  END IF;

  -- Delete lines first (FK constraint)
  DELETE FROM public.dispatch_invoice_lines
  WHERE invoice_id = p_invoice_id;

  -- Delete the invoice
  DELETE FROM public.dispatch_invoices
  WHERE id = p_invoice_id;
END;
$$;
-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.delete_draft_invoice(uuid) TO authenticated;
