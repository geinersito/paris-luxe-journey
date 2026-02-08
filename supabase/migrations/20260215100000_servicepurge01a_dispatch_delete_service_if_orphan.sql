-- SERVICEPURGE01A: Safe purge RPC for archived orphan services
-- Deletes a service only when archived and without dependencies.

CREATE OR REPLACE FUNCTION public.dispatch_delete_service_if_orphan(p_service_id uuid)
RETURNS TABLE (ok boolean, error_code text, error_message text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_archived_at timestamptz;
  v_order_id uuid;
  v_dossier_id uuid;
  v_has_invoice boolean := false;
  v_has_service_id_column boolean := false;
  v_deleted int := 0;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN QUERY SELECT false, 'UNAUTHENTICATED', 'Utilisateur non authentifie.';
    RETURN;
  END IF;

  SELECT archived_at, order_id, dossier_id
  INTO v_archived_at, v_order_id, v_dossier_id
  FROM public.dispatch_services
  WHERE id = p_service_id;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 'NOT_FOUND', 'Service introuvable.';
    RETURN;
  END IF;

  IF v_archived_at IS NULL THEN
    RETURN QUERY SELECT false, 'NOT_ARCHIVED', 'Le service doit etre archive.';
    RETURN;
  END IF;

  IF v_order_id IS NOT NULL OR v_dossier_id IS NOT NULL THEN
    RETURN QUERY SELECT false, 'HAS_DEPENDENCIES', 'Le service est lie a une dependance.';
    RETURN;
  END IF;

  IF to_regclass('public.dispatch_invoice_lines') IS NOT NULL THEN
    SELECT EXISTS(
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'dispatch_invoice_lines'
        AND column_name = 'service_id'
    ) INTO v_has_service_id_column;

    IF v_has_service_id_column THEN
      SELECT EXISTS(
        SELECT 1
        FROM public.dispatch_invoice_lines
        WHERE service_id = p_service_id
        LIMIT 1
      ) INTO v_has_invoice;
    END IF;
  END IF;

  IF v_has_invoice THEN
    RETURN QUERY SELECT false, 'HAS_INVOICE', 'Le service est lie a une facture.';
    RETURN;
  END IF;

  BEGIN
    DELETE FROM public.dispatch_services
    WHERE id = p_service_id
      AND archived_at IS NOT NULL;

    GET DIAGNOSTICS v_deleted = ROW_COUNT;
    IF v_deleted = 0 THEN
      RETURN QUERY SELECT false, 'NOT_FOUND', 'Service introuvable.';
      RETURN;
    END IF;

    RETURN QUERY SELECT true, NULL, NULL;
  EXCEPTION
    WHEN foreign_key_violation THEN
      RETURN QUERY SELECT false, 'HAS_DEPENDENCIES', 'Le service est lie a une dependance.';
      RETURN;
  END;
END;
$$;
GRANT EXECUTE ON FUNCTION public.dispatch_delete_service_if_orphan(uuid) TO authenticated;
NOTIFY pgrst, 'reload schema';
