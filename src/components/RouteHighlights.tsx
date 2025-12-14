import React from "react";
import { Plane, Castle, Crown, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

/**
 * RouteHighlights - Rutas populares destacadas
 * Muestra las 4 rutas más solicitadas con precios desde y CTA directo
 * Aumenta conversión al destacar destinos populares
 */
export default function RouteHighlights() {
  const { t } = useLanguage();

  const popularRoutes = [
    {
      icon: Plane,
      title: t.routes?.cdg || "CDG Airport",
      description: t.routes?.cdgDesc || "Paris ⇄ Charles de Gaulle",
      priceFrom: "70",
      bgGradient: "from-primary/5 to-primary/10",
    },
    {
      icon: Plane,
      title: t.routes?.orly || "Orly Airport",
      description: t.routes?.orlyDesc || "Paris ⇄ Orly",
      priceFrom: "60",
      bgGradient: "from-primary/5 to-primary/10",
    },
    {
      icon: Castle,
      title: t.routes?.disney || "Disneyland Paris",
      description: t.routes?.disneyDesc || "Magical day trip",
      priceFrom: "95",
      bgGradient: "from-primary/5 to-primary/10",
    },
    {
      icon: Crown,
      title: t.routes?.versailles || "Versailles",
      description: t.routes?.versaillesDesc || "Royal palace tour",
      priceFrom: "75",
      bgGradient: "from-primary/5 to-primary/10",
    },
  ];

  const handleRouteClick = (route: (typeof popularRoutes)[0]) => {
    // Scroll al formulario de booking
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });

      // TODO: Prellenar origen/destino en el formulario
      // Esto requeriría un contexto o state management para pasar los datos
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white via-champagne/30 to-white">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
            Most Requested
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6">
            {t.routes?.title || "Popular Routes"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.routes?.subtitle ||
              "Our most requested destinations with fixed prices"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {popularRoutes.map((route, index) => {
            const Icon = route.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="h-full"
              >
                <div className="glass-card-premium overflow-hidden h-full flex flex-col group shadow-luxury hover:shadow-luxury-hover border-2 border-primary/10 hover:border-primary/20 transition-all duration-500 rounded-2xl">
                  {/* Icon Header with gradient - Enhanced */}
                  <div className={`bg-gradient-to-br ${route.bgGradient} p-8 flex items-center justify-center relative overflow-hidden group-hover:from-primary/15 group-hover:to-primary/25 transition-all duration-500`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 40px hsl(45 93% 47% / 0.1)' }} />
                    <div className="relative w-20 h-20 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:shadow-gold-glow group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Icon
                        className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-display font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-300">
                      {route.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-6 flex-1 leading-relaxed">
                      {route.description}
                    </p>

                    {/* Price Badge - Enhanced */}
                    <div className="mb-6">
                      <div className="inline-block bg-gradient-gold-subtle px-4 py-3 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                        <p className="text-xs text-gray-600 font-bold mb-1 uppercase tracking-wider">
                          {t.common?.from || "From"}
                        </p>
                        <p className="text-3xl font-display font-bold text-primary group-hover:text-primary-dark transition-colors duration-300">
                          €{route.priceFrom}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 font-medium">
                          {t.routes?.perTrip || "1-3 passengers"}
                        </p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className="w-full silk-button"
                      onClick={() => handleRouteClick(route)}
                    >
                      {t.routes?.bookNow || "Book Now"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-gray-700 font-medium">
              {t.routes?.allInclusive ||
                "All prices include tolls, parking & waiting time"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
