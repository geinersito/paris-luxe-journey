import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Users,
  Briefcase,
  WifiIcon,
  Droplet,
  Wind,
  Sofa,
  SprayCan,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVehicles } from "@/hooks/useVehicles";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const FEATURE_ICONS = {
  wifi: WifiIcon,
  water: Droplet,
  airConditioning: Wind,
  leatherSeats: Sofa,
  cleaning: SprayCan,
} as const;

const FALLBACK_EXTERIOR = "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&q=80";
const FALLBACK_INTERIOR = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80";

export default function FleetSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: vehicles, isLoading } = useVehicles();
  const [selectedImageType, setSelectedImageType] = React.useState<
    "exterior" | "interior"
  >("exterior");
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});

  const handleImageError = (vehicleId: string) => {
    setImageErrors(prev => ({ ...prev, [vehicleId]: true }));
  };

  const handleBookNow = () => {
    // Scroll suave al formulario de booking en la página principal
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Si no estamos en la página principal, navegar a ella
      navigate("/#booking");
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-gradient-to-b from-champagne via-cream to-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-12 w-96 mx-auto mb-6" />
            <Skeleton className="h-6 w-[500px] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="glass-card-premium rounded-2xl overflow-hidden"
              >
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-8">
                  <Skeleton className="h-8 w-3/4 mb-6" />
                  <div className="flex gap-3 mb-6">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                  <div className="space-y-3 mb-8">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="fleet" className="section-padding bg-gradient-to-b from-champagne via-cream to-white">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
            Premium Fleet
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6">
            {t.fleet.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.fleet.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="sync">
            {vehicles?.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="glass-card-premium rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden"
                  onClick={() =>
                    setSelectedImageType(
                      selectedImageType === "exterior"
                        ? "interior"
                        : "exterior",
                    )
                  }
                >
                  <div className="absolute inset-0 flex">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${vehicle.id}-${selectedImageType}`}
                        src={
                          imageErrors[vehicle.id]
                            ? (selectedImageType === "exterior" ? FALLBACK_EXTERIOR : FALLBACK_INTERIOR)
                            : (selectedImageType === "exterior"
                              ? vehicle.image_url
                              : vehicle.interior_image_url)
                        }
                        alt={`${vehicle.name} - ${selectedImageType}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onError={() => handleImageError(vehicle.id)}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* View labels */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span className="px-4 py-2 text-xs font-semibold rounded-xl backdrop-blur-md bg-white/95 text-primary shadow-lg">
                      {selectedImageType === "exterior"
                        ? t.fleet.exterior
                        : t.fleet.interior}
                    </span>
                    <span className="px-4 py-2 text-xs font-medium rounded-xl backdrop-blur-md bg-white/20 text-white border border-white/30">
                      Click to switch
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Title */}
                  <h3 className="text-2xl font-display font-bold text-secondary mb-6">
                    {vehicle.name}
                  </h3>

                  {/* Capacity badges */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-gold-subtle rounded-xl">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm font-semibold text-gray-700">
                        {vehicle.passenger_capacity} {t.fleet.passengers}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-gold-subtle rounded-xl">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <span className="text-sm font-semibold text-gray-700">
                        {vehicle.luggage_capacity} {t.fleet.luggage}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {vehicle.features?.map((feature) => {
                      const Icon =
                        FEATURE_ICONS[feature as keyof typeof FEATURE_ICONS];
                      return Icon ? (
                        <div
                          key={feature}
                          className="flex items-center gap-3 text-sm text-gray-600"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">
                            {
                              t.fleet.vehicleFeatures[
                                feature as keyof typeof FEATURE_ICONS
                              ]
                            }
                          </span>
                        </div>
                      ) : null;
                    })}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full silk-button"
                    onClick={handleBookNow}
                  >
                    {t.fleet.bookNow}
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
