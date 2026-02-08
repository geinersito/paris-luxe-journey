-- LEDGER08A: Manual ledger entries + reversals + posted immutability
-- Adds manual categories, reversal tracking, label column, and ERP-grade guardrails

-- 1) Add manual-specific categories
INSERT INTO public.dispatch_ledger_categories (code, label, sort) VALUES
  ('manual_adjustment', 'Ajustement manuel', 100),
  ('manual_netting', 'Compensation manuelle', 110),
  ('manual_incident', 'Incident manuel', 120)
ON CONFLICT (code) DO NOTHING;
-- 2) Add reversal_of_entry_id and label columns to ledger entries
ALTER TABLE public.dispatch_counterparty_ledger_entries
  ADD COLUMN IF NOT EXISTS reversal_of_entry_id uuid NULL
    REFERENCES public.dispatch_counterparty_ledger_entries(id),
  ADD COLUMN IF NOT EXISTS label text NULL;
-- Index for reversal lookups
CREATE INDEX IF NOT EXISTS dcle_reversal_of_idx
  ON public.dispatch_counterparty_ledger_entries (reversal_of_entry_id)
  WHERE reversal_of_entry_id IS NOT NULL;
-- 3) Posted immutability trigger (blocks UPDATE/DELETE on posted entries)
CREATE OR REPLACE FUNCTION public.dispatch_block_posted_mutations()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.status = 'posted' THEN
    RAISE EXCEPTION 'Cannot modify or delete posted ledger entries. Use reversal instead.';
  END IF;
  RETURN OLD;
END;
$$;
DROP TRIGGER IF EXISTS trg_block_posted_mutations ON public.dispatch_counterparty_ledger_entries;
CREATE TRIGGER trg_block_posted_mutations
  BEFORE UPDATE OR DELETE ON public.dispatch_counterparty_ledger_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.dispatch_block_posted_mutations();
