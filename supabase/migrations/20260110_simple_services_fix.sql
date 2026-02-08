-- P0.1-D: Simple fix for dispatch_services infinite recursion
-- PR: fix/db-services-simple-fix
--
-- This migration provides a minimal fix for the infinite recursion issue
-- by simplifying the driver policy on dispatch_services.

-- Drop existing policies that might cause recursion
DO $$
BEGIN
  DROP POLICY IF EXISTS admin_all ON public.dispatch_services;
  DROP POLICY IF EXISTS dispatcher_read_write ON public.dispatch_services;
  DROP POLICY IF EXISTS driver_read_assigned ON public.dispatch_services;
  DROP POLICY IF EXISTS deny_default ON public.dispatch_services;
END $$;
-- Recreate policies with simplified logic to avoid recursion

-- Admin: Full access
CREATE POLICY admin_all ON public.dispatch_services
  USING (is_role('admin'));
-- Dispatcher: Read/write access
CREATE POLICY dispatcher_read_write ON public.dispatch_services
  USING (is_role('dispatcher'));
-- Driver: Can see assigned services (simplified - no recursion)
CREATE POLICY driver_read_assigned ON public.dispatch_services
  USING (
    is_role('driver') AND (
      driver_id = auth.uid()
    )
  );
-- Allow drivers to see unassigned services (separate policy to avoid recursion)
CREATE POLICY driver_read_unassigned ON public.dispatch_services
  USING (
    is_role('driver') AND (
      driver_id IS NULL
    )
  );
-- Deny access by default
CREATE POLICY deny_default ON public.dispatch_services
  USING (false);
