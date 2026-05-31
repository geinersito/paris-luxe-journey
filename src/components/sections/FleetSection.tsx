import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Users,
  Briefcase,
  WifiIcon,
  Droplet,
  Wind,
  Sofa,
  SprayCan,
  Crown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVehicles } from "@/hooks/useVehicles";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import type { Language } from "@/types/i18n";

const FEATURE_ICONS = {
  wifi: WifiIcon,
  water: Droplet,
  airConditioning: Wind,
  leatherSeats: Sofa,
  cleaning: SprayCan,
} as const;

const FALLBACK_EXTERIOR =
  "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&q=80";
const FALLBACK_INTERIOR =
  "https://images.unsplash.com/photo-1571607388263-1044f9ea01bc?auto=format&fit=crop&q=80";

const LOCAL_SEDAN_EXT =
  "/images/library/fleet/mercedes-sclass-maybach-paris-prestige-sedan-1200x800.jpg";
const LOCAL_SEDAN_INT =
  "/images/library/fleet/mercedes-sclass-maybach-paris-prestige-card-800x600.jpg";
const LOCAL_VAN_EXT =
  "/images/library/fleet/mercedes-vclass-paris-luxury-exterior-1200x800.jpg";
const LOCAL_VAN_INT =
  "/images/library/fleet/mercedes-vclass-paris-luxury-card-800x600.jpg";

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
  availabilityNote?: string;
  imageUrl: string;
  features: Array<{
    icon: keyof typeof FEATURE_ICONS | "group" | "vip" | "availability";
    label: string;
  }>;
  ctaLabel: string;
};

const EXTRA_ICONS = {
  group: Users,
  vip: Crown,
  availability: ShieldCheck,
} as const;

