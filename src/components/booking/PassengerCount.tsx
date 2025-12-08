
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
      <div className="flex items-center gap-2">
        <Label htmlFor="passengers" className="text-sm font-medium">{t.booking.passengers}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3 w-3 text-muted-foreground cursor-help" />
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

      <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="text-sm font-medium">{t.booking.passengers}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleCountChange('decrement')}
            disabled={parseInt(value) <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center text-sm font-medium">{value || '0'}</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleCountChange('increment')}
            disabled={parseInt(value) >= 16}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
