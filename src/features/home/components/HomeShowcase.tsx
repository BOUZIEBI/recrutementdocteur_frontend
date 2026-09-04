import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  Calendar,
  Briefcase,
  UserCheck,
  ArrowUpRight,
  ChevronDown,
  Newspaper,
  Camera,
  X,
  ZoomIn,
  LogIn,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useActualites } from '@/features/actualites';
import { useCommuniques } from '@/features/communiques';
import { usePhotos } from '@/features/phototheque';
import type { Photothèque } from '@/features/phototheque';
import { services as allServices } from '@/features/services';

const slides = [
  {
    image: 'https://images.pexels.com/photos/1181738/pexels-photo-1181738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Réunion stratégique RH',
    text: "Nos experts accompagnent vos équipes dans l'élaboration et la mise en place de stratégies RH efficaces et adaptées à votre secteur d'activité.",
  },
  {
    image: 'https://images.pexels.com/photos/7698712/pexels-photo-7698712.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Formation des collaborateurs',
    text: "Nous concevons des programmes de formation sur mesure pour développer les compétences de vos employés et renforcer leur engagement au quotidien.",
  },
  {
    image: 'https://images.pexels.com/photos/20752572/pexels-photo-20752572.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Conseil et accompagnement',
    text: "Notre équipe de consultants vous guide dans la prise de décisions RH clés : recrutement, mobilité, gestion de carrière et transformation organisationnelle.",
  },
  {
    image: 'https://images.pexels.com/photos/7108454/pexels-photo-7108454.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Collaboration et teamwork',
    text: "Nous croyons que la réussite d'une entreprise repose sur la cohésion de ses équipes. Nous mettons tout en œuvre pour créer un climat de confiance et de collaboration.",
  },
  {
    image: 'https://images.pexels.com/photos/7433869/pexels-photo-7433869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Gestion administrative',
    text: "Confiez-nous la gestion administrative de votre personnel : contrats, paie, déclarations sociales. Nous garantissons conformité et sérénité au quotidien.",
  },
];

const services = allServices.map((s) => ({
  icon: s.icon,
  title: s.title,
  desc: s.desc,
  slug: s.slug,
}));

