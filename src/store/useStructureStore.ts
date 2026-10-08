import { create } from "zustand";

import { fetchStructureByUid , fetchStructures } from "@/features/structures/api/structure.api";
import type { Structure } from "@/features/structures/types/structure.api";

interface StructureState {

  // Liste
  structures: Structure[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  // Détail
  structureDetail: Structure | null;
  loadingDetail: boolean;
  errorDetail: string | null;

  loadStructures: (
    force?: boolean,
  ) => Promise<void>;

  loadStructureDetail: (
    uid: string,
    force?: boolean,
  ) => Promise<void>;

  clearStructureDetail: () => void;
  
}


export const useStructureStore =
  create<StructureState>(
    (set, get) => ({
      structures: [],
      loading: false,
      loaded: false,
      error: null,

      structureDetail: null,
      loadingDetail: false,
      errorDetail: null,

      loadStructures: async (
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
          const structures = await fetchStructures();

          set({
            structures,
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
                    + "les structures."
                  ),
          });
        }
      },

      loadStructureDetail: async (
        uid,
        force = false,
      ) => {
        const {
            structures,
            structureDetail,
            loadingDetail,
        } = get();

        if (!uid) {
            set({
                structureDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "L’identifiant de la structure "
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
          structureDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Utiliser le détail déjà chargé,
         * sauf si force=true.
         */
        if (
          !force &&
          structureDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Recherche préalable dans la liste
         * pour afficher rapidement la structure.
         */
        const cachedStructure = structures.find( (structure) => structure.uid === uid );

        set({
          structureDetail:
            cachedStructure ?? null,
          loadingDetail: true,
          errorDetail: null,
        });

        try {
          const structure = await fetchStructureByUid( uid );

            if (!structure) {
                set({
                structureDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "Cette structure n’est "
                    + "plus disponible."
                ),
                });

                return;
            }

          set((state) => ({
            structureDetail: structure,
            loadingDetail: false,
            errorDetail: null,

            /*
             * Met également à jour la structure
             * correspondant dans la liste.
             */
            structures:
              state.structures.map(
                (item) => item.uid === structure.uid
                    ? structure
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
                    + "la structure."
                  ),
          });
        }
      },

        clearStructureDetail: () => {
            set({
            structureDetail: null,
            loadingDetail: false,
            errorDetail: null,
            });
        },

    }),
  );