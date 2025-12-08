
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
      <Label className="text-sm font-medium">{t.booking.vehicle.luggage}</Label>

      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Luggage className="h-4 w-4" />
            <div>
              <p className="text-sm font-medium">{t.booking.largeLuggage}</p>
              <p className="text-xs text-muted-foreground">23kg {t.booking.maxWeight}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleCountChange('large', 'decrement')}
              disabled={largeLuggageCount === 0}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm font-medium">{largeLuggageCount}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleCountChange('large', 'increment')}
              disabled={largeLuggageCount === 16}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Luggage className="h-3 w-3" />
            <div>
              <p className="text-sm font-medium">{t.booking.smallLuggage}</p>
              <p className="text-xs text-muted-foreground">10kg {t.booking.maxWeight}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleCountChange('small', 'decrement')}
              disabled={smallLuggageCount === 0}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm font-medium">{smallLuggageCount}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleCountChange('small', 'increment')}
              disabled={smallLuggageCount === 16}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
