import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleServicesDropdown = () => setServicesDropdownOpen(!servicesDropdownOpen);

  const navItems = [
    { name: t.nav.home, href: "/" },
    { 
      name: t.nav.services, 
      href: "#services",
      hasDropdown: true,
      dropdownItems: [
        { name: t.services.dropdown.transfers, href: "#transfers" },
        { name: t.services.dropdown.chauffeur, href: "#chauffeur" },
        { name: t.services.dropdown.excursions, href: "/excursions" }
      ]
    },
    { name: t.nav.fleet, href: "#fleet" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav className="fixed w-full bg-background/95 dark:bg-background/90 backdrop-blur-md z-50 shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-xl sm:text-2xl font-sans font-semibold text-primary hover:text-primary/90 transition-colors"
            >
              Paris Elite Services
            </a>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div key={item.name} className="relative group">
                  <button
                    className="text-foreground/90 group-hover:text-primary transition-colors duration-200 font-medium flex items-center py-2"
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
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200"
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/90 hover:text-primary transition-colors duration-200 font-medium"
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
                    className="flex items-center justify-between w-full px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 rounded-md hover:bg-accent"
                    onClick={toggleServicesDropdown}
                  >
                    {item.name}
                    <ChevronDown className={`h-4 w-4 transform ${servicesDropdownOpen ? 'rotate-180' : ''} transition-transform`} />
                  </button>
                  {servicesDropdownOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 rounded-md hover:bg-accent"
                          onClick={toggleMenu}
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 rounded-md hover:bg-accent"
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
