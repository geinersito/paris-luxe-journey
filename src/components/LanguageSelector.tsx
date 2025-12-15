import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";
import type { Language } from "@/types/i18n";

const languages: Array<{ code: Language; name: string; flag: string }> = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const { setLanguage } = useLanguage();

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
  };

  const currentLanguage = useMemo(
    () => languages.find((lang) => lang.code === i18n.language),
    [i18n.language],
  );

  if (!currentLanguage) return null;

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue>{currentLanguage.name}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem
            key={language.code}
            value={language.code}
            className="cursor-pointer"
          >
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
