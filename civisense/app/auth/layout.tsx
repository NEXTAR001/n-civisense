'use client';

import { LanguageProvider } from '../landing/context/LanguageContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
