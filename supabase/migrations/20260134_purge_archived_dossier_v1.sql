-- Safe purge RPC for archived dossiers
-- Strict guards: only allows purge if dossier has no linked invoices or services

CREATE OR REPLACE FUNCTION public.purge_archived_dossier(p_dossier_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_dossier_exists boolean;
  v_is_archived boolean;
  v_has_invoices boolean;
  v_has_services boolean;
BEGIN
  -- Check if dossier exists
  SELECT EXISTS(
    SELECT 1 FROM dispatch_dossiers WHERE id = p_dossier_id
  ) INTO v_dossier_exists;

  IF NOT v_dossier_exists THEN
    RAISE EXCEPTION 'Dossier not found';
  END IF;

  -- Check if dossier is archived
  SELECT archived_at IS NOT NULL
  FROM dispatch_dossiers
  WHERE id = p_dossier_id
  INTO v_is_archived;

  IF NOT v_is_archived THEN
    RAISE EXCEPTION 'Cannot purge: dossier is not archived';
  END IF;

  -- Check for linked invoices (any invoice, including drafts)
  SELECT EXISTS(
    SELECT 1
    FROM dispatch_invoices
    WHERE dossier_id = p_dossier_id
  ) INTO v_has_invoices;

  IF v_has_invoices THEN
    RAISE EXCEPTION 'Cannot purge: dossier has linked invoices';
  END IF;

  -- Check for linked services
  SELECT EXISTS(
    SELECT 1
    FROM dispatch_services
    WHERE dossier_id = p_dossier_id
  ) INTO v_has_services;

  IF v_has_services THEN
    RAISE EXCEPTION 'Cannot purge: dossier has linked services';
  END IF;

  -- All guards passed - safe to delete
  DELETE FROM dispatch_dossier_tasks WHERE dossier_id = p_dossier_id;
  DELETE FROM dispatch_dossiers WHERE id = p_dossier_id;
END;
$$;
-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.purge_archived_dossier(uuid) TO authenticated;
-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
