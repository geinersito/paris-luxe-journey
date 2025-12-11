import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import FleetSection from "@/components/sections/FleetSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import PremiumSection from "@/components/sections/PremiumSection";
import RouteHighlights from "@/components/RouteHighlights";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PremiumSection />
      <RouteHighlights />
      <FleetSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
