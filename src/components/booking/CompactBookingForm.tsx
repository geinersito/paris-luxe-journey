import React, { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { MapPin, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CompactBookingFormProps {
  onOpenFullForm: (data: {
    pickup: string;
    dropoff: string;
    passengers: string;
  }) => void;
}

interface CompactLocation {
  id: string;
  code: string | null;
  name: string;
  name_en: string | null;
  name_es: string | null;
  name_fr: string | null;
  name_pt: string | null;
}

const COMPACT_CODE_ORDER = ["CDG", "ORY", "PAR", "DLP", "VRS"] as const;
const COMPACT_CODE_SET = new Set<string>(COMPACT_CODE_ORDER);

export function CompactBookingForm({
  onOpenFullForm,
}: CompactBookingFormProps) {
  const { t, language } = useLanguage();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [locations, setLocations] = useState<CompactLocation[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCompactLocations = async () => {
      try {
        setIsLoadingLocations(true);
        const { data, error } = await supabase
          .from("locations")
          .select("id, code, name, name_en, name_es, name_fr, name_pt");

        if (error) {
          console.error("[CompactBookingForm] Error loading locations:", error);
          if (isMounted) {
            setLocations([]);
          }
          return;
        }

        if (isMounted) {
          setLocations(data || []);
        }
      } catch (error) {
        console.error(
          "[CompactBookingForm] Exception loading locations:",
          error,
        );
        if (isMounted) {
          setLocations([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingLocations(false);
        }
      }
    };

    fetchCompactLocations();

    return () => {
      isMounted = false;
    };
  }, []);

  const compactLocationOptions = useMemo(() => {
    const byCode = new Map<string, CompactLocation>();

    for (const location of locations) {
      const rawCode = location.code?.trim();
      if (!rawCode) continue;

      const normalizedCode = rawCode.toUpperCase();
      if (!COMPACT_CODE_SET.has(normalizedCode) || byCode.has(normalizedCode)) {
        continue;
      }

      byCode.set(normalizedCode, location);
    }

    const getLocalizedName = (location: CompactLocation) => {
      switch (language) {
        case "es":
          return location.name_es || location.name;
        case "fr":
          return location.name_fr || location.name;
        case "pt":
          return location.name_pt || location.name;
        default:
          return location.name_en || location.name;
      }
    };

    return COMPACT_CODE_ORDER.filter((code) => byCode.has(code)).map((code) => {
      const location = byCode.get(code)!;
      return {
        code: location.code?.trim() || code,
        label: getLocalizedName(location),
      };
    });
  }, [language, locations]);

  const canQuickBook =
    compactLocationOptions.length > 0 &&
    pickup.trim() !== "" &&
    dropoff.trim() !== "" &&
    passengers.trim() !== "";

  const handleQuickBook = () => {
    // Pasar los datos al formulario completo
    onOpenFullForm({ pickup, dropoff, passengers });
  };

  const handleOpenMore = () => {
    onOpenFullForm({ pickup, dropoff, passengers });
  };

  return (
    <div className="glass-card-premium p-5 md:p-7 w-full shadow-luxury hover:shadow-luxury-hover transition-all duration-500">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {/* Pickup Location */}
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-secondary mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {t.booking.pickup}
          </label>
          <div className="relative">
            <select
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              disabled={
                isLoadingLocations || compactLocationOptions.length === 0
              }
              className="w-full truncate px-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/95 backdrop-blur-sm font-sans text-sm shadow-sm hover:shadow-md hover:border-primary/40 appearance-none cursor-pointer focus-luxury"
            >
              <option value="">
                {isLoadingLocations ? "Loading..." : t.hero.selectPickup}
              </option>
              {compactLocationOptions.map((location) => (
                <option key={location.code} value={location.code}>
                  {location.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Dropoff Location */}
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-secondary mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {t.booking.dropoff}
          </label>
          <div className="relative">
            <select
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              disabled={
                isLoadingLocations || compactLocationOptions.length === 0
              }
              className="w-full truncate px-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/95 backdrop-blur-sm font-sans text-sm shadow-sm hover:shadow-md hover:border-primary/40 appearance-none cursor-pointer focus-luxury"
            >
              <option value="">
                {isLoadingLocations ? "Loading..." : t.hero.selectDropoff}
              </option>
              {compactLocationOptions.map((location) => (
                <option key={location.code} value={location.code}>
                  {location.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Passengers */}
        <div className="w-full lg:w-40">
          <label className="block text-xs font-bold text-secondary mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <Users className="w-3.5 h-3.5 text-primary" />
            {t.booking.passengers}
          </label>
          <div className="relative">
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full truncate px-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/95 backdrop-blur-sm font-sans text-sm shadow-sm hover:shadow-md hover:border-primary/40 appearance-none cursor-pointer focus-luxury"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "pax" : "pax"}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* CTA Button - Premium Gold Gradient */}
        <div className="w-full lg:w-auto lg:pt-[1.625rem]">
          <Button
            onClick={handleQuickBook}
            disabled={!canQuickBook}
            className="silk-button w-full lg:w-auto px-4 py-3 text-sm font-bold text-center group shadow-gold-glow hover:shadow-gold-glow-strong min-h-[48px]"
          >
            <span className="inline-flex items-center justify-center gap-2 flex-wrap leading-tight">
              <span>{t.hero.getInstantQuote}</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Button>
        </div>
      </div>

      {/* Quick Info - Trust Badges */}
      <div className="mt-4 pt-4 border-t border-primary/10 flex flex-wrap gap-3 text-xs leading-tight justify-center lg:justify-start">
        <span className="group flex items-center gap-2 font-semibold text-secondary/80 hover:text-secondary transition-colors duration-300">
          <svg
            className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="tracking-wide">{t.hero.fixedPrice}</span>
        </span>
        <span className="group flex items-center gap-2 font-semibold text-secondary/80 hover:text-secondary transition-colors duration-300">
          <svg
            className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="tracking-wide">{t.hero.freeCancellation}</span>
        </span>
        <span className="group flex items-center gap-2 font-semibold text-secondary/80 hover:text-secondary transition-colors duration-300">
          <svg
            className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="tracking-wide">{t.hero.support247}</span>
        </span>
      </div>

      {/* More Routes Link - Responsive */}
      <div className="mt-3 text-center lg:text-left">
        <button
          type="button"
          onClick={handleOpenMore}
          className="hidden md:inline text-sm text-secondary/70 hover:text-primary underline underline-offset-4 transition-colors duration-300"
        >
          {t.booking.moreRoutes}
        </button>

        <button
          type="button"
          onClick={handleOpenMore}
          className="md:hidden text-sm text-secondary/70 hover:text-primary underline underline-offset-4 transition-colors duration-300"
        >
          {t.booking.moreRoutesMobile}
        </button>
      </div>
    </div>
  );
}
