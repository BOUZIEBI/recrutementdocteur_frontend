import { create } from 'zustand';
import { supabase } from './supabase';
import type { Session, User } from '@supabase/supabase-js';

type AuthStoreState = {
  user: User | null;
  session: Session | null;
  initialized: boolean;
  setSession: (session: Session | null) => void;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  session: null,
  initialized: false,
  setSession: (session) =>
    set({ session, user: session?.user ?? null, initialized: true }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
}));
