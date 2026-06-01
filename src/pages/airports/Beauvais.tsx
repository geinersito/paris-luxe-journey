import {
  Plane,
  Clock,
  Shield,
  MapPin,
  CheckCircle,
  Star,
  Luggage,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { airportsTranslations } from "@/i18n/airports";
import AirportPageTemplate, {
  AirportPageTemplateProps,
} from "@/components/airports/AirportPageTemplate";

const BEAUVAIS_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80";

const BVA_FAQS = [
  {
    q: "How much does a transfer from Beauvais Airport to Paris cost?",
    a: "Indicative prices start from €130 for a sedan (1–3 passengers) to Paris city centre. Van transfers for 4–7 passengers start from €170. Final price confirmed at booking.",
  },
  {
    q: "How long does the transfer from Beauvais to Paris take?",
    a: "60–75 minutes direct, compared to 90+ minutes on the official shuttle bus with multiple stops. We drive you door-to-door with no intermediate stops.",
  },
  {
    q: "Is a private transfer from Beauvais worth it vs the shuttle?",
    a: "For door-to-door service, yes. The shuttle drops you at Porte Maillot (not your hotel), runs on fixed schedules, and takes 90+ minutes. A private transfer goes directly to your Paris address at your departure time.",
  },
  {
    q: "Does Beauvais Airport have a taxi rank?",
    a: "Official taxis are limited at Beauvais and can be expensive. Booking a private transfer in advance guarantees your price and ensures a driver is waiting for you on arrival.",
  },
  {
    q: "Can you pick me up early in the morning for a Ryanair flight from Beauvais?",
    a: "Yes. We operate 24/7 including early morning pickups. Beauvais often has early departures — book your transfer at least 48 hours in advance to guarantee availability.",
  },
];

export default function BeauvaisAirport() {
  const { language } = useLanguage();
  const bva =
    airportsTranslations[language]?.beauvais ??
    airportsTranslations.en.beauvais;

  const props: AirportPageTemplateProps = {
    seoTitle:
      "Beauvais Airport Transfer to Paris — Direct Private Chauffeur | Paris Elite Services",
    seoDescription:
      "Private chauffeur transfer from Beauvais-Tillé Airport (BVA) to Paris. Fixed prices from €130. Direct 60–75 min drive, no shuttle needed. Book online.",
    canonicalPath: "/airports/beauvais",

    heroImage: BEAUVAIS_IMAGE,
    heroImageAlt:
      "Beauvais Tillé Airport — Paris Elite private transfer to Paris",
    badge: bva.badge,
    premiumLabel: bva.premiumBadge ?? "Premium Airport Transfer",
    h1: bva.title,
    h1Sub: bva.subtitle,
    heroDescription: bva.description,
    ctaLabel: "Request a quote",
    trustBadges: [
      { icon: <Clock className="w-6 h-6" />, label: "Direct Transfer" },
      {
        icon: <Shield className="w-6 h-6" />,
        label: bva.trustBadges.meetGreet,
      },
      {
        icon: <Luggage className="w-6 h-6" />,
        label: bva.trustBadges.luggageIncluded,
      },
      {
        icon: <CheckCircle className="w-6 h-6" />,
        label: bva.trustBadges.available247,
      },
    ],

    aboutTitle: bva.about.title,
    aboutParagraphs: [
      bva.about.paragraph1,
      bva.about.paragraph2,
      bva.about.paragraph3,
    ],
    stats: [
      { value: "85 km", label: "From Paris Center" },
      { value: "4M+", label: "Passengers/Year" },
      { value: "60–75 min", label: "Direct Transfer" },
      { value: "24/7", label: "Available" },
    ],

    sedanFrom: 130,
    vanFrom: 170,
    pricingTitle: "Beauvais Airport Transfer Prices",

    whyTitle: "Why Choose Paris Elite for Beauvais Transfers?",
    whySub:
      "Skip the shuttle bus — direct transfer to your Paris hotel in 60–75 minutes",
    benefits: [
      {
        icon: <Clock className="w-8 h-8" />,
        title: "Faster Than the Shuttle",
        desc: "Direct transfer in 60–75 min vs 90+ min on the shuttle bus with multiple stops.",
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: "Door-to-Door",
        desc: "We drive you directly to your Paris hotel or address. No drop-off at Porte Maillot.",
      },
      {
        icon: <Luggage className="w-8 h-8" />,
        title: "Luggage Included",
        desc: "1 large suitcase per passenger included. Help with extra bags always available.",
      },
      {
        icon: <MapPin className="w-8 h-8" />,
        title: "Any Paris Destination",
        desc: "Any address in Paris, Île-de-France, CDG or Orly airports, Disneyland.",
      },
      {
        icon: <Star className="w-8 h-8" />,
        title: "Premium Vehicles",
        desc: "Mercedes E-Class, S-Class, and luxury vans for groups up to 7 passengers.",
      },
      {
        icon: <CheckCircle className="w-8 h-8" />,
        title: "Fixed Price",
        desc: "Price confirmed at booking. No meter, no surprises even with traffic or delays.",
      },
    ],

    faqs: BVA_FAQS,

    relatedAirports: [
      { name: "CDG Airport", path: "/airports/cdg", fromPrice: "€70" },
      { name: "Orly Airport (ORY)", path: "/airports/orly", fromPrice: "€60" },
    ],
  };

  return <AirportPageTemplate {...props} />;
}
