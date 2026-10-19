import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, FileSpreadsheet, FileText, Loader2, Search } from 'lucide-react';
import PageBreadcrumb from '@/shared/components/PageBreadcrumb';
import { useHistoriqueStore } from '@/store/useHistoriqueStore';
import type { Historique } from '@/features/historiques/types/historique.types';

type HistoriqueColumn = {
  key: string;
  label: string;
  getValue: (historique: Historique) => string;
};
const columns: HistoriqueColumn[] = [
  { key: 'matricule', label: 'Matricule', getValue: (historique) => historique.matricule ?? '' },
  { key: 'nom_prenoms', label: 'Nom et prénoms', getValue: (historique) => historique.nom_prenoms ?? '' },
  { key: 'numero_candidat', label: 'Numero candidat', getValue: (historique) => historique.numero_candidat ?? '' },
  { key: 'annee_concours', label: 'Année du concours', getValue: (historique) => historique.annee_concours ?? '' },
  { key: 'type_session', label: 'Type de session', getValue: (historique) => historique.type_session ?? '' },
];

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character];
  });
}

function ListehistoriquesPage({ title, breadcrumb }: { title: string; breadcrumb?: string }) {
  const historiqueData = useHistoriqueStore((state) => state.historiques);
  const loadingHistoriques = useHistoriqueStore((state) => state.loading || (!state.loaded && !state.error));
  const error = useHistoriqueStore((state) => state.error);
  const visibleError =
    error === "Impossible de récupérer la liste des historiques."
      ? null
      : error;
  const loadHistoriques = useHistoriqueStore((state) => state.loadHistoriques);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('nom_prenoms');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    
    void loadHistoriques({
        annee_concours: 2026,
        type_session: "all",
        },
        true,
    );
  }, [loadHistoriques]);

  const visibleHistoriques = useMemo(() => {
    const normalizedSearch = normalize(search.trim());
    const filtered = historiqueData.filter((historique) =>
      columns.some((column) =>
        normalize(column.getValue(historique)).includes(normalizedSearch),
      ),
    );
    
    const column = columns.find((item) => item.key === sortKey);
    if (!column) return filtered;

    return [...filtered].sort((left, right) => {
      const comparison = column.getValue(left).localeCompare(column.getValue(right), 'fr', {
        numeric: true,
        sensitivity: 'base',
      });
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [historiqueData, search, sortDirection, sortKey]);

  const pageCount = Math.max(1, Math.ceil(visibleHistoriques.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, pageCount);
  const paginatedHistoriques = visibleHistoriques.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );
  const firstVisibleIndex = visibleHistoriques.length === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;
  const lastVisibleIndex = Math.min(safeCurrentPage * itemsPerPage, visibleHistoriques.length);

  const sortBy = (key: string) => {
    if (sortKey === key) {
      setSortDirection((direction) => direction === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const exportExcel = () => {
    const rows = [
      columns.map((column) => column.label),
      ...visibleHistoriques.map((historique) =>
        columns.map((column) => column.getValue(historique)),
      ),
    ];
    const worksheetRows = rows
      .map((row) => `
        <Row>
          ${row
            .map((value) => `<Cell><Data ss:Type="String">${escapeHtml(value)}</Data></Cell>`)
            .join('')}
        </Row>
      `)
      .join('');
    const workbook = `<?xml version="1.0" encoding="UTF-8"?>
      <?mso-application progid="Excel.Sheet"?>
      <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
        <Worksheet ss:Name="Historiques">
          <Table>${worksheetRows}</Table>
        </Worksheet>
      </Workbook>`;
    const blob = new Blob(['\uFEFF', workbook], {
      type: 'application/vnd.ms-excel;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');

    downloadLink.href = url;
    downloadLink.download = 'historiques.xls';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    const printWindow = window.open('', '_blank');

    if (!printWindow) {
      window.alert('Autorisez les fenêtres contextuelles pour exporter le PDF.');
      return;
    }

    const tableRows = visibleHistoriques
      .map((historique) => `
        <tr>
          ${columns
            .map((column) => `<td>${escapeHtml(column.getValue(historique))}</td>`)
            .join('')}
        </tr>
      `)
      .join('');

    printWindow.document.write(`
      <!doctype html>
      <html lang="fr">
        <head>
          <meta charset="utf-8">
          <title>Export des historiques</title>
          <style>
            body { font-family: Arial, sans-serif; color: #1f2937; padding: 24px; }
            h1 { font-size: 20px; margin-bottom: 16px; }
            table { border-collapse: collapse; width: 100%; font-size: 11px; }
            th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; }
            th { background: #f3f4f6; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h1>Historiques (${visibleHistoriques.length})</h1>
          <table>
            <thead><tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join('')}</tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div>
      <div className="titre-libelle-page">
        <h3>Système de Recrutement des Enseignement du Supérieur</h3>
        <p>Espace Administrateur : <b>ADMINISTRATION CENTRALISÉE</b></p>
        <PageBreadcrumb fallback={title} override={breadcrumb} />
      </div>
      <div className="content-section">
        <h1>{title}</h1>
        <div className="informations-section">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2">
              <span className="text-red-600 underline">Historiques</span>
              <span>{historiqueData.length}</span>
            </p>

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                <button type="button" onClick={exportPdf} disabled={loadingHistoriques} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50">
                    <FileText className="h-4 w-4" aria-hidden="true" /> Export PDF
                </button>
                <button type="button" onClick={exportExcel} disabled={loadingHistoriques} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50">
                    <FileSpreadsheet className="h-4 w-4" aria-hidden="true" /> Export Excel
                </button>
                </div>
            </div>
            
          </div>
          
            <div className="conteneur-recherche-historique mb-4 flex justify-end">
                <label className="relative block w-full ">
                    <span className="sr-only">Rechercher un historique</span>
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }}
                        placeholder="Rechercher un historique…"
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 focus:border-[var(--color-accent)] focus:outline-none"
                    />
                </label>
            </div>
            

          {visibleError && <p role="alert" className="mb-4 text-sm text-red-600">{visibleError}</p>}
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
                {loadingHistoriques ? (
                  <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-gray-500"><span role="status" className="inline-flex items-center gap-3"><Loader2 className="h-6 w-6 animate-spin text-[var(--color-accent)]" aria-hidden="true" /> Chargement des historiques…</span></td></tr>
                ) : visibleHistoriques.length > 0 ? paginatedHistoriques.map((historique) => (
                  <tr key={historique.uid} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td key={column.key} className="whitespace-nowrap px-4 py-3 text-gray-700">
                        {column.getValue(historique) === 'SESSIONANNEE'
                          ? "Session de l'année"
                          : column.getValue(historique) === 'SESSIONCOMPLEMENTAIRE'
                            ? 'Session complémentaire'
                            : column.getValue(historique) || '—'}
                      </td>
                    ))}
                  </tr>
                )) : (
                  <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-gray-500">{search ? 'Aucun historique ne correspond à la recherche.' : 'Aucun historique à afficher.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <label htmlFor="historiques-page-size">Éléments par page</label>
              <select
                id="historiques-page-size"
                value={itemsPerPage}
                onChange={(event) => { setItemsPerPage(Number(event.target.value)); setCurrentPage(1); }}
                className="rounded-md border border-gray-300 bg-white px-2 py-1.5 focus:border-[var(--color-accent)] focus:outline-none"
              >
                {[10, 25, 50, 100].map((size) => <option key={size} value={size}>{size}</option>)}
              </select>
              <span>{firstVisibleIndex}–{lastVisibleIndex} sur {visibleHistoriques.length}</span>
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

export default ListehistoriquesPage;
