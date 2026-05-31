import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/eventsPrefill";

interface ExcursionUpsellCTAProps {
  airport: "cdg" | "orly" | "beauvais" | null;
}

export default function ExcursionUpsellCTA({
  airport,
}: ExcursionUpsellCTAProps) {
  const { t, i18n } = useTranslation();

  if (!airport) return null;

  const waText = encodeURIComponent(
    t("blog.excursionUpsell.waText") ||
      "Hello, I just read about airport transfers. Could you help me with a private excursion from Paris?",
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  const excursions = [
    {
      label: t("blog.excursionUpsell.versailles") || "Versailles — 45 km",
      href: "/excursions/versailles",
    },
    {
      label: t("blog.excursionUpsell.champagne") || "Champagne — 145 km",
      href: "/excursions/champagne",
    },
    {
      label: t("blog.excursionUpsell.loireValley") || "Loire Valley — 200 km",
      href: "/excursions/loire-valley",
    },
  ];

  return (
    <div className="rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50/70 via-amber-50/30 to-transparent p-6 my-8">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-foreground mb-1">
          {t("blog.excursionUpsell.heading") ||
            "Already sorted your transfer? Add an excursion"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("blog.excursionUpsell.subheading") ||
            "Same private chauffeur — on the day you choose"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {excursions.map((exc) => (
          <Link
            key={exc.href}
            to={exc.href}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-200 bg-white/80 text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            {exc.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link to="/excursions">
            {t("blog.excursionUpsell.cta") || "See all excursions"}
          </Link>
        </Button>
        <Button size="sm" className="flex-1" asChild>
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4 mr-2" />
            {t("blog.excursionUpsell.waButton") || "Ask via WhatsApp"}
          </a>
        </Button>
      </div>
    </div>
  );
}
