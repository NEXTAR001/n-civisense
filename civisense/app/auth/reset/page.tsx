import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-1/2 p-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <p className="text-sm text-gray-500">
              Create a new password for your account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  New Password
                </label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter new password" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm New Password
                </label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="Confirm your new password" 
                  required 
                />
              </div>
              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Remember your password?{' '}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Right side - Content */}
      <div className="w-1/2 bg-primary text-white p-12 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4">Create a Strong Password</h2>
        <p className="text-lg mb-8">
          For security reasons, please create a strong password that includes:
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              ✓
            </div>
            <span>At least 8 characters</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              ✓
            </div>
            <span>Uppercase and lowercase letters</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              ✓
            </div>
            <span>At least one number and special character</span>
          </div>
        </div>
      </div>
    </div>
  );
}
