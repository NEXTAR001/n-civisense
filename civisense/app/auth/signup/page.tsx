'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SignupHero } from "@/components/auth/AuthHero";
import Link from "next/link";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  const SubmitSignUpForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          full_name: `${formData.firstName} ${formData.lastName}`,
          password: formData.password,
          confirm_password: formData.confirmPassword
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Signup failed');
      }

      // Success - redirect to verify page
      router.push('/verify');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

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
            <CardTitle className="text-lg 2xl:text-2xl font-bold pt-0 mt-0">Create an Account</CardTitle>
            <p className="text-xs md:text-[10px] 2xl:text-sm text-gray-500">
              Join our community to track rides, save routes, and connect with fellow cyclists.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={SubmitSignUpForm} className="space-y-3 2xl:space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded text-xs">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-xs 2xl:text-sm font-medium">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-xs 2xl:text-sm font-medium">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs 2xl:text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-xs 2xl:text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-xs 2xl:text-sm font-medium">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#16A34A] hover:bg-[#0e7a36] text-white text-xs 2xl:text-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
              <div className="flex items-center gap-3 justify-center">
                <div className="border-b border-b-gray-300 w-full" />
                <h1 className="text-gray-400 text-sm">Or</h1>
                <div className="border-b border-b-gray-300 w-full" />
              </div>
              <Button onClick={SubmitSignUpForm} type="submit" className="w-full bg-white text-black border border-gray-300 text-xs 2xl:text-sm">
                <Image src="/google-logo.png" alt="Google Logo" width={16} height={16} className="inline-block mr-2 mb-0.5 size-4"/>
                {' '} Continue with Google
              </Button>
            </form>
            <div className="mt-5 2xl:mt-7 text-center text-gray-500 text-xs 2xl:text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-xs 2xl:text-sm text-[#16A34A] hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Hero Section */}
      <SignupHero />
    </div>
  );
}
