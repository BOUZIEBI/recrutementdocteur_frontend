import { create } from "zustand";

import { fetchStatuts, fetchStatutByUid } from "@/features/statuts/api/statut.api";
import type { Statut } from "@/features/statuts/types/statut.types";

interface StatutState {

  // Liste
  statuts: Statut[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  // Détail
  statutDetail: Statut | null;
  loadingDetail: boolean;
  errorDetail: string | null;

  loadStatuts: (
    force?: boolean,
  ) => Promise<void>;

  loadStatutDetail: (
    uid: string,
    force?: boolean,
  ) => Promise<void>;

  clearStatutDetail: () => void;
  
}


export const useStatutStore =
  create<StatutState>(
    (set, get) => ({
      statuts: [],
      loading: false,
      loaded: false,
      error: null,

      statutDetail: null,
      loadingDetail: false,
      errorDetail: null,

      loadStatuts: async (
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
          const statuts = await fetchStatuts();

          set({
            statuts,
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
                    + "les statuts."
                  ),
          });
        }
      },

      loadStatutDetail: async (
        uid,
        force = false,
      ) => {
        const {
            statuts,
            statutDetail,
            loadingDetail,
        } = get();

        if (!uid) {
            set({
                statutDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "L’identifiant du statut "
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
          statutDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Utiliser le détail déjà chargé,
         * sauf si force=true.
         */
        if (
          !force &&
          statutDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Recherche préalable dans la liste
         * pour afficher rapidement le statut.
         */
        const cachedStatuts = statuts.find( (statut) => statut.uid === uid );

        set({
          statutDetail: cachedStatuts ?? null,
          loadingDetail: true,
          errorDetail: null,
        });

        try {
          const statut = await fetchStatutByUid( uid );

            if (!statut) {
                set({
                statutDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "Ce statut n’est "
                    + "plus disponible."
                ),
                });

                return;
            }

          set((state) => ({
            statutDetail: statut,
            loadingDetail: false,
            errorDetail: null,

            /*
             * Met également à jour le statut
             * correspondant dans la liste.
             */
            statuts:
              state.statuts.map(
                (item) => item.uid === statut.uid
                    ? statut
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
                    + "le statut."
                  ),
          });
        }
      },

        clearStatutDetail: () => {
            set({
            statutDetail: null,
            loadingDetail: false,
            errorDetail: null,
            });
        },

    }),
  );