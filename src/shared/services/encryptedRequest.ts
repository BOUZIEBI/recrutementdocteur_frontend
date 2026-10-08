// src/services/encryptedRequest.ts

import axios from "axios";

import { encryptPayload } from "./hybridCrypto";
import { useCryptoStore } from "@/store/useCryptoStore";

const API_URL = import.meta.env.VITE_API_URL;

export async function sendEncryptedRequest(
  endpoint: string,
  data: Record<string, unknown>,
) {
  const cryptoStore = useCryptoStore.getState();

  const publicKey = cryptoStore.publicKey ?? (await cryptoStore.loadPublicKey());

  const encryptedPayload = await encryptPayload(
    data,
    publicKey,
  );

  return axios.post(
    `${API_URL}${endpoint}`,
    encryptedPayload,
  );
}