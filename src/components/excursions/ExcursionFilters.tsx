import { useLanguage } from "@/contexts/LanguageContext";
import { DurationType, ExcursionType } from "@/types/excursions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExcursionFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDuration: DurationType | null;
  setSelectedDuration: (duration: DurationType | null) => void;
  selectedType: ExcursionType | null;
  setSelectedType: (type: ExcursionType | null) => void;
}

export function ExcursionFilters({
  searchQuery,
  setSearchQuery,
  selectedDuration,
  setSelectedDuration,
  selectedType,
  setSelectedType
}: ExcursionFiltersProps) {
  const { t } = useLanguage();
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDuration(null);
    setSelectedType(null);
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex-1">
        <Input
          type="text"
          placeholder={t.excursions.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="w-full md:w-48">
        <Select
          value={selectedDuration ?? ""}
          onValueChange={(value) => setSelectedDuration(value as DurationType || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t.excursions.filters.allDurations} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{t.excursions.filters.allDurations}</SelectItem>
            <SelectItem value="half-day">{t.excursions.filters.duration.halfDay}</SelectItem>
            <SelectItem value="full-day">{t.excursions.filters.duration.fullDay}</SelectItem>
            <SelectItem value="flexible">{t.excursions.filters.flexible}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-48">
        <Select
          value={selectedType ?? ""}
          onValueChange={(value) => setSelectedType(value as ExcursionType || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t.excursions.filters.allTypes} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{t.excursions.filters.allTypes}</SelectItem>
            <SelectItem value="standard">{t.excursions.filters.standard}</SelectItem>
            <SelectItem value="luxury">{t.excursions.filters.type.luxury}</SelectItem>
            <SelectItem value="private">{t.excursions.filters.type.private}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="ghost"
        onClick={handleClearFilters}
        className="whitespace-nowrap"
      >
        {t.excursions.filters.clearAll}
      </Button>
    </div>
  );
}