import { create } from "zustand";

interface CryptoSessionStore {
  sessionUid: string | null;
  privateKey: CryptoKey | null;
  setSessionUid: (uid: string) => void;
  setPrivateKey: (privateKey: CryptoKey) => void;
  clearCryptoSession: () => void;
}

export const useCryptoSessionStore = create<CryptoSessionStore>((set) => ({
  sessionUid: null,
  privateKey: null,

  setSessionUid: (sessionUid) => {
    set({ sessionUid });
  },

  setPrivateKey: (privateKey) => {
    set({ privateKey });
  },

  clearCryptoSession: () => {
    set({ sessionUid: null, privateKey: null });
  },
}));
