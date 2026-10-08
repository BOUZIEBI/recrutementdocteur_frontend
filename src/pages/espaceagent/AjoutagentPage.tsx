import { type ChangeEvent, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Loader2, Save, X } from 'lucide-react';
import PageBreadcrumb from '@/shared/components/PageBreadcrumb';
import { useTypeagentStore } from '@/store/useTypeagentStore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDepartementStore } from '@/store/useDepartementStore';
import { useNationaliteStore } from '@/store/useNationaliteStore';
import { useStructureStore } from '@/store/useStructureStore';
import { useStatutStore } from '@/store/useStatutStore';
import { useGenreStore } from '@/store/useGenreStore';
import { useAgentStore } from '@/store/useAgentStore';
import { ajouterAgent } from '@/features/agents/api/agent.api';



interface Option {
  value: string;
  label: string;
}

interface AjoutagentPageProps {
  title: string;
  breadcrumb?: string;
  lieuxNaissance?: Option[];
  nationalites?: Option[];
  genres?: Option[];
  structures?: Option[];
  statuts?: Option[];
}

const fieldClass = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#FC6C0C] focus:outline-none focus:ring-0 ';
const labelClass = 'mb-2 block text-sm font-medium text-gray-700';
const defaultGenres: Option[] = [
  { value: 'masculin', label: 'Masculin' },
  { value: 'feminin', label: 'Féminin' },
];

function RequiredMark() {
  return <><span className="text-red-600" aria-hidden="true"> *</span><span className="sr-only"> (obligatoire)</span></>;
}

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');
}

function SearchableSelect({ name, label, options, onValueChange, loading = false }: { name: string; label: string; options: Option[]; onValueChange?: (value: string) => void; loading?: boolean }) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const filtered = options.filter((option) => normalize(option.label).includes(normalize(search.trim())));
  const selectedOption = options.find((option) => option.value === selected);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointer);
    return () => document.removeEventListener('pointerdown', handlePointer);
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${activeIndex}`)?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex, id]);

  const choose = (value: string) => {
    setSelected(value);
    onValueChange?.(value);
    setInvalid(!value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }} onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }}>
      <label htmlFor={id} className={labelClass}>{label}<RequiredMark /></label>
      <select
        name={name} required tabIndex={-1} aria-label={label}
        className="sr-only" value={selectedOption?.value || ''}
        onChange={(event) => choose(event.target.value)}
        onInvalid={(event) => {
          event.preventDefault();
          setInvalid(true);
          triggerRef.current?.focus();
        }}
      >
        <option value="">Sélectionner…</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <button
        ref={triggerRef} id={id} type="button" aria-haspopup="dialog"
        aria-expanded={open} aria-controls={`${id}-menu`}
        aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined}
        aria-busy={loading}
        disabled={loading}
        className={`${fieldClass} flex items-center justify-between gap-2 text-left disabled:cursor-wait disabled:bg-gray-50 disabled:text-gray-500`}
        onClick={() => { setOpen(!open); setSearch(''); setActiveIndex(-1); }}
      >
        <span>{loading ? 'Chargement des types d’agents…' : selectedOption?.label || 'Sélectionner…'}</span>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <span aria-hidden="true">▾</span>}
      </button>
      {invalid && <p id={`${id}-error`} className="mt-1 text-sm text-red-600">Veuillez sélectionner une valeur.</p>}
      {open && (
        <div id={`${id}-menu`} role="dialog" aria-label={label} className="absolute left-0 right-0 z-30 mt-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
          <input
            autoFocus type="text" role="combobox" aria-label={`Rechercher : ${label}`}
            aria-expanded={true} aria-autocomplete="list" aria-controls={`${id}-options`}
            aria-activedescendant={filtered[activeIndex] ? `${id}-option-${activeIndex}` : undefined}
            value={search} placeholder="Rechercher…" className={`${fieldClass.replace('focus:border-[#FC6C0C]', 'focus:border-[#C8C6C6]')} mb-2`}
            onChange={(event) => { setSearch(event.target.value); setActiveIndex(-1); }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                setActiveIndex((index) => Math.max(0, Math.min(filtered.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1))));
              }
              if (event.key === 'Enter') {
                event.preventDefault();
                if (filtered[activeIndex]) choose(filtered[activeIndex].value);
              }
            }}
          />
          <ul id={`${id}-options`} role="listbox" aria-label={label} className="max-h-48 overflow-y-auto">
            {filtered.map((option, index) => (
              <li key={option.value} id={`${id}-option-${index}`} role="option" aria-selected={option.value === selected}
                className={`cursor-pointer rounded px-3 py-2 text-sm ${activeIndex === index ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(option.value)}
              >{option.label}</li>
            ))}
          </ul>
          {filtered.length === 0 && <p role="status" className="px-3 py-2 text-sm text-gray-500">{options.length ? 'Aucun résultat' : 'Aucune option disponible'}</p>}
          {selected && <button type="button" className="mt-2 px-3 py-1 text-sm text-gray-600 underline" onClick={() => choose('')}>Effacer la sélection</button>}
        </div>
      )}
    </div>
  );
}

