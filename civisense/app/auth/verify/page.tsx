'use client';

import { Suspense } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import Image from "next/image";
import { VerifyHero } from '@/components/auth/AuthHero';
import VerifyOtpForm from '@/components/form/VerifyOTPForm';

export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-12 flex items-center justify-center">
        <Suspense fallback={
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-full flex justify-center my-4">
                <Image
                  src="/logo1.png"
                  alt="Velo Logo"
                  width={100}
                  height={50}
                  className="w-16 2xl:w-20"
                />
              </div>
              <CardTitle className="text-2xl font-bold">Loading...</CardTitle>
            </CardHeader>
          </Card>
        }>
          <VerifyOtpForm />
        </Suspense>
      </div>

      {/* Right side - Hero Section */}
      <VerifyHero />
    </div>
  );
}