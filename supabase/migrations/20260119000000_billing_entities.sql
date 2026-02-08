-- PR-DB — Add billing entities (SARL vs Micro) and link to invoices (no UI)
-- Branch: feat/billing-entities-db-v1
-- Rules:
-- - PR <200 net lines
-- - DB migration only
-- - pwsh -File .\bin\check.ps1 -SkipBuild must pass
-- - RLS explicit TO authenticated (no deny_default)

-- Ensure pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- A) Create table public.dispatch_billing_entities
CREATE TABLE IF NOT EXISTS public.dispatch_billing_entities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  vat_mode text NOT NULL DEFAULT 'NORMAL', -- NORMAL | FRANCHISE_293B
  legal_footer text NULL,                  -- e.g., “TVA non applicable, art. 293 B du CGI”
  created_at timestamptz NOT NULL DEFAULT now()
);
-- Enable RLS
ALTER TABLE public.dispatch_billing_entities ENABLE ROW LEVEL SECURITY;
-- Policies TO authenticated
DROP POLICY IF EXISTS be_select_auth ON public.dispatch_billing_entities;
CREATE POLICY be_select_auth ON public.dispatch_billing_entities
  FOR SELECT TO authenticated
  USING (true);
DROP POLICY IF EXISTS be_insert_auth ON public.dispatch_billing_entities;
CREATE POLICY be_insert_auth ON public.dispatch_billing_entities
  FOR INSERT TO authenticated
  WITH CHECK (true);
DROP POLICY IF EXISTS be_update_auth ON public.dispatch_billing_entities;
CREATE POLICY be_update_auth ON public.dispatch_billing_entities
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
DROP POLICY IF EXISTS be_delete_admin ON public.dispatch_billing_entities;
CREATE POLICY be_delete_admin ON public.dispatch_billing_entities
  FOR DELETE TO authenticated
  USING (is_role('admin'));
-- B) Link to dispatch_invoices (guarded)
DO $$
BEGIN
  IF to_regclass('public.dispatch_invoices') IS NOT NULL THEN
    -- Add column if missing
    IF NOT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'dispatch_invoices'
        AND column_name = 'billing_entity_id'
    ) THEN
      ALTER TABLE public.dispatch_invoices
        ADD COLUMN billing_entity_id uuid NULL;
    END IF;

    -- Add FK constraint if missing
    IF NOT EXISTS (
      SELECT 1
      FROM pg_constraint
      WHERE conrelid = 'public.dispatch_invoices'::regclass
        AND conname = 'dispatch_invoices_billing_entity_id_fkey'
    ) THEN
      ALTER TABLE public.dispatch_invoices
        ADD CONSTRAINT dispatch_invoices_billing_entity_id_fkey
        FOREIGN KEY (billing_entity_id)
        REFERENCES public.dispatch_billing_entities(id)
        ON DELETE SET NULL;
    END IF;
  END IF;
END $$;
