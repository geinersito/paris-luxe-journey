# PRODUCT SCOPE — Booking System (Paris Elite Services)

**Version**: 1.0  
**Last updated**: 2026-02-03

## One-liner

Marketing + booking SPA for luxury airport transfers in Paris (CDG/Orly/Beauvais) with Stripe checkout, Supabase backend, and multi-language support (EN/ES/FR/PT).

---

## In-Scope (Explicit)

### Core Booking Funnel

**Flow**: `/` → `/booking` → `/booking/details` → `/booking/payment` → `/booking/confirmation`

**Data captured**:
- Pickup/dropoff locations (Google Maps autocomplete)
- Date/time (timezone: Europe/Paris display, UTC storage)
- Passenger count + luggage
- Service level (vehicle type)
- Contact info (name, email, phone)
- Payment (Stripe Payment Intent)

**Persisted**: 
- Booking context (localStorage + React Context)
- Confirmed reservations (Supabase `bookings` table - schema TBD)

**Edge Functions called** (evidence needed):
- Stripe Payment Intent creation (server-side)
- Confirmation email via Resend (server-side)

### Content Pages

- **Home** (`/`): Hero + services + fleet + testimonials + FAQ
- **Excursions** (`/excursions`): Pre-packaged tours
- **Events** (`/events`): Event-based transfers
- **Airports**: `/airports/cdg`, `/airports/orly`, `/airports/beauvais`
- **Guides**: `/guides/avoid-fake-taxis`
- **Legal**: `/faq`, `/privacy`, `/terms`
- **Blog**: `/blog/*` (index, category, post pages)

### Integrations

**Supabase** (`src/integrations/supabase/client.ts`, `src/lib/supabase*.ts`):
- Database: bookings, vehicles, pricing (schema in migrations)
- Auth: `AuthProvider` (social + email)
- RLS: anon key in frontend, service_role in Edge Functions only

**Stripe** (`src/utils/stripe.ts`, `src/services/pricing/*`):
- Payment Intents (checkout flow)
- Webhooks (idempotency + event processing)
- Public key: frontend OK (`VITE_STRIPE_PUBLIC_KEY`)
- Secret key: **MUST BE** server-side only

**Resend** (`src/lib/email.ts`):
- Confirmation emails
- API key: **MUST BE** server-side only

**Google Maps** (`src/utils/loadGoogleMapsScript.ts`):
- Autocomplete for locations
- Distance calculation (pricing)
- Public API key: frontend OK (`VITE_GOOGLE_MAPS_API_KEY`)

### Languages

**Supported**: EN, ES, FR, PT  
**Implementation**: `src/i18n/*.ts`, `src/contexts/LanguageContext.tsx`  
**SSOT**: Strict TypeScript validation (pre-commit enforced)

---

## Out-of-Scope (Explicit)

### Not Implemented Yet

- **Admin UI**: No dashboard for operators/dispatchers
- **Driver assignment**: No dispatching logic
- **Real-time tracking**: No GPS/maps integration
- **Cancellations/Refunds backend**: UI hints exist, no server-side workflow
- **Multi-currency**: Only EUR pricing
- **Dynamic pricing**: Base pricing only (surge/demand not implemented)
- **Booking modifications**: No edit/reschedule flow

### Explicitly NOT Touching

- **ERP dispatch system**: Separate codebase/DB schema (`dispatch_*` tables)
- **Accounting/invoicing**: Not in booking scope
- **Driver management**: Not in booking scope

---

## Non-Goals (What We Don't Promise)

**Do NOT claim** unless verified with legal/operations:
- "Licensed VTC operator" (if not certified)
- "24/7 live support" (if only email support)
- "Free cancellation" (without defined policy + server enforcement)
- "Meet & Greet" (if not operationally guaranteed)

**Evidence location**: Claims in UI must match `src/i18n/*.ts` translations and be validated against actual service capabilities.

---

## Routes SSOT (from `src/App.tsx`)

### Public Routes

- `/` - Home
- `/excursions` - Excursions catalog
- `/events` - Events transfers
- `/blog` - Blog index
- `/blog/:category` - Blog category
- `/blog/:category/:slug` - Blog post
- `/airports/cdg` - CDG Airport guide
- `/airports/orly` - Orly Airport guide
- `/airports/beauvais` - Beauvais Airport guide
- `/guides/avoid-fake-taxis` - Safety guide
- `/faq` - FAQ page
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Booking Funnel Routes (Protected)

