
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const ExcursionsHero = () => {
  const { t } = useLanguage();
  
  return (
    <section
      className="min-h-screen relative flex items-center justify-center py-24 lg:py-32 overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80')",
          backgroundPosition: "center",
        }}
      />
      
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 text-white animate-fadeIn">
            {t.excursions.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fadeIn delay-100 leading-relaxed">
            {t.excursions.subtitle}
          </p>
          <Button 
            size="lg"
            className="silk-button animate-fadeIn delay-200 hover:scale-105 transform transition-all duration-200"
          >
            {t.excursions.cta}
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg 
          className="relative block w-full h-12 sm:h-16" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-background/90"
          />
        </svg>
      </div>
    </section>
  );
};

export default ExcursionsHero;
