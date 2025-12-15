'use client';

import React, { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set initial language and direction on mount
  useEffect(() => {
    // This will be handled by the LanguageProvider
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        {children}
      </div>
    </LanguageProvider>
  );
}
