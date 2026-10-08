// src/stores/useCryptoStore.ts

import { create } from "zustand";

import {
  fetchPublicKey,
  sendPublicKey,
} from "@/shared/services/cryptoService";

import {
  generateRSAKeyPair,
} from "@/shared/services/rsaKeysService";

import {
  useCryptoSessionStore,
} from "@/store/useCryptoSessionStore";

let initialization: Promise<void> | null =
  null;

interface CryptoState {
  // Clé publique générée par React
  clientPublicKey: string | null;

  // Clé publique RSA de FastAPI,
  // récupérée depuis le fichier .env
  publicKey: string | null;

  initialized: boolean;
  loading: boolean;
  error: string | null;

  initialize: () => Promise<void>;
  loadPublicKey: () => string;
  clearCrypto: () => void;
}

export const useCryptoStore =
  create<CryptoState>((set, get) => ({
    clientPublicKey: null,
    publicKey: null,
    initialized: false,
    loading: false,
    error: null,

    loadPublicKey: (): string => {
      try {
        const publicKey = fetchPublicKey();

        set({
          publicKey,
          error: null,
        });

        return publicKey;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : (
                "Impossible de charger la clé " +
                "publique RSA de FastAPI."
              );

        set({
          publicKey: null,
          error: message,
        });

        throw error;
      }
    },

    initialize: (): Promise<void> => {
      if (initialization) {
        return initialization;
      }

      const cryptoSession =
        useCryptoSessionStore.getState();

      if (
        get().initialized &&
        get().publicKey &&
        cryptoSession.sessionUid &&
        cryptoSession.privateKey
      ) {
        return Promise.resolve();
      }

      set({
        loading: true,
        initialized: false,
        error: null,
      });

      initialization = Promise.resolve().then(async () => {
        try {
          /*
           * 1. Charger depuis .env la clé
           * publique RSA de FastAPI.
           */
          const serverPublicKey = fetchPublicKey();

          /*
           * 2. Générer la paire RSA de React.
           */
          const { publicKeyPem, privateKey,} = await generateRSAKeyPair();

          /*
           * 3. Créer la session et envoyer la clé
           * publique React à FastAPI.
           *
           * sendPublicKey() doit envoyer
           * X-Crypto-Session-ID.
           */
          await sendPublicKey(
            publicKeyPem,
          );

          /*
           * 4. Conserver la clé privée React
           * uniquement en mémoire.
           */
          useCryptoSessionStore
            .getState()
            .setPrivateKey(privateKey);

          set({
            publicKey: serverPublicKey,
            clientPublicKey: publicKeyPem,
            initialized: true,
            error: null,
          });
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : (
                  "Impossible d’initialiser " +
                  "le chiffrement."
                );

          set({
            initialized: false,
            publicKey: null,
            clientPublicKey: null,
            error: message,
          });

          throw error;
        } finally {
          set({
            loading: false,
          });

          initialization = null;
        }
      });

      return initialization;
    },

    clearCrypto: (): void => {
      useCryptoSessionStore
        .getState()
        .clearCryptoSession();

      set({
        clientPublicKey: null,
        publicKey: null,
        initialized: false,
        loading: false,
        error: null,
      });
    },
  }));