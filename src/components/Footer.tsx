import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">
              {t?.footer?.companyName || "Paris Elite Services"}
            </h3>
            <p className="text-sm opacity-80">
              {t?.footer?.description || "Luxury transport service and exclusive tours in Paris and surroundings."}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/33668251102"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="h-6 w-6" />
              </a>
              <a
                href="mailto:info@eliteparistransfer.com"
                className="hover:text-secondary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
              {/* Add social media links when available:
              <a
                href="https://facebook.com/eliteparistransfer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com/eliteparistransfer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              */}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t?.footer?.links?.title || "Quick Links"}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-secondary transition-colors">
                  {t?.footer?.links?.services || "Services"}
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-secondary transition-colors">
                  {t?.footer?.links?.fleet || "Fleet"}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-secondary transition-colors">
                  {t?.footer?.links?.about || "About Us"}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-secondary transition-colors">
                  {t?.footer?.links?.contact || "Contact"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Travel Guides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/guides/avoid-fake-taxis" className="hover:text-secondary transition-colors">
                  Avoid Fake Taxis
                </Link>
              </li>
              {/* Coming soon - uncomment when pages are ready:
              <li>
                <Link to="/guides/airport-transfer" className="hover:text-secondary transition-colors">
                  Airport Transfer Guide
                </Link>
              </li>
              <li>
                <Link to="/guides/paris-safety" className="hover:text-secondary transition-colors">
                  Paris Travel Safety
                </Link>
              </li>
              */}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t?.contact?.title || "Contact"}</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span>{t?.contact?.phone || "+33 668 251 102"}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <a href="mailto:info@eliteparistransfer.com" className="hover:text-secondary transition-colors">
                  {t?.contact?.email || "info@eliteparistransfer.com"}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-secondary" />
                <span>{t?.contact?.address || "75008 Paris, France"}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t?.footer?.schedule?.title || "Opening Hours"}</h4>
            <ul className="space-y-2">
              <li>{t?.footer?.schedule?.description || "Monday - Sunday: 24h"}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm opacity-80">
              {t?.footer?.copyright || `© ${currentYear} Paris Elite Services. All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;