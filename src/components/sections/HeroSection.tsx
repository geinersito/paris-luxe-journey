import React from "react";
import BookingForm from "../BookingForm";
import { CompactBookingForm } from "../booking/CompactBookingForm";
import MobileStickyCTA from "../MobileStickyCTA";
import { useLanguage } from "@/contexts/LanguageContext";

// Optimized image URLs with different sizes for responsive loading
const HERO_IMAGE_BASE =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34";
const HERO_IMAGE_SMALL = `${HERO_IMAGE_BASE}?auto=format&fit=crop&q=80&w=640`;
const HERO_IMAGE_MEDIUM = `${HERO_IMAGE_BASE}?auto=format&fit=crop&q=80&w=1280`;
const HERO_IMAGE_LARGE = `${HERO_IMAGE_BASE}?auto=format&fit=crop&q=80&w=1920`;

/**
 * Normalize compact form data to BookingForm format.
 * CompactBookingForm now emits SSOT location codes from DB, so we only trim values.
 */
function normalizeCompactPrefill(
  data: { pickup: string; dropoff: string; passengers: string } | null,
): { pickup: string; dropoff: string; passengers: string } | undefined {
  if (!data) return undefined;

  return {
    pickup: data.pickup.trim(),
    dropoff: data.dropoff.trim(),
    passengers: data.passengers,
  };
}

export default function HeroSection() {
  const { t } = useLanguage();
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const [showBookingModal, setShowBookingModal] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const [prefilledData, setPrefilledData] = React.useState<{
    pickup: string;
    dropoff: string;
    passengers: string;
  } | null>(null);
  const [showStickyCTA, setShowStickyCTA] = React.useState(false);
  const widgetRef = React.useRef<HTMLDivElement>(null);

  // Parallax effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use Intersection Observer for lazy loading
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsImageLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px" },
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track hero widget visibility for mobile sticky CTA
  React.useEffect(() => {
    const node = widgetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCTA(!entry.isIntersecting);
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="booking"
      className="relative flex items-center justify-center py-12 md:py-16 lg:py-24 overflow-hidden"
      style={{ minHeight: "540px" }}
    >
      {/* Optimized background image with responsive srcset and parallax */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src={HERO_IMAGE_MEDIUM}
          srcSet={`${HERO_IMAGE_SMALL} 640w, ${HERO_IMAGE_MEDIUM} 1280w, ${HERO_IMAGE_LARGE} 1920w`}
          sizes="100vw"
          alt="Paris Elite Services - Luxury Transportation"
          loading="eager"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            objectPosition: "center 15%",
            transform: `scaleX(-1) translateY(${scrollY * 0.5}px)`,
            willChange: "transform",
          }}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      {/* Premium Cinematic Overlay with Multi-Stop Gradient */}
      <div className="absolute inset-0 overlay-cinematic z-10" />

      {/* Subtle Gold Accent Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 z-10" />

      <div className="container relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left column — headline + subtitle */}
          <div
            className={`lg:col-span-6 text-center lg:text-left transition-all duration-1000 ${
              isImageLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-4 leading-tight text-white text-shadow-gold animate-fadeInUp"
              style={{
                animationDelay: "0.2s",
                animationFillMode: "both",
                textShadow:
                  "0 2px 20px hsl(45 93% 47% / 0.4), 0 4px 40px hsl(45 93% 47% / 0.2)",
              }}
            >
              {t.hero.title}
            </h1>

            <p
              className="text-base md:text-lg lg:text-xl text-white/95 font-medium max-w-3xl mx-auto lg:mx-0 leading-relaxed mb-0 animate-fadeInUp"
              style={{
                animationDelay: "0.4s",
                animationFillMode: "both",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              {t.hero.subtitle}
            </p>

            <p
              className="mt-3 text-sm md:text-base text-white/90 max-w-3xl mx-auto lg:mx-0 animate-fadeInUp"
              style={{
                animationDelay: "0.5s",
                animationFillMode: "both",
                textShadow: "0 2px 8px rgba(0,0,0,0.45)",
              }}
            >
              {t.hero.proofline}
            </p>

            <p
              className="mt-2 text-sm md:text-base font-semibold text-white animate-fadeInUp"
              style={{
                animationDelay: "0.55s",
                animationFillMode: "both",
                textShadow: "0 2px 8px rgba(0,0,0,0.45)",
              }}
            >
              {t.hero.langProof}
            </p>

            <ul
              className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start animate-fadeInUp"
              style={{ animationDelay: "0.6s", animationFillMode: "both" }}
            >
              {[t.hero.bullet1, t.hero.bullet2, t.hero.bullet3].map(
                (bullet) => (
                  <li
                    key={bullet}
                    className="text-xs md:text-sm text-white/95 bg-white/15 border border-white/25 rounded-full px-3 py-1.5 backdrop-blur-sm"
                  >
                    {bullet}
                  </li>
                ),
              )}
            </ul>

            <div
              className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start animate-fadeInUp"
              style={{ animationDelay: "0.65s", animationFillMode: "both" }}
            >
              <button
                type="button"
                onClick={() => setShowBookingModal(true)}
                className="silk-button px-5 py-2.5 text-sm md:text-base"
              >
                {t.hero.ctaPrimary}
              </button>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-2.5 text-sm md:text-base text-white hover:bg-white/20 transition-colors"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Right column — booking widget */}
          <div
            ref={widgetRef}
            className="lg:col-span-6 animate-scaleIn"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            <CompactBookingForm
              onOpenFullForm={(data) => {
                setPrefilledData(data);
                setShowBookingModal(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Booking Modal - FUERA del contenedor para z-index correcto */}
      {showBookingModal && (
        <div
          className="fixed inset-0 z-modal-overlay flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-300"
          onClick={() => setShowBookingModal(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header fijo con botón de cerrar */}
            <div className="px-6 md:px-8 py-5 flex items-center justify-between border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-primary/5 to-transparent rounded-t-3xl">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">
                {t.booking.title || "Réservez Votre Transfert"}
              </h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-all duration-200 p-2 hover:bg-gray-100 rounded-full hover:scale-110"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Contenido scrollable con scrollbar estilizado */}
            <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
              <div className="p-6 md:p-8 bg-white">
                <BookingForm
                  key={prefilledData ? JSON.stringify(prefilledData) : "empty"}
                  tourId="default"
                  tourName="Standard Transfer"
                  basePrice={0}
                  compact={true}
                  initialData={normalizeCompactPrefill(prefilledData)}
                  onSubmit={async () => {
                    setShowBookingModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <MobileStickyCTA
        label={t.hero.ctaPrimary || t.hero.getInstantQuote}
        onClick={() => setShowBookingModal(true)}
        isVisible={showStickyCTA}
      />

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg
          className="relative block w-full h-[10px]"
          viewBox="0 0 1200 30"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 C300,0 600,30 1200,15 L1200,30 L0,30 Z"
            fill="white"
            style={{ opacity: "0.9" }}
          />
        </svg>
      </div>
    </section>
  );
}
