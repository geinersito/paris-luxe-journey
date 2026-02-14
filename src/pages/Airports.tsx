import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Clock3, MapPin, PlaneTakeoff } from "lucide-react";
import TrustSignals from "@/components/TrustSignals";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatParisDate } from "@/lib/datetime/paris";
import { generateLocalBusinessJsonLd } from "@/lib/seo/json-ld";
import { getSiteOrigin } from "@/lib/seo/site";
import {
  AIRPORT_TERMINAL_GUIDE,
  TERMINAL_GUIDE_LAST_UPDATED_ISO,
  type AirportCode,
} from "@/data/airports/terminals";
import type { Language } from "@/types/i18n";

const SUPPORTED_LANGUAGES: Language[] = ["en", "fr", "es", "pt"];
const AIRPORT_WHATSAPP_URL = "https://wa.me/33668251102";

const isSupportedLanguage = (value?: string): value is Language => {
  return SUPPORTED_LANGUAGES.includes(value as Language);
};

const Airports = () => {
  const { t, language, setLanguage } = useLanguage();
  const { lang } = useParams<{ lang?: string }>();
  const [selectedAirport, setSelectedAirport] = useState<AirportCode>("CDG");
  const siteOrigin = getSiteOrigin();

  useEffect(() => {
    if (isSupportedLanguage(lang) && lang !== language) {
      setLanguage(lang);
    }
  }, [lang, language, setLanguage]);

  const selectedGuide = useMemo(() => {
    return (
      AIRPORT_TERMINAL_GUIDE.find(
        (guide) => guide.airport === selectedAirport,
      ) ?? AIRPORT_TERMINAL_GUIDE[0]
    );
  }, [selectedAirport]);
  const bookingUrl = useMemo(
    () => `/booking?service=airport&airport=${selectedAirport.toLowerCase()}`,
    [selectedAirport],
  );
  const canonicalPath =
    lang && isSupportedLanguage(lang) && lang !== "en"
      ? `/${lang}/airports`
      : "/airports";
  const canonicalUrl = `${siteOrigin}${canonicalPath}`;
  const pageTitle = t.seo.airports.title;
  const pageDescription = t.seo.airports.description;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pageTitle,
    description: pageDescription,
    serviceType: "Airport Transfer",
    url: canonicalUrl,
    inLanguage: lang && isSupportedLanguage(lang) ? lang : language,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Paris, Ile-de-France",
    },
    provider: {
      "@type": "ProfessionalService",
      name: "Paris Elite Services",
      url: siteOrigin,
      telephone: "+33668251102",
    },
  };

  const localBusinessJsonLd = generateLocalBusinessJsonLd({
    name: "Paris Elite Services",
    url: siteOrigin,
    telephone: "+33668251102",
    description: pageDescription,
    priceRange: "EUR",
    address: {
      addressLocality: "Paris",
      addressRegion: "Ile-de-France",
      addressCountry: "FR",
    },
  });

  const airportLabels: Record<AirportCode, string> = {
    CDG: t.airports.terminalGuide.airports.cdg,
    ORY: t.airports.terminalGuide.airports.ory,
    BVA: t.airports.terminalGuide.airports.bva,
  };

  const resolveTerminalToken = (token: string) => {
    const [terminalId, field] = token.split(".");
    if (!terminalId || !field) {
      return token;
    }

    const terminalText = t.airports.terminalGuide.terminals[terminalId];
    if (!terminalText) {
      return token;
    }

    if (field === "name") {
      return terminalText.name;
    }
    if (field === "airlinesHint") {
      return terminalText.airlinesHint ?? "";
    }
    if (field === "meetPoint") {
      return terminalText.meetPoint;
    }
    if (field === "transferTimeHint") {
      return terminalText.transferTimeHint ?? "";
    }

    return terminalText.tips[field] ?? token;
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${siteOrigin}/og-image.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${siteOrigin}/og-image.jpg`} />

        <script type="application/ld+json">
          {JSON.stringify(serviceJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessJsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-cream via-white to-champagne/20">
        <section className="section-padding pb-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-3">
                {t.airports.terminalGuide.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t.airports.terminalGuide.subtitle}
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                {t.airports.terminalGuide.lastUpdated}{" "}
                {formatParisDate(TERMINAL_GUIDE_LAST_UPDATED_ISO)}
              </p>
            </div>

            <nav className="mb-5 flex flex-wrap justify-center gap-2">
              <a
                href="#terminal-guide"
                className="inline-flex items-center rounded-full border border-primary/25 bg-white px-4 py-2 text-sm font-medium text-secondary hover:border-primary/50"
              >
                {t.airports.nav.terminalGuide}
              </a>
              <a
                href="#why-us"
                className="inline-flex items-center rounded-full border border-primary/25 bg-white px-4 py-2 text-sm font-medium text-secondary hover:border-primary/50"
              >
                {t.airports.nav.whyChooseUs}
              </a>
              <a
                href="#get-price"
                className="inline-flex items-center rounded-full border border-primary/25 bg-white px-4 py-2 text-sm font-medium text-secondary hover:border-primary/50"
              >
                {t.airports.nav.getPrice}
              </a>
            </nav>

            <section
              id="get-price"
              className="scroll-mt-24 mb-8 rounded-2xl border border-primary/15 bg-white/90 p-5 shadow-sm"
            >
              <h2 className="text-2xl font-display font-semibold text-secondary text-center">
                {t.airports.cta.title}
              </h2>
              <p className="mt-2 text-center text-muted-foreground">
                {t.airports.cta.subtitle}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={bookingUrl}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
                >
                  {t.airports.cta.fixedPrice}
                </a>
                <a
                  href={AIRPORT_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-primary/25 bg-white px-5 py-3 text-sm font-semibold text-secondary hover:border-primary/50"
                >
                  {t.airports.cta.whatsapp}
                </a>
              </div>
            </section>

            <div
              id="terminal-guide"
              className="scroll-mt-24 flex flex-wrap items-center justify-center gap-2 mb-8"
            >
              {(Object.keys(airportLabels) as AirportCode[]).map(
                (airportCode) => {
                  const isActive = selectedAirport === airportCode;
                  return (
                    <button
                      key={airportCode}
                      type="button"
                      onClick={() => setSelectedAirport(airportCode)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                        isActive
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-secondary border-primary/20 hover:border-primary/40"
                      }`}
                    >
                      <PlaneTakeoff className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {airportLabels[airportCode]}
                      </span>
                    </button>
                  );
                },
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-5 mb-8">
              {selectedGuide.terminals.map((terminal) => (
                <Card
                  key={`${selectedGuide.airport}-${terminal.code}`}
                  className="p-5 border border-primary/15 bg-white/90 shadow-sm"
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-display font-semibold text-secondary">
                      {terminal.code} · {resolveTerminalToken(terminal.name)}
                    </h2>
                    {terminal.airlinesHint && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {resolveTerminalToken(terminal.airlinesHint)}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold text-secondary">
                          {t.airports.terminalGuide.meetPoint}
                        </p>
                        <p className="text-muted-foreground">
                          {resolveTerminalToken(terminal.meetPoint)}
                        </p>
                      </div>
                    </div>

                    {terminal.transferTimeHint && (
                      <div className="flex items-start gap-2">
                        <Clock3 className="w-4 h-4 text-primary mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold text-secondary">
                            {t.airports.terminalGuide.transferTimeHint}
                          </p>
                          <p className="text-muted-foreground">
                            {resolveTerminalToken(terminal.transferTimeHint)}
                          </p>
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-secondary text-sm mb-1">
                        {t.airports.terminalGuide.tips}
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {terminal.pickupNotes.map((noteToken) => (
                          <li key={`${terminal.code}-${noteToken}`}>
                            {resolveTerminalToken(noteToken)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <section id="why-us" className="scroll-mt-24 mb-8">
              <TrustSignals />
            </section>

            <p className="text-sm text-muted-foreground mt-8">
              {t.airports.terminalGuide.disclaimer}
            </p>
          </div>
        </section>

        <div className="md:hidden fixed bottom-20 inset-x-4 z-40">
          <a
            href={bookingUrl}
            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-dark"
          >
            {t.airports.cta.mobileFixedPrice}
          </a>
        </div>
      </div>
    </>
  );
};

export default Airports;
