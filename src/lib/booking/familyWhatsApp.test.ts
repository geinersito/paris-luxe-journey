import { describe, expect, it } from "vitest";
import {
  buildFamilyWhatsApp,
  projectFamilyWhatsApp,
  type WhatsAppLeg,
} from "./familyWhatsApp";

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
describe("WA1 Spanish message and URL", () => {
  it("produces the complete minimal single-trip message with one encoding", () => {
    const { message, url } = buildFamilyWhatsApp({ legs: [base] });
    expect(message).toBe(
      [
        "CONSULTA — DISPONIBILIDAD Y PRECIO POR CONFIRMAR",
        "",
        "TRASLADO: Orly (ORY) → Disneyland Paris",
        "Recogida solicitada: 2026-12-20 15:30 (Europe/Paris)",
        "Viajeros: 2 adultos y 0 menores",
        "Equipaje: grandes: 1; cabina: 0; mochilas: por confirmar; carritos plegables: 0; carritos no plegables: 0",
        "Hotel/punto público: por concretar en el chat",
        "",
        "¿Podéis confirmar disponibilidad y precio?",
      ].join("\n"),
    );
    const link = new URL(url);
    expect(link.origin + link.pathname).toBe("https://wa.me/33668251102");
    expect([...link.searchParams.keys()]).toEqual(["text"]);
    expect(link.searchParams.get("text")).toBe(message);
  });
  it("keeps return passengers, bags and flight times independent", () => {
    const back: WhatsAppLeg = {
      ...base,
      pickup: base.dropoff,
      dropoff: base.pickup,
      adults: 1,
      requestedPickup: { ...civil, date: "2026-12-24", time: "10:00" },
      baggage: { ...base.baggage, large: 3 },
      flight: {
        movement: "departure",
        number: null,
        scheduled: { ...civil, date: "2026-12-24", time: "14:00" },
      },
    };
    const { message } = buildFamilyWhatsApp({ legs: [base, back] });
    const [out, incoming] = message.split("VUELTA:");
    expect(out).toContain("IDA: Orly (ORY)");
    expect(out).toContain("2 adultos y 0 menores");
    expect(incoming).toContain("1 adulto y 0 menores");
    expect(incoming).toContain("grandes: 3");
    expect(incoming).toContain("Recogida solicitada: 2026-12-24 10:00");
    expect(incoming).toContain(
      "Vuelo por confirmar · salida: 2026-12-24 14:00",
    );
  });
  it("includes ages only when needed for a requested device, up to eight travellers", () => {
    const child = {
      age: { value: 3, unit: "years" as const },
      restraint: { type: "child_seat" as const, provider: "operator" as const },
    };
    const children = [
      child,
      { ...child, ageNeededForRestraint: true },
      { ...child, age: null, ageNeededForRestraint: true },
      ...Array(3).fill(child),
    ];
    const { message } = buildFamilyWhatsApp({
      legs: [
        { ...base, children, baggage: { ...base.baggage, special: true } },
      ],
    });
    expect(message).toContain("2 adultos y 6 menores");
    expect(message.match(/edad para dispositivo: 3 años/g)).toHaveLength(1);
    expect(message).toContain("edad para dispositivo: por confirmar");
    expect(message.match(/silla infantil \(operador\)/g)).toHaveLength(6);
    expect(message).toContain("Equipaje especial: consultar por chat");
    expect(() =>
      buildFamilyWhatsApp({ legs: [{ ...base, adults: 3, children }] }),
    ).toThrow("WA1_INVALID_REQUEST");
  });
  it.each(["2026-03-29", "2026-10-25"])(
    "flags DST civil time for manual review on %s",
    (date) => {
      const v = { ...base, requestedPickup: { ...civil, date, time: "02:30" } };
      expect(buildFamilyWhatsApp({ legs: [v] }).message).toContain(
        "hora inexistente/ambigua; revisar por chat",
      );
    },
  );
  it("does not leak extras or invent missing times or devices", () => {
    const v = {
      ...base,
      requestedPickup: { ...civil, time: null },
      children: [
        {
          age: null,
          restraint: {
            type: "undetermined" as const,
            provider: "undetermined" as const,
          },
          contact: "CANARY_&+#%🧳",
        },
      ],
      address: "CANARY_&+#%🧳",
      special: { description: "CANARY_&+#%🧳" },
    };
    const { message, url } = buildFamilyWhatsApp({ legs: [v] });
    expect(decodeURIComponent(url)).not.toContain("CANARY");
    expect(message).toContain("hora por confirmar");
    expect(message).toContain("Menor: por confirmar (por confirmar)");
    expect(message).not.toMatch(/edad|confirmada|recibida|enviada/);
  });
});
