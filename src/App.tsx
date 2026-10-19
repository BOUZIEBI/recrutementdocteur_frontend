import { useEffect } from 'react';
import AuthenticatedApp from '@/pages/AuthenticatedApp';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import ScrollToTop from '@/shared/components/ScrollToTop';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
import { ChatAssistant } from '@/features/chatbot';
import { HomePage, ResultatsRecrutementPage } from '@/features/home';
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

import { RecrutementPage } from '@/features/recrutement';
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
    'administration', 'espace',
  ];

  return privateSections.includes(section) ? <AuthenticatedApp /> : <PublicApp />;
}

function PublicApp() {
  const { pathname } = useLocation();
  const isLoginPage = /^\/(login|connexion)\/?$/.test(pathname);
  const isAuthenticationPage = /^\/(login|connexion|preinscription)\/?$/.test(pathname);
  
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
 
  return (
    <div className={`min-h-screen ${isAuthenticationPage ? 'bg-white' : 'bg-gray-200'} font-sans antialiased`}>
      <ScrollToTop />
      <div className="relative max-w-8xl mx-auto bg-white shadow-2xl min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/presentation" element={<PresentationPage />} />
            <Route path="/presentation/mot-du-directeur" element={<MotDuDirecteurPage />} />
            <Route path="/recrutement" element={<RecrutementPage />} />
            <Route path="/recrutement/resultats-session-2026" element={<ResultatsRecrutementPage />} />
            <Route path="/contacts" element={<ContactPage />} />

            <Route path="/preinscription" element={<PreinscriptionPage />} />

            {/* Routes accessibles uniquement
            aux utilisateurs non connectés */}
            <Route element={<ProtectedGuestRoute />}>

              <Route
                path="/login"
                element={<LoginPage />}
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
