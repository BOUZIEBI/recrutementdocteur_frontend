import { Building2, MapPin, Layers } from 'lucide-react';
import PageBanner from '@/shared/components/PageBanner';

const sousDirections = [
  {
    title: 'Sous-Direction des Personnels Enseignants-Chercheurs et Chercheurs (SDPEC)',
    services: [
      'Service de la Programmation et du Recrutement des Personnels Enseignants-Chercheurs et Chercheurs',
      'Service de la Gestion des Carrières et du Contentieux des Personnels Enseignants-Chercheurs et Chercheurs',
    ],
  },
  {
    title: 'Sous-Direction des Personnels Administratifs et Techniques (SDPAT)',
    services: [
      'Service de la Programmation et des Mouvements des Personnels Administratifs et Techniques',
      'Service de la Gestion des Carrières et du Contentieux des Personnels Administratifs et Techniques',
    ],
  },
  {
    title: 'Sous-Direction de la Formation Continue et des Stages des Personnels (FOCOST)',
    services: [
      'Service de la Formation Continue et des Stages en Côte d\u2019Ivoire',
      'Service de la Formation Continue et des Stages Hors Côte d\u2019Ivoire',
      'Service des Affaires Sociales',
    ],
  },
];

export default function PresentationDetailPage() {
  return (
    <div className="pt-0">
      <PageBanner
        title="Présentation"
        subtitle="Découvrez la Direction des Ressources Humaines du Ministère de l'Enseignement Supérieur et de la Recherche Scientifique."
        image="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-lg">
              <MapPin className="w-9 h-9 text-orange-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Localisation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                La Direction des Ressources Humaines est située à la rue du commerce au
                Plateau, en face de la galerie Peryssac, au 4<sup>ème</sup> étage du
                bâtiment B et au 7<sup>ème</sup> étage du bâtiment D de l'Immeuble
                Symphonie (ex Nationale d'Assurance).
              </p>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-lg">
              <Building2 className="w-9 h-9 text-orange-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Cadre légal</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Depuis 2011, le décret N° 2011-290 du 12 octobre 2011 institue un poste
                de Directeur des Ressources Humaines dans tous les Ministères.
                Conformément au Décret N° 2018-945 du 18 décembre 2018 portant
                organisation du Ministère de l'Enseignement Supérieur et de la Recherche
                Scientifique, la Direction des Ressources Humaines est une Direction
                rattachée au Cabinet du Ministre.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-500 rounded-xl p-2.5">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Organisation interne</h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Elle est composée de trois (03) Sous-Directions auxquelles sont rattachés
              des services :
            </p>
            <div className="space-y-6">
              {sousDirections.map((sd, i) => (
                <div key={i} className="border-l-4 border-orange-500 pl-5 py-2">
                  <h4 className="text-base font-bold text-gray-900 mb-3">{sd.title}</h4>
                  <ul className="space-y-2">
                    {sd.services.map((svc, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-2.5" />
                        <span className="text-gray-600 text-sm leading-relaxed">{svc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
