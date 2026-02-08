-- LEDGER07A: Aggregated receivables KPIs RPC for Dashboard
-- Provides DSO estimate and overdue ratio in a single call
-- Replaces need to aggregate counterparty aging on client side

CREATE OR REPLACE FUNCTION public.dispatch_get_receivables_kpis(
  p_billing_entity_id uuid,
  p_as_of date DEFAULT CURRENT_DATE
)
RETURNS TABLE(
  ar_total_cents bigint,
  ar_overdue_cents bigint,
  ar_overdue_ratio_bps int,
  dso_days numeric(6,2)
)
SECURITY DEFINER
SET search_path = public
LANGUAGE sql
STABLE
AS $func$
  WITH aging_buckets AS (
    -- Aggregate all counterparty ledger entries into aging buckets
    SELECT
      COALESCE(SUM(CASE WHEN age_days BETWEEN 0 AND 30 THEN delta_balance_cents ELSE 0 END), 0) AS bucket_0_30,
      COALESCE(SUM(CASE WHEN age_days BETWEEN 31 AND 60 THEN delta_balance_cents ELSE 0 END), 0) AS bucket_31_60,
      COALESCE(SUM(CASE WHEN age_days BETWEEN 61 AND 90 THEN delta_balance_cents ELSE 0 END), 0) AS bucket_61_90,
      COALESCE(SUM(CASE WHEN age_days >= 91 THEN delta_balance_cents ELSE 0 END), 0) AS bucket_90_plus,
      COALESCE(SUM(delta_balance_cents), 0) AS total_ar
    FROM (
      SELECT
        delta_balance_cents,
        GREATEST(0, (p_as_of - occurred_at::date))::int AS age_days
      FROM public.dispatch_counterparty_ledger_entries
      WHERE status = 'posted'
        AND billing_entity_id = p_billing_entity_id
    ) AS entries
  ),
  kpi_calc AS (
    SELECT
      -- Total AR (only positive balances count as receivables)
      GREATEST(ab.total_ar, 0) AS ar_total,
      -- Overdue = 31+ days (sum of 31-60, 61-90, 90+)
      GREATEST(ab.bucket_31_60 + ab.bucket_61_90 + ab.bucket_90_plus, 0) AS ar_overdue,
      -- Bucket values for DSO weighted average
      ab.bucket_0_30,
      ab.bucket_31_60,
      ab.bucket_61_90,
      ab.bucket_90_plus,
      ab.total_ar
    FROM aging_buckets ab
  )
  SELECT
    kc.ar_total::bigint AS ar_total_cents,
    kc.ar_overdue::bigint AS ar_overdue_cents,
    -- Overdue ratio in basis points (0-10000)
    CASE
      WHEN kc.ar_total > 0
      THEN ROUND(10000.0 * kc.ar_overdue / kc.ar_total)::int
      ELSE 0
    END AS ar_overdue_ratio_bps,
    -- DSO estimate using weighted average of bucket midpoints
    -- Midpoints: 0-30 = 15 days, 31-60 = 45 days, 61-90 = 75 days, 90+ = 105 days
    CASE
      WHEN kc.ar_total > 0
      THEN ROUND(
        (
          kc.bucket_0_30 * 15.0 +
          kc.bucket_31_60 * 45.0 +
          kc.bucket_61_90 * 75.0 +
          kc.bucket_90_plus * 105.0
        ) / kc.ar_total,
        2
      )::numeric(6,2)
      ELSE 0.00
    END AS dso_days
  FROM kpi_calc kc
$func$;
-- Security hardening
REVOKE ALL ON FUNCTION public.dispatch_get_receivables_kpis(uuid, date) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dispatch_get_receivables_kpis(uuid, date) TO authenticated;
