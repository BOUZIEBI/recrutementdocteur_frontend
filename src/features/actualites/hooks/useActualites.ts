import { useQuery } from '@tanstack/react-query';
import { fetchActualites, fetchActualiteById } from '../api/actualite.api';

export function useActualites(limit = 8) {
  return useQuery({
    queryKey: ['actualites', limit],
    queryFn: () => fetchActualites(limit),
  });
}

export function useActualiteById(id: string | undefined) {
  return useQuery({
    queryKey: ['actualite', id],
    queryFn: () => fetchActualiteById(id!),
    enabled: !!id,
  });
}
