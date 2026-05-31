-- public_booking_requests: intake table for website booking form submissions
-- Owned by paris-luxe-journey. No coupling to dispatch_* tables.
-- Boris reviews here, then manually converts to Dossier in paris-dispatcher ERP.

create table if not exists public_booking_requests (
  id                  uuid primary key default gen_random_uuid(),
  customer_name       text,
  customer_email      text not null,
  customer_phone      text,
  pickup              text not null,
  dropoff             text not null,
  pickup_date         date not null,
  pickup_time         time not null,
  return_date         date,
  return_time         time,
  passengers          int,
  luggage             text,
  trip_type           text not null default 'one_way',
  notes               text,
  language            text,
  source_path         text,
  status              text not null default 'pending_review',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Index for status-based queries (Boris's review queue)
create index if not exists idx_booking_requests_status
  on public_booking_requests (status, created_at desc);

-- RLS: enabled, zero client-facing policies.
-- All access (insert/read/update) is via service_role inside submit-booking-request edge function.
-- anon and authenticated roles have NO direct access — not INSERT, not SELECT.
alter table public_booking_requests enable row level security;
