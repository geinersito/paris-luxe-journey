-- OPS-WEBHOOK-IDEMPOTENCY-TABLE-01 (PR1)
-- Idempotency table for Stripe webhook event deduplication.
-- Before processing business logic, the canonical webhook inserts the event_id here.
-- If the insert conflicts (23505), the event was already handled → return 200 immediately.

create table if not exists public.processed_stripe_events (
  event_id  text        primary key,
  event_type text       not null,
  livemode  boolean     not null default false,
  received_at timestamptz not null default now(),
  payload   jsonb,
  handler   text
);

create index if not exists processed_stripe_events_received_at_idx
  on public.processed_stripe_events(received_at desc);
