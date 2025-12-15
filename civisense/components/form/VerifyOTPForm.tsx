'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import Image from "next/image";

export default function VerifyOtpForm() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || 'your email';

    const handleOtpChange = (index: number, value: string) => {
        if (value && !/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Move to previous input on backspace if current is empty
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length !== 6) return;

        setIsLoading(true);
        // TODO: Implement OTP verification logic
        console.log('Verifying OTP:', otpCode);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Handle successful verification
        }, 2000);
    };

    const handleResendOtp = () => {
        // TODO: Implement resend OTP logic
        console.log('Resending OTP to:', email);
    };

    return (
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
                <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
                <p className="text-sm text-gray-500">
                    We've sent a verification code to <span className="font-medium">{email}</span>
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between space-x-2">
                            {otp.map((digit, index) => (
                                <Input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="text-center text-xl h-14 w-12 flex-1"
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-center text-gray-500">
                            Enter the 6-digit code sent to your email
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#16A34A] hover:bg-[#0e7a36] text-white text-xs 2xl:text-sm"
                        disabled={otp.some(digit => digit === '') || isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Verify Account'}
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                        Didn't receive a code?{' '}
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            className="text-xs 2xl:text-sm text-[#16A34A] hover:underline"
                        >
                            Resend Code
                        </button>
                    </div>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs text-center text-gray-500">
                        Having trouble?{' '}
                        <Link
                            href="/support"
                            className="text-xs 2xl:text-sm text-[#16A34A] hover:underline"
                        >
                            Contact Support
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}