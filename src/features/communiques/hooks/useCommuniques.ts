import { useQuery } from '@tanstack/react-query';
import { fetchCommuniques } from '../api/communique.api';

export function useCommuniques() {
  return useQuery({
    queryKey: ['communiques'],
    queryFn: () => fetchCommuniques(),
  });
}
