/**
 * TESTS UNITARIOS - PRICING CALCULATOR V3.1.2
 *
 * Valida:
 * - Cálculos correctos de precios
 * - Validación de márgenes
 * - Casos especiales (Beauvais)
 * - Stripe fee calculations
 */

import { describe, it, expect } from "vitest";
import {
  calculatePricing,
  computeWorstCaseFee,
  validateStripeFeeConfig,
} from "../calculatePricing";

describe("Pricing Calculator V3.1.2", () => {
  describe("CDG_PARIS", () => {
    it("should calculate correct prices for sedan", () => {
      const result = calculatePricing("CDG_PARIS", "sedan", true);

      expect(result).not.toBeNull();
      expect(result?.prepaid_price).toBe(8500); // €85.00
      expect(result?.flexible_price).toBe(9000); // €90.00
      expect(result?.hold_amount).toBe(3000); // €30.00
      expect(result?.payment_modes_enabled.prepaid).toBe(true);
      expect(result?.payment_modes_enabled.flexible).toBe(true);

      // Verificar datos internos
      expect(result?._internal?.partner_floor).toBe(8000); // €80.00
      expect(result?._internal?.flexible_commission).toBe(1000); // €10.00
      expect(result?._internal?.prepaid_discount).toBe(500); // €5.00
    });

    it("should calculate correct prices for van", () => {
      const result = calculatePricing("CDG_PARIS", "van", true);

      expect(result).not.toBeNull();
      expect(result?.prepaid_price).toBe(10800); // €108.00
      expect(result?.flexible_price).toBe(11300); // €113.00
      expect(result?.hold_amount).toBe(3000); // €30.00

      // Verificar datos internos
      expect(result?._internal?.partner_floor).toBe(10400); // €104.00
      expect(result?._internal?.flexible_commission).toBe(1300); // €13.00
    });
  });

  describe("ORLY_PARIS", () => {
    it("should calculate correct prices for sedan", () => {
      const result = calculatePricing("ORLY_PARIS", "sedan", true);

      expect(result).not.toBeNull();
      expect(result?.prepaid_price).toBe(8000); // €80.00
      expect(result?.flexible_price).toBe(8500); // €85.00
      expect(result?.hold_amount).toBe(3000); // €30.00

      // Verificar datos internos
      expect(result?._internal?.partner_floor).toBe(7500); // €75.00
    });

    it("should calculate correct prices for van", () => {
      const result = calculatePricing("ORLY_PARIS", "van", true);

      expect(result).not.toBeNull();
      expect(result?.prepaid_price).toBe(10600); // €106.00
      expect(result?.flexible_price).toBe(11100); // €111.00

      // Verificar datos internos
      expect(result?._internal?.partner_floor).toBe(9800); // €98.00
    });
  });

  describe("GAREDUNORD_PARIS", () => {
    it("should calculate correct prices for sedan", () => {
      const result = calculatePricing("GAREDUNORD_PARIS", "sedan", true);

      expect(result).not.toBeNull();
      expect(result?.prepaid_price).toBe(6500); // €65.00
      expect(result?.flexible_price).toBe(7000); // €70.00
      expect(result?.hold_amount).toBe(1500); // €15.00 (short distance)

      // Verificar datos internos
      expect(result?._internal?.partner_floor).toBe(6000); // €60.00
    });
  });

  describe("BEAUVAIS_PARIS (Special Case)", () => {
    it("should be prepaid-only for sedan", () => {
      const result = calculatePricing("BEAUVAIS_PARIS", "sedan", true);

      expect(result).not.toBeNull();
      expect(result?.prepaid_price).toBe(14000); // €140.00 (PF + buffer)
      expect(result?.flexible_price).toBe(0); // No flexible
      expect(result?.hold_amount).toBe(0); // No hold
      expect(result?.payment_modes_enabled.prepaid).toBe(true);
      expect(result?.payment_modes_enabled.flexible).toBe(false);

      // Verificar datos internos
      expect(result?._internal?.partner_floor).toBe(13000); // €130.00
    });

    it("should be prepaid-only for van", () => {
      const result = calculatePricing("BEAUVAIS_PARIS", "van", true);

      expect(result).not.toBeNull();
      expect(result?.prepaid_price).toBe(17900); // €179.00 (PF + buffer)
      expect(result?.flexible_price).toBe(0); // No flexible
      expect(result?.payment_modes_enabled.flexible).toBe(false);

      // Verificar datos internos
      expect(result?._internal?.partner_floor).toBe(16900); // €169.00
    });
  });

  describe("Stripe Fee Calculation", () => {
    it("should calculate worst case fee correctly", () => {
      // €85.00 = 8500 céntimos
      // 3.5% = 297.5 → 298 céntimos
      // €0.25 = 25 céntimos
      // Total = 323 céntimos
      const fee = computeWorstCaseFee(8500);
      expect(fee).toBe(323);
    });

    it("should calculate fee for different amounts", () => {
      expect(computeWorstCaseFee(10000)).toBe(375); // €100 → €3.75
      expect(computeWorstCaseFee(5000)).toBe(200); // €50 → €2.00
    });
  });

  describe("Stripe Fee Config Validation", () => {
    it("should validate correct config", () => {
      const result = validateStripeFeeConfig(3.5, 0.25);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should reject invalid percent fee", () => {
      const result = validateStripeFeeConfig(15, 0.25);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Percent fee");
    });

    it("should reject invalid fixed fee", () => {
      const result = validateStripeFeeConfig(3.5, 5);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Fixed fee");
    });
  });

  describe("Margin Validation", () => {
    it("should have sufficient margin for all routes", () => {
      const routes: Array<[string, "sedan" | "van"]> = [
        ["CDG_PARIS", "sedan"],
        ["CDG_PARIS", "van"],
        ["ORLY_PARIS", "sedan"],
        ["ORLY_PARIS", "van"],
        ["BEAUVAIS_PARIS", "sedan"],
        ["BEAUVAIS_PARIS", "van"],
        ["GAREDUNORD_PARIS", "sedan"],
      ];

      routes.forEach(([routeKey, vehicleType]) => {
        expect(() => {
          calculatePricing(routeKey as string, vehicleType, true);
        }).not.toThrow();
      });
    });
  });

  describe("Public API (no internal data)", () => {
    it("should not expose internal data by default", () => {
      const result = calculatePricing("CDG_PARIS", "sedan", false);

      expect(result).not.toBeNull();
      expect(result?._internal).toBeUndefined();
    });
  });
});