function AjoutagentPage({
  title, breadcrumb, lieuxNaissance = [], nationalites = [],
  genres = defaultGenres, structures = [], statuts = [],
}: AjoutagentPageProps) {
  const navigate = useNavigate();
  const id = useId();
  const [formVersion, setFormVersion] = useState(0);
  const [typeAgent, setTypeAgent] = useState('');
  const [departement, setDepartement] = useState('');
  const [nationalite, setNationalite] = useState('');
  const [genre, setGenre] = useState('');
  const [structure, setStructure] = useState('');
  const [statut, setStatut] = useState('');
  const [matricule, setMatricule] = useState('');
  const [nom, setNom] = useState('');
  const [prenoms, setPrenoms] = useState('');
  const [date_naissance, setDate_naissance] = useState('');

  const onTypeagentChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setMatricule(event.target.value);
  };
 
  const onMatriculeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setMatricule(event.target.value);
  };
  const onNomChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const nomSaisi = event.target.value;
    setNom(nomSaisi);
  };

  const onPrenomsChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const prenomsSaisi = event.target.value;
    setPrenoms(prenomsSaisi)
  };

  const onDatenaissanceChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setDate_naissance(event.target.value);
  };

  const typeagentData = useTypeagentStore((state) => state.typeagents);
  const loadingTypeagents = useTypeagentStore((state) => state.loading || (!state.loaded && !state.error));
  const loadTypeagents = useTypeagentStore((state) => state.loadTypeagents);

  const structureData = useStructureStore((state) => state.structures);
  const loadingStructures = useStructureStore((state) => state.loading || (!state.loaded && !state.error));
  const loadStructures = useStructureStore((state) => state.loadStructures);

  const statutData = useStatutStore((state) => state.statuts);
  const loadingStatuts = useStatutStore((state) => state.loading || (!state.loaded && !state.error));
  const loadStatuts = useStatutStore((state) => state.loadStatuts);


  const genreData = useGenreStore((state) => state.genres);
  const loadingGenres = useGenreStore((state) => state.loading || (!state.loaded && !state.error));
  const loadGenres = useGenreStore((state) => state.loadGenres);


  //const { data: photos = [], isLoading: loadingPhotos } = usePhotos();

  useEffect(() => {
    void loadGenres();
  }, [loadGenres]);

  useEffect(() => {
    void loadGenres();
  }, [loadGenres]);

  useEffect(() => {
    void loadStatuts();
  }, [loadStatuts]);

  useEffect(() => {
    void loadStructures();
  }, [loadStructures]);

  useEffect(() => {
    void loadTypeagents();
  }, [loadTypeagents]);

  const departementData = useDepartementStore((state) => state.departements);
  const loadingDepartements = useDepartementStore((state) => state.loading || (!state.loaded && !state.error));
  const loadDepartements = useDepartementStore((state) => state.loadDepartements);

  useEffect(() => {
    void loadDepartements();
  }, [loadDepartements]);


  const nationaliteData = useNationaliteStore((state) => state.nationalites);
  const loadingNationalites = useNationaliteStore((state) => state.loading || (!state.loaded && !state.error));
  const loadNationalites = useNationaliteStore((state) => state.loadNationalites);
  useEffect(() => {
    void loadNationalites();
  }, [loadNationalites]);



  const genres_ = useMemo(
      () =>
        genreData
          .filter(
            (genre) =>
              Boolean(genre?.code) &&
              Boolean(genre?.libelle),
          )
          .map((genre) => ({
            value: genre.uid,
            label: genre.libelle,
          })),
      [genreData],
  );

  const statuts_ = useMemo(
      () =>
        statutData
          .filter(
            (statut) =>
              Boolean(statut?.code) &&
              Boolean(statut?.libelle),
          )
          .map((statut) => ({
            value: statut.uid,
            label: statut.libelle,
          })),
      [statutData],
  );
  
  const nationalites_ = useMemo(
      () =>
        nationaliteData
          .filter(
            (nationalite) =>
              Boolean(nationalite?.code) &&
              Boolean(nationalite?.libelle),
          )
          .map((nationalite) => ({
            value: nationalite.uid,
            label: nationalite.libelle,
          })),
      [nationaliteData],
  );

  const typeagents = useMemo(
      () =>
        typeagentData
          .filter(
            (typeagent) =>
              Boolean(typeagent?.code) &&
              Boolean(typeagent?.libelle),
          )
          .map((typeagent) => ({
            value: typeagent.uid,
            label: typeagent.libelle,
          })),
      [typeagentData],
  );
  const requiresMatricule = typeAgent === 'FONCTIONNAIREETAGENTDELETA';

  const departements = useMemo(
      () =>
        departementData
          .filter(
            (departement) =>
              Boolean(departement?.code) &&
              Boolean(departement?.libelle),
          )
          .map((departement) => ({
            value: departement.uid,
            label: departement.libelle,
          })),
      [departementData],
  );

  const structures_ = useMemo(
      () =>
        structureData
          .filter(
            (structure) =>
              Boolean(structure?.code) &&
              Boolean(structure?.libelle),
          )
          .map((structure) => ({
            value: structure.uid,
            label: structure.libelle,
          })),
      [structureData],
  );


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await ajouterAgent(
        typeAgent,
        typeAgent === '86cc55c2-c23d-4da2-9162-fdd94e84263b' ? matricule : '',
        nom,
        prenoms,
        date_naissance,
        departement,
        nationalite,
        genre,
        structure,
        statut,
      );
      if (!response.success) {
        setSubmitError(response.message || 'Impossible d’ajouter cet agent.');
        return;
      }

      await useAgentStore.getState().loadAgents(true);
      
      await Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Enregistrement de l’Agent effectué avec succès.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      
      navigate('/administration/agents/liste', { replace: true });
    } catch (error) {
      
      setSubmitError(error instanceof Error ? error.message : 'Impossible d’ajouter cet agent.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="titre-libelle-page">
        <h3>Système de Gestion des Ressources Humaines du MESRS</h3>
        <p>Espace Administrateur : <b>ADMINISTRATION CENTRALE</b></p>
        <PageBreadcrumb fallback={title} override={breadcrumb} />
      </div>
      <div className="content-section">
        <h1>{title}</h1>
        <div className="informations-section">
          <div className="header-section">
            <h2 id={`${id}-title`} className="mb-6 text-[18px] font-semibold underline decoration-gray-300 decoration-1 underline-offset-8">État civil</h2>
          </div>
          <div className="formulaire-ajout-section">
            <form key={formVersion} onSubmit={handleSubmit} onReset={() => {
              setTypeAgent('');
              setDepartement('');
              setNationalite('');
              setGenre('');
              setStructure('');
              setStatut('');
              setMatricule('');
              setNom('');
              setPrenoms('');
              setDate_naissance('');
              setSubmitError(null);
              setFormVersion((version) => version + 1);
            }} aria-labelledby={`${id}-title`} className="grid grid-cols-1 gap-5 md:grid-cols-2">
              
              <div className='grid grid-cols-1 gap-5 md:col-span-2 md:grid-cols-2'>
                <SearchableSelect name="type_agent" label="Type d’agent" options={typeagents} onValueChange={setTypeAgent} loading={loadingTypeagents} />
                {typeAgent === '86cc55c2-c23d-4da2-9162-fdd94e84263b' && <div>
                  <label htmlFor={`${id}-matricule`} className={labelClass}>Matricule<RequiredMark /></label>
                  <input id={`${id}-matricule`} onChange={onMatriculeChange} name="matricule" required type="text" className={fieldClass} />
                </div>}
              </div>
              
              <div className="grid grid-cols-1 gap-5 md:col-span-2 md:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-nom`} className={labelClass}>Nom<RequiredMark /></label>
                  <input id={`${id}-nom`} name="nom" required type="text" onChange={onNomChange} autoComplete="family-name" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor={`${id}-prenoms`} className={labelClass}>Prénoms<RequiredMark /></label>
                  <input id={`${id}-prenoms`} name="prenoms" required type="text" onChange={onPrenomsChange} autoComplete="given-name" className={fieldClass} />
                </div>
              </div>
              <div className='grid grid-cols-1 gap-5 md:col-span-2 md:grid-cols-2'>
                <div>
                  <label htmlFor={`${id}-naissance`} className={labelClass}>Date de naissance<RequiredMark /></label>
                  <input id={`${id}-naissance`} name="date_naissance" required type="date" onChange={onDatenaissanceChange} autoComplete="bday" className={fieldClass} />
                </div>
                <SearchableSelect name="lieu_naissance" label="Lieu de naissance" options={departements} onValueChange={setDepartement} loading={loadingDepartements}  />
              </div>
              <div className='grid grid-cols-1 gap-5 md:col-span-2 md:grid-cols-2'>
                <SearchableSelect name="nationalite" label="Nationalité" options={nationalites_} onValueChange={setNationalite} loading={loadingNationalites} />
                <SearchableSelect name="genre" label="Genre" options={genres_} onValueChange={setGenre} loading={loadingGenres} />
              </div>
              <div className='grid grid-cols-1 gap-5 md:col-span-2 md:grid-cols-2'>
                <SearchableSelect name="structure" label="Structure" options={structures_} onValueChange={setStructure} loading={loadingStructures} />
                <SearchableSelect name="statut" label="Statut" options={statuts_} onValueChange={setStatut} loading={loadingStatuts} />
              </div>

              {submitError && <p role="alert" className="text-sm text-red-600 md:col-span-2">{submitError}</p>}
              
              <div className="flex flex-wrap justify-start gap-3 pt-4 md:col-span-2">
                <button type="reset" className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">
                  <X className="h-4 w-4" aria-hidden="true" />
                  Annuler
                </button>
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-lg bg-[#2ca444] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95 disabled:cursor-wait disabled:opacity-70">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
                  {isSubmitting ? 'Enregistrement…' : 'Enregistrer'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjoutagentPage;
