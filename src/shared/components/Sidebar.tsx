import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoMesrs from '@/assets/logomesrs.png';
import '../styles/authenticatedapp/SidebarAgentAdmin.css';
import { FiHome, FiClipboard, FiUser, FiCalendar, FiHeart, FiGrid, FiLayers } from 'react-icons/fi';
import { CgPlayButton } from "react-icons/cg";

interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  subItems?: NavItem[];
  isPrimary?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  items?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, items }) => {
  const { pathname } = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [collapsedItems, setCollapsedItems] = useState<string[]>([]);
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      id: 'dashboards-menu',
      label: 'Dashboards',
      icon: <FiGrid className="nav-icon" />,
      isPrimary: true,
      subItems: [
        { id: 'dashboard', label: 'Accueil', icon: <FiHome className="nav-icon" /> },
      ],
    },
    {
      id: 'administration-menu',
      label: 'Administration',
      icon: <FiLayers className="nav-icon" />,
      isPrimary: true,
      subItems: [
        { id: 'resume-fiche-identification', label: 'Candidats', icon: <FiClipboard className="nav-icon" /> },
        { id: 'fiche-identification', label: 'Dossiers', icon: <FiUser className="nav-icon" /> },
        { id: 'presences', label: 'Vérification', icon: <FiCalendar className="nav-icon" /> },
        { id: 'historiques/candidats/liste', label: 'Historiques', icon: <FiHeart className="nav-icon" /> },
      ],
    },
  ];

  const navItemsToRender = items ?? navItems;
  const isSubItemActive = (item: NavItem) =>
    item.subItems?.some((subItem) => {
      const path = `/${subItem.id}`;
      return pathname === path || pathname.startsWith(`${path}/`);
    }) ?? false;

  // Derive the open parent from the URL so refreshes keep the active submenu visible.
  const activeParentId = navItemsToRender.find(isSubItemActive)?.id;
  const isExpanded = (id: string) => {
    const item = navItemsToRender.find((navItem) => navItem.id === id);
    return item?.isPrimary === true
      || (!collapsedItems.includes(id) && (expandedItems.includes(id) || activeParentId === id));
  };

  useEffect(() => {
    setCollapsedItems([]);
  }, [pathname]);

  const toggleExpand = (id: string) => {
    setOpenSubmenuId(null);
    if (isExpanded(id)) {
      setExpandedItems((prev) => prev.filter((expandedId) => expandedId !== id));
      setCollapsedItems((prev) => prev.includes(id) ? prev : [...prev, id]);
      return;
    }

    setCollapsedItems((prev) => prev.filter((collapsedId) => collapsedId !== id));
    setExpandedItems([id]);
  };

  return (
    <aside className={`sidebar ${!isOpen ? 'closed' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" aria-label="Retour à l’accueil du site vitrine" className="block">
        {!isOpen ? 
        <img className="sidebar-logo" src={logoMesrs} alt="MESRS" />:
        <img className="sidebar-logo" src={logoMesrs} alt="Ministère de l’Enseignement supérieur et de la Recherche scientifique" />
        }
        </Link>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItemsToRender.map((item) => (
            <li key={item.id}>
              <div className="nav-item-container">
                {item.subItems ? <button
                  className={`nav-link ${item.isPrimary ? 'nav-section-link' : ''} ${isSubItemActive(item) ? 'active' : ''}`}
                  onClick={() => {
                    if (item.subItems && item.subItems.length > 0) {
                      if (!isOpen) {
                        // Si sidebar réduit, afficher le menu contextuel
                        setExpandedItems([]);
                        setOpenSubmenuId(item.id);
                      } else if (!item.isPrimary) {
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
                {item.subItems && item.subItems.length > 0 && !item.isPrimary && (
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
                <div className="submenu-popup" style={{ top: `${(navItemsToRender.indexOf(item) * 56) + 90}px`, maxHeight: `calc(100dvh - ${(navItemsToRender.indexOf(item) * 56) + 106}px)` }}>
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
