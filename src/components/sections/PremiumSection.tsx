import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Landmark, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const PremiumSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const services = [
    {
      icon: Plane,
      title: t.services.airport.title,
      description: t.services.airport.description,
      priceFrom: t.services.airport.priceFrom,
      features: t.services.airport.features,
      cta: () => navigate('/booking'),
      badge: "Most Popular"
    },
    {
      icon: Landmark,
      title: t.services.cityTours.title,
      description: t.services.cityTours.description,
      priceFrom: t.services.cityTours.priceFrom,
      features: t.services.cityTours.features,
      cta: () => navigate('/excursions')
    },
    {
      icon: Car,
      title: t.services.chauffeur.title,
      description: t.services.chauffeur.description,
      priceFrom: t.services.chauffeur.priceFrom,
      features: t.services.chauffeur.features,
      cta: () => navigate('/booking')
    }
  ];

  return (
    <section id="services" className="py-28 bg-gradient-to-b from-background via-background/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition}
        >
          <p className="text-xl md:text-2xl font-display italic text-secondary mb-4">
            {t.services.decorativeSubtitle}
          </p>
          <h2 className="text-4xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              <div className="relative z-10 bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                {/* Badge "Most Popular" */}
                {service.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md">
                    🏆 {service.badge}
                  </div>
                )}

                <div className="flex items-center justify-center mx-auto mb-6 w-16 h-16 bg-primary/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary stroke-[1.5]" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-semibold text-secondary text-center mb-4">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-center mb-4">
                  {service.description}
                </p>

                {/* Precio */}
                <div className="text-center mb-6">
                  <p className="text-2xl font-bold text-primary">
                    {service.priceFrom}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0 mt-2" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={service.cta}
                  className="w-full silk-button"
                >
                  {t.services.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Group Disclaimer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            {t.services.groupDisclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
