import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function ProtectedGuestRoute() {
    
  const {
    auth,
    loading,
    loaded,
  } = useAuthStore();

  useEffect(() => {
    if (!loaded && !loading) {
      void useAuthStore.getState().loadAuth();
    }
  }, [
    loaded,
    loading,
  ]);

  // Vérification de l'authentification en cours
  if (loading || !loaded) {
    return (
      <div>
        Chargement...
      </div>
    );
  }
  const isAuthenticated = auth?.success === true && auth?.code === 200 && auth?.data.is_active === true;

  // Utilisateur connecté
  if ( isAuthenticated  ) {
    return (
      <Navigate
        to="/fiche-identification/informations-generales"
        replace
      />
    );
  }

  // Utilisateur non connecté :
  // accès aux routes invitées
  return <Outlet />;
}