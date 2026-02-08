-- Make legacy columns nullable to support new schema
-- The frontend uses origin/destination/time_pickup/date instead of
-- pickup_address/dropoff_address/scheduled_pickup

-- Make original NOT NULL columns nullable (they are superseded by new columns)
ALTER TABLE public.dispatch_services
  ALTER COLUMN title DROP NOT NULL;
ALTER TABLE public.dispatch_services
  ALTER COLUMN pickup_address DROP NOT NULL;
ALTER TABLE public.dispatch_services
  ALTER COLUMN dropoff_address DROP NOT NULL;
ALTER TABLE public.dispatch_services
  ALTER COLUMN scheduled_pickup DROP NOT NULL;
ALTER TABLE public.dispatch_services
  ALTER COLUMN service_type DROP NOT NULL;
-- Set defaults for base_price_cents and total_price_cents (already have defaults but ensure)
ALTER TABLE public.dispatch_services
  ALTER COLUMN base_price_cents SET DEFAULT 0;
ALTER TABLE public.dispatch_services
  ALTER COLUMN total_price_cents SET DEFAULT 0;
