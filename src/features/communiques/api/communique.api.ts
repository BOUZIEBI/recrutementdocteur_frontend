import type {
  Communique,
} from '../types/communique.types';

import { api } from '@/shared/services/apiService';

import {
  useCryptoSessionStore,
} from '@/store/useCryptoSessionStore';

import {
  decryptServerResponse,
} from '@/shared/services/hybridCrypto';

interface EncryptedPayload {
  encrypted_key: string;
  encrypted_data: string;
  iv: string;
}

type DecryptedCommuniques =
  | Communique[]
  | {
      data: Communique[];
    }
  | {
      communiques: Communique[];
    };

export async function fetchCommuniques():
  Promise<Communique[]> {
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
      '/communique/all',
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

  const decryptedData =await decryptServerResponse<
      DecryptedCommuniques
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
    'communiques' in decryptedData &&
    Array.isArray(
      decryptedData.communiques,
    )
  ) {
    return decryptedData.communiques;
  }

  throw new Error(
    'Le format de la liste des communiqués est invalide.',
  );
}
