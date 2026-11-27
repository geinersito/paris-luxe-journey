/** Declarative request only; not accepted by the existing booking endpoint. */
type FamilyCount = number | null; // Unknown is null; zero means explicitly none.

type FamilyPlace = {
  code: "ORY" | "CDG" | "PARIS" | "DISNEY" | "other";
  address?: string;
};

/** Local civil time: YYYY-MM-DD and HH:mm; runtime validation belongs to F4. */
type FamilyParisTime = {
  date: string;
  time: string | null;
  zone: "Europe/Paris";
};

type FamilyChild = {
  age: { value: number; unit: "years" | "months" } | null;
  heightCm?: number | null;
  weightKg?: number | null;
  restraint: {
    type: "child_seat" | "booster" | "not_requested" | "undetermined";
    provider: "operator" | "passenger" | "undetermined";
  };
};

type FamilyBaggage = {
  large: FamilyCount;
  cabin: FamilyCount;
  backpacks: FamilyCount;
  foldableStrollers: FamilyCount;
  nonFoldableStrollers: FamilyCount;
  special?: {
    description: string;
    dimensionsCm?: [length: number, width: number, height: number];
  }[];
};

export type FamilyLeg = {
  pickup: FamilyPlace;
  dropoff: FamilyPlace;
  requestedPickup: FamilyParisTime;
  flight?: {
    movement: "arrival" | "departure";
    number: string | null;
    scheduled: FamilyParisTime | null;
  };
  adults: number;
  children: FamilyChild[];
  baggage: FamilyBaggage;
};

/** Unconfirmed intake, not a transport booking, price or vehicle assignment. */
export type FamilyBookingContractV1 = {
  schemaVersion: 1;
  requestKey: string; // Intent nonce; never identity or read authorization.
  legs: [FamilyLeg] | [FamilyLeg, FamilyLeg];
  contact: {
    name: string;
    phone: string;
    email?: string;
  };
};
