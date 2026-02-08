CREATE OR REPLACE FUNCTION public.dispatch_get_counterparty_aging(
  p_billing_entity_id uuid,
  p_as_of date DEFAULT (now()::date)
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
AS $func$
  SELECT
    e.counterparty_id,
    COALESCE(SUM(CASE WHEN age_days BETWEEN 0 AND 30 THEN e.delta_balance_cents ELSE 0 END), 0) AS bucket_0_30_cents,
    COALESCE(SUM(CASE WHEN age_days BETWEEN 31 AND 60 THEN e.delta_balance_cents ELSE 0 END), 0) AS bucket_31_60_cents,
    COALESCE(SUM(CASE WHEN age_days BETWEEN 61 AND 90 THEN e.delta_balance_cents ELSE 0 END), 0) AS bucket_61_90_cents,
    COALESCE(SUM(CASE WHEN age_days >= 91 THEN e.delta_balance_cents ELSE 0 END), 0) AS bucket_90_plus_cents,
    COALESCE(SUM(e.delta_balance_cents), 0) AS balance_cents
  FROM (
    SELECT
      counterparty_id,
      delta_balance_cents,
      GREATEST(0, (p_as_of - occurred_at::date))::int AS age_days
    FROM public.dispatch_counterparty_ledger_entries
    WHERE status = 'posted'
      AND billing_entity_id = p_billing_entity_id
  ) AS e
  GROUP BY e.counterparty_id
  ORDER BY e.counterparty_id
$func$;
REVOKE ALL ON FUNCTION public.dispatch_get_counterparty_aging(uuid, date) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dispatch_get_counterparty_aging(uuid, date) TO authenticated;
