"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useApi';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("AuthGuard: isAuthenticated =", isAuthenticated);
    if (!isAuthenticated) {
      console.log("AuthGuard: User not authenticated, redirecting to login...");
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Show loading while checking authentication
  if (!isAuthenticated) {
    console.log("AuthGuard: Rendering loading state");
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
          <p className="text-xs text-gray-500 mt-2">isAuthenticated: {String(isAuthenticated)}</p>
        </div>
      </div>
    );
  }

  // Show children if authenticated
  console.log("AuthGuard: User authenticated, rendering children");
  return <>{children}</>;
}
