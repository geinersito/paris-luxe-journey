import { Users, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVehicles } from "@/hooks/useVehicles";
import { buildGenericWhatsAppUrl } from "@/lib/eventsPrefill";
import type { Language } from "@/types/i18n";

const LOCAL_SEDAN_EXT =
  "/images/library/fleet/mercedes-sclass-maybach-paris-prestige-sedan-1200x800.jpg";
const LOCAL_VAN_EXT =
  "/images/library/fleet/mercedes-vclass-paris-luxury-exterior-1200x800.jpg";
const GROUP_IMAGE =
  "/images/library/fleet/mercedes-sprinter-paris-groups-exterior-01.jpg";
const VIP_IMAGE =
  "/images/library/fleet/mercedes-gclass-paris-vip-exterior-01.jpg";

type FleetCard = {
  id: string;
  title: string;
  capacity: string;
  luggage: string;
  summary: string;
  examples?: string;
  ctaLabel: string;
  imageUrl?: string;
};

const FLEET_COPY: Record<
  Language,
  {
    title: string;
    cards: {
      sedan: Omit<FleetCard, "imageUrl" | "examples">;
      van: Omit<FleetCard, "imageUrl" | "examples">;
      groups: FleetCard;
      vip: FleetCard;
    };
  }
> = {
  en: {
    title: "Choose fleet by capacity and service level",
    cards: {
      sedan: {
        id: "sedan",
        title: "Premium Sedan",
        capacity: "1–3 passengers",
        luggage: "2 suitcases",
        summary: "Airport transfers, business trips and couples.",
        ctaLabel: "Request your transfer",
      },
      van: {
        id: "van",
        title: "Premium Van",
        capacity: "1–7 passengers",
        luggage: "Up to 7 suitcases",
        summary: "Families, Disneyland, excursions and luggage-heavy arrivals.",
        ctaLabel: "Request your transfer",
      },
      groups: {
        id: "groups",
        title: "Groups & minibus · Personalized service",
        capacity: "8–19+ passengers",
        luggage: "According to group size",
        summary: "For large families, events, seminars and private excursions.",
        imageUrl: GROUP_IMAGE,
        ctaLabel: "Request a group quote",
      },
      vip: {
        id: "vip",
        title: "Prestige / VIP · Exclusive service",
        capacity: "Executive service",
        luggage: "Premium models",
        summary:
          "Executive arrivals, luxury shopping, protocol, 5-star hotels and events.",
        imageUrl: VIP_IMAGE,
        ctaLabel: "Request a VIP quote",
      },
    },
  },
  fr: {
    title: "Choisissez votre flotte selon capacité et niveau de service",
    cards: {
      sedan: {
        id: "sedan",
        title: "Berline Premium",
        capacity: "1–3 passagers",
        luggage: "2 valises",
        summary: "Transferts aéroport, déplacements business et couples.",
        ctaLabel: "Demander votre transfert",
      },
      van: {
        id: "van",
        title: "Van Premium",
        capacity: "1–7 passagers",
        luggage: "Jusqu'à 7 valises",
        summary:
          "Familles, Disneyland, excursions et arrivées avec beaucoup de bagages.",
        ctaLabel: "Demander votre transfert",
      },
      groups: {
        id: "groups",
        title: "Groupes et minibus · Service personnalisé",
        capacity: "8–19+ passagers",
        luggage: "Selon le groupe",
        summary:
          "Pour familles nombreuses, événements, séminaires et excursions privées.",
        imageUrl: GROUP_IMAGE,
        ctaLabel: "Demander un devis groupe",
      },
      vip: {
        id: "vip",
        title: "Prestige / VIP · Service exclusif",
        capacity: "Service executive",
        luggage: "Modèles premium",
        summary:
          "Arrivées executive, shopping de luxe, protocole, hôtels 5 étoiles et événements.",
        imageUrl: VIP_IMAGE,
        ctaLabel: "Demander un devis VIP",
      },
    },
  },
  es: {
    title: "Elige la flota según capacidad y nivel de servicio",
    cards: {
      sedan: {
        id: "sedan",
        title: "Berline Premium",
        capacity: "1–3 pasajeros",
        luggage: "2 maletas",
        summary: "Traslados al aeropuerto, viajes de negocios y parejas.",
        ctaLabel: "Solicitar traslado",
      },
      van: {
        id: "van",
        title: "Van Premium",
        capacity: "1–7 pasajeros",
        luggage: "Hasta 7 maletas",
        summary:
          "Familias, Disneyland, excursiones y llegadas con mucho equipaje.",
        ctaLabel: "Solicitar traslado",
      },
      groups: {
        id: "groups",
        title: "Grupos y minibús · Servicio personalizado",
        capacity: "8–19+ pasajeros",
        luggage: "Según el grupo",
        summary:
          "Para familias numerosas, eventos, seminarios y excursiones privadas.",
        imageUrl: GROUP_IMAGE,
        ctaLabel: "Solicitar cotización para grupo",
      },
      vip: {
        id: "vip",
        title: "Prestige / VIP · Servicio exclusivo",
        capacity: "Servicio ejecutivo",
        luggage: "Modelos premium",
        summary:
          "Llegadas ejecutivas, compras de lujo, protocolo, hoteles 5 estrellas y eventos.",
        imageUrl: VIP_IMAGE,
        ctaLabel: "Solicitar cotización VIP",
      },
    },
  },
  pt: {
    title: "Escolha a frota por capacidade e nível de serviço",
    cards: {
      sedan: {
        id: "sedan",
        title: "Berline Premium",
        capacity: "1–3 passageiros",
        luggage: "2 malas",
        summary: "Transfers de aeroporto, viagens executivas e casais.",
        ctaLabel: "Solicitar transfer",
      },
      van: {
        id: "van",
        title: "Van Premium",
        capacity: "1–7 passageiros",
        luggage: "Até 7 malas",
        summary:
          "Famílias, Disneyland, excursões e chegadas com muita bagagem.",
        ctaLabel: "Solicitar transfer",
      },
      groups: {
        id: "groups",
        title: "Grupos e micro-ônibus · Serviço personalizado",
        capacity: "8–19+ passageiros",
        luggage: "Conforme o grupo",
        summary:
          "Para famílias grandes, eventos, seminários e excursões privadas.",
        imageUrl: GROUP_IMAGE,
        ctaLabel: "Solicitar cotação para grupo",
      },
      vip: {
        id: "vip",
        title: "Prestige / VIP · Serviço exclusivo",
        capacity: "Serviço executivo",
        luggage: "Modelos premium",
        summary:
          "Chegadas executivas, compras de luxo, protocolo, hotéis 5 estrelas e eventos.",
        imageUrl: VIP_IMAGE,
        ctaLabel: "Solicitar cotação VIP",
      },
    },
  },
};

