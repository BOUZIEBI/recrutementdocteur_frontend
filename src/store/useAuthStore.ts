import { create } from "zustand";
import axios from "axios";
import { getMe } from "@/features/auth/api/auth.api";
import { User } from "@/features/auth/types/user.types";
import type { GetMeResponse } from "@/features/auth/types/user.types";
import { decryptToken } from "@/shared/services/EncrypdecrypToten";



interface AuthState {
  auth: GetMeResponse<User> | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;

  loadAuth: (force?: boolean) => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  auth: null,
  loading: false,
  loaded: false,
  error: null,

  loadAuth: async (force = false): Promise<void> => {

    const { loading, loaded } = get();
    // Empêcher plusieurs requêtes simultanées
    if (loading) {
      return;
    }

    // Ne pas recharger si les données existent déjà
    if (loaded && !force) {
      return;
    }

    set({
      loading: true,
      error: null,
    });

    try {
      
        const access_token=decryptToken("access_token")
        let authentication=null
        if (access_token!=null) {
            //authentication = await getMe();
        }
        
      
        set({
            auth: authentication,
            loading: false,
            loaded: true,
            error: null,
        });
    } catch (error: unknown) {

      let message ="Impossible de récupérer les informations de l’utilisateur.";

      if (axios.isAxiosError(error)) {
        const responseMessage =
          error.response?.data?.message ??
          error.response?.data?.detail?.message ??
          error.response?.data?.detail;

        if (typeof responseMessage === "string") {
          message = responseMessage;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      set({
        auth: null,
        loading: false,
        loaded: true,
        error: message,
      });
    }
  },

  clearAuth: (): void => {
    set({
      auth: null,
      loading: false,
      loaded: false,
      error: null,
    });
  },
}));
