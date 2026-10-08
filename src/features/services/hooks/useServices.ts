import { useEffect } from "react";

import { useServiceStore } from
  "@/store/useServiceStore";


export function useServices() {
  const services = useServiceStore(
    (state) => state.services,
  );

  const loading = useServiceStore(
    (state) => state.loading,
  );

  const loaded = useServiceStore(
    (state) => state.loaded,
  );

  const error = useServiceStore(
    (state) => state.error,
  );

  const loadServices = useServiceStore(
    (state) => state.loadServices,
  );

  useEffect(() => {
    void loadServices();
  }, [loadServices]);


  return {
    data: services,
    isLoading: loading || (!loaded && !error),
    isError: Boolean(error),
    error,
    refetch: () =>
      loadServices(true),
  };
}


export function useServiceById(
  uid: string | undefined,
) {
  const serviceDetail = useServiceStore(
    (state) => state.serviceDetail,
  );

  const loadingDetail = useServiceStore(
    (state) => state.loadingDetail,
  );

  const errorDetail = useServiceStore(
    (state) => state.errorDetail,
  );

  const loadServiceDetail = useServiceStore(
      (state) =>
        state.loadServiceDetail,
    );

  const clearServiceDetail = useServiceStore(
      (state) =>
        state.clearServiceDetail,
    );

  useEffect(() => {
    if (!uid) {
      clearServiceDetail();
      return;
    }

    void loadServiceDetail(uid);
  }, [
    uid,
    loadServiceDetail,
    clearServiceDetail,
  ]);


  const service =serviceDetail && serviceDetail.uid === uid && !serviceDetail.is_deleted
    ? serviceDetail
    : undefined;

  return {
    data: service,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!uid) {
        return Promise.resolve();
      }

      return loadServiceDetail(
        uid,
        true,
      );
    },
  };
}


export function useServiceByIdBySlug(
  slug: string | undefined,
) {
  const serviceDetail = useServiceStore(
    (state) => state.serviceDetail,
  );

  const loadingDetail = useServiceStore(
    (state) => state.loadingDetail,
  );

  const errorDetail = useServiceStore(
    (state) => state.errorDetail,
  );

  const loadServiceDetail = useServiceStore(
      (state) =>
        state.loadServiceDetailBySlug,
    );

  const clearServiceDetail = useServiceStore(
      (state) =>
        state.clearServiceDetail,
    );

  useEffect(() => {
    if (!slug) {
      clearServiceDetail();
      return;
    }

    void loadServiceDetail(slug);
  }, [
    slug,
    loadServiceDetail,
    clearServiceDetail,
  ]);


  const service =serviceDetail && serviceDetail.slug === slug && !serviceDetail.is_deleted
    ? serviceDetail
    : undefined;

  return {
    data: service,
    isLoading: loadingDetail,
    isError: Boolean(errorDetail),
    error: errorDetail,
    refetch: () => {
      if (!slug) {
        return Promise.resolve();
      }

      return loadServiceDetail(
        slug,
        true,
      );
    },
  };
}