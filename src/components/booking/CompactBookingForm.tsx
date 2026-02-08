import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

interface CompactBookingFormProps {
  onOpenFullForm: (data: {
    pickup: string;
    dropoff: string;
    passengers: string;
  }) => void;
}

const COMPACT_LOCATION_OPTIONS = [
  { code: "CDG", label: "Charles de Gaulle Airport (CDG)" },
  { code: "ORY", label: "Orly Airport (ORY)" },
  { code: "DLP", label: "Disneyland Paris" },
  { code: "VRS", label: "Palace of Versailles" },
] as const;

export function CompactBookingForm({
  onOpenFullForm,
}: CompactBookingFormProps) {
  const { t } = useLanguage();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [passengers, setPassengers] = useState("2");

  const handleQuickBook = () => {
    // Pasar los datos al formulario completo
    onOpenFullForm({ pickup, dropoff, passengers });
  };

  return (
    <div className="glass-card-premium p-6 md:p-8 max-w-5xl mx-auto shadow-luxury hover:shadow-luxury-hover transition-all duration-500">
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
              className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/95 backdrop-blur-sm font-sans text-sm shadow-sm hover:shadow-md hover:border-primary/40 appearance-none cursor-pointer focus-luxury"
            >
              <option value="">{t.hero.selectPickup}</option>
              {COMPACT_LOCATION_OPTIONS.map((location) => (
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
              className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/95 backdrop-blur-sm font-sans text-sm shadow-sm hover:shadow-md hover:border-primary/40 appearance-none cursor-pointer focus-luxury"
            >
              <option value="">{t.hero.selectDropoff}</option>
              {COMPACT_LOCATION_OPTIONS.map((location) => (
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
              className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/95 backdrop-blur-sm font-sans text-sm shadow-sm hover:shadow-md hover:border-primary/40 appearance-none cursor-pointer focus-luxury"
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
            className="silk-button w-full lg:w-auto px-8 py-3 text-sm font-bold whitespace-nowrap group shadow-gold-glow hover:shadow-gold-glow-strong"
          >
            {t.hero.getInstantQuote}
            <svg
              className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
          </Button>
        </div>
      </div>

      {/* Quick Info - Trust Badges */}
      <div className="mt-5 pt-5 border-t border-primary/10 flex flex-wrap gap-4 text-xs justify-center lg:justify-start">
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
    </div>
  );
}
