-- RESEND02F2-DB: Add optional email parameter to dispatch_create_counterparty
-- Enables UI to set dispatch_counterparties.email at creation time.
-- Consistent with constraint dcp_email_format_chk from migration 20260118131813.

CREATE OR REPLACE FUNCTION public.dispatch_create_counterparty(
  p_name text,
  p_type text,
  p_default_currency text DEFAULT 'EUR',
  p_email text DEFAULT NULL
)
RETURNS public.dispatch_counterparties
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_name text;
  v_email text;
  v_row public.dispatch_counterparties;
BEGIN
  -- Trim and validate name
  v_name := btrim(p_name);
  IF v_name IS NULL OR v_name = '' THEN
    RAISE EXCEPTION 'name cannot be empty';
  END IF;

  -- Validate type against allowed values
  IF p_type NOT IN ('partner', 'agency', 'supplier', 'other') THEN
    RAISE EXCEPTION 'Invalid type: %. Allowed: partner, agency, supplier, other', p_type;
  END IF;

  -- Trim email (null/empty -> null)
  v_email := NULLIF(btrim(p_email), '');

  -- Insert and return the new row
  INSERT INTO public.dispatch_counterparties (name, type, default_currency, email)
  VALUES (v_name, p_type, COALESCE(p_default_currency, 'EUR'), v_email)
  RETURNING * INTO v_row;

  RETURN v_row;
END;
$$;
-- Re-grant after replace
REVOKE ALL ON FUNCTION public.dispatch_create_counterparty(text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dispatch_create_counterparty(text, text, text, text) TO authenticated;
NOTIFY pgrst, 'reload schema';
