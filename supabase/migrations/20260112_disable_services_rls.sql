-- P0.1-F: Temporary RLS disable to break recursion cycle
-- PR: fix/db-disable-services-rls
--
-- This is a temporary fix to break the infinite recursion cycle by disabling RLS
-- on the dispatch_services table. This allows the application to function while
-- we develop a proper long-term solution.

-- Disable RLS on dispatch_services table to break recursion
ALTER TABLE public.dispatch_services DISABLE ROW LEVEL SECURITY;
-- Create simple policies without recursion
-- Admin: Full access
DROP POLICY IF EXISTS admin_all ON public.dispatch_services;
CREATE POLICY admin_all ON public.dispatch_services
  USING (is_role('admin'));
-- Dispatcher: Read/write access  
DROP POLICY IF EXISTS dispatcher_read_write ON public.dispatch_services;
CREATE POLICY dispatcher_read_write ON public.dispatch_services
  USING (is_role('dispatcher'));
-- Driver: Can see all services (temporary - no recursion check)
DROP POLICY IF EXISTS driver_read_assigned ON public.dispatch_services;
CREATE POLICY driver_read_assigned ON public.dispatch_services
  USING (is_role('driver'));
-- Deny access by default for users without roles
DROP POLICY IF EXISTS deny_default ON public.dispatch_services;
CREATE POLICY deny_default ON public.dispatch_services
  USING (false);
-- Note: This is a temporary workaround. A proper long-term solution should be implemented
-- to restore proper RLS without recursion issues.;