const FLEET_COPY: Record<
  Language,
  {
    title: string;
    subtitle: string;
    toggleHint: string;
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
    subtitle:
      "Start with passenger count, luggage and trip context. Real vehicle examples remain here as proof, while group and VIP requests stay on request.",
    toggleHint: "Click to switch",
    cards: {
      sedan: {
        id: "sedan",
        title: "Premium Sedan",
        capacity: "1-3 passengers",
        luggage: "2 suitcases",
        summary: "Airport transfers, business trips and couples.",
        features: [
          { icon: "wifi", label: "Quiet, executive cabin" },
          { icon: "water", label: "Best for light luggage" },
          { icon: "airConditioning", label: "Ideal for direct city transfers" },
        ],
        ctaLabel: "Request your transfer",
      },
      van: {
        id: "van",
        title: "Premium Van",
        capacity: "1-7 passengers",
        luggage: "Up to 7 suitcases",
        summary: "Families, Disneyland, excursions and luggage-heavy arrivals.",
        features: [
          { icon: "wifi", label: "Best fit for family logistics" },
          {
            icon: "leatherSeats",
            label: "Flexible space for strollers and bags",
          },
          { icon: "cleaning", label: "Comfortable for longer day trips" },
        ],
        ctaLabel: "Request your transfer",
      },
      groups: {
        id: "groups",
        title: "Groups & minibus · Personalized service",
        capacity: "8-19+ passengers",
        luggage: "According to group size and vehicle configuration",
        summary: "For large families, events, seminars and private excursions.",
        availabilityNote:
          "Arranged according to group size and vehicle configuration.",
        imageUrl: GROUP_IMAGE,
        features: [
          {
            icon: "group",
            label: "Built for group arrivals and event logistics",
          },
          {
            icon: "availability",
            label:
              "Coordinated according to itinerary, passenger count and vehicle configuration.",
          },
          {
            icon: "cleaning",
            label: "Best for seminars, private groups and excursions",
          },
        ],
        ctaLabel: "Request a group quote",
      },
      vip: {
        id: "vip",
        title: "Prestige / VIP · Exclusive service",
        capacity: "Executive service",
        luggage: "Premium models or equivalent",
        summary:
          "Executive arrivals, luxury shopping, protocol, 5-star hotels and events.",
        availabilityNote:
          "Arranged per service profile and vehicle configuration.",
        imageUrl: VIP_IMAGE,
        features: [
          { icon: "vip", label: "Prestige-level presentation and discretion" },
          {
            icon: "sparkles" as never,
            label: "Best fit for protocol and luxury stays",
          },
          {
            icon: "availability",
            label:
              "Premium arrangements confirmed according to service profile and vehicle configuration.",
          },
        ],
        ctaLabel: "Request a VIP quote",
      },
    },
  },
  fr: {
    title: "Choisissez votre flotte selon capacité et niveau de service",
    subtitle:
      "Commencez par le nombre de passagers, les bagages et le contexte du trajet. Les modèles restent visibles comme preuve, tandis que groupes et VIP restent sur demande.",
    toggleHint: "Cliquer pour changer",
    cards: {
      sedan: {
        id: "sedan",
        title: "Berline Premium",
        capacity: "1-3 passagers",
        luggage: "2 valises",
        summary: "Transferts aéroport, déplacements business et couples.",
        features: [
          { icon: "wifi", label: "Cabine calme et executive" },
          { icon: "water", label: "Idéal pour bagages légers" },
          {
            icon: "airConditioning",
            label: "Parfait pour trajets directs en ville",
          },
        ],
        ctaLabel: "Demander votre transfert",
      },
      van: {
        id: "van",
        title: "Van Premium",
        capacity: "1-7 passagers",
        luggage: "Jusqu'à 7 valises",
        summary:
          "Familles, Disneyland, excursions et arrivées avec beaucoup de bagages.",
        features: [
          { icon: "wifi", label: "Meilleur choix pour logistique familiale" },
          {
            icon: "leatherSeats",
            label: "Espace flexible pour poussettes et bagages",
          },
          { icon: "cleaning", label: "Confortable pour longues journées" },
        ],
        ctaLabel: "Demander votre transfert",
      },
      groups: {
        id: "groups",
        title: "Groupes et minibus · Service personnalisé",
        capacity: "8-19+ passagers",
        luggage: "Selon le groupe et la configuration du véhicule",
        summary:
          "Pour familles nombreuses, événements, séminaires et excursions privées.",
        availabilityNote:
          "Coordonné selon le groupe et la configuration du véhicule.",
        imageUrl: GROUP_IMAGE,
        features: [
          {
            icon: "group",
            label: "Pensé pour arrivées de groupe et logistique événementielle",
          },
          {
            icon: "availability",
            label:
              "Coordonné selon l'itinéraire, le nombre de passagers et la configuration du véhicule.",
          },
          {
            icon: "cleaning",
            label: "Adapté aux séminaires, groupes privés et excursions",
          },
        ],
        ctaLabel: "Demander un devis groupe",
      },
      vip: {
        id: "vip",
        title: "Prestige / VIP · Service exclusif",
        capacity: "Service executive",
        luggage: "Modèles premium ou équivalent",
        summary:
          "Arrivées executive, shopping de luxe, protocole, hôtels 5 étoiles et événements.",
        availabilityNote:
          "Selon le profil du service et la configuration du véhicule.",
        imageUrl: VIP_IMAGE,
        features: [
          { icon: "vip", label: "Présentation prestige et discrétion" },
          {
            icon: "sparkles" as never,
            label: "Idéal pour protocole et séjours luxe",
          },
          {
            icon: "availability",
            label:
              "Prestations premium confirmées selon le profil du service et la configuration du véhicule.",
          },
        ],
        ctaLabel: "Demander un devis VIP",
      },
    },
  },
  es: {
    title: "Elige la flota según capacidad y nivel de servicio",
    subtitle:
      "Empieza por el número de pasajeros, equipaje y tipo de servicio. Los vehículos mostrados son ejemplos reales; grupos y VIP se gestionan bajo solicitud.",
    toggleHint: "Haz clic para cambiar",
    cards: {
      sedan: {
        id: "sedan",
        title: "Berline Premium",
        capacity: "1-3 pasajeros",
        luggage: "2 maletas",
        summary: "Traslados al aeropuerto, viajes de negocios y parejas.",
        features: [
          { icon: "wifi", label: "Cabina silenciosa y ejecutiva" },
          { icon: "water", label: "Ideal para equipaje ligero" },
          {
            icon: "airConditioning",
            label: "Perfecto para traslados directos en ciudad",
          },
        ],
        ctaLabel: "Solicitar traslado",
      },
      van: {
        id: "van",
        title: "Van Premium",
        capacity: "1-7 pasajeros",
        luggage: "Hasta 7 maletas",
        summary:
          "Familias, Disneyland, excursiones y llegadas con mucho equipaje.",
        features: [
          { icon: "wifi", label: "Mejor opción para logística familiar" },
          {
            icon: "leatherSeats",
            label: "Espacio flexible para cochecito y maletas",
          },
          {
            icon: "cleaning",
            label: "Cómodo para excursiones de día completo",
          },
        ],
        ctaLabel: "Solicitar traslado",
      },
      groups: {
        id: "groups",
        title: "Grupos y minibús · Servicio personalizado",
        capacity: "8-19+ pasajeros",
        luggage: "Según el grupo y la configuración del vehículo",
        summary:
          "Para familias numerosas, eventos, seminarios y excursiones privadas.",
        availabilityNote:
          "Coordinado según el grupo y la configuración del vehículo.",
        imageUrl: GROUP_IMAGE,
        features: [
          {
            icon: "group",
            label: "Pensado para llegadas de grupo y logística de eventos",
          },
          {
            icon: "availability",
            label:
              "Coordinado según el itinerario, el número de pasajeros y la configuración del vehículo.",
          },
          {
            icon: "cleaning",
            label:
              "Mejor ajuste para seminarios, grupos privados y excursiones",
          },
        ],
        ctaLabel: "Solicitar cotización para grupo",
      },
      vip: {
        id: "vip",
        title: "Prestige / VIP · Servicio exclusivo",
        capacity: "Servicio ejecutivo",
        luggage: "Modelos premium o equivalente",
        summary:
          "Llegadas ejecutivas, compras de lujo, protocolo, hoteles 5 estrellas y eventos.",
        availabilityNote:
          "Según el perfil del servicio y la configuración del vehículo.",
        imageUrl: VIP_IMAGE,
        features: [
          { icon: "vip", label: "Presentación premium y discreción" },
          {
            icon: "sparkles" as never,
            label: "Ideal para protocolo y estancias de lujo",
          },
          {
            icon: "availability",
            label:
              "Servicios premium confirmados según el perfil del servicio y la configuración del vehículo.",
          },
        ],
        ctaLabel: "Solicitar cotización VIP",
      },
    },
  },
  pt: {
    title: "Escolha a frota por capacidade e nível de serviço",
    subtitle:
      "Comece pelo número de passageiros, bagagens e contexto da viagem. Os modelos reais seguem como prova, enquanto grupos e VIP ficam sob consulta.",
    toggleHint: "Clique para alternar",
    cards: {
      sedan: {
        id: "sedan",
        title: "Berline Premium",
        capacity: "1-3 passageiros",
        luggage: "2 malas",
        summary: "Transfers de aeroporto, viagens executivas e casais.",
        features: [
          { icon: "wifi", label: "Cabine silenciosa e executiva" },
          { icon: "water", label: "Ideal para bagagem leve" },
          {
            icon: "airConditioning",
            label: "Perfeito para deslocamentos diretos na cidade",
          },
        ],
        ctaLabel: "Solicitar transfer",
      },
      van: {
        id: "van",
        title: "Van Premium",
        capacity: "1-7 passageiros",
        luggage: "Até 7 malas",
        summary:
          "Famílias, Disneyland, excursões e chegadas com muita bagagem.",
        features: [
          { icon: "wifi", label: "Melhor opção para logística familiar" },
          {
            icon: "leatherSeats",
            label: "Espaço flexível para carrinho e malas",
          },
          {
            icon: "cleaning",
            label: "Confortável para passeios de dia inteiro",
          },
        ],
        ctaLabel: "Solicitar transfer",
      },
      groups: {
        id: "groups",
        title: "Grupos e micro-ônibus · Serviço personalizado",
        capacity: "8-19+ passageiros",
        luggage: "Conforme o grupo e a configuração do veículo",
        summary:
          "Para famílias grandes, eventos, seminários e excursões privadas.",
        availabilityNote:
          "Coordenado conforme o grupo e a configuração do veículo.",
        imageUrl: GROUP_IMAGE,
        features: [
          {
            icon: "group",
            label: "Pensado para chegadas em grupo e logística de eventos",
          },
          {
            icon: "availability",
            label:
              "Coordenado conforme o itinerário, número de passageiros e configuração do veículo.",
          },
          {
            icon: "cleaning",
            label: "Melhor ajuste para seminários, grupos privados e excursões",
          },
        ],
        ctaLabel: "Solicitar cotação para grupo",
      },
      vip: {
        id: "vip",
        title: "Prestige / VIP · Serviço exclusivo",
        capacity: "Serviço executivo",
        luggage: "Modelos premium ou equivalente",
        summary:
          "Chegadas executivas, compras de luxo, protocolo, hotéis 5 estrelas e eventos.",
        availabilityNote:
          "Conforme o perfil do serviço e a configuração do veículo.",
        imageUrl: VIP_IMAGE,
        features: [
          { icon: "vip", label: "Apresentação premium e discrição" },
          {
            icon: "sparkles" as never,
            label: "Ideal para protocolo e estadias de luxo",
          },
          {
            icon: "availability",
            label:
              "Serviços premium confirmados conforme o perfil do serviço e a configuração do veículo.",
          },
        ],
        ctaLabel: "Solicitar cotação VIP",
      },
    },
  },
};

