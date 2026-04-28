begin;

create table if not exists public.content_event_sources (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  source_slug text not null,
  external_source_id text not null,
  source_name text not null,
  source_url text not null,
  api_base_url text not null default 'https://api.openagenda.com/v2',
  timezone text not null default 'Europe/Paris',
  enabled boolean not null default true,
  fetch_window_days integer not null default 60,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint content_event_sources_provider_chk
    check (provider in ('openagenda')),
  constraint content_event_sources_source_slug_chk
    check (btrim(source_slug) <> ''),
  constraint content_event_sources_external_source_id_chk
    check (btrim(external_source_id) <> ''),
  constraint content_event_sources_source_url_chk
    check (source_url ~ '^https://.+'),
  constraint content_event_sources_api_base_url_chk
    check (api_base_url ~ '^https://.+'),
  constraint content_event_sources_fetch_window_days_chk
    check (fetch_window_days between 1 and 180),
  constraint content_event_sources_timezone_chk
    check (timezone = 'Europe/Paris')
);

create unique index if not exists content_event_sources_slug_ux
  on public.content_event_sources(source_slug);

create unique index if not exists content_event_sources_provider_external_ux
  on public.content_event_sources(provider, external_source_id);

create table if not exists public.content_event_ingest_runs (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.content_event_sources(id) on delete restrict,
  trigger_kind text not null default 'cron',
  mode text not null default 'evergreen',
  status text not null default 'running',
  window_start_at timestamptz null,
  window_end_at timestamptz null,
  source_generated_at timestamptz null,
  started_at timestamptz not null default now(),
  finished_at timestamptz null,
  fetched_count integer not null default 0,
  inserted_raw_count integer not null default 0,
  upserted_normalized_count integer not null default 0,
  publish_candidate_count integer not null default 0,
  promoted_published_count integer not null default 0,
  rejected_count integer not null default 0,
  error_summary jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint content_event_ingest_runs_trigger_kind_chk
    check (trigger_kind in ('cron', 'manual', 'backfill', 'retry')),
  constraint content_event_ingest_runs_mode_chk
    check (mode in ('evergreen', 'live')),
  constraint content_event_ingest_runs_status_chk
    check (status in ('running', 'succeeded', 'partial', 'failed', 'cancelled')),
  constraint content_event_ingest_runs_finished_after_started_chk
    check (finished_at is null or finished_at >= started_at),
  constraint content_event_ingest_runs_fetched_count_chk
    check (fetched_count >= 0),
  constraint content_event_ingest_runs_inserted_raw_count_chk
    check (inserted_raw_count >= 0),
  constraint content_event_ingest_runs_upserted_normalized_count_chk
    check (upserted_normalized_count >= 0),
  constraint content_event_ingest_runs_publish_candidate_count_chk
    check (publish_candidate_count >= 0),
  constraint content_event_ingest_runs_promoted_published_count_chk
    check (promoted_published_count >= 0),
  constraint content_event_ingest_runs_rejected_count_chk
    check (rejected_count >= 0),
  constraint content_event_ingest_runs_error_summary_type_chk
    check (jsonb_typeof(error_summary) = 'array'),
  constraint content_event_ingest_runs_metadata_type_chk
    check (jsonb_typeof(metadata) = 'object'),
  constraint content_event_ingest_runs_id_source_ux
    unique (id, source_id)
);

create index if not exists content_event_ingest_runs_source_started_idx
  on public.content_event_ingest_runs(source_id, started_at desc);

create index if not exists content_event_ingest_runs_running_idx
  on public.content_event_ingest_runs(started_at desc)
  where status = 'running';

