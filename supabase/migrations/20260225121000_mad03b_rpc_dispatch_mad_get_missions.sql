-- MAD03B: RPC read-model for MAD missions with tronçons
-- Returns missions grouped by mad_mission_id with aggregated totals
-- Note: total_price is the FULL mission total (all tronçons), not just those in range

CREATE OR REPLACE FUNCTION public.dispatch_mad_get_missions(
  p_range_start timestamptz,
  p_range_end timestamptz,
  p_cutoff timestamptz DEFAULT now()
)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- Tronçons within the requested range (for display)
  WITH troncons_in_range AS (
    SELECT
      s.id,
      s.mad_mission_id,
      s.client_id,
      s.origin,
      s.destination,
      s.status,
      s.start_datetime,
      s.end_datetime,
      s.price,
      s.type,
      s.date,
      s.pax,
      s.driver_id
    FROM public.dispatch_services s
    WHERE s.type = 'DISPO'
      AND s.mad_mission_id IS NOT NULL
      AND s.archived_at IS NULL
      AND s.start_datetime >= p_range_start
      AND s.start_datetime < p_range_end
      AND s.start_datetime <= p_cutoff
  ),
  -- All tronçons for missions that have at least one in range (for full totals)
  all_mission_troncons AS (
    SELECT
      s.mad_mission_id,
      s.client_id,
      s.start_datetime,
      s.end_datetime,
      s.price
    FROM public.dispatch_services s
    WHERE s.type = 'DISPO'
      AND s.archived_at IS NULL
      AND s.mad_mission_id IN (SELECT DISTINCT mad_mission_id FROM troncons_in_range)
  ),
  -- Full mission aggregates (total across ALL tronçons)
  mission_totals AS (
    SELECT
      mad_mission_id,
      (array_agg(client_id ORDER BY start_datetime))[1] AS client_id,
      min(start_datetime) AS first_start,
      max(end_datetime) AS last_end,
      sum(COALESCE(price, 0)) AS total_price,
      count(*) AS total_troncons_count
    FROM all_mission_troncons
    GROUP BY mad_mission_id
  ),
  -- Range-specific counts
  range_counts AS (
    SELECT
      mad_mission_id,
      count(*) AS troncons_count
    FROM troncons_in_range
    GROUP BY mad_mission_id
  )
  SELECT jsonb_build_object(
    'missions',
    COALESCE(jsonb_agg(
      jsonb_build_object(
        'mad_mission_id', mt.mad_mission_id,
        'client_id', mt.client_id,
        'first_start', mt.first_start,
        'last_end', mt.last_end,
        'total_price', mt.total_price,
        'troncons_count', rc.troncons_count,
        'total_troncons_count', mt.total_troncons_count,
        'troncons', (
          SELECT COALESCE(jsonb_agg(jsonb_build_object(
            'id', t.id,
            'status', t.status,
            'start_datetime', t.start_datetime,
            'end_datetime', t.end_datetime,
            'origin', t.origin,
            'destination', t.destination,
            'price', t.price,
            'type', t.type,
            'pax', t.pax,
            'driver_id', t.driver_id
          ) ORDER BY t.start_datetime), '[]'::jsonb)
          FROM troncons_in_range t
          WHERE t.mad_mission_id = mt.mad_mission_id
        )
      )
    ORDER BY mt.first_start), '[]'::jsonb)
  )
  FROM mission_totals mt
  JOIN range_counts rc ON rc.mad_mission_id = mt.mad_mission_id;
$$;
-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.dispatch_mad_get_missions(timestamptz, timestamptz, timestamptz) TO authenticated;
-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
