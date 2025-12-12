import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, Users, Star } from "lucide-react";

// Traducciones
const translations = {
  en: {
    title: "Premium Paris Experiences",
    filters: {
      allTypes: "All Types",
      privateTours: "Private Tours",
      vipExperiences: "VIP Experiences",
      allLocations: "All Locations",
      anyDuration: "Any Duration",
      halfDay: "Half Day",
      fullDay: "Full Day",
      search: "Search Experiences",
      refineSearch: "Refine Your Search",
      priceRange: "Price range",
      duration: "Duration",
      location: "Location",
      season: "Season",
      featured: "Featured",
      reviews: "reviews",
      viewDetails: "View Details",
      bookNow: "Book Now"
    }
  },
  fr: {
    title: "Expériences Premium à Paris",
    filters: {
      allTypes: "Tous les Types",
      privateTours: "Visites Privées",
      vipExperiences: "Expériences VIP",
      allLocations: "Toutes les Destinations",
      anyDuration: "Toute Durée",
      halfDay: "Demi-Journée",
      fullDay: "Journée Complète",
      search: "Rechercher",
      refineSearch: "Affiner la Recherche",
      priceRange: "Fourchette de prix",
      duration: "Durée",
      location: "Lieu",
      season: "Saison",
      featured: "En Vedette",
      reviews: "avis",
      viewDetails: "Voir les Détails",
      bookNow: "Réserver"
    }
  },
  es: {
    title: "Experiencias Premium en París",
    filters: {
      allTypes: "Todos los Tipos",
      privateTours: "Tours Privados",
      vipExperiences: "Experiencias VIP",
      allLocations: "Todas las Ubicaciones",
      anyDuration: "Cualquier Duración",
      halfDay: "Medio Día",
      fullDay: "Día Completo",
      search: "Buscar Experiencias",
      refineSearch: "Refinar Búsqueda",
      priceRange: "Rango de precio",
      duration: "Duración",
      location: "Ubicación",
      season: "Temporada",
      featured: "Destacado",
      reviews: "reseñas",
      viewDetails: "Ver Detalles",
      bookNow: "Reservar"
    }
  },
  pt: {
    title: "Experiências Premium em Paris",
    filters: {
      allTypes: "Todos os Tipos",
      privateTours: "Tours Privados",
      vipExperiences: "Experiências VIP",
      allLocations: "Todas as Localizações",
      anyDuration: "Qualquer Duração",
      halfDay: "Meio Dia",
      fullDay: "Dia Inteiro",
      search: "Buscar Experiências",
      refineSearch: "Refinar Busca",
      priceRange: "Faixa de preço",
      duration: "Duração",
      location: "Localização",
      season: "Estação",
      featured: "Destaque",
      reviews: "avaliações",
      viewDetails: "Ver Detalhes",
      bookNow: "Reservar"
    }
  }
};

// Tipos de experiencia
const experienceTypes = {
  CULTURAL: "cultural",
  GASTRONOMY: "gastronomy",
  ADVENTURE: "adventure",
  LUXURY: "luxury",
  HISTORICAL: "historical",
  PRIVATE: "private"
} as const;

