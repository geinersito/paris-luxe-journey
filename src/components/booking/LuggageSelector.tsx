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
      <div className="bg-muted/80 border border-border rounded-xl p-4 space-y-2">
        <div className="flex items-start gap-2.5">
          <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-2 text-xs flex-1">
            <p className="font-semibold text-foreground text-sm">
              {t.booking.luggagePolicy?.title || "Politique de Bagages"}
            </p>
            <div className="space-y-1.5">
              <p className="text-muted-foreground flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{t.booking.luggagePolicy?.included ||
                  "Inclus: 1 grande + 1 petite valise par passager"}</span>
              </p>
              <p className="text-muted-foreground flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{t.booking.luggagePolicy?.extraLarge ||
                  "Grandes valises supplémentaires: 10€ chacune"}</span>
              </p>
              <p className="text-muted-foreground flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{t.booking.luggagePolicy?.extraSmall || "Petites valises gratuites"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
          <div className="flex items-center gap-3">
            <Luggage className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">{t.booking.largeLuggage}</p>
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
              className="w-9 h-9 rounded-full bg-primary/20 hover:bg-primary/30
                       text-primary border border-primary/30 shadow-sm hover:shadow-md hover:scale-110
                       transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                       flex items-center justify-center group"
            >
              <Minus className="h-4 w-4 group-hover:scale-90 transition-transform" />
            </button>
            <span className="text-xl font-display font-semibold text-foreground min-w-[2.5rem] text-center">
              {largeLuggageCount}
            </span>
            <button
              type="button"
              onClick={() => handleCountChange("large", "increment")}
              disabled={largeLuggageCount >= maxLarge}
              className="w-9 h-9 rounded-full bg-primary/20 hover:bg-primary/30
                       text-primary border border-primary/30 shadow-sm hover:shadow-md hover:scale-110
                       transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                       flex items-center justify-center group"
            >
              <Plus className="h-4 w-4 group-hover:scale-90 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
          <div className="flex items-center gap-3">
            <Luggage className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">{t.booking.smallLuggage}</p>
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
              className="w-9 h-9 rounded-full bg-primary/20 hover:bg-primary/30
                       text-primary border border-primary/30 shadow-sm hover:shadow-md hover:scale-110
                       transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                       flex items-center justify-center group"
            >
              <Minus className="h-4 w-4 group-hover:scale-90 transition-transform" />
            </button>
            <span className="text-xl font-display font-semibold text-foreground min-w-[2.5rem] text-center">
              {smallLuggageCount}
            </span>
            <button
              type="button"
              onClick={() => handleCountChange("small", "increment")}
              disabled={smallLuggageCount >= maxSmall}
              className="w-9 h-9 rounded-full bg-primary/20 hover:bg-primary/30
                       text-primary border border-primary/30 shadow-sm hover:shadow-md hover:scale-110
                       transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                       flex items-center justify-center group"
            >
              <Plus className="h-4 w-4 group-hover:scale-90 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
