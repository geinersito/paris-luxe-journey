import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

interface CompactBookingFormProps {
  onOpenFullForm: () => void;
}

export function CompactBookingForm({ onOpenFullForm }: CompactBookingFormProps) {
  const { t } = useLanguage();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [passengers, setPassengers] = useState("2");

  const handleQuickBook = () => {
    // Si los campos están completos, abrir el formulario completo con los datos prellenados
    onOpenFullForm();
  };

  return (
    <div className="glass-card-premium p-8 max-w-6xl mx-auto shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-6 items-end">
        {/* Pickup Location */}
        <div className="flex-1 w-full">
          <label className="block text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            {t.booking.pickup}
          </label>
          <div className="relative">
            <select
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white/95 backdrop-blur-sm font-sans text-base shadow-sm hover:shadow-md appearance-none cursor-pointer"
            >
              <option value="">Select pickup location</option>
              <option value="cdg">Paris CDG Airport</option>
              <option value="orly">Paris Orly Airport</option>
              <option value="paris">Paris City Center</option>
              <option value="disneyland">Disneyland Paris</option>
              <option value="versailles">Versailles</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Dropoff Location */}
        <div className="flex-1 w-full">
          <label className="block text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            {t.booking.dropoff}
          </label>
          <div className="relative">
            <select
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white/95 backdrop-blur-sm font-sans text-base shadow-sm hover:shadow-md appearance-none cursor-pointer"
            >
              <option value="">Select dropoff location</option>
              <option value="cdg">Paris CDG Airport</option>
              <option value="orly">Paris Orly Airport</option>
              <option value="paris">Paris City Center</option>
              <option value="disneyland">Disneyland Paris</option>
              <option value="versailles">Versailles</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Passengers */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            {t.booking.passengers}
          </label>
          <div className="relative">
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white/95 backdrop-blur-sm font-sans text-base shadow-sm hover:shadow-md appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'pax' : 'pax'}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full lg:w-auto">
          <Button
            onClick={handleQuickBook}
            className="silk-button w-full lg:w-auto px-10 py-[1.125rem] text-base font-semibold whitespace-nowrap group"
          >
            Get Instant Quote
            <svg
              className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Quick Info */}
      <div className="mt-6 pt-6 border-t border-primary/10 flex flex-wrap gap-6 text-sm text-secondary/70 justify-center lg:justify-start">
        <span className="flex items-center gap-2 font-medium">
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Fixed Price
        </span>
        <span className="flex items-center gap-2 font-medium">
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Free Cancellation
        </span>
        <span className="flex items-center gap-2 font-medium">
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          24/7 Support
        </span>
      </div>
    </div>
  );
}

