import { LanguageCode } from '../landing/config/languages';

export const authTranslations = {
  login: {
    title: 'Log in to your account',
    subtitle: 'Enter your email and password to access your account.',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    signIn: 'Sign In',
    noAccount: 'Don\'t have an account?',
    signUp: 'Sign up',
  },
  signup: {
    title: 'Create your account',
    subtitle: 'Enter your details to get started',
    name: 'Full Name',
    namePlaceholder: 'Enter your full name',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    signUp: 'Sign Up',
    haveAccount: 'Already have an account?',
    signIn: 'Sign in',
  },
  forgot: {
    title: 'Forgot Password',
    subtitle: 'Enter your email to reset your password',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    resetPassword: 'Reset Password',
    backToLogin: 'Back to login',
  },
  reset: {
    title: 'Reset Password',
    subtitle: 'Enter your new password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    resetPassword: 'Reset Password',
  },
  verify: {
    title: 'Verify Your Email',
    subtitle: 'We\'ve sent a verification link to your email',
    checkEmail: 'Please check your email and click on the verification link to complete your registration.',
    didntReceive: 'Didn\'t receive the email?',
    resend: 'Resend verification email',
    backToLogin: 'Back to login',
  },
};

export type AuthTranslationKey = keyof typeof authTranslations.login 
  | keyof typeof authTranslations.signup 
  | keyof typeof authTranslations.forgot 
  | keyof typeof authTranslations.reset 
  | keyof typeof authTranslations.verify;
