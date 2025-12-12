import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import FleetSection from "@/components/sections/FleetSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import PremiumSection from "@/components/sections/PremiumSection";
import RouteHighlights from "@/components/RouteHighlights";
import TestimonialSection from "@/components/TestimonialSection";
import FAQ from "@/components/FAQ";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Safety Alert Banner */}
      <section className="bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3 text-center flex-wrap">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm md:text-base text-gray-700">
              <strong className="font-semibold">⚠️ First time in Paris?</strong> Learn how to avoid fake taxi scams at CDG & Orly airports.
              <Link
                to="/guides/avoid-fake-taxis"
                className="text-primary hover:text-primary/80 underline ml-2 font-medium"
              >
                Read our safety guide →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <PremiumSection />
      <RouteHighlights />
      <FleetSection />
      <TestimonialSection />
      <FAQ />
      <AboutSection />
      <ContactSection />
    </>
  );
}
