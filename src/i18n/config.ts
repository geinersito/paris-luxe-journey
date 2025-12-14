import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { pt } from './pt';
import { versaillesTranslations } from './versailles';
import { airportsTranslations } from './airports';

// Combinar todas las traducciones
const resources = {
  en: {
    translation: {
      ...en,
      versailles: versaillesTranslations.en,
      airports: airportsTranslations.en
    }
  },
  es: {
    translation: {
      ...es,
      versailles: versaillesTranslations.es,
      airports: airportsTranslations.es
    }
  },
  fr: {
    translation: {
      ...fr,
      versailles: versaillesTranslations.fr,
      airports: airportsTranslations.fr
    }
  },
  pt: {
    translation: {
      ...pt,
      versailles: versaillesTranslations.pt,
      airports: airportsTranslations.pt
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr', // Idioma por defecto
    supportedLngs: ['en', 'es', 'fr', 'pt'],
    
    interpolation: {
      escapeValue: false // React ya escapa por defecto
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    react: {
      useSuspense: false
    }
  });

// Función para cambiar el idioma y guardar la preferencia
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
  localStorage.setItem('i18nextLng', language);
};

export default i18n;
