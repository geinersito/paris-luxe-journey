import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { excursions } from "@/data/excursions";
import { versaillesGuideContent } from "@/data/excursions/versailles-guide";
import { champagneGuideContent } from "@/data/excursions/champagne-guide";
import { loireGuideContent } from "@/data/excursions/loire-guide";
import type { Language } from "@/types/i18n";

const FEATURED_IDS = ["versailles-palace", "champagne", "loire-valley"];

export default function HomeExcursionsSection() {
  const { t, language } = useLanguage();
  const lang = language as Language;

  const guideLocale: Record<string, { title: string; intro: string }> = {
    "versailles-palace": versaillesGuideContent[lang],
    champagne: champagneGuideContent[lang],
    "loire-valley": loireGuideContent[lang],
  };

  const featured = FEATURED_IDS.map((id) =>
    excursions.find((e) => e.id === id),
  ).filter(Boolean) as (typeof excursions)[number][];

  return (
    <section className="section-padding bg-gradient-to-b from-champagne/30 via-white to-cream">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <p className="font-accent italic text-xl text-primary mb-2">
            Île-de-France
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">
            {t.home.excursions.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((excursion) => (
            <div
              key={excursion.id}
              className="bg-white rounded-2xl border border-primary/20 overflow-hidden shadow-sm hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image with gradient fallback */}
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/15 to-secondary/10">
                <img
                  src={excursion.image}
                  alt={excursion.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-secondary text-lg mb-2">
                  {guideLocale[excursion.id]?.title ?? excursion.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
                  {guideLocale[excursion.id]?.intro ?? excursion.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{excursion.duration}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {t.home.excursions.from} €{excursion.price}
                  </span>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full button-outline-gold text-sm"
                >
                  <Link
                    to={excursion.link}
                    className="flex items-center justify-center gap-2"
                  >
                    <span>{t.excursions.viewDetails}</span>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/excursions"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
          >
            {t.home.excursions.seeAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