create table if not exists public.content_event_raw (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.content_event_sources(id) on delete restrict,
  run_id uuid not null,
  external_event_id text not null,
  source_event_url text not null,
  source_created_at timestamptz null,
  source_updated_at timestamptz null,
  start_at timestamptz null,
  end_at timestamptz null,
  title text not null,
  payload_hash text not null,
  payload jsonb not null,
  fetched_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint content_event_raw_run_source_fk
    foreign key (run_id, source_id)
    references public.content_event_ingest_runs(id, source_id)
    on delete restrict,
  constraint content_event_raw_external_event_id_chk
    check (btrim(external_event_id) <> ''),
  constraint content_event_raw_title_chk
    check (btrim(title) <> ''),
  constraint content_event_raw_source_event_url_chk
    check (source_event_url ~ '^https://.+'),
  constraint content_event_raw_payload_hash_chk
    check (btrim(payload_hash) <> ''),
  constraint content_event_raw_payload_type_chk
    check (jsonb_typeof(payload) = 'object'),
  constraint content_event_raw_end_after_start_chk
    check (end_at is null or start_at is null or end_at >= start_at)
);

create unique index if not exists content_event_raw_source_external_payload_ux
  on public.content_event_raw(source_id, external_event_id, payload_hash);

create index if not exists content_event_raw_run_fetched_idx
  on public.content_event_raw(run_id, fetched_at desc);

create index if not exists content_event_raw_source_external_fetched_idx
  on public.content_event_raw(source_id, external_event_id, fetched_at desc);

create table if not exists public.content_event_normalized (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.content_event_sources(id) on delete restrict,
  external_event_id text not null,
  latest_raw_id uuid not null references public.content_event_raw(id) on delete restrict,
  last_run_id uuid not null references public.content_event_ingest_runs(id) on delete restrict,
  source_updated_at timestamptz null,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  title text not null,
  description text null,
  category text null,
  organizer_name text null,
  venue_name text null,
  venue_address text null,
  city text not null default 'Paris',
  district text null,
  country_code text not null default 'FR',
  start_at timestamptz not null,
  end_at timestamptz null,
  timezone text not null default 'Europe/Paris',
  event_url text not null,
  image_url text null,
  source_name text not null,
  source_url text not null,
  event_status text not null default 'scheduled',
  promote_to_published boolean not null default false,
  validation_status text not null default 'valid',
  validation_errors jsonb not null default '[]'::jsonb,
  normalized_payload jsonb not null default '{}'::jsonb,
  archived_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint content_event_normalized_external_event_id_chk
    check (btrim(external_event_id) <> ''),
  constraint content_event_normalized_title_chk
    check (btrim(title) <> ''),
  constraint content_event_normalized_country_code_chk
    check (country_code ~ '^[A-Z]{2}$'),
  constraint content_event_normalized_timezone_chk
    check (timezone = 'Europe/Paris'),
  constraint content_event_normalized_event_url_chk
    check (event_url ~ '^https://.+'),
  constraint content_event_normalized_source_url_chk
    check (source_url ~ '^https://.+'),
  constraint content_event_normalized_event_status_chk
    check (event_status in ('scheduled', 'cancelled', 'postponed', 'unknown')),
  constraint content_event_normalized_validation_status_chk
    check (validation_status in ('valid', 'needs_review', 'rejected')),
  constraint content_event_normalized_promotion_valid_chk
    check (promote_to_published = false or validation_status = 'valid'),
  constraint content_event_normalized_validation_errors_type_chk
    check (jsonb_typeof(validation_errors) = 'array'),
  constraint content_event_normalized_normalized_payload_type_chk
    check (jsonb_typeof(normalized_payload) = 'object'),
  constraint content_event_normalized_last_seen_after_first_seen_chk
    check (last_seen_at >= first_seen_at),
  constraint content_event_normalized_end_after_start_chk
    check (end_at is null or end_at >= start_at),
  constraint content_event_normalized_archived_candidate_chk
    check (archived_at is null or promote_to_published = false)
);

create unique index if not exists content_event_normalized_source_external_ux
  on public.content_event_normalized(source_id, external_event_id);

create index if not exists content_event_normalized_promote_validation_start_idx
  on public.content_event_normalized(promote_to_published, validation_status, start_at);

create index if not exists content_event_normalized_active_start_idx
  on public.content_event_normalized(start_at)
  where archived_at is null;

