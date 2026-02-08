-- COUNTERPARTIES02A: RPC to create counterparties safely
-- Returns the new row on success; raises on validation failure.

CREATE OR REPLACE FUNCTION public.dispatch_create_counterparty(
  p_name text,
  p_type text,
  p_default_currency text DEFAULT 'EUR'
)
RETURNS public.dispatch_counterparties
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_name text;
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

  -- Insert and return the new row
  INSERT INTO public.dispatch_counterparties (name, type, default_currency)
  VALUES (v_name, p_type, COALESCE(p_default_currency, 'EUR'))
  RETURNING * INTO v_row;

  RETURN v_row;
END;
$$;
REVOKE ALL ON FUNCTION public.dispatch_create_counterparty(text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dispatch_create_counterparty(text, text, text) TO authenticated;