// Tours data con mejoras
const sampleTours = [
  {
    id: 1,
    title: "Private Versailles Tour",
    description: "Experience the grandeur of Versailles Palace with our exclusive VIP access. Skip all lines and enjoy a personalized tour with an expert historian guide. Explore the Hall of Mirrors, Royal Apartments, and magnificent gardens. Optional Marie Antoinette Estate visit available.",
    image: "https://images.unsplash.com/photo-1624698343123-04444a0743ca?q=80&w=2070",
    rating: 4.9,
    reviews: 127,
    price: 990,
    featured: true,
    duration: "8 hours",
    type: [experienceTypes.CULTURAL, experienceTypes.HISTORICAL, experienceTypes.LUXURY],
    location: "Versailles",
    maxGroupSize: 6,
    languages: ["en", "fr", "es"],
    availability: {
      nextAvailable: "2025-03-01",
      spotsLeft: 2
    },
    highlights: [
      "Skip-the-line VIP access",
      "Private historian guide",
      "Luxury transport",
      "Gourmet lunch included"
    ]
  },
  {
    id: 2,
    title: "Gourmet Food Tour & Cooking Class",
    description: "Immerse yourself in French culinary excellence with this exclusive food tour and hands-on cooking class. Visit local markets, learn from a Michelin-trained chef, and master classic French dishes in a private kitchen.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
    rating: 4.8,
    reviews: 89,
    price: 450,
    featured: false,
    duration: "6 hours",
    type: [experienceTypes.GASTRONOMY, experienceTypes.CULTURAL],
    location: "Paris",
    maxGroupSize: 8,
    languages: ["en", "fr"],
    availability: {
      nextAvailable: "2025-02-28",
      spotsLeft: 4
    },
    highlights: [
      "Market visit with chef",
      "Hands-on cooking class",
      "Wine pairing",
      "Recipe collection"
    ],
    promotion: {
      type: "Early Bird",
      discount: 15,
      endsIn: "2d"
    }
  },
  {
    id: 3,
    title: "Loire Valley Castles",
    description: "Discover the magnificent Renaissance châteaux of the Loire Valley with private access. Visit Château de Chambord, explore Château de Chenonceau, and enjoy wine tasting at a local vineyard.",
    image: "/images/loire-valley.jpg",
    rating: 4.9,
    reviews: 42,
    price: 490,
    featured: true,
    duration: "10-12h",
    type: [experienceTypes.CULTURAL, experienceTypes.HISTORICAL, experienceTypes.LUXURY],
    location: "Loire Valley",
    maxGroupSize: 6,
    languages: ["en", "fr", "es"],
    availability: {
      nextAvailable: "2025-03-15",
      spotsLeft: 4
    },
    highlights: [
      "Visit to Château de Chambord",
      "Château de Chenonceau exploration",
      "Wine tasting at a local vineyard",
      "Gourmet lunch at a historic location"
    ]
  },
  {
    id: 8,
    title: "Champagne Region",
    description: "Experience the finest champagne houses with exclusive tastings and cellar tours. Visit prestigious champagne houses, enjoy private cellar tours, and participate in multiple champagne tastings.",
    image: "/images/champagne.jpg",
    rating: 4.8,
    reviews: 37,
    price: 420,
    featured: false,
    duration: "8h",
    type: [experienceTypes.GASTRONOMY, experienceTypes.LUXURY],
    location: "Champagne",
    maxGroupSize: 8,
    languages: ["en", "fr"],
    availability: {
      nextAvailable: "2025-03-12",
      spotsLeft: 6
    },
    highlights: [
      "Visit to prestigious champagne houses",
      "Private cellar tours",
      "Multiple champagne tastings",
      "Gourmet lunch in Épernay"
    ]
  },
  {
    id: 9,
    title: "Palace of Versailles",
    description: "Experience the grandeur of French royalty with exclusive access to the Palace of Versailles. Enjoy private early morning access to the Hall of Mirrors and guided tours of the Royal Apartments.",
    image: "/images/versailles.jpg",
    rating: 5.0,
    reviews: 56,
    price: 590,
    featured: true,
    duration: "8h",
    type: [experienceTypes.HISTORICAL, experienceTypes.LUXURY, experienceTypes.CULTURAL],
    location: "Versailles",
    maxGroupSize: 4,
    languages: ["en", "fr", "es", "pt"],
    availability: {
      nextAvailable: "2025-03-18",
      spotsLeft: 2
    },
    highlights: [
      "Private early morning access to Hall of Mirrors",
      "Royal Apartments guided tour",
      "Marie Antoinette's Estate visit",
      "Private gardens tour with fountain show"
    ]
  },
  {
    id: 10,
    title: "Giverny & Honfleur Private Tour",
    description: "Discover Monet's inspiration and the charm of Normandy's coast. Visit Monet's house and gardens privately, participate in an exclusive painting workshop, and explore Honfleur harbor.",
    image: "/images/giverny.jpg",
    rating: 4.7,
    reviews: 29,
    price: 680,
    featured: false,
    duration: "10h",
    type: [experienceTypes.CULTURAL, experienceTypes.HISTORICAL],
    location: "Normandy",
    maxGroupSize: 6,
    languages: ["en", "fr"],
    availability: {
      nextAvailable: "2025-03-20",
      spotsLeft: 5
    },
    highlights: [
      "Private visit to Monet's house and gardens",
      "Exclusive painting workshop",
      "Honfleur harbor exploration",
      "Seafood lunch at La Ferme Saint Siméon"
    ]
  }
];

