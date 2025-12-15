'use client';

import UserDashboard from '@/app/landing/dashboard/UserDashboard';
import { LanguageProvider } from '@/app/landing/context/LanguageContext';

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <UserDashboard />
      </div>
    </LanguageProvider>
  );
}
