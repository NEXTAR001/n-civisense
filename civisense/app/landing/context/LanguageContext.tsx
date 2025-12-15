'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { LanguageCode, languages, defaultLanguage } from '@/app/landing/config/languages';

type LanguageContextType = {
  language: string;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
  currentLanguage: typeof languages[LanguageCode];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(defaultLanguage);

  // Load saved language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageCode | null;
    if (savedLanguage && languages[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (newLanguage: LanguageCode) => {
    if (languages[newLanguage]) {
      setLanguageState(newLanguage);
      localStorage.setItem('language', newLanguage);
      document.documentElement.lang = newLanguage;
      // Force LTR direction for all languages
      document.documentElement.dir = 'ltr';
    }
  };

  // Translation function
  const t = (key: string) => {
    return languages[language]?.translations[key as keyof typeof languages[LanguageCode]['translations']] || key;
  };

  return (
    <LanguageContext.Provider 
      value={{
        language,
        setLanguage,
        t,
        currentLanguage: languages[language]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
