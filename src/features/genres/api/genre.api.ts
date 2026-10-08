

import type { Genre } from '../types/genre.types';

import { api } from '@/shared/services/apiService';

import { useCryptoSessionStore, } from '@/store/useCryptoSessionStore';
import { fetchPublicKey, fetchCsrfToken } from '@/shared/services/cryptoService';
import { decryptServerResponse,} from '@/shared/services/hybridCrypto';

interface EncryptedPayload {
  encrypted_key: string;
  encrypted_data: string;
  iv: string;
}


type DecryptedGenres =
  | Genre[]
  | {
      data: Genre[];
    }
  | {
      genres: Genre[];
    };

type DecryptedGenre =
  | Genre
  | {
      data: Genre;
    }
  | {
      genre: Genre;
    };


export async function getCsrfToken(): Promise<string> {
  return  fetchCsrfToken();
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



export async function fetchGenres(): Promise<Genre[]> {
  const {
    privateKey,
  } = useCryptoSessionStore.getState();

  if (!privateKey) {
    throw new Error(
      'La clé privée RSA du client est absente.',
    );
  }
  const sessionUid = useCryptoSessionStore.getState().sessionUid;
  if (!sessionUid) {
    throw new Error(
      'La session cryptographique est absente.',
    );
  }

  const headers: Record<string, string> = {};

  if (sessionUid) {
    headers['X-Crypto-Session-ID'] = sessionUid;
  }
  const csrfToken=await getCsrfToken()
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  const response = await api.get<EncryptedPayload>(
      '/genre/all',
      {
        headers
      },
  );

  const encryptedPayload = response.data;
  if (
    !encryptedPayload?.encrypted_key ||
    !encryptedPayload?.encrypted_data ||
    !encryptedPayload?.iv
  ) {
    throw new Error(
      'La réponse chiffrée est invalide.',
    );
  }

  const decryptedData = await decryptServerResponse<
      DecryptedGenres
    >(
      encryptedPayload,
      privateKey,
    );


  if (Array.isArray(decryptedData)) {
    return decryptedData;
  }

  if (
    'data' in decryptedData &&
    Array.isArray(decryptedData.data)
  ) {
    return decryptedData.data;
  }

  if (
    'genres' in decryptedData &&
    Array.isArray(
      decryptedData.genres,
    )
  ) {
    return decryptedData.genres;
  }

  throw new Error(
    'Le format de la liste des genres est invalide.',
  );
}

export async function fetchGenreByUid(uid: string): Promise<Genre | null> {
  const genres = await fetchGenres();
  const genre_recherche= genres.find((genre) => genre.uid === uid ) ?? null;
    if (genre_recherche) {
      return genre_recherche
    }
  return await fetchGenreByUid_backend(uid)
}


export async function fetchGenreByUid_backend(
  uid: string,
): Promise<Genre> {
  const {
    privateKey,
    sessionUid,
  } = useCryptoSessionStore.getState();

  if (!uid) {
    throw new Error(
      "L’identifiant de l’actualité est absent.",
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

    const csrfToken = await getCsrfToken();

    const headers: Record<string, string> = {
        "X-Crypto-Session-ID": sessionUid,
    };

    if (csrfToken) {
        headers["X-CSRF-Token"] = csrfToken;
    }

    const response = await api.get<EncryptedPayload>(
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
  const encryptedPayload = response.data;

  if ( !isEncryptedPayload( encryptedPayload,)) {
    throw new Error(
      "La réponse chiffrée est invalide.",
    );
  }

  const decryptedData = await decryptServerResponse<DecryptedGenre>(
      encryptedPayload,
      privateKey,
    );
    if ("data" in decryptedData) {
      return decryptedData.data;
    }

    if ("genre" in decryptedData) {
      return decryptedData.genre;
    }

  return decryptedData;
}
