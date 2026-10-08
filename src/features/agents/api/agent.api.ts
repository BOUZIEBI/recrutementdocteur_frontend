

import type { Agent, AjoutagentResponse } from '../types/agent.types';

import { api } from '@/shared/services/apiService';
import { useCryptoStore } from '@/store/useCryptoStore';
import { useCryptoSessionStore, } from '@/store/useCryptoSessionStore';
import { fetchPublicKey, fetchCsrfToken } from '@/shared/services/cryptoService';
import {encryptPayload, decryptServerResponse,} from '@/shared/services/hybridCrypto';
import { decryptToken } from '@/shared/services/EncrypdecrypToten';


interface EncryptedPayload {
  encrypted_key: string;
  encrypted_data: string;
  iv: string;
}


type DecryptedAgents =
  | Agent[]
  | {
      data: Agent[];
    }
  | {
      agents: Agent[];
    };

type DecryptedAgent =
  | Agent
  | {
      data: Agent;
    }
  | {
      agent: Agent;
    };


export async function getCsrfToken(): Promise<string> {
  const csrfCookie = document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('csrf_token='));
  const token = csrfCookie
    ? decodeURIComponent(csrfCookie.slice('csrf_token='.length))
    : null;

  return token || fetchCsrfToken();
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


export async function ajouterAgent(type_agent_uid: string, matricule: string, nom:string, prenoms:string, date_naissance:string, lieu_naissance:string, natonalite_uid:string, genre_uid:string, structure_uid: string, statut_uid:string ): Promise<AjoutagentResponse> {
  
  await useCryptoStore.getState().initialize();
  const accessToken = await decryptToken('access_token');
  if (!accessToken?.trim()) {
    throw new Error('Le token d’accès est absent. Veuillez vous reconnecter.');
  }
  const { privateKey, sessionUid } = useCryptoSessionStore.getState();
  if (!privateKey || !sessionUid) throw new Error('La session cryptographique est absente.');

  const csrfToken = await getCsrfToken();
  const headers: Record<string, string> = {
    'X-Crypto-Session-ID': sessionUid,
    'X-CSRF-Token': csrfToken,
    Authorization: `Bearer ${accessToken.trim()}`,
  };

  const { payload } = await encryptPayload({ type_agent_uid:type_agent_uid, matricule:matricule, nom:nom, prenoms:prenoms, date_naissance:date_naissance, lieu_naissance:lieu_naissance, natonalite_uid:natonalite_uid, genre_uid:genre_uid, structure_uid:structure_uid, statut_uid:statut_uid }, fetchPublicKey());
  const response = await api.post<unknown>('/agent/', payload, { headers });

  if (!isEncryptedPayload(response.data)) 
    throw new Error('La réponse chiffrée est invalide.');

  const decrypted = await decryptServerResponse<AjoutagentResponse>(response.data, privateKey);
  
  if (!decrypted || typeof decrypted !== 'object') {
    throw new Error('La réponse d’authentification est invalide.');
  }

  //if (decrypted.success === false) {
  //  throw new Error(typeof decrypted.message === 'string' ? decrypted.message : "Échec d'enregistrement de l'agent.");
  //}

  return decrypted;
}



export async function fetchAgents(): Promise<Agent[]> {
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
  const headers: Record<string, string> = {
    'X-Crypto-Session-ID': sessionUid,
  };

  const csrfToken = await getCsrfToken();
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }
  const accessToken = await decryptToken('access_token');
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await api.get<EncryptedPayload>(
      '/agent/all',
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
      DecryptedAgents
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
    'agents' in decryptedData &&
    Array.isArray(
      decryptedData.agents,
    )
  ) {
    return decryptedData.agents;
  }

  throw new Error(
    'Le format de la liste des agents est invalide.',
  );
}

export async function fetchAgentByUid(uid: string): Promise<Agent | null> {
  const agents = await fetchAgents();
  const agent_recherche= agents.find((agent) => agent.uid === uid ) ?? null;
    if (agent_recherche) {
      return agent_recherche
    }
  return await fetchAgentByUid_backend(uid)
}


export async function fetchAgentByUid_backend(
  uid: string,
): Promise<Agent> {

    const {
        privateKey,
        sessionUid,
    } = useCryptoSessionStore.getState();

    if (!uid) {
        throw new Error(
        "L’identifiant de l’agent est absent.",
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
    const accessToken = await decryptToken('access_token');

    const headers: Record<string, string> = {
        "X-Crypto-Session-ID": sessionUid,
    };

    if (csrfToken) {
        headers["X-CSRF-Token"] = csrfToken;
    }
    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await api.get<EncryptedPayload>(
      `/agent/${uid}`,
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

  const decryptedData = await decryptServerResponse<DecryptedAgent>(
      encryptedPayload,
      privateKey,
    );
    if ("data" in decryptedData) {
      return decryptedData.data;
    }

    if ("agent" in decryptedData) {
      return decryptedData.agent;
    }

  return decryptedData;
}
