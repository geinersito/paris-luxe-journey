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
            {/* Social Media Icons - Enhanced */}
            <div className="flex space-x-3">
              <a
                href="https://facebook.com/pariseliteservices"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 rounded-full bg-primary/10 hover:bg-gradient-gold flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-gold-glow"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="https://instagram.com/pariseliteservices"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 rounded-full bg-primary/10 hover:bg-gradient-gold flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-gold-glow"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="https://twitter.com/pariselite"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 rounded-full bg-primary/10 hover:bg-gradient-gold flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-gold-glow"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="https://wa.me/33668251102"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 rounded-full bg-primary/10 hover:bg-gradient-gold flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-gold-glow"
                aria-label="WhatsApp"
              >
                <Phone className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="mailto:info@eliteparistransfer.com"
                className="group w-11 h-11 rounded-full bg-primary/10 hover:bg-gradient-gold flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-gold-glow"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links - Enhanced */}
          <div>
            <h4 className="text-lg font-display font-bold text-primary mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-gold rounded-full" />
              {t?.footer?.links?.title || "Quick Links"}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="group flex items-center gap-2 text-gray-300 hover:text-primary transition-all duration-300 text-sm hover:translate-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
                  {t?.footer?.links?.services || "Services"}
                </a>
              </li>
              <li>
                <a href="#fleet" className="group flex items-center gap-2 text-gray-300 hover:text-primary transition-all duration-300 text-sm hover:translate-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
                  {t?.footer?.links?.fleet || "Fleet"}
                </a>
              </li>
              <li>
                <a href="#about" className="group flex items-center gap-2 text-gray-300 hover:text-primary transition-all duration-300 text-sm hover:translate-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
                  {t?.footer?.links?.about || "About Us"}
                </a>
              </li>
              <li>
                <Link to="/guides/avoid-fake-taxis" className="group flex items-center gap-2 text-gray-300 hover:text-primary transition-all duration-300 text-sm hover:translate-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
                  {t?.footer?.links?.travelGuides || "Travel Guides"}
                </Link>
              </li>
              <li>
                <Link to="/excursions" className="group flex items-center gap-2 text-gray-300 hover:text-primary transition-all duration-300 text-sm hover:translate-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
                  Excursions
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

        {/* Bottom Bar - Enhanced */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <span className="text-primary">©</span>
              {t?.footer?.copyright || `${currentYear} Paris Elite Services. All rights reserved.`}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-primary transition-colors duration-300 hover:underline underline-offset-4">
                {t?.footer?.links?.privacy || "Privacy Policy"}
              </a>
              <span className="text-gray-600">•</span>
              <a href="#" className="hover:text-primary transition-colors duration-300 hover:underline underline-offset-4">
                {t?.footer?.links?.terms || "Terms of Service"}
              </a>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Licensed VTC Service • Fully Insured • SSL Secured Payments</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;