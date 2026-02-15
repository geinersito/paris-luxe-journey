import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export default function CompaniesPage() {
  const { t } = useLanguage();

  const bullets = [
    t.companies.bullets.billing,
    t.companies.bullets.routes,
    t.companies.bullets.chauffeurs,
    t.companies.bullets.support,
  ];

  return (
    <>
      <Helmet>
        <title>{t.companies.metaTitle}</title>
        <meta name="description" content={t.companies.intro} />
      </Helmet>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
              {t.companies.h1}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
              {t.companies.intro}
            </p>

            <ul className="space-y-3 mb-6">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <span className="text-foreground">{bullet}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-muted-foreground mb-6">
              {t.companies.contactHint}
            </p>

            <Button asChild className="silk-button">
              <Link to="/contact">{t.companies.cta}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
