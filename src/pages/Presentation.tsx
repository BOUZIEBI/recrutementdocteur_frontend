import {
  Target,
  Eye,
  Heart,
  Shield,
  Zap,
  History,
  Network,
  Cog,
  Users,
  Briefcase,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

const milestones = [
  { year: '2009', text: 'Création de DRH avec une mission : humaniser la gestion RH.' },
  { year: '2014', text: 'Expansion nationale et accompagnement de plus de 100 entreprises.' },
  { year: '2019', text: "Lancement de l'offre de formation continue et du coaching personnalisé." },
  { year: '2024', text: "Plus de 200 clients et une équipe de 50 experts RH dédiés." },
];

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

export default function Presentation() {
  const navigate = useNavigate();

  return (
    <div className="pt-0">
      <PageBanner
        title="Présentation"
        subtitle="Découvrez notre histoire, notre mission et les valeurs qui nous animent au quotidien."
        image="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=500&w=1400"
      />

      {/* Missions */}
      <section id="missions" className="py-24 bg-white scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Target className="w-4 h-4" />
                Nos missions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
                Accompagner et <span className="text-orange-500">sublimer</span> votre capital humain
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Notre mission est de transformer la gestion des ressources humaines
                en un véritable levier de performance et de bien-être pour votre
                entreprise. Nous accompagnons organisations et collaborateurs à
                chaque étape de leur développement.
              </p>
              <ul className="space-y-3">
                {[
                  "Conseiller et guider les dirigeants dans leurs choix RH",
                  "Optimiser l'administration du personnel et la gestion de la paie",
                  "Favoriser le développement des compétences et la mobilité",
                  "Créer un environnement de travail sain et motivant",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/20">
                <Target className="w-10 h-10 mb-4" />
                <div className="text-3xl font-bold">200+</div>
                <div className="text-white/80 text-sm mt-1">Entreprises accompagnées</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                <Users className="w-10 h-10 mb-4 text-orange-500" />
                <div className="text-3xl font-bold text-gray-900">15K+</div>
                <div className="text-gray-500 text-sm mt-1">Collaborateurs gérés</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                <Award className="w-10 h-10 mb-4 text-orange-500" />
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-gray-500 text-sm mt-1">Satisfaction client</div>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl">
                <TrendingUp className="w-10 h-10 mb-4 text-orange-400" />
                <div className="text-3xl font-bold">15+</div>
                <div className="text-white/70 text-sm mt-1">Années d'expertise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="py-24 bg-gray-50 scroll-mt-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Eye className="w-4 h-4" />
            Notre vision
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-8">
            Un avenir où chaque talent <span className="text-orange-500">trouve sa place</span>
          </h2>
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-6">
              "Nous voyons un monde du travail où la gestion des ressources humaines
              n'est plus une contrainte administrative, mais un véritable moteur de
              croissance et d'épanouissement."
            </p>
            <p className="text-gray-500 leading-relaxed">
              Notre vision est de devenir la référence du conseil RH en proposant
              des solutions innovantes, digitales et humaines. Nous croyons en un
              modèle où technologie et bienveillance se conjuguent pour créer des
              organisations plus agiles, inclusives et performantes.
            </p>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section id="valeurs" className="py-24 bg-white scroll-mt-40">
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

      {/* Historique */}
      <section id="historique" className="py-24 bg-gray-50 scroll-mt-40">
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

      {/* Organigramme */}
      <section id="organigramme" className="py-24 bg-white scroll-mt-40">
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

          {/* Direction générale */}
          <div className="flex flex-col items-center mb-12">
            <div className="bg-gray-900 text-white rounded-2xl px-8 py-5 text-center shadow-xl w-full max-w-xs">
              <Briefcase className="w-8 h-8 mx-auto mb-3 text-orange-400" />
              <div className="font-bold text-lg">Jean Dupont</div>
              <div className="text-gray-400 text-sm">Direction Générale</div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
          </div>

          {/* Branches */}
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

      {/* Fonctionnement */}
      <section id="fonctionnement" className="py-24 bg-gray-50 scroll-mt-40">
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
