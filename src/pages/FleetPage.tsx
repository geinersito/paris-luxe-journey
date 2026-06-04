import { Helmet } from "react-helmet-async";
import FleetSection from "@/components/sections/FleetSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteOrigin } from "@/lib/seo/site";
import type { Language } from "@/types/i18n";

const FLEET_SEO_META: Record<Language, { title: string; description: string }> =
  {
    en: {
      title: "Our Fleet — Private Chauffeur Vehicles | Paris Elite Services",
      description:
        "Private transfers in Paris with premium sedans and luxury vans. Larger vehicles available on request. Discover our fleet for airport transfers and day trips.",
    },
    fr: {
      title: "Notre Flotte — Véhicules Chauffeur Privé | Paris Elite Services",
      description:
        "Transferts privés à Paris en berlines premium et vans de luxe. Véhicules de plus grande capacité disponibles sur demande. Découvrez notre flotte.",
    },
    es: {
      title: "Nuestra Flota — Vehículos Chófer Privado | Paris Elite Services",
      description:
        "Traslados privados en París con sedanes premium y furgonetas de lujo. Vehículos de mayor capacidad disponibles bajo solicitud. Descubra nuestra flota.",
    },
    pt: {
      title:
        "A Nossa Frota — Veículos Motorista Privado | Paris Elite Services",
      description:
        "Transfers privados em Paris com sedans premium e vans de luxo. Veículos de maior capacidade disponíveis sob consulta. Conheça a nossa frota.",
    },
  };

export default function FleetPage() {
  const { language } = useLanguage();
  const siteOrigin = getSiteOrigin();
  const seo = FLEET_SEO_META[language] ?? FLEET_SEO_META.en;
  const canonicalUrl = `${siteOrigin}/fleet`;

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={`${siteOrigin}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={`${siteOrigin}/og-image.png`} />
      </Helmet>
      <h1 className="sr-only">{seo.title}</h1>
      <FleetSection />
    </>
  );
}
