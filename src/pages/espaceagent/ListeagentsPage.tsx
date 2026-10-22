import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Download, Loader2, Search, Users } from 'lucide-react';
import { FaEllipsisV } from 'react-icons/fa';
import PageBreadcrumb from '@/shared/components/PageBreadcrumb';
import { useAgentStore } from '@/store/useAgentStore';
import type { Agent } from '@/features/agents/types/agent.types';

type AgentColumn = {
  key: string;
  label: string;
  getValue: (agent: Agent) => string;
};
type RegistrationFilter = 'all' | 'preinscrits' | 'non-preinscrits';

const columns: AgentColumn[] = [
  { key: 'matricule', label: 'Matricule', getValue: (agent) => agent.matricule ?? '' },
  { key: 'nom', label: 'Nom', getValue: (agent) => agent.nom ?? '' },
  { key: 'prenoms', label: 'Prénoms', getValue: (agent) => agent.prenoms ?? '' },
  { key: 'structure', label: 'Structure', getValue: (agent) => agent.structure?.libelle ?? '' },
  { key: 'etat_fiche', label: 'État de fiche', getValue: (agent) => agent.validation_fiche?.libelle ?? '' },
  { key: 'actions', label: 'Actions', getValue: () => '' },
];

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');
}

function ListeagentsPage({ title, breadcrumb }: { title: string; breadcrumb?: string }) {
  const agentData = useAgentStore((state) => state.agents);
  const loadingAgents = useAgentStore((state) => state.loading || (!state.loaded && !state.error));
  const error = useAgentStore((state) => state.error);
  const loadAgents = useAgentStore((state) => state.loadAgents);
  const [search, setSearch] = useState('');
  const [registrationFilter, setRegistrationFilter] = useState<RegistrationFilter>('all');
  const [sortKey, setSortKey] = useState('nom');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionsAgentId, setOpenActionsAgentId] = useState<string | null>(null);
  const actionsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void loadAgents();
  }, [loadAgents]);

  useEffect(() => {
    if (!openActionsAgentId) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !actionsMenuRef.current?.contains(event.target)) {
        setOpenActionsAgentId(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenActionsAgentId(null);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [openActionsAgentId]);

  const visibleAgents = useMemo(() => {
    const normalizedSearch = normalize(search.trim());
    const filtered = agentData.filter((agent) => {
      const matchesRegistration = registrationFilter === 'all'
        || (registrationFilter === 'preinscrits' && agent.est_preinscrit)
        || (registrationFilter === 'non-preinscrits' && !agent.est_preinscrit);
      const matchesSearch = columns.some((column) => normalize(column.getValue(agent)).includes(normalizedSearch));
      return matchesRegistration && matchesSearch;
    });
    const column = columns.find((item) => item.key === sortKey);
    if (!column) return filtered;

    return [...filtered].sort((left, right) => {
      const comparison = column.getValue(left).localeCompare(column.getValue(right), 'fr', {
        numeric: true,
        sensitivity: 'base',
      });
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [agentData, registrationFilter, search, sortDirection, sortKey]);

  const pageCount = Math.max(1, Math.ceil(visibleAgents.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, pageCount);
  const paginatedAgents = visibleAgents.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );
  const firstVisibleIndex = visibleAgents.length === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;
  const lastVisibleIndex = Math.min(safeCurrentPage * itemsPerPage, visibleAgents.length);

  const sortBy = (key: string) => {
    if (sortKey === key) {
      setSortDirection((direction) => direction === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div>
      <div className="titre-libelle-page">
        <h3>Système de Gestion des Ressources Humaines du MESRS</h3>
        <p> <b>Espace Administrateur</b></p>
        <PageBreadcrumb fallback={title} override={breadcrumb} />
      </div>
      <div className="content-section">
        <h1>{title}</h1>
        <div className="informations-section">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2">
              <span className="text-red-600 underline">Agents</span>
              <span>{agentData.length}</span>
            </p>
            <label className="relative min-w-[min(100%,18rem)] flex-1 md:max-w-md">
              <span className="sr-only">Rechercher un agent</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }}
                placeholder="Rechercher un agent…"
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 focus:border-[var(--color-accent)] focus:outline-none"
              />
            </label>
          </div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button type="button" aria-pressed={registrationFilter === 'preinscrits'} onClick={() => { setRegistrationFilter(registrationFilter === 'preinscrits' ? 'all' : 'preinscrits'); setCurrentPage(1); }} className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium ${registrationFilter === 'preinscrits' ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'}`}>
                <Users className="h-4 w-4" aria-hidden="true" /> Préinscrits
              </button>
              <button type="button" aria-pressed={registrationFilter === 'non-preinscrits'} onClick={() => { setRegistrationFilter(registrationFilter === 'non-preinscrits' ? 'all' : 'non-preinscrits'); setCurrentPage(1); }} className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium ${registrationFilter === 'non-preinscrits' ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'}`}>
                <Users className="h-4 w-4" aria-hidden="true" /> Non-préinscrits
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-[#4c94e4] px-4 py-2 text-sm font-medium text-white hover:brightness-95">
                <Download className="h-4 w-4" aria-hidden="true" /> Agents
              </button>
              <button type="button" onClick={() => sortBy('structure')} className="inline-flex items-center gap-2 rounded-lg bg-[#e46c74] px-4 py-2 text-sm font-medium text-white hover:brightness-95">
                <Users className="h-4 w-4" aria-hidden="true" /> Agents par structure
              </button>
            </div>
          </div>

          {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col" aria-sort={sortKey === column.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'} className="whitespace-nowrap px-4 py-3">
                      <button type="button" onClick={() => sortBy(column.key)} className="inline-flex items-center gap-2 font-semibold hover:text-[var(--color-accent)]">
                        {column.label}
                        {sortKey === column.key
                          ? sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" /> : <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                          : <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {loadingAgents ? (
                  <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-gray-500"><span role="status" className="inline-flex items-center gap-3"><Loader2 className="h-6 w-6 animate-spin text-[var(--color-accent)]" aria-hidden="true" /> Chargement des agents…</span></td></tr>
                ) : visibleAgents.length > 0 ? paginatedAgents.map((agent) => (
                  <tr key={agent.uid} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td key={column.key} className="whitespace-nowrap px-4 py-3 text-gray-700">
                        {column.key === 'actions' ? (
                          <div className="relative" ref={openActionsAgentId === agent.uid ? actionsMenuRef : undefined}>
                            <button
                              type="button"
                              aria-label={`Actions pour ${agent.prenoms} ${agent.nom}`}
                              aria-haspopup="menu"
                              aria-expanded={openActionsAgentId === agent.uid}
                              onClick={() => setOpenActionsAgentId((openId) => openId === agent.uid ? null : agent.uid)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                            >
                              <FaEllipsisV aria-hidden="true" />
                            </button>
                            {openActionsAgentId === agent.uid && (
                              <div role="menu" aria-label={`Actions pour ${agent.prenoms} ${agent.nom}`} className="absolute right-0 top-full z-40 mt-1 w-64 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-xl">
                                {[
                                  ['Edition Fiches', 'edition_fiche/edition_fiche'],
                                  ['Affecter un Service à un Agent', 'agent/add_service_agent'],
                                  ['Ajouter Volume horaire', 'horaire/horaire_edit'],
                                  ['Récapitulatif horaire', 'horaire/horaire_agent'],
                                  ["Imprimer Fiche d'identification", 'agent/print_fiche'],
                                  ['Présence au Poste', 'presence/agent_presence'],
                                  ['Attribuer un Rôle à un Agent', 'role/add_role_agent'],
                                ].map(([label, path]) => (
                                  <a
                                    key={path}
                                    role="menuitem"
                                    href={`https://www.drh.enseignement.gouv.ci/html/public/adminpanel/${path}/${encodeURIComponent(agent.uid)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => setOpenActionsAgentId(null)}
                                    className="block whitespace-normal px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[var(--color-accent)]"
                                  >
                                    {label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : column.getValue(agent) || '—'}
                      </td>
                    ))}
                  </tr>
                )) : (
                  <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-gray-500">{search ? 'Aucun agent ne correspond à la recherche.' : 'Aucun agent à afficher.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <label htmlFor="agents-page-size">Éléments par page</label>
              <select
                id="agents-page-size"
                value={itemsPerPage}
                onChange={(event) => { setItemsPerPage(Number(event.target.value)); setCurrentPage(1); }}
                className="rounded-md border border-gray-300 bg-white px-2 py-1.5 focus:border-[var(--color-accent)] focus:outline-none"
              >
                {[10, 25, 50, 100].map((size) => <option key={size} value={size}>{size}</option>)}
              </select>
              <span>{firstVisibleIndex}–{lastVisibleIndex} sur {visibleAgents.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" disabled={safeCurrentPage <= 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50">Précédent</button>
              <span>Page {safeCurrentPage} sur {pageCount}</span>
              <button type="button" disabled={safeCurrentPage >= pageCount} onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))} className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50">Suivant</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeagentsPage;
