import { useNavigate } from 'react-router-dom';
import PageBanner from '@/shared/components/PageBanner';
import { ArrowRight } from 'lucide-react';

export default function SygrhesPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-0">
      <PageBanner
        title="SYGRH"
        subtitle="Système de Gestion des Ressources Humaines — la solution complète et digitale de la Direction des Ressources Humaines."
        image="https://images.pexels.com/photos/1181738/pexels-photo-1181738.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      <section
        className="py-24 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/sygrh-bg.webp')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-orange-500/90 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              Qu'est-ce que SYGRH ?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Votre plateforme de gestion du personnel
            </h2>
            <p className="text-gray-100 text-3xl mb-8 leading-relaxed drop-shadow">
              SYGRH est un Système de Gestion des Ressources Humaines conçu pour
              simplifier et automatiser l'ensemble des tâches administratives de
              la Direction des Ressources Humaines du Ministère de l'Enseignement
              Supérieur et de la Recherche Scientifique.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 inline-flex items-center gap-2 group"
            >
              Accéder à votre Espace Agent DRH-MESRS
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
