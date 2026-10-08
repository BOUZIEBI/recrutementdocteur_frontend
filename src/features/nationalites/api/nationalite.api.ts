
import type { Nationalite } from '../types/nationalite.types';
import { api } from '@/shared/services/apiService';
import { useCryptoSessionStore, } from '@/store/useCryptoSessionStore';
import { fetchPublicKey, fetchCsrfToken } from '@/shared/services/cryptoService';
import { decryptServerResponse,} from '@/shared/services/hybridCrypto';

interface EncryptedPayload {
  encrypted_key: string;
  encrypted_data: string;
  iv: string;
}


type DecryptedNationalites =
  | Nationalite[]
  | {
      data: Nationalite[];
    }
  | {
      nationalites: Nationalite[];
    };

type DecryptedNationalite =
  | Nationalite
  | {
      data: Nationalite;
    }
  | {
      nationalite: Nationalite;
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



export async function fetchNationalites(): Promise<Nationalite[]> {
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
      '/nationalite/all',
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
      DecryptedNationalites
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
    'nationalites' in decryptedData &&
    Array.isArray(
      decryptedData.nationalites,
    )
  ) {
    return decryptedData.nationalites
  }

  throw new Error(
    'Le format de la liste des nationalites est invalide.',
  );
}

export async function fetchNationaliteByUid(uid: string): Promise<Nationalite | null> {
  const nationalites = await fetchNationalites();
  const nationalite_recherche= nationalites.find((nationalite) => nationalite.uid === uid ) ?? null;
    if (nationalite_recherche) {
      return nationalite_recherche
    }
  return await fetchNationaliteByUid_backend(uid)
}


export async function fetchNationaliteByUid_backend(
  uid: string,
): Promise<Nationalite> {
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
      `/nationalite/${uid}`,
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

  const decryptedData = await decryptServerResponse<DecryptedNationalite>(
      encryptedPayload,
      privateKey,
    );
    if ("data" in decryptedData) {
      return decryptedData.data;
    }

    if ("nationalite" in decryptedData) {
      return decryptedData.nationalite;
    }

  return decryptedData;
}
