import { Plane, Clock, Shield, MapPin, CheckCircle, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { airportsTranslations } from "@/i18n/airports";
import AirportPageTemplate, {
  AirportPageTemplateProps,
} from "@/components/airports/AirportPageTemplate";

const ORLY_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80";

const ORY_FAQS = [
  {
    q: "How much does a transfer from Orly Airport to Paris cost?",
    a: "Indicative prices start from €60 for a sedan (1–3 passengers) to Paris city centre. Van transfers for 4–7 passengers start from €95. Final price confirmed at booking.",
  },
  {
    q: "How far is Orly Airport from Paris?",
    a: "Orly is 13 kilometres south of Paris city centre — the closest major airport to Paris. Transfer time is typically 25–40 minutes, significantly less than from CDG.",
  },
  {
    q: "Which Orly terminals do you serve?",
    a: "All Orly terminals: Orly 1, Orly 2, Orly 3 (Orly Ouest) and Orly 4 (Orly Sud). Your driver will meet you at the arrivals exit of your terminal.",
  },
  {
    q: "Is a private transfer better than the Orlyval or bus from Orly?",
    a: "For door-to-door travel with luggage, yes. A private transfer takes you directly to your hotel or address without train connections, ticket machines, or long walks with bags.",
  },
  {
    q: "Does the driver wait if my flight is delayed?",
    a: "Yes. We monitor your flight in real-time and adjust pickup time at no extra cost.",
  },
];

export default function OrlyAirport() {
  const { language } = useLanguage();
  const ory =
    airportsTranslations[language]?.orly ?? airportsTranslations.en.orly;

  const props: AirportPageTemplateProps = {
    seoTitle:
      "Orly Airport Transfer to Paris — Private Chauffeur | Paris Elite Services",
    seoDescription:
      "Private chauffeur transfer from Paris Orly Airport (ORY) to anywhere in Paris. Fixed prices from €60. Meet & Greet, flight tracking, all terminals. Book online.",
    canonicalPath: "/airports/orly",

    heroImage: ORLY_IMAGE,
    heroImageAlt: "Paris Orly Airport — Paris Elite private chauffeur transfer",
    badge: ory.badge,
    premiumLabel: ory.premiumBadge ?? "Premium Airport Transfer",
    h1: ory.title,
    h1Sub: ory.subtitle,
    heroDescription: ory.description,
    ctaLabel: "Request a quote",
    trustBadges: [
      {
        icon: <Clock className="w-6 h-6" />,
        label: ory.trustBadges.flightTracking,
      },
      {
        icon: <Shield className="w-6 h-6" />,
        label: ory.trustBadges.meetGreet,
      },
      { icon: <MapPin className="w-6 h-6" />, label: "All Terminals" },
      {
        icon: <CheckCircle className="w-6 h-6" />,
        label: ory.trustBadges.available247,
      },
    ],

    aboutTitle: ory.about.title,
    aboutParagraphs: [
      ory.about.paragraph1,
      ory.about.paragraph2,
      ory.about.paragraph3,
    ],
    stats: [
      { value: "13 km", label: "From Paris Center" },
      { value: "33M+", label: "Passengers/Year" },
      { value: "4", label: "Terminals" },
      { value: "25–40 min", label: "To Paris Center" },
    ],

    sedanFrom: 60,
    vanFrom: 95,
    pricingTitle: "Orly Airport Transfer Prices",

    whyTitle: "Why Choose Paris Elite for Orly Transfers?",
    whySub:
      "Closest major airport to Paris — direct transfers in 25–40 minutes",
    benefits: [
      {
        icon: <Plane className="w-8 h-8" />,
        title: "All Terminals Covered",
        desc: "We serve all Orly terminals: Orly 1, 2, 3 and 4 (Orly Ouest and Orly Sud).",
      },
      {
        icon: <Clock className="w-8 h-8" />,
        title: "Flight Tracking",
        desc: "We monitor your flight in real-time. No extra charge for delays or early arrivals.",
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: "Meet & Greet Service",
        desc: "Your chauffeur waits at the arrivals exit with a name sign, ready to assist with luggage.",
      },
      {
        icon: <MapPin className="w-8 h-8" />,
        title: "Fastest Route to Paris",
        desc: "Direct drive to any Paris address, hotel, or train station in 25–40 minutes.",
      },
      {
        icon: <Star className="w-8 h-8" />,
        title: "Premium Vehicles",
        desc: "Mercedes E-Class, S-Class, and luxury vans for groups up to 7 passengers.",
      },
      {
        icon: <CheckCircle className="w-8 h-8" />,
        title: "Fixed Pricing",
        desc: "Price confirmed at booking. No taxi meter, no surge pricing, no surprises.",
      },
    ],

    faqs: ORY_FAQS,

    relatedAirports: [
      { name: "CDG Airport", path: "/airports/cdg", fromPrice: "€70" },
      {
        name: "Beauvais Airport (BVA)",
        path: "/airports/beauvais",
        fromPrice: "€130",
      },
    ],
  };

  return <AirportPageTemplate {...props} />;
}
