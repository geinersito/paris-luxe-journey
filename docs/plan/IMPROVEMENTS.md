# Improvements Plan (SSOT)

This file is the canonical backlog for active execution and PR traceability.

Rule: no PR is opened/merged without linking one or more Plan Item IDs and updating this table plus `docs/STATUS.md`.

Detailed product notes can continue in `docs/PLAN_VIVO_MEJORAS_UI.md`, but execution status lives here.

## Legend

- Priority: `P0` (must), `P1` (high), `P2` (nice)
- Status: `TODO` / `DOING` / `DONE` / `BLOCKED`
- Risk:
  - `R0` UI-only
  - `R1` flow/state/routing/persistence
  - `R2` money/checkout

## Plan Items

| ID | Priority | Risk | Area | Description | Status | PR / Commit | Notes / DoD |
|---|---|---|---|---|---|---|---|
| OPS-MIG-01 | P0 | R1 | Ops | Reconcile Supabase migrations (Remote = SSOT) to unblock db push | TODO | TBD | Needs evidence pack + runbook |
| UX-DT-01 | P0 | R0 | UX | Fix Date/Time popovers inside modal (z-layer) | DONE | [#29](https://github.com/geinersito/paris-luxe-journey/pull/29) | Verified in modal |
| FLOW-NAV-01 | P0 | R1 | Flow | Prevent fixed-price submit state reset / double navigation | DONE | [#30](https://github.com/geinersito/paris-luxe-journey/pull/30) | Ends in `/booking/details` reliably |
| UX-VAL-01 | P1 | R0 | UX | Disable CTA until valid + inline errors after submit attempt | DONE | [#31](https://github.com/geinersito/paris-luxe-journey/pull/31) | Inline errors for date/time/pax |
| UX-VAL-02 | P1 | R0 | UX | Inline error when `pickup === dropoff` | DONE | [#32](https://github.com/geinersito/paris-luxe-journey/pull/32) | Specific message shown |
| UX-ZTOK-01 | P1 | R0 | UI System | Z-index token system (`nav/overlay/floating/toast`) | DONE | [#33](https://github.com/geinersito/paris-luxe-journey/pull/33) | Tokens documented and applied |
| FLOW-DETAILS-SS-01 | P1 | R1 | Flow | Make `/booking/details` refresh-safe via session snapshot (TTL + cleanup) | DONE | [#34](https://github.com/geinersito/paris-luxe-journey/pull/34) / `8e00b02` | Smoke A/B/C/D + security + precedence validated |
| DOCS-SSOT-01 | P1 | R0 | Governance | Install SSOT plan + status dashboard + mandatory PR traceability | DONE | [#35](https://github.com/geinersito/paris-luxe-journey/pull/35) / `feb13f7` | Supervisor + status + SSOT alignment |
| PR-U1f | P1 | R1 | Navigation | Top-nav coherence + dead-page protection | TODO | TBD | 100% links top-nav with useful target or explicit redirect |
| PR-U1g | P1 | R1 | Navigation | Separate `Hourly` intent from `/booking` wizard | TODO | TBD | `Hourly` must not end in airport-transfer wizard |

## Risk Gates (DoD by Risk)

- `R0` (UI-only):
  - CI green
  - quick manual check in impacted screen

- `R1` (Flow):
  - all `R0`
  - manual smoke A/B/C/D:
    - A: happy path
    - B: refresh works
    - C: TTL expired/corrupt redirects safely
    - D: back/cancel keeps state consistent
  - no sensitive data persisted
  - precedence is `location.state > session snapshot > redirect`

- `R2` (Money/checkout):
  - all `R1`
  - idempotency and double-submit protection verified
  - cleanup only on success
