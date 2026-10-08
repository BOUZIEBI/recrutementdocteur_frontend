import { useEffect } from "react";
import { useStructureStore } from "@/store/useStructureStore";



export function useStructures() {

  const structures = useStructureStore(
    (state) => state.structures,
  );

  const loading = useStructureStore(
    (state) => state.loading,
  );

  const loaded = useStructureStore(
    (state) => state.loaded,
  );

  const error = useStructureStore(
    (state) => state.error,
  );

  const loadStructures = useStructureStore(
    (state) => state.loadStructures,
  );

  useEffect(() => {
    void loadStructures();
  }, [loadStructures]);

  return {
    data: structures,
    isLoading: loading || (!loaded && !error),
    isError: Boolean(error),
    error,
    refetch: () =>
      loadStructures(true),
  };

}


export function useStructureById(
  uid: string | undefined,
) {
  const structureDetail = useStructureStore(
    (state) => state.structureDetail,
  );

  const loadingDetail = useStructureStore(
    (state) => state.loadingDetail,
  );

  const errorDetail = useStructureStore(
    (state) => state.errorDetail,
  );

  const loadStructureDetail = useStructureStore(
      (state) =>
        state.loadStructureDetail,
    );

  const clearStructureDetail = useStructureStore(
      (state) =>
        state.clearStructureDetail,
    );

  useEffect(() => {
    if (!uid) {
      clearStructureDetail();
      return;
    }

    void loadStructureDetail(uid);
  }, [
    uid,
    loadStructureDetail,
    clearStructureDetail,
  ]);


  const structure = structureDetail && structureDetail.uid === uid 
    ? structureDetail
    : undefined;

  return {
    data: structure,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!uid) {
        return Promise.resolve();
      }

      return loadStructureDetail(
        uid,
        true,
      );
    },
  };
}


export function useStructureByCode(
  code: string | undefined,
) {
  const structureDetail = useStructureStore(
    (state) => state.structureDetail,
  );

  const loadingDetail = useStructureStore(
    (state) => state.loadingDetail,
  );

  const errorDetail = useStructureStore(
    (state) => state.errorDetail,
  );

    const loadStructureDetail = useStructureStore(
        (state) =>state.loadStructureDetail,
    );

    const clearStructureDetail = useStructureStore(
        (state) =>state.clearStructureDetail,
    );

  useEffect(() => {
    if (!code) {
      clearStructureDetail();
      return;
    }

    void loadStructureDetail(code);
  }, [
    code,
    loadStructureDetail,
    clearStructureDetail,
  ]);


  const structure = structureDetail && structureDetail.code === code 
    ? structureDetail
    : undefined;

  return {
    data: structure,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!code) {
        return Promise.resolve();
      }

      return loadStructureDetail(
        code,
        true,
      );
    },
  };
}