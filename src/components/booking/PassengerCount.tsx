
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
    <div className="space-y-3 relative z-20">
      <div className="flex items-center justify-between">
        <Label htmlFor="passengers" className="text-lg font-semibold">{t.booking.passengers}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
              <p className="text-sm">1-3 {t.booking.vehicle.capacity}: {t.booking.vehicle.berline}</p>
              <p className="text-sm">4-8 {t.booking.vehicle.capacity}: {t.booking.vehicle.van}</p>
              <p className="text-sm">9-11 {t.booking.vehicle.capacity}: {t.booking.vehicle.van} + {t.booking.vehicle.berline}</p>
              <p className="text-sm">12-16 {t.booking.vehicle.capacity}: 2 {t.booking.vehicle.van}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5" />
          <div>
            <p className="font-medium">{t.booking.passengers}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => handleCountChange('decrement')}
            disabled={parseInt(value) <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{value || '0'}</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => handleCountChange('increment')}
            disabled={parseInt(value) >= 16}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
