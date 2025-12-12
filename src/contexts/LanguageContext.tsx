import React, { memo } from 'react';
import { Language, Translation } from '@/types/i18n';
import { en } from '@/i18n/en';
import { fr } from '@/i18n/fr';
import { es } from '@/i18n/es';
import { pt } from '@/i18n/pt';
import { useTranslation } from 'react-i18next';

// Definición del tipo para el contexto
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

// Traducciones disponibles
const translations: Record<Language, Translation> = {
  en,
  fr,
  es,
  pt,
};

// Mapeo de países a idiomas
const languagesByCountry: Record<string, Language> = {
  US: 'en',
  GB: 'en',
  FR: 'fr',
  ES: 'es',
  MX: 'es',
  PT: 'pt',
  BR: 'pt',
};

// Crear el contexto
const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

// Props del provider
interface LanguageProviderProps {
  children: React.ReactNode;
}

// Memoized children wrapper to prevent unnecessary re-renders
const MemoizedChildren = memo(({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
});
MemoizedChildren.displayName = 'MemoizedLanguageChildren';

// Componente Provider
export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = React.useState<Language>(() => {
    try {
      const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
      return savedLanguage && translations[savedLanguage] ? savedLanguage : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = React.useCallback((newLanguage: Language) => {
    if (newLanguage !== language && translations[newLanguage]) {
      setLanguageState(newLanguage);
      try {
        localStorage.setItem('preferredLanguage', newLanguage);
      } catch (error) {
        console.error('Error saving language preference:', error);
      }
      i18n.changeLanguage(newLanguage);
    }
  }, [i18n, language]);

  const value = React.useMemo(() => ({
    language,
    setLanguage,
    t: translations[language]
  }), [language, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      <MemoizedChildren>{children}</MemoizedChildren>
    </LanguageContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useLanguage(): LanguageContextType {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}