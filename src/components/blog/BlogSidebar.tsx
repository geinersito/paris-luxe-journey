import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildBlogWhatsAppUrl, WHATSAPP_NUMBER } from "@/lib/eventsPrefill";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plane,
  TrendingUp,
  MessageCircle,
  ArrowRight,
  MapPin,
  Euro,
  Map,
} from "lucide-react";

interface PopularRoute {
  from: string;
  to: string;
  price: number;
  href: string;
}

interface BlogSidebarProps {
  showExcursions?: boolean;
}

export default function BlogSidebar({
  showExcursions = false,
}: BlogSidebarProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const popularRoutes: PopularRoute[] = [
    {
      from: "CDG Airport",
      to: "Paris Center",
      price: 85,
      href: "/airports/cdg",
    },
    {
      from: "Orly Airport",
      to: "Paris Center",
      price: 70,
      href: "/airports/orly",
    },
    {
      from: "CDG Airport",
      to: "Disneyland",
      price: 105,
      href: "/airports/cdg",
    },
    {
      from: "Paris Center",
      to: "Versailles",
      price: 85,
      href: "/excursions/versailles",
    },
  ];

  const handleQuickQuote = () => {
    window.open(buildBlogWhatsAppUrl(i18n.language), "_blank");
  };

  const handleWhatsApp = () => {
    const waText = showExcursions ? t("blog.sidebar.waTextAirport") : null;
    const waUrl = waText
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`
      : buildBlogWhatsAppUrl(i18n.language);
    window.open(waUrl, "_blank");
  };

  return (
    <aside className="space-y-6">
      {/* Quick Quote Card */}
      <Card className="border border-ref-ink/20">
        <CardHeader className="bg-ref-bg">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plane className="w-5 h-5 text-ref-navy" />
            {t("blog.sidebar.quickQuote") || "Quick Quote"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-4">
            {t("blog.sidebar.quickQuoteDesc") ||
              "Get an instant price for your transfer"}
          </p>
          <button
            onClick={handleQuickQuote}
            className="w-full inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-4 py-3 bg-ref-navy text-white hover:bg-ref-ink transition-colors mb-3"
          >
            <Euro className="w-4 h-4" />
            {t("blog.sidebar.calculatePrice") || "Calculate Price"}
          </button>
          <button
            onClick={handleWhatsApp}
            className="w-full inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-4 py-3 border border-ref-ink/20 text-ref-ink bg-white hover:border-ref-navy/30 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {t("blog.sidebar.whatsapp") || "WhatsApp Quote"}
          </button>
        </CardContent>
      </Card>

      {/* Excursion Module — transport/airport context */}
      {showExcursions && (
        <Card className="border border-amber-200/70 bg-gradient-to-br from-amber-50/60 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Map className="w-5 h-5 text-ref-navy" />
              {t("blog.excursionUpsell.heading") || "Add an excursion"}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {t("blog.excursionUpsell.subheading") ||
                "Same private chauffeur — your schedule"}
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-2 mb-4">
              {[
                {
                  label:
                    t("blog.excursionUpsell.versailles") ||
                    "Versailles — 45 km",
                  href: "/excursions/versailles",
                },
                {
                  label:
                    t("blog.excursionUpsell.champagne") || "Champagne — 145 km",
                  href: "/excursions/champagne",
                },
                {
                  label:
                    t("blog.excursionUpsell.loireValley") ||
                    "Loire Valley — 200 km",
                  href: "/excursions/loire-valley",
                },
              ].map((exc) => (
                <Link
                  key={exc.href}
                  to={exc.href}
                  className="flex items-center gap-2 p-2 rounded-lg border border-amber-200/60 bg-white/70 text-sm text-foreground hover:border-ref-navy/20 hover:bg-ref-bg transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-ref-navy flex-shrink-0" />
                  {exc.label}
                </Link>
              ))}
            </div>
            <Link
              to="/excursions"
              className="w-full text-xs text-ref-navy font-medium hover:underline text-center block"
            >
              {t("blog.excursionUpsell.cta") || "See all excursions →"}
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Popular Routes Card */}
      <Card className="border border-ref-ink/20">
        <CardHeader className="bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-secondary" />
            {t("blog.sidebar.popularRoutes") || "Popular Routes"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {popularRoutes.map((route, index) => (
              <button
                key={index}
                onClick={() => navigate(route.href)}
                onMouseEnter={() =>
                  setSelectedRoute(`${route.from}-${route.to}`)
                }
                onMouseLeave={() => setSelectedRoute(null)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  selectedRoute === `${route.from}-${route.to}`
                    ? "border-ref-navy bg-ref-navy/5 shadow-md"
                    : "border-border hover:border-ref-ink/30 hover:bg-ref-bg"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-3 h-3 text-ref-navy flex-shrink-0" />
                      <span className="text-xs font-medium text-muted-foreground truncate">
                        {route.from}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs text-muted-foreground truncate">
                        {route.to}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center bg-ref-navy text-white text-xs font-semibold px-2 py-0.5 flex-shrink-0">
                    €{route.price}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            {t("blog.sidebar.fixedPrices") || "Fixed prices • No hidden fees"}
          </p>
        </CardContent>
      </Card>

      {/* Trust Badges */}
      <Card className="border border-ref-ink/20 bg-white">
        <CardContent className="pt-6">
          <div className="space-y-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                {t("blog.sidebar.available247") || "Available 24/7"}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              ✓ {t("blog.sidebar.flightTracking") || "Flight tracking included"}
              <br />✓{" "}
              {t("blog.sidebar.freeCancellation") || "Free cancellation 24h"}
              <br />✓ {t("blog.sidebar.premiumVehicles") || "Premium vehicles"}
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
