import { Helmet } from "react-helmet-async";
import BookingForm from "@/components/BookingForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getSiteOrigin } from "@/lib/seo/site";

const BOOKING_SEO_META = {
  en: {
    title: "Request a Transfer — Paris Elite Services",
    description:
      "Request your private transfer in Paris. Airport pickups, city trips and excursions. We confirm availability and price before any payment.",
  },
  fr: {
    title: "Demander un Transfert — Paris Elite Services",
    description:
      "Demandez votre transfert privé à Paris. Prises en charge aéroport, trajets ville et excursions. Nous confirmons disponibilité et tarif avant tout paiement.",
  },
  es: {
    title: "Solicitar Traslado — Paris Elite Services",
    description:
      "Solicite su traslado privado en París. Recogidas en aeropuerto, trayectos urbanos y excursiones. Confirmamos disponibilidad y precio antes de cualquier pago.",
  },
  pt: {
    title: "Solicitar Transfer — Paris Elite Services",
    description:
      "Solicite o seu transfer privado em Paris. Recolhas no aeroporto, trajetos urbanos e excursões. Confirmamos disponibilidade e preço antes de qualquer pagamento.",
  },
};

const BookingPage = () => {
  const { language } = useLanguage();
  const siteOrigin = getSiteOrigin();
  const seo = BOOKING_SEO_META[language] ?? BOOKING_SEO_META.en;
  const canonicalUrl = `${siteOrigin}/booking`;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const intent = searchParams.get("intent");

  // Guard: prevent hourly intent from entering transfer wizard
  useEffect(() => {
    if (intent === "hourly") {
      navigate("/hourly", { replace: true });
    }
  }, [intent, navigate]);

  if (intent === "hourly") {
    return null;
  }

  const handleSubmit = async (bookingDetails: Record<string, unknown>) => {
    // Navigate to /booking/pending with trip data — contact info collected there
    navigate("/booking/pending", { state: { bookingDetails, language } });
  };

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
      <div className="container mx-auto px-4 py-8">
        <h1 className="sr-only">{seo.title}</h1>
        <BookingForm
          tourId="default"
          tourName="Standard Transfer"
          basePrice={0}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default BookingPage;
