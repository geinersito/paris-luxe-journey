-- dispatch_integration_events: append-only table for incoming integration events
-- Supports idempotent ingestion from external systems (booking, etc.)

create table if not exists public.dispatch_integration_events (
  id uuid primary key default gen_random_uuid(),
  source text not null,                     -- e.g. 'booking'
  event_type text not null,                 -- e.g. 'booking_confirmed'
  external_id text not null,                -- e.g. booking_id
  idempotency_key text not null,            -- e.g. 'booking_confirmed:{booking_id}:v1'
  payload jsonb not null,

  status text not null default 'received',  -- received | processed | failed
  error text null,

  created_at timestamptz not null default now(),
  processed_at timestamptz null
);
-- Idempotency constraint: prevents duplicate event processing
create unique index if not exists dispatch_integration_events_idempotency_key_ux
  on public.dispatch_integration_events(idempotency_key);
-- Query optimization: find events by source/type
create index if not exists dispatch_integration_events_source_type_idx
  on public.dispatch_integration_events(source, event_type, created_at desc);
-- Query optimization: find unprocessed events
create index if not exists dispatch_integration_events_status_idx
  on public.dispatch_integration_events(status, created_at)
  where status = 'received';
-- RLS: enabled, no policies = service_role only (authenticated users cannot access)
alter table public.dispatch_integration_events enable row level security;
-- Status constraint: only valid states allowed
alter table public.dispatch_integration_events
  add constraint dispatch_integration_events_status_chk
  check (status in ('received','processed','failed'));
comment on table public.dispatch_integration_events is 'Append-only table for incoming integration events with idempotent processing';
comment on column public.dispatch_integration_events.idempotency_key is 'Format: {event_type}:{external_id}:v{version}';