create table if not exists public.content_event_published (
  id uuid primary key default gen_random_uuid(),
  normalized_id uuid not null references public.content_event_normalized(id) on delete restrict,
  published_from_run_id uuid null references public.content_event_ingest_runs(id) on delete restrict,
  source_id uuid not null references public.content_event_sources(id) on delete restrict,
  external_event_id text not null,
  title text not null,
  short_summary text null,
  category text null,
  organizer_name text null,
  venue_name text null,
  venue_address text null,
  city text not null default 'Paris',
  district text null,
  start_at timestamptz not null,
  end_at timestamptz null,
  timezone text not null default 'Europe/Paris',
  event_url text not null,
  source_name text not null,
  source_url text not null,
  image_url text null,
  publish_status text not null default 'hidden',
  published_at timestamptz null,
  archived_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint content_event_published_external_event_id_chk
    check (btrim(external_event_id) <> ''),
  constraint content_event_published_title_chk
    check (btrim(title) <> ''),
  constraint content_event_published_timezone_chk
    check (timezone = 'Europe/Paris'),
  constraint content_event_published_event_url_chk
    check (event_url ~ '^https://.+'),
  constraint content_event_published_source_url_chk
    check (source_url ~ '^https://.+'),
  constraint content_event_published_publish_status_chk
    check (publish_status in ('hidden', 'published')),
  constraint content_event_published_status_published_at_chk
    check (
      (publish_status = 'hidden' and published_at is null)
      or
      (publish_status = 'published' and published_at is not null)
    ),
  constraint content_event_published_end_after_start_chk
    check (end_at is null or end_at >= start_at),
  constraint content_event_published_archived_hidden_chk
    check (archived_at is null or publish_status = 'hidden')
);

create unique index if not exists content_event_published_normalized_ux
  on public.content_event_published(normalized_id);

create unique index if not exists content_event_published_source_external_ux
  on public.content_event_published(source_id, external_event_id);

create index if not exists content_event_published_active_start_idx
  on public.content_event_published(publish_status, start_at)
  where archived_at is null;

alter table public.content_event_sources enable row level security;
alter table public.content_event_ingest_runs enable row level security;
alter table public.content_event_raw enable row level security;
alter table public.content_event_normalized enable row level security;
alter table public.content_event_published enable row level security;

revoke all on table public.content_event_sources from anon, authenticated;
revoke all on table public.content_event_ingest_runs from anon, authenticated;
revoke all on table public.content_event_raw from anon, authenticated;
revoke all on table public.content_event_normalized from anon, authenticated;
revoke all on table public.content_event_published from anon, authenticated;

grant all on table public.content_event_sources to service_role;
grant all on table public.content_event_ingest_runs to service_role;
grant all on table public.content_event_raw to service_role;
grant all on table public.content_event_normalized to service_role;
grant all on table public.content_event_published to service_role;

create or replace function public.prevent_content_event_raw_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'content_event_raw is append-only';
end;
$$;

drop trigger if exists content_event_sources_set_updated_at on public.content_event_sources;
create trigger content_event_sources_set_updated_at
before update on public.content_event_sources
for each row
execute function public.set_updated_at();

drop trigger if exists content_event_ingest_runs_set_updated_at on public.content_event_ingest_runs;
create trigger content_event_ingest_runs_set_updated_at
before update on public.content_event_ingest_runs
for each row
execute function public.set_updated_at();

drop trigger if exists content_event_normalized_set_updated_at on public.content_event_normalized;
create trigger content_event_normalized_set_updated_at
before update on public.content_event_normalized
for each row
execute function public.set_updated_at();

drop trigger if exists content_event_published_set_updated_at on public.content_event_published;
create trigger content_event_published_set_updated_at
before update on public.content_event_published
for each row
execute function public.set_updated_at();

drop trigger if exists content_event_raw_no_update on public.content_event_raw;
create trigger content_event_raw_no_update
before update on public.content_event_raw
for each row
execute function public.prevent_content_event_raw_mutation();

drop trigger if exists content_event_raw_no_delete on public.content_event_raw;
create trigger content_event_raw_no_delete
before delete on public.content_event_raw
for each row
execute function public.prevent_content_event_raw_mutation();

commit;
