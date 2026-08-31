import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeShowcase from '@/components/HomeShowcase';
import Presentation from '@/pages/Presentation';
import Missions from '@/pages/presentation/Missions';
import Vision from '@/pages/presentation/Vision';
import Valeurs from '@/pages/presentation/Valeurs';
import Historique from '@/pages/presentation/Historique';
import Organigramme from '@/pages/presentation/Organigramme';
import Fonctionnement from '@/pages/presentation/Fonctionnement';
import MotDuDirecteur from '@/pages/presentation/MotDuDirecteur';
import Objectifs from '@/pages/presentation/Objectifs';
import PresentationDetail from '@/pages/presentation/PresentationDetail';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import ActualiteDetail from '@/pages/ActualiteDetail';
import Recrutement from '@/pages/Recrutement';
import Sygrhes from '@/pages/Sygrhes';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Preinscription from '@/pages/Preinscription';

function Home() {
  return <HomeShowcase />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-200 font-sans antialiased">
      <ScrollToTop />
      <div className="relative max-w-7xl mx-auto bg-white shadow-2xl min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/presentation/missions" element={<Missions />} />
            <Route path="/presentation/vision" element={<Vision />} />
            <Route path="/presentation/valeurs" element={<Valeurs />} />
            <Route path="/presentation/historique" element={<Historique />} />
            <Route path="/presentation/organigramme" element={<Organigramme />} />
            <Route path="/presentation/fonctionnement" element={<Fonctionnement />} />
            <Route path="/presentation/mot-du-directeur" element={<MotDuDirecteur />} />
            <Route path="/presentation/objectifs" element={<Objectifs />} />
            <Route path="/presentation/detail" element={<PresentationDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/actualites/:id" element={<ActualiteDetail />} />
            <Route path="/recrutement" element={<Recrutement />} />
            <Route path="/sygrhes" element={<Sygrhes />} />
            <Route path="/contacts" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/preinscription" element={<Preinscription />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}
