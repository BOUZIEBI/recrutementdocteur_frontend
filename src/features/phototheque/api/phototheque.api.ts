import type {
  Phototheque
} from '../types/phototheque.types';


import { api } from '@/shared/services/apiService';

import { useCryptoSessionStore, } from '@/store/useCryptoSessionStore';

import { decryptServerResponse,} from '@/shared/services/hybridCrypto';

interface EncryptedPayload {
  encrypted_key: string;
  encrypted_data: string;
  iv: string;
}


type DecryptedActualites =
  | Phototheque[]
  | {
      data: Phototheque[];
    }
  | {
      phototheques: Phototheque[];
    };

type DecryptedPhototheque =
  | Phototheque
  | {
      data: Phototheque;
    }
  | {
      phototheque: Phototheque;
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



export async function fetchPhototheques():
  Promise<Phototheque[]> {
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
  const csrfCookie = document.cookie.split(';').map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith('csrf_token='));
  const csrfToken = csrfCookie? decodeURIComponent(csrfCookie.slice('csrf_token='.length)): null;
  const headers: Record<string, string> = {};

  if (sessionUid) {
    headers['X-Crypto-Session-ID'] = sessionUid;
  }
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  const response = await api.get<EncryptedPayload>(
      '/phototheque/all',
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

  const decryptedData =
    await decryptServerResponse<
      DecryptedActualites
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
    'actualites' in decryptedData &&
    Array.isArray(
      decryptedData.actualites,
    )
  ) {
    return decryptedData.actualites;
  }

  throw new Error(
    'Le format de la liste des actualites est invalide.',
  );
}

export async function fetchPhotothequeByUid(id: string): Promise<Phototheque | null> {
  const phototheques = await fetchPhototheques();
  const phototheque_recherche= phototheques.find((phototheque) => phototheque.uid === id && !phototheque.is_deleted) ?? null;
    if (phototheque_recherche) {
      return phototheque_recherche
    }
  return await fetchPhotothequeByUid_backend(id)
}


export async function fetchPhotothequeByUid_backend(
  uid: string,
): Promise<Phototheque> {
  const {
    privateKey,
    sessionUid,
  } = useCryptoSessionStore.getState();

  if (!uid) {
    throw new Error(
      "L’identifiant de phototheque est absent.",
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

  const response = await api.get<EncryptedPayload>(
      `/phototheque/${uid}`,
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

  const decryptedData = await decryptServerResponse<DecryptedPhototheque>(
      encryptedPayload,
      privateKey,
    );
    if ("data" in decryptedData) {
      return decryptedData.data;
    }

    if ("phototheque" in decryptedData) {
      return decryptedData.phototheque;
    }

  return decryptedData;
}
