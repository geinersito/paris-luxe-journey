-- COUNTERPARTIES04B-DB: Add UPDATE policy for dispatch_counterparties
-- Allows authenticated users to update counterparties (status, email, etc.)
-- Matches existing SELECT/INSERT policies pattern (authenticated = true)

-- Ensure RLS is enabled
ALTER TABLE public.dispatch_counterparties ENABLE ROW LEVEL SECURITY;
-- Drop if exists to allow re-run
DROP POLICY IF EXISTS dcp_update_auth ON public.dispatch_counterparties;
-- Create UPDATE policy for authenticated users
-- Consistent with existing dcp_select_auth and dcp_insert_auth policies
CREATE POLICY dcp_update_auth
ON public.dispatch_counterparties
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
