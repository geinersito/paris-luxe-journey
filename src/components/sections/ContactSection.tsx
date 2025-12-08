import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);

    try {
      // Guardar el mensaje en la base de datos
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert([formData]);

      if (dbError) throw dbError;

      // Enviar email de confirmación usando la función edge
      const { error: emailError } = await supabase.functions.invoke('send-contact-confirmation', {
        body: { 
          name: formData.name,
          email: formData.email,
          message: formData.message,
          recipientEmail: "info@eliteparistransfer.com" // Email de prueba
        }
      });

      if (emailError) {
        console.error('Email error details:', emailError);
        throw emailError;
      }

      toast({
        title: t.contact.success,
        description: t.contact.successDescription,
      });

      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: t.contact.error,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-pearl dark:bg-gray-900 animate-fadeIn">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary dark:text-primary-foreground text-center mb-16">
          {t.contact.title}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {/* Map container with premium frame */}
            <div className="relative p-1 bg-gradient-to-br from-primary via-primary-dark to-secondary rounded-2xl shadow-2xl">
              <a
                href="https://www.google.com/maps/place/151+Av.+des+Champs-%C3%89lys%C3%A9es,+75008+Paris,+France/@48.8724501,2.2985438,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-w-16 aspect-h-9 relative rounded-xl overflow-hidden bg-white dark:bg-gray-900 transition-all duration-300 group"
              >
                {/* Subtle overlay for brand integration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 z-10 pointer-events-none" />

                {/* Map iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2600967568854!2d2.298543776526961!3d48.87245010712435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc49f8c3429%3A0x2c2c85f1c7e83a79!2s151%20Av.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris%2C%20France!5e0!3m2!1sen!2sfr!4v1682841234567!5m2!1sen!2sfr&style=feature:all|element:geometry|color:0x0B2545&style=feature:all|element:labels.text.fill|color:0xC8A951&style=feature:all|element:labels.text.stroke|color:0x0B2545&style=feature:water|element:geometry|color:0x081B34"
                  className="w-full h-full grayscale-[25%] contrast-[1.1] brightness-[0.95] group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-500"
                  style={{ border: 0, pointerEvents: 'none' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Hover overlay with CTA */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-gradient-to-t from-black/40 via-black/20 to-transparent">
                  <div className="text-center space-y-2">
                    <span className="block px-6 py-3 bg-white/95 text-primary rounded-lg shadow-xl font-semibold text-sm backdrop-blur-sm">
                      Open in Google Maps
                    </span>
                    <span className="block text-white text-xs font-medium">
                      151 Avenue des Champs-Élysées, Paris
                    </span>
                  </div>
                </div>
              </a>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">{t.contact.phone}</h3>
                  <a href="tel:+33668251102" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                    +33 668 251 102
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">{t.contact.email}</h3>
                  <a href="mailto:info@eliteparistransfer.com" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                    info@eliteparistransfer.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">151 Avenue des Champs-Elysées</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    75008 Paris, France
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            {showSuccess && (
              <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-300">{t.contact.success}</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                  {t.contact.successDescription}
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.contact.namePlaceholder}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-gray-50 dark:bg-gray-900"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.contact.emailPlaceholder}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-gray-50 dark:bg-gray-900"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.contact.phonePlaceholder}
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t.contact.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.contact.messagePlaceholder}
                </label>
                <Textarea
                  id="message"
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-gray-900"
                />
              </div>
              <Button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 text-base relative overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-gradient-to-r from-secondary via-secondary-dark to-secondary bg-[length:200%_100%] hover:animate-[shimmer_2s_ease-in-out_infinite]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <span className="animate-spin">⏳</span>
                    <span>{t.common.processing}</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Send className="h-5 w-5" />
                    <span>{t.contact.sendMessage}</span>
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
