
import type { Departement } from '../types/departement.types';

import { api } from '@/shared/services/apiService';

import { useCryptoSessionStore, } from '@/store/useCryptoSessionStore';
import { fetchPublicKey, fetchCsrfToken } from '@/shared/services/cryptoService';
import { decryptServerResponse,} from '@/shared/services/hybridCrypto';

interface EncryptedPayload {
  encrypted_key: string;
  encrypted_data: string;
  iv: string;
}


type DecryptedDepartements =
  | Departement[]
  | {
      data: Departement[];
    }
  | {
      actualites: Departement[];
    };

type DecryptedDepartement =
  | Departement
  | {
      data: Departement;
    }
  | {
      actualite: Departement;
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



export async function fetchDepartements(): Promise<Departement[]> {
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
  
  const headers: Record<string, string> = {};

  if (sessionUid) {
    headers['X-Crypto-Session-ID'] = sessionUid;
  }
  const csrfToken=await getCsrfToken()
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  const response = await api.get<EncryptedPayload>(
      '/departement/all',
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
      DecryptedDepartements
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

export async function fetchDepartementByUid(uid: string): Promise<Departement | null> {
  const departements = await fetchDepartements();
  const departement_recherche= departements.find((departement) => departement.uid === uid ) ?? null;
    if (departement_recherche) {
      return departement_recherche
    }
  return await fetchDepartementByUid_backend(uid)
}


export async function fetchDepartementByUid_backend(
  uid: string,
): Promise<Departement> {
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
      `/departement/${uid}`,
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

  const decryptedData = await decryptServerResponse<DecryptedDepartement>(
      encryptedPayload,
      privateKey,
    );
    if ("data" in decryptedData) {
      return decryptedData.data;
    }

    if ("actualite" in decryptedData) {
      return decryptedData.actualite;
    }

  return decryptedData;
}
