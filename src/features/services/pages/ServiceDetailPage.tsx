import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Layers,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { services, getServiceBySlug } from '../api/service.api';
import PageBanner from '@/shared/components/PageBanner';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
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

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const Icon = service.icon;

  return (
    <div className="pt-0">
      <PageBanner
        title={service.title}
        subtitle={service.desc}
        image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-orange-600 transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-orange-600 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-gray-600 font-medium">{service.title}</span>
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
              {service.title}
            </h1>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            {service.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-12">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-6 mb-14">
            {service.contenu.map((para, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700 leading-relaxed text-lg">{para}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 sm:p-10 text-center shadow-xl shadow-orange-500/20">
            <h2 className="text-2xl font-bold text-white mb-3">
              Intéressé par ce service ?
            </h2>
            <p className="text-white/85 mb-6 max-w-xl mx-auto">
              Contactez notre équipe pour discuter de votre projet et obtenir un accompagnement personnalisé.
            </p>
            <button
              onClick={() => navigate('/contacts')}
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-orange-50 transition-colors group"
            >
              Demander un devis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Autres services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {others.map((s) => {
              const OtherIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
                >
                  <div className="bg-orange-500 rounded-xl p-3 w-fit mb-4 group-hover:bg-orange-600 transition-colors">
                    <OtherIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {s.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-600 group-hover:gap-2 transition-all">
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
