import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Menu,
  X,
  Home,
  Info,
  Layers,
  UserPlus,
  LayoutDashboard,
  Phone,
  ChevronDown,
  Target,
  Goal,
  Building2,
  MessageSquareQuote,
  type LucideIcon,
} from 'lucide-react';

const links: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/presentation', label: 'DRH-MESRS', icon: Info },
  { to: '/services', label: 'Nos services', icon: Layers },
  { to: '/recrutement', label: 'Recrutement', icon: UserPlus },
  { to: '/sygrhes', label: 'SYGRH', icon: LayoutDashboard },
  { to: '/contacts', label: 'Contacts', icon: Phone },
];

const presentationSubLinks: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/presentation/missions', label: 'Missions', icon: Target },
  { to: '/presentation/objectifs', label: 'Objectifs', icon: Goal },
  { to: '/presentation/detail', label: 'Présentation', icon: Building2 },
  { to: '/presentation/mot-du-directeur', label: 'Mot du Directeur', icon: MessageSquareQuote },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    setOpen(false);
    setMobileSubOpen(false);
  };

  return (
    <header className="relative z-50 w-full max-w-8xl mx-auto">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-24">
          <button onClick={handleLogoClick} className="flex items-center">
            <img
              src="/logodrh.png"
              alt="DRH — Direction des Ressources Humaines"
              className="h-20 w-auto object-contain"
            />
          </button>
          <img
            src="/logomesrs.png"
            alt="MESRS — Ministère de l'Enseignement Supérieur et de la Recherche Scientifique"
            className="h-20 w-auto object-contain"
          />
        </div>
      </div>

      <div className="bg-orange-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) =>
              link.to === '/presentation' ? (
                <div key={link.to} className="relative group">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg text-md font-bold transition-all duration-200 inline-flex items-center gap-2 ${
                        isActive
                          ? 'bg-white text-orange-600 shadow-sm'
                          : 'text-white hover:bg-white/15'
                      }`
                    }
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </NavLink>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl shadow-gray-900/20 border border-gray-100 p-2 w-56">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100" />
                      {presentationSubLinks.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-md font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                        >
                          <sub.icon className="w-4 h-4 text-orange-500" />
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-md font-bold transition-all duration-200 inline-flex items-center gap-2 ${
                      isActive
                        ? 'bg-white text-orange-600 shadow-sm'
                        : 'text-white/90 hover:bg-white/15'
                    }`
                  }
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <nav className="md:hidden bg-orange-500 px-4 pb-4 pt-1 space-y-1">
            {links.map((link) =>
              link.to === '/presentation' ? (
                <div key={link.to}>
                  <button
                    onClick={() => setMobileSubOpen(!mobileSubOpen)}
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-white/90 hover:bg-white/15 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <link.icon className="w-4 h-4 flex-shrink-0" />
                      {link.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${mobileSubOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileSubOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-white/20 pl-3">
                      {presentationSubLinks.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          onClick={() => {
                            setOpen(false);
                            setMobileSubOpen(false);
                          }}
                          className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:bg-white/15 transition-colors"
                        >
                          <sub.icon className="w-4 h-4 flex-shrink-0" />
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white text-orange-600'
                        : 'text-white/90 hover:bg-white/15'
                    }`
                  }
                >
                  <link.icon className="w-4 h-4 flex-shrink-0" />
                  {link.label}
                </NavLink>
              )
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
