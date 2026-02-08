create table if not exists public.dispatch_message_outbox (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id) on delete restrict,
  channel text not null,
  status text not null default 'queued',
  recipient_type text not null,
  recipient_id uuid not null,
  service_ids uuid[] not null default '{}'::uuid[],
  template_key text not null default 'briefing_v1',
  template_version int not null default 1,
  render_fingerprint text null,
  provider_message_id text null,
  error_code text null,
  error_message text null,
  sent_at timestamptz null,
  ack_at timestamptz null,
  constraint dispatch_message_outbox_channel_check check (channel in ('email','whatsapp')),
  constraint dispatch_message_outbox_status_check check (status in ('queued','sent','failed','ack')),
  constraint dispatch_message_outbox_recipient_type_check check (recipient_type in ('driver','partner','other'))
);
create index if not exists idx_dispatch_message_outbox_created_at on public.dispatch_message_outbox (created_at desc);
create index if not exists idx_dispatch_message_outbox_status_channel on public.dispatch_message_outbox (status, channel);
create index if not exists idx_dispatch_message_outbox_recipient on public.dispatch_message_outbox (recipient_type, recipient_id);
alter table public.dispatch_message_outbox enable row level security;
drop policy if exists admin_all on public.dispatch_message_outbox;
create policy admin_all on public.dispatch_message_outbox using (is_role('admin'));
drop policy if exists dispatcher_read on public.dispatch_message_outbox;
create policy dispatcher_read on public.dispatch_message_outbox for select using (is_role('dispatcher'));
drop policy if exists dispatcher_insert_self on public.dispatch_message_outbox;
create policy dispatcher_insert_self on public.dispatch_message_outbox for insert with check (is_role('dispatcher') and created_by = auth.uid());
drop policy if exists deny_default on public.dispatch_message_outbox;
create policy deny_default on public.dispatch_message_outbox using (false);
create or replace function public.dispatch_create_message_outbox(
  p_channel text,
  p_recipient_type text,
  p_recipient_id uuid,
  p_service_ids uuid[],
  p_template_key text default 'briefing_v1',
  p_template_version int default 1,
  p_render_fingerprint text default null
)
returns table (id uuid, status text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_status text;
begin
  insert into public.dispatch_message_outbox (
    channel,
    status,
    recipient_type,
    recipient_id,
    service_ids,
    template_key,
    template_version,
    render_fingerprint,
    created_by
  )
  values (
    p_channel,
    'queued',
    p_recipient_type,
    p_recipient_id,
    p_service_ids,
    p_template_key,
    p_template_version,
    p_render_fingerprint,
    auth.uid()
  )
  returning id, status into v_id, v_status;

  return query select v_id, v_status;
end;
$$;
grant execute on function public.dispatch_create_message_outbox(text, text, uuid, uuid[], text, int, text) to authenticated;
notify pgrst, 'reload schema';
