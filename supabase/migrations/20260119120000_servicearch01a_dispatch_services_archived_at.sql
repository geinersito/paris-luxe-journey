-- SERVICEARCH01A: Add soft-archive capability for services
-- PR: db/servicearch01a-services-archived-at
--
-- Adds archived_at to dispatch_services to support soft-archiving services.
-- - archived_at NULL = active service
-- - archived_at NOT NULL = archived service (timestamp of archival)

ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS archived_at timestamptz NULL;
CREATE INDEX IF NOT EXISTS idx_dispatch_services_archived_at
  ON public.dispatch_services (archived_at);
