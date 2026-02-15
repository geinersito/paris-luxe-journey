import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/sections/HeroSection";
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

const normalizeLabel = (value: string) => value.replace(/\s+/g, " ").trim();

export default function Home() {
  const { t, language } = useLanguage();

  // Use runtime domain (supports eliteparistransfer.com, parisluxejourney.com, etc.)
  const siteOrigin = getSiteOrigin();

  // Generate JSON-LD structured data
  const organizationJsonLd = generateOrganizationJsonLd({
    name: "Paris Luxe Journey",
    url: siteOrigin,
    logoUrl: `${siteOrigin}/logo.png`,
    description: t.seo.home.description,
    sameAs: [
      "https://www.facebook.com/parisluxejourney",
      "https://www.instagram.com/parisluxejourney",
    ],
  });

  const localBusinessJsonLd = generateLocalBusinessJsonLd({
    name: "Paris Luxe Journey",
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

  const canonicalUrl = `${siteOrigin}/${language}`;

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
        destination: "booking_modal",
      });
      return;
    }

    if (section?.id === "booking" && label === heroSecondaryLabel) {
      trackEvent("cta_click", {
        page: "home",
        cta_id: "home_hero_secondary",
        cta_label: label,
        destination:
          clickable instanceof HTMLAnchorElement
            ? clickable.getAttribute("href") || "#contact"
            : "#contact",
      });
      return;
    }

    if (section?.id === "b2b" && label === b2bLabel) {
      trackEvent("cta_click", {
        page: "home",
        cta_id: "home_b2b",
        cta_label: label,
        destination:
          clickable instanceof HTMLAnchorElement
            ? clickable.getAttribute("href") || "#contact"
            : "#contact",
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
