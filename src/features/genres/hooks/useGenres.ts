import { useEffect } from "react";

import { useGenreStore } from "@/store/useGenreStore";



export function useGenres() {

  const genres = useGenreStore(
    (state) => state.genres,
  );

  const loading = useGenreStore(
    (state) => state.loading,
  );

  const loaded = useGenreStore(
    (state) => state.loaded,
  );

  const error = useGenreStore(
    (state) => state.error,
  );

  const loadGenres = useGenreStore(
    (state) => state.loadGenres,
  );

  useEffect(() => {
    void loadGenres();
  }, [loadGenres]);


  return {
    data: genres,
    isLoading: loading || (!loaded && !error),
    isError: Boolean(error),
    error,
    refetch: () =>
      loadGenres(true),
  };
}


export function useGenreById(
  uid: string | undefined,
) {
  const genreDetail = useGenreStore(
    (state) => state.genreDetail,
  );

  const loadingDetail = useGenreStore(
    (state) => state.loadingDetail,
  );

  const errorDetail = useGenreStore(
    (state) => state.errorDetail,
  );

  const loadGenreDetail = useGenreStore(
      (state) =>
        state.loadGenreDetail,
    );

  const clearGenreDetail = useGenreStore(
      (state) =>
        state.clearGenreDetail,
    );

  useEffect(() => {
    if (!uid) {
      clearGenreDetail();
      return;
    }

    void loadGenreDetail(uid);
  }, [
    uid,
    loadGenreDetail,
    clearGenreDetail,
  ]);


  const genre = genreDetail && genreDetail.uid === uid 
    ? genreDetail
    : undefined;

  return {
    data: genre,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!uid) {
        return Promise.resolve();
      }

      return loadGenreDetail(
        uid,
        true,
      );
    },
  };
}


export function useGenreByCode(
  code: string | undefined,
) {
  const genreDetail = useGenreStore(
    (state) => state.genreDetail,
  );

  const loadingDetail = useGenreStore(
    (state) => state.loadingDetail,
  );

  const errorDetail = useGenreStore(
    (state) => state.errorDetail,
  );

    const loadGenreDetail = useGenreStore(
        (state) =>state.loadGenreDetail,
    );

    const clearGenreDetail = useGenreStore(
        (state) =>state.clearGenreDetail,
    );

  useEffect(() => {
    if (!code) {
      clearGenreDetail();
      return;
    }

    void loadGenreDetail(code);
  }, [
    code,
    loadGenreDetail,
    clearGenreDetail,
  ]);


  const genre =genreDetail && genreDetail.code === code 
    ? genreDetail
    : undefined;

  return {
    data: genre,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!code) {
        return Promise.resolve();
      }

      return loadGenreDetail(
        code,
        true,
      );
    },
  };
}