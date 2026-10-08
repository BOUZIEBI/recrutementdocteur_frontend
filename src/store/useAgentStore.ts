import { create } from "zustand";

import { fetchAgents, fetchAgentByUid } from "@/features/agents/api/agent.api";
import type { Agent } from "@/features/agents/types/agent.types";


interface AgentState {

  // Liste
  agents: Agent[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  // Détail
  agentDetail: Agent | null;
  loadingDetail: boolean;
  errorDetail: string | null;

  loadAgents: (
    force?: boolean,
  ) => Promise<void>;

  loadAgentDetail: (
    uid: string,
    force?: boolean,
  ) => Promise<void>;

  clearAgentDetail: () => void;
  
}


export const useAgentStore =
  create<AgentState>(
    (set, get) => ({
      agents: [],
      loading: false,
      loaded: false,
      error: null,

      agentDetail: null,
      loadingDetail: false,
      errorDetail: null,

      loadAgents: async (
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
          const agents = await fetchAgents();

          set({
            agents,
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
                    + "les agents."
                  ),
          });
        }
      },

      loadAgentDetail: async (
        uid,
        force = false,
      ) => {
        const {
            agents,
            agentDetail,
            loadingDetail,
        } = get();

        if (!uid) {
            set({
                agentDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "L’identifiant de l'agent "
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
          agentDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Utiliser le détail déjà chargé,
         * sauf si force=true.
         */
        if ( !force && agentDetail?.uid === uid ) {
          return;
        }

        /*
         * Recherche préalable dans la liste
         * pour afficher rapidement l'agent.
         */
        const cachedAgents = agents.find( (agent) => agent.uid === uid );

        set({
          agentDetail: cachedAgents ?? null,
          loadingDetail: true,
          errorDetail: null,
        });

        try {
          const agent = await fetchAgentByUid( uid );

            if (!agent) {
                set({
                agentDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "Cet agent n’est "
                    + "plus disponible."
                ),
                });

                return;
            }

          set((state) => ({
            agentDetail: agent,
            loadingDetail: false,
            errorDetail: null,

            /*
             * Met également à jour l'agent
             * correspondant dans la liste.
             */
            agents:
              state.agents.map(
                (item) => item.uid === agent.uid
                    ? agent
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
                    + "l'agent."
                  ),
          });
        }
      },

        clearAgentDetail: () => {
            set({
            agentDetail: null,
            loadingDetail: false,
            errorDetail: null,
            });
        },

    }),
  );