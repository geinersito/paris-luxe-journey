import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Briefcase, WifiIcon, Droplet, Wind, Sofa, SprayCan } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVehicles } from "@/hooks/useVehicles";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const FEATURE_ICONS = {
  wifi: WifiIcon,
  water: Droplet,
  airConditioning: Wind,
  leatherSeats: Sofa,
  cleaning: SprayCan
} as const;

export default function FleetSection() {
  const { t } = useLanguage();
  const { data: vehicles, isLoading } = useVehicles();
  const [selectedImageType, setSelectedImageType] = React.useState<"exterior" | "interior">("exterior");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-pearl dark:bg-gray-800">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden bg-white dark:bg-gray-700">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="fleet" className="py-20 bg-pearl dark:bg-gray-800">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-display text-primary dark:text-primary-foreground mb-6">
            {t.fleet.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.fleet.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="sync">
            {vehicles?.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.2 }
                  },
                  exit: { opacity: 0, y: -20 }
                }}
                className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className="relative aspect-video group cursor-pointer"
                  onClick={() => setSelectedImageType(selectedImageType === "exterior" ? "interior" : "exterior")}
                >
                  <div className="absolute inset-0 flex">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${vehicle.id}-${selectedImageType}`}
                        src={selectedImageType === "exterior" ? vehicle.image_url : vehicle.interior_image_url}
                        alt={`${vehicle.name} - ${selectedImageType}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Current view label - only visible on hover */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3 py-1.5 text-xs font-medium rounded-md backdrop-blur-md bg-white/90 text-primary shadow-md">
                      {selectedImageType === "exterior" ? t.fleet.exterior : t.fleet.interior}
                    </span>
                    <span className="px-3 py-1.5 text-xs font-medium rounded-md backdrop-blur-md bg-white/40 text-white">
                      Click to switch
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground mb-4">
                    {vehicle.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{vehicle.passenger_capacity} {t.fleet.passengers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{vehicle.luggage_capacity} {t.fleet.luggage}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {vehicle.features?.map((feature) => {
                      const Icon = FEATURE_ICONS[feature as keyof typeof FEATURE_ICONS];
                      return Icon ? (
                        <div 
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{t.fleet.vehicleFeatures[feature as keyof typeof FEATURE_ICONS]}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
