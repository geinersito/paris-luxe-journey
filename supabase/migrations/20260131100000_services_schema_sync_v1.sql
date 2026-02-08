-- Sync dispatch_services schema with TypeScript Service type
-- Adds missing columns expected by frontend code

-- Add origin column (alias for pickup_address concept but matching TS type)
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS origin text;
-- Add destination column
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS destination text;
-- Add date column (date part of scheduled_pickup for filtering)
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS date date;
-- Add time_pickup column (time string for display)
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS time_pickup text;
-- Add type column (TRANSFER, TOUR, DISPO)
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS type text DEFAULT 'TRANSFER';
-- Add pax (passenger count)
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS pax integer DEFAULT 1;
-- Add luggage description
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS luggage text;
-- Add pickup_type (MeetAndGreet, Lobby, Curbside)
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS pickup_type text DEFAULT 'Curbside';
-- Add flight_train reference
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS flight_train text;
-- Add price (decimal for display, separate from cents columns)
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS price numeric(10,2) DEFAULT 0;
-- Add driver_notes
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS driver_notes text;
-- Update status constraint to include frontend status values
-- First drop existing constraint if it exists
ALTER TABLE public.dispatch_services
  DROP CONSTRAINT IF EXISTS services_status_check;
-- Add new constraint with all valid statuses (DB + frontend values)
ALTER TABLE public.dispatch_services
  ADD CONSTRAINT services_status_check CHECK (
    status IN (
      'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW',
      'pending', 'confirmed', 'completed', 'cancelled'
    )
  );
