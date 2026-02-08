-- MAD01B-DB: SSOT store for MAD pricing
-- Creates a per-user commercial settings row with mad_pricing JSONB.

CREATE TABLE public.dispatch_commercial_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  mad_pricing jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX idx_dispatch_commercial_settings_user_id
  ON public.dispatch_commercial_settings (user_id);
ALTER TABLE public.dispatch_commercial_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY commercial_settings_owner_select
  ON public.dispatch_commercial_settings
  FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY commercial_settings_owner_insert
  ON public.dispatch_commercial_settings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY commercial_settings_owner_update
  ON public.dispatch_commercial_settings
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER dispatch_commercial_settings_updated_at
  BEFORE UPDATE ON public.dispatch_commercial_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
