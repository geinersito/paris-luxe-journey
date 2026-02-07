import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { EventsFeed } from "@/components/events/EventsFeed";
import { Calendar, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEventRideQuote = () => {
    const message = encodeURIComponent(
      "Hi, I'm interested in booking a ride to an event in Paris. Can you help me with a quote?",
    );
    window.open(`https://wa.me/33668251102?text=${message}`, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>
          {t("events.pageTitle") || "Events in Paris | Paris Luxe Journey"}
        </title>
        <meta
          name="description"
          content={
            t("events.pageDescription") ||
            "Discover the best events, concerts, exhibitions and activities happening in Paris this week and month. Book your luxury transfer to any event."
          }
        />
        <meta
          name="keywords"
          content="Paris events, concerts Paris, exhibitions Paris, Paris activities, events this week Paris, events this month Paris"
        />
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

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={handleEventRideQuote}
                  className="silk-button"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t("events.bookTransfer") || "Get a Ride Quote"}
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
                  "Get a quote for a luxury transfer to any event in Paris. Professional chauffeur, premium vehicles, fixed prices."}
              </p>
              <Button
                size="lg"
                onClick={handleEventRideQuote}
                className="silk-button"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t("events.bookNow") || "Get a Quote"}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
