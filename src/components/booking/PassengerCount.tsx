
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Minus, Plus, Users, Info } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

interface PassengerCountProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_PASSENGERS = 7; // Límite para reservas online

export const PassengerCount = ({ value, onChange }: PassengerCountProps) => {
  const { t } = useLanguage();

  const handleCountChange = (operation: 'increment' | 'decrement') => {
    const currentCount = parseInt(value) || 0;
    const newCount = operation === 'increment' ? currentCount + 1 : currentCount - 1;

    if (newCount >= 1 && newCount <= MAX_PASSENGERS) {
      onChange(newCount.toString());
    }
  };

  const handleOpenGroupQuote = () => {
    const msg = encodeURIComponent(
      `Hello, I need a quote for a group transfer (8+ passengers).\n\nPlease contact me to discuss details.`
    );
    window.open(`https://wa.me/33668251102?text=${msg}`, '_blank');
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
              <p className="text-xs">4-7 {t.booking.vehicle.capacity}: {t.booking.vehicle.van}</p>
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
          disabled={parseInt(value) >= MAX_PASSENGERS}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-secondary-dark
                   text-white shadow-md hover:shadow-lg hover:scale-110
                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                   flex items-center justify-center group"
        >
          <Plus className="h-4 w-4 group-hover:scale-90 transition-transform" />
        </button>
      </div>

      {/* Mensaje para grupos de 8+ pasajeros */}
      {parseInt(value) >= MAX_PASSENGERS && (
        <div className="mt-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-600 px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
          <p className="font-medium mb-1">
            {t.booking.groupTransfer?.title || 'Need a transfer for 8+ passengers?'}
          </p>
          <p className="text-xs mb-2">
            {t.booking.groupTransfer?.description || 'We organise multi-vehicle or minibus solutions on request.'}
          </p>
          <button
            type="button"
            onClick={handleOpenGroupQuote}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark underline transition-colors"
          >
            {t.booking.groupTransfer?.cta || 'Request a group quote'}
          </button>
        </div>
      )}
    </div>
  );
};
