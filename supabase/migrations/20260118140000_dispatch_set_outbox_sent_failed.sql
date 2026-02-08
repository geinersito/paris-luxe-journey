-- RESEND02C3: set_sent / set_failed RPCs for outbox send outcome
-- Implements safe update RPCs for outbox send results without exposing UPDATE via RLS.
-- No RLS policy changes; updates via SECURITY DEFINER RPCs.

-- dispatch_set_outbox_sent: Mark message as successfully sent
create or replace function public.dispatch_set_outbox_sent(
  p_id uuid,
  p_provider_message_id text
)
returns table (
  id uuid,
  status text,
  attempt_count int,
  next_attempt_at timestamptz,
  sent_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_status text;
  v_attempt_count int;
  v_next_attempt_at timestamptz;
  v_sent_at timestamptz;
begin
  -- Service-only: restrict to admin or dispatcher role
  if not (is_role('admin') or is_role('dispatcher')) then
    raise exception 'not permitted';
  end if;

  -- Validate provider_message_id is not empty
  if p_provider_message_id is null or trim(p_provider_message_id) = '' then
    raise exception 'provider_message_id cannot be empty';
  end if;

  -- Update and return
  update public.dispatch_message_outbox
  set status = 'sent',
      sent_at = now(),
      provider_message_id = p_provider_message_id,
      error_code = null,
      error_message = null,
      next_attempt_at = null
  where id = p_id
    and status in ('queued')
  returning id, status, attempt_count, next_attempt_at, sent_at
  into v_id, v_status, v_attempt_count, v_next_attempt_at, v_sent_at;

  if v_id is null then
    raise exception 'outbox not found or invalid status transition';
  end if;

  return query select v_id, v_status, v_attempt_count, v_next_attempt_at, v_sent_at;
end;
$$;
-- dispatch_set_outbox_failed: Mark message as failed with retry policy
create or replace function public.dispatch_set_outbox_failed(
  p_id uuid,
  p_error_code text,
  p_error_message text
)
returns table (
  id uuid,
  status text,
  attempt_count int,
  next_attempt_at timestamptz,
  sent_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_status text;
  v_attempt_count int;
  v_next_attempt_at timestamptz;
  v_sent_at timestamptz;
  v_current_attempt_count int;
begin
  -- Service-only: restrict to admin or dispatcher role
  if not (is_role('admin') or is_role('dispatcher')) then
    raise exception 'not permitted';
  end if;

  -- Get current attempt_count for retry decision
  select attempt_count into v_current_attempt_count
  from public.dispatch_message_outbox
  where id = p_id;

  if v_current_attempt_count is null then
    raise exception 'outbox not found';
  end if;

  -- Apply retry policy
  if p_error_code in ('NO_EMAIL', 'INVALID_TEMPLATE') then
    -- Terminal failure: invalid recipient or template
    update public.dispatch_message_outbox
    set status = 'failed',
        error_code = p_error_code,
        error_message = p_error_message,
        last_attempt_at = now(),
        next_attempt_at = null
    where id = p_id
    returning id, status, attempt_count, next_attempt_at, sent_at
    into v_id, v_status, v_attempt_count, v_next_attempt_at, v_sent_at;

  elsif v_current_attempt_count >= 3 then
    -- Terminal failure: max attempts reached
    update public.dispatch_message_outbox
    set status = 'failed',
        error_code = p_error_code,
        error_message = p_error_message,
        last_attempt_at = now(),
        next_attempt_at = null
    where id = p_id
    returning id, status, attempt_count, next_attempt_at, sent_at
    into v_id, v_status, v_attempt_count, v_next_attempt_at, v_sent_at;

  else
    -- Retryable: schedule next attempt in 5 minutes
    update public.dispatch_message_outbox
    set status = 'queued',
        error_code = p_error_code,
        error_message = p_error_message,
        last_attempt_at = now(),
        next_attempt_at = now() + interval '5 minutes'
    where id = p_id
    returning id, status, attempt_count, next_attempt_at, sent_at
    into v_id, v_status, v_attempt_count, v_next_attempt_at, v_sent_at;
  end if;

  if v_id is null then
    raise exception 'outbox not found';
  end if;

  return query select v_id, v_status, v_attempt_count, v_next_attempt_at, v_sent_at;
end;
$$;
-- Grant execute to authenticated role
grant execute on function public.dispatch_set_outbox_sent(uuid, text) to authenticated;
grant execute on function public.dispatch_set_outbox_failed(uuid, text, text) to authenticated;
notify pgrst, 'reload schema';
