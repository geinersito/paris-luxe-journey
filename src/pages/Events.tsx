import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { EventsFeed } from "@/components/events/EventsFeed";
import TrustSignals from "@/components/TrustSignals";
import { Sparkles, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  buildGenericWhatsAppUrl,
  buildGenericEmailUrl,
} from "@/lib/eventsPrefill";
import { getSiteOrigin } from "@/lib/seo/site";
import { formatParisDate } from "@/lib/datetime/paris";
import eventsFeedData from "@/data/events/events-feed.json";

export default function Events() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const language = i18n.language;

  const siteOrigin = getSiteOrigin();
  const canonicalUrl = `${siteOrigin}/events`;
  const pageTitle =
    t("events.pageTitle") || "Events in Paris | Paris Luxe Journey";
  const pageDescription =
    t("events.pageDescription") ||
    "Discover the best events, concerts, exhibitions and activities happening in Paris this week and month. Book your luxury transfer to any event.";
  const lastUpdatedLabel = `${t("events.updatedOn")} ${formatParisDate(eventsFeedData.generatedAt)}`;

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    inLanguage: language,
    isPartOf: {
      "@type": "WebSite",
      name: "Paris Luxe Journey",
      url: siteOrigin,
    },
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="Paris events, concerts Paris, exhibitions Paris, Paris activities, events this week Paris, events this month Paris"
        />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${siteOrigin}/og-image.jpg`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${siteOrigin}/og-image.jpg`} />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(webPageJsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative section-padding bg-gradient-to-b from-champagne via-cream to-white">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {t("events.liveUpdates") || "Live Updates"}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary mb-6">
                {t("events.heroTitle") || "Events in Paris"}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t("events.heroSubtitle") ||
                  "Discover the best concerts, exhibitions, shows and cultural events happening in Paris. Book your luxury transfer to arrive in style."}
              </p>
              <p className="text-sm text-muted-foreground/90 mb-8">
                {lastUpdatedLabel} ·{" "}
                {t("events.sourcesVerified") || "Official sources verified"}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="silk-button" asChild>
                  <a
                    href={buildGenericWhatsAppUrl(language)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t("events.bookTransfer") || "Get a Ride Quote"}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/blog")}
                  className="button-outline-gold"
                >
                  {t("events.readGuides") || "Read Travel Guides"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-6 md:py-8 bg-white">
          <div className="container mx-auto px-4">
            <TrustSignals />
          </div>
        </section>

        {/* This Week Section */}
        <section className="section-padding bg-gradient-to-b from-white via-champagne/30 to-cream">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
                {t("events.comingSoon") || "Coming Soon"}
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">
                {t("events.thisWeek") || "This Week in Paris"}
              </h2>
            </div>
            <EventsFeed range="week" variant="full" showHeader={false} />
          </div>
        </section>

        {/* This Month Section */}
        <section className="section-padding bg-gradient-to-b from-cream via-champagne/50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
                {t("events.planAhead") || "Plan Ahead"}
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">
                {t("events.thisMonth") || "This Month in Paris"}
              </h2>
            </div>
            <EventsFeed range="month" variant="full" showHeader={false} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-b from-white to-champagne/30">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
                {t("events.ctaTitle") || "Need a Ride to Your Event?"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("events.ctaDescription") ||
                  "Tell us your event and we'll confirm availability, vehicle options and a fixed price."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="silk-button" asChild>
                  <a
                    href={buildGenericWhatsAppUrl(language)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t("events.ctaWhatsApp") || "Get a Quote on WhatsApp"}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="button-outline-gold"
                  asChild
                >
                  <a href={buildGenericEmailUrl(language)}>
                    <Mail className="w-5 h-5 mr-2" />
                    {t("events.ctaEmail") || "Email Us"}
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