- `/booking` - Initial booking form
- `/booking/details` - Passenger details
- `/booking/payment` - Stripe checkout
- `/booking/confirmation` - Confirmation page (requires booking data)

**Protection**: `RequireBookingData` component guards details/payment/confirmation routes.

### Dev/Preview Routes

- `/design-preview` - Design system preview (dev only)

---

## Funnel SSOT

### Step 1: `/booking` - Search & Quote

**Captured**:
- Pickup location (Google Maps)
- Dropoff location (Google Maps)
- Pickup date/time (datepicker, timezone: Europe/Paris)
- Passengers + luggage

**Persisted**: `BookingContext` (React Context + localStorage)

**Validation**: Required fields + valid locations

**CTA**: "Continue to Details" → `/booking/details`

### Step 2: `/booking/details` - Contact Info

**Captured**:
- First name, last name
- Email
- Phone
- Special requests (optional)

**Persisted**: `BookingContext`

**Validation**: Required fields + email format

**CTA**: "Continue to Payment" → `/booking/payment`

### Step 3: `/booking/payment` - Checkout

**Actions**:
1. Call server to create Stripe Payment Intent
2. Render Stripe Elements (card input)
3. Submit payment via Stripe SDK
4. On success: create booking record in Supabase
5. Redirect to `/booking/confirmation`

**Evidence**: `src/hooks/booking/usePaymentProcess.ts`, `src/services/payments/PaymentServiceV312.ts`

**Webhook handling**: Stripe events processed server-side (idempotent)

### Step 4: `/booking/confirmation` - Success

**Display**:
- Booking reference
- Summary (locations, date/time, price)
- Confirmation email sent notification

**Persisted**: Booking ID in Supabase

**Edge case**: If user refreshes, must fetch booking by ID (not yet implemented - TODO)

---

## Definition of "Booking Confirmed"

**Criteria**:
1. Stripe Payment Intent status = `succeeded`
2. Booking record created in Supabase with `status = 'confirmed'`
3. Confirmation email sent via Resend (idempotent)

**Source of truth**: Supabase `bookings` table

---

## Shared Supabase Constraint

**Critical**: This project shares Supabase with ERP system.

**Rules**:
- **NEVER touch** `dispatch_*` schema from booking code
- **ONLY** modify `booking_*` tables via DB-only PRs with migrations
- **RLS** mandatory on all booking tables
- **Service role key** only in Edge Functions, never in frontend

**Evidence**: See `docs/SUPERVISOR.md` section 3.5

---

## HIGH RISKS (Secrets Hygiene Violations)

### ❌ Critical Security Issues Detected

**Location**: `.env.example` lines 7, 10

```
VITE_STRIPE_SECRET_KEY=your_stripe_secret_key  ❌ EXPOSED TO CLIENT
VITE_RESEND_API_KEY=your_resend_api_key        ❌ EXPOSED TO CLIENT
```

**Violation**: `VITE_*` env vars are bundled into client JS and publicly accessible.

**Impact**: 
- Stripe secret key in client = full account compromise
- Resend API key in client = email spoofing/abuse

**Evidence**: 
- `src/lib/email.ts:19` uses `import.meta.env.VITE_RESEND_API_KEY` in client code
- `.env.example` documents both secrets as `VITE_*`

**Required Fix**: 
1. Move to Edge Functions (server-side only)
2. Remove `VITE_` prefix from secret keys
3. Update `src/lib/email.ts` to call Edge Function instead of Resend API directly

**Blocker**: This MUST be fixed before production deploy.

---

## Tech Stack (SSOT)

- **Framework**: Vite 5.4 + React 18 + TypeScript 5.5
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: React Context + TanStack Query
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Payments**: Stripe (Payment Intents)
- **Email**: Resend
- **Maps**: Google Maps JavaScript API
- **Deployment**: TBD (Vercel/Netlify assumed)

---

**Evidence Sources**:
- Routes: `src/App.tsx:48-245`
- Integrations: `.env.example:1-17`, `src/lib/email.ts:15-26`
- i18n: `src/types/i18n.ts`, `src/i18n/*.ts`
- Booking flow: `src/hooks/booking/*.ts`, `src/services/payments/*.ts`
