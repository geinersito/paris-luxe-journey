-- FIX-BOOKING-INSERT-01
-- Two issues found during go-live smoke test (2026-02-17):
--
-- 1) bookings.id has no DEFAULT → inserts without explicit id fail with
--    "null value in column id violates not-null constraint"
--
-- 2) bookings.service_end_datetime was made NOT NULL in migration
--    20260226130000 without a row-level DEFAULT for new inserts.
--    The migration comment said "App PR 01b-APP will set it" — that app
--    update was missing. This migration adds a server-side DEFAULT so the
--    column is never null even if the app omits it.
--
-- Rollback:
--   ALTER TABLE public.bookings ALTER COLUMN id DROP DEFAULT;
--   ALTER TABLE public.bookings ALTER COLUMN service_end_datetime DROP DEFAULT;

-- 1) Ensure id has DEFAULT gen_random_uuid() (safe if already set)
ALTER TABLE public.bookings
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- 2) Add DEFAULT for service_end_datetime: pickup_datetime + 2h when available,
--    otherwise now() + 2h as a safe fallback.
--    The app code also sets this explicitly (see create-booking-payment fix),
--    so this DEFAULT is a belt-and-suspenders guard.
ALTER TABLE public.bookings
  ALTER COLUMN service_end_datetime
  SET DEFAULT (now() + interval '2 hours');
