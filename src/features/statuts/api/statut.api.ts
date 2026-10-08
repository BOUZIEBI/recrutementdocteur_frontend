

import { Statut } from '../types/statut.types';

import { api } from '@/shared/services/apiService';
import { useCryptoSessionStore, } from '@/store/useCryptoSessionStore';
import { fetchPublicKey, fetchCsrfToken } from '@/shared/services/cryptoService';
import { decryptServerResponse,} from '@/shared/services/hybridCrypto';

interface EncryptedPayload {
  encrypted_key: string;
  encrypted_data: string;
  iv: string;
}


type DecryptedStatuts =
  | Statut[]
  | {
      data: Statut[];
    }
  | {
      statuts: Statut[];
    };

type DecryptedStatut =
  | Statut
  | {
      data: Statut;
    }
  | {
      statut: Statut;
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

  const payload = value as Partial<EncryptedPayload>;

  return (
    typeof payload.encrypted_key === "string" &&
    payload.encrypted_key.length > 0 &&
    typeof payload.encrypted_data === "string" &&
    payload.encrypted_data.length > 0 &&
    typeof payload.iv === "string" &&
    payload.iv.length > 0
  );
}



export async function fetchStatuts(): Promise<Statut[]> {
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
      '/statut/all',
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
      DecryptedStatuts
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
    'statuts' in decryptedData &&
    Array.isArray(
      decryptedData.statuts,
    )
  ) {
    return decryptedData.statuts
  }

  throw new Error(
    'Le format de la liste des statuts est invalide.',
  );
}

export async function fetchStatutByUid(uid: string): Promise<Statut | null> {
  const statuts = await fetchStatuts();
  const statut_recherche= statuts.find((statut) => statut.uid === uid ) ?? null;
    if (statut_recherche) {
      return statut_recherche
    }
  return await fetchStatutByUid_backend(uid)
}


export async function fetchStatutByUid_backend(
  uid: string,
): Promise<Statut> {
  const {
    privateKey,
    sessionUid,
  } = useCryptoSessionStore.getState();

  if (!uid) {
    throw new Error(
        "L’identifiant du statut est absent.",
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
      `/statut/${uid}`,
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

  const decryptedData = await decryptServerResponse<DecryptedStatut>(
      encryptedPayload,
      privateKey,
    );
    if ("data" in decryptedData) {
      return decryptedData.data;
    }

    if ("statut" in decryptedData) {
      return decryptedData.statut;
    }

  return decryptedData;
}
