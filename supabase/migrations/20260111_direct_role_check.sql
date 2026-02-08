-- P0.1-E: Direct role check to fix infinite recursion
-- PR: fix/db-direct-role-check
--
-- This migration fixes the infinite recursion by using direct table access
-- instead of the is_role() function that's causing the circular dependency.

-- Drop existing policies
DO $$
BEGIN
  DROP POLICY IF EXISTS admin_all ON public.dispatch_services;
  DROP POLICY IF EXISTS dispatcher_read_write ON public.dispatch_services;
  DROP POLICY IF EXISTS driver_read_assigned ON public.dispatch_services;
  DROP POLICY IF EXISTS driver_read_unassigned ON public.dispatch_services;
  DROP POLICY IF EXISTS deny_default ON public.dispatch_services;
END $$;
-- Recreate policies with direct table access to avoid recursion

-- Admin: Full access
CREATE POLICY admin_all ON public.dispatch_services
  USING (
    EXISTS (
      SELECT 1 FROM public.dispatch_user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
-- Dispatcher: Read/write access
CREATE POLICY dispatcher_read_write ON public.dispatch_services
  USING (
    EXISTS (
      SELECT 1 FROM public.dispatch_user_roles 
      WHERE user_id = auth.uid() AND role = 'dispatcher'
    )
  );
-- Driver: Can see assigned services (direct check)
CREATE POLICY driver_read_assigned ON public.dispatch_services
  USING (
    EXISTS (
      SELECT 1 FROM public.dispatch_user_roles 
      WHERE user_id = auth.uid() AND role = 'driver'
    ) AND (
      driver_id = auth.uid()
    )
  );
-- Allow drivers to see unassigned services (direct check)
CREATE POLICY driver_read_unassigned ON public.dispatch_services
  USING (
    EXISTS (
      SELECT 1 FROM public.dispatch_user_roles 
      WHERE user_id = auth.uid() AND role = 'driver'
    ) AND (
      driver_id IS NULL
    )
  );
-- Deny access by default
CREATE POLICY deny_default ON public.dispatch_services
  USING (false);
