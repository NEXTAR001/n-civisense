'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../landing/context/LanguageContext";
import { authTranslations } from "./translations";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const { t } = useLanguage();
  const trans = authTranslations.login;
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Signin failed');
      }

      // TODO: Store auth token/session data if returned
      // localStorage.setItem('token', data.token);
      
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signin');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full md:w-1/2 p-5 md:p-12 flex items-center justify-center">
      <Card className="w-full md:max-w-xs xl:max-w-sm 2xl:max-w-md">
        <CardHeader className="text-center">
          <div className="w-full flex justify-center my-2 xl:my-4">
            {/* <Image
              src="/logo1.png"
              alt="Velo Logo"
              width={100}
              height={50}
              className="w-16 2xl:w-20"
            /> */}
            <h1>Logo goes here</h1>
          </div>
          <CardTitle className="text-lg 2xl:text-2xl font-bold pt-0 mt-0">
            {t(trans.title)}
          </CardTitle>
          <p className="text-xs md:text-[10px] 2xl:text-sm text-gray-500">
            {t(trans.subtitle)}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3 2xl:space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded text-xs">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs 2xl:text-sm font-medium">
                {t(trans.email)}
              </label>
              <Input
                id="email"
                type="email"
                placeholder={t(trans.emailPlaceholder)}
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs 2xl:text-sm font-medium">
                  {t(trans.password)}
                </label>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex items-end justify-end">
              <Link
                href="/auth/forgot"
                className="text-xs 2xl:text-sm text-[#16A34A] hover:underline"
              >
                {t(trans.forgotPassword)}
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#16A34A] hover:bg-[#0e7a36] text-white text-xs 2xl:text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : t(trans.signIn)}
            </Button>
          </form>
          <div className="mt-5 2xl:mt-7 text-center text-gray-500 text-xs 2xl:text-sm">
            {t(trans.noAccount)}{' '}
            <Link href="/auth/signup" className="hover:underline text-[#16A34A] font-medium">
              {t(trans.signUp)}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
