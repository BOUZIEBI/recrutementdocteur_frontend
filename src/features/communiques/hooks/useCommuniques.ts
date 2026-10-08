import { useEffect } from 'react';
import { useCommuniqueStore } from '@/store/useCommuniqueStore';

export function useCommuniques() {
  const data = useCommuniqueStore((state) => state.communiques);
  const loading = useCommuniqueStore((state) => state.loading);
  const loaded = useCommuniqueStore((state) => state.loaded);
  const error = useCommuniqueStore((state) => state.error);
  const loadCommuniques = useCommuniqueStore((state) => state.loadCommuniques);

  useEffect(() => {
    void loadCommuniques();
  }, [loadCommuniques]);

  return {
    data,
    isLoading: loading || (!loaded && !error),
    error,
    refetch: () => loadCommuniques(true),
  };
}
