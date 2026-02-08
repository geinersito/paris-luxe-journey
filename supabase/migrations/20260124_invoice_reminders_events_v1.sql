ALTER TABLE public.dispatch_invoices
  ADD COLUMN IF NOT EXISTS issued_at timestamptz NULL,
  ADD COLUMN IF NOT EXISTS due_date date NULL,
  ADD COLUMN IF NOT EXISTS reminder_stage smallint NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_reminder_at timestamptz NULL,
  ADD COLUMN IF NOT EXISTS reminder_hold boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS reminder_opt_out boolean NOT NULL DEFAULT false;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'chk_dispatch_invoices_reminder_stage'
      AND conrelid = 'public.dispatch_invoices'::regclass
  ) THEN
    ALTER TABLE public.dispatch_invoices
      ADD CONSTRAINT chk_dispatch_invoices_reminder_stage CHECK (reminder_stage BETWEEN 0 AND 3);
  END IF;
END
$$;
CREATE TABLE IF NOT EXISTS public.dispatch_invoice_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid NOT NULL REFERENCES public.dispatch_invoices(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_at timestamptz NOT NULL DEFAULT now(),
  actor_user_id uuid NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_dispatch_invoice_events_invoice_event_at
  ON public.dispatch_invoice_events (invoice_id, event_at DESC);
CREATE INDEX IF NOT EXISTS idx_dispatch_invoice_events_type_event_at
  ON public.dispatch_invoice_events (event_type, event_at DESC);
ALTER TABLE public.dispatch_invoice_events ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='dispatch_invoice_events' AND policyname='p_events_select_auth'
  ) THEN
    CREATE POLICY p_events_select_auth ON public.dispatch_invoice_events
      FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='dispatch_invoice_events' AND policyname='p_events_insert_auth'
  ) THEN
    CREATE POLICY p_events_insert_auth ON public.dispatch_invoice_events
      FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='dispatch_invoice_events' AND policyname='p_events_update_auth'
  ) THEN
    CREATE POLICY p_events_update_auth ON public.dispatch_invoice_events
      FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
END
$$;
CREATE TABLE IF NOT EXISTS public.dispatch_invoice_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid NOT NULL REFERENCES public.dispatch_invoices(id) ON DELETE CASCADE,
  stage smallint NOT NULL,
  scheduled_for date NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  sent_at timestamptz NULL,
  error text NULL,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname='uq_dispatch_invoice_reminders_invoice_stage'
      AND conrelid='public.dispatch_invoice_reminders'::regclass
  ) THEN
    ALTER TABLE public.dispatch_invoice_reminders
      ADD CONSTRAINT uq_dispatch_invoice_reminders_invoice_stage UNIQUE (invoice_id, stage);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname='chk_dispatch_invoice_reminders_stage'
      AND conrelid='public.dispatch_invoice_reminders'::regclass
  ) THEN
    ALTER TABLE public.dispatch_invoice_reminders
      ADD CONSTRAINT chk_dispatch_invoice_reminders_stage CHECK (stage IN (1,2));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname='chk_dispatch_invoice_reminders_status'
      AND conrelid='public.dispatch_invoice_reminders'::regclass
  ) THEN
    ALTER TABLE public.dispatch_invoice_reminders
      ADD CONSTRAINT chk_dispatch_invoice_reminders_status CHECK (status IN ('pending','sent','skipped','cancelled','error'));
  END IF;
END
$$;
CREATE INDEX IF NOT EXISTS idx_dispatch_invoice_reminders_status_scheduled
  ON public.dispatch_invoice_reminders (status, scheduled_for);
CREATE INDEX IF NOT EXISTS idx_dispatch_invoice_reminders_invoice
  ON public.dispatch_invoice_reminders (invoice_id);
ALTER TABLE public.dispatch_invoice_reminders ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='dispatch_invoice_reminders' AND policyname='p_reminders_select_auth'
  ) THEN
    CREATE POLICY p_reminders_select_auth ON public.dispatch_invoice_reminders
      FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='dispatch_invoice_reminders' AND policyname='p_reminders_insert_auth'
  ) THEN
    CREATE POLICY p_reminders_insert_auth ON public.dispatch_invoice_reminders
      FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='dispatch_invoice_reminders' AND policyname='p_reminders_update_auth'
  ) THEN
    CREATE POLICY p_reminders_update_auth ON public.dispatch_invoice_reminders
      FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
END
$$;
