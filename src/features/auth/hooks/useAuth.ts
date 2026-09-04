import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitAuth, translateAuthError } from '../api/auth.api';
import type { AuthMode } from '../types/auth.types';

export function useAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await submitAuth(mode, email, password);
      if (mode === 'signin') {
        navigate('/');
      } else {
        setSuccess('Compte créé avec succès. Vous pouvez maintenant vous connecter.');
        setMode('signin');
        setPassword('');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue.';
      setError(translateAuthError(msg));
    } finally {
      setLoading(false);
    }
  }

  return {
    mode, setMode,
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
    loading, error, success,
    handleSubmit,
  };
}
