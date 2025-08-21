export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    timeout: 10000, // 10 seconds
  },
  app: {
    name: 'LMS Dashboard',
    version: '1.0.0',
  },
  features: {
    enableAnalytics: process.env.NODE_ENV === 'production',
    enableDebugMode: process.env.NODE_ENV === 'development',
  },
} as const;

export default config;
