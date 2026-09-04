import { supabase } from '@/shared/lib/supabase';
import type { AuthMode } from '../types/auth.types';

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUp(email: string, password: string) {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
}

export function translateAuthError(msg: string): string {
  if (msg.includes('Invalid login credentials')) {
    return 'Email ou mot de passe incorrect.';
  }
  if (msg.includes('User already registered')) {
    return 'Un compte existe déjà avec cet email.';
  }
  if (msg.includes('Password should be at least')) {
    return 'Le mot de passe doit contenir au moins 6 caractères.';
  }
  return msg;
}

export async function submitAuth(mode: AuthMode, email: string, password: string) {
  if (mode === 'signin') {
    await signIn(email, password);
  } else {
    await signUp(email, password);
  }
}
