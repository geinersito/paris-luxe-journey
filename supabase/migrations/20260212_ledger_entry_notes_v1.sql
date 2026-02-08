-- LEDGER10D1: Notes table for posted ledger entries (DB-only)
-- Does not mutate ledger rows; stores editable notes per entry

CREATE TABLE IF NOT EXISTS public.dispatch_counterparty_ledger_entry_notes (
  entry_id uuid PRIMARY KEY REFERENCES public.dispatch_counterparty_ledger_entries(id) ON DELETE CASCADE,
  note text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid NULL DEFAULT auth.uid()
);
ALTER TABLE public.dispatch_counterparty_ledger_entry_notes ENABLE ROW LEVEL SECURITY;
-- Policies: align with ledger visibility; minimal scope
DROP POLICY IF EXISTS dclen_select_auth ON public.dispatch_counterparty_ledger_entry_notes;
CREATE POLICY dclen_select_auth ON public.dispatch_counterparty_ledger_entry_notes
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.dispatch_counterparty_ledger_entries e
      WHERE e.id = public.dispatch_counterparty_ledger_entry_notes.entry_id
    )
  );
DROP POLICY IF EXISTS dclen_upsert_auth ON public.dispatch_counterparty_ledger_entry_notes;
CREATE POLICY dclen_upsert_auth ON public.dispatch_counterparty_ledger_entry_notes
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.dispatch_counterparty_ledger_entries e
      WHERE e.id = public.dispatch_counterparty_ledger_entry_notes.entry_id
    )
  );
CREATE POLICY dclen_update_auth ON public.dispatch_counterparty_ledger_entry_notes
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.dispatch_counterparty_ledger_entries e
      WHERE e.id = public.dispatch_counterparty_ledger_entry_notes.entry_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.dispatch_counterparty_ledger_entries e
      WHERE e.id = public.dispatch_counterparty_ledger_entry_notes.entry_id
    )
  );
-- RPC: set note with upsert; blocks reversal and annulée
CREATE OR REPLACE FUNCTION public.dispatch_set_counterparty_ledger_entry_note(
  p_entry_id uuid,
  p_note text
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
  IF btrim(COALESCE(p_note, '')) = '' THEN
    RAISE EXCEPTION 'note cannot be empty';
  END IF;

  SELECT (reversal_of_entry_id IS NOT NULL)
  INTO v_is_reversal
  FROM public.dispatch_counterparty_ledger_entries
  WHERE id = p_entry_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Entry not found';
  END IF;
  IF v_is_reversal THEN
    RAISE EXCEPTION 'Cannot set note on reversal entry';
  END IF;

  SELECT EXISTS(
    SELECT 1 FROM public.dispatch_counterparty_ledger_entries
    WHERE reversal_of_entry_id = p_entry_id
  )
  INTO v_has_reversal;

  IF v_has_reversal THEN
    RAISE EXCEPTION 'Cannot set note on annulée (reversed) entry';
  END IF;

  INSERT INTO public.dispatch_counterparty_ledger_entry_notes (entry_id, note, updated_at, updated_by)
  VALUES (p_entry_id, btrim(p_note), now(), auth.uid())
  ON CONFLICT (entry_id) DO UPDATE
    SET note = EXCLUDED.note,
        updated_at = now(),
        updated_by = auth.uid();

  RETURN true;
END;
$func$;
REVOKE ALL ON FUNCTION public.dispatch_set_counterparty_ledger_entry_note(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dispatch_set_counterparty_ledger_entry_note(uuid, text) TO authenticated;
