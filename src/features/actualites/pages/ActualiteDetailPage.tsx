import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  ChevronLeft,
  Newspaper,
  ExternalLink,
  Share2,
} from 'lucide-react';
import { useActualiteById } from '../hooks/useActualites';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function ActualiteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: actualite, isLoading } = useActualiteById(id);

  if (isLoading) {
    return (
      <div className="pt-0 pb-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mb-6" />
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6" />
            <div className="h-64 bg-gray-200 rounded-2xl mb-6" />
            <div className="h-4 bg-gray-100 rounded w-full mb-3" />
            <div className="h-4 bg-gray-100 rounded w-5/6 mb-3" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!actualite) {
    return (
      <div className="pt-0 pb-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Actualité introuvable</h1>
          <p className="text-gray-500 mb-8">
            L'article que vous cherchez n'existe pas ou n'est plus disponible.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const paragraphs = actualite.contenu
    ? actualite.contenu.split('\n').filter((p) => p.trim().length > 0)
    : [actualite.description];

  return (
    <article className="pt-0 pb-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-orange-600 transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">Actualité</span>
        </nav>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <Calendar className="w-4 h-4 text-orange-500" />
          <time>{formatDate(actualite.date_publication)}</time>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
          {actualite.titre}
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          {actualite.description}
        </p>

        {actualite.image_url && (
          <div className="rounded-3xl overflow-hidden shadow-xl shadow-gray-900/10 mb-10">
            <img
              src={actualite.image_url}
              alt={actualite.titre}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-sm">
          <div className="prose prose-gray max-w-none">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-5 last:mb-0">
                {para}
              </p>
            ))}
          </div>

          {actualite.lien && (
            <a
              href={actualite.lien}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Consulter le lien associé
            </a>
          )}

          <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-3">
            <Share2 className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500 font-medium">Partager :</span>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: actualite.titre, url: window.location.href });
                } else {
                  navigator.clipboard?.writeText(window.location.href);
                }
              }}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Copier le lien
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
