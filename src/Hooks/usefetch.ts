import { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../axios/axiosInstance';

export const useFetch = <T>(url: string, shouldFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!shouldFetch || !url) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (err: any) {
      setError(err.message ?? 'Error');
    } finally {
      setLoading(false);
    }
  }, [url, shouldFetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
};
