import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Plane, MapPin, Clock } from "lucide-react";

const PremiumSection = () => {
  const { t } = useLanguage();

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
      features: [
        "VIP Meet & Greet",
        "Priority Baggage Handling",
        "Flight Monitoring",
        "Fast-track Security"
      ]
    },
    {
      icon: MapPin,
      title: t.services.cityTours.title,
      description: t.services.cityTours.description,
      features: [
        "Customized Itineraries",
        "Expert Local Guides",
        "Skip-the-line Access",
        "Luxury Comfort"
      ]
    },
    {
      icon: Clock,
      title: t.services.chauffeur.title,
      description: t.services.chauffeur.description,
      features: [
        "Professional Chauffeurs",
        "24/7 Availability",
        "Multilingual Service",
        "Full Flexibility"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background via-background/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition}
        >
          <h2 className="text-4xl font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              
              <div className="relative z-10 bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-12 h-12 text-primary stroke-[1.5]" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-display text-primary text-center mb-4">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-center mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0 mt-2" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
