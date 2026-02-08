create or replace function public.dispatch_mark_message_outbox_sent(
  p_id uuid
)
returns table (id uuid, status text, sent_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_status text;
  v_sent_at timestamptz;
begin
  if not (is_role('admin') or is_role('dispatcher')) then
    raise exception 'not permitted';
  end if;

  update public.dispatch_message_outbox
  set status = 'sent',
      sent_at = coalesce(sent_at, now()),
      error_code = null,
      error_message = null
  where id = p_id
    and created_by = auth.uid()
  returning id, status, sent_at into v_id, v_status, v_sent_at;

  if v_id is null then
    raise exception 'outbox not found or not permitted';
  end if;

  return query select v_id, v_status, v_sent_at;
end;
$$;
grant execute on function public.dispatch_mark_message_outbox_sent(uuid) to authenticated;
notify pgrst, 'reload schema';
