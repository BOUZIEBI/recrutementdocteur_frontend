import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 max-w-8xl mx-auto w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="mb-4">
              <img
                src="/logodrh.png"
                alt="DRH — Direction des Ressources Humaines"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed">
              Votre Direction des Ressources Humaines pour la gestion de vos demarches administratives.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Liens utiles</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-400 transition-colors">Accueil</Link></li>
              <li><Link to="/recrutement" className="hover:text-orange-400 transition-colors">Recrutement</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-gray-800 hover:bg-orange-500 text-gray-300 hover:text-white p-2.5 rounded-lg transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-sm mt-4">drhmesrs.recrutement@gmail.com</p>
            <p className="text-sm mt-1">(+225) 0140263744</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} DRH. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