const Excursions = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const tours = sampleTours;

  const [filters, setFilters] = useState({
    type: "all",
    location: "all",
    duration: "all"
  });

  const experienceTypeFilters = [
    { value: "all", label: t.filters.allTypes },
    { value: experienceTypes.CULTURAL, label: "Cultural" },
    { value: experienceTypes.GASTRONOMY, label: "Gastronomy" },
    { value: experienceTypes.ADVENTURE, label: "Adventure" },
    { value: experienceTypes.LUXURY, label: "Luxury" },
    { value: experienceTypes.HISTORICAL, label: "Historical" },
    { value: experienceTypes.PRIVATE, label: "Private" }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 12;
  const totalPages = Math.ceil(tours.length / toursPerPage);
  const currentTours = tours.slice(
    (currentPage - 1) * toursPerPage,
    currentPage * toursPerPage
  );

  const TourCard = ({ tour, t }) => (
    <div className={`glass-card-premium overflow-hidden hover:shadow-2xl transition-all duration-500 ${tour.featured ? 'ring-2 ring-primary' : ''}`}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-72 h-48 md:h-auto relative aspect-[4/3] md:aspect-auto">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          {tour.featured && (
            <div className="absolute top-4 left-4 bg-gradient-gold text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              {t.filters.featured}
            </div>
          )}
          {tour.promotion && (
            <div className="absolute top-4 right-4 bg-destructive text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              {tour.promotion.discount}% OFF
            </div>
          )}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
              {tour.duration}
            </div>
            <div className="bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
              {tour.maxGroupSize} max
            </div>
          </div>
        </div>

        <div className="p-8 flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-primary">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 font-semibold">{tour.rating}</span>
              <span className="text-gray-500 ml-1 text-sm">({tour.reviews} {t.filters.reviews})</span>
            </div>
            <div className="flex gap-2">
              {tour.languages.map(lang => (
                <span key={lang} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-md font-medium">
                  {lang.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <h3 className="text-2xl font-display font-bold text-secondary mb-3">{tour.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{tour.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {tour.highlights.map((highlight, index) => (
              <span key={index} className="text-xs px-3 py-1.5 bg-gradient-gold-subtle text-gray-700 rounded-lg font-medium">
                {highlight}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-primary/10">
            <div>
              {tour.availability.spotsLeft <= 3 && (
                <p className="text-destructive text-sm mb-1 font-semibold">
                  Only {tour.availability.spotsLeft} spots left!
                </p>
              )}
              <p className="text-sm text-gray-500">
                Next available: {new Date(tour.availability.nextAvailable).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-gold-subtle px-4 py-2 rounded-xl inline-block">
                <span className="text-3xl font-display font-bold text-primary">
                  {tour.price}€
                </span>
              </div>
              {tour.promotion && (
                <span className="text-sm text-destructive block mt-1 font-medium">
                  Ends in {tour.promotion.endsIn}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="button-outline-gold flex-1">
              {t.filters.viewDetails}
            </Button>
            <Button className="silk-button flex-1">
              {t.filters.bookNow}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-champagne">
      {/* Hero Section Premium */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073"
            alt="Paris Elite Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <p className="font-accent italic text-xl md:text-2xl text-primary-200 mb-4 text-center">
            Luxury Experiences
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-display font-bold text-center mb-12 leading-tight drop-shadow-2xl">
            {t.title}
          </h1>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto glass-card-premium p-6">
            <Select value={filters.type}>
              <SelectTrigger className="bg-white/95 border-primary/20 rounded-xl h-12">
                <SelectValue placeholder={t.filters.allTypes} />
              </SelectTrigger>
              <SelectContent>
                {experienceTypeFilters.map(filter => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.location}>
              <SelectTrigger className="bg-white/95 border-primary/20 rounded-xl h-12">
                <SelectValue placeholder={t.filters.allLocations} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.allLocations}</SelectItem>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="versailles">Versailles</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.duration}>
              <SelectTrigger className="bg-white/95 border-primary/20 rounded-xl h-12">
                <SelectValue placeholder={t.filters.anyDuration} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.anyDuration}</SelectItem>
                <SelectItem value="half">{t.filters.halfDay}</SelectItem>
                <SelectItem value="full">{t.filters.fullDay}</SelectItem>
              </SelectContent>
            </Select>

            <Button className="silk-button h-12 px-8">
              {t.filters.search}
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-6">{t.filters.refineSearch}</h2>
              
              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">{t.filters.priceRange}:</h3>
                <div className="space-y-4">
                  <input 
                    type="range" 
                    className="w-full"
                    min="0"
                    max="2000"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0€</span>
                    <span>2000€</span>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">{t.filters.duration}:</h3>
                <div className="space-y-2">
                  {["2-4 Hours", "Half Day", "Full Day", "Multi-Day"].map(duration => (
                    <label key={duration} className="flex items-center">
                      <Checkbox className="mr-2" />
                      <span className="text-sm">{duration}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">{t.filters.location}:</h3>
                <div className="space-y-2">
                  {["Paris", "Versailles", "Loire Valley", "Champagne"].map(location => (
                    <label key={location} className="flex items-center">
                      <Checkbox className="mr-2" />
                      <span className="text-sm">{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Season */}
              <div>
                <h3 className="font-medium mb-4">{t.filters.season}:</h3>
                <div className="space-y-2">
                  {["Spring", "Summer", "Autumn", "Winter"].map(season => (
                    <label key={season} className="flex items-center">
                      <Checkbox className="mr-2" />
                      <span className="text-sm">{season}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tours List */}
          <div className="flex-1">
            <div className="space-y-6">
              {currentTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-8 gap-2">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="flex items-center px-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Excursions;
