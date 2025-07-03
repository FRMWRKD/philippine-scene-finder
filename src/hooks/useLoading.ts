
import { useState, useCallback } from 'react';

interface UseLoadingReturn {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  withLoading: <T>(asyncFn: () => Promise<T>) => Promise<T | null>;
  clearError: () => void;
}

export const useLoading = (initialLoading = false): UseLoadingReturn => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
    if (loading) {
      setError(null); // Clear error when starting new operation
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const withLoading = useCallback(async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      const result = await asyncFn();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  return {
    isLoading,
    error,
    setLoading,
    setError,
    withLoading,
    clearError
  };
};
