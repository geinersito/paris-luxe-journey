export type AirportCode = "CDG" | "ORY" | "BVA";

export interface AirportTerminalEntry {
  code: string;
  name: string;
  airlinesHint?: string;
  pickupNotes: string[];
  meetPoint: string;
  transferTimeHint?: string;
}

export interface AirportTerminalGuide {
  airport: AirportCode;
  terminals: AirportTerminalEntry[];
}

export const TERMINAL_GUIDE_LAST_UPDATED_ISO = "2026-02-14T00:00:00+01:00";

export const AIRPORT_TERMINAL_GUIDE: AirportTerminalGuide[] = [
  {
    airport: "CDG",
    terminals: [
      {
        code: "T1",
        name: "cdg_t1.name",
        airlinesHint: "cdg_t1.airlinesHint",
        pickupNotes: ["cdg_t1.tip1", "cdg_t1.tip2", "cdg_t1.tip3"],
        meetPoint: "cdg_t1.meetPoint",
        transferTimeHint: "cdg_t1.transferTimeHint",
      },
      {
        code: "T2A-2C",
        name: "cdg_t2ac.name",
        airlinesHint: "cdg_t2ac.airlinesHint",
        pickupNotes: ["cdg_t2ac.tip1", "cdg_t2ac.tip2", "cdg_t2ac.tip3"],
        meetPoint: "cdg_t2ac.meetPoint",
        transferTimeHint: "cdg_t2ac.transferTimeHint",
      },
      {
        code: "T2D-2F",
        name: "cdg_t2df.name",
        airlinesHint: "cdg_t2df.airlinesHint",
        pickupNotes: ["cdg_t2df.tip1", "cdg_t2df.tip2", "cdg_t2df.tip3"],
        meetPoint: "cdg_t2df.meetPoint",
        transferTimeHint: "cdg_t2df.transferTimeHint",
      },
      {
        code: "T2G",
        name: "cdg_t2g.name",
        airlinesHint: "cdg_t2g.airlinesHint",
        pickupNotes: ["cdg_t2g.tip1", "cdg_t2g.tip2", "cdg_t2g.tip3"],
        meetPoint: "cdg_t2g.meetPoint",
        transferTimeHint: "cdg_t2g.transferTimeHint",
      },
      {
        code: "T3",
        name: "cdg_t3.name",
        airlinesHint: "cdg_t3.airlinesHint",
        pickupNotes: ["cdg_t3.tip1", "cdg_t3.tip2", "cdg_t3.tip3"],
        meetPoint: "cdg_t3.meetPoint",
        transferTimeHint: "cdg_t3.transferTimeHint",
      },
    ],
  },
  {
    airport: "ORY",
    terminals: [
      {
        code: "1-2-3",
        name: "ory_123.name",
        airlinesHint: "ory_123.airlinesHint",
        pickupNotes: ["ory_123.tip1", "ory_123.tip2", "ory_123.tip3"],
        meetPoint: "ory_123.meetPoint",
        transferTimeHint: "ory_123.transferTimeHint",
      },
      {
        code: "4",
        name: "ory_4.name",
        airlinesHint: "ory_4.airlinesHint",
        pickupNotes: ["ory_4.tip1", "ory_4.tip2", "ory_4.tip3"],
        meetPoint: "ory_4.meetPoint",
        transferTimeHint: "ory_4.transferTimeHint",
      },
    ],
  },
  {
    airport: "BVA",
    terminals: [
      {
        code: "T1",
        name: "bva_t1.name",
        airlinesHint: "bva_t1.airlinesHint",
        pickupNotes: ["bva_t1.tip1", "bva_t1.tip2", "bva_t1.tip3"],
        meetPoint: "bva_t1.meetPoint",
        transferTimeHint: "bva_t1.transferTimeHint",
      },
      {
        code: "T2",
        name: "bva_t2.name",
        airlinesHint: "bva_t2.airlinesHint",
        pickupNotes: ["bva_t2.tip1", "bva_t2.tip2", "bva_t2.tip3"],
        meetPoint: "bva_t2.meetPoint",
        transferTimeHint: "bva_t2.transferTimeHint",
      },
    ],
  },
];
