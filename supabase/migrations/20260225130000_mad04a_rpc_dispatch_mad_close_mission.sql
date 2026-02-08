-- MAD04A-DB: RPC to close a MAD mission by setting end_datetime on last tronçon
-- Prevents closing already-closed missions and validates temporal constraints

CREATE OR REPLACE FUNCTION public.dispatch_mad_close_mission(
  p_mad_mission_id uuid,
  p_end_at timestamptz
)
RETURNS jsonb
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  v_last_troncon record;
BEGIN
  -- Validate user is authenticated
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION USING
      ERRCODE = 'P0001',
      MESSAGE = 'User not authenticated';
  END IF;

  -- Find last active tronçon for this mission
  SELECT id, start_datetime, end_datetime
  INTO v_last_troncon
  FROM public.dispatch_services
  WHERE mad_mission_id = p_mad_mission_id
    AND type = 'DISPO'
    AND archived_at IS NULL
  ORDER BY start_datetime DESC, id DESC
  LIMIT 1;

  -- Mission not found or has no active troncons
  IF NOT FOUND THEN
    RAISE EXCEPTION USING
      ERRCODE = 'P0001',
      MESSAGE = 'MAD mission not found or has no active troncons';
  END IF;

  -- Mission already closed
  IF v_last_troncon.end_datetime IS NOT NULL THEN
    RAISE EXCEPTION USING
      ERRCODE = 'P0001',
      MESSAGE = 'MAD mission already closed';
  END IF;

  -- Validate end_at >= start_datetime
  IF p_end_at < v_last_troncon.start_datetime THEN
    RAISE EXCEPTION USING
      ERRCODE = 'P0001',
      MESSAGE = 'end_at must be >= last troncon start';
  END IF;

  -- Update last tronçon end_datetime (RLS applies as INVOKER)
  UPDATE public.dispatch_services
  SET end_datetime = p_end_at
  WHERE id = v_last_troncon.id;

  -- Return success with details
  RETURN jsonb_build_object(
    'ok', true,
    'mission_id', p_mad_mission_id,
    'last_troncon_id', v_last_troncon.id,
    'end_datetime', p_end_at
  );
END;
$$;
-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.dispatch_mad_close_mission(uuid, timestamptz) TO authenticated;
-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
