/**
 * ANTI-REGRESSION TEST - PRICING V3.1.2 LOCKED TARGETS
 *
 * CRITICAL: This test ensures prepaid prices match LOCKED targets with 0¢ tolerance
 * Any deviation means revenue logic has broken - CI MUST FAIL
 *
 * Coverage: 17 routes × 2 vehicles = 34 assertions
 *
 * LOCKED TARGETS (all in cents):
 * - Airports: CDG↔PAR 100/130, ORY↔PAR 90/115, LBG↔PAR 105/130, BVA↔PAR 155/170
 * - Airport connections: CDG↔ORY 130/155, CDG↔LBG 110/130, ORY↔LBG 120/145
 * - 5 Gares unified: GDN/GDL/GDE/GDM/GSL↔PAR all 80/100
 * - Attractions: DLP↔PAR 120/145, VRS↔PAR 95/120
 * - One-way: CDG→DLP 125/150, CDG→VRS 110/135, ORY→DLP 115/140
 */

import { describe, it, expect } from "vitest";
import { calculatePricing } from "@/services/pricing/calculatePricing";
import { RouteKey } from "@/config/pricing-v312";

/**
 * LOCKED PREPAID PRICES (in cents)
 * Format: [sedan_cents, van_cents]
 */
const LOCKED_TARGETS: Record<RouteKey, [number, number]> = {
  // Airports to Paris
  CDG_PARIS: [10000, 13000],
  ORLY_PARIS: [9000, 11500],
  LEBOURGET_PARIS: [10500, 13000],
  BEAUVAIS_PARIS: [15500, 17000],

  // Airport connections
  CDG_ORLY: [13000, 15500],
  CDG_LEBOURGET: [11000, 13000],
  ORLY_LEBOURGET: [12000, 14500],

  // Train stations (5 Gares - unified pricing)
  GAREDUNORD_PARIS: [8000, 10000],
  GARELYON_PARIS: [8000, 10000],
  GAREST_PARIS: [8000, 10000],
  GAREMONTPARNASSE_PARIS: [8000, 10000],
  GARELAZARE_PARIS: [8000, 10000],

  // Attractions
  DISNEY_PARIS: [12000, 14500],
  VERSAILLES_PARIS: [9500, 12000],

  // One-way routes
  CDG_DISNEY: [12500, 15000],
  CDG_VERSAILLES: [11000, 13500],
  ORLY_DISNEY: [11500, 14000],
};

