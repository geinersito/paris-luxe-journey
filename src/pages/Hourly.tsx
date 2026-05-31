import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  Clock,
  MapPin,
  ShoppingBag,
  Building2,
  Landmark,
  Calendar,
  MessageCircle,
  Mail,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { buildHourlyWhatsAppUrl } from "@/lib/eventsPrefill";
import { getSiteOrigin } from "@/lib/seo/site";

const USE_CASE_ICONS = [
  <Building2 className="w-7 h-7" />,
  <ShoppingBag className="w-7 h-7" />,
  <MapPin className="w-7 h-7" />,
  <Landmark className="w-7 h-7" />,
  <Calendar className="w-7 h-7" />,
];

const EMAIL_ADDRESS = "info@eliteparistransfer.com";

export default function HourlyService() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const siteOrigin = getSiteOrigin();
  const canonicalUrl = `${siteOrigin}/hourly`;
  const waUrl = buildHourlyWhatsAppUrl(language);
  const emailUrl = `mailto:${EMAIL_ADDRESS}`;

  const useCaseKeys = [
    "meetings",
    "shopping",
    "cityTour",
    "versailles",
    "multiEvent",
  ] as const;

  const faqKeys = [
    "minHours",
    "whatsIncluded",
    "multipleStops",
    "versaillesDay",
    "vehicleType",
  ] as const;

  const faqs = faqKeys.map((k) => ({
    key: k,
    q: t(`hourly.faqs.${k}.q`),
    a: t(`hourly.faqs.${k}.a`),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("hourly.heroTitle"),
    description: t("hourly.pageDescription"),
    url: canonicalUrl,
    provider: {
      "@type": "Organization",
      name: "Paris Elite Services",
      url: siteOrigin,
    },
    areaServed: { "@type": "City", name: "Paris" },
    serviceType: "Hourly Chauffeur / Mise à Disposition",
  };

  return (
    <>
      <Helmet>
        <title>{t("hourly.pageTitle")}</title>
        <meta name="description" content={t("hourly.pageDescription")} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={t("hourly.pageTitle")} />
        <meta property="og:description" content={t("hourly.pageDescription")} />
        <meta property="og:image" content={`${siteOrigin}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("hourly.pageTitle")} />
        <meta
          name="twitter:description"
          content={t("hourly.pageDescription")}
        />
        <script type="application/ld+json">
          {JSON.stringify(serviceJsonLd)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative min-h-[380px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/library/fleet/mercedes-sclass-maybach-paris-prestige-sedan-1200x800.jpg"
              alt="Hourly chauffeur service Paris"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
            <div className="mx-auto max-w-5xl px-2 md:px-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full mb-5">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {t("hourly.badge")}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-5xl text-white font-display font-bold mb-4 leading-tight drop-shadow-2xl">
                {t("hourly.heroTitle")}
              </h1>

              <p className="text-base md:text-lg text-white/95 mb-6 max-w-3xl mx-auto leading-relaxed">
                {t("hourly.heroSubtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="silk-button" asChild>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t("hourly.ctaQuote")}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="button-outline-gold h-11 px-7 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                  asChild
                >
                  <Link to="/excursions/versailles">Versailles Day Trip</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust row */}
        <div className="bg-white border-b border-primary/10 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {(
                [
                  "trustFlexible",
                  "trustProfessional",
                  "trustAsDirected",
                  "trustAvailability",
                ] as const
              ).map((k) => (
                <span
                  key={k}
                  className="flex items-center gap-1.5 font-medium text-secondary"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  {t(`hourly.${k}`)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-white via-champagne/20 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-3">
                {t("hourly.useCasesTitle")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("hourly.useCasesSubtitle")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {useCaseKeys.map((k, i) => (
                <div
                  key={k}
                  className="bg-white rounded-2xl border border-primary/10 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-primary mb-4">
                    {USE_CASE_ICONS[i]}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-secondary mb-2">
                    {t(`hourly.useCases.${k}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {t(`hourly.useCases.${k}.description`)}
                  </p>
                  <span className="inline-block text-xs font-medium text-primary bg-primary/8 px-3 py-1 rounded-full">
                    {t(`hourly.useCases.${k}.duration`)}
                  </span>
                </div>
              ))}

              {/* Internal link card — Versailles */}
              <div className="bg-champagne/40 rounded-2xl border border-primary/15 p-6 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">
                    Also available
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Looking for a fixed-price{" "}
                    <Link
                      to="/excursions/versailles"
                      className="text-primary underline underline-offset-2 hover:text-primary/80"
                    >
                      Versailles excursion
                    </Link>{" "}
                    or planning around a Paris{" "}
                    <Link
                      to="/events"
                      className="text-primary underline underline-offset-2 hover:text-primary/80"
                    >
                      event or concert
                    </Link>
                    ? We offer both fixed-route transfers and hourly disposals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-3">
                  {t("hourly.pricingTitle")}
                </h2>
                <p className="text-muted-foreground">
                  {t("hourly.pricingSubtitle")}
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/8 via-primary/4 to-transparent border border-primary/20 rounded-2xl p-8 md:p-10">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between mb-6">
                  <div>
                    <p className="text-3xl md:text-4xl font-display font-bold text-primary">
                      {t("hourly.pricingFrom")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t("hourly.pricingMinimum")}
                    </p>
                  </div>
                  <Button size="lg" className="silk-button shrink-0" asChild>
                    <a href={waUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {t("hourly.pricingCta")}
                    </a>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground border-t border-primary/10 pt-4 leading-relaxed">
                  {t("hourly.pricingNote")}
                </p>

                <p className="text-xs text-muted-foreground/70 mt-3">
                  For{" "}
                  <Link
                    to="/airports/cdg"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    airport transfers
                  </Link>{" "}
                  (CDG, Orly, Beauvais), fixed-route pricing applies — not
                  hourly rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-champagne/20 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-3">
                  {t("hourly.faqTitle")}
                </h2>
                <p className="text-muted-foreground">
                  {t("hourly.faqSubtitle")}
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map(({ key, q, a }) => (
                  <div
                    key={key}
                    className="bg-white rounded-xl border border-primary/10 overflow-hidden"
                  >
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                      onClick={() => setOpenFaq(openFaq === key ? null : key)}
                      aria-expanded={openFaq === key}
                    >
                      <span className="font-medium text-secondary text-sm md:text-base">
                        {q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${openFaq === key ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openFaq === key && (
                      <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-primary/8">
                        <p className="pt-4">{a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-14 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
                {t("hourly.ctaTitle")}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {t("hourly.ctaDescription")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="silk-button" asChild>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t("hourly.ctaWhatsAppFull")}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="button-outline-gold"
                  asChild
                >
                  <a href={emailUrl}>
                    <Mail className="w-5 h-5 mr-2" />
                    {t("hourly.ctaEmail")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
