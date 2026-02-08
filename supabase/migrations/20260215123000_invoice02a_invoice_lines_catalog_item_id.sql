-- INVOICE02A-DB: Link invoice lines to pricing catalog items (nullable)
-- Adds catalog_item_id with FK + index. No RLS changes.

alter table public.dispatch_invoice_lines
  add column if not exists catalog_item_id uuid null;
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.dispatch_invoice_lines'::regclass
      and conname = 'dispatch_invoice_lines_catalog_item_id_fkey'
  ) then
    alter table public.dispatch_invoice_lines
      add constraint dispatch_invoice_lines_catalog_item_id_fkey
      foreign key (catalog_item_id)
      references public.dispatch_pricing_catalog_items(id)
      on delete set null;
  end if;
end $$;
create index if not exists idx_dispatch_invoice_lines_catalog_item_id
  on public.dispatch_invoice_lines (catalog_item_id)
  where catalog_item_id is not null;
notify pgrst, 'reload schema';