describe("Pricing V3.1.2 - LOCKED Guardrail (0¢ tolerance)", () => {
  describe("Airports to Paris", () => {
    it("CDG ↔ Paris - sedan: 100€", () => {
      const result = calculatePricing("CDG_PARIS", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.CDG_PARIS[0]);
    });

    it("CDG ↔ Paris - van: 130€", () => {
      const result = calculatePricing("CDG_PARIS", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.CDG_PARIS[1]);
    });

    it("Orly ↔ Paris - sedan: 90€", () => {
      const result = calculatePricing("ORLY_PARIS", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.ORLY_PARIS[0]);
    });

    it("Orly ↔ Paris - van: 115€", () => {
      const result = calculatePricing("ORLY_PARIS", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.ORLY_PARIS[1]);
    });

    it("Le Bourget ↔ Paris - sedan: 105€", () => {
      const result = calculatePricing("LEBOURGET_PARIS", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.LEBOURGET_PARIS[0]);
    });

    it("Le Bourget ↔ Paris - van: 130€", () => {
      const result = calculatePricing("LEBOURGET_PARIS", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.LEBOURGET_PARIS[1]);
    });

    it("Beauvais ↔ Paris - sedan: 155€", () => {
      const result = calculatePricing("BEAUVAIS_PARIS", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.BEAUVAIS_PARIS[0]);
    });

    it("Beauvais ↔ Paris - van: 170€", () => {
      const result = calculatePricing("BEAUVAIS_PARIS", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.BEAUVAIS_PARIS[1]);
    });
  });

  describe("Airport Connections", () => {
    it("CDG ↔ Orly - sedan: 130€", () => {
      const result = calculatePricing("CDG_ORLY", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.CDG_ORLY[0]);
    });

    it("CDG ↔ Orly - van: 155€", () => {
      const result = calculatePricing("CDG_ORLY", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.CDG_ORLY[1]);
    });

    it("CDG ↔ Le Bourget - sedan: 110€", () => {
      const result = calculatePricing("CDG_LEBOURGET", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.CDG_LEBOURGET[0]);
    });

    it("CDG ↔ Le Bourget - van: 130€", () => {
      const result = calculatePricing("CDG_LEBOURGET", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.CDG_LEBOURGET[1]);
    });

    it("Orly ↔ Le Bourget - sedan: 120€", () => {
      const result = calculatePricing("ORLY_LEBOURGET", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.ORLY_LEBOURGET[0]);
    });

    it("Orly ↔ Le Bourget - van: 145€", () => {
      const result = calculatePricing("ORLY_LEBOURGET", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.ORLY_LEBOURGET[1]);
    });
  });

  describe("Train Stations (Gares) - Unified 80€/100€", () => {
    it("Gare du Nord ↔ Paris - sedan: 80€", () => {
      const result = calculatePricing("GAREDUNORD_PARIS", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.GAREDUNORD_PARIS[0]);
    });

    it("Gare du Nord ↔ Paris - van: 100€", () => {
      const result = calculatePricing("GAREDUNORD_PARIS", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.GAREDUNORD_PARIS[1]);
    });

    it("Gare de Lyon ↔ Paris - sedan: 80€", () => {
      const result = calculatePricing("GARELYON_PARIS", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.GARELYON_PARIS[0]);
    });

    it("Gare de Lyon ↔ Paris - van: 100€", () => {
      const result = calculatePricing("GARELYON_PARIS", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.GARELYON_PARIS[1]);
    });

    it("Gare de l'Est ↔ Paris - sedan: 80€", () => {
      const result = calculatePricing("GAREST_PARIS", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.GAREST_PARIS[0]);
    });

    it("Gare de l'Est ↔ Paris - van: 100€", () => {
      const result = calculatePricing("GAREST_PARIS", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.GAREST_PARIS[1]);
    });

    it("Gare Montparnasse ↔ Paris - sedan: 80€", () => {
      const result = calculatePricing("GAREMONTPARNASSE_PARIS", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(
        LOCKED_TARGETS.GAREMONTPARNASSE_PARIS[0],
      );
    });

    it("Gare Montparnasse ↔ Paris - van: 100€", () => {
      const result = calculatePricing("GAREMONTPARNASSE_PARIS", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(
        LOCKED_TARGETS.GAREMONTPARNASSE_PARIS[1],
      );
    });

    it("Gare Saint-Lazare ↔ Paris - sedan: 80€", () => {
      const result = calculatePricing("GARELAZARE_PARIS", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.GARELAZARE_PARIS[0]);
    });

    it("Gare Saint-Lazare ↔ Paris - van: 100€", () => {
      const result = calculatePricing("GARELAZARE_PARIS", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.GARELAZARE_PARIS[1]);
    });
  });

  describe("Attractions", () => {
    it("Disneyland ↔ Paris - sedan: 120€", () => {
      const result = calculatePricing("DISNEY_PARIS", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.DISNEY_PARIS[0]);
    });

    it("Disneyland ↔ Paris - van: 145€", () => {
      const result = calculatePricing("DISNEY_PARIS", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.DISNEY_PARIS[1]);
    });

    it("Versailles ↔ Paris - sedan: 95€", () => {
      const result = calculatePricing("VERSAILLES_PARIS", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.VERSAILLES_PARIS[0]);
    });

    it("Versailles ↔ Paris - van: 120€", () => {
      const result = calculatePricing("VERSAILLES_PARIS", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.VERSAILLES_PARIS[1]);
    });
  });

  describe("One-Way Routes", () => {
    it("CDG → Disneyland - sedan: 125€", () => {
      const result = calculatePricing("CDG_DISNEY", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.CDG_DISNEY[0]);
    });

    it("CDG → Disneyland - van: 150€", () => {
      const result = calculatePricing("CDG_DISNEY", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.CDG_DISNEY[1]);
    });

    it("CDG → Versailles - sedan: 110€", () => {
      const result = calculatePricing("CDG_VERSAILLES", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.CDG_VERSAILLES[0]);
    });

    it("CDG → Versailles - van: 135€", () => {
      const result = calculatePricing("CDG_VERSAILLES", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.CDG_VERSAILLES[1]);
    });

    it("Orly → Disneyland - sedan: 115€", () => {
      const result = calculatePricing("ORLY_DISNEY", "sedan");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.ORLY_DISNEY[0]);
    });

    it("Orly → Disneyland - van: 140€", () => {
      const result = calculatePricing("ORLY_DISNEY", "van");
      expect(result).not.toBeNull();
      expect(result!.prepaid_price).toBe(LOCKED_TARGETS.ORLY_DISNEY[1]);
    });
  });

  describe("Comprehensive Coverage Check", () => {
    it("should cover all 17 routes × 2 vehicles = 34 combinations", () => {
      const routeKeys = Object.keys(LOCKED_TARGETS) as RouteKey[];
      expect(routeKeys).toHaveLength(17);

      let totalAssertions = 0;
      routeKeys.forEach((routeKey) => {
        const [sedanTarget, vanTarget] = LOCKED_TARGETS[routeKey];

        const sedanResult = calculatePricing(routeKey, "sedan");
        const vanResult = calculatePricing(routeKey, "van");

        expect(sedanResult).not.toBeNull();
        expect(vanResult).not.toBeNull();
        expect(sedanResult!.prepaid_price).toBe(sedanTarget);
        expect(vanResult!.prepaid_price).toBe(vanTarget);

        totalAssertions += 2;
      });

      expect(totalAssertions).toBe(34);
    });
  });
});
