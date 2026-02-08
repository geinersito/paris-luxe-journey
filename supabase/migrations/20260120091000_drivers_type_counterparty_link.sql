-- DRIVERS01C-DB: Add driver_type and counterparty_id to dispatch_drivers
-- Enables internal vs partner driver distinction and links partner drivers to counterparties

-- Add driver_type column (internal = your own, partner = subcontractor)
ALTER TABLE public.dispatch_drivers
  ADD COLUMN IF NOT EXISTS driver_type text NOT NULL DEFAULT 'internal'
  CHECK (driver_type IN ('internal', 'partner'));
-- Add counterparty_id FK (null for internal drivers, set for partner drivers)
ALTER TABLE public.dispatch_drivers
  ADD COLUMN IF NOT EXISTS counterparty_id uuid NULL
  REFERENCES public.dispatch_counterparties(id) ON DELETE SET NULL;
-- Index for filtering by type
CREATE INDEX IF NOT EXISTS idx_dispatch_drivers_type
  ON public.dispatch_drivers(driver_type);
-- Index for counterparty lookups
CREATE INDEX IF NOT EXISTS idx_dispatch_drivers_counterparty
  ON public.dispatch_drivers(counterparty_id)
  WHERE counterparty_id IS NOT NULL;
-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
