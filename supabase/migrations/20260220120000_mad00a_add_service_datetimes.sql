-- MAD00A-DB: Add start/end datetimes for MAD (DISPO) workflow
-- PR: db/mad00a-service-datetimes
-- Notes:
-- - Keep columns nullable for backward compatibility.
-- - Backfill start_datetime from scheduled_pickup or date + time_pickup when safe.

ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS start_datetime timestamptz,
  ADD COLUMN IF NOT EXISTS end_datetime timestamptz;
-- Backfill from scheduled_pickup when available.
UPDATE public.dispatch_services
SET start_datetime = scheduled_pickup
WHERE start_datetime IS NULL
  AND scheduled_pickup IS NOT NULL;
-- Backfill from date + time_pickup when time_pickup is in HH:mm or HH:mm:ss.
UPDATE public.dispatch_services
SET start_datetime = (date + time_pickup::time)::timestamptz
WHERE start_datetime IS NULL
  AND date IS NOT NULL
  AND time_pickup IS NOT NULL
  AND time_pickup ~ '^([01][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$';
CREATE INDEX IF NOT EXISTS idx_dispatch_services_start_datetime
  ON public.dispatch_services (start_datetime);
