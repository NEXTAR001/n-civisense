'use client';

import { LoginHero } from "@/components/auth/AuthHero";
import LoginForm from '../LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <LoginForm />
      
      {/* Right side - Hero Section */}
      <LoginHero />
    </div>
  );
}
