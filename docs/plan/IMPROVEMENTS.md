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
| OPS-MIG-01 | P0 | R1 | Ops | Reconcile Supabase migrations (Remote = SSOT) to unblock db push | DONE | [#28](https://github.com/geinersito/paris-luxe-journey/pull/28) / `e34ab9b` | Remote SSOT imported; local orphaned quarantined; evidence + runbook merged |
| UX-DT-01 | P0 | R0 | UX | Fix Date/Time popovers inside modal (z-layer) | DONE | [#29](https://github.com/geinersito/paris-luxe-journey/pull/29) | Verified in modal |
| FLOW-NAV-01 | P0 | R1 | Flow | Prevent fixed-price submit state reset / double navigation | DONE | [#30](https://github.com/geinersito/paris-luxe-journey/pull/30) | Ends in `/booking/details` reliably |
| UX-VAL-01 | P1 | R0 | UX | Disable CTA until valid + inline errors after submit attempt | DONE | [#31](https://github.com/geinersito/paris-luxe-journey/pull/31) | Inline errors for date/time/pax |
| UX-VAL-02 | P1 | R0 | UX | Inline error when `pickup === dropoff` | DONE | [#32](https://github.com/geinersito/paris-luxe-journey/pull/32) | Specific message shown |
| UX-ZTOK-01 | P1 | R0 | UI System | Z-index token system (`nav/overlay/floating/toast`) | DONE | [#33](https://github.com/geinersito/paris-luxe-journey/pull/33) | Tokens documented and applied |
| FLOW-DETAILS-SS-01 | P1 | R1 | Flow | Make `/booking/details` refresh-safe via session snapshot (TTL + cleanup) | DONE | [#34](https://github.com/geinersito/paris-luxe-journey/pull/34) / `8e00b02` | Smoke A/B/C/D + security + precedence validated |
| DOCS-SSOT-01 | P1 | R0 | Governance | Install SSOT plan + status dashboard + mandatory PR traceability | DONE | [#35](https://github.com/geinersito/paris-luxe-journey/pull/35) / `feb13f7` | Supervisor + status + SSOT alignment |
| NAV-COHERENCE-01 | P1 | R1 | Navigation | Top-nav coherence + dead-page protection | DONE | [#38](https://github.com/geinersito/paris-luxe-journey/pull/38) / `74ec0b5` | Global wildcard fallback + dedicated 404 with CTA |
| NAV-HOURLY-01 | P1 | R1 | Navigation | Separate `Hourly` intent from `/booking` wizard | DONE | [#40](https://github.com/geinersito/paris-luxe-journey/pull/40) / `c06d6c1` | Intent guard + no sessionStorage mix |
| UX-HEADER-I18N-01 | P1 | R0 | Header | Keep language dropdown crisp and navbar stable across locales | DONE | [#41](https://github.com/geinersito/paris-luxe-journey/pull/41) / `e40d506` | Compact selector (flag + code) + navbar flex stability |

## Migrated from PLAN_VIVO_MEJORAS_UI.md (legacy backlog)

Items below were previously tracked in the narrative plan and are now reconciled into the canonical SSOT.

| ID | Legacy | Priority | Risk | Status | Title | Evidence (PR/Commit) | Notes |
|---|---|---:|:---:|:---:|---|---|---|
| NAV-AIRPORTS-01 | PR-U1b | P2 | R0 | DONE | Airports pages complete (CDG/Orly/Beauvais) + CTA to /booking | `7c9bc64` | Full airport landings with i18n, routing, and CTAs |
| NAV-ABOUT-CONTACT-FLEET-01 | PR-U1j | P2 | R1 | DONE | About/Contact/Fleet: anchors vs pages (coherence) | [#45](https://github.com/geinersito/paris-luxe-journey/pull/45) / `3398685` | All anchors on Home + client redirects + URL hash update |
| UX-EXCURSIONS-QUOTEFIRST-01 | PR-U1d | P2 | R0 | DONE | Excursions: quote-first CTAs (no /booking leakage) | `7168baa` | WhatsApp CTAs, no booking wizard navigation |
| UX-EXCURSIONS-CURATION-01 | PR-U1h | P2 | R0 | DONE | Excursions: curation pass (scroll tax + consistent CTAs) | `7168baa` | Same commit as quote-first refactor |
| UX-EVENTS-CONTEXT-CTA-01 | PR-U1e | P2 | R0 | DONE | Events: contextual CTA (improve intent) | [#46](https://github.com/geinersito/paris-luxe-journey/pull/46) / `dc928d3` | Card CTA + WhatsApp microcopy + dual bottom CTA |
| UX-EVENTS-CTA-PREFILL-01 | PR-U1i | P2 | R0 | DONE | Events CTA prefill (reduce friction) | [#47](https://github.com/geinersito/paris-luxe-journey/pull/47) / `331907f` | Prefill helpers + wired CTAs |
| UX-TYPOGRAPHY-01 | PR-U1-1 | P2 | R0 | DONE | Typography base (tokens/scale) | [#48](https://github.com/geinersito/paris-luxe-journey/pull/48) / `afcdaf7` | Fluid tokens wired to Tailwind + dead CSS pruned |
| UX-TOUCHTARGETS-48PX-01 | PR-U1-2 | P2 | R0 | DONE | Touch targets 48px (mobile) | [#49](https://github.com/geinersito/paris-luxe-journey/pull/49) / `fe1ac10` | Button/Input/Select → h-12 (48px) |
| UX-CONTRAST-AA-01 | PR-U1-3 | P2 | R0 | DONE | Contrast AA pass | [#50](https://github.com/geinersito/paris-luxe-journey/pull/50) / `646fe9d` | AA tokens: primary + muted-foreground darkened, contract doc added |
| UX-HOME-HERO-UBERLIKE-01 | PR-U2 | P2 | R0 | DONE | Home hero Uber-like + larger form | [#51](https://github.com/geinersito/paris-luxe-journey/pull/51) / `9bc49af` | Conversion-oriented: lg 2-col grid, widget right, trust dedup |
| UX-HOME-SIMPLIFY-SECTIONS-01 | PR-U3 | P2 | R0 | DONE | Simplify landing to 4–5 sections | [#52](https://github.com/geinersito/paris-luxe-journey/pull/52) / `9fedcfb` | IA + content pruning: 9→5 sections, About folded, -19% bundle |
| UX-HOME-TRUST-LAYER-01 | PR-U4 | P2 | R0 | TODO | Trust layer + supporting CTA |  | Trust near CTA without viewport saturation |
| UX-HOME-MOBILE-STICKY-CTA-01 | PR-U5 | P2 | R0 | TODO | Mobile sticky CTA booster |  | Always-visible CTA on mobile |
| UX-TIMEPICKER-COMPACT-01 | PR-U2c | P2 | R0 | DONE | Time picker compact | [#44](https://github.com/geinersito/paris-luxe-journey/pull/44) / `9daaa9a` | Native `<input type="time">` replaces 48-item popover |
| UX-BOOKING-DETAILS-REDESIGN-01 | PR-U3a | P2 | R0 | TODO | Redesign /booking/details |  | UX-only (no Stripe) |
| UX-BOOKING-PAYMENT-OPTIMIZE-01 | PR-U3b | P2 | R0 | TODO | Optimize /booking/payment |  | Consistent language + clear CTA/T&C |
| FLOW-BOOKING-CONFIRMATION-ROBUST-01 | PR-U3c | P2 | R1 | DONE | Robustify /booking/confirmation | [#43](https://github.com/geinersito/paris-luxe-journey/pull/43) / `4541326` | Refresh/back behavior via sessionStorage fallback + price display fix |

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
