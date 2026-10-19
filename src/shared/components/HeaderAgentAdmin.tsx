import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchModal from './SearchModal';
import '../styles/authenticatedapp/HeaderAgentAdmin.css';

import { useAuthStore } from '@/store/useAuthStore';
import { deconnexion } from '@/features/auth/api/auth.api';
import { HiOutlineCog } from 'react-icons/hi';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  isAdministration: boolean;
}

const HeaderAgentAdmin: React.FC<HeaderProps> = ({ sidebarOpen, onToggleSidebar, isAdministration }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleDeconnexion = async () => {
    console.log("Deconnexion")
    if (loggingOut) return;
    //setLoggingOut(true);
    setLogoutError(null);
    try {
      await deconnexion();
      useAuthStore.getState().clearAuth();
      navigate('/login', { replace: true });
    } catch (error) {
      setLogoutError(error instanceof Error ? error.message : 'Impossible de se déconnecter.');
    } finally {
      setLoggingOut(false);
    }
  };

  useEffect(() => {
    if (!userMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !userMenuRef.current?.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
        userButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [userMenuOpen]);

  return (
    <header className={`header ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
      <div className="header-content">
        <button id="sidebar-toggle" className="toggle-sidebar-btn" onClick={onToggleSidebar} aria-label={sidebarOpen ? 'Fermer le menu latéral' : 'Ouvrir le menu latéral'} aria-expanded={sidebarOpen} aria-controls="sidebar">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="header-actions">
          <button type="button" className="header-btn" ref={searchButtonRef} aria-label="Rechercher" aria-haspopup="dialog" onClick={() => { setUserMenuOpen(false); setSearchOpen(true); }}>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          <button className="header-btn">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <div className="header-user" ref={userMenuRef} onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setUserMenuOpen(false);
          }}>
            <button
              type="button"
              className="user-menu-toggle"
              ref={userButtonRef}
              aria-label="Menu utilisateur"
              aria-expanded={userMenuOpen}
              aria-controls="user-dropdown"
              onClick={() => setUserMenuOpen((open) => !open)}
            >
            <svg className="user-avatar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" />
            </svg>
            </button>
            <span className="user-name">Admin</span>
            {userMenuOpen && (
              <nav id="user-dropdown" className="user-dropdown" aria-label="Compte utilisateur">
                <Link to="/changer-mot-de-passe" className="user-dropdown-link" onClick={() => setUserMenuOpen(false)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <path d="M12 14v3" />
                  </svg>
                  <span>Changer le mot de passe</span>
                </Link>
                <Link to="#" className="user-dropdown-link" onClick={() => setUserMenuOpen(false)}>
                  <span><HiOutlineCog /></span>
                  <span>Paramètres</span>
                </Link>
                <button type="button" disabled={loggingOut} className="user-dropdown-link user-dropdown-logout" onClick={() => void handleDeconnexion()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M9 12h12m-4-4 4 4-4 4" />
                  </svg>
                  <span>Déconnexion</span>
                </button>
                {logoutError && <p role="alert" className="text-red-600 text-sm px-3">{logoutError}</p>}
              </nav>
            )}
          </div>
        </div>
      </div>
      {searchOpen && <SearchModal isAdministration={isAdministration} onClose={() => {
        setSearchOpen(false);
        searchButtonRef.current?.focus();
      }} />}
    </header>
  );
};

export default HeaderAgentAdmin;
