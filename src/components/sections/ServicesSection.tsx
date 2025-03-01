import React from 'react';
import { Plane, Clock, MapPin } from "lucide-react";
import ServiceCard from "../ServiceCard";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  {
    icon: Plane,
    titleKey: 'services.airport.title',
    descriptionKey: 'services.airport.description',
    basePrice: 80
  },
  {
    icon: MapPin,
    titleKey: 'services.excursions.title',
    descriptionKey: 'services.excursions.description',
    basePrice: 120
  },
  {
    icon: Clock,
    titleKey: 'services.hourly.title',
    descriptionKey: 'services.hourly.description',
    basePrice: 60
  },
];

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display text-primary dark:text-primary-foreground text-center mb-6">
          {t.services.title}
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t.services.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.titleKey}
              className="transform transition-all duration-300 hover:translate-y-[-4px]"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`
              }}
            >
              <ServiceCard
                icon={service.icon}
                title={t[service.titleKey]}
                description={t[service.descriptionKey]}
                price={`${t.common.from} €${service.basePrice}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}