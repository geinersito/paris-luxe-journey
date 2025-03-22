
import { MapPin, ArrowDown } from "lucide-react";
import { Label } from "../ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Location {
  id: string;
  name: string;
  name_en: string;
  name_es: string;
  name_fr: string;
  name_pt: string;
  type: string;
  code: string;
}

interface LocationInputsProps {
  // Propiedades para el nuevo formato
  formData?: {
    pickup: string;
    dropoff: string;
    [key: string]: any;
  };
  locations?: Location[];
  isLoading?: boolean;
  
  // Propiedades para el formato antiguo
  pickup?: string;
  dropoff?: string;
  standardLocations?: Location[];
  
  // Propiedad común (pero con posibles tipos diferentes)
  onChange: ((e: { target: { name: string; value: string } }) => void) | ((value: string, name: string) => void);
}

export const LocationInputs = (props: LocationInputsProps) => {
  // Determinar si estamos usando el formato nuevo o el antiguo
  const isNewFormat = !!props.formData;
  
  // Variables para ambos formatos
  let pickup: string = '';
  let dropoff: string = '';
  let locationsData: Location[] = [];
  let isLocationLoading: boolean = false;
  
  // Inicializar según el formato
  if (isNewFormat && props.formData) {
    pickup = props.formData.pickup || '';
    dropoff = props.formData.dropoff || '';
    locationsData = props.locations || [];
    isLocationLoading = props.isLoading || false;
  } else {
    pickup = props.pickup || '';
    dropoff = props.dropoff || '';
    locationsData = props.standardLocations || [];
    isLocationLoading = false; // No disponible en formato antiguo
  }
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const getLocalizedName = (location: Location) => {
    switch (language) {
      case 'es':
        return location.name_es || location.name;
      case 'fr':
        return location.name_fr || location.name;
      case 'pt':
        return location.name_pt || location.name;
      default:
        return location.name_en || location.name;
    }
  };

  // Remove duplicates based on location id
  const uniqueLocations = locationsData?.reduce((acc: Location[], current) => {
    const exists = acc.find((location) => location.id === current.id);
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, []) || [];

  // Sort locations by name with null safety
  const sortedLocations = uniqueLocations.sort((a, b) => {
    const nameA = (getLocalizedName(a) || '').toLowerCase();
    const nameB = (getLocalizedName(b) || '').toLowerCase();
    return nameA.localeCompare(nameB);
  });

  useEffect(() => {
    if (!isLocationLoading && (!locationsData || locationsData.length === 0)) {
      console.warn('No locations available');
      toast({
        title: t.common.error,
        description: t.booking.errors.locationsNotLoaded,
        variant: "destructive",
      });
    }
  }, [locationsData, isLocationLoading, toast, t]);

  return (
    <div className="relative space-y-6">
      <div className="space-y-2">
        <Label htmlFor="pickup" className="flex items-center gap-2 text-primary font-medium">
          <MapPin className="h-4 w-4" />
          {t.booking.pickup}
        </Label>
        <Select 
          value={pickup} 
          onValueChange={(value) => {
            if (isNewFormat) {
              (props.onChange as (e: { target: { name: string; value: string } }) => void)({ target: { name: 'pickup', value } });
            } else {
              (props.onChange as (value: string, name: string) => void)(value, 'pickup');
            }
          }}
          required
        >
          <SelectTrigger className="w-full bg-white dark:bg-primary-dark">
            <SelectValue placeholder={t.booking.pickupPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {sortedLocations.map((location) => (
              <SelectItem key={location.id} value={location.code}>
                {getLocalizedName(location)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="absolute left-7 top-[50%] -translate-y-1/2 pointer-events-none z-0">
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border border-primary/20 flex items-center justify-center shadow-sm">
            <ArrowDown className="h-4 w-4 text-primary animate-pulse" />
          </div>
          <div className="absolute left-1/2 h-12 -translate-x-1/2 w-[1px] bg-primary/20" />
        </div>
      </div>

      <div className="space-y-2 relative z-20">
        <Label htmlFor="dropoff" className="flex items-center gap-2 text-primary font-medium bg-white/95 rounded-md">
          <MapPin className="h-4 w-4" />
          {t.booking.dropoff}
        </Label>
        <Select 
          value={dropoff} 
          onValueChange={(value) => {
            if (isNewFormat) {
              (props.onChange as (e: { target: { name: string; value: string } }) => void)({ target: { name: 'dropoff', value } });
            } else {
              (props.onChange as (value: string, name: string) => void)(value, 'dropoff');
            }
          }}
          required
        >
          <SelectTrigger className="w-full bg-white dark:bg-primary-dark">
            <SelectValue placeholder={t.booking.dropoffPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {sortedLocations.map((location) => (
              <SelectItem key={location.id} value={location.code}>
                {getLocalizedName(location)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
