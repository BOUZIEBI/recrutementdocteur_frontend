import { useState } from 'react';
import { useAuthMutation } from './useAuthMutation';
import type { AuthMode } from '../types/auth.types';

export function useAuth() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const mutation = useAuthMutation();

  const error = mutation.isError
    ? mutation.error instanceof Error
      ? mutation.error.message
      : 'Une erreur est survenue.'
    : null;

  function changeMode(m: AuthMode) {
    setMode(m);
    setSuccess(null);
    mutation.reset();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(null);

    mutation.mutate(
      { mode, email, password },
      {
        onSuccess: ({ mode: m }) => {
          if (m === 'signup') {
            setSuccess('Compte créé avec succès. Vous pouvez maintenant vous connecter.');
            setMode('signin');
            setPassword('');
          }
        },
      },
    );
  }

  return {
    mode, setMode: changeMode,
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
    loading: mutation.isPending,
    error,
    success,
    handleSubmit,
  };
}
