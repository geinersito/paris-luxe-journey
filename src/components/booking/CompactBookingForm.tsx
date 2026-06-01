import React, { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
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
    onOpenFullForm({ pickup, dropoff, passengers });
  };

  const handleOpenMore = () => {
    onOpenFullForm({ pickup, dropoff, passengers });
  };

  return (
    <div className="bg-white border border-ref-ink/10 shadow-[0_4px_32px_rgba(14,14,14,0.12)] p-5 md:p-7 w-full">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {/* Pickup Location */}
        <div className="flex-1 w-full">
          <label className="font-ui block text-xs font-semibold text-ref-ink/60 mb-2 flex items-center gap-1.5 uppercase tracking-[0.2em] whitespace-nowrap">
            <MapPin className="w-3.5 h-3.5 text-ref-navy flex-shrink-0" />
            {t.hero.labelPickup}
          </label>
          <div className="relative">
            <select
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              disabled={
                isLoadingLocations || compactLocationOptions.length === 0
              }
              className="font-ui w-full truncate px-4 py-3 border border-ref-ink/20 focus:border-ref-navy focus:ring-1 focus:ring-ref-navy/20 transition-colors duration-200 bg-white text-ref-ink text-sm appearance-none cursor-pointer outline-none"
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
                className="w-4 h-4 text-ref-ink/30"
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
          <label className="font-ui block text-xs font-semibold text-ref-ink/60 mb-2 flex items-center gap-1.5 uppercase tracking-[0.2em] whitespace-nowrap">
            <MapPin className="w-3.5 h-3.5 text-ref-navy flex-shrink-0" />
            {t.hero.labelDropoff}
          </label>
          <div className="relative">
            <select
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              disabled={
                isLoadingLocations || compactLocationOptions.length === 0
              }
              className="font-ui w-full truncate px-4 py-3 border border-ref-ink/20 focus:border-ref-navy focus:ring-1 focus:ring-ref-navy/20 transition-colors duration-200 bg-white text-ref-ink text-sm appearance-none cursor-pointer outline-none"
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
                className="w-4 h-4 text-ref-ink/30"
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
          <label className="font-ui block text-xs font-semibold text-ref-ink/60 mb-2 flex items-center gap-1.5 uppercase tracking-[0.2em] whitespace-nowrap">
            <Users className="w-3.5 h-3.5 text-ref-navy flex-shrink-0" />
            {t.booking.passengers}
          </label>
          <div className="relative">
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="font-ui w-full truncate px-4 py-3 border border-ref-ink/20 focus:border-ref-navy focus:ring-1 focus:ring-ref-navy/20 transition-colors duration-200 bg-white text-ref-ink text-sm appearance-none cursor-pointer outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} pax
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-ref-ink/30"
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

        {/* CTA Button */}
        <div className="w-full lg:w-auto lg:pt-[1.625rem] shrink-0">
          <button
            type="button"
            onClick={handleQuickBook}
            disabled={!canQuickBook}
            className="font-ui font-semibold text-sm w-full lg:w-auto px-6 py-3 bg-ref-navy text-white hover:bg-ref-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 min-h-[48px] flex items-center justify-center gap-2"
          >
            <span>{t.hero.getInstantQuote}</span>
            <svg
              className="w-4 h-4 flex-shrink-0"
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
          </button>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-4 pt-4 border-t border-ref-ink/8 flex flex-wrap gap-4 text-xs justify-center lg:justify-start">
        <span className="font-ui flex items-center gap-1.5 text-ref-ink/60">
          <svg
            className="w-3.5 h-3.5 text-ref-navy flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {t.hero.fixedPrice}
        </span>
        <span className="font-ui flex items-center gap-1.5 text-ref-ink/60">
          <svg
            className="w-3.5 h-3.5 text-ref-navy flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {t.hero.freeCancellation}
        </span>
        <span className="font-ui flex items-center gap-1.5 text-ref-ink/60">
          <svg
            className="w-3.5 h-3.5 text-ref-navy flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {t.hero.support247}
        </span>
      </div>

      {/* More Routes Link */}
      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={handleOpenMore}
          className="font-ui text-xs text-ref-ink/50 hover:text-ref-navy underline underline-offset-4 transition-colors duration-200"
        >
          {t.booking.moreRoutes}
        </button>
      </div>
    </div>
  );
}
