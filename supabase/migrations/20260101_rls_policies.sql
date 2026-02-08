-- RLS Policies for Paris Dispatcher VTC
-- PR #16: feat/auth-rls-policies
-- Enable Row Level Security on all dispatch_* tables

-- Helper function to check user role
create or replace function is_role(role_name text)
returns boolean as $$
begin
  return exists (
    select 1 from public.dispatch_user_roles 
    where user_id = auth.uid() and role = role_name
  );
end;
$$ language plpgsql security definer;
-- Enable RLS on existing dispatch tables (conditional to avoid errors)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_clients') THEN
    ALTER TABLE public.dispatch_clients ENABLE ROW LEVEL SECURITY;
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_drivers') THEN
    ALTER TABLE public.dispatch_drivers ENABLE ROW LEVEL SECURITY;
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_services') THEN
    ALTER TABLE public.dispatch_services ENABLE ROW LEVEL SECURITY;
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_invoices') THEN
    ALTER TABLE public.dispatch_invoices ENABLE ROW LEVEL SECURITY;
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_invoice_lines') THEN
    ALTER TABLE public.dispatch_invoice_lines ENABLE ROW LEVEL SECURITY;
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_conversations') THEN
    ALTER TABLE public.dispatch_conversations ENABLE ROW LEVEL SECURITY;
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_service_events') THEN
    ALTER TABLE public.dispatch_service_events ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;
-- Admin: Full access to existing tables
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_clients') THEN
    DROP POLICY IF EXISTS admin_all ON public.dispatch_clients;
    CREATE POLICY admin_all ON public.dispatch_clients USING (is_role('admin'));
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_drivers') THEN
    DROP POLICY IF EXISTS admin_all ON public.dispatch_drivers;
    CREATE POLICY admin_all ON public.dispatch_drivers USING (is_role('admin'));
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_services') THEN
    DROP POLICY IF EXISTS admin_all ON public.dispatch_services;
    CREATE POLICY admin_all ON public.dispatch_services USING (is_role('admin'));
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_invoices') THEN
    DROP POLICY IF EXISTS admin_all ON public.dispatch_invoices;
    CREATE POLICY admin_all ON public.dispatch_invoices USING (is_role('admin'));
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_invoice_lines') THEN
    DROP POLICY IF EXISTS admin_all ON public.dispatch_invoice_lines;
    CREATE POLICY admin_all ON public.dispatch_invoice_lines USING (is_role('admin'));
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_conversations') THEN
    DROP POLICY IF EXISTS admin_all ON public.dispatch_conversations;
    CREATE POLICY admin_all ON public.dispatch_conversations USING (is_role('admin'));
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_service_events') THEN
    DROP POLICY IF EXISTS admin_all ON public.dispatch_service_events;
    CREATE POLICY admin_all ON public.dispatch_service_events USING (is_role('admin'));
  END IF;
END $$;
-- Dispatcher policies
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_clients') THEN
    DROP POLICY IF EXISTS dispatcher_read ON public.dispatch_clients;
    CREATE POLICY dispatcher_read ON public.dispatch_clients USING (is_role('dispatcher'));
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_drivers') THEN
    DROP POLICY IF EXISTS dispatcher_read ON public.dispatch_drivers;
    CREATE POLICY dispatcher_read ON public.dispatch_drivers USING (is_role('dispatcher'));
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_services') THEN
    DROP POLICY IF EXISTS dispatcher_read_write ON public.dispatch_services;
    CREATE POLICY dispatcher_read_write ON public.dispatch_services USING (is_role('dispatcher'));
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_invoices') THEN
    DROP POLICY IF EXISTS dispatcher_read ON public.dispatch_invoices;
    CREATE POLICY dispatcher_read ON public.dispatch_invoices USING (is_role('dispatcher'));
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_invoice_lines') THEN
    DROP POLICY IF EXISTS dispatcher_read ON public.dispatch_invoice_lines;
    CREATE POLICY dispatcher_read ON public.dispatch_invoice_lines USING (is_role('dispatcher'));
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_conversations') THEN
    DROP POLICY IF EXISTS dispatcher_read_write ON public.dispatch_conversations;
    CREATE POLICY dispatcher_read_write ON public.dispatch_conversations USING (is_role('dispatcher'));
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_service_events') THEN
    DROP POLICY IF EXISTS dispatcher_read_write ON public.dispatch_service_events;
    CREATE POLICY dispatcher_read_write ON public.dispatch_service_events USING (is_role('dispatcher'));
  END IF;
END $$;
-- Driver policies
-- Note: Simplified policy - drivers can see unassigned services
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_services') THEN
    DROP POLICY IF EXISTS driver_read_assigned ON public.dispatch_services;
    CREATE POLICY driver_read_assigned ON public.dispatch_services USING (
      is_role('driver') AND (driver_id IS NULL)
    );
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_conversations') THEN
    DROP POLICY IF EXISTS driver_none ON public.dispatch_conversations;
    CREATE POLICY driver_none ON public.dispatch_conversations USING (false);
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_service_events') THEN
    DROP POLICY IF EXISTS driver_none ON public.dispatch_service_events;
    CREATE POLICY driver_none ON public.dispatch_service_events USING (false);
  END IF;
END $$;
-- Deny access by default for users without roles
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_clients') THEN
    DROP POLICY IF EXISTS deny_default ON public.dispatch_clients;
    CREATE POLICY deny_default ON public.dispatch_clients USING (false);
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_drivers') THEN
    DROP POLICY IF EXISTS deny_default ON public.dispatch_drivers;
    CREATE POLICY deny_default ON public.dispatch_drivers USING (false);
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_invoices') THEN
    DROP POLICY IF EXISTS deny_default ON public.dispatch_invoices;
    CREATE POLICY deny_default ON public.dispatch_invoices USING (false);
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'dispatch_invoice_lines') THEN
    DROP POLICY IF EXISTS deny_default ON public.dispatch_invoice_lines;
    CREATE POLICY deny_default ON public.dispatch_invoice_lines USING (false);
  END IF;
END $$;
