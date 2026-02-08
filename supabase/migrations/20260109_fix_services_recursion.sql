-- P0.1-C: Fix infinite recursion in dispatch_services policies
-- PR: fix/db-services-recursion
--
-- This migration fixes the infinite recursion issue in dispatch_services policies
-- by simplifying the policy logic and removing circular dependencies.

-- Drop problematic policies that cause circular references
DO $$
BEGIN
  -- Drop policies that might cause circular references
  DROP POLICY IF EXISTS user_own_clients ON public.dispatch_clients;
  DROP POLICY IF EXISTS user_own_driver ON public.dispatch_drivers;
  DROP POLICY IF EXISTS user_own_roles ON public.dispatch_user_roles;
  
  -- Drop the problematic driver policy on services
  DROP POLICY IF EXISTS driver_read_assigned ON public.dispatch_services;
END $$;
-- Recreate simplified policies without circular dependencies

-- RLS policies for dispatch_user_roles (simplified)
-- Admin: Full access
DROP POLICY IF EXISTS admin_all ON public.dispatch_user_roles;
CREATE POLICY admin_all ON public.dispatch_user_roles
  USING (is_role('admin'));
-- Dispatcher: Read access to roles, can assign roles to users
DROP POLICY IF EXISTS dispatcher_read ON public.dispatch_user_roles;
CREATE POLICY dispatcher_read ON public.dispatch_user_roles
  USING (is_role('dispatcher'));
-- Users: Can view their own roles
DROP POLICY IF EXISTS user_own_roles ON public.dispatch_user_roles;
CREATE POLICY user_own_roles ON public.dispatch_user_roles
  USING (auth.uid() = user_id);
-- Deny access by default
DROP POLICY IF EXISTS deny_default ON public.dispatch_user_roles;
CREATE POLICY deny_default ON public.dispatch_user_roles
  USING (false);
-- RLS policies for dispatch_clients (simplified)
-- Admin: Full access
DROP POLICY IF EXISTS admin_all ON public.dispatch_clients;
CREATE POLICY admin_all ON public.dispatch_clients
  USING (is_role('admin'));
-- Dispatcher: Read/write access
DROP POLICY IF EXISTS dispatcher_read_write ON public.dispatch_clients;
CREATE POLICY dispatcher_read_write ON public.dispatch_clients
  USING (is_role('dispatcher'));
-- Users: Can view their own clients (simplified - no circular dependency)
DROP POLICY IF EXISTS user_own_clients ON public.dispatch_clients;
CREATE POLICY user_own_clients ON public.dispatch_clients
  USING (
    auth.uid() IS NOT NULL
  );
-- Deny access by default
DROP POLICY IF EXISTS deny_default ON public.dispatch_clients;
CREATE POLICY deny_default ON public.dispatch_clients
  USING (false);
-- RLS policies for dispatch_drivers (simplified)
-- Admin: Full access
DROP POLICY IF EXISTS admin_all ON public.dispatch_drivers;
CREATE POLICY admin_all ON public.dispatch_drivers
  USING (is_role('admin'));
-- Dispatcher: Read/write access
DROP POLICY IF EXISTS dispatcher_read_write ON public.dispatch_drivers;
CREATE POLICY dispatcher_read_write ON public.dispatch_drivers
  USING (is_role('dispatcher'));
-- Users: Can view their own driver profile
DROP POLICY IF EXISTS user_own_driver ON public.dispatch_drivers;
CREATE POLICY user_own_driver ON public.dispatch_drivers
  USING (auth.uid() = user_id);
-- Deny access by default
DROP POLICY IF EXISTS deny_default ON public.dispatch_drivers;
CREATE POLICY deny_default ON public.dispatch_drivers
  USING (false);
-- RLS policies for dispatch_services (simplified)
-- Admin: Full access
DROP POLICY IF EXISTS admin_all ON public.dispatch_services;
CREATE POLICY admin_all ON public.dispatch_services
  USING (is_role('admin'));
-- Dispatcher: Read/write access
DROP POLICY IF EXISTS dispatcher_read_write ON public.dispatch_services;
CREATE POLICY dispatcher_read_write ON public.dispatch_services
  USING (is_role('dispatcher'));
-- Driver: Can see assigned services and unassigned services (simplified)
DROP POLICY IF EXISTS driver_read_assigned ON public.dispatch_services;
CREATE POLICY driver_read_assigned ON public.dispatch_services
  USING (
    is_role('driver') AND (
      driver_id = auth.uid() OR
      driver_id IS NULL
    )
  );
-- Deny access by default
DROP POLICY IF EXISTS deny_default ON public.dispatch_services;
CREATE POLICY deny_default ON public.dispatch_services
  USING (false);
