import { History } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

const milestones = [
  { year: '2009', text: 'Création de DRH avec une mission : humaniser la gestion RH.' },
  { year: '2014', text: 'Expansion nationale et accompagnement de plus de 100 entreprises.' },
  { year: '2019', text: "Lancement de l'offre de formation continue et du coaching personnalisé." },
  { year: '2024', text: "Plus de 200 clients et une équipe de 50 experts RH dédiés." },
];

export default function Historique() {
  return (
    <div className="pt-0">
      <PageBanner
        title="Historique"
        subtitle="15 ans d'expertise à votre service."
        image="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <History className="w-4 h-4" />
              Notre historique
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              15 ans d'expertise à votre service
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-orange-200 -translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className={`relative flex items-center gap-8 ${
                    i % 2 === 0 ? 'sm:flex-row-reverse sm:text-right' : ''
                  }`}
                >
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-orange-500 rounded-full -translate-x-1/2 ring-4 ring-orange-100 z-10" />
                  <div className="hidden sm:block sm:w-1/2" />
                  <div className="sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <div className="text-2xl font-bold text-orange-500 mb-2">{m.year}</div>
                      <p className="text-gray-600">{m.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
