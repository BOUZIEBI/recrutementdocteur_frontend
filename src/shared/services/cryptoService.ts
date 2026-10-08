// src/shared/services/cryptoService.ts

import { api } from "@/shared/services/apiService";
import { useCryptoSessionStore } from "@/store/useCryptoSessionStore";
import { encryptPayload, type EncryptedPayload } from "@/shared/services/hybridCrypto";



interface PublicKeyResponse {
  public_key: string;
}

interface RegisterPublicKeyRequest {
  public_key: string;
}

interface CsrfResponse {
  csrf_token: string;
}

interface CryptoSessionResponse {
  data: {
    session_uid: string;
  };
}

function decodeBase64Utf8( encodedValue: string ): string {
  try {
    const binary = window.atob(
      encodedValue,
    );

    const bytes = Uint8Array.from(
      binary,
      (character) =>
        character.charCodeAt(0),
    );

    return new TextDecoder().decode(
      bytes,
    );
  } catch {
    throw new Error(
      'La clé publique RSA FastAPI ' +
      'n’est pas correctement encodée en Base64.',
    );
  }
}



export function fetchPublicKey(): string {
  const encodedPublicKey = import.meta.env.VITE_FASTAPI_PUBLIC_KEY_BASE64;

  if (!encodedPublicKey) {
    throw new Error(
      "VITE_FASTAPI_PUBLIC_KEY_BASE64 " +
      "est absente.",
    );
  }

  try {
    const normalizedValue =
      encodedPublicKey
        .trim()
        .replace(/^["']|["']$/g, "")
        .replace(/\s/g, "");

    const binary = window.atob(
      normalizedValue,
    );

    const bytes = Uint8Array.from(
      binary,
      (character) =>
        character.charCodeAt(0),
    );

    const publicKey = new TextDecoder().decode(bytes);

    const hasBeginMarker = publicKey.includes(
        "-----BEGIN PUBLIC KEY-----",
      );

    const hasEndMarker = publicKey.includes(
        "-----END PUBLIC KEY-----",
      );

    if (
      !hasBeginMarker ||
      !hasEndMarker
    ) {
      throw new Error(
        "Le contenu décodé n’est pas " +
        "une clé publique PEM.",
      );
    }

    return publicKey;
  } catch (error: unknown) {
    const details =
      error instanceof Error
        ? error.message
        : "Erreur inconnue.";

    throw new Error(
      "La clé publique RSA FastAPI " +
      "n’est pas correctement encodée. " +
      details,
    );
  }
}


export async function initializeCryptoSession(): Promise<void> {
  const response = await api.post<CryptoSessionResponse>("/crypto/session");
  const sessionUid = response.data?.data?.session_uid;

  if (typeof sessionUid !== "string" || !sessionUid.trim()) {
    throw new Error("L’identifiant de session de chiffrement est absent ou invalide.");
  }

  useCryptoSessionStore.getState().setSessionUid(sessionUid);
}


export async function fetchCsrfToken(): Promise<string> {
    const response = await api.get<CsrfResponse | { data: CsrfResponse }>(
        "/auth/csrf",
    );

    const body = response.data;
    const csrfToken = body && ('data' in body ? body.data?.csrf_token : body.csrf_token);
   
    if (typeof csrfToken !== 'string' || !csrfToken.trim()) {
        throw new Error("Le jeton CSRF est absent.");
    }

    return csrfToken;
}


export async function sendPublicKey(
  publicKeyPem: string,
): Promise<void> {

  await initializeCryptoSession();

  const csrfToken = await fetchCsrfToken();
  const sessionUid = useCryptoSessionStore.getState().sessionUid ?? sessionStorage.getItem("crypto_session_uid");
  const headers: Record<string, string> = {
    "X-CSRF-Token": csrfToken,
  };

  if (sessionUid) {
    headers["X-Crypto-Session-ID"] = sessionUid;
  }

  const serverPublicKey = fetchPublicKey();
  const { payload } = await encryptPayload(
    { public_key: publicKeyPem },
    serverPublicKey,
  );
  await api.post<void, void, EncryptedPayload>(
    "/crypto/public-key",
    payload,
    {
      headers,
    },
  );

}



