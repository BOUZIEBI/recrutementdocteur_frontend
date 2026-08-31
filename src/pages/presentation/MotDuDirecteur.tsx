import { Quote } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

const director = {
  image: '/fofana_alhassane.jpg',
  firstName: 'Prof. FOFANA',
  lastName: 'Alhassane',
  role: "Directeur des Ressources Humaines",
};

export default function MotDuDirecteur() {
  return (
    <div className="pt-0">
      <PageBanner
        title="Mot du Directeur"
        subtitle="Un message d'engagement et de vision pour notre institution."
        image="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Photo + identité */}
            <div className="md:col-span-1 flex flex-col">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/20 h-[420px]">
                <img
                  src={director.image}
                  alt={`${director.firstName} ${director.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2 rounded-2xl p-5 text-center shadow-lg" style={{ backgroundColor: '#133458' }}>
                <h3 className="text-white text-xl font-bold leading-tight mb-1">
                  {director.firstName} {director.lastName}
                </h3>
                <p className="text-white/80 text-sm font-medium">{director.role}</p>
              </div>
            </div>

            {/* Mot */}
            <div className="md:col-span-2">
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Quote className="w-4 h-4" />
                Mot du Directeur
              </span>
              <div className="bg-gray-50 rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  "C'est avec un immense honneur et un profond sentiment de
                  responsabilité que je vous adresse ce message. Notre institution
                  a pour vocation d'accompagner le développement de l'enseignement
                  supérieur et de la recherche scientifique, piliers fondamentaux
                  de l'avenir de notre nation."
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  "Je tiens à saluer l'engagement de l'ensemble des équipes qui
                  œuvrent quotidiennement pour faire de notre ministère un acteur
                  incontournable de la connaissance, de l'innovation et de
                  l'excellence. Ensemble, nous bâtissons un cadre propice à
                  l'épanouissement de nos étudiants, chercheurs et personnels."
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  "Notre ambition est grande, notre détermination plus forte encore.
                  Je vous invite à partager cette dynamique collective au service
                  de l'intérêt général."
                </p>
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-gray-900 font-bold text-lg">
                    {director.firstName} {director.lastName}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{director.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
