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
      gradient: "from-blue-500/10 to-blue-600/10",
      iconColor: "text-blue-600",
    },
    {
      icon: Plane,
      title: t.routes?.orly || "Orly Airport",
      description: t.routes?.orlyDesc || "Paris ⇄ Orly",
      priceFrom: "70",
      gradient: "from-indigo-500/10 to-indigo-600/10",
      iconColor: "text-indigo-600",
    },
    {
      icon: Castle,
      title: t.routes?.disney || "Disneyland Paris",
      description: t.routes?.disneyDesc || "Magical day trip",
      priceFrom: "90",
      gradient: "from-pink-500/10 to-pink-600/10",
      iconColor: "text-pink-600",
    },
    {
      icon: Crown,
      title: t.routes?.versailles || "Versailles",
      description: t.routes?.versaillesDesc || "Royal palace tour",
      priceFrom: "90",
      gradient: "from-amber-500/10 to-amber-600/10",
      iconColor: "text-amber-600",
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
    <section className="py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            {t.routes?.title || "Popular Routes"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.routes?.subtitle ||
              "Our most requested destinations with fixed prices"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, index) => {
            const Icon = route.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div
                    className={`bg-gradient-to-br ${route.gradient} p-6 flex items-center justify-center`}
                  >
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Icon
                        className={`w-8 h-8 ${route.iconColor}`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-secondary dark:text-primary-foreground mb-2">
                      {route.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {route.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {t.common?.from || "From"}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        €{route.priceFrom}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.routes?.perTrip || "1-3 passengers"}
                      </p>
                    </div>

                    <Button
                      className="w-full silk-button"
                      onClick={() => handleRouteClick(route)}
                    >
                      {t.routes?.bookNow || "Book Now"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            {t.routes?.allInclusive ||
              "✓ All prices include tolls, parking & waiting time"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
