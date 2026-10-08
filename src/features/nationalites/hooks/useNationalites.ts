import { useEffect } from "react";
import { useNationaliteStore } from "@/store/useNationaliteStore";


export function useNationalites() {

  const typeagents = useNationaliteStore(
    (state) => state.nationalites,
  );

  const loading = useNationaliteStore(
    (state) => state.loading,
  );

  const loaded = useNationaliteStore(
    (state) => state.loaded,
  );

  const error = useNationaliteStore(
    (state) => state.error,
  );

  const loadNationalites = useNationaliteStore(
    (state) => state.loadNationalites,
  );

  useEffect(() => {
    void loadNationalites();
  }, [loadNationalites]);


  return {
    data: typeagents,
    isLoading: loading || (!loaded && !error),
    isError: Boolean(error),
    error,
    refetch: () =>
      loadNationalites(true),
  };
}


export function useNationaliteById(
  uid: string | undefined,
) {
    const nationaliteDetail = useNationaliteStore(
        (state) => state.nationaliteDetail,
    );

    const loadingDetail = useNationaliteStore(
        (state) => state.loadingDetail,
    );

    const errorDetail = useNationaliteStore(
        (state) => state.errorDetail,
    );

    const loadNationaliteDetail = useNationaliteStore(
        (state) =>state.loadNationaliteDetail,
    );

    const clearNationaliteDetail = useNationaliteStore(
      (state) =>state.clearNationaliteDetail,
    );

  useEffect(() => {
    if (!uid) {
      clearNationaliteDetail();
      return;
    }

    void loadNationaliteDetail(uid);

  }, [
    uid,
    loadNationaliteDetail,
    clearNationaliteDetail,
  ]);


  const nationalite =nationaliteDetail && nationaliteDetail.uid === uid ? nationaliteDetail : undefined;

  return {
    data: nationalite,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!uid) {
        return Promise.resolve();
      }

      return loadNationaliteDetail(
        uid,
        true,
      );
    },
  };
}


export function useNationaliteByCode(
  code: string | undefined,
) {
  const nationaliteDetail = useNationaliteStore(
    (state) => state.nationaliteDetail,
  );

  const loadingDetail = useNationaliteStore(
    (state) => state.loadingDetail,
  );

  const errorDetail = useNationaliteStore(
    (state) => state.errorDetail,
  );

    const loadNationaliteDetail = useNationaliteStore(
        (state) =>state.loadNationaliteDetail,
    );

    const clearNationaliteDetail = useNationaliteStore(
        (state) =>state.clearNationaliteDetail,
    );

  useEffect(() => {
    if (!code) {
      clearNationaliteDetail();
      return;
    }

    void loadNationaliteDetail(code);
  }, [
    code,
    loadNationaliteDetail,
    clearNationaliteDetail,
  ]);


  const nationalite =nationaliteDetail && nationaliteDetail.code === code ? nationaliteDetail : undefined;

  return {
    data: nationalite,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!code) {
        return Promise.resolve();
      }

      return loadNationaliteDetail(
        code,
        true,
      );
    },
  };
}