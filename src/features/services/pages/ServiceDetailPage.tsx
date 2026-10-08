import { useParams, useNavigate, Link, data } from 'react-router-dom';
import {
  ChevronLeft,
  Layers,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { useServices } from '../hooks/useServices';
import PageBanner from '@/shared/components/PageBanner';

import { useServiceByIdBySlug } from '../hooks/useServices';



export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();


  const {
    data: service,
    isLoading,
    isError,
    error,
  } = useServiceByIdBySlug(slug);

  //const { data_autes_serives, isLoading_autres_services, error, refetch } = useServices();
  //const services = data.filter((item) => !item.is_deleted);
  //const service = services.find((item) => item.slug === slug);

  if (isLoading) 
    return <p role="status" className="p-8">Chargement du service…</p>;

  if (isError) {
    return (
      <div className="pt-0 pb-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Layers className="w-12 h-12 text-red-300 mx-auto mb-4" />

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Impossible de charger le service
          </h1>

          <p className="text-gray-500 mb-8">
            {error ?? "Une erreur est survenue."}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="pt-0 pb-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Service introuvable</h1>
          <p className="text-gray-500 mb-8">
            Le service que vous cherchez n'existe pas.
          </p>
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voir tous les services
          </button>
        </div>
      </div>
    );
  }

  //const others = data.filter((s) => s.slug !== data.slug).slice(0, 3);
  const Icon = Layers;

  return (
    <div className="pt-0">
      <PageBanner
        title={service?.libelle}
        subtitle={service?.description_courte}
        image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-orange-600 transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-orange-600 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-gray-600 font-medium">{service?.libelle}</span>
          </nav>

          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Tous les services
          </button>

          <div className="flex items-center gap-4 mb-10">
            <div className="bg-orange-500 rounded-2xl p-4">
              <Icon className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {service?.libelle}
            </h1>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            {service?.description_courte}
          </p>

          <div className="space-y-6 mb-14">
            {(service?.description || '').split('\n').filter((paragraph) => paragraph.trim()).map((para, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700 leading-relaxed text-lg">{para}</p>
              </div>
            ))}
          </div>


        </div>
      </section>

    </div>
  );
}
