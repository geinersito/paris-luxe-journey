import { useNavigate } from "react-router-dom";
import { Plane, Landmark, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  buildAirportWhatsAppUrl,
  buildGenericWhatsAppUrl,
} from "@/lib/eventsPrefill";

const PremiumSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const services = [
    {
      icon: Plane,
      title: t.services.airport.title,
      description: t.services.airport.description,
      priceFrom: t.services.airport.priceFrom,
      features: t.services.airport.features,
      ctaLabel: t.services.airport.cta || t.services.cta,
      cta: () =>
        window.open(
          buildAirportWhatsAppUrl("CDG / Orly / Beauvais", language),
          "_blank",
        ),
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
      cta: () => window.open(buildGenericWhatsAppUrl(language), "_blank"),
    },
  ];

  const [featured, ...secondary] = services;

  return (
    <section
      id="services"
      className="bg-white py-16 md:py-24 border-b border-ref-ink/8"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.3em] text-ref-ink/40 mb-4">
            {t.services.decorativeSubtitle}
          </p>
          <h2 className="font-editorial font-light text-3xl md:text-4xl text-ref-ink">
            {t.services.title}
          </h2>
        </div>

        {/* Featured service */}
        <div className="border-t border-ref-ink/8 py-12 md:py-16">
          <div className="flex items-center gap-2 font-ui text-xs text-ref-ink/40 mb-5 uppercase tracking-[0.2em]">
            <featured.icon className="w-3.5 h-3.5 shrink-0" />
          </div>
          <div className="max-w-xl">
            <h3 className="font-editorial font-light text-3xl md:text-4xl text-ref-ink mb-3">
              {featured.title}
            </h3>
            <p className="font-ui font-semibold text-ref-navy text-lg mb-6">
              {featured.priceFrom}
            </p>
            <ul className="space-y-2.5 mb-8">
              {featured.features.map((f) => (
                <li
                  key={f}
                  className="font-ui text-sm text-ref-ink/60 flex items-center gap-2.5"
                >
                  <span className="w-1 h-1 rounded-full bg-ref-navy shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={featured.cta}
              className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-ref-navy border-b border-ref-navy/40 pb-0.5 hover:border-ref-navy transition-colors"
            >
              {featured.ctaLabel} →
            </button>
          </div>
        </div>

        {/* Secondary services */}
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ref-ink/8 border-t border-ref-ink/8">
          {secondary.map((service) => (
            <div
              key={service.title}
              className="py-10 md:py-12 md:px-10 first:md:pl-0 last:md:pr-0"
            >
              <div className="flex items-center gap-2 font-ui text-xs text-ref-ink/40 mb-4 uppercase tracking-[0.2em]">
                <service.icon className="w-3.5 h-3.5 shrink-0" />
              </div>
              <h3 className="font-editorial font-light text-2xl text-ref-ink mb-2">
                {service.title}
              </h3>
              <p className="font-ui font-semibold text-ref-navy text-sm mb-3">
                {service.priceFrom}
              </p>
              <p className="font-ui text-sm text-ref-ink/60 leading-relaxed mb-6">
                {service.description}
              </p>
              <button
                type="button"
                onClick={service.cta}
                className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-ref-navy border-b border-ref-navy/40 pb-0.5 hover:border-ref-navy transition-colors"
              >
                {service.ctaLabel} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
