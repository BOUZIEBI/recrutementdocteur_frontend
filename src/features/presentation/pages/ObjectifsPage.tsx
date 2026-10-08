import { Goal, CheckCircle } from 'lucide-react';
import PageBanner from '@/shared/components/PageBanner';

const objectifs = [
  "Maîtriser la gestion des ressources humaines du MESRS.",
  "Gérer les carrières des personnels.",
  "Recruter les enseignants-chercheurs et chercheurs.",
  "Satisfaire les besoins en personnels administratifs et techniques.",
  "Planifier et programmer d'avance les besoins en personnels.",
  "Contribuer à l'apaisement du climat social.",
  "Former et renforcer les capacités des agents.",
];

export default function ObjectifsPage() {
  return (
    <div className="pt-0">
      <PageBanner
        title="Objectifs"
        subtitle="Nos objectifs stratégiques pour une gestion des ressources humaines performante et au service de l'épanouissement de nos personnels."
        image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Goal className="w-4 h-4" />
              Nos objectifs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Des objectifs <span className="text-orange-500">clairs</span> et ambitieux
            </h2>
            <p className="text-gray-600 text-lg">
              La Direction des Ressources Humaines s'est fixé des objectifs stratégiques
              pour accompagner le développement du Ministère et de ses personnels.
            </p>
          </div>

          <ul className="space-y-4">
            {objectifs.map((obj, i) => (
              <li
                key={i}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300"
              >
                <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-lg leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
