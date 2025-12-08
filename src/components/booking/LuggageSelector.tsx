
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Minus, Plus, Luggage } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LuggageSelectorProps {
  largeLuggageCount: number;
  smallLuggageCount: number;
  onLargeLuggageChange: (count: number) => void;
  onSmallLuggageChange: (count: number) => void;
}

export const LuggageSelector = ({
  largeLuggageCount,
  smallLuggageCount,
  onLargeLuggageChange,
  onSmallLuggageChange,
}: LuggageSelectorProps) => {
  const { t } = useLanguage();

  const handleCountChange = (
    type: 'large' | 'small',
    operation: 'increment' | 'decrement'
  ) => {
    const currentCount = type === 'large' ? largeLuggageCount : smallLuggageCount;
    const setCount = type === 'large' ? onLargeLuggageChange : onSmallLuggageChange;
    const maxCount = 16;
    
    const newCount = operation === 'increment' ? 
      Math.min(currentCount + 1, maxCount) : 
      Math.max(currentCount - 1, 0);
    
    setCount(newCount);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-1.5 group">
        <Luggage className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        {t.booking.vehicle.luggage}
      </Label>

      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Luggage className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">{t.booking.largeLuggage}</p>
              <p className="text-xs text-muted-foreground">23kg {t.booking.maxWeight}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleCountChange('large', 'decrement')}
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
              onClick={() => handleCountChange('large', 'increment')}
              disabled={largeLuggageCount === 16}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary-dark
                       text-white shadow-md hover:shadow-lg hover:scale-110
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       flex items-center justify-center group"
            >
              <Plus className="h-3.5 w-3.5 group-hover:scale-90 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Luggage className="h-3 w-3 text-primary" />
            <div>
              <p className="text-sm font-medium">{t.booking.smallLuggage}</p>
              <p className="text-xs text-muted-foreground">10kg {t.booking.maxWeight}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleCountChange('small', 'decrement')}
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
              onClick={() => handleCountChange('small', 'increment')}
              disabled={smallLuggageCount === 16}
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
