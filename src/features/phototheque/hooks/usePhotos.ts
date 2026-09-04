import { useQuery } from '@tanstack/react-query';
import { fetchPhotos } from '../api/phototheque.api';

export function usePhotos() {
  return useQuery({
    queryKey: ['photos'],
    queryFn: () => fetchPhotos(),
  });
}
