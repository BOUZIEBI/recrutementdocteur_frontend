import { create } from "zustand";

import type { Nationalite } from "@/features/nationalites/types/nationalite.types";
import { fetchNationaliteByUid , fetchNationalites } from "@/features/nationalites/api/nationalite.api";

interface NationaliteState {

  // Liste
  nationalites: Nationalite[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  // Détail
  nationaliteDetail: Nationalite | null;
  loadingDetail: boolean;
  errorDetail: string | null;

  loadNationalites: (
    force?: boolean,
  ) => Promise<void>;

  loadNationaliteDetail: (
    uid: string,
    force?: boolean,
  ) => Promise<void>;

  clearNationaliteDetail: () => void;
}


export const useNationaliteStore =
  create<NationaliteState>(
    (set, get) => ({
      nationalites: [],
      loading: false,
      loaded: false,
      error: null,

      nationaliteDetail: null,
      loadingDetail: false,
      errorDetail: null,

      loadNationalites: async (
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
          const nationalites = await fetchNationalites();

          set({
            nationalites,
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
                    + "les nationalites."
                  ),
          });
        }
      },

      loadNationaliteDetail: async (
        uid,
        force = false,
      ) => {
        const {
            nationalites,
            nationaliteDetail,
            loadingDetail,
        } = get();

        if (!uid) {
            set({
                nationaliteDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "L’identifiant de nationalite "
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
          nationaliteDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Utiliser le détail déjà chargé,
         * sauf si force=true.
         */
        if (
          !force &&
          nationaliteDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Recherche préalable dans la liste
         * pour afficher rapidement la nationalite.
         */
        const cachedNationalite = nationalites.find( (nationalite) => nationalite.uid === uid );

        set({
          nationaliteDetail: cachedNationalite ?? null,
          loadingDetail: true,
          errorDetail: null,
        });

        try {
          const nationalite = await fetchNationaliteByUid( uid );

            if (!nationalite) {
                set({
                nationaliteDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "Cette nationalite n’est "
                    + "plus disponible."
                ),
                });

                return;
            }

          set((state) => ({
            nationaliteDetail: nationalite,
            loadingDetail: false,
            errorDetail: null,

            /*
             * Met également à jour la nationalite
             * correspondant dans la liste.
             */
            nationalites:
              state.nationalites.map(
                (item) => item.uid === nationalite.uid
                    ? nationalite
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
                    + "la nationalite."
                  ),
          });
        }
      },

      clearNationaliteDetail: () => {
        set({
          nationaliteDetail: null,
          loadingDetail: false,
          errorDetail: null,
        });
      },
    }),
  );