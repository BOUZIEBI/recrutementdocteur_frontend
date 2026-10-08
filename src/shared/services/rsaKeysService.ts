// src/shared/rsaKeysService.ts

export interface RSAKeyPairResult {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
  publicKeyPem: string;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return window.btoa(binary);
}

function formatPublicKeyToPem(buffer: ArrayBuffer): string {
  const base64 = arrayBufferToBase64(buffer);
  const lines = base64.match(/.{1,64}/g)?.join("\n") ?? base64;

  return `-----BEGIN PUBLIC KEY-----
${lines}
-----END PUBLIC KEY-----`;
}

export async function generateRSAKeyPair(): Promise<RSAKeyPairResult> {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    false,
    ["encrypt", "decrypt"],
  );

  const publicKeyBuffer = await window.crypto.subtle.exportKey(
    "spki",
    keyPair.publicKey,
  );

  return {
    publicKey: keyPair.publicKey,
    privateKey: keyPair.privateKey,
    publicKeyPem: formatPublicKeyToPem(publicKeyBuffer),
  };
}
