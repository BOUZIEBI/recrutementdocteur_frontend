import { useEffect } from "react";
import { useStatutStore } from "@/store/useStatutStore";


export function useStatuts() {

  const statuts = useStatutStore(
    (state) => state.statuts,
  );

  const loading = useStatutStore(
    (state) => state.loading,
  );

  const loaded = useStatutStore(
    (state) => state.loaded,
  );

  const error = useStatutStore(
    (state) => state.error,
  );

  const loadStatuts = useStatutStore(
    (state) => state.loadStatuts,
  );

  useEffect(() => {
    void loadStatuts();
  }, [loadStatuts]);


  return {
    data: statuts,
    isLoading: loading || (!loaded && !error),
    isError: Boolean(error),
    error,
    refetch: () =>
      loadStatuts(true),
  };
}


export function useStatutById(
  uid: string | undefined,
) {
    const statutDetail = useStatutStore(
        (state) => state.statutDetail,
    );

    const loadingDetail = useStatutStore(
        (state) => state.loadingDetail,
    );

    const errorDetail = useStatutStore(
        (state) => state.errorDetail,
    );

    const loadStatutDetail = useStatutStore(
        (state) =>state.loadStatutDetail,
    );

    const clearStatutDetail = useStatutStore(
      (state) =>state.clearStatutDetail,
    );

  useEffect(() => {
    if (!uid) {
      clearStatutDetail();
      return;
    }

    void loadStatutDetail(uid);

  }, [
    uid,
    loadStatutDetail,
    clearStatutDetail,
  ]);


  const statut = statutDetail && statutDetail.uid === uid ? statutDetail : undefined;

  return {
    data: statut,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!uid) {
        return Promise.resolve();
      }

      return loadStatutDetail(
        uid,
        true,
      );
    },
  };
}


export function useStatutByCode(
  code: string | undefined,
) {
    const statutDetail = useStatutStore(
        (state) => state.statutDetail,
    );

    const loadingDetail = useStatutStore(
        (state) => state.loadingDetail,
    );

    const errorDetail = useStatutStore(
        (state) => state.errorDetail,
    );

    const loadStatutDetail = useStatutStore(
        (state) =>state.loadStatutDetail,
    );

    const clearStatutDetail = useStatutStore(
        (state) =>state.clearStatutDetail,
    );

    useEffect(() => {
        if (!code) {
        clearStatutDetail();
        return;
        }

        void loadStatutDetail(code);
    }, [
        code,
        loadStatutDetail,
        clearStatutDetail,
    ]);


  const statut = statutDetail && statutDetail.code === code ? statutDetail : undefined;

  return {
    data: statut,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!code) {
        return Promise.resolve();
      }

      return loadStatutDetail(
        code,
        true,
      );
    },
  };
}