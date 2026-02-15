import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export default function AgenciesPage() {
  const { t } = useLanguage();

  const bullets = [
    t.agencies.bullets.volume,
    t.agencies.bullets.invoicing,
    t.agencies.bullets.support,
    t.agencies.bullets.availability,
  ];

  return (
    <>
      <Helmet>
        <title>{t.agencies.metaTitle}</title>
        <meta name="description" content={t.agencies.intro} />
      </Helmet>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
              {t.agencies.h1}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
              {t.agencies.intro}
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
              {t.agencies.contactHint}
            </p>

            <Button asChild className="silk-button">
              <Link
                to="/contact"
                onClick={() =>
                  trackEvent("cta_click", {
                    page: "/agencias",
                    cta_id: "b2b_agencies_primary",
                    cta_label: t.agencies.cta,
                    destination: "/contact",
                  })
                }
              >
                {t.agencies.cta}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
