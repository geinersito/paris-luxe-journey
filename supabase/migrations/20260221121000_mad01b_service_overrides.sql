-- MAD01B-DB: Per-service MAD override fields (nullable)

ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS mad_override_hourly_rate_cents integer,
  ADD COLUMN IF NOT EXISTS mad_override_minimum_hours integer,
  ADD COLUMN IF NOT EXISTS mad_override_rounding_minutes integer,
  ADD COLUMN IF NOT EXISTS mad_override_night_enabled boolean,
  ADD COLUMN IF NOT EXISTS mad_override_night_multiplier numeric(5,2);
