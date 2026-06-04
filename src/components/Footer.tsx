import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { buildGenericWhatsAppUrl } from "@/lib/eventsPrefill";

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      Icon: Facebook,
      href: "https://facebook.com/pariseliteservices",
      label: "Facebook",
    },
    {
      Icon: Instagram,
      href: "https://instagram.com/pariseliteservices",
      label: "Instagram",
    },
    {
      Icon: Twitter,
      href: "https://twitter.com/pariselite",
      label: "Twitter",
    },
    {
      Icon: Phone,
      href: buildGenericWhatsAppUrl(language),
      label: "WhatsApp",
    },
    {
      Icon: Mail,
      href: "mailto:info@eliteparistransfer.com",
      label: "Email",
    },
  ];

  const quickLinks = [
    { label: t?.footer?.links?.services ?? "Services", href: "#services" },
    { label: t?.footer?.links?.fleet ?? "Fleet", href: "#fleet" },
    { label: t?.footer?.links?.about ?? "About Us", href: "#about" },
    {
      label: t?.footer?.links?.travelGuides ?? "Travel Guides",
      href: "/guides/avoid-fake-taxis",
      isRoute: true,
    },
    {
      label: t?.nav?.excursions ?? "Excursions",
      href: "/excursions",
      isRoute: true,
    },
    { label: t?.footer?.links?.faq ?? "FAQ", href: "/faq", isRoute: true },
  ];

  return (
    <footer className="bg-ref-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main grid — 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="font-editorial font-light text-2xl text-white mb-3">
                Paris Elite Services
              </h3>
              <p className="font-ui text-sm text-white/50 leading-relaxed">
                {t?.footer?.description ??
                  "Luxury transport service and exclusive tours in Paris and surroundings."}
              </p>
            </div>
            <div className="flex gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors"
                >
                  <Icon className="h-4 w-4 text-white/50" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
              {t?.footer?.links?.title ?? "Quick Links"}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href, isRoute }) => (
                <li key={label}>
                  {isRoute ? (
                    <Link
                      to={href}
                      className="font-ui text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      className="font-ui text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
              {t?.contact?.title ?? "Contact"}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
                <span className="font-ui text-sm text-white/60">
                  +33 668 251 102
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
                <a
                  href="mailto:info@eliteparistransfer.com"
                  className="font-ui text-sm text-white/60 hover:text-white transition-colors"
                >
                  info@eliteparistransfer.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
                <span className="font-ui text-sm text-white/60">
                  Vanves (92170), Île-de-France
                </span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
              {t?.footer?.schedule?.title ?? "Hours"}
            </h4>
            <p className="font-ui text-sm text-white/60 leading-relaxed">
              {t?.footer?.schedule?.description ??
                "Service available 24 hours, 7 days a week"}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-ui text-xs text-white/40">
            © {currentYear}
            {t?.footer?.copyright ??
              " Paris Elite Services. All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="font-ui text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {t?.footer?.links?.privacy ?? "Privacy Policy"}
            </Link>
            <span className="text-white/20">·</span>
            <Link
              to="/terms"
              className="font-ui text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {t?.footer?.links?.terms ?? "Terms of Service"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
