import type { Language } from "@/types/i18n";

export interface ExcursionFaqItem {
  question: string;
  answer: string;
}

type ExcursionFaqBuilder = (destination: string) => ExcursionFaqItem[];

const faqBuilders: Record<Language, ExcursionFaqBuilder> = {
  en: (destination) => [
    {
      question: "How long does the excursion day usually last?",
      answer: `Most ${destination} private excursions run between 8 and 12 hours door-to-door. The exact schedule is confirmed before departure.`,
    },
    {
      question: "Where is pickup and drop-off included?",
      answer:
        "Pickup and drop-off are included at Paris hotels, private addresses, and major train stations inside the city area.",
    },
    {
      question: "Are tickets and reservations included in the quote?",
      answer:
        "Entry tickets and timed reservations can be pre-arranged on request. Your quote clearly states what is included and what is optional.",
    },
    {
      question: "Can we customize stops or adjust the itinerary?",
      answer:
        "Yes. This is a private chauffeur service, so we can adapt route order, photo stops, and pacing based on your priorities and traffic.",
    },
    {
      question: "What is your cancellation and rescheduling policy?",
      answer:
        "Free cancellation is available up to 24 hours before pickup. For weather or transport disruptions, we offer the best possible rescheduling window.",
    },
    {
      question: "Do you provide child seats and accessibility support?",
      answer:
        "Child seats are available on request and should be specified at booking time. Please share any mobility needs so we can assign the right vehicle.",
    },
    {
      question: "Can families travel with strollers and extra luggage?",
      answer:
        "Yes. We plan capacity in advance for strollers and bags, and we can include practical comfort stops during the day when needed.",
    },
  ],
  fr: (destination) => [
    {
      question: "Combien de temps dure en general la journee d'excursion ?",
      answer: `La plupart des excursions privees vers ${destination} durent entre 8 et 12 heures porte-a-porte. L'horaire final est confirme avant le depart.`,
    },
    {
      question: "Ou la prise en charge et le retour sont-ils inclus ?",
      answer:
        "La prise en charge et le retour sont inclus pour les hotels, adresses privees et grandes gares de Paris intra-muros.",
    },
    {
      question: "Les billets et reservations sont-ils inclus dans le devis ?",
      answer:
        "Les billets d'entree et reservations horodatees peuvent etre prepares sur demande. Le devis precise clairement ce qui est inclus ou optionnel.",
    },
    {
      question: "Peut-on personnaliser les arrets ou l'itineraire ?",
      answer:
        "Oui. Le service est prive avec chauffeur, donc nous adaptons l'ordre des etapes, les pauses photo et le rythme selon vos priorites et le trafic.",
    },
    {
      question: "Quelle est la politique d'annulation et de report ?",
      answer:
        "Annulation gratuite jusqu'a 24 heures avant la prise en charge. En cas d'imprevu meteo ou transport, nous proposons le meilleur report possible.",
    },
    {
      question: "Proposez-vous des sieges enfants et une aide mobilite ?",
      answer:
        "Des sieges enfants sont disponibles sur demande et doivent etre indiques a la reservation. Signalez tout besoin de mobilite pour choisir le bon vehicule.",
    },
    {
      question:
        "Les familles peuvent-elles voyager avec poussettes et bagages ?",
      answer:
        "Oui. Nous planifions la capacite a l'avance pour poussettes et bagages, avec des pauses confort sur le trajet si necessaire.",
    },
  ],
  es: (destination) => [
    {
      question: "Cuanto dura normalmente el dia de excursion privada?",
      answer: `La mayoria de las excursiones privadas a ${destination} duran entre 8 y 12 horas puerta a puerta. El horario final se confirma antes de salir.`,
    },
    {
      question: "Donde incluye la recogida y el regreso?",
      answer:
        "La recogida y el regreso estan incluidos en hoteles, direcciones privadas y estaciones principales dentro de Paris ciudad.",
    },
    {
      question: "Los tickets y reservas estan incluidos en el presupuesto?",
      answer:
        "Los tickets y reservas con franja horaria pueden organizarse bajo solicitud. El presupuesto indica claramente que esta incluido y que es opcional.",
    },
    {
      question: "Podemos personalizar paradas o ajustar el itinerario?",
      answer:
        "Si. Es un servicio privado con chofer, por lo que adaptamos orden de visitas, paradas para fotos y ritmo segun sus prioridades y trafico.",
    },
    {
      question: "Cual es la politica de cancelacion y cambio de fecha?",
      answer:
        "Cancelacion gratuita hasta 24 horas antes de la recogida. En caso de clima o incidencias de transporte, ofrecemos la mejor opcion de reprogramacion.",
    },
    {
      question: "Ofrecen sillas para ninos y apoyo de accesibilidad?",
      answer:
        "Disponemos de sillas infantiles bajo solicitud y deben indicarse al reservar. Comparta necesidades de movilidad para asignar el vehiculo adecuado.",
    },
    {
      question: "Las familias pueden viajar con cochecito y equipaje extra?",
      answer:
        "Si. Planificamos capacidad para cochecitos y maletas con antelacion, y podemos incluir paradas de confort cuando sea necesario.",
    },
  ],
  pt: (destination) => [
    {
      question: "Quanto tempo dura, em media, o dia de excursao privada?",
      answer: `A maioria das excursoes privadas para ${destination} dura entre 8 e 12 horas porta a porta. O horario final e confirmado antes da partida.`,
    },
    {
      question: "Onde o embarque e desembarque estao incluidos?",
      answer:
        "Embarque e desembarque estao incluidos em hoteis, enderecos privados e principais estacoes dentro de Paris.",
    },
    {
      question: "Ingressos e reservas estao incluidos no valor?",
      answer:
        "Ingressos e reservas com horario podem ser organizados sob solicitacao. O valor informa claramente o que esta incluido e o que e opcional.",
    },
    {
      question: "Podemos personalizar paradas ou ajustar o roteiro?",
      answer:
        "Sim. O servico e privado com motorista, entao ajustamos ordem das visitas, paradas para fotos e ritmo conforme prioridades e transito.",
    },
    {
      question: "Qual e a politica de cancelamento e remarcacao?",
      answer:
        "Cancelamento gratuito ate 24 horas antes do embarque. Em caso de clima ou interrupcao de transporte, oferecemos a melhor janela de remarcacao.",
    },
    {
      question: "Ha cadeiras infantis e apoio para acessibilidade?",
      answer:
        "Cadeiras infantis estao disponiveis sob solicitacao e devem ser informadas na reserva. Informe necessidades de mobilidade para escolhermos o veiculo ideal.",
    },
    {
      question: "Familias podem levar carrinho e bagagem extra?",
      answer:
        "Sim. Planejamos a capacidade antecipadamente para carrinhos e malas, com paradas de conforto durante o dia quando necessario.",
    },
  ],
};

export function getExcursionFaqItems(
  language: Language,
  destination: string,
): ExcursionFaqItem[] {
  return faqBuilders[language](destination);
}
