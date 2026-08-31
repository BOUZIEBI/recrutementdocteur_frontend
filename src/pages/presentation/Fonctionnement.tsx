import { Cog, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '@/components/PageBanner';

const workflow = [
  {
    step: '01',
    title: 'Analyse & diagnostic',
    desc: "Audit complet de votre organisation et identification de vos besoins RH spécifiques.",
  },
  {
    step: '02',
    title: 'Planification',
    desc: "Élaboration d'une stratégie RH sur mesure alignée avec vos objectifs business.",
  },
  {
    step: '03',
    title: 'Mise en œuvre',
    desc: "Déploiement des solutions par nos experts avec un accompagnement quotidien.",
  },
  {
    step: '04',
    title: 'Suivi & amélioration',
    desc: "Mesure des résultats, ajustements continus et optimisation des processus.",
  },
];

export default function Fonctionnement() {
  const navigate = useNavigate();

  return (
    <div className="pt-0">
      <PageBanner
        title="Fonctionnement"
        subtitle="Une méthodologie claire en 4 étapes pour des résultats concrets."
        image="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Cog className="w-4 h-4" />
              Notre fonctionnement
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Comment nous <span className="text-orange-500">travaillons</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Une méthodologie claire en 4 étapes pour des résultats concrets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((wf, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 h-full">
                  <div className="text-5xl font-bold text-orange-100 mb-3">{wf.step}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{wf.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{wf.desc}</p>
                </div>
                {i < workflow.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 w-6 h-6 items-center justify-center text-orange-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/contacts')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 inline-flex items-center gap-2 group"
            >
              Travaillons ensemble
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
