import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Clock, Mail, Phone, User } from "lucide-react";

interface BookingDetails {
  pickup?: string;
  dropoff?: string;
  date?: string;
  time?: string;
  returnDate?: string;
  returnTime?: string;
  passengers?: number | string;
  luggage?: string;
  tripType?: string;
  pickupLocationName?: string;
  dropoffLocationName?: string;
  [key: string]: unknown;
}

interface LocationState {
  bookingDetails?: BookingDetails;
  language?: string;
}

const LABELS: Record<string, Record<string, string>> = {
  en: {
    title: "Almost done — confirm your request",
    subtitle: "We'll review your booking and get back to you within 2 hours.",
    name: "Full name",
    email: "Email address",
    phone: "Phone / WhatsApp",
    emailPlaceholder: "your@email.com",
    phonePlaceholder: "+33 6 XX XX XX XX",
    namePlaceholder: "Your name",
    submit: "Send booking request",
    submitting: "Sending...",
    confirmTitle: "Request received!",
    confirmMsg:
      "We'll review your request and confirm availability within 2 hours. Check your email or WhatsApp for our reply.",
    backHome: "Back to home",
    tripSummary: "Your trip",
    from: "From",
    to: "To",
    date: "Date",
    pax: "Passengers",
    emailRequired: "Email is required",
    invalidEmail: "Please enter a valid email address",
    errorTitle: "Error",
    errorMsg: "Could not submit your request. Please try again.",
  },
  fr: {
    title: "Presque terminé — confirmez votre demande",
    subtitle:
      "Nous examinerons votre demande et vous répondrons dans les 2 heures.",
    name: "Nom complet",
    email: "Adresse email",
    phone: "Téléphone / WhatsApp",
    emailPlaceholder: "votre@email.com",
    phonePlaceholder: "+33 6 XX XX XX XX",
    namePlaceholder: "Votre nom",
    submit: "Envoyer la demande",
    submitting: "Envoi en cours...",
    confirmTitle: "Demande reçue !",
    confirmMsg:
      "Nous vérifierons la disponibilité et vous confirmerons dans les 2 heures. Surveillez votre email ou WhatsApp.",
    backHome: "Retour à l'accueil",
    tripSummary: "Votre trajet",
    from: "Départ",
    to: "Destination",
    date: "Date",
    pax: "Passagers",
    emailRequired: "L'email est requis",
    invalidEmail: "Adresse email invalide",
    errorTitle: "Erreur",
    errorMsg: "Impossible d'envoyer votre demande. Veuillez réessayer.",
  },
  es: {
    title: "Casi listo — confirme su solicitud",
    subtitle:
      "Revisaremos su reserva y le responderemos en un máximo de 2 horas.",
    name: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono / WhatsApp",
    emailPlaceholder: "su@email.com",
    phonePlaceholder: "+33 6 XX XX XX XX",
    namePlaceholder: "Su nombre",
    submit: "Enviar solicitud",
    submitting: "Enviando...",
    confirmTitle: "¡Solicitud recibida!",
    confirmMsg:
      "Revisaremos su solicitud y confirmaremos disponibilidad en 2 horas. Revise su email o WhatsApp.",
    backHome: "Volver al inicio",
    tripSummary: "Su viaje",
    from: "Origen",
    to: "Destino",
    date: "Fecha",
    pax: "Pasajeros",
    emailRequired: "El email es obligatorio",
    invalidEmail: "Correo electrónico inválido",
    errorTitle: "Error",
    errorMsg: "No se pudo enviar la solicitud. Por favor, inténtelo de nuevo.",
  },
  pt: {
    title: "Quase pronto — confirme o seu pedido",
    subtitle: "Analisaremos a sua reserva e responderemos em até 2 horas.",
    name: "Nome completo",
    email: "Endereço de email",
    phone: "Telefone / WhatsApp",
    emailPlaceholder: "seu@email.com",
    phonePlaceholder: "+33 6 XX XX XX XX",
    namePlaceholder: "O seu nome",
    submit: "Enviar pedido",
    submitting: "A enviar...",
    confirmTitle: "Pedido recebido!",
    confirmMsg:
      "Analisaremos o seu pedido e confirmaremos disponibilidade em 2 horas. Verifique o seu email ou WhatsApp.",
    backHome: "Voltar ao início",
    tripSummary: "A sua viagem",
    from: "Origem",
    to: "Destino",
    date: "Data",
    pax: "Passageiros",
    emailRequired: "Email é obrigatório",
    invalidEmail: "Endereço de email inválido",
    errorTitle: "Erro",
    errorMsg: "Não foi possível enviar o pedido. Por favor, tente novamente.",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BookingPending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const state = (location.state ?? {}) as LocationState;
  const bookingDetails = state.bookingDetails ?? {};
  const lang = (state.language ?? "en") as keyof typeof LABELS;
  const l = LABELS[lang] ?? LABELS.en;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Guard: no booking state → redirect to /booking (direct URL access, back-nav, etc.)
  if (!state.bookingDetails) {
    return <Navigate to="/booking" replace />;
  }

  const pickup =
    (bookingDetails.pickupLocationName as string) ??
    (bookingDetails.pickup as string) ??
    "";
  const dropoff =
    (bookingDetails.dropoffLocationName as string) ??
    (bookingDetails.dropoff as string) ??
    "";
  const date = (bookingDetails.date as string) ?? "";
  const time = (bookingDetails.time as string) ?? "";
  const passengers = bookingDetails.passengers
    ? String(bookingDetails.passengers)
    : "";
  const luggage = (bookingDetails.luggage as string) ?? "";
  const tripType = (bookingDetails.tripType as string) ?? "one_way";
  const returnDate = (bookingDetails.returnDate as string) ?? "";
  const returnTime = (bookingDetails.returnTime as string) ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: l.errorTitle,
        description: l.emailRequired,
        variant: "destructive",
      });
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      toast({
        title: l.errorTitle,
        description: l.invalidEmail,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke(
        "submit-booking-request",
        {
          body: {
            customer_name: name.trim() || undefined,
            customer_email: email.trim(),
            customer_phone: phone.trim() || undefined,
            pickup,
            dropoff,
            pickup_date: date,
            pickup_time: time,
            return_date: returnDate || undefined,
            return_time: returnTime || undefined,
            passengers: passengers ? Number(passengers) : undefined,
            luggage: luggage || undefined,
            trip_type: tripType,
            language: lang,
            source_path: "/booking",
          },
        },
      );

      if (error) {
        console.error("[BookingPending] edge function error:", error);
        toast({
          title: l.errorTitle,
          description: l.errorMsg,
          variant: "destructive",
        });
        return;
      }

      setConfirmed(true);
    } catch (err) {
      console.error("[BookingPending] unexpected error:", err);
      toast({
        title: l.errorTitle,
        description: l.errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-4">
          {l.confirmTitle}
        </h1>
        <p className="text-muted-foreground text-lg mb-8">{l.confirmMsg}</p>
        <Button onClick={() => navigate("/")} variant="outline">
          {l.backHome}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      {/* Trip summary */}
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 mb-8">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
          {l.tripSummary}
        </p>
        <div className="space-y-1.5 text-sm text-foreground/80">
          <div className="flex gap-2">
            <span className="font-medium w-20 shrink-0">{l.from}</span>
            <span>{pickup}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium w-20 shrink-0">{l.to}</span>
            <span>{dropoff}</span>
          </div>
          {date && (
            <div className="flex gap-2">
              <span className="font-medium w-20 shrink-0">{l.date}</span>
              <span>
                {date} {time}
              </span>
            </div>
          )}
          {passengers && (
            <div className="flex gap-2">
              <span className="font-medium w-20 shrink-0">{l.pax}</span>
              <span>{passengers}</span>
            </div>
          )}
        </div>
      </div>

      {/* Contact form */}
      <h1 className="text-2xl font-bold text-primary mb-2">{l.title}</h1>
      <p className="text-muted-foreground mb-6 text-sm">{l.subtitle}</p>

      <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6">
        <Clock className="h-4 w-4 shrink-0" />
        <span>Response within 2 hours</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="pending-name" className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {l.name}
          </Label>
          <Input
            id="pending-name"
            type="text"
            placeholder={l.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="pending-email" className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            {l.email} *
          </Label>
          <Input
            id="pending-email"
            type="email"
            placeholder={l.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="pending-phone" className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            {l.phone}
          </Label>
          <Input
            id="pending-phone"
            type="tel"
            placeholder={l.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? l.submitting : l.submit}
        </Button>
      </form>
    </div>
  );
};

export default BookingPending;
