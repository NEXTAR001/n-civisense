"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ForgotPasswordHero } from "@/components/auth/AuthHero";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const router = useRouter();
  
    const SubmitForgotPasswordForm = () => {
      router.push('/auth/reset');
    }
  
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-5 md:p-12 flex items-center justify-center">
        <Card className="w-full md:max-w-xs xl:max-w-sm 2xl:max-w-md">
          <CardHeader className="text-center">
            <div className="w-full flex justify-center my-2 xl:my-4">
              <Image
                src="/logo1.png"
                alt="Velo Logo"
                width={100}
                height={50}
                className="w-16 2xl:w-20"
              />
            </div>
            <CardTitle className="text-lg 2xl:text-2xl font-bold pt-0 mt-0">Forgot Password</CardTitle>
            <p className="text-xs md:text-[10px] 2xl:text-sm text-gray-500">
              Enter your email to receive a password reset link
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-3 2xl:space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs 2xl:text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <Button type="submit" onClick={SubmitForgotPasswordForm} className="w-full bg-[#16A34A] hover:bg-[#0e7a36] text-white text-xs 2xl:text-sm">
                Send Reset Link
              </Button>
            </form>
            <div className="mt-5 2xl:mt-7 text-center text-gray-500 text-xs 2xl:text-sm">
              Remember your password?{' '}
              <Link
                href="/auth/login"
                className="text-xs 2xl:text-sm text-[#16A34A] hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Hero Section */}
      <ForgotPasswordHero />
    </div>
  );
}
