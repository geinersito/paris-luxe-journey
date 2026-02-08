-- DRIFT02: Add single-param wrapper for dispatch_get_counterparty_aging
-- PostgREST cannot resolve functions with DEFAULT params when called with fewer args.
-- This wrapper provides the exact signature the UI is calling.

CREATE OR REPLACE FUNCTION public.dispatch_get_counterparty_aging(
  p_billing_entity_id uuid
)
RETURNS TABLE(
  counterparty_id uuid,
  bucket_0_30_cents bigint,
  bucket_31_60_cents bigint,
  bucket_61_90_cents bigint,
  bucket_90_plus_cents bigint,
  balance_cents bigint
)
SECURITY DEFINER
SET search_path = public
LANGUAGE sql
STABLE
AS $$
  SELECT * FROM public.dispatch_get_counterparty_aging(p_billing_entity_id, CURRENT_DATE);
$$;
REVOKE ALL ON FUNCTION public.dispatch_get_counterparty_aging(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dispatch_get_counterparty_aging(uuid) TO authenticated;
