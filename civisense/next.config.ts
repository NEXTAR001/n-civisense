import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow all domains in development
    domains: ['*'],
    // Disable image optimization to avoid domain issues
    unoptimized: true,
    // For production, consider being more specific with domains
    ...(process.env.NODE_ENV === 'production' && {
      domains: [
        'n-civisense-api.onrender.com',
        'deadline.com',
        'punchng.com',
        'cdn.punchng.com',
        'www.commondreams.org',
        'www.universityworldnews.com',
        'kffhealthnews.org',
        'www.globalsecurity.org',
        'www.thestar.com.my',
        'images.unsplash.com',
        'plus.unsplash.com'
      ]
    })
  },
};

export default nextConfig;
