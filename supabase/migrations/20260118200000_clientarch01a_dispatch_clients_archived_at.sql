-- CLIENTARCH01A: Add soft-archive capability for clients
-- PR: chore/clientarch01a-clients-archived-at
--
-- This migration adds an archived_at column to dispatch_clients to support
-- soft-archiving clients instead of hard deletion.
--
-- - archived_at NULL = active client
-- - archived_at NOT NULL = archived client (timestamp of archival)
--
-- RLS: Archiving uses existing UPDATE policies (admin/dispatcher).
-- No backfill; all existing clients remain active (archived_at = NULL).

-- Add archived_at column
ALTER TABLE public.dispatch_clients
  ADD COLUMN archived_at timestamptz NULL;
-- Index for filtering active vs archived clients
CREATE INDEX idx_dispatch_clients_archived_at
  ON public.dispatch_clients (archived_at);
-- Composite index for common query: search active clients by name
-- Leverages existing name searches while filtering out archived
CREATE INDEX idx_dispatch_clients_name_active
  ON public.dispatch_clients (name)
  WHERE archived_at IS NULL;
