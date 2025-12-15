'use client';

import LoginForm from './LoginForm';
import { LoginHero } from "@/components/auth/AuthHero";

export default function LoginClient() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <LoginForm />
      
      {/* Right side - Hero Section */}
      <LoginHero />
    </div>
  );
}
