import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoMesrs from '@/assets/logomesrs.png';

import logoMesrsUnique from '@/assets/logomesrsunique.png';
import '../styles/authenticatedapp/SidebarAgentAdmin.css';
import { FiHome, FiClipboard, FiUser, FiCalendar, FiRepeat, FiFileText, FiAward, FiHeart } from 'react-icons/fi';
import { CgPlayButton } from "react-icons/cg";

interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  subItems?: NavItem[];
}

interface SidebarProps {
  isOpen: boolean;
  items?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, items }) => {
  const { pathname } = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Accueil', icon: <FiHome className="nav-icon" /> },
    { id: 'resume-fiche-identification', label: 'Résumé Fiche d’identification', icon: <FiClipboard className="nav-icon" /> },
    {
      id: 'fiche-identification',
      label: 'Fiche d’identification',
      icon: <FiUser className="nav-icon" />,
      subItems: [
        { id: 'fiche-identification/informations-generales', label: 'Informations Générales' },
        { id: 'fiche-identification/enfants', label: 'Liste des Enfants' },
        { id: 'fiche-identification/services', label: 'Services' },
        { id: 'fiche-identification/autres-services', label: 'Autres services' },
        { id: 'fiche-identification/etudes-formations-diplomes', label: 'Études, Formations professionnelles, Diplômes' },
        { id: 'fiche-identification/stages-colloques', label: 'Stage, Colloque' },
        { id: 'fiche-identification/enseignements', label: 'Enseignements dispensés' },
        { id: 'fiche-identification/publications', label: 'Publications' },
        { id: 'fiche-identification/activites-recherche', label: 'Activités de recherches' },
        { id: 'fiche-identification/emplois', label: 'Emplois occupés' },
        { id: 'fiche-identification/fonctions', label: 'Fonctions occupées' },
        { id: 'fiche-identification/competences', label: 'Résumé des compétences' },
        { id: 'fiche-identification/autres-renseignements', label: 'Autres renseignements' },
        { id: 'fiche-identification/consultation', label: 'Consultation de la fiche d’identification' },
      ],
    },
    { id: 'presences', label: 'Présences', icon: <FiCalendar className="nav-icon" /> },
    { id: 'mouvements', label: 'Mouvements', icon: <FiRepeat className="nav-icon" /> },
    { id: 'attestations', label: 'Attestations', icon: <FiFileText className="nav-icon" /> },
    { id: 'certificats', label: 'Certificats', icon: <FiAward className="nav-icon" /> },
    { id: 'prestation-sociale', label: 'Prestation sociale et autres', icon: <FiHeart className="nav-icon" /> },
  ];

  // Derive the open parent from the URL so refreshes keep the active submenu visible.
  const activeParentId = (items ?? navItems).find((item) =>
    item.subItems?.some((subItem) => pathname === `/${subItem.id}`)
  )?.id;
  const isExpanded = (id: string) => expandedItems.includes(id) || activeParentId === id;

  const toggleExpand = (id: string) => {
    setOpenSubmenuId(null);
    setExpandedItems((prev) =>
      prev.includes(id) ? [] : [id]
    );
  };

  return (
    <aside className={`sidebar ${!isOpen ? 'closed' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" aria-label="Retour à l’accueil du site vitrine" className="block">
        {!isOpen ? 
        <img className="sidebar-logo" src={logoMesrsUnique} alt="MESRS" />:
        <img className="sidebar-logo" src={logoMesrs} alt="Ministère de l’Enseignement supérieur et de la Recherche scientifique" />
        }
        </Link>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {(items ?? navItems).map((item) => (
            <li key={item.id}>
              <div className="nav-item-container">
                {item.subItems ? <button
                  className={`nav-link ${item.subItems.some((subItem) => pathname === `/${subItem.id}`) ? 'active' : ''}`}
                  onClick={() => {
                    if (item.subItems && item.subItems.length > 0) {
                      if (!isOpen) {
                        // Si sidebar réduit, afficher le menu contextuel
                        setExpandedItems([]);
                        setOpenSubmenuId((prev) => prev === item.id ? null : item.id);
                      } else {
                        // Si sidebar ouvert, dérouler/replier normalement
                        toggleExpand(item.id);
                      }
                    }
                  }}
                  aria-expanded={isOpen ? isExpanded(item.id) : openSubmenuId === item.id}
                  title={item.label}
                  data-tooltip={item.label}
                >
                  {item.icon && <span className="nav-icon-wrapper">{item.icon}</span>}
                  <span>{item.label}</span>
                </button> : (
                  <NavLink
                    to={`/${item.id}`}
                    className="nav-link"
                    title={item.label}
                    data-tooltip={item.label}
                    onClick={() => {
                      setExpandedItems([]);
                      setOpenSubmenuId(null);
                    }}
                  >
                    {item.icon && <span className="nav-icon-wrapper">{item.icon}</span>}
                    <span>{item.label}</span>
                  </NavLink>
                )}
                {item.subItems && item.subItems.length > 0 && (
                  <button
                    className="expand-btn"
                    onClick={() => toggleExpand(item.id)}
                    aria-expanded={isExpanded(item.id)}
                  >
                    <span className={`arrow ${isExpanded(item.id) ? 'expanded' : ''}`}>
                      ›
                    </span>
                  </button>
                )}
              </div>
              {item.subItems && !isOpen && openSubmenuId === item.id && (
                <div className="submenu-popup" style={{ top: `${((items ?? navItems).indexOf(item) * 56) + 90}px`, maxHeight: `calc(100dvh - ${((items ?? navItems).indexOf(item) * 56) + 106}px)` }}>
                  <ul className="submenu-popup-list">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <NavLink
                          to={`/${subItem.id}`}
                          className="submenu-popup-link"
                          onClick={() => {
                            setOpenSubmenuId(null);
                          }}
                          title={subItem.label}
                        >
                          {subItem.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {item.subItems && isExpanded(item.id) && isOpen && (
                <ul className="sub-nav ">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.id}>
                      
                      <NavLink
                        to={`/${subItem.id}`}
                        className="nav-link sub-link"
                        title={subItem.label}
                      >
                        <span><CgPlayButton className='icon-sub-item' size={20} /></span>
                        <span>{subItem.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
