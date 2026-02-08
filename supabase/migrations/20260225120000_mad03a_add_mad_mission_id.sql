-- MAD03A: Add mad_mission_id for grouping DISPO services into missions
-- A mission is a logical grouping of tronçons (service segments) for MAD billing.

-- Add mission id (nullable, only used when type='DISPO')
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS mad_mission_id uuid;
-- Index for range queries (mission + start)
-- Optimizes dispatch_mad_get_missions RPC lookups
CREATE INDEX IF NOT EXISTS dispatch_services_mad_mission_id_start_idx
  ON public.dispatch_services (mad_mission_id, start_datetime)
  WHERE mad_mission_id IS NOT NULL;
-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
