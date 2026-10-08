
import type { Structure } from '../types/structure.api';

import { api } from '@/shared/services/apiService';
import { useCryptoSessionStore, } from '@/store/useCryptoSessionStore';
import { decryptServerResponse,} from '@/shared/services/hybridCrypto';
import { decryptToken } from '@/shared/services/EncrypdecrypToten';
import { fetchPublicKey, fetchCsrfToken } from '@/shared/services/cryptoService';


interface EncryptedPayload {
  encrypted_key: string;
  encrypted_data: string;
  iv: string;
}


type DecryptedStructures =
  | Structure[]
  | {
      data: Structure[];
    }
  | {
      typeagents: Structure[];
    };

type DecryptedStructure =
  | Structure
  | {
      data: Structure;
    }
  | {
      structure: Structure;
    };

export async function getCsrfToken(): Promise<string> {
  return fetchCsrfToken();
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



export async function fetchStructures(): Promise<Structure[]> {
  const { privateKey,} = useCryptoSessionStore.getState();

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
  const csrfToken = await getCsrfToken();
  const headers: Record<string, string> = {};
   
  if (sessionUid) {
    headers['X-Crypto-Session-ID'] = sessionUid;
  }
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  const access_storage_key="access_token"
  const accessToken = await decryptToken(access_storage_key);
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await api.get<EncryptedPayload>(
      '/structure/all',
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
      DecryptedStructure
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
    'services' in decryptedData &&
    Array.isArray(
      decryptedData.services,
    )
  ) {
    return decryptedData.services;
  }

  throw new Error(
    'Le format de la liste des actualites est invalide.',
  );
}

export async function fetchStructureByUid(id: string): Promise<Structure | null> {
  const structures = await fetchStructures();
  const structure_recherche= structures.find((structure) => structure.uid === id ) ?? null;
  if (structure_recherche) {
    return structure_recherche
  }
  return await fetchStructureByUid_backend(id)
}


export async function fetchStructureByCode(code: string): Promise<Structure | null> {
  const structures = await fetchStructures();
  const structure_recherche= structures.find((structure) =>structure.code === code ) ?? null;
  if (structure_recherche) {
    return structure_recherche
  }
  return await fetchStructureByCode_backend(code)
}


export async function fetchStructureByUid_backend( uid: string): Promise<Structure> {
    const { privateKey, sessionUid } = useCryptoSessionStore.getState();

    if (!uid) {
        throw new Error(
        "L’identifiant du type de service est absent.",
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

    const headers : Record<string, string> = {
        "X-Crypto-Session-ID": sessionUid,
    };

    if (csrfToken) {
        headers["X-CSRF-Token"] = csrfToken;
    }

    const response = await api.get<EncryptedPayload>(
        `/structure/${uid}`,
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

    const decryptedData = await decryptServerResponse<DecryptedStructure>(
        encryptedPayload,
        privateKey,
    );
    if ("data" in decryptedData) {
        return decryptedData.data;
    }

    if ("structure" in decryptedData) {
        return decryptedData.structure;
    }

    return decryptedData;
}

export async function fetchStructureByCode_backend(
    slug: string,
): Promise<Structure> {
    const {
        privateKey,
        sessionUid,
    } = useCryptoSessionStore.getState();

    if (!slug) {
        throw new Error(
        "Le libelle du service est absent.",
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
        `/structure/${slug}`,
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

    const decryptedData = await decryptServerResponse<DecryptedStructure>(
        encryptedPayload,
        privateKey,
    );
    if ("data" in decryptedData) {
        return decryptedData.data;
    }

    if ("structure" in decryptedData) {
        return decryptedData.structure;
    }

    return decryptedData;

}

