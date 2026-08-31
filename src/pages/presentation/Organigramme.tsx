import { Network, Briefcase, Users, Target, Award, Cog } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

const orgChart = [
  {
    role: 'Direction Générale',
    name: 'Jean Dupont',
    icon: Briefcase,
    color: 'bg-gray-900 text-white',
  },
  {
    role: 'Direction RH',
    name: 'Marie Martin',
    icon: Users,
    color: 'bg-orange-500 text-white',
  },
  {
    role: 'Direction Recrutement',
    name: 'Sophie Bernard',
    icon: Target,
    color: 'bg-amber-500 text-white',
  },
  {
    role: 'Direction Formation',
    name: 'Pierre Dubois',
    icon: Award,
    color: 'bg-green-600 text-white',
  },
  {
    role: 'Direction Administrative',
    name: 'Claire Moreau',
    icon: Cog,
    color: 'bg-blue-600 text-white',
  },
];

export default function Organigramme() {
  return (
    <div className="pt-0">
      <PageBanner
        title="Organigramme"
        subtitle="Une organisation structurée pour vous offrir le meilleur service."
        image="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Network className="w-4 h-4" />
              Organigramme
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Notre <span className="text-orange-500">équipe</span> de direction
            </h2>
            <p className="text-gray-600 text-lg">
              Une organisation structurée pour vous offrir le meilleur service.
            </p>
          </div>

          <div className="flex flex-col items-center mb-12">
            <div className="bg-gray-900 text-white rounded-2xl px-8 py-5 text-center shadow-xl w-full max-w-xs">
              <Briefcase className="w-8 h-8 mx-auto mb-3 text-orange-400" />
              <div className="font-bold text-lg">Jean Dupont</div>
              <div className="text-gray-400 text-sm">Direction Générale</div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gray-200 hidden lg:block" />
            {orgChart.slice(1).map((person, i) => (
              <div key={i} className="relative">
                <div className="hidden lg:block absolute -top-0 left-1/2 w-px h-6 bg-gray-200 -translate-x-1/2" />
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg text-center mt-6 lg:mt-8 hover:shadow-xl hover:border-orange-200 transition-all duration-300">
                  <div className={`${person.color} rounded-xl p-3 w-fit mx-auto mb-4`}>
                    <person.icon className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-gray-900">{person.name}</div>
                  <div className="text-gray-500 text-sm mt-1">{person.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
