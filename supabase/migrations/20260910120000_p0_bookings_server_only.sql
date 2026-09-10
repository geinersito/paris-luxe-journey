-- P0-DATA-API-BOOKINGS-01B
-- The active booking flow creates and updates bookings through Edge Functions.
-- Remove direct browser CRUD while preserving server-side access.

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

REVOKE SELECT, INSERT, UPDATE, DELETE
  ON TABLE public.bookings
  FROM anon, authenticated;

-- Fail closed if production differs from the investigated precondition.
DO $$
BEGIN
  IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.bookings'::regclass) THEN
    RAISE EXCEPTION 'bookings RLS was not enabled';
  END IF;

  IF (SELECT relforcerowsecurity FROM pg_class WHERE oid = 'public.bookings'::regclass) THEN
    RAISE EXCEPTION 'bookings FORCE RLS changed unexpectedly';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM pg_policy
    WHERE polrelid = 'public.bookings'::regclass
  ) THEN
    RAISE EXCEPTION 'bookings policies exist; refusing to alter an unreviewed policy set';
  END IF;

  IF has_table_privilege('anon', 'public.bookings', 'select')
     OR has_table_privilege('anon', 'public.bookings', 'insert')
     OR has_table_privilege('anon', 'public.bookings', 'update')
     OR has_table_privilege('anon', 'public.bookings', 'delete')
     OR has_table_privilege('authenticated', 'public.bookings', 'select')
     OR has_table_privilege('authenticated', 'public.bookings', 'insert')
     OR has_table_privilege('authenticated', 'public.bookings', 'update')
     OR has_table_privilege('authenticated', 'public.bookings', 'delete') THEN
    RAISE EXCEPTION 'client CRUD grants remain on bookings';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgrelid = 'public.bookings'::regclass
      AND tgname = 'trg_bookings_sync_is_active'
      AND NOT tgisinternal
  ) THEN
    RAISE EXCEPTION 'booking status trigger is missing';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.bookings'::regclass
      AND conname = 'bookings_service_end_after_pickup'
  ) THEN
    RAISE EXCEPTION 'booking service-end constraint is missing';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.bookings'::regclass
      AND conname = 'bookings_no_overlap_per_vehicle'
  ) THEN
    RAISE EXCEPTION 'booking overlap constraint is missing';
  END IF;

  IF to_regclass('public.bookings_unique_vehicle_pickup_active') IS NULL THEN
    RAISE EXCEPTION 'booking uniqueness index is missing';
  END IF;
END
$$;
