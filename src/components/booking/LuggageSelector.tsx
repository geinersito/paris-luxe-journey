import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Minus, Plus, Luggage, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLuggageCapacity } from "@/utils/luggage";

interface LuggageSelectorProps {
  largeLuggageCount: number;
  smallLuggageCount: number;
  passengers: number; // Necesario para calcular límites realistas
  onLargeLuggageChange: (count: number) => void;
  onSmallLuggageChange: (count: number) => void;
}

export const LuggageSelector = ({
  largeLuggageCount,
  smallLuggageCount,
  passengers,
  onLargeLuggageChange,
  onSmallLuggageChange,
}: LuggageSelectorProps) => {
  const { t } = useLanguage();

  // Obtener capacidades desde utils/luggage.ts (V1.1)
  // Berlina (1-3 pax): Máx 3 grandes + pasajeros pequeñas
  // Van (4-7 pax): Máx 7 grandes + pasajeros pequeñas
  const { maxLarge, maxSmall } = getLuggageCapacity(passengers);

  const handleCountChange = (
    type: "large" | "small",
    operation: "increment" | "decrement",
  ) => {
    const currentCount =
      type === "large" ? largeLuggageCount : smallLuggageCount;
    const setCount =
      type === "large" ? onLargeLuggageChange : onSmallLuggageChange;
    const maxCount = type === "large" ? maxLarge : maxSmall;

    const newCount =
      operation === "increment"
        ? Math.min(currentCount + 1, maxCount)
        : Math.max(currentCount - 1, 0);

    setCount(newCount);
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium flex items-center gap-1.5 group">
        <Luggage className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        {t.booking.vehicle.luggage}
      </Label>

      {/* Política de equipaje - Copy explicativo */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 space-y-1.5">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-1 text-xs">
            <p className="font-semibold text-secondary dark:text-primary-foreground">
              {t.booking.luggagePolicy?.title || "Luggage Policy"}
            </p>
            <p className="text-muted-foreground">
              ✓{" "}
              {t.booking.luggagePolicy?.included ||
                "Included: 1 large + 1 small bag per passenger"}
            </p>
            <p className="text-muted-foreground">
              ✓{" "}
              {t.booking.luggagePolicy?.extraLarge ||
                "Extra large bags: €10 each"}
            </p>
            <p className="text-muted-foreground">
              ✓ {t.booking.luggagePolicy?.extraSmall || "Small bags are free"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Luggage className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">{t.booking.largeLuggage}</p>
              <p className="text-xs text-muted-foreground">
                23kg {t.booking.maxWeight}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleCountChange("large", "decrement")}
              disabled={largeLuggageCount === 0}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary-dark
                       text-white shadow-md hover:shadow-lg hover:scale-110
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       flex items-center justify-center group"
            >
              <Minus className="h-3.5 w-3.5 group-hover:scale-90 transition-transform" />
            </button>
            <span className="text-lg font-display font-semibold text-primary min-w-[2rem] text-center">
              {largeLuggageCount}
            </span>
            <button
              type="button"
              onClick={() => handleCountChange("large", "increment")}
              disabled={largeLuggageCount >= maxLarge}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary-dark
                       text-white shadow-md hover:shadow-lg hover:scale-110
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       flex items-center justify-center group"
            >
              <Plus className="h-3.5 w-3.5 group-hover:scale-90 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Luggage className="h-3 w-3 text-primary" />
            <div>
              <p className="text-sm font-medium">{t.booking.smallLuggage}</p>
              <p className="text-xs text-muted-foreground">
                10kg {t.booking.maxWeight}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleCountChange("small", "decrement")}
              disabled={smallLuggageCount === 0}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary-dark
                       text-white shadow-md hover:shadow-lg hover:scale-110
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       flex items-center justify-center group"
            >
              <Minus className="h-3.5 w-3.5 group-hover:scale-90 transition-transform" />
            </button>
            <span className="text-lg font-display font-semibold text-primary min-w-[2rem] text-center">
              {smallLuggageCount}
            </span>
            <button
              type="button"
              onClick={() => handleCountChange("small", "increment")}
              disabled={smallLuggageCount >= maxSmall}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary-dark
                       text-white shadow-md hover:shadow-lg hover:scale-110
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       flex items-center justify-center group"
            >
              <Plus className="h-3.5 w-3.5 group-hover:scale-90 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
