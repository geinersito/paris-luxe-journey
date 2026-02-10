-- BOOKING-DB-ANTI-DOUBLEBOOK-01b (DB-only)
-- Add service_end_datetime + is_active + EXCLUDE USING gist to prevent
-- overlapping bookings for the same vehicle.
--
-- Backfill: all rows get pickup_datetime + interval '2 hours' as placeholder.
-- Rows with NULL pickup_datetime get created_at + 2h as safe default.
-- App PR (01b-APP) will set real service_end_datetime on new inserts.
--
-- Rollback:
--   ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_no_overlap_per_vehicle;
--   DROP TRIGGER IF EXISTS trg_bookings_sync_is_active ON public.bookings;
--   DROP FUNCTION IF EXISTS fn_bookings_sync_is_active();
--   ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_service_end_after_pickup;
--   ALTER TABLE public.bookings DROP COLUMN IF EXISTS is_active;
--   ALTER TABLE public.bookings DROP COLUMN IF EXISTS service_end_datetime;

-- 1) Enable btree_gist (required for mixing equality + range in EXCLUDE)
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- 2) Add service_end_datetime (nullable first for backfill)
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS service_end_datetime timestamptz;

-- 3) Add is_active (derived from status; used in EXCLUDE to ignore cancelled)
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- 4) Backfill service_end_datetime
--    All rows: pickup_datetime + 2h (conservative placeholder)
UPDATE public.bookings
SET service_end_datetime = pickup_datetime + interval '2 hours'
WHERE service_end_datetime IS NULL
  AND pickup_datetime IS NOT NULL;

-- For rows with NULL pickup_datetime, use created_at as fallback
UPDATE public.bookings
SET service_end_datetime = COALESCE(created_at, now()) + interval '2 hours'
WHERE service_end_datetime IS NULL;

-- 5) Backfill is_active from status
UPDATE public.bookings
SET is_active = (status IS DISTINCT FROM 'cancelled');

-- 6) Make service_end_datetime NOT NULL
ALTER TABLE public.bookings
  ALTER COLUMN service_end_datetime SET NOT NULL;

-- 7) CHECK: end must be after start (only enforced when pickup_datetime is not null)
ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_service_end_after_pickup
  CHECK (pickup_datetime IS NULL OR service_end_datetime > pickup_datetime);

-- 8) Trigger to keep is_active in sync with status
CREATE OR REPLACE FUNCTION fn_bookings_sync_is_active()
RETURNS trigger AS $$
BEGIN
  NEW.is_active := (NEW.status IS DISTINCT FROM 'cancelled');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_bookings_sync_is_active
  BEFORE INSERT OR UPDATE OF status ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION fn_bookings_sync_is_active();

-- 9) EXCLUDE constraint: no overlapping active bookings per vehicle
--    Only applies when vehicle_id AND pickup_datetime are NOT NULL
--    (PostgreSQL GiST excludes NULLs automatically from the constraint)
--
--    is_active WITH = means: conflict only when both rows have same is_active value.
--    active+active overlapping   → BLOCKED  (desired)
--    active+cancelled overlapping → ALLOWED  (desired)
--    cancelled+cancelled overlap  → BLOCKED  (harmless, practically impossible)
ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_no_overlap_per_vehicle
  EXCLUDE USING gist (
    vehicle_id WITH =,
    is_active WITH =,
    tstzrange(pickup_datetime, service_end_datetime, '[)') WITH &&
  );
