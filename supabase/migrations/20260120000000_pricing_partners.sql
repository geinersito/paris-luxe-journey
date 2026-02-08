-- PR13A — Pricing & Partners Foundation (DB-only)
-- Scope: catalog items, partners, commission rules with RLS

CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- Catalog of sellable items
CREATE TABLE public.dispatch_pricing_catalog_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  service_type text NOT NULL,
  unit text NOT NULL DEFAULT 'trip',
  currency text NOT NULL DEFAULT 'EUR',
  base_price_cents integer NOT NULL DEFAULT 0,
  vat_rate integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT dispatch_pricing_catalog_items_service_type_check CHECK (service_type IN ('transfer', 'dispo', 'extra')),
  CONSTRAINT dispatch_pricing_catalog_items_unit_check CHECK (unit IN ('trip', 'hour', 'day', 'item')),
  CONSTRAINT dispatch_pricing_catalog_items_currency_check CHECK (currency IN ('EUR'))
);
-- Partners (supplier/agency/apporteur)
CREATE TABLE public.dispatch_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  partner_type text NOT NULL,
  default_commission_mode text NOT NULL DEFAULT 'PERCENT',
  default_commission_value integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT dispatch_partners_type_check CHECK (partner_type IN ('supplier', 'agency', 'apporteur')),
  CONSTRAINT dispatch_partners_commission_mode_check CHECK (default_commission_mode IN ('PERCENT', 'FIXED_CENTS'))
);
-- Commission rules per partner + catalog item
CREATE TABLE public.dispatch_partner_commission_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id uuid NOT NULL REFERENCES public.dispatch_partners(id) ON DELETE CASCADE,
  catalog_item_id uuid NOT NULL REFERENCES public.dispatch_pricing_catalog_items(id) ON DELETE CASCADE,
  commission_mode text NOT NULL,
  commission_value integer NOT NULL DEFAULT 0,
  effective_from date NULL,
  effective_to date NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT dispatch_partner_commission_mode_check CHECK (commission_mode IN ('PERCENT', 'FIXED_CENTS')),
  CONSTRAINT dispatch_partner_commission_rules_unique UNIQUE (partner_id, catalog_item_id)
);
-- Indexes
CREATE INDEX IF NOT EXISTS dispatch_partner_commission_rules_partner_id_idx
  ON public.dispatch_partner_commission_rules(partner_id);
CREATE INDEX IF NOT EXISTS dispatch_partner_commission_rules_catalog_item_id_idx
  ON public.dispatch_partner_commission_rules(catalog_item_id);
-- RLS enable
ALTER TABLE public.dispatch_pricing_catalog_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatch_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatch_partner_commission_rules ENABLE ROW LEVEL SECURITY;
-- Policies for dispatch_pricing_catalog_items
DROP POLICY IF EXISTS pricing_catalog_items_select_auth ON public.dispatch_pricing_catalog_items;
CREATE POLICY pricing_catalog_items_select_auth ON public.dispatch_pricing_catalog_items
  FOR SELECT TO authenticated
  USING (true);
DROP POLICY IF EXISTS pricing_catalog_items_insert_auth ON public.dispatch_pricing_catalog_items;
CREATE POLICY pricing_catalog_items_insert_auth ON public.dispatch_pricing_catalog_items
  FOR INSERT TO authenticated
  WITH CHECK (true);
DROP POLICY IF EXISTS pricing_catalog_items_update_auth ON public.dispatch_pricing_catalog_items;
CREATE POLICY pricing_catalog_items_update_auth ON public.dispatch_pricing_catalog_items
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
DROP POLICY IF EXISTS pricing_catalog_items_delete_admin ON public.dispatch_pricing_catalog_items;
CREATE POLICY pricing_catalog_items_delete_admin ON public.dispatch_pricing_catalog_items
  FOR DELETE TO authenticated
  USING (is_role('admin'));
-- Policies for dispatch_partners
DROP POLICY IF EXISTS dispatch_partners_select_auth ON public.dispatch_partners;
CREATE POLICY dispatch_partners_select_auth ON public.dispatch_partners
  FOR SELECT TO authenticated
  USING (true);
DROP POLICY IF EXISTS dispatch_partners_insert_auth ON public.dispatch_partners;
CREATE POLICY dispatch_partners_insert_auth ON public.dispatch_partners
  FOR INSERT TO authenticated
  WITH CHECK (true);
DROP POLICY IF EXISTS dispatch_partners_update_auth ON public.dispatch_partners;
CREATE POLICY dispatch_partners_update_auth ON public.dispatch_partners
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
DROP POLICY IF EXISTS dispatch_partners_delete_admin ON public.dispatch_partners;
CREATE POLICY dispatch_partners_delete_admin ON public.dispatch_partners
  FOR DELETE TO authenticated
  USING (is_role('admin'));
-- Policies for dispatch_partner_commission_rules
DROP POLICY IF EXISTS partner_commission_rules_select_auth ON public.dispatch_partner_commission_rules;
CREATE POLICY partner_commission_rules_select_auth ON public.dispatch_partner_commission_rules
  FOR SELECT TO authenticated
  USING (true);
DROP POLICY IF EXISTS partner_commission_rules_insert_auth ON public.dispatch_partner_commission_rules;
CREATE POLICY partner_commission_rules_insert_auth ON public.dispatch_partner_commission_rules
  FOR INSERT TO authenticated
  WITH CHECK (true);
DROP POLICY IF EXISTS partner_commission_rules_update_auth ON public.dispatch_partner_commission_rules;
CREATE POLICY partner_commission_rules_update_auth ON public.dispatch_partner_commission_rules
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
DROP POLICY IF EXISTS partner_commission_rules_delete_admin ON public.dispatch_partner_commission_rules;
CREATE POLICY partner_commission_rules_delete_admin ON public.dispatch_partner_commission_rules
  FOR DELETE TO authenticated
  USING (is_role('admin'));
