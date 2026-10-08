import { useEffect } from "react";

import { useActualiteStore } from
  "@/store/useActualiteStore";


export function useActualites() {
  const actualites = useActualiteStore(
    (state) => state.actualites,
  );

  const loading = useActualiteStore(
    (state) => state.loading,
  );

  const loaded = useActualiteStore(
    (state) => state.loaded,
  );

  const error = useActualiteStore(
    (state) => state.error,
  );

  const loadActualites = useActualiteStore(
    (state) => state.loadActualites,
  );

  useEffect(() => {
    if (!loaded && !loading) {
      void loadActualites();
    }
  }, [
    loaded,
    loading,
    loadActualites,
  ]);

  return {
    data: actualites,
    isLoading:
      loading ||
      (!loaded && !error),
    isError: Boolean(error),
    error,
    refetch: () =>
      loadActualites(true),
  };
}


export function useActualiteById(
  uid: string | undefined,
) {
  const actualiteDetail = useActualiteStore(
    (state) => state.actualiteDetail,
  );

  const loadingDetail = useActualiteStore(
    (state) => state.loadingDetail,
  );

  const errorDetail = useActualiteStore(
    (state) => state.errorDetail,
  );

  const loadActualiteDetail =
    useActualiteStore(
      (state) =>
        state.loadActualiteDetail,
    );

  const clearActualiteDetail =
    useActualiteStore(
      (state) =>
        state.clearActualiteDetail,
    );

  useEffect(() => {
    if (!uid) {
      clearActualiteDetail();
      return;
    }

    void loadActualiteDetail(uid);
  }, [
    uid,
    loadActualiteDetail,
    clearActualiteDetail,
  ]);


  const actualite =actualiteDetail && actualiteDetail.uid === uid && !actualiteDetail.is_deleted
    ? actualiteDetail
    : undefined;

  return {
    data: actualite,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!uid) {
        return Promise.resolve();
      }

      return loadActualiteDetail(
        uid,
        true,
      );
    },
  };
}