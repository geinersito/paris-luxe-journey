-- CLIENTFICHE01A: Add profile fields to dispatch_clients for "fiche client"
-- Fields: client_type (individual/company), company_name, notes (consignes)

-- Add client_type column with check constraint
ALTER TABLE public.dispatch_clients
  ADD COLUMN client_type text NOT NULL DEFAULT 'individual'
  CONSTRAINT dispatch_clients_client_type_check CHECK (client_type IN ('individual', 'company'));
-- Add company_name (only relevant when client_type = 'company')
ALTER TABLE public.dispatch_clients
  ADD COLUMN company_name text NULL;
-- Note: dispatch_clients already has a 'notes' column from initial schema
-- If it doesn't exist, uncomment below:
-- ALTER TABLE public.dispatch_clients
--   ADD COLUMN notes text NULL;

COMMENT ON COLUMN public.dispatch_clients.client_type IS 'Client type: individual or company';
COMMENT ON COLUMN public.dispatch_clients.company_name IS 'Company name when client_type is company';
