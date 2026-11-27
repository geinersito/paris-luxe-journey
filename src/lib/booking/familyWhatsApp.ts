import { z } from "zod";
import type { FamilyLeg } from "@/types/familyBooking";

type Child = Pick<FamilyLeg["children"][number], "age" | "restraint"> & {
  ageNeededForRestraint?: boolean;
};
export type WhatsAppLeg = Pick<
  FamilyLeg,
  "requestedPickup" | "flight" | "adults"
> & {
  pickup: Pick<FamilyLeg["pickup"], "code">;
  dropoff: Pick<FamilyLeg["dropoff"], "code">;
  children: Child[];
  baggage: Omit<FamilyLeg["baggage"], "special"> & { special?: boolean };
};
const count = z.number().int().safe().nonnegative();
const date = z.string().date().regex(/^20/);
const civil = z.object({
  date,
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
    .nullable(),
  zone: z.literal("Europe/Paris"),
});
const place = z.object({
  code: z.enum(["ORY", "CDG", "PARIS", "DISNEY", "other"]),
});
const baggage = z.object({
  large: count.nullable(),
  cabin: count.nullable(),
  backpacks: count.nullable(),
  foldableStrollers: count.nullable(),
  nonFoldableStrollers: count.nullable(),
  special: z.boolean().optional(),
});
const child = z
  .object({
    age: z
      .object({ value: count, unit: z.enum(["years", "months"]) })
      .nullable(),
    ageNeededForRestraint: z.boolean().optional(),
    restraint: z.object({
      type: z.enum(["child_seat", "booster", "not_requested", "undetermined"]),
      provider: z.enum(["operator", "passenger", "undetermined"]),
    }),
  })
  .refine((c) => !c.age || c.age.value < (c.age.unit === "years" ? 18 : 216))
  .transform((c) => ({
    ...c,
    age:
      c.ageNeededForRestraint &&
      ["child_seat", "booster"].includes(c.restraint.type)
        ? c.age
        : null,
  }));
const leg = z
  .object({
    pickup: place,
    dropoff: place,
    requestedPickup: civil,
    adults: count.max(8),
    children: z.array(child).max(8),
    baggage,
    flight: z
      .object({
        movement: z.enum(["arrival", "departure"]),
        number: z
          .string()
          .regex(/^(?:[A-Z0-9]{2}|[A-Z]{3})\d{1,4}[A-Z]?$/)
          .nullable(),
        scheduled: civil.nullable(),
      })
      .optional(),
  })
  .refine(
    (v) =>
      v.adults + v.children.length >= 1 && v.adults + v.children.length <= 8,
  )
  .refine(
    (v) =>
      !v.flight ||
      ["ORY", "CDG"].includes(
        v.flight.movement === "arrival" ? v.pickup.code : v.dropoff.code,
      ),
  );
const draft = z.object({ legs: z.array(leg).min(1).max(2) });
/** Strips every non-allowlisted field; no payload in errors, logs or storage. */
export function projectFamilyWhatsApp(input: {
  legs: readonly WhatsAppLeg[];
}): WhatsAppLeg[] {
  const parsed = draft.safeParse(input);
  if (!parsed.success) throw new Error("WA1_INVALID_REQUEST");
  // Runtime schema establishes required fields despite this repo's non-strict TS inference.
  return parsed.data.legs as WhatsAppLeg[];
}
