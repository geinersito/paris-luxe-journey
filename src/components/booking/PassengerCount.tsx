
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Minus, Plus, Users, Info } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

interface PassengerCountProps {
  value: string;
  onChange: (value: string) => void;
}

export const PassengerCount = ({ value, onChange }: PassengerCountProps) => {
  const { t } = useLanguage();

  const handleCountChange = (operation: 'increment' | 'decrement') => {
    const currentCount = parseInt(value) || 0;
    const newCount = operation === 'increment' ? currentCount + 1 : currentCount - 1;
    
    if (newCount >= 1 && newCount <= 16) {
      onChange(newCount.toString());
    }
  };

  return (
    <div className="space-y-2 relative z-20">
      <div className="flex items-center gap-2 group">
        <Label htmlFor="passengers" className="text-sm font-medium flex items-center gap-1.5">
          <Users className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          {t.booking.passengers}
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3 w-3 text-muted-foreground cursor-help hover:text-primary transition-colors" />
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
              <p className="text-xs">1-3 {t.booking.vehicle.capacity}: {t.booking.vehicle.berline}</p>
              <p className="text-xs">4-8 {t.booking.vehicle.capacity}: {t.booking.vehicle.van}</p>
              <p className="text-xs">9-11 {t.booking.vehicle.capacity}: {t.booking.vehicle.van} + {t.booking.vehicle.berline}</p>
              <p className="text-xs">12-16 {t.booking.vehicle.capacity}: 2 {t.booking.vehicle.van}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center justify-center gap-4 p-3 bg-accent/30 rounded-lg">
        <button
          type="button"
          onClick={() => handleCountChange('decrement')}
          disabled={parseInt(value) <= 1}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-secondary-dark
                   text-white shadow-md hover:shadow-lg hover:scale-110
                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                   flex items-center justify-center group"
        >
          <Minus className="h-4 w-4 group-hover:scale-90 transition-transform" />
        </button>

        <span className="text-xl font-display font-semibold text-primary min-w-[3rem] text-center">
          {value || '0'}
        </span>

        <button
          type="button"
          onClick={() => handleCountChange('increment')}
          disabled={parseInt(value) >= 16}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-secondary-dark
                   text-white shadow-md hover:shadow-lg hover:scale-110
                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                   flex items-center justify-center group"
        >
          <Plus className="h-4 w-4 group-hover:scale-90 transition-transform" />
        </button>
      </div>
    </div>
  );
};
