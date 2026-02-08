-- Dossier Hub: dispatch_dossiers + dispatch_dossier_tasks + links

CREATE TABLE public.dispatch_dossiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid NULL,
  client_id uuid NULL REFERENCES public.dispatch_clients(id) ON DELETE SET NULL,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'NEW',
  source_briefing_text text NULL,
  missing_fields jsonb NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.dispatch_dossier_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dossier_id uuid NOT NULL REFERENCES public.dispatch_dossiers(id) ON DELETE CASCADE,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'OPEN',
  due_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.dispatch_dossiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatch_dossier_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY dossiers_select ON public.dispatch_dossiers
  FOR SELECT TO authenticated
  USING (true);
CREATE POLICY dossiers_insert ON public.dispatch_dossiers
  FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY dossiers_update ON public.dispatch_dossiers
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY dossiers_delete ON public.dispatch_dossiers
  FOR DELETE TO authenticated
  USING (is_role('admin'));
CREATE POLICY dossier_tasks_select ON public.dispatch_dossier_tasks
  FOR SELECT TO authenticated
  USING (true);
CREATE POLICY dossier_tasks_insert ON public.dispatch_dossier_tasks
  FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY dossier_tasks_update ON public.dispatch_dossier_tasks
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY dossier_tasks_delete ON public.dispatch_dossier_tasks
  FOR DELETE TO authenticated
  USING (is_role('admin'));
CREATE INDEX idx_dossiers_client_status ON public.dispatch_dossiers(client_id, status);
CREATE INDEX idx_dossier_tasks_dossier ON public.dispatch_dossier_tasks(dossier_id);
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER dossiers_updated_at
  BEFORE UPDATE ON public.dispatch_dossiers
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE public.dispatch_services
  ADD COLUMN IF NOT EXISTS dossier_id uuid NULL REFERENCES public.dispatch_dossiers(id) ON DELETE SET NULL;
ALTER TABLE public.dispatch_quotes
  ADD COLUMN IF NOT EXISTS dossier_id uuid NULL REFERENCES public.dispatch_dossiers(id) ON DELETE SET NULL;
DO $$
BEGIN
  IF to_regclass('public.dispatch_invoices') IS NOT NULL THEN
    ALTER TABLE public.dispatch_invoices
      ADD COLUMN IF NOT EXISTS dossier_id uuid NULL REFERENCES public.dispatch_dossiers(id) ON DELETE SET NULL;
  END IF;
END $$;
