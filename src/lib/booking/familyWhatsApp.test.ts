import { describe, expect, it } from "vitest";
import { projectFamilyWhatsApp, type WhatsAppLeg } from "./familyWhatsApp";

const civil = {
  date: "2026-12-20",
  time: "15:30",
  zone: "Europe/Paris",
} as const;
const base: WhatsAppLeg = {
  pickup: { code: "ORY" },
  dropoff: { code: "DISNEY" },
  requestedPickup: civil,
  adults: 2,
  children: [],
  baggage: {
    large: 1,
    cabin: 0,
    backpacks: null,
    foldableStrollers: 0,
    nonFoldableStrollers: 0,
  },
};
const project = (legs: unknown) =>
  projectFamilyWhatsApp({ legs } as { legs: WhatsAppLeg[] });
describe("WA1 bounded projection", () => {
  it("strips private data at every level without changing the source", () => {
    const source = {
      ...base,
      contact: "CANARY_&+#%🧳",
      requestKey: "SECRET",
      pickup: { ...base.pickup, address: "12 rue Privée" },
      dropoff: { ...base.dropoff, hotel: "12 rue Privée", room: "SECRET" },
      requestedPickup: { ...civil, coordinates: "SECRET" },
      flight: {
        movement: "arrival",
        number: "AB1234",
        scheduled: { ...civil, ticket: "SECRET" },
        pnr: "SECRET",
      },
      children: [
        {
          age: { value: 17, unit: "years" },
          restraint: { type: "not_requested", provider: "passenger" },
          name: "SECRET",
          heightCm: 99,
          weightKg: 20,
        },
      ],
      baggage: { ...base.baggage, description: "SECRET", special: true },
    };
    const before = JSON.stringify(source);
    const result = project([source])[0];
    expect(JSON.stringify(result)).not.toMatch(
      /CANARY|SECRET|Privée|heightCm|weightKg|hotel/,
    );
    expect(result.children[0].age).toBeNull();
    expect(result.baggage).toMatchObject({ backpacks: null, cabin: 0 });
    expect(JSON.stringify(source)).toBe(before);
  });
  it.each([0, 9, -1, 1.5, NaN, Infinity, null, "2"])(
    "rejects adult count %s",
    (adults) => {
      expect(() => project([{ ...base, adults }])).toThrow(
        "WA1_INVALID_REQUEST",
      );
    },
  );
  it.each([[], [base, base, base], [null], [{ ...base, children: null }]])(
    "rejects malformed legs %j",
    (legs) => {
      expect(() => project(legs)).toThrow("WA1_INVALID_REQUEST");
    },
  );
  it.each(["2026-02-30", "2026-13-01", "CANARY"])("rejects date %s", (date) => {
    expect(() =>
      project([{ ...base, requestedPickup: { ...civil, date } }]),
    ).toThrow("WA1_INVALID_REQUEST");
  });
  it.each(["24:00", "12:60", "9:00"])("rejects time %s", (time) => {
    expect(() =>
      project([{ ...base, requestedPickup: { ...civil, time } }]),
    ).toThrow("WA1_INVALID_REQUEST");
  });
  it.each(["&", "+", "#", "%", "🧳", "33668251102", "a@example.test"])(
    "rejects flight injection %s",
    (number) => {
      expect(() =>
        project([
          { ...base, flight: { movement: "arrival", number, scheduled: null } },
        ]),
      ).toThrow("WA1_INVALID_REQUEST");
    },
  );
  it("rejects unknown place and invalid baggage without reflecting their values", () => {
    expect(() => project([{ ...base, dropoff: { code: "CANARY" } }])).toThrow(
      /^WA1_INVALID_REQUEST$/,
    );
    for (const large of [-1, 0.5, Infinity, "CANARY"]) {
      expect(() =>
        project([{ ...base, baggage: { ...base.baggage, large } }]),
      ).toThrow(/^WA1_INVALID_REQUEST$/);
    }
  });
});
