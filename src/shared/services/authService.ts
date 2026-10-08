import axios from "axios";

import { deconnexion, getCsrfToken } from '@/features/auth/api/auth.api';
import { GetMeResponse } from "@/features/auth/types/user.types";
import { RefreshResponse } from "@/features/auth/types/auth.types";
import { User } from "@/features/auth/types/user.types";
import { api } from "@/shared/services/apiService";
import {
  decryptServerResponse,
  type EncryptedPayload,
} from "@/shared/services/hybridCrypto";

import { useCryptoStore } from "@/store/useCryptoStore";
import { useCryptoSessionStore } from "@/store/useCryptoSessionStore";
import { clearToken, decryptToken, encryptToken } from "./EncrypdecrypToten";


interface RefreshData {
  is_access_token: boolean;
  is_refresh_token: boolean;
}

interface DecryptedRefreshResponse {
  code: number;
  success: boolean;
  message: string;
  data: RefreshData;
}

interface RefreshApiResponse {
  code: number;
  success: boolean;
  message: string;
  data: EncryptedPayload;
}


export async function refreshAccessToken(): Promise<RefreshResponse> {

  await useCryptoStore.getState().initialize();

  const {
    privateKey,
    sessionUid,
  } = useCryptoSessionStore.getState();

  if (!sessionUid) {
    throw new Error(
      "La session cryptographique n’est pas initialisée.",
    );
  }

  if (!privateKey) {
    throw new Error(
      "La clé privée RSA du client est absente.",
    );
  }

  const csrfToken = await getCsrfToken();

  if (!csrfToken) {
    throw new Error(
      "Le jeton CSRF est absent.",
    );
  }

    const headers: Record<string, string> = {
        "X-Crypto-Session-ID": sessionUid,
        "X-CSRF-Token": csrfToken,
        Accept: "application/json",
    };

    const refreshToken=await decryptToken("refresh_token")
    if (refreshToken) {
        headers.Authorization = `Bearer ${refreshToken}`;
    }
    
    const response = await api.post<EncryptedPayload>(
        "/auth/refresh",
        null,
        {
            withCredentials: true,
            headers,
        },
    );


    const encryptedPayload = response.data;
    

    const decrypted = await decryptServerResponse<RefreshResponse>(
        encryptedPayload,
        privateKey,
    );

    if (decrypted.code==201 && decrypted.success) {
        const access_storage_key="access_token"
        const refresh_storage_key="refresh_token"
        await encryptToken(decrypted.access_token, access_storage_key);
        await encryptToken(decrypted.refresh_token, refresh_storage_key);
    }
    if (decrypted.code==401 && !decrypted.success) {
        const access_storage_key="access_token"
        const refresh_storage_key="refresh_token"
        deconnexion()
    }
    return decrypted

  /*
   * Aucun token n’est retourné à React.
   *
   * Le navigateur enregistre automatiquement le nouveau
   * cookie HttpOnly reçu dans l’en-tête Set-Cookie.
   */
}