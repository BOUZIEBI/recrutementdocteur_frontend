import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { uploadPhoto, submitPreinscription } from '../api/preinscription.api';
import type { PreinscriptionData } from '../types/preinscription.types';

export function useCreatePreinscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PreinscriptionData & { photo?: File | null }) => {
      const { photo, ...rest } = data;
      let photoUrl: string | null = null;
      if (photo) {
        photoUrl = await uploadPhoto(photo);
      }
      await submitPreinscription({ ...rest, photo_url: photoUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preinscriptions'] });
    },
  });
}
