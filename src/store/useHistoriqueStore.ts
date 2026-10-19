// src/features/historiques/store/useHistoriqueStore.ts

import { create } from "zustand";

import {
  fetchHistoriqueByUid,
  fetchHistoriqueResults,
} from "@/features/historiques/api/historique.api";

import type {
  Historique,
} from "@/features/historiques/types/historique.types";

import type {
  HistoriqueFilters,
} from "@/features/historiques/api/historique.api";


let listRequestId = 0;
let detailRequestId = 0;
let listRequestController: AbortController | null = null;


function createFiltersKey(
  filters: HistoriqueFilters,
): string {
  const entries = Object.entries(filters)
    .filter(([, value]) => {
      return (
        value !== undefined
        && value !== null
        && value !== ""
      );
    })
    .sort(([firstKey], [secondKey]) => {
      return firstKey.localeCompare(secondKey);
    });

  return JSON.stringify(entries);
}


interface HistoriqueState {
  // Liste
  historiques: Historique[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  filters: HistoriqueFilters;
  filtersKey: string | null;

  // Détail
  historiqueDetail: Historique | null;
  loadingDetail: boolean;
  errorDetail: string | null;
  pendingDetailUid: string | null;

  loadHistoriques: (
    filters?: HistoriqueFilters,
    force?: boolean,
  ) => Promise<void>;

  loadHistoriqueDetail: (
    uid: string,
    force?: boolean,
  ) => Promise<void>;

  clearHistoriques: () => void;
  clearHistoriqueDetail: () => void;
}


export const useHistoriqueStore =
  create<HistoriqueState>(
    (set, get) => ({
      // Liste
      historiques: [],
      loading: false,
      loaded: false,
      error: null,

      filters: {},
      filtersKey: null,

      // Détail
      historiqueDetail: null,
      loadingDetail: false,
      errorDetail: null,
      pendingDetailUid: null,

      loadHistoriques: async (
        filters = {},
        force = false,
      ) => {
        const state = get();

        const normalizedFilters: HistoriqueFilters = {
          ...filters,
        };

        const newFiltersKey = createFiltersKey(
          normalizedFilters,
        );

        const isSameSearch =
          state.filtersKey === newFiltersKey;

        /*
         * Ne pas exécuter deux fois la même
         * requête simultanément.
         */
        if (
          state.loading
          && isSameSearch
        ) {
          return;
        }

        /*
         * Utiliser les données déjà chargées
         * lorsque les filtres sont identiques.
         */
        if (
          state.loaded
          && isSameSearch
          && !force
        ) {
          return;
        }

        const requestId = ++listRequestId;
        listRequestController?.abort();
        const controller = new AbortController();
        listRequestController = controller;

        set({
          loading: true,
          error: null,
          filters: normalizedFilters,
          filtersKey: newFiltersKey,

          /*
           * Lorsqu’il s’agit d’une nouvelle
           * recherche, les anciennes données
           * peuvent être supprimées.
           */
          ...(isSameSearch
            ? {}
            : {
                historiques: [],
                loaded: false,
              }),
        });

        try {
          const historiques = await fetchHistoriqueResults(
            normalizedFilters,
            controller.signal,
          );

          /*
           * Ignorer une ancienne réponse si
           * une nouvelle requête a été lancée.
           */
          if (requestId !== listRequestId) {
            return;
          }

          listRequestController = null;
          set({
            historiques,
            loading: false,
            loaded: true,
            error: null,
          });
        } catch (error) {
          if (requestId !== listRequestId) {
            return;
          }

          listRequestController = null;
          if (controller.signal.aborted) {
            set({ loading: false });
            return;
          }

          set({
            loading: false,
            loaded: false,
            error:
              error instanceof Error
                ? error.message
                : (
                    "Impossible de charger "
                    + "les historiques."
                  ),
          });
        }
      },

      loadHistoriqueDetail: async (
        uid,
        force = false,
      ) => {
        const {
          historiques,
          historiqueDetail,
          loadingDetail,
          pendingDetailUid,
        } = get();

        const normalizedUid = uid.trim();

        if (!normalizedUid) {
          detailRequestId += 1;

          set({
            historiqueDetail: null,
            loadingDetail: false,
            pendingDetailUid: null,
            errorDetail:
              "L’identifiant de l’historique "
              + "est absent.",
          });

          return;
        }

        /*
         * Ne pas relancer la même requête
         * lorsqu’elle est déjà en cours.
         */
        if (
          loadingDetail
          && pendingDetailUid === normalizedUid
        ) {
          return;
        }

        /*
         * Utiliser le détail déjà chargé.
         */
        if (
          !force
          && historiqueDetail?.uid
            === normalizedUid
        ) {
          return;
        }

        /*
         * Chercher d’abord dans la liste
         * actuellement chargée.
         */
        const cachedHistorique =
          historiques.find(
            (historique) =>
              historique.uid === normalizedUid,
          );

        const requestId = ++detailRequestId;

        set({
          historiqueDetail:
            cachedHistorique ?? null,

          loadingDetail: true,
          errorDetail: null,
          pendingDetailUid: normalizedUid,
        });

        try {
          const historique =
            await fetchHistoriqueByUid(
              normalizedUid,
            );

          if (requestId !== detailRequestId) {
            return;
          }

          set((state) => ({
            historiqueDetail: historique,
            loadingDetail: false,
            errorDetail: null,
            pendingDetailUid: null,

            /*
             * Mettre à jour l’historique
             * correspondant dans la liste.
             */
            historiques:
              state.historiques.map((item) => {
                return item.uid === historique.uid
                  ? historique
                  : item;
              }),
          }));
        } catch (error) {
          if (requestId !== detailRequestId) {
            return;
          }

          set({
            loadingDetail: false,
            pendingDetailUid: null,
            errorDetail:
              error instanceof Error
                ? error.message
                : (
                    "Impossible de charger "
                    + "l’historique."
                  ),
          });
        }
      },

      clearHistoriques: () => {
        listRequestId += 1;
        listRequestController?.abort();
        listRequestController = null;

        set({
          historiques: [],
          loading: false,
          loaded: false,
          error: null,
          filters: {},
          filtersKey: null,
        });
      },

      clearHistoriqueDetail: () => {
        detailRequestId += 1;

        set({
          historiqueDetail: null,
          loadingDetail: false,
          errorDetail: null,
          pendingDetailUid: null,
        });
      },
    }),
  );