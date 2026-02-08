ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS duration_min integer NOT NULL DEFAULT 60;
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS service_type text NOT NULL DEFAULT 'transfer';
