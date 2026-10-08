import { create } from 'zustand';
import { fetchCommuniques } from '@/features/communiques/api/communique.api';
import type { Communique } from '@/features/communiques/types/communique.types';

interface CommuniqueState {
  communiques: Communique[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  loadCommuniques: (force?: boolean) => Promise<void>;
}

export const useCommuniqueStore = create<CommuniqueState>((set, get) => ({
  communiques: [],
  loading: false,
  loaded: false,
  error: null,
  loadCommuniques: async (force = false) => {
    if (get().loading || (get().loaded && !force)) return;

    set({ loading: true, error: null });
    try {
      const communiques = await fetchCommuniques();
      set({ communiques, loaded: true, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error
          ? error.message
          : 'Impossible de charger les communiqués.',
      });
    }
  },
}));
