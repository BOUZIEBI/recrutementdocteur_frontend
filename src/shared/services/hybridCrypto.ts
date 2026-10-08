// src/services/hybridCrypto.ts

export interface EncryptedPayload {
  encrypted_key: string;
  encrypted_data: string;
  iv: string;
}

export interface EncryptedResponse {
  encrypted_data: string;
  iv: string;
}

export interface EncryptionResult {
  payload: EncryptedPayload;
  aesKey: CryptoKey;
}


/**
 * Convertit un ArrayBuffer en chaîne Base64.
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return window.btoa(binary);
}

/**
 * Convertit une chaîne Base64 en ArrayBuffer.
 */
function base64ToArrayBuffer(
  value: string,
): ArrayBuffer {
  const binary = window.atob(value);

  const bytes = new Uint8Array(
    binary.length,
  );

  for (
    let index = 0;
    index < binary.length;
    index++
  ) {
    bytes[index] =
      binary.charCodeAt(index);
  }

  return bytes.buffer;
}

async function decryptAesKeyWithPrivateKey(
  encryptedKey: string,
  privateKey: CryptoKey,
): Promise<CryptoKey> {
  const encryptedKeyBuffer = base64ToArrayBuffer(encryptedKey);

  const rawAesKey = await window.crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    encryptedKeyBuffer,
  );

  return window.crypto.subtle.importKey(
    "raw",
    rawAesKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
}

async function decryptDataWithAesGcm<T>(
  encryptedData: string,
  iv: string,
  aesKey: CryptoKey,
): Promise<T> {
  const encryptedDataBuffer = base64ToArrayBuffer(encryptedData);
  const ivBuffer = base64ToArrayBuffer(iv);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(ivBuffer),
      tagLength: 128,
    },
    aesKey,
    encryptedDataBuffer,
  );

  const decryptedText = new TextDecoder().decode(decryptedBuffer);

  return JSON.parse(decryptedText) as T;
}


/**
 * Convertit une clé publique PEM en ArrayBuffer.
 */
function pemToArrayBuffer(pem: string): ArrayBuffer {
  const content = pem
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "")
    .replace(/\s/g, "");

  if (!content) {
    throw new Error("La clé publique RSA est invalide.");
  }

  return base64ToArrayBuffer(content);
}

/**
 * Importe la clé publique RSA dans Web Crypto.
 */
async function importPublicKey(
  publicKeyPem: string,
): Promise<CryptoKey> {
  try {
    return await window.crypto.subtle.importKey(
      "spki",
      pemToArrayBuffer(publicKeyPem),
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false,
      ["encrypt"],
    );
  } catch {
    throw new Error(
      "Impossible d’importer la clé publique RSA.",
    );
  }
}


/** Génère une clé AES et chiffre son export avec la clé publique RSA. */
export async function createEncryptedAesKey(publicKeyPem: string): Promise<{
  aesKey: CryptoKey;
  encryptedKey: string;
}> {
  const rsaPublicKey = await importPublicKey(publicKeyPem);
  const aesKey = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
  const rawAesKey = await window.crypto.subtle.exportKey("raw", aesKey);
  const encryptedKey = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    rsaPublicKey,
    rawAesKey,
  );

  return { aesKey, encryptedKey: arrayBufferToBase64(encryptedKey) };
}

/**
 * Chiffre les données envoyées de React vers FastAPI.
 *
 * - Les données sont chiffrées avec AES-256-GCM.
 * - La clé AES est chiffrée avec RSA-OAEP-SHA-256.
 * - La clé AES reste en mémoire pour déchiffrer la réponse.
 */
export async function encryptPayload(
  data: Record<string, unknown>,
  publicKeyPem: string,
): Promise<EncryptionResult> {

  const encoder = new TextEncoder();

  const { aesKey, encryptedKey, } = await createEncryptedAesKey(publicKeyPem);
  
  // Un nouvel IV doit être généré pour chaque chiffrement.
  const iv = window.crypto.getRandomValues(
    new Uint8Array(12),
  );

  const plaintext = encoder.encode(
    JSON.stringify(data),
  );

  // Chiffre les données avec la clé AES
  const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
        tagLength: 128,
      },
      aesKey,
      plaintext,
  );

  const data_return= {
    payload: {

      // la clé AES encryptée avec RSA public fastapi
      encrypted_key: encryptedKey,

      // Web Crypto retourne ciphertext + tag GCM. les données encryptée avec la clé AES
      encrypted_data: arrayBufferToBase64(encryptedData),

      iv: arrayBufferToBase64(iv.buffer),
    },
    aesKey,
  };

  return data_return
}

/**
 * Déchiffre la réponse envoyée par FastAPI.
 *
 * FastAPI doit avoir chiffré la réponse avec la même clé AES,
 * mais avec un nouvel IV.
 */
export async function decryptResponse<T>(
  response: EncryptedResponse,
  aesKey: CryptoKey,
): Promise<T> {
  if (!response.encrypted_data || !response.iv) {
    throw new Error(
      "La réponse chiffrée est incomplète.",
    );
  }

  const iv = new Uint8Array(
    base64ToArrayBuffer(response.iv),
  );

  if (iv.byteLength !== 12) {
    throw new Error(
      "L’IV AES-GCM doit contenir 12 octets.",
    );
  }

  const encryptedData = base64ToArrayBuffer(
    response.encrypted_data,
  );

  try {
    const decryptedBuffer =
      await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv,
          tagLength: 128,
        },
        aesKey,
        encryptedData,
      );

    const json = new TextDecoder().decode(
      decryptedBuffer,
    );

    return JSON.parse(json) as T;
  } catch {
    throw new Error(
      "Impossible de déchiffrer la réponse du serveur.",
    );
  }
}



export async function decryptServerResponse<T>(
  payload: EncryptedPayload,
  privateKey: CryptoKey,
): Promise<T> {
  // 1. Déchiffrer la clé AES avec
  // la clé privée RSA de React
  const aesKeyBuffer =
    await window.crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      privateKey,
      base64ToArrayBuffer(
        payload.encrypted_key,
      ),
    );

  // 2. Importer la clé AES-256
  const aesKey =
    await window.crypto.subtle.importKey(
      'raw',
      aesKeyBuffer,
      {
        name: 'AES-GCM',
      },
      false,
      ['decrypt'],
    );

  // 3. Déchiffrer les données
  const decryptedBuffer =
    await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(
          base64ToArrayBuffer(
            payload.iv,
          ),
        ),
        tagLength: 128,
      },
      aesKey,
      base64ToArrayBuffer(
        payload.encrypted_data,
      ),
    );

  // 4. Convertir les données JSON
  const decryptedText =
    new TextDecoder().decode(
      decryptedBuffer,
    );

  return JSON.parse(decryptedText) as T;
}