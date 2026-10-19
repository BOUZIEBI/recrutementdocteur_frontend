import { useEffect } from "react";
import { useTypeagentStore } from "@/store/useTypeagentStore";



export function useHistoriques() {

  const typeagents = useTypeagentStore(
    (state) => state.typeagents,
  );

  const loading = useTypeagentStore(
    (state) => state.loading,
  );

  const loaded = useTypeagentStore(
    (state) => state.loaded,
  );

  const error = useTypeagentStore(
    (state) => state.error,
  );

  const loadTypeagents = useTypeagentStore(
    (state) => state.loadTypeagents,
  );

  useEffect(() => {
    void loadTypeagents();
  }, [loadTypeagents]);


  return {
    data: typeagents,
    isLoading: loading || (!loaded && !error),
    isError: Boolean(error),
    error,
    refetch: () =>
      loadTypeagents(true),
  };
}


export function useTypeagentById(
  uid: string | undefined,
) {
  const typeagentDetail = useTypeagentStore(
    (state) => state.typeagentDetail,
  );

  const loadingDetail = useTypeagentStore(
    (state) => state.loadingDetail,
  );

  const errorDetail = useTypeagentStore(
    (state) => state.errorDetail,
  );

  const loadTypeagentDetail = useTypeagentStore(
      (state) =>
        state.loadTypeagentDetail,
    );

  const clearTypeagentDetail = useTypeagentStore(
      (state) =>
        state.clearTypeagentDetail,
    );

  useEffect(() => {
    if (!uid) {
      clearTypeagentDetail();
      return;
    }

    void loadTypeagentDetail(uid);
  }, [
    uid,
    loadTypeagentDetail,
    clearTypeagentDetail,
  ]);


  const typeagent =typeagentDetail && typeagentDetail.uid === uid 
    ? typeagentDetail
    : undefined;

  return {
    data: typeagent,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!uid) {
        return Promise.resolve();
      }

      return loadTypeagentDetail(
        uid,
        true,
      );
    },
  };
}


export function useTypeagentByCode(
  code: string | undefined,
) {
  const typeagentDetail = useTypeagentStore(
    (state) => state.typeagentDetail,
  );

  const loadingDetail = useTypeagentStore(
    (state) => state.loadingDetail,
  );

  const errorDetail = useTypeagentStore(
    (state) => state.errorDetail,
  );

    const loadTypeagentDetail = useTypeagentStore(
        (state) =>state.loadTypeagentDetail,
    );

    const clearTypeagentDetail = useTypeagentStore(
        (state) =>state.clearTypeagentDetail,
    );

  useEffect(() => {
    if (!code) {
      clearTypeagentDetail();
      return;
    }

    void loadTypeagentDetail(code);
  }, [
    code,
    loadTypeagentDetail,
    clearTypeagentDetail,
  ]);


  const typeagent =typeagentDetail && typeagentDetail.code === code 
    ? typeagentDetail
    : undefined;

  return {
    data: typeagent,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!code) {
        return Promise.resolve();
      }

      return loadTypeagentDetail(
        code,
        true,
      );
    },
  };
}