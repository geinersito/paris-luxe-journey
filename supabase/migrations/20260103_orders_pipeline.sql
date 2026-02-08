-- P0.1-B2: Orders indexes + updated_at trigger
-- PR: feat/db-orders-indexes-trigger
--
-- Hardening for dispatch_orders table:
-- - Performance indexes for common queries (status, client_id, created_at)
-- - updated_at trigger to auto-update on row modifications
-- - Index on services.order_id for join queries

-- Performance indexes for orders table
CREATE INDEX IF NOT EXISTS idx_orders_status_created_at ON public.dispatch_orders(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_client_id_created_at ON public.dispatch_orders(client_id, created_at DESC);
-- Index on services.order_id for efficient joins (already created in previous migration)
-- CREATE INDEX idx_services_order_id ON public.dispatch_services(order_id);

-- updated_at trigger function (reusable for any table with updated_at column)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Apply updated_at trigger to orders table
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.dispatch_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
-- Note: If other tables (clients, services, drivers) need updated_at triggers,
-- they can be added in follow-up migrations using the same set_updated_at() function.;
