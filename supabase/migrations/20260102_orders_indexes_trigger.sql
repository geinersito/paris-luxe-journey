-- P0.1-B: Orders/Dossier pivot + status pipeline + RLS
-- PR: feat/db-orders-pipeline
-- 
-- Confirmed schema from existing migrations:
-- - dispatch_clients: client table
-- - dispatch_services: services/missions table
-- - dispatch_drivers: drivers table
-- - RLS pattern: role-based (admin/dispatcher/driver) via is_role() function
--
-- This migration creates the orders table to group multiple services under a single order
-- and implements the HubSpot pipeline parity (DRAFT → CONFIRMED → DONE → TO_INVOICE → INVOICED → PAID)

-- Create orders table
CREATE TABLE public.dispatch_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.dispatch_clients(id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'DRAFT',
  title text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Status pipeline constraint (HubSpot parity)
  CONSTRAINT orders_status_check CHECK (status IN ('DRAFT', 'CONFIRMED', 'DONE', 'TO_INVOICE', 'INVOICED', 'PAID'))
);
-- Indexes for performance
CREATE INDEX idx_orders_client_id ON public.dispatch_orders(client_id);
CREATE INDEX idx_orders_status ON public.dispatch_orders(status);
CREATE INDEX idx_orders_created_at ON public.dispatch_orders(created_at);
-- Add order_id to services table (nullable for compatibility) - if not already exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'dispatch_services'
    AND column_name = 'order_id'
  ) THEN
    ALTER TABLE public.dispatch_services
      ADD COLUMN order_id uuid NULL REFERENCES public.dispatch_orders(id) ON DELETE SET NULL;
  END IF;
END $$;
-- Create index on services.order_id if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE indexname = 'idx_services_order_id'
  ) THEN
    CREATE INDEX idx_services_order_id ON public.dispatch_services(order_id);
  END IF;
END $$;
-- Enable RLS on orders table
ALTER TABLE public.dispatch_orders ENABLE ROW LEVEL SECURITY;
-- Admin: Full access to orders
CREATE POLICY admin_all ON public.dispatch_orders
  USING (is_role('admin'));
-- Dispatcher: Read/write access to orders
CREATE POLICY dispatcher_read_write ON public.dispatch_orders
  USING (is_role('dispatcher'));
-- Driver: No access to orders (deny by default)
CREATE POLICY driver_none ON public.dispatch_orders
  USING (false);
-- Deny access by default for users without roles
CREATE POLICY deny_default ON public.dispatch_orders
  USING (false);
-- Note: updated_at trigger is not included in this migration to keep it minimal.
-- If the repo has an existing updated_at trigger pattern, it should be reused in a follow-up PR.;
