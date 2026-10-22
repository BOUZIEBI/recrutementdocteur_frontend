import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Menu,
  X,
  Home,
  UserPlus,
  LogIn,
  type LucideIcon,
} from 'lucide-react';

const links: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/preinscription', label: 'Inscription', icon: UserPlus },
  { to: '/login', label: 'Connexion', icon: LogIn },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    setOpen(false);
  };

  return (
    <header className="relative z-50 w-full max-w-8xl mx-auto">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-24">
          <button onClick={handleLogoClick} className="flex items-center">
            <img
              src="/logomesrs.png"
              alt="MESRS — Ministère de l'Enseignement Supérieur et de la Recherche Scientifique"
              className="h-22 w-auto object-contain"
            />
          </button>
         
        </div>
      </div>

      <div className="bg-orange-500 shadow-lg recrutement-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-14">
          <nav className="hidden md:flex w-full items-center justify-between">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-md font-bold transition-all duration-200 inline-flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-white/90 hover:bg-white/15'
                }`
              }
            >
              <Home className="w-4 h-4" />
              Accueil
            </NavLink>
            <div className="ml-auto flex items-center gap-1">
              {links.slice(1).map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
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
              ))}
            </div>
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
            {links.map((link) => (
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
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