export default function FleetSection() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { data: vehicles, isLoading } = useVehicles();
  const [selectedImageType, setSelectedImageType] = React.useState<
    "exterior" | "interior"
  >("exterior");
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>(
    {},
  );

  const handleImageError = (vehicleId: string) => {
    setImageErrors((prev) => ({ ...prev, [vehicleId]: true }));
  };

  const handleBookNow = () => {
    // Scroll suave al formulario de booking en la página principal
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Si no estamos en la página principal, navegar a ella
      navigate("/#booking");
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  const copy = FLEET_COPY[language];
  const sedanVehicle = vehicles?.find(
    (vehicle) => vehicle.type?.toLowerCase() === "berline",
  );
  const vanVehicle = vehicles?.find(
    (vehicle) => vehicle.type?.toLowerCase() === "van",
  );

  const fitCards: FleetCard[] = [
    {
      ...copy.cards.sedan,
      imageUrl:
        selectedImageType === "exterior" ? LOCAL_SEDAN_EXT : LOCAL_SEDAN_INT,
      examples: sedanVehicle
        ? `${sedanVehicle.name} or equivalent`
        : "Mercedes Classe S, Tesla Model Y or equivalent",
    },
    {
      ...copy.cards.van,
      imageUrl:
        selectedImageType === "exterior" ? LOCAL_VAN_EXT : LOCAL_VAN_INT,
      examples: vanVehicle
        ? `${vanVehicle.name} or equivalent`
        : "Mercedes V-Class, EQV or equivalent",
    },
    copy.cards.groups,
    copy.cards.vip,
  ];

  const resolveFeatureIcon = (icon: FleetCard["features"][number]["icon"]) => {
    if (icon in FEATURE_ICONS) {
      return FEATURE_ICONS[icon as keyof typeof FEATURE_ICONS];
    }
    if (icon in EXTRA_ICONS) {
      return EXTRA_ICONS[icon as keyof typeof EXTRA_ICONS];
    }
    return Sparkles;
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-gradient-to-b from-champagne via-cream to-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-12 w-96 mx-auto mb-6" />
            <Skeleton className="h-6 w-[500px] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="glass-card-premium rounded-2xl overflow-hidden"
              >
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-8">
                  <Skeleton className="h-8 w-3/4 mb-6" />
                  <div className="flex gap-3 mb-6">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                  <div className="space-y-3 mb-8">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="fleet"
      className="section-padding bg-gradient-to-b from-champagne via-cream to-white"
    >
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
            {t.fleet.label}
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6">
            {copy.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {copy.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10">
          <AnimatePresence mode="sync">
            {fitCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="glass-card-premium rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden"
                  onClick={() =>
                    setSelectedImageType(
                      selectedImageType === "exterior"
                        ? "interior"
                        : "exterior",
                    )
                  }
                >
                  <div className="absolute inset-0 flex">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${card.id}-${selectedImageType}`}
                        src={
                          imageErrors[card.id]
                            ? FALLBACK_EXTERIOR
                            : card.imageUrl
                        }
                        alt={`${card.title} - ${selectedImageType}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onError={() => handleImageError(card.id)}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* View labels */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span className="px-4 py-2 text-xs font-semibold rounded-xl backdrop-blur-md bg-white/95 text-primary shadow-lg">
                      {selectedImageType === "exterior"
                        ? t.fleet.exterior
                        : t.fleet.interior}
                    </span>
                    <span className="px-4 py-2 text-xs font-medium rounded-xl backdrop-blur-md bg-white/20 text-white border border-white/30">
                      {copy.toggleHint}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Title */}
                  <h3 className="text-2xl font-display font-bold text-secondary mb-6">
                    {card.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    {card.summary}
                  </p>

                  {/* Capacity badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-gold-subtle rounded-xl">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm font-semibold text-gray-700">
                        {card.capacity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-gold-subtle rounded-xl">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <span className="text-sm font-semibold text-gray-700">
                        {card.luggage}
                      </span>
                    </div>
                  </div>

                  {card.examples && (
                    <p className="text-sm text-gray-500 mb-5">
                      {card.examples}
                    </p>
                  )}

                  {card.availabilityNote && (
                    <p className="text-xs uppercase tracking-[0.14em] text-primary/80 font-semibold mb-5">
                      {card.availabilityNote}
                    </p>
                  )}

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {card.features.map((feature) => {
                      const Icon = resolveFeatureIcon(feature.icon);
                      return Icon ? (
                        <div
                          key={`${card.id}-${feature.label}`}
                          className="flex items-center gap-3 text-sm text-gray-600"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{feature.label}</span>
                        </div>
                      ) : null;
                    })}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full silk-button"
                    onClick={handleBookNow}
                  >
                    {card.ctaLabel}
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
