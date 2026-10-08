import { useEffect } from "react";

import { usePhotothequeStore } from
  "@/store/usePhotothequeStore";


export function usePhototheques() {
  const phototheques = usePhotothequeStore(
    (state) => state.phototheques,
  );

  const loading = usePhotothequeStore(
    (state) => state.loading,
  );

  const loaded = usePhotothequeStore(
    (state) => state.loaded,
  );

  const error = usePhotothequeStore(
    (state) => state.error,
  );

  const loadPhototheques = usePhotothequeStore(
    (state) => state.loadPhototheques,
  );

  useEffect(() => {
    if (!loaded && !loading) {
      void loadPhototheques();
    }
  }, [
    loaded,
    loading,
    loadPhototheques,
  ]);

  return {
    data: phototheques,
    isLoading:
      loading ||
      (!loaded && !error),
    isError: Boolean(error),
    error,
    refetch: () =>
      loadPhototheques(true),
  };
}


export function usePhotothequeById(
  uid: string | undefined,
) {
  const photothequeDetail = usePhotothequeStore(
    (state) => state.photothequeDetail,
  );

  const loadingDetail = usePhotothequeStore(
    (state) => state.loadingDetail,
  );

  const errorDetail = usePhotothequeStore(
    (state) => state.errorDetail,
  );

  const loadPhotothequeDetail =
    usePhotothequeStore(
      (state) =>
        state.loadPhotothequeDetail,
    );

  const clearPhotothequeDetail =
    usePhotothequeStore(
      (state) =>
        state.clearPhotothequeDetail,
    );

  useEffect(() => {
    if (!uid) {
      clearPhotothequeDetail();
      return;
    }

    void loadPhotothequeDetail(uid);
  }, [
    uid,
    loadPhotothequeDetail,
    clearPhotothequeDetail,
  ]);


  const phototheque =photothequeDetail && photothequeDetail.uid === uid && !photothequeDetail.is_deleted
    ? photothequeDetail
    : undefined;

  return {
    data: phototheque,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!uid) {
        return Promise.resolve();
      }

      return loadPhotothequeDetail(
        uid,
        true,
      );
    },
  };
}