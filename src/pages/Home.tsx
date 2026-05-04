import React from "react";
import { Helmet } from "react-helmet-async";
import { CarFront, Languages, Sparkles } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import HomeEventsSection from "@/components/sections/HomeEventsSection";
import HomeExcursionsSection from "@/components/sections/HomeExcursionsSection";
import FleetSection from "@/components/sections/FleetSection";
import ContactSection from "@/components/sections/ContactSection";
import PremiumSection from "@/components/sections/PremiumSection";
import TestimonialSection from "@/components/TestimonialSection";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  generateOrganizationJsonLd,
  generateLocalBusinessJsonLd,
} from "@/lib/seo/json-ld";
import { getSiteOrigin } from "@/lib/seo/site";
import { trackEvent } from "@/lib/analytics";
import { Language } from "@/types/i18n";

const normalizeLabel = (value: string) => value.replace(/\s+/g, " ").trim();

const HOME_TRUST_COPY: Record<
  Language,
  {
    eyebrow: string;
    headline: string;
    cards: Array<{
      title: string;
      body: string;
    }>;
  }
> = {
  en: {
    eyebrow: "Trusted private chauffeur service in Paris",
    headline:
      "Private chauffeur service for airport transfers, events, excursions and agency travel in Paris.",
    cards: [
      {
        title: "Professional private transfers",
        body: "Airport, event and excursion journeys with a quote confirmed before booking.",
      },
      {
        title: "Multilingual assistance",
        body: "French, English, Spanish and Portuguese support for international travellers.",
      },
      {
        title: "Built for premium travel",
        body: "Sedans, vans, group and prestige options available on request, subject to configuration.",
      },
    ],
  },
  fr: {
    eyebrow: "Service de chauffeur prive de confiance a Paris",
    headline:
      "Service de chauffeur prive pour transferts aeroport, evenements, excursions et voyages d'agence a Paris.",
    cards: [
      {
        title: "Transferts prives professionnels",
        body: "Trajets aeroport, evenement et excursion avec devis confirme avant reservation.",
      },
      {
        title: "Assistance multilingue",
        body: "Accompagnement en francais, anglais, espagnol et portugais pour voyageurs internationaux.",
      },
      {
        title: "Concu pour les voyages premium",
        body: "Berlines, vans, groupes et options prestige disponibles sur demande, selon configuration.",
      },
    ],
  },
  es: {
    eyebrow: "Servicio de chofer privado de confianza en Paris",
    headline:
      "Servicio de chofer privado para traslados al aeropuerto, eventos, excursiones y viajes de agencia en Paris.",
    cards: [
      {
        title: "Traslados privados profesionales",
        body: "Trayectos de aeropuerto, eventos y excursiones con cotizacion confirmada antes de reservar.",
      },
      {
        title: "Asistencia multilingue",
        body: "Atencion en frances, ingles, espanol y portugues para viajeros internacionales.",
      },
      {
        title: "Pensado para viajes premium",
        body: "Berlina, van, grupos y opciones prestige disponibles bajo solicitud, segun configuracion.",
      },
    ],
  },
  pt: {
    eyebrow: "Servico de motorista privado de confianca em Paris",
    headline:
      "Servico de motorista privado para transfers de aeroporto, eventos, excursoes e viagens de agencia em Paris.",
    cards: [
      {
        title: "Transfers privados profissionais",
        body: "Trajetos de aeroporto, eventos e excursoes com cotacao confirmada antes da reserva.",
      },
      {
        title: "Atendimento multilingue",
        body: "Suporte em frances, ingles, espanhol e portugues para viajantes internacionais.",
      },
      {
        title: "Pensado para viagens premium",
        body: "Sedans, vans, grupos e opcoes prestige disponiveis sob consulta, conforme configuracao.",
      },
    ],
  },
};

