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
    transition: { duration: 0.6 },
  };

  const services = [
    {
      icon: Plane,
      title: t.services.airport.title,
      description: t.services.airport.description,
      priceFrom: t.services.airport.priceFrom,
      features: t.services.airport.features,
      ctaLabel: t.services.airport.cta || t.services.cta,
      cta: () => navigate("/booking"),
      badge: "Most Popular",
    },
    {
      icon: Landmark,
      title: t.services.cityTours.title,
      description: t.services.cityTours.description,
      priceFrom: t.services.cityTours.priceFrom,
      features: t.services.cityTours.features,
      ctaLabel: t.services.cityTours.cta || t.services.cta,
      cta: () => navigate("/excursions"),
    },
    {
      icon: Car,
      title: t.services.chauffeur.title,
      description: t.services.chauffeur.description,
      priceFrom: t.services.chauffeur.priceFrom,
      features: t.services.chauffeur.features,
      ctaLabel: t.services.chauffeur.cta || t.services.cta,
      cta: () => navigate("/booking"),
    },
  ];

  return (
    <section
      id="services"
      className="section-padding bg-gradient-to-b from-cream via-white to-champagne"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={fadeIn.initial}
          whileInView={fadeIn.animate}
          viewport={{ once: true }}
          transition={fadeIn.transition}
        >
          <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
            {t.services.decorativeSubtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-secondary">
            {t.services.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="relative group"
            >
              {/* Badge "Most Popular" */}
              {service.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-gradient-gold text-white px-5 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {service.badge}
                  </div>
                </div>
              )}

              {/* Glass Card - Enhanced with stronger shadows */}
              <div className="glass-card-premium p-8 rounded-2xl h-full flex flex-col relative overflow-hidden shadow-luxury group-hover:shadow-luxury-hover border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-500">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Gold glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 60px hsl(45 93% 47% / 0.1)" }}
                />

                {/* Icon with enhanced animation */}
                <div className="relative z-10 flex items-center justify-center mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md group-hover:shadow-gold-glow">
                  <service.icon
                    className="w-10 h-10 text-primary stroke-[1.5] group-hover:scale-110 transition-transform duration-500"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-2xl font-display font-bold text-secondary text-center mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-gray-700 text-center mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Price Badge - Enhanced */}
                <div className="relative z-10 text-center mb-6">
                  <div className="inline-block bg-gradient-gold-subtle px-6 py-3 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                    <p className="text-xs text-gray-600 font-bold mb-1 uppercase tracking-wider">
                      From
                    </p>
                    <p className="text-3xl font-display font-bold text-primary group-hover:text-primary-dark transition-colors duration-300">
                      {service.priceFrom}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <ul className="relative z-10 space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <svg
                        className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Trust badges - contextual reassurance (service-specific, non-duplicated) */}
                <div className="relative z-10 flex flex-wrap justify-center gap-3 text-xs text-gray-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-primary flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Licensed Chauffeurs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-primary flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Meet & Greet</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-primary flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Flight Tracking</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={service.cta}
                  className="relative z-10 w-full silk-button"
                >
                  {service.ctaLabel}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Group Disclaimer */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-500 font-medium">
            {t.services.groupDisclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumSection;
