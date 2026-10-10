import { useEffect } from 'react';
import AuthenticatedApp from '@/pages/AuthenticatedApp';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useCryptoStore } from '@/store/useCryptoStore';
import { useAuthStore } from './store/useAuthStore';
import ScrollToTop from '@/shared/components/ScrollToTop';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
import { ChatAssistant } from '@/features/chatbot';
import { HomePage } from '@/features/home';
import { pageRefreshService } from '@/shared/services/pageRefreshService';
import ProtectedGuestRoute from '@/routes/ProtectedGuestRoute';

import {
  PresentationPage,
  MissionsPage,
  VisionPage,
  ValeursPage,
  HistoriquePage,
  OrganigrammePage,
  FonctionnementPage,
  MotDuDirecteurPage,
  ObjectifsPage,
  PresentationDetailPage,
} from '@/features/presentation';
import { ServicesListPage, ServiceDetailPage } from '@/features/services';
import { ActualiteDetailPage } from '@/features/actualites';
import { RecrutementPage } from '@/features/recrutement';
import { SygrhesPage } from '@/features/sygrhes';
import { ContactPage } from '@/features/contact';
import { LoginPage } from '@/features/auth';
import { PreinscriptionPage } from '@/features/preinscription';

export default function App() {
  const { pathname } = useLocation();
  const section = pathname.split('/')[1];
  const privateSections = [
    'dashboard', 'resume-fiche-identification', 'fiche-identification',
    'presences', 'mouvements', 'attestations', 'certificats',
    'prestation-sociale', 'liste-utilisateurs', 'ajouter-utilisateur',
    'administration',
  ];

  return privateSections.includes(section) ? <AuthenticatedApp /> : <PublicApp />;
}

function PublicApp() {
  const { pathname } = useLocation();
  const isLoginPage = /^\/(login|connexion)\/?$/.test(pathname);
  //const initialized = useCryptoStore((state) => state.initialized);
  //const loading = useCryptoStore((state) => state.loading);
  //const error = useCryptoStore((state) => state.error);
  //const initialize = useCryptoStore((state) => state.initialize);

  useEffect(() => {
    pageRefreshService.start();
    return () => pageRefreshService.stop();
  }, []);

  const auth = useAuthStore((state) => state.auth);
  const loadAuth = useAuthStore((state) => state.loadAuth);

  
  useEffect(() => {
    if ( isLoginPage || auth) return;
    void loadAuth();
  }, [ isLoginPage, auth, loadAuth]);

  /*
  useEffect(() => {
    if (isLoginPage) return;
    void initialize().catch(() => {
      // Le store expose l'erreur pour l'afficher ci-dessous.
    });
  }, [initialize, isLoginPage]);
  */

  if (!isLoginPage ) {
    return <p role="status"></p>;
  }

  return (
    <div className="min-h-screen bg-gray-200 font-sans antialiased">
      <ScrollToTop />
      <div className="relative max-w-8xl mx-auto bg-white shadow-2xl min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/presentation" element={<PresentationPage />} />
            <Route path="/presentation/missions" element={<MissionsPage />} />
            <Route path="/presentation/vision" element={<VisionPage />} />
            <Route path="/presentation/valeurs" element={<ValeursPage />} />
            <Route path="/presentation/historique" element={<HistoriquePage />} />
            <Route path="/presentation/organigramme" element={<OrganigrammePage />} />
            <Route path="/presentation/fonctionnement" element={<FonctionnementPage />} />
            <Route path="/presentation/mot-du-directeur" element={<MotDuDirecteurPage />} />
            <Route path="/presentation/objectifs" element={<ObjectifsPage />} />
            <Route path="/presentation/detail" element={<PresentationDetailPage />} />
            <Route path="/services" element={<ServicesListPage />} />
            <Route path="/service/:slug" element={<ServiceDetailPage />} />
            <Route path="/actualites/:id" element={<ActualiteDetailPage />} />
            <Route path="/recrutement" element={<RecrutementPage />} />
            <Route path="/sygrhes" element={<SygrhesPage />} />
            <Route path="/contacts" element={<ContactPage />} />

            {/* Routes accessibles uniquement
            aux utilisateurs non connectés */}
            <Route element={<ProtectedGuestRoute />}>

              <Route
                path="/login"
                element={<LoginPage />}
              />

              <Route
                path="/preinscription"
                element={<PreinscriptionPage />} 
              />
              
            </Route>

          </Routes>
        </main>
        <Footer />
      </div>
      <ChatAssistant />
    </div>
  );
}
