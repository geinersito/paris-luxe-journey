import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/components/ui/use-toast';

export function LanguageChangeNotification() {
  const { language, t } = useLanguage();
  const prevLanguageRef = React.useRef(language);

  React.useEffect(() => {
    if (prevLanguageRef.current !== language) {
      const message = t.toast?.languageChanged || 'Language changed successfully';
      // Usar setTimeout para asegurar que el toast se muestre después de que el DOM se actualice
      setTimeout(() => {
        toast({
          title: message,
          duration: 2000,
        });
      }, 0);
      prevLanguageRef.current = language;
    }
  }, [language, t.toast?.languageChanged]);

  return null;
}
