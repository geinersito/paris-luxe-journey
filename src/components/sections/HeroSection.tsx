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
      navigate("/booking/details", {
        state: {
          bookingData: bookingDetails,
          estimatedPrice: bookingDetails.tripType === 'round_trip' 
            ? bookingDetails.basePrice * 2 
            : bookingDetails.basePrice
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
            basePrice={80}
            onSubmit={handleBookingSubmit}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg 
          className="relative block w-full h-[50px] text-background" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-current"
          />
        </svg>
      </div>
    </section>
  );
}
