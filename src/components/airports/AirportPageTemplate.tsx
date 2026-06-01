import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Plane,
  Clock,
  Shield,
  MapPin,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Euro,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSiteOrigin } from "@/lib/seo/site";

export interface AirportBenefit {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface AirportFAQ {
  q: string;
  a: string;
}

export interface AirportStat {
  value: string;
  label: string;
}

export interface AirportTrustBadge {
  icon: React.ReactNode;
  label: string;
}

export interface RelatedAirport {
  name: string;
  path: string;
  fromPrice: string;
}

export interface AirportPageTemplateProps {
  // SEO
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string; // e.g. "/airports/cdg"

  // Hero
  heroImage: string;
  heroImageAlt: string;
  badge: string;
  premiumLabel: string;
  h1: string;
  h1Sub: string;
  heroDescription: string;
  trustBadges: AirportTrustBadge[];
  ctaLabel: string;

  // About
  aboutTitle: string;
  aboutParagraphs: string[];
  stats: AirportStat[];

  // Pricing
  sedanFrom: number;
  vanFrom: number;
  pricingTitle: string;

  // Why choose us
  whyTitle: string;
  whySub: string;
  benefits: AirportBenefit[];

  // FAQ (English only for R1 — JSON-LD is language-neutral)
  faqs: AirportFAQ[];

  // Internal links
  relatedAirports: RelatedAirport[];
}

function FAQItem({
  faq,
  open,
  onToggle,
}: {
  faq: AirportFAQ;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-primary/10 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-primary/5 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-secondary pr-4">{faq.q}</span>
        <ChevronDown
          className={`h-5 w-5 text-primary shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 py-4 bg-primary/5 text-muted-foreground leading-relaxed text-sm">
          {faq.a}
        </div>
      )}
    </div>
  );
}

export default function AirportPageTemplate(props: AirportPageTemplateProps) {
  const {
    seoTitle,
    seoDescription,
    canonicalPath,
    heroImage,
    heroImageAlt,
    badge,
    premiumLabel,
    h1,
    h1Sub,
    heroDescription,
    trustBadges,
    ctaLabel,
    aboutTitle,
    aboutParagraphs,
    stats,
    sedanFrom,
    vanFrom,
    pricingTitle,
    whyTitle,
    whySub,
    benefits,
    faqs,
    relatedAirports,
  } = props;

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const siteOrigin = getSiteOrigin();
  const canonicalUrl = `${siteOrigin}${canonicalPath}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={`${siteOrigin}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center justify-center py-24 overflow-hidden">
        <img
          src={heroImage}
          alt={heroImageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-black/70 to-primary-dark/90" />

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Plane className="w-5 h-5 text-primary-200" />
              <span className="text-sm font-medium">{badge}</span>
            </div>

            <p className="font-accent italic text-xl md:text-2xl text-primary-200 mb-4">
              {premiumLabel}
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              {h1}
              <span className="block text-primary-200 mt-2 text-2xl md:text-3xl">
                {h1Sub}
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              {heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg font-semibold shadow-xl"
              >
                <Link to="/booking">{ctaLabel}</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {trustBadges.map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10"
                >
                  <div className="text-primary-200">{b.icon}</div>
                  <span className="text-sm font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6">
              {aboutTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              {aboutParagraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    i < aboutParagraphs.length - 1
                      ? "mb-4 leading-relaxed"
                      : "leading-relaxed"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-primary/10">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {s.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing "from" strip */}
      <section className="py-12 bg-white border-y border-primary/10">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary text-center mb-2">
            {pricingTitle}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Indicative prices — final price confirmed at booking, no hidden
            fees.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Euro className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm font-semibold uppercase tracking-wide text-primary/70 mb-1">
                Sedan — 1–3 passengers
              </div>
              <div className="text-4xl font-display font-bold text-secondary mb-1">
                from €{sedanFrom}
              </div>
              <div className="text-xs text-muted-foreground">
                Mercedes E-Class or equivalent
              </div>
            </div>
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Euro className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm font-semibold uppercase tracking-wide text-primary/70 mb-1">
                Van — 4–7 passengers
              </div>
              <div className="text-4xl font-display font-bold text-secondary mb-1">
                from €{vanFrom}
              </div>
              <div className="text-xs text-muted-foreground">
                Mercedes V-Class or equivalent
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button asChild className="silk-button">
              <Link to="/booking">Request exact quote</Link>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Meet &amp; Greet · Flight tracking · 1 luggage/pax · All taxes
              included
            </p>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              {whyTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {whySub}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-primary/5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-2">
                      {b.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="silk-button">
              <Link to="/booking">{ctaLabel}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-10 bg-white border-t border-primary/10">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold text-secondary text-center mb-6">
            Other Airport Transfers
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {relatedAirports.map((r, i) => (
              <Link
                key={i}
                to={r.path}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                <Plane className="h-4 w-4" />
                {r.name}
                <span className="text-muted-foreground text-xs">
                  from {r.fromPrice}
                </span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/5 px-5 py-2 text-sm font-medium text-secondary hover:bg-secondary/10 transition-colors"
            >
              Request a quote
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
