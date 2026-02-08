-- PR 3: Quotes schema v1
-- Creates dispatch_quotes and dispatch_quote_lines tables for quotes management
-- 
-- This migration enables the creation of quotes (devis) that can be associated
-- with orders and later converted to invoices.

-- Create quotes table
CREATE TABLE public.dispatch_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NULL REFERENCES public.dispatch_orders(id) ON DELETE SET NULL,
  client_id uuid NULL REFERENCES public.dispatch_clients(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'DRAFT',
  currency text NOT NULL DEFAULT 'EUR',
  issue_date date NULL,
  valid_until date NULL,
  notes text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
-- Create quote lines table
CREATE TABLE public.dispatch_quote_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id uuid NOT NULL REFERENCES public.dispatch_quotes(id) ON DELETE CASCADE,
  label text NOT NULL,
  qty numeric NOT NULL DEFAULT 1,
  unit_price_cents int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
-- Indexes for performance
CREATE INDEX idx_quotes_order_id ON public.dispatch_quotes(order_id);
CREATE INDEX idx_quotes_client_id ON public.dispatch_quotes(client_id);
CREATE INDEX idx_quotes_status ON public.dispatch_quotes(status);
CREATE INDEX idx_quotes_created_at ON public.dispatch_quotes(created_at);
CREATE INDEX idx_quote_lines_quote_id ON public.dispatch_quote_lines(quote_id);
-- Enable RLS on quotes tables
ALTER TABLE public.dispatch_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatch_quote_lines ENABLE ROW LEVEL SECURITY;
-- Admin: Full access to quotes
CREATE POLICY admin_all ON public.dispatch_quotes
  USING (is_role('admin'));
-- Dispatcher: Read/write access to quotes
CREATE POLICY dispatcher_read_write ON public.dispatch_quotes
  USING (is_role('dispatcher'));
-- Driver: No access to quotes (deny by default)
CREATE POLICY driver_none ON public.dispatch_quotes
  USING (false);
-- Deny access by default for users without roles
CREATE POLICY deny_default ON public.dispatch_quotes
  USING (false);
-- Admin: Full access to quote lines
CREATE POLICY admin_all ON public.dispatch_quote_lines
  USING (is_role('admin'));
-- Dispatcher: Read/write access to quote lines
CREATE POLICY dispatcher_read_write ON public.dispatch_quote_lines
  USING (is_role('dispatcher'));
-- Driver: No access to quote lines (deny by default)
CREATE POLICY driver_none ON public.dispatch_quote_lines
  USING (false);
-- Deny access by default for users without roles
CREATE POLICY deny_default ON public.dispatch_quote_lines
  USING (false);
