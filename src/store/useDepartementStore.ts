import { create } from "zustand";

import { fetchDepartementByUid, fetchDepartements } from "@/features/departements/api/departement.api";
import type { Departement } from "@/features/departements/types/departement.types";


interface DepartementState {

  // Liste
  departements: Departement[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  // Détail
  departementDetail: Departement | null;
  loadingDetail: boolean;
  errorDetail: string | null;

  loadDepartements: (
    force?: boolean,
  ) => Promise<void>;

  loadDepartementDetail: (
    uid: string,
    force?: boolean,
  ) => Promise<void>;

  clearDepartementDetail: () => void;
}


export const useDepartementStore =
  create<DepartementState>(
    (set, get) => ({
      departements: [],
      loading: false,
      loaded: false,
      error: null,

      departementDetail: null,
      loadingDetail: false,
      errorDetail: null,

      loadDepartements: async (
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
          const departements = await fetchDepartements();

          set({
            departements,
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
                    + "les departements."
                  ),
          });
        }
      },

      loadDepartementDetail: async (
        uid,
        force = false,
      ) => {
        const {
            departements,
            departementDetail,
            loadingDetail,
        } = get();

        if (!uid) {
            set({
                departementDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "L’identifiant de departement "
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
          departementDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Utiliser le détail déjà chargé,
         * sauf si force=true.
         */
        if (
          !force &&
          departementDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Recherche préalable dans la liste
         * pour afficher rapidement le departement.
         */
        const cachedDepartement = departements.find( (departement) => departement.uid === uid );

        set({
          departementDetail:
            cachedDepartement ?? null,
          loadingDetail: true,
          errorDetail: null,
        });

        try {
          const departement = await fetchDepartementByUid( uid );

            if (!departement) {
                set({
                departementDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "Ce departement n’est "
                    + "plus disponible."
                ),
                });

                return;
            }

          set((state) => ({
            departementDetail: departement,
            loadingDetail: false,
            errorDetail: null,

            /*
             * Met également à jour le departement
             * correspondant dans la liste.
             */
            departements:
              state.departements.map(
                (item) => item.uid === departement.uid
                    ? departement
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
                    + "le departement."
                  ),
          });
        }
      },

      clearDepartementDetail: () => {
        set({
          departementDetail: null,
          loadingDetail: false,
          errorDetail: null,
        });
      },
    }),
  );