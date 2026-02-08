import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { useNavigate, useLocation } from "react-router-dom";

interface DropdownItem {
  name: string;
  href: string;
  disabled?: boolean;
}

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleServicesDropdown = () =>
    setServicesDropdownOpen(!servicesDropdownOpen);

  // Scroll to top smoothly
  const scrollTopSmooth = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Scroll to element with fixed navbar offset
  const scrollToElementWithOffset = (element: Element) => {
    const navbar = document.querySelector("nav");
    const headerOffset = navbar?.getBoundingClientRect().height ?? 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset - 8;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  // Handle navigation with hash links
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    // Handle Home navigation with scroll-to-top
    if (href === "/") {
      if (location.pathname === "/") {
        // Already on home, just scroll to top
        scrollTopSmooth();
      } else {
        // Navigate to home, then scroll to top after render
        navigate("/");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => scrollTopSmooth()),
        );
      }
      setIsOpen(false);
      return;
    }

    // If it's a hash link
    if (href.startsWith("#")) {
      // If we're not on the home page, navigate to home with hash
      if (location.pathname !== "/") {
        // Navigate to home with the hash - the useEffect will handle scrolling
        navigate("/" + href);
      } else {
        // We're on home, just scroll to the section with offset
        const element = document.querySelector(href);
        if (element) {
          scrollToElementWithOffset(element);
          // Update URL to reflect the anchor (shareable)
          window.history.replaceState(null, "", "/#" + href.slice(1));
        }
      }
    } else {
      // Regular navigation
      navigate(href);
    }

    // Close mobile menu
    setIsOpen(false);
  };

  // Scroll detection for navbar styling and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (offset / windowHeight) * 100;

      setScrolled(offset > 50);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hash navigation after page load (cross-page navigation)
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    if (hash) {
      // Wait a bit for the page to render
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          scrollToElementWithOffset(element);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [location]);

  const navItems: NavItem[] = [
    { name: t.nav.home, href: "/" },
    {
      name: t.nav.services,
      href: "#services",
      hasDropdown: true,
      dropdownItems: [
        { name: t.services.dropdown.transfers, href: "/airports/cdg" },
        { name: t.services.dropdown.chauffeur, href: "/hourly" },
      ],
    },
    {
      name: "Airports",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "CDG (Charles de Gaulle)", href: "/airports/cdg" },
        { name: "Orly (ORY)", href: "/airports/orly" },
        { name: "Beauvais (BVA)", href: "/airports/beauvais" },
      ],
    },
    { name: t.nav.excursions, href: "/excursions" },
    { name: t.nav.events || "Events", href: "/events" },
    { name: t.nav.blog || "Blog", href: "/blog" },
    { name: t.nav.fleet, href: "#fleet" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-nav transition-all duration-500 translate-y-0 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-primary/10"
          : "bg-white/95 dark:bg-background/90 backdrop-blur-md shadow-sm border-b border-border"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-1 bg-gradient-gold transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 mr-4 lg:mr-6">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className={`text-lg sm:text-xl xl:text-2xl font-display font-bold transition-all duration-300 whitespace-nowrap ${
                scrolled ? "text-primary" : "text-secondary"
              }`}
            >
              Paris Elite Services
            </a>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-3 lg:space-x-4 xl:space-x-6 2xl:space-x-8 flex-1 min-w-0">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div key={item.name} className="relative group flex-shrink-0">
                  <button
                    className="text-secondary group-hover:text-primary transition-colors duration-200 font-medium flex items-center py-2 text-sm xl:text-base whitespace-nowrap"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                  >
                    {item.name} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div
                    className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <div className="rounded-md shadow-lg bg-background border border-border overflow-hidden">
                      {item.dropdownItems.map((dropdownItem) =>
                        dropdownItem.disabled ? (
                          <span
                            key={dropdownItem.name}
                            className="block px-4 py-2.5 text-sm text-muted-foreground/50 cursor-not-allowed"
                          >
                            {dropdownItem.name}{" "}
                            <span className="text-xs">(Coming Soon)</span>
                          </span>
                        ) : (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            onClick={(e) =>
                              handleNavClick(e, dropdownItem.href)
                            }
                            className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200"
                          >
                            {dropdownItem.name}
                          </a>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-secondary hover:text-primary transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap flex-shrink-0"
                >
                  {item.name}
                </a>
              ),
            )}
            <div className="ml-2 lg:ml-3 xl:ml-4 flex-shrink-0 flex-grow-0">
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
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slideDown">
          <div className="px-4 pt-2 pb-3 space-y-2">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div key={item.name}>
                  <button
                    className="flex items-center justify-between w-full px-3 py-2 text-secondary hover:text-primary transition-colors duration-200 rounded-md hover:bg-accent"
                    onClick={toggleServicesDropdown}
                  >
                    {item.name}
                    <ChevronDown
                      className={`h-4 w-4 transform ${servicesDropdownOpen ? "rotate-180" : ""} transition-transform`}
                    />
                  </button>
                  {servicesDropdownOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.dropdownItems.map((dropdownItem) =>
                        dropdownItem.disabled ? (
                          <span
                            key={dropdownItem.name}
                            className="block px-3 py-2 text-muted-foreground/50 cursor-not-allowed"
                          >
                            {dropdownItem.name}{" "}
                            <span className="text-xs">(Coming Soon)</span>
                          </span>
                        ) : (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-3 py-2 text-secondary hover:text-primary transition-colors duration-200 rounded-md hover:bg-accent"
                            onClick={(e) =>
                              handleNavClick(e, dropdownItem.href)
                            }
                          >
                            {dropdownItem.name}
                          </a>
                        ),
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-secondary hover:text-primary transition-colors duration-200 rounded-md hover:bg-accent"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              ),
            )}
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