-- 4) RPC: Post manual ledger entry (requires label, generates external_key if not provided)
CREATE OR REPLACE FUNCTION public.dispatch_post_manual_ledger_entry(
  p_billing_entity_id uuid,
  p_counterparty_id uuid,
  p_category_code text,
  p_label text,
  p_delta_balance_cents bigint,
  p_note text DEFAULT NULL,
  p_occurred_at date DEFAULT CURRENT_DATE,
  p_external_key text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_external_key text;
  v_id uuid;
BEGIN
  -- Validate required fields
  IF p_billing_entity_id IS NULL THEN
    RAISE EXCEPTION 'billing_entity_id is required';
  END IF;
  IF p_counterparty_id IS NULL THEN
    RAISE EXCEPTION 'counterparty_id is required';
  END IF;
  IF p_category_code IS NULL OR p_category_code = '' THEN
    RAISE EXCEPTION 'category_code is required';
  END IF;
  IF p_label IS NULL OR trim(p_label) = '' THEN
    RAISE EXCEPTION 'label is required for manual entries';
  END IF;
  IF p_delta_balance_cents IS NULL OR p_delta_balance_cents = 0 THEN
    RAISE EXCEPTION 'delta_balance_cents must be non-zero';
  END IF;

  -- Validate category exists
  PERFORM 1 FROM public.dispatch_ledger_categories WHERE code = p_category_code;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Unknown category_code: %', p_category_code;
  END IF;

  -- Generate external_key if not provided
  v_external_key := COALESCE(p_external_key, 'manual:' || gen_random_uuid()::text);

  -- Insert with idempotency
  INSERT INTO public.dispatch_counterparty_ledger_entries (
    billing_entity_id, counterparty_id, status, occurred_at, posted_at,
    delta_balance_cents, currency, category_code, description, source_type,
    source_id, external_key, label, created_at, created_by
  )
  VALUES (
    p_billing_entity_id, p_counterparty_id, 'posted',
    COALESCE(p_occurred_at, CURRENT_DATE)::timestamptz, now(),
    p_delta_balance_cents, 'EUR', p_category_code, p_note, 'manual',
    NULL, v_external_key, trim(p_label), now(), auth.uid()
  )
  ON CONFLICT (billing_entity_id, external_key) DO NOTHING
  RETURNING id INTO v_id;

  -- If conflict, return existing entry id
  IF v_id IS NULL THEN
    SELECT id INTO v_id
    FROM public.dispatch_counterparty_ledger_entries
    WHERE billing_entity_id = p_billing_entity_id AND external_key = v_external_key;
  END IF;

  RETURN v_id;
END;
$$;
REVOKE ALL ON FUNCTION public.dispatch_post_manual_ledger_entry(uuid, uuid, text, text, bigint, text, date, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dispatch_post_manual_ledger_entry(uuid, uuid, text, text, bigint, text, date, text) TO authenticated;
-- 5) RPC: Reverse a ledger entry (creates reversal entry with opposite amount)
CREATE OR REPLACE FUNCTION public.dispatch_reverse_ledger_entry(
  p_billing_entity_id uuid,
  p_entry_id uuid,
  p_label text DEFAULT NULL,
  p_note text DEFAULT NULL,
  p_occurred_at date DEFAULT CURRENT_DATE,
  p_external_key text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_original RECORD;
  v_external_key text;
  v_label text;
  v_id uuid;
BEGIN
  -- Validate required fields
  IF p_billing_entity_id IS NULL THEN
    RAISE EXCEPTION 'billing_entity_id is required';
  END IF;
  IF p_entry_id IS NULL THEN
    RAISE EXCEPTION 'entry_id is required';
  END IF;

  -- Fetch original entry
  SELECT id, billing_entity_id, counterparty_id, delta_balance_cents, category_code, label, status
  INTO v_original
  FROM public.dispatch_counterparty_ledger_entries
  WHERE id = p_entry_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Entry not found: %', p_entry_id;
  END IF;

  -- Verify billing entity matches
  IF v_original.billing_entity_id <> p_billing_entity_id THEN
    RAISE EXCEPTION 'Entry does not belong to the specified billing entity';
  END IF;

  -- Ensure original is posted (only posted entries can be reversed)
  IF v_original.status <> 'posted' THEN
    RAISE EXCEPTION 'Only posted entries can be reversed';
  END IF;

  -- Generate external_key if not provided
  v_external_key := COALESCE(p_external_key, 'manual:reversal:' || p_entry_id::text || ':' || gen_random_uuid()::text);

  -- Generate label if not provided
  v_label := COALESCE(NULLIF(trim(p_label), ''), 'Annulation: ' || COALESCE(v_original.label, 'entrée ' || p_entry_id::text));

  -- Insert reversal entry with idempotency
  INSERT INTO public.dispatch_counterparty_ledger_entries (
    billing_entity_id, counterparty_id, status, occurred_at, posted_at,
    delta_balance_cents, currency, category_code, description, source_type,
    source_id, external_key, label, reversal_of_entry_id, created_at, created_by
  )
  VALUES (
    v_original.billing_entity_id, v_original.counterparty_id, 'posted',
    COALESCE(p_occurred_at, CURRENT_DATE)::timestamptz, now(),
    -v_original.delta_balance_cents, 'EUR', 'manual_adjustment', p_note, 'manual',
    NULL, v_external_key, v_label, p_entry_id, now(), auth.uid()
  )
  ON CONFLICT (billing_entity_id, external_key) DO NOTHING
  RETURNING id INTO v_id;

  -- If conflict, return existing reversal entry id
  IF v_id IS NULL THEN
    SELECT id INTO v_id
    FROM public.dispatch_counterparty_ledger_entries
    WHERE billing_entity_id = p_billing_entity_id AND external_key = v_external_key;
  END IF;

  RETURN v_id;
END;
$$;
REVOKE ALL ON FUNCTION public.dispatch_reverse_ledger_entry(uuid, uuid, text, text, date, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dispatch_reverse_ledger_entry(uuid, uuid, text, text, date, text) TO authenticated;
