-- Add soft delete (archive) capability to dossiers

-- Add archived_at column
ALTER TABLE public.dispatch_dossiers
  ADD COLUMN IF NOT EXISTS archived_at timestamptz NULL;
-- Create index for filtering non-archived dossiers
CREATE INDEX IF NOT EXISTS idx_dossiers_archived_at
  ON public.dispatch_dossiers(archived_at)
  WHERE archived_at IS NULL;
-- RPC to archive a dossier
CREATE OR REPLACE FUNCTION public.archive_dossier(p_dossier_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_dossier_exists boolean;
  v_already_archived boolean;
  v_has_invoiced boolean;
BEGIN
  -- Check if dossier exists
  SELECT EXISTS(
    SELECT 1 FROM dispatch_dossiers WHERE id = p_dossier_id
  ) INTO v_dossier_exists;

  IF NOT v_dossier_exists THEN
    RAISE EXCEPTION 'Dossier not found';
  END IF;

  -- Check if already archived (idempotent - just return)
  SELECT archived_at IS NOT NULL
  FROM dispatch_dossiers
  WHERE id = p_dossier_id
  INTO v_already_archived;

  IF v_already_archived THEN
    RETURN; -- Already archived, no-op
  END IF;

  -- Guardrail: refuse if dossier has invoices with invoice_number
  SELECT EXISTS(
    SELECT 1
    FROM dispatch_invoices
    WHERE dossier_id = p_dossier_id
      AND invoice_number IS NOT NULL
      AND invoice_number != ''
  ) INTO v_has_invoiced;

  IF v_has_invoiced THEN
    RAISE EXCEPTION 'Cannot archive dossier with issued invoices';
  END IF;

  -- Archive the dossier
  UPDATE dispatch_dossiers
  SET archived_at = now()
  WHERE id = p_dossier_id;
END;
$$;
-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.archive_dossier(uuid) TO authenticated;
-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
