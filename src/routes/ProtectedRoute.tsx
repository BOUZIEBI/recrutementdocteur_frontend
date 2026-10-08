// src/routes/ProtectedRoute.tsx

import { useEffect } from "react";

import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuthStore } from "@/store/useAuthStore";


interface ProtectedRouteProps {
  roles?: string[];
  permissions?: string[];

  /*
   * true  : toutes les permissions sont obligatoires
   * false : une seule permission suffit
   */
  requireAllPermissions?: boolean;
}


export default function ProtectedRoute({
  roles = [],
  permissions = [],
  requireAllPermissions = true,
}: ProtectedRouteProps) {
  const location = useLocation();

  const auth = useAuthStore(
    (state) => state.auth,
  );

  const loading = useAuthStore(
    (state) => state.loading,
  );

  const loaded = useAuthStore(
    (state) => state.loaded,
  );

  const error = useAuthStore(
    (state) => state.error,
  );

  const loadAuth = useAuthStore(
    (state) => state.loadAuth,
  );

  useEffect(() => {
    if (!loaded && !loading) {
      void loadAuth();
    }
  }, [
    loaded,
    loading,
    loadAuth,
  ]);

  if (loading || (!loaded && !error)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p></p>
      </div>
    );
  }

  const authenticationData = auth?.data;

  const isAuthenticated = auth?.success === true && auth?.code === 200 && auth?.data.is_active === true;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/connexion"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  /*
   * Un super-administrateur peut accéder
   * à toutes les routes.
   */
  if (auth?.data?.is_superuser) {
    return <Outlet />;
  }

    const userRoleCode = auth?.data?.role?.code;

    const userPermissionCodes = auth?.data?.permissions.map(
        (permission) => permission.code,
    );

    const hasRequiredRole = roles.length === 0 ||
    (
      typeof userRoleCode === "string" &&
      roles.includes(userRoleCode)
    );

  const hasRequiredPermissions =
    permissions.length === 0 ||
    (
      requireAllPermissions
        ? permissions.every(
            (permissionCode) =>
              userPermissionCodes.includes(
                permissionCode,
              ),
          )
        : permissions.some(
            (permissionCode) =>
              userPermissionCodes.includes(
                permissionCode,
              ),
          )
    );

  if (
    !hasRequiredRole ||
    !hasRequiredPermissions
  ) {
    return (
      <Navigate
        to="/non-autorise"
        replace
      />
    );
  }

  return <Outlet />;
}