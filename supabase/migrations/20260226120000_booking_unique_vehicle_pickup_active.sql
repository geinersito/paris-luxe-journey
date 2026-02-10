-- BOOKING-DB-ANTI-DOUBLEBOOK-01a
-- Prevent identical double-bookings: same vehicle + same pickup_datetime
-- in any active status (everything except 'cancelled').
--
-- This is an incremental guard (Opción 2). It stops race-condition duplicates
-- (double-click, retry, concurrent inserts) but does NOT prevent overlapping
-- time ranges. A full EXCLUDE USING gist with tstzrange requires adding a
-- service_end_datetime column first (planned as BOOKING-DB-ANTI-DOUBLEBOOK-01b).
--
-- Rollback: DROP INDEX IF EXISTS bookings_unique_vehicle_pickup_active;

CREATE UNIQUE INDEX IF NOT EXISTS bookings_unique_vehicle_pickup_active
ON public.bookings (vehicle_id, pickup_datetime)
WHERE status != 'cancelled';
