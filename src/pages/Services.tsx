import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '@/components/PageBanner';
import { services } from '@/data/services';

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="pt-0">
      <PageBanner
        title="Nos services"
        subtitle="De la gestion des carrières à la valorisation des compétences, notre Direction des Ressources Humaines pilote l'ensemble des parcours professionnels au sein du Ministère. Nous mettons notre expertise et notre engagement au service de l'épanouissement de nos personnels administratifs et enseignants."
        image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.slug}
                onClick={() => navigate(`/services/${service.slug}`)}
                className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative">
                  <div className="bg-orange-500 rounded-xl p-3 w-fit mb-5 group-hover:bg-orange-600 transition-colors duration-200">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-orange-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                    En savoir plus
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
