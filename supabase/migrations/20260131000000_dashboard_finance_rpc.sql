-- DATA01A: Finance dashboard RPC (series + aggregates + previous period)
-- Exposes a JSON payload with:
--  - series: daily CA / encaisse / solde over the last p_days
--  - aggregates: month-to-date totals
--  - previous: previous-period totals (previous month-to-date, same day cutoff)

CREATE OR REPLACE FUNCTION public.dispatch_finance_dashboard(p_days integer DEFAULT 30)
RETURNS jsonb
LANGUAGE sql
SECURITY INVOKER
SET search_path = public
AS $$
WITH params AS (
  SELECT GREATEST(COALESCE(p_days, 30), 1) AS days
),
today_paris AS (
  SELECT timezone('Europe/Paris', now())::date AS today
),
month_start AS (
  SELECT date_trunc('month', timezone('Europe/Paris', now()))::date AS start_month
),
date_bounds AS (
  SELECT
    tp.today AS end_date,
    (tp.today - (params.days - 1) * INTERVAL '1 day')::date AS start_date
  FROM params, today_paris tp
),
series_dates AS (
  SELECT generate_series(db.start_date, db.end_date, INTERVAL '1 day')::date AS day
  FROM date_bounds db
),
invoice_base AS (
  -- Only issued invoices (invoice_number present)
  SELECT
    COALESCE(timezone('Europe/Paris', i.issued_at)::date, timezone('Europe/Paris', i.created_at)::date) AS day,
    COALESCE(i.total_ttc, 0) AS total
  FROM public.dispatch_invoices i
  WHERE COALESCE(i.invoice_number, '') <> ''
),
payment_base AS (
  SELECT
    COALESCE(timezone('Europe/Paris', p.paid_at)::date, timezone('Europe/Paris', p.created_at)::date) AS day,
    COALESCE(p.amount, 0) AS amount
  FROM public.dispatch_invoice_payments p
),
series AS (
  SELECT
    sd.day,
    COALESCE(SUM(ib.total), 0) AS ca,
    COALESCE(SUM(pb.amount), 0) AS encaisse
  FROM series_dates sd
  LEFT JOIN invoice_base ib ON ib.day = sd.day
  LEFT JOIN payment_base pb ON pb.day = sd.day
  GROUP BY sd.day
  ORDER BY sd.day
),
series_enriched AS (
  SELECT
    day,
    ca,
    encaisse,
    SUM(ca) OVER (ORDER BY day ROWS UNBOUNDED PRECEDING)
      - SUM(encaisse) OVER (ORDER BY day ROWS UNBOUNDED PRECEDING) AS solde
  FROM series
),
current_mtd AS (
  SELECT ms.start_month AS start_date, tp.today AS end_date
  FROM month_start ms, today_paris tp
),
previous_mtd AS (
  -- Previous month, same day-of-month cutoff as today
  SELECT
    (ms.start_month - INTERVAL '1 month')::date AS start_date,
    (ms.start_month - INTERVAL '1 month')::date
      + (tp.today - ms.start_month) AS end_date
  FROM month_start ms, today_paris tp
),
agg_current AS (
  SELECT
    (SELECT COALESCE(SUM(total), 0)
     FROM invoice_base ib
     JOIN current_mtd c ON ib.day BETWEEN c.start_date AND c.end_date) AS ca_mtd,
    (SELECT COALESCE(SUM(amount), 0)
     FROM payment_base pb
     JOIN current_mtd c ON pb.day BETWEEN c.start_date AND c.end_date) AS encaisse_mtd
),
agg_previous AS (
  SELECT
    (SELECT COALESCE(SUM(total), 0)
     FROM invoice_base ib
     JOIN previous_mtd p ON ib.day BETWEEN p.start_date AND p.end_date) AS ca_prev,
    (SELECT COALESCE(SUM(amount), 0)
     FROM payment_base pb
     JOIN previous_mtd p ON pb.day BETWEEN p.start_date AND p.end_date) AS encaisse_prev
)
SELECT jsonb_build_object(
  'series', (
    SELECT jsonb_agg(
      jsonb_build_object(
        'date', day,
        'ca', ca,
        'encaisse', encaisse,
        'solde', solde
      )
      ORDER BY day
    )
    FROM series_enriched
  ),
  'aggregates', jsonb_build_object(
    'ca_mtd', ac.ca_mtd,
    'encaisse_mtd', ac.encaisse_mtd,
    'solde_mtd', ac.ca_mtd - ac.encaisse_mtd
  ),
  'previous', jsonb_build_object(
    'ca_prev', ap.ca_prev,
    'encaisse_prev', ap.encaisse_prev,
    'solde_prev', ap.ca_prev - ap.encaisse_prev
  )
)
FROM agg_current ac
CROSS JOIN agg_previous ap;
$$;
-- Tighten privileges
REVOKE ALL ON FUNCTION public.dispatch_finance_dashboard(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dispatch_finance_dashboard(integer) TO authenticated;
