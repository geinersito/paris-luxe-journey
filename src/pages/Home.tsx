import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/sections/HeroSection";
import FleetSection from "@/components/sections/FleetSection";
import ContactSection from "@/components/sections/ContactSection";
import PremiumSection from "@/components/sections/PremiumSection";
import TestimonialSection from "@/components/TestimonialSection";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  generateOrganizationJsonLd,
  generateLocalBusinessJsonLd,
} from "@/lib/seo/json-ld";
import { getSiteOrigin } from "@/lib/seo/site";

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

      <HeroSection />
      <PremiumSection />
      <FleetSection />
      <TestimonialSection />
      <ContactSection />
    </>
  );
}
