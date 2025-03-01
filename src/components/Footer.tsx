import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-display mb-4">Paris Elite Services</h3>
            <p className="text-sm opacity-80">
              {t?.footer?.description || "Servicio de transporte de lujo y tours exclusivos en París y sus alrededores."}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-display mb-4">{t?.footer?.links?.title || "Enlaces Rápidos"}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-secondary transition-colors">
                  {t?.footer?.links?.services || "Servicios"}
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-secondary transition-colors">
                  {t?.footer?.links?.fleet || "Flota"}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-secondary transition-colors">
                  {t?.footer?.links?.about || "Sobre Nosotros"}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-secondary transition-colors">
                  {t?.footer?.links?.contact || "Contacto"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display mb-4">{t?.contact?.title || "Contacto"}</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <a href="mailto:contact@pariselite.com" className="hover:text-secondary transition-colors">
                  contact@pariselite.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-secondary" />
                <span>75008 Paris, France</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display mb-4">{t?.footer?.schedule?.title || "Horario de Atención"}</h4>
            <ul className="space-y-2">
              <li>{t?.footer?.schedule?.description || "Lunes - Domingo: 24h"}</li>
            </ul>
            <p className="mt-4 text-sm opacity-80">
              {t?.footer?.schedule?.note || "Servicio disponible las 24 horas, los 7 días de la semana"}
            </p>
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">{t?.footer?.payment?.title || "Métodos de pago aceptados"}</h5>
              <img 
                src="/images/payment-methods.png" 
                alt={t?.footer?.payment?.title || "Métodos de pago aceptados"}
                className="h-8"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm opacity-80">
              {t?.footer?.copyright || `© ${currentYear} Paris Elite Services. Todos los derechos reservados.`}
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-sm hover:text-secondary transition-colors">
                {t?.footer?.links?.privacy || "Política de Privacidad"}
              </a>
              <a href="/terms" className="text-sm hover:text-secondary transition-colors">
                {t?.footer?.links?.terms || "Términos de Servicio"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
