import { useMutation } from '@tanstack/react-query';
import { submitAuth, translateAuthError } from '../api/auth.api';
import type { AuthMode } from '../types/auth.types';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export function useAuthMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ mode, email, password }: { mode: AuthMode; email: string; password: string }) => {
      try {
        await submitAuth(mode, email, password);
        if (mode === 'signin') {
          await useAuthStore.getState().loadAuth(true);
          const { auth, error } = useAuthStore.getState();
          if (auth?.success == true) {
            throw new Error(error || 'Votre compte n’est pas actif.');
          }
        }
        return { mode };
      } catch (error) {
        throw new Error(translateAuthError(error instanceof Error ? error.message : 'Une erreur est survenue.'));
      }
    },
    onSuccess: ({ mode }) => {
      if (mode === 'signin') {
        navigate(
            "/dashboard",
            {
              replace: true,
            },
          );
      }
    },
  });
}
