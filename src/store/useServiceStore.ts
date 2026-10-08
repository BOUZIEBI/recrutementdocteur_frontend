import { create } from "zustand";

import {
  fetchServiceByUid,
  fetchServiceBySlug,
  fetchServices
} from "@/features/services/api/service.api";

import type {
  Service
} from "@/features/services/types/service.types";


interface ServiceState {
  // Liste
  services: Service[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  // Détail
  serviceDetail: Service | null;
  loadingDetail: boolean;
  errorDetail: string | null;

  loadServices: (
    force?: boolean,
  ) => Promise<void>;

  loadServiceDetail: (
    uid: string,
    force?: boolean,
  ) => Promise<void>;

  loadServiceDetailBySlug: (
    slug: string,
    force?: boolean,
  ) => Promise<void>;

  clearServiceDetail: () => void;
}


export const useServiceStore =
  create<ServiceState>(
    (set, get) => ({
      services: [],
      loading: false,
      loaded: false,
      error: null,

      serviceDetail: null,
      loadingDetail: false,
      errorDetail: null,

      loadServices: async (
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
          const services =await fetchServices();
          set({
            services,
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

        loadServiceDetail: async (
            uid,
            force = false,
        ) => {
            const {
            services,
            serviceDetail,
            loadingDetail,
            } = get();

            if (!uid) {
            set({
                serviceDetail: null,
                loadingDetail: false,
                errorDetail: (
                "L’identifiant du service "
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
            serviceDetail?.uid === uid
            ) {
            return;
            }

            /*
            * Utiliser le détail déjà chargé,
            * sauf si force=true.
            */
            if (
            !force &&
            serviceDetail?.uid === uid
            ) {
            return;
            }

            /*
            * Recherche préalable dans la liste
            * pour afficher rapidement le service.
            */
            const cachedService =
            services.find(
                (service) =>
                service.uid === uid &&
                !service.is_deleted,
            );

            set({
            serviceDetail: cachedService ?? null,
            loadingDetail: true,
            errorDetail: null,
            });

            try {
            const service =
                await fetchServiceByUid(
                uid,
                );

                if (!service) {
                    set({
                    serviceDetail: null,
                    loadingDetail: false,
                    errorDetail: (
                        "Ce service n’est "
                        + "plus disponible."
                    ),
                    });

                    return;
                }

            set((state) => ({
                serviceDetail: service,
                loadingDetail: false,
                errorDetail: null,

                /*
                * Met également à jour le service
                * correspondante dans la liste.
                */
                services: state.services.map(
                    (item) =>
                    item.uid === service.uid ? service : item,
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
                        + "le service."
                    ),
            });
            }
        },

        loadServiceDetailBySlug: async (
            slug,
            force = false,
        ) => {
            const {
            services,
            serviceDetail,
            loadingDetail,
            } = get();

            if (!slug) {
            set({
                serviceDetail: null,
                loadingDetail: false,
                errorDetail: (
                "L’identifiant du service "
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
            serviceDetail?.slug === slug
            ) {
            return;
            }

            /*
            * Utiliser le détail déjà chargé,
            * sauf si force=true.
            */
            if (
            !force &&
            serviceDetail?.slug === slug
            ) {
            return;
            }

            /*
            * Recherche préalable dans la liste
            * pour afficher rapidement le service.
            */
            const cachedService =
            services.find(
                (service) =>
                service.slug === slug &&
                !service.is_deleted,
            );

            set({
            serviceDetail: cachedService ?? null,
            loadingDetail: true,
            errorDetail: null,
            });

            try {
            const service =
                await fetchServiceBySlug(
                slug,
                );

                if (!service) {
                    set({
                    serviceDetail: null,
                    loadingDetail: false,
                    errorDetail: (
                        "Ce service n’est "
                        + "plus disponible."
                    ),
                    });

                    return;
                }

            set((state) => ({
                serviceDetail: service,
                loadingDetail: false,
                errorDetail: null,

                /*
                * Met également à jour le service
                * correspondante dans la liste.
                */
                services: state.services.map(
                    (item) =>
                    item.slug === service.slug ? service : item,
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
                        + "le service."
                    ),
            });
            }
        },

      clearServiceDetail: () => {
        set({
          serviceDetail: null,
          loadingDetail: false,
          errorDetail: null,
        });
      },
    }),



  );