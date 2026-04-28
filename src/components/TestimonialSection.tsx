import TestimonialCard from "./TestimonialCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import type { Language } from "@/types/i18n";

const TestimonialSection = () => {
  const { language } = useLanguage();

  type Testimonial = {
    name: string;
    role: string;
    content: string;
    rating: number;
  };

  type TestimonialsContent = {
    eyebrow: string;
    title: string;
    description: string;
    stats: {
      satisfied: string;
      avgRating: string;
      punctuality: string;
      support: string;
      note: string;
    };
    testimonials: Testimonial[];
  };

  const copyByLanguage: Record<Language, TestimonialsContent> = {
    es: {
      eyebrow: "Opiniones de clientes",
      title: "Opiniones de Nuestros Clientes",
      description:
        "Comentarios de clientes corporativos y viajeros frecuentes que usan nuestro servicio en París.",
      stats: {
        satisfied: "Clientes atendidos",
        avgRating: "Valoración media (estimada)",
        punctuality: "Objetivo de puntualidad",
        support: "Soporte cliente",
        note: "Indicadores internos orientativos.",
      },
      testimonials: [
        {
          name: "L.M.",
          role: "Asistente ejecutiva, Madrid",
          content:
            "Coordinamos traslados corporativos durante una semana intensa y todo salió puntual. Comunicación clara y gran gestión de cambios de última hora.",
          rating: 5,
        },
        {
          name: "D.R.",
          role: "Travel Manager, Lisboa",
          content:
            "Para nuestros directivos usamos Paris Elite en CDG y Le Bourget. Responden rápido, facturación ordenada y conductores muy profesionales.",
          rating: 5,
        },
        {
          name: "I.G.",
          role: "Viajera frecuente, Barcelona",
          content:
            "Reservé ida y vuelta aeropuerto-hotel con poco margen y funcionó perfecto. Vehículo limpio, conductor amable y seguimiento en tiempo real.",
          rating: 5,
        },
      ],
    },
    fr: {
      eyebrow: "Avis clients",
      title: "Ce Que Disent Nos Clients",
      description:
        "Retours de voyageurs fréquents et d'équipes corporate qui nous confient leurs transferts à Paris.",
      stats: {
        satisfied: "Clients accompagnés",
        avgRating: "Note moyenne (estimée)",
        punctuality: "Objectif de ponctualité",
        support: "Support client",
        note: "Indicateurs internes à titre indicatif.",
      },
      testimonials: [
        {
          name: "L.M.",
          role: "Assistante de direction, Madrid",
          content:
            "Nous avons coordonné plusieurs transferts corporate pendant une semaine chargée. Tout a été ponctuel, avec une excellente gestion des changements de dernière minute.",
          rating: 5,
        },
        {
          name: "D.R.",
          role: "Travel Manager, Lisbonne",
          content:
            "Pour nos dirigeants, nous utilisons Paris Elite entre CDG et Le Bourget. Réponse rapide, facturation claire et chauffeurs très pros.",
          rating: 5,
        },
        {
          name: "I.G.",
          role: "Voyageuse fréquente, Barcelone",
          content:
            "Réservation aller-retour aéroport-hôtel faite en urgence, tout était fluide. Véhicule propre, chauffeur courtois et suivi en temps réel.",
          rating: 5,
        },
      ],
    },
    en: {
      eyebrow: "Client reviews",
      title: "What Our Clients Say",
      description:
        "Feedback from frequent travelers and corporate teams who rely on us for premium transfers in Paris.",
      stats: {
        satisfied: "Clients served",
        avgRating: "Average rating (estimated)",
        punctuality: "On-time target",
        support: "Client support",
        note: "Internal directional indicators.",
      },
      testimonials: [
        {
          name: "L.M.",
          role: "Executive Assistant, Madrid",
          content:
            "We coordinated corporate transfers during a very busy week and everything ran on time. Clear communication and great last-minute change handling.",
          rating: 5,
        },
        {
          name: "D.R.",
          role: "Travel Manager, Lisbon",
          content:
            "We use Paris Elite for executive rides from CDG and Le Bourget. Fast response times, clean invoicing and very professional chauffeurs.",
          rating: 5,
        },
        {
          name: "I.G.",
          role: "Frequent traveler, Barcelona",
          content:
            "Booked airport-hotel round trips on short notice and it worked smoothly. Clean vehicle, polite driver and reliable live updates.",
          rating: 5,
        },
      ],
    },
    pt: {
      eyebrow: "Avaliações de clientes",
      title: "O Que Dizem Nossos Clientes",
      description:
        "Comentários de viajantes frequentes e clientes corporativos que usam nossos traslados em Paris.",
      stats: {
        satisfied: "Clientes atendidos",
        avgRating: "Avaliação média (estimada)",
        punctuality: "Meta de pontualidade",
        support: "Suporte ao cliente",
        note: "Indicadores internos de referência.",
      },
      testimonials: [
        {
          name: "L.M.",
          role: "Assistente executiva, Madrid",
          content:
            "Coordenamos traslados corporativos durante uma semana intensa e tudo foi pontual. Comunicação clara e excelente gestão de mudanças de última hora.",
          rating: 5,
        },
        {
          name: "D.R.",
          role: "Travel Manager, Lisboa",
          content:
            "Usamos a Paris Elite para executivos entre CDG e Le Bourget. Resposta rápida, faturação organizada e motoristas muito profissionais.",
          rating: 5,
        },
        {
          name: "I.G.",
          role: "Viajante frequente, Barcelona",
          content:
            "Reservei aeroporto-hotel ida e volta com pouco tempo e funcionou muito bem. Veículo limpo, motorista educado e acompanhamento em tempo real.",
          rating: 5,
        },
      ],
    },
  };

  const sectionContent = copyByLanguage[language] ?? copyByLanguage.en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="section-padding bg-gradient-to-b from-champagne via-cream to-white dark:from-secondary dark:via-secondary-dark dark:to-primary-dark transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
            {sectionContent.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-primary-foreground mb-6">
            {sectionContent.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {sectionContent.description}
          </p>
        </motion.div>

        {/* Staggered Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {sectionContent.testimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${index}`}
              variants={itemVariants}
              className={`h-full ${index === 1 ? "lg:mt-12" : ""}`}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar with Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <AnimatedCounter
              end={500}
              suffix="+"
              className="text-4xl md:text-5xl font-display font-bold text-primary mb-2"
              duration={2500}
            />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {sectionContent.stats.satisfied}
            </div>
          </div>
          <div className="text-center">
            <AnimatedCounter
              end={4.8}
              decimals={1}
              className="text-4xl md:text-5xl font-display font-bold text-primary mb-2"
              duration={2500}
            />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {sectionContent.stats.avgRating}
            </div>
          </div>
          <div className="text-center">
            <AnimatedCounter
              end={98}
              suffix="%"
              className="text-4xl md:text-5xl font-display font-bold text-primary mb-2"
              duration={2500}
            />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {sectionContent.stats.punctuality}
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
              24/7
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {sectionContent.stats.support}
            </div>
          </div>
        </motion.div>
        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          {sectionContent.stats.note}
        </p>
      </div>
    </section>
  );
};

export default TestimonialSection;
