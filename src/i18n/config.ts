import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { pt } from "./pt";
import { versaillesTranslations } from "./versailles";
import { airportsTranslations } from "./airports";
import { loireTranslations } from "./loire";
import { champagneTranslations } from "./champagne";
import { givernyTranslations } from "./giverny";

// Combinar todas las traducciones
const resources = {
  en: {
    translation: {
      ...en,
      versailles: versaillesTranslations.en,
      loire: loireTranslations.en,
      champagne: champagneTranslations.en,
      giverny: givernyTranslations.en,
      airports: airportsTranslations.en,
    },
  },
  es: {
    translation: {
      ...es,
      versailles: versaillesTranslations.es,
      loire: loireTranslations.es,
      champagne: champagneTranslations.es,
      giverny: givernyTranslations.es,
      airports: airportsTranslations.es,
    },
  },
  fr: {
    translation: {
      ...fr,
      versailles: versaillesTranslations.fr,
      loire: loireTranslations.fr,
      champagne: champagneTranslations.fr,
      giverny: givernyTranslations.fr,
      airports: airportsTranslations.fr,
    },
  },
  pt: {
    translation: {
      ...pt,
      versailles: versaillesTranslations.pt,
      loire: loireTranslations.pt,
      champagne: champagneTranslations.pt,
      giverny: givernyTranslations.pt,
      airports: airportsTranslations.pt,
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr", // Idioma por defecto
    supportedLngs: ["en", "es", "fr", "pt"],

    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },

    react: {
      useSuspense: false,
    },
  });

// Función para cambiar el idioma y guardar la preferencia
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
  localStorage.setItem("i18nextLng", language);
};

export default i18n;
