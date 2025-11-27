import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const CookieConsent = () => {
  const [show, setShow] = useState(false);
  const { language } = useLanguage();

  const texts = {
    en: { message: 'We use cookies for analytics.', privacy: 'Privacy', accept: 'Accept' },
    es: { message: 'Usamos cookies para análisis.', privacy: 'Privacidad', accept: 'Aceptar' },
    fr: { message: 'Nous utilisons des cookies pour l\'analyse.', privacy: 'Confidentialité', accept: 'Accepter' },
    pt: { message: 'Usamos cookies para análise.', privacy: 'Privacidade', accept: 'Aceitar' },
  };

  const t = texts[language as keyof typeof texts] || texts.en;

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'granted');
    setShow(false);
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-black/95 text-white p-4 z-50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center sm:text-left">
          {t.message}{' '}
          <a href="/privacy" className="underline hover:text-green-400 transition-colors">
            {t.privacy}
          </a>
        </p>
        <button 
          onClick={accept} 
          className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;

