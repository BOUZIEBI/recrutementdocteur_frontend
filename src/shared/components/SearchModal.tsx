import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminItems, agentNavItems } from '@/data/navigation';
import '../styles/authenticatedapp/SearchModal.css';

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');

function SearchModal({ isAdministration, onClose }: { isAdministration: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const entries = (isAdministration ? adminItems : agentNavItems).flatMap((item) => item.subItems
      ? item.subItems.map((child) => ({ ...child, section: item.label }))
      : [{ ...item, section: isAdministration ? 'Administration' : 'Espace Agent' }]);
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  const results = entries.filter((item) => words.every((word) => normalize(`${item.label} ${item.section}`).includes(word)));

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    inputRef.current?.focus();
    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="search-modal"
      aria-labelledby="search-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => { if (event.key === 'Escape') event.stopPropagation(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}
    >
      <div className="search-modal-heading">
        <h2 id="search-title">Rechercher</h2>
        <button type="button" className="search-close" aria-label="Fermer la recherche" onClick={onClose}>×</button>
      </div>
      <form className="search-form" role="search" onSubmit={(event) => {
        event.preventDefault();
        if (results[0]) { navigate(`/${results[0].id}`); onClose(); }
      }}>
        <label htmlFor="site-search">Rechercher une rubrique dans {isAdministration ? 'l’administration' : 'l’espace Agent'}</label>
        <div className="search-input-row">
          <input ref={inputRef} id="site-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex. : présences, attestations…" autoComplete="off" aria-controls="search-results" />
        </div>
      </form>
      <p className="search-status" role="status">{results.length} résultat{results.length > 1 ? 's' : ''}</p>
      <div className='resultats-recherche'>
        <ul id="search-results" className="search-results">
          {results.map((item) => (
            <li key={item.id}>
              <Link to={`/${item.id}`} onClick={onClose}>
                <span>{item.label}</span>
                <small>{item.section}</small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {results.length === 0 && <p className="search-empty">Aucune rubrique trouvée. Essayez un autre mot-clé.</p>}
    </dialog>
  );
}

export default SearchModal;
