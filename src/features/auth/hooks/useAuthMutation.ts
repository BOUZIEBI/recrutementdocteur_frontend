import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { submitAuth, translateAuthError } from '../api/auth.api';
import { useAuthStore } from '@/shared/lib/authStore';
import { supabase } from '@/shared/lib/supabase';
import type { AuthMode } from '../types/auth.types';

export function useAuthMutation() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: async ({ mode, email, password }: { mode: AuthMode; email: string; password: string }) => {
      await submitAuth(mode, email, password);
      if (mode === 'signin') {
        const { data } = await supabase.auth.getSession();
        return { mode, session: data.session };
      }
      return { mode, session: null };
    },
    onSuccess: ({ mode, session }) => {
      if (mode === 'signin' && session) {
        setSession(session);
        navigate('/');
      }
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue.';
      throw new Error(translateAuthError(msg));
    },
  });
}
