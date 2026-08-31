import { Heart, Shield, Zap, Eye } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

const values = [
  {
    icon: Heart,
    title: 'Bienveillance',
    desc: "Nous plaçons l'humain au centre de toutes nos décisions et actions.",
  },
  {
    icon: Shield,
    title: 'Confidentialité',
    desc: 'Vos données et celles de vos employés sont traitées avec la plus grande discrétion.',
  },
  {
    icon: Zap,
    title: 'Proactivité',
    desc: 'Nous anticipons les besoins RH pour rester toujours un pas ahead.',
  },
  {
    icon: Eye,
    title: 'Transparence',
    desc: "Une communication claire et honnête avec l'ensemble de nos partenaires.",
  },
];

export default function Valeurs() {
  return (
    <div className="pt-0">
      <PageBanner
        title="Valeurs"
        subtitle="Les principes qui nous guident au quotidien."
        image="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" />
              Nos valeurs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Les principes qui nous <span className="text-orange-500">guident</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Quatre valeurs fondamentales qui guident chacune de nos actions au
              quotidien.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
              >
                <div className="bg-orange-500 rounded-xl p-3 w-fit mb-5 group-hover:bg-orange-600 transition-colors duration-200">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
