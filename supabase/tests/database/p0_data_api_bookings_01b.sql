-- P0-DATA-API-BOOKINGS-01B database regression.
-- Run with the repository's Supabase pgTAP database harness.

BEGIN;
SELECT plan(19);

SELECT ok(
  (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.bookings'::regclass),
  'bookings has RLS enabled'
);
SELECT ok(
  NOT (SELECT relforcerowsecurity FROM pg_class WHERE oid = 'public.bookings'::regclass),
  'bookings does not enable FORCE RLS'
);
SELECT is(
  (SELECT count(*)::int FROM pg_policy WHERE polrelid = 'public.bookings'::regclass),
  0,
  'bookings has zero client policies'
);

SELECT ok(NOT has_table_privilege('anon', 'public.bookings', 'select'), 'anon SELECT denied');
SELECT ok(NOT has_table_privilege('anon', 'public.bookings', 'insert'), 'anon INSERT denied');
SELECT ok(NOT has_table_privilege('anon', 'public.bookings', 'update'), 'anon UPDATE denied');
SELECT ok(NOT has_table_privilege('anon', 'public.bookings', 'delete'), 'anon DELETE denied');
SELECT ok(NOT has_table_privilege('authenticated', 'public.bookings', 'select'), 'authenticated SELECT denied');
SELECT ok(NOT has_table_privilege('authenticated', 'public.bookings', 'insert'), 'authenticated INSERT denied');
SELECT ok(NOT has_table_privilege('authenticated', 'public.bookings', 'update'), 'authenticated UPDATE denied');
SELECT ok(NOT has_table_privilege('authenticated', 'public.bookings', 'delete'), 'authenticated DELETE denied');

SELECT ok(has_table_privilege('service_role', 'public.bookings', 'select'), 'service_role SELECT preserved');
SELECT ok(has_table_privilege('service_role', 'public.bookings', 'insert'), 'service_role INSERT preserved');
SELECT ok(has_table_privilege('service_role', 'public.bookings', 'update'), 'service_role UPDATE preserved');
SELECT ok(has_table_privilege('service_role', 'public.bookings', 'delete'), 'service_role DELETE preserved');

SELECT ok(EXISTS (
  SELECT 1 FROM pg_trigger
  WHERE tgrelid = 'public.bookings'::regclass
    AND tgname = 'trg_bookings_sync_is_active'
    AND NOT tgisinternal
), 'status trigger preserved');
SELECT ok(EXISTS (
  SELECT 1 FROM pg_constraint
  WHERE conrelid = 'public.bookings'::regclass
    AND conname = 'bookings_service_end_after_pickup'
), 'service-end constraint preserved');
SELECT ok(EXISTS (
  SELECT 1 FROM pg_constraint
  WHERE conrelid = 'public.bookings'::regclass
    AND conname = 'bookings_no_overlap_per_vehicle'
), 'overlap constraint preserved');
SELECT ok(to_regclass('public.bookings_unique_vehicle_pickup_active') IS NOT NULL, 'uniqueness index preserved');

SELECT * FROM finish();
ROLLBACK;
