-- LEDGER10B: RPC to update description of ledger entries after posting
-- Constraints:
-- - Only description editable
-- - Block updates for reversal entries and annulée originals
-- - SECURITY DEFINER with minimal scope

CREATE OR REPLACE FUNCTION public.dispatch_update_counterparty_ledger_entry_description(
  p_entry_id uuid,
  p_description text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $func$
DECLARE
  v_is_reversal boolean;
  v_has_reversal boolean;
BEGIN
  IF btrim(COALESCE(p_description, '')) = '' THEN
    RAISE EXCEPTION 'description cannot be empty';
  END IF;

  SELECT (reversal_of_entry_id IS NOT NULL)
  INTO v_is_reversal
  FROM public.dispatch_counterparty_ledger_entries
  WHERE id = p_entry_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Entry not found';
  END IF;
  IF v_is_reversal THEN
    RAISE EXCEPTION 'Cannot edit reversal entry';
  END IF;

  SELECT EXISTS(
    SELECT 1 FROM public.dispatch_counterparty_ledger_entries
    WHERE reversal_of_entry_id = p_entry_id
  )
  INTO v_has_reversal;

  IF v_has_reversal THEN
    RAISE EXCEPTION 'Cannot edit annulée (reversed) entry';
  END IF;

  UPDATE public.dispatch_counterparty_ledger_entries
  SET description = btrim(p_description)
  WHERE id = p_entry_id
    AND status = 'posted';

  RETURN true;
END;
$func$;
REVOKE ALL ON FUNCTION public.dispatch_update_counterparty_ledger_entry_description(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dispatch_update_counterparty_ledger_entry_description(uuid, text) TO authenticated;
