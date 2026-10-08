import { create } from "zustand";

import { fetchGenreByUid , fetchGenres } from "@/features/genres/api/genre.api";
import type { Genre } from "@/features/genres/types/genre.types";


interface GenreState {

  // Liste
  genres: Genre[];
  loading: boolean;
  loaded: boolean;
  error: string | null;

  // Détail
  genreDetail: Genre | null;
  loadingDetail: boolean;
  errorDetail: string | null;

  loadGenres: (
    force?: boolean,
  ) => Promise<void>;

  loadGenreDetail: (
    uid: string,
    force?: boolean,
  ) => Promise<void>;

  clearGenreDetail: () => void;
}


export const useGenreStore =
  create<GenreState>(
    (set, get) => ({
      genres: [],
      loading: false,
      loaded: false,
      error: null,

      genreDetail: null,
      loadingDetail: false,
      errorDetail: null,

      loadGenres: async (
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
          const genres = await fetchGenres();

          set({
            genres,
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
                    + "les genres."
                  ),
          });
        }
      },

      loadGenreDetail: async (
        uid,
        force = false,
      ) => {
        const {
            genres,
            genreDetail,
            loadingDetail,
        } = get();

        if (!uid) {
            set({
                genreDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "L’identifiant de genre "
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
          genreDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Utiliser le détail déjà chargé,
         * sauf si force=true.
         */
        if (
          !force &&
          genreDetail?.uid === uid
        ) {
          return;
        }

        /*
         * Recherche préalable dans la liste
         * pour afficher rapidement le genre.
         */
        const cachedGenre = genres.find( (genre) => genre.uid === uid );

        set({
          genreDetail:
            cachedGenre ?? null,
          loadingDetail: true,
          errorDetail: null,
        });

        try {
          const genre = await fetchGenreByUid( uid );

            if (!genre) {
                set({
                genreDetail: null,
                loadingDetail: false,
                errorDetail: (
                    "Ce genre n’est "
                    + "plus disponible."
                ),
                });

                return;
            }

          set((state) => ({
            genreDetail: genre,
            loadingDetail: false,
            errorDetail: null,

            /*
             * Met également à jour le genre
             * correspondant dans la liste.
             */
            genres:
              state.genres.map(
                (item) => item.uid === genre.uid
                    ? genre
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
                    + "le genre."
                  ),
          });
        }
      },

      clearGenreDetail: () => {
        set({
          genreDetail: null,
          loadingDetail: false,
          errorDetail: null,
        });
      },
    }),
  );