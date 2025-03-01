
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Euro, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Season = "spring" | "summer" | "autumn" | "winter";
type ExcursionType = "cultural" | "gastronomy" | "nature";

interface Destination {
  id: number;
  image: string;
  titleKey: string;
  descriptionKey: string;
  duration: string;
  priceFrom: number;
  type: ExcursionType;
  seasons: Season[];
}

const destinations: Destination[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
    titleKey: "Versailles",
    descriptionKey: "Explore el magnífico Palacio de Versalles, sus jardines y el Trianón",
    duration: "8h",
    priceFrom: 299,
    type: "cultural",
    seasons: ["spring", "summer", "autumn"],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    titleKey: "Valle del Loira",
    descriptionKey: "Descubra los castillos más hermosos del Valle del Loira",
    duration: "12h",
    priceFrom: 399,
    type: "cultural",
    seasons: ["spring", "summer", "autumn"],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    titleKey: "Monte Saint-Michel",
    descriptionKey: "Visite la icónica abadía y explore este lugar Patrimonio de la Humanidad",
    duration: "14h",
    priceFrom: 449,
    type: "cultural",
    seasons: ["spring", "summer", "autumn", "winter"],
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    titleKey: "Champagne",
    descriptionKey: "Deguste los mejores champagnes en las bodegas más prestigiosas",
    duration: "10h",
    priceFrom: 349,
    type: "gastronomy",
    seasons: ["spring", "summer", "autumn"],
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    titleKey: "Giverny",
    descriptionKey: "Visite los jardines que inspiraron las obras maestras de Monet",
    duration: "6h",
    priceFrom: 249,
    type: "nature",
    seasons: ["spring", "summer"],
  },
];

const durations = ["4h", "6h", "8h", "10h", "12h", "14h"];
const types: ExcursionType[] = ["cultural", "gastronomy", "nature"];
const seasons: Season[] = ["spring", "summer", "autumn", "winter"];
const priceRanges = [
  { min: 0, max: 250 },
  { min: 251, max: 350 },
  { min: 351, max: 450 },
  { min: 451, max: Infinity },
];

const ExcursionsGrid = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ExcursionType | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = destination.titleKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.descriptionKey.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDuration = !selectedDuration || destination.duration === selectedDuration;
    const matchesType = !selectedType || destination.type === selectedType;
    const matchesSeason = !selectedSeason || destination.seasons.includes(selectedSeason);
    const matchesPrice = !selectedPriceRange || 
      (destination.priceFrom >= priceRanges[selectedPriceRange].min && 
       destination.priceFrom <= priceRanges[selectedPriceRange].max);

    return matchesSearch && matchesDuration && matchesType && matchesSeason && matchesPrice;
  });

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-6">
          {/* Barra de búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar destinos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={selectedDuration || "all"} onValueChange={(value) => setSelectedDuration(value === "all" ? null : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Duración" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las duraciones</SelectItem>
                {durations.map((duration) => (
                  <SelectItem key={duration} value={duration}>
                    {duration}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType || "all"} onValueChange={(value) => setSelectedType(value === "all" ? null : value as ExcursionType)}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSeason || "all"} onValueChange={(value) => setSelectedSeason(value === "all" ? null : value as Season)}>
              <SelectTrigger>
                <SelectValue placeholder="Temporada" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las temporadas</SelectItem>
                {seasons.map((season) => (
                  <SelectItem key={season} value={season}>
                    {season.charAt(0).toUpperCase() + season.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={selectedPriceRange !== null ? selectedPriceRange.toString() : "all"} 
              onValueChange={(value) => setSelectedPriceRange(value === "all" ? null : parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Rango de precios" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los precios</SelectItem>
                {priceRanges.map((range, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {range.max === Infinity 
                      ? `Más de ${range.min}€`
                      : `${range.min}€ - ${range.max}€`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid de destinos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <Card key={destination.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.titleKey}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-display">{destination.titleKey}</CardTitle>
                <CardDescription className="text-sm">
                  {destination.descriptionKey}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Euro className="w-4 h-4" />
                    <span>Desde {destination.priceFrom}€</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Más información
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No se encontraron destinos que coincidan con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExcursionsGrid;