const director = {
  image: '/ministre_.png',
  firstName: 'Prof. ADAMA',
  lastName: 'DIAWARA',
  role: "Ministre de l'Enseignement Supérieur de la Recherche Scientifique",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function getFileUrl(filePath: string): string {
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) return filePath;
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/communiques/${filePath}`;
}

export default function HomeShowcase() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const actualitesRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photothèque | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const navigate = useNavigate();

  const { data: communiqueData, isLoading: loadingCommuniques } = useCommuniques();
  const { data: actualites = [], isLoading: loadingActualites } = useActualites(8);
  const { data: photos = [], isLoading: loadingPhotos } = usePhotos();

  const communiques = useMemo(() => {
    if (!communiqueData) return [];
    const visible = communiqueData.filter((c) => !c.is_deleted && c.statut === 'publie');
    return [...visible]
      .sort((a, b) => {
        const da = a.date_publication ? new Date(a.date_publication).getTime() : 0;
        const db = b.date_publication ? new Date(b.date_publication).getTime() : 0;
        return db - da;
      })
      .slice(0, 6);
  }, [communiqueData]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const scrollActualites = (direction: 'left' | 'right') => {
    const container = actualitesRef.current;
    if (!container) return;
    const scrollAmount = 340;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollPhotos = (direction: 'left' | 'right') => {
    const container = photosRef.current;
    if (!container) return;
    const scrollAmount = 360;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="pt-0 pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div
            className="lg:col-span-2 pt-2 relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/20 aspect-[16/10] bg-gray-200">
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === current ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-lg">
                      {slide.text}
                    </p>
                  </div>
                </div>
              ))}

              <button
                onClick={prev}
                aria-label="Image précédente"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2.5 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Image suivante"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2.5 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 right-6 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Aller à l'image ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? 'w-8 bg-orange-500'
                        : 'w-2 bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/20 h-[450px] group">
              <img
                src={director.image}
                alt={`${director.firstName} ${director.lastName}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-2 rounded-2xl p-5 text-center shadow-lg" style={{ backgroundColor: '#133458' }}>
              <h3 className="text-white text-xl font-bold leading-tight mb-1">
                {director.firstName} {director.lastName}
              </h3>
              <p className="text-white/80 text-sm font-medium">Ministre de l'Enseignement Supérieur et de la Recherche Scientifique</p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Communiqués</h2>
            </div>

            {loadingCommuniques ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-5/6 mb-6" />
                    <div className="h-8 bg-gray-100 rounded w-32" />
                  </div>
                ))}
              </div>
            ) : communiques.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Aucun communiqué disponible pour le moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {communiques.map((comm) => (
                  <article
                    key={comm.uid}
                    className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:shadow-gray-900/5 hover:border-orange-200 transition-all duration-300 flex flex-col sm:flex-row sm:items-start sm:gap-6"
                  >
                    <div className="flex flex-col gap-1 mb-3 sm:mb-2">
                      {comm.reference && (
                        <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full w-fit">
                          {comm.reference}
                        </span>
                      )}
                      {comm.date_publication && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <time>{formatDate(comm.date_publication)}</time>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-orange-600 transition-colors">
                        {comm.titre ?? comm.reference ?? 'Communiqué'}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {comm.resume ?? comm.contenu}
                      </p>
                    </div>

                    {comm.fichier_key && (
                      <a
                        href={getFileUrl(comm.fichier_key)}
                        download
                        className="inline-flex items-center gap-2 self-start text-sm font-medium text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Télécharger
                      </a>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div
              onClick={() => navigate('/recrutement')}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
              <div className="absolute -right-2 -bottom-8 w-16 h-16 bg-white/10 rounded-full" />
              <div className="relative">
                <Briefcase className="w-8 h-8 text-white mb-3" />
                <h3 className="text-xl font-bold text-white mb-4">Recrutement session 2026</h3>
                <ul className="space-y-2.5">
                  <li>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors w-full">
                      <span className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                      Inscription
                    </span>
                  </li>
                  <li>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors w-full">
                      <span className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                      Voir l'arrêté d'ouverture du concours
                    </span>
                  </li>
                  <li>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors w-full">
                      <span className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                      Connexion ESPACE CANDIDAT
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div
              onClick={() => navigate('/login')}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-700 to-green-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
              <div className="absolute -right-2 -bottom-8 w-16 h-16 bg-white/10 rounded-full" />
              <div className="relative">
                <UserCheck className="w-8 h-8 text-white mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">Mon Espace Agent DRH-MESRS</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  Accédez à vos informations et démarches administratives.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/20 px-4 py-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  <LogIn className="w-4 h-4" />
                  ME CONNECTER A MON ESPACE
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Dernières actualités</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollActualites('left')}
                aria-label="Actualités précédentes"
                className="bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-600 hover:text-orange-600 p-2.5 rounded-full transition-all duration-200 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollActualites('right')}
                aria-label="Actualités suivantes"
                className="bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-600 hover:text-orange-600 p-2.5 rounded-full transition-all duration-200 shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {loadingActualites ? (
            <div className="flex gap-6 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[300px] bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse overflow-hidden"
                >
                  <div className="h-40 bg-gray-200" />
                  <div className="p-5">
                    <div className="h-3 bg-gray-200 rounded w-20 mb-3" />
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : actualites.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <Newspaper className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Aucune actualité disponible pour le moment.</p>
            </div>
          ) : (
            <div
              ref={actualitesRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {actualites.map((act) => (
                <article
                  key={act.id}
                  onClick={() => navigate(`/actualites/${act.id}`)}
                  className="group flex-shrink-0 w-[300px] snap-start bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-900/5 hover:border-orange-200 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                >
                  {act.image_url ? (
                    <div className="h-40 overflow-hidden bg-gray-100">
                      <img
                        src={act.image_url}
                        alt={act.titre}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                      <Newspaper className="w-12 h-12 text-orange-300" />
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <time>{formatDate(act.date_publication)}</time>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                      {act.titre}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">
                      {act.description}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
                      Lire la suite
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Nos services</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllServices ? services : services.slice(0, 3)).map((service) => (
              <div
                key={service.slug}
                onClick={() => navigate(`/services/${service.slug}`)}
                className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative">
                  <div className="bg-orange-500 rounded-xl p-3 w-fit mb-5 group-hover:bg-orange-600 transition-colors duration-200">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  <span className="text-orange-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                    En savoir plus
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {!showAllServices && services.length > 3 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAllServices(true)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
              >
                <ChevronDown className="w-5 h-5" />
                Voir plus
              </button>
            </div>
          )}
        </div>

        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">PHOTOTHÈQUE</h2>
          </div>

          <p className="text-gray-600 mb-8 max-w-2xl">
            Découvrez en images les grands évènements marquants  notre Direction des Ressources Humaines
          </p>

          {loadingPhotos ? (
            <div className="flex gap-6 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[320px] bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse overflow-hidden"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : photos.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <Camera className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Aucune photo disponible pour le moment.</p>
            </div>
          ) : (
            <>
              <div
                ref={photosRef}
                className="flex gap-0 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {photos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => {
                      const idx = photos.findIndex((p) => p.id === photo.id);
                      setPhotoIndex(idx);
                      setSelectedPhoto(photo);
                    }}
                    className="group relative flex-shrink-0 w-[320px] snap-start overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300 aspect-[4/3] cursor-pointer"
                  >
                    <img
                      src={photo.image_url}
                      alt={photo.titre}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/20 to-transparent opacity-90" />
                    <div className="absolute top-3 right-3 bg-white/90 text-gray-700 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                      {photo.date_evenement && (
                        <div className="flex items-center gap-2 text-xs text-white/80 mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <time>{formatDate(photo.date_evenement)}</time>
                        </div>
                      )}
                      <h3 className="text-white font-bold text-base leading-snug line-clamp-2">
                        {photo.titre}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => scrollPhotos('left')}
                  aria-label="Photos précédentes"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Précédent
                </button>
                <button
                  onClick={() => scrollPhotos('right')}
                  aria-label="Photos suivantes"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
                >
                  Suivant
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>

        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Fermer"
              className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const prevIdx = (photoIndex - 1 + photos.length) % photos.length;
                setPhotoIndex(prevIdx);
                setSelectedPhoto(photos[prevIdx]);
              }}
              aria-label="Photo précédente"
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const nextIdx = (photoIndex + 1) % photos.length;
                setPhotoIndex(nextIdx);
                setSelectedPhoto(photos[nextIdx]);
              }}
              aria-label="Photo suivante"
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.image_url}
                alt={selectedPhoto.titre}
                className="w-full max-h-[75vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                {selectedPhoto.date_evenement && (
                  <p className="text-white/60 text-sm mb-1">
                    {formatDate(selectedPhoto.date_evenement)}
                  </p>
                )}
                <h3 className="text-white text-xl font-bold">{selectedPhoto.titre}</h3>
                {selectedPhoto.description && (
                  <p className="text-white/70 text-sm mt-2 max-w-2xl mx-auto">
                    {selectedPhoto.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
