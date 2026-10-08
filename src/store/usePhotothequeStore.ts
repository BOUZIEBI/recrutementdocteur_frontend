import { create } from "zustand";

import {
  fetchPhototheques,
  fetchPhotothequeByUid,
} from "@/features/phototheque/api/phototheque.api";

import type {
    Phototheque
} from "@/features/phototheque/types/phototheque.types";


interface PhotothequeState {
  // Liste
  phototheques: Phototheque[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  // Détail
  photothequeDetail: Phototheque | null;
  loadingDetail: boolean;
  errorDetail: string | null;

  loadPhototheques: (
    force?: boolean,
  ) => Promise<void>;

  loadPhotothequeDetail: (
    uid: string,
    force?: boolean,
  ) => Promise<void>;

  clearPhotothequeDetail: () => void;
}


export const usePhotothequeStore =
  create<PhotothequeState>(
    (set, get) => ({
      phototheques: [],
      loading: false,
      loaded: false,
      error: null,

      photothequeDetail: null,
      loadingDetail: false,
      errorDetail: null,

      loadPhototheques: async (
        force = false,
      ) => {
        const {
          loading,
          loaded,
        } = get();

        if (
          loading ||
          (loaded && !force)
        ) {
          return;
        }

        set({
          loading: true,
          error: null,
        });

        try {
          const phototheques =
            await fetchPhototheques();

          set({
            phototheques,
            loaded: true,
            loading: false,
            error: null,
          });
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : (
                    "Impossible de charger "
                    + "les phototheques."
                  ),
          });
        }
      },

      loadPhotothequeDetail: async (
        uid,
        force = false,
      ) => {
        const {
          phototheques,
          photothequeDetail,
          loadingDetail,
        } = get();

        if (!uid) {
          set({
            photothequeDetail: null,
            loadingDetail: false,
            errorDetail: (
              "L’identifiant de phototheque "
              + "est absent."
            ),
          });

          return;
        }

        /*
         * Ne pas relancer la même requête
         * si elle est déjà en cours.
         */
        if (
          loadingDetail &&
          photothequeDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Utiliser le détail déjà chargé,
         * sauf si force=true.
         */
        if (
          !force &&
          photothequeDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Recherche préalable dans la liste
         * pour afficher rapidement la phototheque.
         */
        const cachedPhototheque =
          phototheques.find(
            (phototheque) =>
              phototheque.uid === uid &&
              !phototheque.is_deleted,
          );

        set({
          photothequeDetail:
            cachedPhototheque ?? null,
          loadingDetail: true,
          errorDetail: null,
        });

        try {
          const phototheque =
            await fetchPhotothequeByUid(
              uid,
            );

            if (!phototheque) {
                set({
                photothequeDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "Cette phototheque n’est "
                    + "plus disponible."
                ),
                });

                return;
            }

          set((state) => ({
            photothequeDetail: phototheque,
            loadingDetail: false,
            errorDetail: null,

            /*
             * Met également à jour la phototheque
             * correspondante dans la liste.
             */
            phototheques:
              state.phototheques.map(
                (item) =>
                  item.uid === phototheque.uid
                    ? phototheque
                    : item,
              ),
          }));
        } catch (error) {
          set({
            loadingDetail: false,
            errorDetail:
              error instanceof Error
                ? error.message
                : (
                    "Impossible de charger "
                    + "la phoototheque."
                  ),
          });
        }
      },

      clearPhotothequeDetail: () => {
        set({
          photothequeDetail: null,
          loadingDetail: false,
          errorDetail: null,
        });
      },
    }),
  );