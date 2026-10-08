
import type { Genre } from "../types/genre.types";

import { api } from "@/shared/services/apiService";

import { decryptServerResponse } from "@/shared/services/hybridCrypto";

import { useCryptoSessionStore } from "@/store/useCryptoSessionStore";


interface EncryptedPayload {
  encrypted_key: string;
  encrypted_data: string;
  iv: string;
}

interface EncryptedApiResponse {
  code: number;
  success: boolean;
  message: string;
  data: EncryptedPayload;
}

type DecryptedGenre =
  | Genre
  | {
      data: Genre;
    }
  | {
      genre: Genre;
    };


function getCsrfToken(): string | null {
  const csrfCookie = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) =>
      cookie.startsWith("csrf_token="),
    );

  if (!csrfCookie) {
    return null;
  }

  return decodeURIComponent(
    csrfCookie.slice(
      "csrf_token=".length,
    ),
  );
}


function isEncryptedPayload(
  value: unknown,
): value is EncryptedPayload {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const payload =
    value as Partial<EncryptedPayload>;

  return (
    typeof payload.encrypted_key === "string" &&
    payload.encrypted_key.length > 0 &&
    typeof payload.encrypted_data === "string" &&
    payload.encrypted_data.length > 0 &&
    typeof payload.iv === "string" &&
    payload.iv.length > 0
  );
}


export async function fetchGenreByUid(
  uid: string,
): Promise<Genre> {
    const {
        privateKey,
        sessionUid,
    } = useCryptoSessionStore.getState();

    if (!uid) {
        throw new Error(
        "L’identifiant de genre est absent.",
        );
    }

    if (!privateKey) {
        throw new Error(
        "La clé privée RSA du client est absente.",
        );
    }

    if (!sessionUid) {
        throw new Error(
        "La session cryptographique est absente.",
        );
    }

    const csrfToken = getCsrfToken();

    const headers: Record<string, string> = {
        "X-Crypto-Session-ID": sessionUid,
    };

    if (csrfToken) {
        headers["X-CSRF-Token"] = csrfToken;
    }

    const response = await api.get<EncryptedApiResponse>(
        `/genre/${uid}`,
        {
            headers,
        },
    );

    /*
    * FastAPI retourne :
    * {
    *   code,
    *   success,
    *   message,
    *   data: {
    *     encrypted_key,
    *     encrypted_data,
    *     iv
    *   }
    * }
    */
    const encryptedPayload =
        response.data.data;

    if (
        !isEncryptedPayload(
        encryptedPayload,
        )
    ) {
        throw new Error(
        "La réponse chiffrée est invalide.",
        );
    }

    const decryptedData =
        await decryptServerResponse<
        DecryptedGenre
        >(
        encryptedPayload,
        privateKey,
        );
    if (
        "data" in decryptedData
    ) {
        return decryptedData.data;
    }

    if (
        "genre" in decryptedData
    ) {
        return decryptedData.genre;
    }

    return decryptedData;
}