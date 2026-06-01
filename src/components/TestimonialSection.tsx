import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/types/i18n";

type Testimonial = {
  name: string;
  role: string;
  content: string;
};

type TestimonialsContent = {
  eyebrow: string;
  title: string;
  testimonials: Testimonial[];
};

const copyByLanguage: Record<Language, TestimonialsContent> = {
  es: {
    eyebrow: "Opiniones de clientes",
    title: "Opiniones de Nuestros Clientes",
    testimonials: [
      {
        name: "L.M.",
        role: "Asistente ejecutiva, Madrid",
        content:
          "Coordinamos traslados corporativos durante una semana intensa y todo salió puntual. Comunicación clara y gran gestión de cambios de última hora.",
      },
      {
        name: "D.R.",
        role: "Travel Manager, Lisboa",
        content:
          "Para nuestros directivos usamos Paris Elite en CDG y Le Bourget. Responden rápido, facturación ordenada y conductores muy profesionales.",
      },
      {
        name: "I.G.",
        role: "Viajera frecuente, Barcelona",
        content:
          "Reservé ida y vuelta aeropuerto-hotel con poco margen y funcionó perfecto. Vehículo limpio, conductor amable y seguimiento en tiempo real.",
      },
    ],
  },
  fr: {
    eyebrow: "Avis clients",
    title: "Ce Que Disent Nos Clients",
    testimonials: [
      {
        name: "L.M.",
        role: "Assistante de direction, Madrid",
        content:
          "Nous avons coordonné plusieurs transferts corporate pendant une semaine chargée. Tout a été ponctuel, avec une excellente gestion des changements de dernière minute.",
      },
      {
        name: "D.R.",
        role: "Travel Manager, Lisbonne",
        content:
          "Pour nos dirigeants, nous utilisons Paris Elite entre CDG et Le Bourget. Réponse rapide, facturation claire et chauffeurs très pros.",
      },
      {
        name: "I.G.",
        role: "Voyageuse fréquente, Barcelone",
        content:
          "Réservation aller-retour aéroport-hôtel faite en urgence, tout était fluide. Véhicule propre, chauffeur courtois et suivi en temps réel.",
      },
    ],
  },
  en: {
    eyebrow: "Client reviews",
    title: "What Our Clients Say",
    testimonials: [
      {
        name: "L.M.",
        role: "Executive Assistant, Madrid",
        content:
          "We coordinated corporate transfers during a very busy week and everything ran on time. Clear communication and great last-minute change handling.",
      },
      {
        name: "D.R.",
        role: "Travel Manager, Lisbon",
        content:
          "We use Paris Elite for executive rides from CDG and Le Bourget. Fast response times, clean invoicing and very professional chauffeurs.",
      },
      {
        name: "I.G.",
        role: "Frequent traveler, Barcelona",
        content:
          "Booked airport-hotel round trips on short notice and it worked smoothly. Clean vehicle, polite driver and reliable live updates.",
      },
    ],
  },
  pt: {
    eyebrow: "Avaliações de clientes",
    title: "O Que Dizem Nossos Clientes",
    testimonials: [
      {
        name: "L.M.",
        role: "Assistente executiva, Madrid",
        content:
          "Coordenamos traslados corporativos durante uma semana intensa e tudo foi pontual. Comunicação clara e excelente gestão de mudanças de última hora.",
      },
      {
        name: "D.R.",
        role: "Travel Manager, Lisboa",
        content:
          "Usamos a Paris Elite para executivos entre CDG e Le Bourget. Resposta rápida, faturação organizada e motoristas muito profissionais.",
      },
      {
        name: "I.G.",
        role: "Viajante frequente, Barcelona",
        content:
          "Reservei aeroporto-hotel ida e volta com pouco tempo e funcionou muito bem. Veículo limpo, motorista educado e acompanhamento em tempo real.",
      },
    ],
  },
};

const TestimonialSection = () => {
  const { language } = useLanguage();
  const sectionContent = copyByLanguage[language] ?? copyByLanguage.en;

  return (
    <section className="bg-white py-16 md:py-24 border-b border-ref-ink/8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12 md:mb-16">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.3em] text-ref-ink/40 mb-4">
            {sectionContent.eyebrow}
          </p>
          <h2 className="font-editorial font-light text-3xl md:text-4xl text-ref-ink">
            {sectionContent.title}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ref-ink/8">
          {sectionContent.testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="py-8 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0"
            >
              <span className="font-editorial text-5xl font-light text-ref-ink/15 leading-none block mb-4">
                "
              </span>
              <p className="font-editorial font-light italic text-lg text-ref-ink leading-relaxed mb-6">
                {testimonial.content}
              </p>
              <div>
                <p className="font-ui text-sm font-semibold text-ref-ink">
                  {testimonial.name}
                </p>
                <p className="font-ui text-xs text-ref-ink/50 mt-0.5">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
