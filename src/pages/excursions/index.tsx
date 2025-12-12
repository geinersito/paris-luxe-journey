import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ExcursionCard } from "@/components/excursions/ExcursionCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const excursions = [
  {
    id: "versailles",
    title: "Versailles",
    description: "Explore el magnífico Palacio de Versalles, sus jardines y el Trianón",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
    duration: "8h",
    price: 299,
    link: "/excursions/versailles"
  },
  // Más excursiones aquí...
];

export default function ExcursionsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedType, setSelectedType] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder={t('excursions.search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-1/3"
            />
            
            <Select
              value={selectedDuration}
              onValueChange={setSelectedDuration}
            >
              <SelectTrigger className="md:w-1/4">
                <SelectValue placeholder={t('excursions.search.duration')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="half-day">{t('excursions.filters.duration.halfDay')}</SelectItem>
                <SelectItem value="full-day">{t('excursions.filters.duration.fullDay')}</SelectItem>
                <SelectItem value="multi-day">{t('excursions.filters.duration.multiDay')}</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedType}
              onValueChange={setSelectedType}
            >
              <SelectTrigger className="md:w-1/4">
                <SelectValue placeholder={t('excursions.search.type')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">{t('excursions.filters.type.private')}</SelectItem>
                <SelectItem value="group">{t('excursions.filters.type.group')}</SelectItem>
                <SelectItem value="luxury">{t('excursions.filters.type.luxury')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid de excursiones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {excursions.map((excursion) => (
              <ExcursionCard
                key={excursion.id}
                id={excursion.id}
                title={excursion.title}
                description={excursion.description}
                image={excursion.image}
                duration={excursion.duration}
                price={excursion.price}
                link={excursion.link}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
