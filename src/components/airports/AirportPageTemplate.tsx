import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Plane, ChevronDown, ArrowRight, Euro } from "lucide-react";
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
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  heroImage: string;
  heroImageAlt: string;
  badge: string;
  premiumLabel: string;
  h1: string;
  h1Sub: string;
  heroDescription: string;
  trustBadges: AirportTrustBadge[];
  ctaLabel: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  stats: AirportStat[];
  sedanFrom: number;
  vanFrom: number;
  pricingTitle: string;
  whyTitle: string;
  whySub: string;
  benefits: AirportBenefit[];
  faqs: AirportFAQ[];
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
    <div className={`border border-ref-ink/8 overflow-hidden ${open ? "border-ref-navy/20" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-ref-ink/5 transition-colors"
        aria-expanded={open}
      >
        <span className="font-ui font-semibold text-sm text-ref-ink pr-4">{faq.q}</span>
        <ChevronDown
          className={`h-4 w-4 text-ref-navy shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 py-4 font-ui text-sm text-ref-ink/60 leading-relaxed">
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
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-ref-bg">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={`${siteOrigin}/og-image.png`} />
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
        <div className="absolute inset-0 bg-ref-ink/70" />

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 mb-6 border border-white/20">
              <Plane className="w-4 h-4 text-white/70" />
              <span className="font-ui text-sm font-medium">{badge}</span>
            </div>

            <p className="font-ui text-sm text-white/60 mb-4">{premiumLabel}</p>

            <h1 className="font-editorial font-light text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              {h1}
              <span className="block text-white/70 mt-2 text-2xl md:text-3xl font-ui font-normal">
                {h1Sub}
              </span>
            </h1>

            <p className="font-ui text-base text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              {heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-8 py-4 bg-white text-ref-navy hover:bg-ref-bg transition-colors"
              >
                {ctaLabel}
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {trustBadges.map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 border border-white/10"
                >
                  <div className="text-white/70">{b.icon}</div>
                  <span className="font-ui text-sm font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-ref-bg border-b border-ref-ink/8">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="font-editorial font-light text-2xl md:text-3xl text-ref-ink mb-6">
            {aboutTitle}
          </h2>
          <div className="space-y-4 font-ui text-sm text-ref-ink/60 leading-relaxed mb-8">
            {aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-ref-ink/8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-editorial font-light text-2xl text-ref-navy mb-1">
                  {s.value}
                </div>
                <div className="font-ui text-xs text-ref-ink/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 border-b border-ref-ink/8">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="font-editorial font-light text-2xl md:text-3xl text-ref-ink text-center mb-2">
            {pricingTitle}
          </h2>
          <p className="font-ui text-xs text-ref-ink/40 text-center mb-8">
            Indicative prices — final price confirmed at booking, no hidden fees.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="border border-ref-ink/8 bg-white p-6 text-center">
              <Euro className="h-5 w-5 text-ref-navy mx-auto mb-4" />
              <div className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-ref-ink/40 mb-1">
                Sedan — 1–3 passengers
              </div>
              <div className="font-editorial font-light text-4xl text-ref-ink mb-1">
                from €{sedanFrom}
              </div>
              <div className="font-ui text-xs text-ref-ink/40">
                Mercedes E-Class or equivalent
              </div>
            </div>
            <div className="border border-ref-ink/8 bg-white p-6 text-center">
              <Euro className="h-5 w-5 text-ref-navy mx-auto mb-4" />
              <div className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-ref-ink/40 mb-1">
                Van — 4–7 passengers
              </div>
              <div className="font-editorial font-light text-4xl text-ref-ink mb-1">
                from €{vanFrom}
              </div>
              <div className="font-ui text-xs text-ref-ink/40">
                Mercedes V-Class or equivalent
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 font-ui font-semibold text-sm px-6 py-3 bg-ref-navy text-white hover:bg-ref-ink transition-colors"
            >
              Request exact quote
            </Link>
            <p className="mt-3 font-ui text-xs text-ref-ink/40">
              Meet &amp; Greet · Flight tracking · 1 luggage/pax · All taxes included
            </p>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-ref-bg border-b border-ref-ink/8">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="font-editorial font-light text-3xl md:text-4xl text-ref-ink mb-4">
              {whyTitle}
            </h2>
            <p className="font-ui text-sm text-ref-ink/60 max-w-2xl leading-relaxed">
              {whySub}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="border border-ref-ink/8 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-ref-navy/8 flex items-center justify-center text-ref-navy">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="font-ui font-semibold text-sm text-ref-ink mb-2">
                      {b.title}
                    </h3>
                    <p className="font-ui text-sm text-ref-ink/60 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 font-ui font-semibold text-sm px-6 py-3 bg-ref-navy text-white hover:bg-ref-ink transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-b border-ref-ink/8">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h2 className="font-editorial font-light text-2xl md:text-3xl text-ref-ink text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-2">
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
      <section className="py-10 bg-ref-bg">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-ref-ink/40 text-center mb-6">
            Other Airport Transfers
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedAirports.map((r, i) => (
              <Link
                key={i}
                to={r.path}
                className="inline-flex items-center gap-2 border border-ref-ink/15 px-5 py-2 font-ui text-sm text-ref-ink/70 hover:text-ref-ink hover:bg-ref-ink/5 transition-colors"
              >
                <Plane className="h-3.5 w-3.5" />
                {r.name}
                <span className="text-ref-ink/40 text-xs">from {r.fromPrice}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 font-ui font-semibold text-sm px-5 py-2 bg-ref-navy text-white hover:bg-ref-ink transition-colors"
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
