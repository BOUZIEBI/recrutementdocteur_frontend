import { Target, CheckCircle } from 'lucide-react';
import PageBanner from '@/shared/components/PageBanner';

export default function MissionsPage() {
  return (
    <div className="pt-0">
      <PageBanner
        title="Missions"
        subtitle="Accompagner et sublimer votre capital humain."
        image="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Target className="w-4 h-4" />
                Nos missions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
                Mission DRH
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                La Direction des Ressources Humaines a pour mission de mettre en œuvre la politique du Ministre en matière de gestion des ressources humaines du Ministère de l'Enseignement Supérieur et de la Recherche Scientifique.
              </p>
              <p className="text-gray-600 text-lg mt-3 mb-3">À ce titre, elle est chargée :</p>
              <ul className="space-y-3">
                {[
                  "de gérer les ressources humaines du Ministère et de coordonner l'action des services de gestion des ressources humaines des organismes sous tutelle ;",
                  "de planifier le recrutement des enseignants-chercheurs, chercheurs et des personnels administratifs et techniques ;",
                  "d'assurer le renforcement des capacités par la mise en œuvre d'une politique de formation continue des enseignants-chercheurs, des chercheurs et des personnels administratifs et techniques, en relation avec les services des ressources humaines des structures sous tutelle.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-orange-500/20">
              <img
                src="/6152022_general2_13.jpg"
                alt="Illustration de la mission DRH"
                className="w-full h-full object-cover aspect-square"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
