-- P0.1-A: Base tables for Paris Dispatcher VTC
-- PR: feat/db-base-tables
--
-- This migration creates the foundational tables for the Paris Dispatcher application:
-- - dispatch_clients: client management
-- - dispatch_drivers: driver management  
-- - dispatch_services: services/missions
-- - dispatch_user_roles: user role management
--
-- These tables are required by other migrations and the application functionality.

-- Create user roles table for RLS
CREATE TABLE public.dispatch_user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'dispatcher', 'driver')),
  created_at timestamptz NOT NULL DEFAULT now(),
  
  -- Ensure one user can't have multiple roles
  UNIQUE(user_id, role)
);
-- Create clients table
CREATE TABLE public.dispatch_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  address text,
  company_name text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
-- Create drivers table
CREATE TABLE public.dispatch_drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  license_number text,
  license_expiry_date date,
  is_active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
-- Create services table
CREATE TABLE public.dispatch_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.dispatch_clients(id) ON DELETE RESTRICT,
  driver_id uuid NULL REFERENCES public.dispatch_drivers(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  pickup_address text NOT NULL,
  dropoff_address text NOT NULL,
  scheduled_pickup timestamptz NOT NULL,
  estimated_duration_minutes int,
  status text NOT NULL DEFAULT 'SCHEDULED',
  service_type text NOT NULL,
  base_price_cents int NOT NULL DEFAULT 0,
  total_price_cents int NOT NULL DEFAULT 0,
  order_id uuid NULL, -- Will be populated when service is added to an order
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Status constraint
  CONSTRAINT services_status_check CHECK (status IN ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW'))
);
-- Indexes for performance
CREATE INDEX idx_dispatch_clients_name ON public.dispatch_clients(name);
CREATE INDEX idx_dispatch_clients_email ON public.dispatch_clients(email);
CREATE INDEX idx_dispatch_drivers_name ON public.dispatch_drivers(name);
CREATE INDEX idx_dispatch_drivers_email ON public.dispatch_drivers(email);
CREATE INDEX idx_dispatch_services_client_id ON public.dispatch_services(client_id);
CREATE INDEX idx_dispatch_services_driver_id ON public.dispatch_services(driver_id);
CREATE INDEX idx_dispatch_services_status ON public.dispatch_services(status);
CREATE INDEX idx_dispatch_services_scheduled_pickup ON public.dispatch_services(scheduled_pickup);
-- Enable RLS on base tables
ALTER TABLE public.dispatch_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatch_drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatch_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatch_user_roles ENABLE ROW LEVEL SECURITY;
-- RLS policies for dispatch_user_roles
-- Admin: Full access
CREATE POLICY admin_all ON public.dispatch_user_roles
  USING (is_role('admin'));
-- Dispatcher: Read access to roles, can assign roles to users
CREATE POLICY dispatcher_read ON public.dispatch_user_roles
  USING (is_role('dispatcher'));
-- Users: Can view their own roles
CREATE POLICY user_own_roles ON public.dispatch_user_roles
  USING (auth.uid() = user_id);
-- Deny access by default
CREATE POLICY deny_default ON public.dispatch_user_roles
  USING (false);
-- RLS policies for dispatch_clients
-- Admin: Full access
CREATE POLICY admin_all ON public.dispatch_clients
  USING (is_role('admin'));
-- Dispatcher: Read/write access
CREATE POLICY dispatcher_read_write ON public.dispatch_clients
  USING (is_role('dispatcher'));
-- Users: Can view their own clients (if they have associated services)
CREATE POLICY user_own_clients ON public.dispatch_clients
  USING (
    auth.uid() IN (
      SELECT DISTINCT client_id 
      FROM public.dispatch_services 
      WHERE client_id = public.dispatch_clients.id
      AND EXISTS (
        SELECT 1 FROM public.dispatch_user_roles 
        WHERE user_id = auth.uid() AND role = 'driver'
      )
    )
  );
-- Deny access by default
CREATE POLICY deny_default ON public.dispatch_clients
  USING (false);
-- RLS policies for dispatch_drivers
-- Admin: Full access
CREATE POLICY admin_all ON public.dispatch_drivers
  USING (is_role('admin'));
-- Dispatcher: Read/write access
CREATE POLICY dispatcher_read_write ON public.dispatch_drivers
  USING (is_role('dispatcher'));
-- Users: Can view their own driver profile
CREATE POLICY user_own_driver ON public.dispatch_drivers
  USING (auth.uid() = user_id);
-- Deny access by default
CREATE POLICY deny_default ON public.dispatch_drivers
  USING (false);
-- RLS policies for dispatch_services
-- Admin: Full access
CREATE POLICY admin_all ON public.dispatch_services
  USING (is_role('admin'));
-- Dispatcher: Read/write access
CREATE POLICY dispatcher_read_write ON public.dispatch_services
  USING (is_role('dispatcher'));
-- Driver: Can see assigned services and unassigned services
CREATE POLICY driver_read_assigned ON public.dispatch_services
  USING (
    is_role('driver') AND (
      driver_id = auth.uid() OR 
      driver_id IS NULL
    )
  );
-- Users: Can see services for their own clients
CREATE POLICY user_own_services ON public.dispatch_services
  USING (
    auth.uid() IN (
      SELECT client_id 
      FROM public.dispatch_services 
      WHERE id = public.dispatch_services.id
    )
  );
-- Deny access by default
CREATE POLICY deny_default ON public.dispatch_services
  USING (false);
-- Helper function to check user role (already exists in RLS policies migration, but let's include it here for completeness)
CREATE OR REPLACE FUNCTION public.is_role(role_name text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.dispatch_user_roles 
    WHERE user_id = auth.uid() AND role = role_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Trigger to automatically handle user role assignment when a user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert a record into public.profiles
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  
  -- Assign default role if specified in user metadata
  IF NEW.raw_user_meta_data ? 'default_role' THEN
    INSERT INTO public.dispatch_user_roles (user_id, role)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'default_role')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Trigger to set updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Apply updated_at triggers
CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON public.dispatch_clients
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER drivers_updated_at
  BEFORE UPDATE ON public.dispatch_drivers
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER services_updated_at
  BEFORE UPDATE ON public.dispatch_services
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
-- Set up auth trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
