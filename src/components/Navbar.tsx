import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleServicesDropdown = () => setServicesDropdownOpen(!servicesDropdownOpen);

  // Scroll detection for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (offset / windowHeight) * 100;

      setScrolled(offset > 50);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t.nav.home, href: "/" },
    {
      name: t.nav.services,
      href: "#services",
      hasDropdown: true,
      dropdownItems: [
        { name: t.services.dropdown.transfers, href: "/airports/cdg" },
        { name: t.services.dropdown.chauffeur, href: "/booking" },
        { name: t.services.dropdown.excursions, href: "/excursions" }
      ]
    },
    {
      name: "Airports",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "CDG Airport", href: "/airports/cdg" },
        { name: "Orly Airport", href: "#", disabled: true },
        { name: "Beauvais Airport", href: "#", disabled: true }
      ]
    },
    { name: t.nav.fleet, href: "#fleet" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-primary/10'
          : 'bg-white/95 dark:bg-background/90 backdrop-blur-md shadow-sm border-b border-border'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-1 bg-gradient-gold transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0">
            <a
              href="/"
              className={`text-xl sm:text-2xl font-display font-bold transition-all duration-300 ${
                scrolled
                  ? 'text-primary'
                  : 'text-secondary'
              }`}
            >
              Paris Elite Services
            </a>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div key={item.name} className="relative group">
                  <button
                    className="text-secondary group-hover:text-primary transition-colors duration-200 font-medium flex items-center py-2"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                  >
                    {item.name} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div
                    className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <div className="rounded-md shadow-lg bg-background border border-border overflow-hidden">
                      {item.dropdownItems.map((dropdownItem) => (
                        dropdownItem.disabled ? (
                          <span
                            key={dropdownItem.name}
                            className="block px-4 py-2.5 text-sm text-muted-foreground/50 cursor-not-allowed"
                          >
                            {dropdownItem.name} <span className="text-xs">(Coming Soon)</span>
                          </span>
                        ) : (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200"
                          >
                            {dropdownItem.name}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-secondary hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              )
            ))}
            <div className="ml-4">
              <LanguageSelector />
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="text-foreground hover:text-primary transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slideDown">
          <div className="px-4 pt-2 pb-3 space-y-2">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div key={item.name}>
                  <button
                    className="flex items-center justify-between w-full px-3 py-2 text-secondary hover:text-primary transition-colors duration-200 rounded-md hover:bg-accent"
                    onClick={toggleServicesDropdown}
                  >
                    {item.name}
                    <ChevronDown className={`h-4 w-4 transform ${servicesDropdownOpen ? 'rotate-180' : ''} transition-transform`} />
                  </button>
                  {servicesDropdownOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        dropdownItem.disabled ? (
                          <span
                            key={dropdownItem.name}
                            className="block px-3 py-2 text-muted-foreground/50 cursor-not-allowed"
                          >
                            {dropdownItem.name} <span className="text-xs">(Coming Soon)</span>
                          </span>
                        ) : (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-3 py-2 text-secondary hover:text-primary transition-colors duration-200 rounded-md hover:bg-accent"
                            onClick={toggleMenu}
                          >
                            {dropdownItem.name}
                          </a>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-secondary hover:text-primary transition-colors duration-200 rounded-md hover:bg-accent"
                  onClick={toggleMenu}
                >
                  {item.name}
                </a>
              )
            ))}
            <div className="px-3 py-2 md:hidden">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
