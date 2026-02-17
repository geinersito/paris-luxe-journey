# Testing Guide

## Stack

- **Vitest** — test runner (replaces Jest)
- **@testing-library/react** — component testing
- **@testing-library/jest-dom/vitest** — DOM matchers (`toBeInTheDocument`, etc.)
- **jsdom** — browser environment for unit tests

## Running tests

```bash
npm test          # run all tests once
npm test -- --watch   # watch mode
npm test -- --reporter=verbose  # detailed output per test
```

## Setup (`src/__tests__/setup.ts`)

Loaded via `vitest.config.ts → setupFiles`. Adds:

1. `@testing-library/jest-dom/vitest` matchers
2. `ResizeObserver` polyfill (required by Radix UI components in jsdom)

---

## Mock boundary principle

> **Mock the boundary your module declares, not the internals it happens to use.**

### Examples

| Module | Real boundary to mock | NOT this |
|--------|----------------------|----------|
| `BookingContext` | `@/hooks/booking/useBookingPrice` | `@/services/api` |
| `RequireBookingData` | `@/contexts/BookingContext` (useBooking) | real BookingProvider internals |
| `Payment` | `@stripe/react-stripe-js` | Stripe SDK internals |

### Why

Mocking internals couples tests to implementation details — a refactor that doesn't change behavior breaks the test. Mocking the declared boundary means: the test stays green unless the contract changes.

---

## Common patterns

### Components that use `useNavigate`

Wrap with `MemoryRouter`:

```tsx
const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);
```

### Mocking a context hook

```typescript
vi.mock("@/contexts/BookingContext", () => ({
  useBooking: vi.fn(),
}));

// In beforeEach or test:
(useBooking as ReturnType<typeof vi.fn>).mockReturnValue({ ... });
```

### Mocking a React hook that provides a function

```typescript
vi.mock("@/hooks/booking/useBookingPrice", () => ({
  useBookingPrice: vi.fn(),
}));

const mockCalculatePrice = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  (useBookingPrice as ReturnType<typeof vi.fn>).mockReturnValue({
    calculatePrice: mockCalculatePrice,
    // ... other fields
  });
});
```

### `vi.mock` hoisting — avoid referencing local variables

`vi.mock` calls are hoisted above imports. A factory that references a local `const mockFn = vi.fn()` will fail because `mockFn` is not yet initialized.

**Fix**: keep the factory minimal (just `vi.fn()`), configure the mock in `beforeEach`.

---

## Test file locations

| Test type | Location |
|-----------|----------|
| Component tests | `src/__tests__/components/` |
| Context tests | `src/__tests__/contexts/` |
| Service unit tests | `src/services/*/__tests__/` |
| Pricing guardrail | `src/__tests__/pricing-v312-locked-guardrail.test.ts` |

---

## Pricing guardrail (anti-regression)

`src/__tests__/pricing-v312-locked-guardrail.test.ts` — **do not modify expected values** without a pricing decision sign-off. This file is the SSOT for locked V3.1.2 prices.

Current locked prices (prepaid, euros):

| Route | Sedan | Van |
|-------|-------|-----|
| CDG ↔ Paris | 100 | 130 |
| Orly ↔ Paris | 90 | 115 |
| Beauvais ↔ Paris | 155 | 170 |
| Gares ↔ Paris | 80 | 100 |
| Disneyland ↔ Paris | 120 | 145 |
| Versailles ↔ Paris | 95 | 120 |
