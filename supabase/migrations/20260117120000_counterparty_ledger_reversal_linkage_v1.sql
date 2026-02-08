alter table public.dispatch_counterparty_ledger_entries 
  add column if not exists reversal_of_entry_id uuid;
do $$
begin 
  if not exists ( 
    select 1 from pg_constraint where conname = 'dcle_reversal_of_entry_fk' 
  ) then 
    alter table public.dispatch_counterparty_ledger_entries 
      add constraint dcle_reversal_of_entry_fk 
      foreign key (reversal_of_entry_id) 
      references public.dispatch_counterparty_ledger_entries(id) 
      on delete set null; 
  end if; 
end $$;
create index if not exists dcle_reversal_of_entry_id_idx 
  on public.dispatch_counterparty_ledger_entries (reversal_of_entry_id);
