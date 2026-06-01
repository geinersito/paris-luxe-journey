import {
  Plane,
  Clock,
  Shield,
  MapPin,
  CheckCircle,
  Star,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { airportsTranslations } from "@/i18n/airports";
import AirportPageTemplate, {
  AirportPageTemplateProps,
} from "@/components/airports/AirportPageTemplate";

const CDG_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80";

const CDG_FAQS = [
  {
    q: "How much does a transfer from CDG to Paris cost?",
    a: "Indicative prices start from €70 for a sedan (1–3 passengers) to Paris city centre. Van transfers for 4–7 passengers start from €110. Final price is confirmed at booking with no hidden fees.",
  },
  {
    q: "Does my driver wait if my flight is delayed?",
    a: "Yes. We track your flight in real-time and adjust the pickup time automatically. No extra charge for delays or early arrivals.",
  },
  {
    q: "Which CDG terminals do you serve?",
    a: "All terminals: T1, T2A, T2B, T2C, T2D, T2E, T2F, T2G, and T3. Your driver will meet you at the arrivals hall of your specific terminal.",
  },
  {
    q: "How long does it take to reach Paris from CDG?",
    a: "Approximately 45–60 minutes to Paris city centre depending on traffic and your destination, without the delays of RER trains or taxi queues.",
  },
  {
    q: "What is included in the transfer price?",
    a: "Meet & Greet at arrivals, flight tracking, 1 large suitcase per passenger, all taxes and tolls, up to 60 minutes free waiting time. No surprises.",
  },
];

export default function CDGAirport() {
  const { language } = useLanguage();
  const cdg =
    airportsTranslations[language]?.cdg ?? airportsTranslations.en.cdg;

  const props: AirportPageTemplateProps = {
    seoTitle:
      "CDG Airport Transfer to Paris — Private Chauffeur | Paris Elite Services",
    seoDescription:
      "Book a private chauffeur transfer from Charles de Gaulle Airport (CDG) to Paris. Fixed prices from €70. Meet & Greet, flight tracking, all terminals. Confirm online.",
    canonicalPath: "/airports/cdg",

    heroImage: CDG_IMAGE,
    heroImageAlt:
      "Charles de Gaulle Airport terminal — Paris Elite private transfer",
    badge: cdg.badge,
    premiumLabel: cdg.about?.skytraxBadge
      ? `${cdg.about.skytraxBadge.title} — ${cdg.about.skytraxBadge.year}`
      : "Premium Airport Transfer",
    h1: cdg.title,
    h1Sub: cdg.subtitle,
    heroDescription: cdg.description,
    ctaLabel: "Request a quote",
    trustBadges: [
      {
        icon: <Clock className="w-6 h-6" />,
        label: cdg.trustBadges.flightTracking,
      },
      {
        icon: <Shield className="w-6 h-6" />,
        label: cdg.trustBadges.meetGreet,
      },
      { icon: <MapPin className="w-6 h-6" />, label: "All Terminals" },
      {
        icon: <CheckCircle className="w-6 h-6" />,
        label: cdg.trustBadges.available247,
      },
    ],

    aboutTitle: cdg.about.title,
    aboutParagraphs: [
      cdg.about.paragraph1,
      cdg.about.paragraph2,
      cdg.about.paragraph3,
    ],
    stats: [
      { value: "#1", label: cdg.about.stats?.bestInEurope ?? "Best in Europe" },
      {
        value: "25 km",
        label: cdg.about.stats?.fromParis ?? "From Paris Center",
      },
      {
        value: "76M+",
        label: cdg.about.stats?.passengers ?? "Passengers/Year",
      },
      { value: "320+", label: cdg.about.stats?.destinations ?? "Destinations" },
    ],

    sedanFrom: 70,
    vanFrom: 110,
    pricingTitle: cdg.pricing?.title ?? "CDG Airport Transfer Prices",

    whyTitle: cdg.whyChoose.title,
    whySub: cdg.whyChoose.subtitle,
    benefits: [
      {
        icon: <Plane className="w-8 h-8" />,
        title: cdg.whyChoose.benefits.allTerminals.title,
        desc: cdg.whyChoose.benefits.allTerminals.description,
      },
      {
        icon: <Clock className="w-8 h-8" />,
        title: cdg.whyChoose.benefits.flightTracking.title,
        desc: cdg.whyChoose.benefits.flightTracking.description,
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: cdg.whyChoose.benefits.meetGreet.title,
        desc: cdg.whyChoose.benefits.meetGreet.description,
      },
      {
        icon: <MapPin className="w-8 h-8" />,
        title: cdg.whyChoose.benefits.directRoutes.title,
        desc: cdg.whyChoose.benefits.directRoutes.description,
      },
      {
        icon: <Star className="w-8 h-8" />,
        title: cdg.whyChoose.benefits.premiumVehicles.title,
        desc: cdg.whyChoose.benefits.premiumVehicles.description,
      },
      {
        icon: <Globe className="w-8 h-8" />,
        title: cdg.whyChoose.benefits.fixedPricing.title,
        desc: cdg.whyChoose.benefits.fixedPricing.description,
      },
    ],

    faqs: CDG_FAQS,

    relatedAirports: [
      { name: "Orly Airport (ORY)", path: "/airports/orly", fromPrice: "€60" },
      {
        name: "Beauvais Airport (BVA)",
        path: "/airports/beauvais",
        fromPrice: "€130",
      },
    ],
  };

  return <AirportPageTemplate {...props} />;
}
