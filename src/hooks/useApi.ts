"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { apiClient } from '@/lib/apiClient';
import { User } from '@/types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => void;
  setData: (data: T) => void;
}

export function useApi<T>(
  apiCall: () => Promise<T>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  // Store the apiCall function in a ref to prevent infinite loops
  const apiCallRef = useRef(apiCall);
  apiCallRef.current = apiCall;

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await apiCallRef.current();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  const setData = (data: T) => {
    setState(prev => ({ ...prev, data }));
  };

  return {
    ...state,
    refetch,
    setData,
  };
}

// Authentication hook
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      let token = localStorage.getItem('jwt_token');
      let storedUser = localStorage.getItem('user');
      
      // If no token in localStorage, check cookies
      if (!token) {
        const cookies = document.cookie.split(';');
        const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt_token='));
        if (jwtCookie) {
          token = jwtCookie.split('=')[1];
        }
      }
      
      // If no user in localStorage, check cookies
      if (!storedUser) {
        const cookies = document.cookie.split(';');
        const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
        if (userCookie) {
          storedUser = userCookie.split('=')[1];
        }
      }
      
      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch {
          // Invalid stored user data
          apiClient.clearAuth();
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Listen for storage changes (e.g., when token is removed in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'jwt_token' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      console.log('🔍 Login: Starting login process...');
      const response = await apiClient.login(credentials);
      console.log('🔍 Login: API response received:', response);
      
      // Store in localStorage for client-side access
      localStorage.setItem('jwt_token', response.jwt_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      console.log('🔍 Login: Stored in localStorage');
      
      // Also store in cookies for middleware access
      setCookie('jwt_token', response.jwt_token, 7); // 7 days
      setCookie('user', JSON.stringify(response.user), 7);
      console.log('🔍 Login: Stored in cookies');
      
      // Verify storage
      const storedToken = localStorage.getItem('jwt_token');
      const storedUser = localStorage.getItem('user');
      console.log('🔍 Login: Verification - localStorage token:', storedToken ? 'EXISTS' : 'NOT FOUND');
      console.log('🔍 Login: Verification - localStorage user:', storedUser ? 'EXISTS' : 'NOT FOUND');
      
      // Check cookies
      const cookies = document.cookie.split(';');
      const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt_token='));
      console.log('🔍 Login: Verification - cookie token:', jwtCookie ? 'EXISTS' : 'NOT FOUND');
      
      setUser(response.user);
      setIsAuthenticated(true);
      console.log('🔍 Login: Authentication state updated');
      return response;
    } catch (error) {
      console.error('🔍 Login: Error occurred:', error);
      throw error;
    }
  };

  // Helper function to set cookies
  const setCookie = (name: string, value: string, days: number = 7): void => {
    if (typeof window !== 'undefined') {
      const expires = new Date();
      expires.setDate(expires.getDate() + days);
      document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    }
  };

  const logout = () => {
    apiClient.clearAuth();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}

// Specialized hooks for common use cases
export function useDashboardData() {
  return useApi(() => apiClient.getDashboardData());
}

export function useCourses() {
  return useApi(() => apiClient.getCourses());
}

export function useCurrentUser() {
  return useApi(() => apiClient.getCurrentUser());
}

export function useTodos() {
  return useApi(() => apiClient.getTodos());
}

export function useRecentFeedback() {
  return useApi(() => apiClient.getRecentFeedback());
}
