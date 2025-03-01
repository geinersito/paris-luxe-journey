import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/sections/HeroSection";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import PremiumSection from "@/components/sections/PremiumSection";
import FleetSection from "@/components/sections/FleetSection";
import FAQ from "@/components/FAQ";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";
import { LiveChat } from "@/components/chat/LiveChat";

export default function Index() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simular un tiempo de carga mínimo para asegurar que todo se monte correctamente
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleBookNow = () => {
    navigate('/booking');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased transition-colors duration-300">
      <main className="pt-16">
        <div className="relative">
          <HeroSection />
        </div>
        <div className="space-y-24 md:space-y-32 pb-24">
          <PremiumSection />
          <FleetSection />
          <FAQ />
          <AboutSection />
          <ContactSection />
        </div>
      </main>
      <ScrollToTop />
      <LiveChat />
    </div>
  );
}
