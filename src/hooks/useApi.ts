import { useState, useEffect } from 'react';

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
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await apiCall();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

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
  return useApi(() => import('@/lib/api').then(m => m.getDashboardData()));
}

export function useCourses() {
  return useApi(() => import('@/lib/api').then(m => m.getCourses()));
}

export function useCurrentUser() {
  return useApi(() => import('@/lib/api').then(m => m.getCurrentUser()));
}

export function useTodos() {
  return useApi(() => import('@/lib/api').then(m => m.getTodos()));
}

export function useRecentFeedback() {
  return useApi(() => import('@/lib/api').then(m => m.getRecentFeedback()));
}