export default function Home() {
  const { t, language } = useLanguage();
  const homeTrust = HOME_TRUST_COPY[language];

  // Use runtime domain (supports eliteparistransfer.com, parisluxejourney.com, etc.)
  const siteOrigin = getSiteOrigin();

  // Generate JSON-LD structured data
  const organizationJsonLd = generateOrganizationJsonLd({
    name: "Paris Elite Services",
    url: siteOrigin,
    logoUrl: `${siteOrigin}/logo.png`,
    description: t.seo.home.description,
    sameAs: [
      "https://www.facebook.com/parisluxejourney",
      "https://www.instagram.com/parisluxejourney",
    ],
  });

  const localBusinessJsonLd = generateLocalBusinessJsonLd({
    name: "Paris Elite Services",
    url: siteOrigin,
    telephone: "+33668251102",
    description: t.seo.home.description,
    priceRange: "€€€",
    address: {
      addressLocality: "Paris",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
  });

  const canonicalUrl = siteOrigin;

  const handleCtaClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const clickable = target.closest("a, button");
    if (!clickable) return;

    const label = normalizeLabel(clickable.textContent || "");
    if (!label) return;

    const section = clickable.closest("section");
    const heroPrimaryLabel = normalizeLabel(t.hero.ctaPrimary);
    const heroSecondaryLabel = normalizeLabel(t.hero.ctaSecondary);
    const b2bLabel = normalizeLabel(t.home.b2b.cta);

    if (section?.id === "booking" && label === heroPrimaryLabel) {
      trackEvent("cta_click", {
        page: "home",
        cta_id: "home_hero_primary",
        cta_label: label,
        placement: "hero_primary",
        destination: "booking_modal",
        href: "booking_modal",
      });
      return;
    }

    if (section?.id === "booking" && label === heroSecondaryLabel) {
      const href =
        clickable instanceof HTMLAnchorElement
          ? clickable.getAttribute("href") || "#contact"
          : "#contact";

      trackEvent("cta_click", {
        page: "home",
        cta_id: "home_hero_secondary",
        cta_label: label,
        placement: "hero_secondary",
        destination: href,
        href,
      });
      return;
    }

    if (section?.id === "b2b" && label === b2bLabel) {
      const href =
        clickable instanceof HTMLAnchorElement
          ? clickable.getAttribute("href") || "#contact"
          : "#contact";

      trackEvent("cta_click", {
        page: "home",
        cta_id: "home_b2b",
        cta_label: label,
        placement: "home_b2b",
        destination: href,
        href,
      });
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{t.seo.home.title}</title>
        <meta name="title" content={t.seo.home.title} />
        <meta name="description" content={t.seo.home.description} />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={t.seo.home.title} />
        <meta property="og:description" content={t.seo.home.description} />
        <meta property="og:image" content={`${siteOrigin}/og-image.jpg`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={t.seo.home.title} />
        <meta name="twitter:description" content={t.seo.home.description} />
        <meta name="twitter:image" content={`${siteOrigin}/og-image.jpg`} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessJsonLd)}
        </script>
      </Helmet>

      <div onClickCapture={handleCtaClickCapture}>
        <HeroSection />
        <section className="border-y border-primary/10 bg-gradient-to-b from-secondary/5 via-white to-white py-10 md:py-14">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">
                {homeTrust.eyebrow}
              </p>
              <h2 className="mt-4 text-2xl md:text-4xl font-display font-bold leading-tight text-secondary">
                {homeTrust.headline}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
              {homeTrust.cards.map((card, index) => {
                const Icon = [CarFront, Languages, Sparkles][index];

                return (
                  <article
                    key={card.title}
                    className="rounded-2xl border border-primary/10 bg-white/95 p-6 shadow-[0_18px_45px_rgba(11,30,45,0.08)]"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-gray-700 md:text-base">
                      {card.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <HomeEventsSection />
        <HomeExcursionsSection />
        <PremiumSection />
        <section id="b2b" className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-4xl mx-auto rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent p-8 text-center shadow-luxury">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-3">
                {t.home.b2b.title}
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-6">
                {t.home.b2b.desc}
              </p>
              <Button asChild className="silk-button">
                <a href="#contact">{t.home.b2b.cta}</a>
              </Button>
            </div>
          </div>
        </section>
        <FleetSection />
        <TestimonialSection />
        <ContactSection />
      </div>
    </>
  );
}
