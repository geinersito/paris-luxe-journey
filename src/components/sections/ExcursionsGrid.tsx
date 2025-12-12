
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Euro, Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { excursions } from "@/data/excursions";
import { DurationType, ExcursionType } from "@/types/excursions";

const ExcursionsGrid = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ExcursionType | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDuration(null);
    setSelectedType(null);
    setSelectedPriceRange(null);
  };

  const priceRanges = [
    { min: 0, max: 300 },
    { min: 301, max: 500 },
    { min: 501, max: 1000 },
    { min: 1001, max: Infinity },
  ];

  const filteredExcursions = excursions.filter((excursion) => {
    const matchesSearch = excursion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         excursion.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDuration = !selectedDuration || excursion.durationType === selectedDuration;
    const matchesType = !selectedType || excursion.type === selectedType;
    const matchesPrice = !selectedPriceRange || 
      (excursion.price >= priceRanges[selectedPriceRange].min && 
       excursion.price <= priceRanges[selectedPriceRange].max);

    return matchesSearch && matchesDuration && matchesType && matchesPrice;
  });

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-6">
          {/* Search and filters container */}
          <div className="space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t.excursions.searchPlaceholder}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select 
                value={selectedDuration || "all"} 
                onValueChange={(value) => setSelectedDuration(value === "all" ? null : value as DurationType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.excursions.filters.allDurations} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.excursions.filters.allDurations}</SelectItem>
                  <SelectItem value="half-day">{t.excursions.filters.duration.halfDay}</SelectItem>
                  <SelectItem value="full-day">{t.excursions.filters.duration.fullDay}</SelectItem>
                  <SelectItem value="flexible">{t.excursions.filters.flexible}</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedType || "all"}
                onValueChange={(value) => setSelectedType(value === "all" ? null : value as ExcursionType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.excursions.filters.allTypes} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.excursions.filters.allTypes}</SelectItem>
                  <SelectItem value="standard">{t.excursions.filters.standard}</SelectItem>
                  <SelectItem value="luxury">{t.excursions.filters.type.luxury}</SelectItem>
                  <SelectItem value="private">{t.excursions.filters.type.private}</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={selectedPriceRange !== null ? selectedPriceRange.toString() : "all"} 
                onValueChange={(value) => setSelectedPriceRange(value === "all" ? null : parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.excursions.filters.price} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.excursions.filters.allPrices}</SelectItem>
                  {priceRanges.map((range, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {range.max === Infinity 
                        ? `${t.excursions.filters.above} ${range.min}€`
                        : `${range.min}€ - ${range.max}€`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear filters button */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-muted-foreground hover:text-primary"
              >
                {t.excursions.filters.clearAll}
              </Button>
            </div>
          </div>
        </div>

        {/* Excursions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExcursions.map((excursion) => (
            <Card key={excursion.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link to={excursion.link} className="block">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={excursion.image}
                    alt={excursion.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-primary/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                      {t.excursions.types[excursion.type] || excursion.type}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-display">{excursion.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {excursion.description}
                  </CardDescription>
                </CardHeader>
              </Link>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{excursion.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Euro className="w-4 h-4" />
                    <span>
                      {t.excursions.fromPrice.replace('{price}', excursion.price.toString())}
                    </span>
                  </div>
                </div>

                {/* Highlights section */}
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-foreground">
                    {t.excursions.highlights}
                  </h4>
                  <ul className="text-sm space-y-1.5">
                    {excursion.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary text-xs mt-1">●</span>
                        <span className="text-muted-foreground text-xs leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tour options preview */}
                {excursion.tours.length > 1 && (
                  <div className="mt-4 pt-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">
                        {t.excursions.tourOptionsCount.replace('{count}', excursion.tours.length.toString())}
                      </span>
                      <span className="mx-1">·</span>
                      <span>
                        {t.excursions.fromPrice.replace(
                          '{price}', 
                          Math.min(...excursion.tours.map(t => t.price)).toString()
                        )}
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link to={excursion.link}>{t.excursions.viewDetails}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No results message */}
        {filteredExcursions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t.excursions.noResults}</p>
            <Button
              variant="link"
              onClick={handleClearFilters}
              className="mt-2"
            >
              {t.excursions.clearFilters}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExcursionsGrid;