export default function FleetSection() {
  const { t, language } = useLanguage();
  const { data: vehicles } = useVehicles();

  const handleBookNow = () => {
    window.open(buildGenericWhatsAppUrl(language), "_blank");
  };

  const copy = FLEET_COPY[language];
  const sedanVehicle = vehicles?.find(
    (v) => v.type?.toLowerCase() === "berline",
  );
  const vanVehicle = vehicles?.find((v) => v.type?.toLowerCase() === "van");

  const mainCards: FleetCard[] = [
    {
      ...copy.cards.sedan,
      imageUrl: LOCAL_SEDAN_EXT,
      examples: sedanVehicle
        ? `${sedanVehicle.name} or equivalent`
        : "Mercedes Classe S, Tesla Model Y or equivalent",
    },
    {
      ...copy.cards.van,
      imageUrl: LOCAL_VAN_EXT,
      examples: vanVehicle
        ? `${vanVehicle.name} or equivalent`
        : "Mercedes V-Class, EQV or equivalent",
    },
  ];

  const onRequestCards: FleetCard[] = [copy.cards.groups, copy.cards.vip];

  return (
    <section
      id="fleet"
      className="bg-ref-bg py-16 md:py-24 border-b border-ref-ink/8"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.3em] text-ref-ink/40 mb-4">
            {t.fleet.label}
          </p>
          <h2 className="font-editorial font-light text-3xl md:text-4xl text-ref-ink">
            {copy.title}
          </h2>
        </div>

        {/* Main vehicles — alternating editorial 60/40 */}
        <div>
          {mainCards.map((card, index) => (
            <div
              key={card.id}
              className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center py-12 md:py-16 border-t border-ref-ink/8 first:border-t-0"
            >
              <div
                className={`lg:col-span-7 aspect-[4/3] overflow-hidden bg-white ${
                  index % 2 !== 0 ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div
                className={`lg:col-span-5 ${index % 2 !== 0 ? "lg:order-1" : ""}`}
              >
                <h3 className="font-editorial font-light text-2xl md:text-3xl text-ref-ink mb-4">
                  {card.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 font-ui text-sm text-ref-ink/50 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    {card.capacity}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 shrink-0" />
                    {card.luggage}
                  </span>
                </div>
                {card.examples && (
                  <p className="font-ui text-xs text-ref-ink/35 mb-4">
                    {card.examples}
                  </p>
                )}
                <p className="font-ui text-sm text-ref-ink/60 leading-relaxed mb-6">
                  {card.summary}
                </p>
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-ref-navy border-b border-ref-navy/40 pb-0.5 hover:border-ref-navy transition-colors"
                >
                  {card.ctaLabel} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* On-request — 2-col */}
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ref-ink/8 border-t border-ref-ink/8">
          {onRequestCards.map((card) => (
            <div
              key={card.id}
              className="py-10 md:py-12 md:px-10 first:md:pl-0 last:md:pr-0"
            >
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-ref-ink/40 mb-3">
                On request
              </p>
              <h3 className="font-editorial font-light text-2xl text-ref-ink mb-3">
                {card.title}
              </h3>
              <div className="flex items-center gap-1.5 font-ui text-sm text-ref-ink/50 mb-4">
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span>{card.capacity}</span>
              </div>
              <p className="font-ui text-sm text-ref-ink/60 leading-relaxed mb-6">
                {card.summary}
              </p>
              <button
                type="button"
                onClick={handleBookNow}
                className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-ref-navy border-b border-ref-navy/40 pb-0.5 hover:border-ref-navy transition-colors"
              >
                {card.ctaLabel} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
