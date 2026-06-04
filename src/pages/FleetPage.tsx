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
        "Choose from premium sedans, luxury vans, group coaches and VIP SUVs. All vehicles are maintained by Paris Elite Services for private transfers and excursions.",
    },
    fr: {
      title: "Notre Flotte — Véhicules Chauffeur Privé | Paris Elite Services",
      description:
        "Choisissez parmi berlines premium, vans de luxe, autocars de groupe et SUV VIP. Tous les véhicules sont entretenus par Paris Elite Services.",
    },
    es: {
      title: "Nuestra Flota — Vehículos Chófer Privado | Paris Elite Services",
      description:
        "Elija entre sedanes premium, furgonetas de lujo, autocares de grupo y SUV VIP. Todos los vehículos son mantenidos por Paris Elite Services.",
    },
    pt: {
      title:
        "A Nossa Frota — Veículos Motorista Privado | Paris Elite Services",
      description:
        "Escolha entre sedans premium, vans de luxo, autocarros de grupo e SUV VIP. Todos os veículos são mantidos pela Paris Elite Services.",
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
