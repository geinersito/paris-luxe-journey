
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Minus, Plus, Users, Info, Car, Bus } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

interface PassengerCountProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_PASSENGERS = 7; // Límite para reservas online

export const PassengerCount = ({ value, onChange }: PassengerCountProps) => {
  const { t } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  const currentCount = parseInt(value) || 0;

  // Determinar el tipo de vehículo sugerido
  const suggestedVehicle = currentCount <= 3 ? 'berline' : 'van';

  const handleCountChange = (operation: 'increment' | 'decrement') => {
    const newCount = operation === 'increment' ? currentCount + 1 : currentCount - 1;

    if (newCount >= 1 && newCount <= MAX_PASSENGERS) {
      onChange(newCount.toString());
      // Trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  // Efecto para mostrar el cambio de vehículo
  useEffect(() => {
    if (currentCount > 0) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [suggestedVehicle]);

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

      <div className="flex items-center justify-center gap-4 p-4 bg-muted rounded-xl">
        <button
          type="button"
          onClick={() => handleCountChange('decrement')}
          disabled={currentCount <= 1}
          className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30
                   text-primary border border-primary/30 shadow-sm hover:shadow-md hover:scale-105
                   transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                   flex items-center justify-center group"
        >
          <Minus className="h-4 w-4 group-hover:scale-90 transition-transform" />
        </button>

        <div className="flex flex-col items-center gap-1">
          <span className={`text-2xl font-display font-semibold text-foreground min-w-[3.5rem] text-center transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
            {value || '0'}
          </span>

          {/* Indicador visual del vehículo sugerido */}
          {currentCount > 0 && (
            <div className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-300 ${isAnimating ? 'scale-110 opacity-100' : 'scale-100 opacity-70'}`}>
              {suggestedVehicle === 'berline' ? (
                <>
                  <Car className="h-3.5 w-3.5 text-primary" />
                  <span className="text-primary">{t.booking.vehicle.berline}</span>
                </>
              ) : (
                <>
                  <Bus className="h-3.5 w-3.5 text-primary" />
                  <span className="text-primary">{t.booking.vehicle.van}</span>
                </>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => handleCountChange('increment')}
          disabled={currentCount >= MAX_PASSENGERS}
          className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30
                   text-primary border border-primary/30 shadow-sm hover:shadow-md hover:scale-105
                   transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                   flex items-center justify-center group"
        >
          <Plus className="h-4 w-4 group-hover:scale-90 transition-transform" />
        </button>
      </div>

      {/* Mensaje para grupos de 8+ pasajeros */}
      {parseInt(value) >= MAX_PASSENGERS && (
        <div className="mt-4 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3.5 space-y-2.5">
          <p className="text-sm font-semibold text-foreground">
            {t.booking.groupTransfer?.title || 'Besoin d\'un transfert pour 8+ passagers?'}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t.booking.groupTransfer?.description || 'Nous organisons des solutions multi-véhicules ou minibus sur demande.'}
          </p>
          <button
            type="button"
            onClick={handleOpenGroupQuote}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground bg-background hover:bg-muted border border-border px-4 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {t.booking.groupTransfer?.cta || 'Contacter via WhatsApp'}
          </button>
        </div>
      )}
    </div>
  );
};
