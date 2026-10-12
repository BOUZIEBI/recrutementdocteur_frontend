// src/routes/ProtectedRoute.tsx

import { useEffect } from "react";

import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuthStore } from "@/store/useAuthStore";
import type { PermissionResponse } from "@/features/auth/types/user.types";


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

  const auth = useAuthStore((state) => state.auth);
  const loading = useAuthStore((state) => state.loading);
  const loaded = useAuthStore((state) => state.loaded);
  const error = useAuthStore((state) => state.error);
  const loadAuth = useAuthStore((state) => state.loadAuth);

  useEffect(() => {
    if (!loaded && !loading && !error) {
      void loadAuth();
    }
  }, [loaded, loading, error, loadAuth]);

  // Attendre la fin de la vérification d'authentification
  if (loading || (!loaded && !error)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Vérification de l'authentification...</p>
      </div>
    );
  }

  const user = auth?.data;

  const isAuthenticated =
    auth?.success === true &&
    auth?.code === 200 &&
    user?.is_active === true;

  // Utilisateur non connecté
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }
  
  // Super-administrateur
  if (user?.is_superuser === true) {
    return <Outlet />;
  }

  // Code du rôle
  const userRoleCode = user?.role?.code ?? null;

  // Permissions de l'utilisateur
  const userPermissionCodes: string[] =
    user?.permissions?.map(
      (permission: PermissionResponse) => permission.codename
    ) ?? [];

  // Vérification du rôle
  const hasRequiredRole =
    roles.length === 0 ||
    (
      typeof userRoleCode === "string" &&
      roles.includes(userRoleCode)
    );

  // Vérification des permissions
  const hasRequiredPermissions =
    permissions.length === 0 ||
    (
      requireAllPermissions
        ? permissions.every((permissionCode) =>
            userPermissionCodes.includes(permissionCode)
          )
        : permissions.some((permissionCode) =>
            userPermissionCodes.includes(permissionCode)
          )
    );

  // Accès interdit
  if (!hasRequiredRole || !hasRequiredPermissions) {
    return (
      <Navigate
        to="/non-autorise"
        replace
      />
    );
  }

  return <Outlet />;
}
