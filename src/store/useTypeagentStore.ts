import { create } from "zustand";

import { fetchTypeagents, fetchTypeagentByUid } from "@/features/typeagents/api/typeagent.api";

import type { Typeagent } from "@/features/typeagents/types/typeagent.types";


interface TypeagentState {
  // Liste
  typeagents: Typeagent[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  // Détail
  typeagentDetail: Typeagent | null;
  loadingDetail: boolean;
  errorDetail: string | null;

  loadTypeagents: (
    force?: boolean,
  ) => Promise<void>;

  loadTypeagentDetail: (
    uid: string,
    force?: boolean,
  ) => Promise<void>;

  clearTypeagentDetail: () => void;
}


export const useTypeagentStore =
  create<TypeagentState>(
    (set, get) => ({
      typeagents: [],
      loading: false,
      loaded: false,
      error: null,

      typeagentDetail: null,
      loadingDetail: false,
      errorDetail: null,

      loadTypeagents: async (
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
          const typeagents =
            await fetchTypeagents();

          set({
            typeagents,
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
                    + "les types agent."
                  ),
          });
        }
      },

      loadTypeagentDetail: async (
        uid,
        force = false,
      ) => {
        const {
          typeagents,
          typeagentDetail,
          loadingDetail,
        } = get();

        if (!uid) {
          set({
            typeagentDetail: null,
            loadingDetail: false,
            errorDetail: (
              "L’identifiant de type agent "
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
          typeagentDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Utiliser le détail déjà chargé,
         * sauf si force=true.
         */
        if (
          !force &&
          typeagentDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Recherche préalable dans la liste
         * pour afficher rapidement le type d'agent.
         */
        const cachedTypeagent =
          typeagents.find(
            (typeagent) => typeagent.uid === uid 
          );

        set({
          typeagentDetail:
            cachedTypeagent ?? null,
          loadingDetail: true,
          errorDetail: null,
        });

        try {
          const typeagent =
            await fetchTypeagentByUid(
              uid,
            );

            if (!typeagent) {
                set({
                typeagentDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "Ce type d'agent n’est "
                    + "plus disponible."
                ),
                });

                return;
            }

          set((state) => ({
            typeagentDetail: typeagent,
            loadingDetail: false,
            errorDetail: null,

            /*
             * Met également à jour le type agent
             * correspondante dans la liste.
             */
            typeagents:
              state.typeagents.map(
                (item) =>
                  item.uid === typeagent.uid
                    ? typeagent
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
                    + "le type d'agent."
                  ),
          });
        }
      },

      clearTypeagentDetail: () => {
        set({
          typeagentDetail: null,
          loadingDetail: false,
          errorDetail: null,
        });
      },
    }),
  );