import React from 'react';
import BookingForm from "../BookingForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80';

export default function HeroSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  
  React.useEffect(() => {
    const img = new Image();
    img.src = HERO_IMAGE_URL;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  const handleBookingSubmit = async (bookingDetails: any) => {
    try {
      // Calcular precio final en base al precio dinámico de Supabase
      const basePrice = bookingDetails.basePrice || 0;
      const luggageSurcharge = bookingDetails.luggageSurcharge || 0;
      
      console.log('HeroSection - Datos de reserva:', bookingDetails);
      console.log('HeroSection - Precio base calculado:', basePrice);
      
      // Calcular el precio estimado: duplicado si es ida y vuelta + recargo por equipaje
      const estimatedPrice = (bookingDetails.tripType === 'round_trip' ? basePrice * 2 : basePrice) + luggageSurcharge;
      
      console.log('HeroSection - Precio estimado final:', estimatedPrice);
      
      navigate("/booking/details", {
        state: {
          bookingData: bookingDetails,
          estimatedPrice: estimatedPrice
        }
      });
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
    }
  };
  
  return (
    <section className="min-h-screen relative flex items-center justify-center py-24 lg:py-32 overflow-hidden">
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url('${HERO_IMAGE_URL}')`,
          backgroundPosition: "center 15%",
          transform: "scaleX(-1)"
        }}
      />
      
      <div 
        className={`absolute inset-0 bg-black/50 z-10 transition-opacity duration-1000 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`} 
      />
      
      <div className="container relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div 
          className={`text-white max-w-xl text-center lg:text-left w-full lg:w-1/2 transition-opacity duration-1000 ${
            isImageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display mb-4 leading-tight text-[#9b87f5]">
            {t.hero.title}
          </h1>
          <p className="text-base md:text-lg opacity-90 leading-relaxed">
            {t.hero.subtitle}
          </p>
        </div>
        
        <div 
          className={`w-full lg:w-1/2 max-w-lg mx-auto transition-opacity duration-1000 ${
            isImageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <BookingForm
            tourId="default"
            tourName="Standard Transfer"
            basePrice={0} // Usar 0 para permitir que el cálculo dinámico funcione
            onSubmit={handleBookingSubmit}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg 
          className="relative block w-full h-[10px]" 
          viewBox="0 0 1200 30" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,20 C300,0 600,30 1200,15 L1200,30 L0,30 Z" 
            fill="white"
            style={{opacity: '0.9'}}
          />
        </svg>
      </div>
    </section>
  );
}
