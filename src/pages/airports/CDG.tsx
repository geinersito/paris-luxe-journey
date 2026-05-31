import {
  Plane,
  Clock,
  Shield,
  MapPin,
  CheckCircle,
  Star,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { airportsTranslations } from "@/i18n/airports";
import { buildAirportWhatsAppUrl } from "@/lib/eventsPrefill";

const CDG_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80";

export default function CDGAirport() {
  const { t, language } = useLanguage();
  const cdg = airportsTranslations[language].cdg;
  const premiumBadge = {
    en: "Premium airport transfers",
    fr: "Transferts aeroport premium",
    es: "Transfers premium al aeropuerto",
    pt: "Transfers premium para aeroporto",
  }[language];
  const whyChooseItems = [
    {
      icon: <Plane className="w-8 h-8" />,
      title: cdg.whyChoose.benefits.allTerminals.title,
      description: cdg.whyChoose.benefits.allTerminals.description,
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: cdg.whyChoose.benefits.flightTracking.title,
      description: cdg.whyChoose.benefits.flightTracking.description,
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: cdg.whyChoose.benefits.meetGreet.title,
      description: cdg.whyChoose.benefits.meetGreet.description,
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: cdg.whyChoose.benefits.directRoutes.title,
      description: cdg.whyChoose.benefits.directRoutes.description,
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: cdg.whyChoose.benefits.premiumVehicles.title,
      description: cdg.whyChoose.benefits.premiumVehicles.description,
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: cdg.whyChoose.benefits.fixedPricing.title,
      description: cdg.whyChoose.benefits.fixedPricing.description,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center py-24 overflow-hidden">
        <img
          src={CDG_IMAGE}
          alt={cdg.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-black/70 to-primary-dark/90" />

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Plane className="w-5 h-5 text-primary-200" />
              <span className="text-sm font-medium">{cdg.badge}</span>
            </div>

            <p className="font-accent italic text-xl md:text-2xl text-primary-200 mb-4">
              {premiumBadge}
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              {cdg.title}
              <span className="block text-primary-200 mt-2 text-2xl md:text-3xl">
                {cdg.subtitle}
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              {cdg.description}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() =>
                  window.open(
                    buildAirportWhatsAppUrl(
                      t.airports.terminalGuide.airports.cdg,
                      language,
                    ),
                    "_blank",
                  )
                }
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg font-semibold shadow-xl"
              >
                {t.airports.cta.fixedPrice}
              </Button>
              <a
                href={buildAirportWhatsAppUrl(
                  t.airports.terminalGuide.airports.cdg,
                  language,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/40 bg-white/10 backdrop-blur-sm px-8 py-6 text-lg font-semibold text-white hover:bg-white/20"
              >
                {t.airports.cta.whatsapp}
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <Clock className="w-6 h-6 text-primary-200" />
                <span className="text-sm font-medium">
                  {cdg.trustBadges.flightTracking}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <Shield className="w-6 h-6 text-primary-200" />
                <span className="text-sm font-medium">
                  {cdg.trustBadges.meetGreet}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <MapPin className="w-6 h-6 text-primary-200" />
                <span className="text-sm font-medium">
                  {cdg.whyChoose.benefits.allTerminals.title}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <CheckCircle className="w-6 h-6 text-primary-200" />
                <span className="text-sm font-medium">
                  {cdg.trustBadges.available247}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Airport Description */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6">
              {cdg.about.title}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4 leading-relaxed">{cdg.about.paragraph1}</p>
              <p className="mb-4 leading-relaxed">{cdg.about.paragraph2}</p>
              <p className="leading-relaxed">{cdg.about.paragraph3}</p>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-primary/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">25 km</div>
                <div className="text-sm text-muted-foreground">
                  {cdg.about.stats.fromParis}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">76M+</div>
                <div className="text-sm text-muted-foreground">
                  {cdg.about.stats.passengers}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">
                  {cdg.about.stats.terminals}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">320+</div>
                <div className="text-sm text-muted-foreground">
                  {cdg.about.stats.destinations}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for CDG */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              {cdg.whyChoose.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {cdg.whyChoose.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseItems.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-primary/5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() =>
                window.open(
                  buildAirportWhatsAppUrl(
                    t.airports.terminalGuide.airports.cdg,
                    language,
                  ),
                  "_blank",
                )
              }
              className="w-full sm:w-auto h-auto min-h-12 whitespace-normal bg-secondary px-6 py-4 text-center text-lg font-semibold text-white shadow-lg hover:bg-secondary/90 sm:px-8"
            >
              {cdg.pricing.bookNow}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
