import type { Event, Language } from "@/types/events";

const WHATSAPP_NUMBER = "33668251102";
const EMAIL_ADDRESS = "contact@paris-elite-services.com";

interface PrefillTemplates {
  greeting: string;
  dateLabel: string;
  venueLabel: string;
  linkLabel: string;
  closing: string;
  genericSubject: string;
  genericBody: string;
}

const templates: Record<string, PrefillTemplates> = {
  en: {
    greeting: "Hi, I'd like a quote for a ride to",
    dateLabel: "Date",
    venueLabel: "Venue",
    linkLabel: "Event link",
    closing: "Could you confirm availability and price?",
    genericSubject: "Event Transfer Quote",
    genericBody:
      "Hi, I'm looking for a luxury transfer to an event in Paris. Could you help me with a quote?",
  },
  es: {
    greeting: "Hola, me gustaría un presupuesto para ir a",
    dateLabel: "Fecha",
    venueLabel: "Lugar",
    linkLabel: "Enlace del evento",
    closing: "¿Podrían confirmar disponibilidad y precio?",
    genericSubject: "Presupuesto Traslado Evento",
    genericBody:
      "Hola, busco un traslado de lujo a un evento en París. ¿Podrían ayudarme con un presupuesto?",
  },
  fr: {
    greeting: "Bonjour, je souhaite un devis pour me rendre à",
    dateLabel: "Date",
    venueLabel: "Lieu",
    linkLabel: "Lien de l'événement",
    closing: "Pourriez-vous confirmer la disponibilité et le tarif ?",
    genericSubject: "Devis Transfert Événement",
    genericBody:
      "Bonjour, je cherche un transfert de luxe pour un événement à Paris. Pourriez-vous m'aider avec un devis ?",
  },
  pt: {
    greeting: "Olá, gostaria de um orçamento para ir a",
    dateLabel: "Data",
    venueLabel: "Local",
    linkLabel: "Link do evento",
    closing: "Poderiam confirmar disponibilidade e preço?",
    genericSubject: "Orçamento Transferência Evento",
    genericBody:
      "Olá, procuro uma transferência de luxo para um evento em Paris. Poderiam me ajudar com um orçamento?",
  },
};

function getTemplates(lang: string): PrefillTemplates {
  return templates[lang] || templates.fr;
}

export function buildEventWhatsAppUrl(
  event: Event,
  language: Language,
  formatDate: (dateString: string) => string,
): string {
  const t = getTemplates(language);
  const lines: string[] = [];

  lines.push(`${t.greeting}: ${event.title[language]}`);

  if (event.startAt) {
    lines.push(`${t.dateLabel}: ${formatDate(event.startAt)}`);
  }
  if (event.venueName?.[language]) {
    lines.push(
      `${t.venueLabel}: ${event.venueName[language]}${event.district ? ` (${event.district})` : ""}`,
    );
  }
  if (event.eventUrl) {
    lines.push(`${t.linkLabel}: ${event.eventUrl}`);
  }

  lines.push("");
  lines.push(t.closing);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function buildEventEmailUrl(
  event: Event,
  language: Language,
  formatDate: (dateString: string) => string,
): string {
  const t = getTemplates(language);

  const subject = encodeURIComponent(
    `${t.genericSubject}: ${event.title[language]}`,
  );

  const bodyLines: string[] = [];
  bodyLines.push(`${t.greeting}: ${event.title[language]}`);
  if (event.startAt) {
    bodyLines.push(`${t.dateLabel}: ${formatDate(event.startAt)}`);
  }
  if (event.venueName?.[language]) {
    bodyLines.push(`${t.venueLabel}: ${event.venueName[language]}`);
  }
  if (event.eventUrl) {
    bodyLines.push(`${t.linkLabel}: ${event.eventUrl}`);
  }
  bodyLines.push("");
  bodyLines.push(t.closing);

  const body = encodeURIComponent(bodyLines.join("\n"));
  return `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
}

export function buildGenericWhatsAppUrl(language: string): string {
  const t = getTemplates(language);
  const text = encodeURIComponent(t.genericBody);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function buildGenericEmailUrl(language: string): string {
  const t = getTemplates(language);
  const subject = encodeURIComponent(t.genericSubject);
  const body = encodeURIComponent(t.genericBody);
  return `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
}
