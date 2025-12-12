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
    <div className="glass-card-premium p-6 max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {/* Pickup Location */}
        <div className="flex-1 w-full">
          <label className="block text-sm font-semibold text-secondary mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            {t.booking.pickup}
          </label>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white/90 backdrop-blur-sm font-sans"
          >
            <option value="">Select pickup location</option>
            <option value="cdg">Paris CDG Airport</option>
            <option value="orly">Paris Orly Airport</option>
            <option value="paris">Paris City Center</option>
            <option value="disneyland">Disneyland Paris</option>
            <option value="versailles">Versailles</option>
          </select>
        </div>

        {/* Dropoff Location */}
        <div className="flex-1 w-full">
          <label className="block text-sm font-semibold text-secondary mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            {t.booking.dropoff}
          </label>
          <select
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white/90 backdrop-blur-sm font-sans"
          >
            <option value="">Select dropoff location</option>
            <option value="cdg">Paris CDG Airport</option>
            <option value="orly">Paris Orly Airport</option>
            <option value="paris">Paris City Center</option>
            <option value="disneyland">Disneyland Paris</option>
            <option value="versailles">Versailles</option>
          </select>
        </div>

        {/* Passengers */}
        <div className="w-full lg:w-40">
          <label className="block text-sm font-semibold text-secondary mb-2">
            <Users className="inline w-4 h-4 mr-1" />
            {t.booking.passengers}
          </label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white/90 backdrop-blur-sm font-sans"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'passenger' : 'passengers'}
              </option>
            ))}
          </select>
        </div>

        {/* CTA Button */}
        <div className="w-full lg:w-auto">
          <Button
            onClick={handleQuickBook}
            className="silk-button w-full lg:w-auto px-8 py-6 text-lg font-semibold whitespace-nowrap"
          >
            Get Instant Quote
            <svg
              className="inline-block ml-2 w-5 h-5"
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
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-secondary/80 justify-center lg:justify-start">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Fixed Price
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Free Cancellation
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          24/7 Support
        </span>
      </div>
    </div>
  );
}

