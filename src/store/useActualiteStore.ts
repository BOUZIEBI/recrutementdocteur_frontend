import { create } from "zustand";

import {
  fetchActualites,
  fetchActualiteByUid,
} from "@/features/actualites/api/actualite.api";

import type {
  Actualite,
} from "@/features/actualites/types/actualite.types";


interface ActualiteState {
  // Liste
  actualites: Actualite[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  // Détail
  actualiteDetail: Actualite | null;
  loadingDetail: boolean;
  errorDetail: string | null;

  loadActualites: (
    force?: boolean,
  ) => Promise<void>;

  loadActualiteDetail: (
    uid: string,
    force?: boolean,
  ) => Promise<void>;

  clearActualiteDetail: () => void;
}


export const useActualiteStore =
  create<ActualiteState>(
    (set, get) => ({
      actualites: [],
      loading: false,
      loaded: false,
      error: null,

      actualiteDetail: null,
      loadingDetail: false,
      errorDetail: null,

      loadActualites: async (
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
          const actualites =
            await fetchActualites();

          set({
            actualites,
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
                    + "les actualités."
                  ),
          });
        }
      },

      loadActualiteDetail: async (
        uid,
        force = false,
      ) => {
        const {
          actualites,
          actualiteDetail,
          loadingDetail,
        } = get();

        if (!uid) {
          set({
            actualiteDetail: null,
            loadingDetail: false,
            errorDetail: (
              "L’identifiant de l’actualité "
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
          actualiteDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Utiliser le détail déjà chargé,
         * sauf si force=true.
         */
        if (
          !force &&
          actualiteDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Recherche préalable dans la liste
         * pour afficher rapidement l’actualité.
         */
        const cachedActualite =
          actualites.find(
            (actualite) =>
              actualite.uid === uid &&
              !actualite.is_deleted,
          );

        set({
          actualiteDetail:
            cachedActualite ?? null,
          loadingDetail: true,
          errorDetail: null,
        });

        try {
          const actualite =
            await fetchActualiteByUid(
              uid,
            );

            if (!actualite) {
                set({
                actualiteDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "Cette actualité n’est "
                    + "plus disponible."
                ),
                });

                return;
            }

          set((state) => ({
            actualiteDetail: actualite,
            loadingDetail: false,
            errorDetail: null,

            /*
             * Met également à jour l’actualité
             * correspondante dans la liste.
             */
            actualites:
              state.actualites.map(
                (item) =>
                  item.uid === actualite.uid
                    ? actualite
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
                    + "l’actualité."
                  ),
          });
        }
      },

      clearActualiteDetail: () => {
        set({
          actualiteDetail: null,
          loadingDetail: false,
          errorDetail: null,
        });
      },
    }),
  );