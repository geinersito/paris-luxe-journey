import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

const getPageName = () => {
  if (typeof window === "undefined") return "home";
  return window.location.pathname === "/"
    ? "home"
    : window.location.pathname.replace(/^\//, "");
};

const openMapLabelByLanguage = {
  en: "Open in Google Maps",
  fr: "Ouvrir dans Google Maps",
  es: "Abrir en Google Maps",
  pt: "Abrir no Google Maps",
} as const;

const ContactSection = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasStartedForm, setHasStartedForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const openMapLabel =
    openMapLabelByLanguage[language as keyof typeof openMapLabelByLanguage] ??
    openMapLabelByLanguage.en;

  const markFormStarted = (event: React.SyntheticEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const tag = target.tagName;
    if (tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") return;
    if (hasStartedForm) return;
    setHasStartedForm(true);
    trackEvent("form_start", {
      page: getPageName(),
      form_id: "contact_section",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);
    trackEvent("form_submit", {
      page: getPageName(),
      form_id: "contact_section",
      method: "contact_form",
    });

    try {
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert([formData]);
      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke(
        "send-contact-confirmation",
        {
          body: {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            recipientEmail: "info@eliteparistransfer.com",
          },
        },
      );
      if (emailError) {
        console.error("Email error details:", emailError);
        throw emailError;
      }

      toast({
        title: t.contact.success,
        description: t.contact.successDescription,
      });
      setShowSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setHasStartedForm(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: t.contact.error,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "font-ui w-full px-4 py-3 border border-ref-ink/15 focus:border-ref-navy focus:ring-1 focus:ring-ref-navy/20 bg-white text-ref-ink text-sm outline-none transition-colors";

  return (
    <section id="contact" className="bg-ref-bg py-16 md:py-24">
      <div id="about" className="scroll-mt-24" />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12 md:mb-16">
          <h2 className="font-editorial font-light text-3xl md:text-4xl text-ref-ink">
            {t.contact.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — contact info + map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-ref-navy mt-0.5 shrink-0" />
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-ref-ink/40 mb-1">
                    {t.contact.phone}
                  </p>
                  <a
                    href="tel:+33668251102"
                    className="font-ui text-sm text-ref-ink hover:text-ref-navy transition-colors"
                  >
                    +33 668 251 102
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-ref-navy mt-0.5 shrink-0" />
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-ref-ink/40 mb-1">
                    {t.contact.email}
                  </p>
                  <a
                    href="mailto:info@eliteparistransfer.com"
                    className="font-ui text-sm text-ref-ink hover:text-ref-navy transition-colors"
                  >
                    info@eliteparistransfer.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-ref-navy mt-0.5 shrink-0" />
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-ref-ink/40 mb-1">
                    {t.contact.address}
                  </p>
                  <p className="font-ui text-sm text-ref-ink/60">
                    Vanves (92170), Île-de-France
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <a
              href="https://www.google.com/maps/place/Vanves,+92170,+France"
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-[4/3] overflow-hidden bg-ref-ink/5"
              aria-label={openMapLabel}
            >
              <iframe
                src="https://www.google.com/maps?q=Vanves%2C+92170%2C+France&output=embed"
                className="w-full h-full"
                style={{ border: 0, pointerEvents: "none" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Paris Elite Services location"
              />
            </a>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            {showSuccess && (
              <div className="mb-6 p-4 border border-ref-navy/20 bg-ref-navy/5 flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-ref-navy mt-0.5 shrink-0" />
                <div>
                  <p className="font-ui font-semibold text-sm text-ref-ink">
                    {t.contact.success}
                  </p>
                  <p className="font-ui text-sm text-ref-ink/60 mt-0.5">
                    {t.contact.successDescription}
                  </p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              onFocusCapture={markFormStarted}
              onInputCapture={markFormStarted}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="font-ui block text-xs font-semibold text-ref-ink/60 mb-2 uppercase tracking-[0.2em]"
                >
                  {t.contact.namePlaceholder}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="font-ui block text-xs font-semibold text-ref-ink/60 mb-2 uppercase tracking-[0.2em]"
                >
                  {t.contact.emailPlaceholder}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="font-ui block text-xs font-semibold text-ref-ink/60 mb-2 uppercase tracking-[0.2em]"
                >
                  {t.contact.phonePlaceholder}
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder={t.contact.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="font-ui block text-xs font-semibold text-ref-ink/60 mb-2 uppercase tracking-[0.2em]"
                >
                  {t.contact.messagePlaceholder}
                </label>
                <textarea
                  id="message"
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-ui font-semibold text-sm w-full px-6 py-3 bg-ref-navy text-white hover:bg-ref-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 min-h-[48px]"
              >
                {isSubmitting ? (
                  t.common.processing
                ) : (
                  <>
                    <Send className="w-4 h-4 shrink-0" />
                    {t.contact.sendMessage}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
