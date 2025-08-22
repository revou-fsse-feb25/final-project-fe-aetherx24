"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { apiClient } from '@/lib/apiClient';

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
