# Supabase migration reconciliation (Remote = SSOT)

## Problem
`supabase db push` failed due to: "Remote migration versions not found locally".

`npx supabase migration list --linked` showed full drift:
- remoteOnly=67
- localOnly=13
- both=0

## Decision
Remote migration history is the SSOT for the linked project.

## Steps executed
1. Capture drift snapshot (before)
2. Fetch remote migrations into repo (`npx supabase migration fetch --linked`)
3. Capture drift snapshot (after fetch)
4. Move local-only migrations into `supabase/migrations/_local_orphaned/`
5. Re-run `npx supabase migration list --linked` for verification

## Evidence files
- `docs/ops/migrations_drift_before.txt`
- `docs/ops/migrations_drift_after_fetch.txt`
- `docs/ops/migrations_drift_after_reconcile.txt`

## Done when
- Remote migrations exist locally
- No local-only files remain under `supabase/migrations/` root
- Local-only historical files are preserved under `_local_orphaned/` for audit
- Future migrations can be created on top of remote SSOT
