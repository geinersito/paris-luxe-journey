import { MapPin, ArrowDownUp, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";
import { getLocationFallbacks } from "@/lib/locations/fallbacks";

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
    [key: string]: string;
  };
  locations?: Location[];
  isLoading?: boolean;

  // Propiedades para el formato antiguo
  pickup?: string;
  dropoff?: string;
  standardLocations?: Location[];
  isLoadingLocations?: boolean; // Añadido para formato antiguo

  // Propiedad común (pero con posibles tipos diferentes)
  onChange:
    | ((e: { target: { name: string; value: string } }) => void)
    | ((value: string, name: string) => void);
}

export const LocationInputs = (props: LocationInputsProps) => {
  // Determinar si estamos usando el formato nuevo o el antiguo
  const isNewFormat = !!props.formData;

  const pickup = useMemo(
    () =>
      isNewFormat && props.formData
        ? props.formData.pickup || ""
        : props.pickup || "",
    [isNewFormat, props.formData, props.pickup],
  );
  const dropoff = useMemo(
    () =>
      isNewFormat && props.formData
        ? props.formData.dropoff || ""
        : props.dropoff || "",
    [isNewFormat, props.formData, props.dropoff],
  );
  const locationsData = useMemo(
    () => (isNewFormat ? props.locations || [] : props.standardLocations || []),
    [isNewFormat, props.locations, props.standardLocations],
  );
  const isLocationLoading = useMemo(
    () =>
      isNewFormat
        ? props.isLoading || false
        : props.isLoadingLocations || false,
    [isNewFormat, props.isLoading, props.isLoadingLocations],
  );
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const fallbackLocationsByCode = useMemo(
    () =>
      new Map<string, Location>(
        getLocationFallbacks().map((location) => [location.code, location]),
      ),
    [],
  );
  const fallbackLocationsByName = useMemo(
    () =>
      new Map<
        string,
        Pick<Location, "name_en" | "name_es" | "name_fr" | "name_pt">
      >([
        [
          "Charles de Gaulle Airport (CDG)",
          {
            name_en: "Charles de Gaulle Airport (CDG)",
            name_es: "Aeropuerto Charles de Gaulle (CDG)",
            name_fr: "Aéroport Charles de Gaulle (CDG)",
            name_pt: "Aeroporto Charles de Gaulle (CDG)",
          },
        ],
        [
          "Orly Airport (ORY)",
          {
            name_en: "Orly Airport (ORY)",
            name_es: "Aeropuerto de Orly (ORY)",
            name_fr: "Aéroport d'Orly (ORY)",
            name_pt: "Aeroporto de Orly (ORY)",
          },
        ],
        [
          "Beauvais Airport (BVA)",
          {
            name_en: "Beauvais Airport (BVA)",
            name_es: "Aeropuerto de Beauvais (BVA)",
            name_fr: "Aéroport de Beauvais (BVA)",
            name_pt: "Aeroporto de Beauvais (BVA)",
          },
        ],
        [
          "Gare de Lyon Station",
          {
            name_en: "Gare de Lyon Station",
            name_es: "Estación Gare de Lyon",
            name_fr: "Gare de Lyon",
            name_pt: "Estação Gare de Lyon",
          },
        ],
        [
          "Gare du Nord Station",
          {
            name_en: "Gare du Nord Station",
            name_es: "Estación Gare du Nord",
            name_fr: "Gare du Nord",
            name_pt: "Estação Gare du Nord",
          },
        ],
        [
          "Montparnasse Station",
          {
            name_en: "Montparnasse Station",
            name_es: "Estación Montparnasse",
            name_fr: "Gare Montparnasse",
            name_pt: "Estação Montparnasse",
          },
        ],
        [
          "The Louvre Museum",
          {
            name_en: "The Louvre Museum",
            name_es: "Museo del Louvre",
            name_fr: "Musée du Louvre",
            name_pt: "Museu do Louvre",
          },
        ],
        [
          "Palace of Versailles",
          {
            name_en: "Palace of Versailles",
            name_es: "Palacio de Versalles",
            name_fr: "Château de Versailles",
            name_pt: "Palácio de Versalhes",
          },
        ],
      ]),
    [],
  );

  const getLocalizedName = (location: Location) => {
    const fallbackLocation = fallbackLocationsByCode.get(location.code);
    const fallbackByName =
      fallbackLocationsByName.get(location.name_en || location.name) ||
      fallbackLocationsByName.get(location.name);
    switch (language) {
      case "es":
        return (
          location.name_es ||
          fallbackLocation?.name_es ||
          fallbackByName?.name_es ||
          location.name_en ||
          fallbackLocation?.name_en ||
          fallbackByName?.name_en ||
          location.name_fr ||
          fallbackLocation?.name_fr ||
          fallbackByName?.name_fr ||
          location.name_pt ||
          fallbackLocation?.name_pt ||
          fallbackByName?.name_pt ||
          location.name
        );
      case "fr":
        return (
          location.name_fr ||
          fallbackLocation?.name_fr ||
          fallbackByName?.name_fr ||
          location.name_en ||
          fallbackLocation?.name_en ||
          fallbackByName?.name_en ||
          location.name_pt ||
          fallbackLocation?.name_pt ||
          fallbackByName?.name_pt ||
          location.name_es ||
          fallbackLocation?.name_es ||
          fallbackByName?.name_es ||
          location.name
        );
      case "pt":
        return (
          location.name_pt ||
          fallbackLocation?.name_pt ||
          fallbackByName?.name_pt ||
          location.name_en ||
          fallbackLocation?.name_en ||
          fallbackByName?.name_en ||
          location.name_fr ||
          fallbackLocation?.name_fr ||
          fallbackByName?.name_fr ||
          location.name_es ||
          fallbackLocation?.name_es ||
          fallbackByName?.name_es ||
          location.name
        );
      default:
        return (
          location.name_en ||
          fallbackLocation?.name_en ||
          fallbackByName?.name_en ||
          location.name_fr ||
          fallbackLocation?.name_fr ||
          fallbackByName?.name_fr ||
          location.name_pt ||
          fallbackLocation?.name_pt ||
          fallbackByName?.name_pt ||
          location.name_es ||
          fallbackLocation?.name_es ||
          fallbackByName?.name_es ||
          location.name
        );
    }
  };

  const loadingLocationsCopy = {
    en: "Loading locations...",
    fr: "Chargement des lieux...",
    es: "Cargando ubicaciones...",
    pt: "A carregar locais...",
  }[language];

  // Remove duplicates based on location id
  const uniqueLocations =
    locationsData?.reduce((acc: Location[], current) => {
      const exists = acc.find((location) => location.id === current.id);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []) || [];

  // Sort locations by name with null safety
  const sortedLocations = uniqueLocations.sort((a, b) => {
    const nameA = (getLocalizedName(a) || "").toLowerCase();
    const nameB = (getLocalizedName(b) || "").toLowerCase();
    return nameA.localeCompare(nameB);
  });

  useEffect(() => {
    if (!isLocationLoading && (!locationsData || locationsData.length === 0)) {
      console.warn("No locations available");
      toast({
        title: t.common.error,
        description: t.booking.errors.locationsNotLoaded,
        variant: "destructive",
      });
    }
  }, [locationsData, isLocationLoading, toast, t]);

  const handleSwap = () => {
    const tempPickup = pickup;
    // Ambos formatos usan el mismo formato de evento
    (
      props.onChange as (e: { target: { name: string; value: string } }) => void
    )({ target: { name: "pickup", value: dropoff } });
    (
      props.onChange as (e: { target: { name: string; value: string } }) => void
    )({ target: { name: "dropoff", value: tempPickup } });
  };

  // Mostrar skeleton mientras carga
  if (isLocationLoading) {
    return (
      <div className="relative space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-11 w-full rounded-md" />
        </div>

        <div className="flex justify-center">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-11 w-full rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-3">
      <div className="space-y-1.5 group">
        <Label
          htmlFor="pickup"
          className="flex items-center gap-1.5 text-primary font-medium text-sm"
        >
          <MapPin className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5" />
          {t.booking.pickup}
        </Label>
        <Select
          value={pickup}
          onValueChange={(value) => {
            // Ambos formatos usan el mismo formato de evento
            (
              props.onChange as (e: {
                target: { name: string; value: string };
              }) => void
            )({ target: { name: "pickup", value } });
          }}
          required
          disabled={isLocationLoading}
        >
          <SelectTrigger className="w-full bg-input border-border/50 hover:border-primary/50 focus:border-primary h-11 text-sm transition-colors">
            {isLocationLoading ? (
              <span className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                {loadingLocationsCopy}
              </span>
            ) : (
              <SelectValue placeholder={t.booking.pickupPlaceholder} />
            )}
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

      {/* Swap Button - Centered between fields, inside card */}
      <button
        type="button"
        onClick={handleSwap}
        className="absolute right-3 top-1/2 -translate-y-1/2
                   w-8 h-8 bg-white dark:bg-primary-dark rounded-full shadow-md
                   border border-primary/20 hover:border-primary/40
                   flex items-center justify-center
                   transition-all hover:shadow-lg z-10
                   hover:scale-110"
        aria-label={t.booking.swapLocations || "Swap locations"}
      >
        <ArrowDownUp className="h-3.5 w-3.5 text-primary" />
      </button>

      <div className="space-y-1.5 relative z-20 group">
        <Label
          htmlFor="dropoff"
          className="flex items-center gap-1.5 text-primary font-medium text-sm"
        >
          <MapPin className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5" />
          {t.booking.dropoff}
        </Label>
        <Select
          value={dropoff}
          onValueChange={(value) => {
            // Ambos formatos usan el mismo formato de evento
            (
              props.onChange as (e: {
                target: { name: string; value: string };
              }) => void
            )({ target: { name: "dropoff", value } });
          }}
          required
          disabled={isLocationLoading}
        >
          <SelectTrigger className="w-full bg-input border-border/50 hover:border-primary/50 focus:border-primary h-11 text-sm transition-colors">
            {isLocationLoading ? (
              <span className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                {loadingLocationsCopy}
              </span>
            ) : (
              <SelectValue placeholder={t.booking.dropoffPlaceholder} />
            )}
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
