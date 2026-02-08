-- RESEND02F5-DB: RPC to update counterparty email
-- Enables editing email for existing counterparties.
-- This is needed to fix email gaps for existing partner entities.

CREATE OR REPLACE FUNCTION public.dispatch_set_counterparty_email(
  p_counterparty_id uuid,
  p_email text DEFAULT NULL
)
RETURNS public.dispatch_counterparties
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email text;
  v_row public.dispatch_counterparties;
BEGIN
  -- Trim email (null/empty -> null)
  v_email := NULLIF(btrim(p_email), '');

  -- Update and return the row
  UPDATE public.dispatch_counterparties
  SET email = v_email
  WHERE id = p_counterparty_id
  RETURNING * INTO v_row;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Counterparty not found: %', p_counterparty_id;
  END IF;

  RETURN v_row;
END;
$$;
REVOKE ALL ON FUNCTION public.dispatch_set_counterparty_email(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dispatch_set_counterparty_email(uuid, text) TO authenticated;
