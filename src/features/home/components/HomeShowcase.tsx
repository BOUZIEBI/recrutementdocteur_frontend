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
import { data, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useCommuniqueStore } from '@/store/useCommuniqueStore';
import { useActualiteStore } from '@/store/useActualiteStore';
import { usePhotothequeStore } from '@/store/usePhotothequeStore';
import { useNationaliteStore } from '@/store/useNationaliteStore';
import type { Phototheque } from '@/features/phototheque';
import { useServiceStore } from '@/store/useServiceStore';
import { getMediaUrl } from '@/shared/services/mediaService';
import { useCryptoStore } from '@/store/useCryptoStore';
import { useGenreStore } from '@/store/useGenreStore';
import ProceduresConditions from './ProceduresConditions';
import RecrutementSession from './RecrutementSession';




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

function CommuniqueResume({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTruncated = text.length > 200 && !isExpanded;

  return (
    <p className="text-sm text-gray-600 leading-relaxed mb-4">
      {isTruncated ? text.slice(0, 200) : text}
      {isTruncated && (
        <>
          {'... '}
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            aria-expanded={isExpanded}
            className="font-medium text-orange-600 hover:text-orange-700 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-600"
          >
            Lire plus
          </button>
        </>
      )}
    </p>
  );
}

export default function HomeShowcase() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const actualitesRef = useRef<HTMLDivElement>(null);
  const [actualitesPaused, setActualitesPaused] = useState(false);
  const photosRef = useRef<HTMLDivElement>(null);
  
  const [selectedPhoto, setSelectedPhoto] = useState<Phototheque | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const navigate = useNavigate();
  const auth = useAuthStore((state) => state.auth);
  
  const initialized = useCryptoStore((state) => state.initialized);
  const loadAuth = useAuthStore((state) => state.loadAuth);

  useEffect(() => {
    if (!initialized ||  auth) return;
    void loadAuth();
  }, [initialized, auth, loadAuth]);

  const openAgentSpace = () => {
    if (auth?.data?.is_active === true) {
      navigate('/fiche-identification/informations-generales');
    } else {
      navigate('/login');
    }
  };



  const communiqueData = useCommuniqueStore((state) => state.communiques);
  const loadingCommuniques = useCommuniqueStore(
    (state) => state.loading || (!state.loaded && !state.error),
  );
  const communiquesError = useCommuniqueStore((state) => state.error);
  const loadCommuniques = useCommuniqueStore((state) => state.loadCommuniques);

  const actualiteData = useActualiteStore((state) => state.actualites);
  const loadingActualites = useActualiteStore(
    (state) => state.loading || (!state.loaded && !state.error),
  );
  const actualitesError = useActualiteStore((state) => state.error);
  const loadActualites = useActualiteStore((state) => state.loadActualites);

  const serviceData = useServiceStore((state) => state.services);
  const loadingServices = useServiceStore(
    (state) => state.loading || (!state.loaded && !state.error),
  );
  const servicesError = useServiceStore((state) => state.error);
  const loadServices = useServiceStore((state) => state.loadServices);

  const photothequeData = usePhotothequeStore((state) => state.phototheques);
  const loadingPhototheques = usePhotothequeStore(
    (state) => state.loading || (!state.loaded && !state.error),
  );
  const photothequesError = usePhotothequeStore((state) => state.error);
  const loadPhototheques = usePhotothequeStore((state) => state.loadPhototheques);



  useEffect(() => {
    void loadCommuniques();
  }, [loadCommuniques]);

  const communiques = useMemo(() => {
    if (!communiqueData) return [];
    const visible = communiqueData.filter((c) => !c.is_deleted && ( c.statut === 'publie' || c.statut === 'brouillon'));
    return [...visible]
      .sort((a, b) => {
        const da = a.date_publication ? new Date(a.date_publication).getTime() : 0;
        const db = b.date_publication ? new Date(b.date_publication).getTime() : 0;
        return db - da;
      })
      .slice(0, 6);
  }, [communiqueData]);


  useEffect(() => {
    void loadPhototheques();
  }, [loadPhototheques]);

  const phototheques = useMemo(() => {
    if (!photothequeData) return [];
    const visible = photothequeData.filter((c) => !c.is_deleted && ( c.statut === 'publie' || c.statut === 'brouillon'));
    return [...visible]
      .sort((a, b) => {
        const da = a.date_publication ? new Date(a.date_publication).getTime() : 0;
        const db = b.date_publication ? new Date(b.date_publication).getTime() : 0;
        return db - da;
      })
      .slice(0, 6);
  }, [photothequeData]);


  useEffect(() => {
    void loadActualites();
  }, [loadActualites]);

  const actualites = useMemo(() => {
      const visible = actualiteData.filter((c) => !c.is_deleted && (c.categorie_actualite?.code ==="DERNIEREACTUALITE") && ( c.statut === 'publie' || c.statut === 'brouillon'));
      return [...visible]
      .sort((a, b) => {
        const da = a.date_publication ? new Date(a.date_publication).getTime() : 0;
        const db = b.date_publication ? new Date(b.date_publication).getTime() : 0;
        return db - da;
      })
      .slice(0, 6);
  }, [actualiteData]);

  const slides = useMemo(() => actualiteData
    .filter((actualite) => !actualite.is_deleted
      && actualite.categorie_actualite?.code === 'ACTUALITESPECIALE'
      && (actualite.statut === 'publie' || actualite.statut === 'brouillon'))
    .sort((a, b) => (Date.parse(b.date_publication) || 0) - (Date.parse(a.date_publication) || 0))
    .map((actualite) => ({
      uid: actualite.uid,
      image: actualite.fichier_url || (actualite.fichier_key ? getMediaUrl(actualite.fichier_key) : null),
      title: actualite.titre,
      alt: actualite.image_alt || actualite.titre,
      text: actualite.resume || actualite.contenu,
    })), [actualiteData]);

  useEffect(() => {
    setCurrent(0);
  }, [slides]);

  const next = useCallback(() => {
    setCurrent((prev) => slides.length ? (prev + 1) % slides.length : 0);
  }, [slides.length]);

  const prev = () => {
    setCurrent((prev) => slides.length ? (prev - 1 + slides.length) % slides.length : 0);
  };

  useEffect(() => {
    if (isPaused || slides.length < 2) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [isPaused, next, slides.length]);

  const scrollActualites = useCallback((direction: 'left' | 'right') => {
    const container = actualitesRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 1) return;

    const card = container.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(window.getComputedStyle(container).columnGap) || 0;
    const step = (card?.getBoundingClientRect().width ?? container.clientWidth) + gap;
    const atStart = container.scrollLeft <= 1;
    const atEnd = container.scrollLeft >= maxScroll - 1;
    const target = direction === 'right'
      ? (atEnd ? 0 : Math.min(container.scrollLeft + step, maxScroll))
      : (atStart ? maxScroll : Math.max(container.scrollLeft - step, 0));

    container.scrollTo({
      left: target,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, []);

  useEffect(() => {
    if (loadingActualites || actualitesError || actualitesPaused || actualites.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) scrollActualites('right');
    }, 2000);
    return () => window.clearInterval(timer);
  }, [loadingActualites, actualitesError, actualitesPaused, actualites.length, scrollActualites]);



  const services = useMemo(() => {
      const visible = serviceData.filter((c) => !c.is_deleted && ( c.statut === 'publie' || c.statut === 'brouillon'));
      return [...visible]
      .sort((a, b) => {
        const da = a.cree_le ? new Date(a.cree_le).getTime() : 0;
        const db = b.cree_le ? new Date(b.cree_le).getTime() : 0;
        return db - da;
      })
      .slice(0, 6);
  }, [serviceData]);

  useEffect(() => {
    void loadServices();
  }, [loadServices]);

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
    <section className="pt-2 pb-24 bg-gray-50 ">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="">

          <ProceduresConditions />
          <RecrutementSession />

        </div>
      </div>
    </section>
  );
}
