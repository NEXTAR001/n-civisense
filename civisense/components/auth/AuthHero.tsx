'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Lock, Shield, CheckCircle, Users, Mail } from 'lucide-react';

type FeatureItem = {
  icon: React.ReactNode;
  text: string;
};

type AuthHeroProps = {
  title: string;
  description: string;
  features: FeatureItem[];
};

export function AuthHero({ title, description, features }: AuthHeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row-reverse relative w-full md:w-1/2 p-8 md:p-12 items-center justify-center text-white overflow-hidden min-h-screen md:min-h-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/auth-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#16A34A]/80 to-[#0d6e35]/80" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-lg mx-auto w-full"
      >
        <motion.h2
          className="text-3xl xl:text-3xl 2xl:text-4xl font-bold mb-4"
          variants={itemVariants}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-sm xl:text-base 2xl:text-lg mb-8 opacity-90"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        <motion.div
          className="space-y-4 mt-10"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-3"
              variants={itemVariants}
            >
              <div className="mt-0.5 p-1.5 rounded-full bg-white/20">
                {feature.icon}
              </div>
              <span className="text-sm xl:text-base 2xl:text-lg">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function LoginHero() {
  return (
    <AuthHero
      title="Welcome Back to Civisense!"
      description="Sign in to access your personalized dashboard, track community engagement, and stay updated with the latest civic activities in your area. Your secure gateway to meaningful participation awaits."
      features={[
        {
          icon: <Lock className="w-4 h-4 text-white" />,
          text: "Enterprise-grade security with end-to-end encryption"
        },
        {
          icon: <Shield className="w-4 h-4 text-white" />,
          text: "Real-time updates on civic activities and community events"
        },
        {
          icon: <CheckCircle className="w-4 h-4 text-white" />,
          text: "Quick one-click access with social accounts"
        },
        {
          icon: <Users className="w-4 h-4 text-white" />,
          text: "Connect with like-minded community members"
        },
        {
          icon: <Mail className="w-4 h-4 text-white" />,
          text: "Get notified about important community decisions"
        }
      ]}
    />
  );
}

export function SignupHero() {
  return (
    <AuthHero
      title="Join the Civisense Community"
      description="Become part of a growing network of engaged citizens working together to build better communities. Your voice matters, and we're here to amplify it."
      features={[
        {
          icon: <Users className="w-4 h-4 text-white" />,
          text: "Connect with thousands of active community members"
        },
        {
          icon: <Lock className="w-4 h-4 text-white" />,
          text: "Military-grade security protecting your personal information"
        },
        {
          icon: <CheckCircle className="w-4 h-4 text-white" />,
          text: "Get started in under 30 seconds with minimal information"
        },
        {
          icon: <Shield className="w-4 h-4 text-white" />,
          text: "Control your privacy settings and data sharing preferences"
        },
        {
          icon: <Mail className="w-4 h-4 text-white" />,
          text: "Receive personalized updates about issues that matter to you"
        }
      ]}
    />
  );
}

export function ForgotPasswordHero() {
  return (
    <AuthHero
      title="Reset Your Password Securely"
      description="We'll help you regain access to your account. Enter your email and we'll send you a secure, one-time link to create a new password. Our system ensures your account remains protected throughout the process."
      features={[
        {
          icon: <Lock className="w-4 h-4 text-white" />,
          text: "Bank-level encryption for all password reset requests"
        },
        {
          icon: <Shield className="w-4 h-4 text-white" />,
          text: "One-time use link valid for 15 minutes only"
        },
        {
          icon: <CheckCircle className="w-4 h-4 text-white" />,
          text: "Immediate account reactivation upon successful reset"
        },
        {
          icon: <Users className="w-4 h-4 text-white" />,
          text: "24/7 support team ready to assist if needed"
        },
        {
          icon: <Mail className="w-4 h-4 text-white" />,
          text: "Instant email confirmation after password change"
        }
      ]}
    />
  );
}

export function VerifyHero() {
  return (
    <AuthHero
      title="Email Verification Required"
      description="To ensure the security of your account and protect our community, we need to verify your email address. We've sent a secure verification link to your inbox. This one-time process helps us maintain a safe environment for all users."
      features={[
        {
          icon: <Mail className="w-4 h-4 text-white" />,
          text: "Check your inbox (and spam/junk folders) for our verification email"
        },
        {
          icon: <Shield className="w-4 h-4 text-white" />,
          text: "Verification link expires in 24 hours for security purposes"
        },
        {
          icon: <CheckCircle className="w-4 h-4 text-white" />,
          text: "Gain full access to all platform features after verification"
        },
        {
          icon: <Lock className="w-4 h-4 text-white" />,
          text: "Your information remains private and secure"
        },
        {
          icon: <Users className="w-4 h-4 text-white" />,
          text: "Join thousands of verified community members"
        }
      ]}
    />
  );
}

export function ResetHero() {
  return (
    <AuthHero
      title="Create Your New Password"
      description="Choose a strong, unique password to secure your Civisense account. Your new password will take effect immediately, and you'll be able to sign in right away."
      features={[
        {
          icon: <Lock className="w-4 h-4 text-white" />,
          text: "At least 8 characters long for optimal security"
        },
        {
          icon: <Shield className="w-4 h-4 text-white" />,
          text: "Mix of uppercase and lowercase letters"
        },
        {
          icon: <CheckCircle className="w-4 h-4 text-white" />,
          text: "Include at least one number and special character"
        },
        {
          icon: <Users className="w-4 h-4 text-white" />,
          text: "Avoid common words or personal information"
        },
        {
          icon: <Mail className="w-4 h-4 text-white" />,
          text: "You'll receive a confirmation email once changed"
        }
      ]}
    />
  );
}