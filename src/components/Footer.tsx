import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-dark text-white relative overflow-hidden">
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-primary mb-3">
                Paris Elite Services
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {t?.footer?.description || "Luxury transport service and exclusive tours in Paris and surroundings."}
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/33668251102"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@eliteparistransfer.com"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold text-primary mb-6">
              {t?.footer?.links?.title || "Quick Links"}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  {t?.footer?.links?.services || "Services"}
                </a>
              </li>
              <li>
                <a href="#fleet" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  {t?.footer?.links?.fleet || "Fleet"}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  {t?.footer?.links?.about || "About Us"}
                </a>
              </li>
              <li>
                <Link to="/guides/avoid-fake-taxis" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  {t?.footer?.links?.travelGuides || "Travel Guides"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-lg font-display font-semibold text-primary mb-6">
              {t?.contact?.title || "Contact"}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{t?.contact?.phone || "+33 668 251 102"}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:info@eliteparistransfer.com" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  info@eliteparistransfer.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{t?.contact?.address || "75008 Paris, France"}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h4 className="text-lg font-display font-semibold text-primary mb-6">
              {t?.footer?.schedule?.title || "Opening Hours"}
            </h4>
            <div className="space-y-3">
              <div className="text-sm text-gray-300">
                <p className="font-semibold text-white mb-2">24/7 Service</p>
                <p>Available every day</p>
                <p>All year round</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              {t?.footer?.copyright || `© ${currentYear} Paris Elite Services. All rights reserved.`}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;