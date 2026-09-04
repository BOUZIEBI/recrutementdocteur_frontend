import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '@/shared/components/ScrollToTop';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
import { ChatAssistant } from '@/features/chatbot';
import { HomePage } from '@/features/home';
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
  return (
    <div className="min-h-screen bg-gray-200 font-sans antialiased">
      <ScrollToTop />
      <div className="relative max-w-7xl mx-auto bg-white shadow-2xl min-h-screen flex flex-col">
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
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/actualites/:id" element={<ActualiteDetailPage />} />
            <Route path="/recrutement" element={<RecrutementPage />} />
            <Route path="/sygrhes" element={<SygrhesPage />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/preinscription" element={<PreinscriptionPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ChatAssistant />
    </div>
  );
}
