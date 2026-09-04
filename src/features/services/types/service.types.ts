import {
  UserPlus,
  GraduationCap,
  HeartHandshake,
  FileText,
  Scale,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
  contenu: string[];
};

export const services: Service[] = [
  {
    slug: 'recrutement-sourcing',
    icon: UserPlus,
    title: 'Recrutement & Sourcing',
    desc: "Identification, sélection et intégration des meilleurs talents pour vos équipes. Nous utilisons des méthodes modernes de sourcing et d'évaluation.",
    tags: ['Sourcing', 'Entretiens', 'Intégration'],
    contenu: [
      "Notre approche du recrutement commence par une analyse fine de vos besoins : définition du poste, du profil idéal et de la culture d'entreprise. Nous élaborons ensuite une stratégie de sourcing multicanale pour atteindre les meilleurs candidats, qu'ils soient actifs ou passifs.",
      "Chaque candidat passe par un processus d'évaluation rigoureux : entretiens structurés, tests de compétences et assessment center. Nous vous présentons une short-list qualifiée accompagnée d'un dossier détaillé pour chaque profil.",
      "Une fois votre choix arrêté, nous accompagnons l'intégration du nouveau collaborateur : plan d'onboarding, suivi à 30/60/90 jours et feedback continu pour garantir une prise de poste réussie.",
    ],
  },
  {
    slug: 'formation-developpement',
    icon: GraduationCap,
    title: 'Formation & Développement',
    desc: "Programmes de formation sur mesure pour développer les compétences de vos collaborateurs et accompagner leur évolution professionnelle.",
    tags: ['Coaching', 'E-learning', 'Mentorat'],
    contenu: [
      "Nous concevons des programmes de formation entièrement personnalisés, alignés sur vos enjeux stratégiques et le développement des compétences clés de vos équipes. Chaque parcours combine présentiel, e-learning et pratique sur le terrain.",
      "Notre catalogue couvre l'ensemble des thématiques RH et managériales : leadership, communication, gestion de projet, intelligence émotionnelle, conduite du changement et bien plus encore.",
      "Au-delà des formations collectives, nous proposons un coaching individuel pour vos dirigeants et hauts potentiels, ainsi qu'un dispositif de mentorat pour favoriser la transmission des savoirs au sein de votre organisation.",
    ],
  },
  {
    slug: 'gestion-de-carriere',
    icon: HeartHandshake,
    title: 'Gestion de carrière',
    desc: "Accompagnement personnalisé pour les parcours professionnels, la mobilité interne et la planification de la relève.",
    tags: ['Mobilité', 'Talent review', 'Succession'],
    contenu: [
      "La gestion de carrière est un levier essentiel de rétention et d'engagement. Nous vous aidons à structurer des parcours professionnels clairs, avec des passerelles entre métiers et une cartographie des compétences à jour.",
      "Nous animons les revues de talents : évaluation des performances, identification des hauts potentiels et plans de développement individuels. Vous disposez d'une vision globale de vos talents et de leur évolution.",
      "Pour les postes clés, nous construisons des plans de succession et accompagnons la mobilité interne, qu'elle soit géographique, fonctionnelle ou hiérarchique, pour sécuriser la continuité de votre activité.",
    ],
  },
  {
    slug: 'administration-du-personnel',
    icon: FileText,
    title: 'Administration du personnel',
    desc: "Gestion complète de la paie, des contrats, des congés et de toutes les formalités administratives liées à vos employés.",
    tags: ['Paie', 'Contrats', 'Déclarations'],
    contenu: [
      "Nous prenons en charge l'ensemble de l'administration de votre personnel : gestion des contrats, tenue des dossiers, suivi des absences et des congés, ainsi que toutes les déclarations légales et sociales.",
      "Notre service de gestion de la paie garantit fiabilité et conformité : production des bulletins, déclarations aux organismes, gestion des entrées et sorties, et accompagnement lors des contrôles URSSAF ou de l'inspection du travail.",
      "Vous bénéficiez d'un reporting régulier et d'un interlocuteur dédié, pour une sérénité administrative totale au quotidien.",
    ],
  },
  {
    slug: 'conseil-juridique-social',
    icon: Scale,
    title: 'Conseil juridique & social',
    desc: "Expertise en droit du travail, relations sociales et conformité réglementaire pour sécuriser vos pratiques RH.",
    tags: ['Droit du travail', 'Relations sociales', 'Conformité'],
    contenu: [
      "Nos juristes experts en droit du travail vous conseillent sur tous les aspects de la relation de travail : contrats, disciplinaire, ruptures, négociations conventionnelles et gestion des risques prud'homales.",
      "Nous vous accompagnons dans le pilotage des relations sociales : préparation des élections, dialogue avec les représentants du personnel, gestion des conflits et conduite des négociations obligatoires.",
      "Un audit régulier de votre conformité réglementaire vous permet d'anticiper les évolutions légales et de sécuriser vos pratiques RH dans la durée.",
    ],
  },
  {
    slug: 'strategie-rh-qvt',
    icon: TrendingUp,
    title: 'Stratégie RH & QVT',
    desc: "Élaboration de stratégies RH performantes et mise en place de démarches Qualité de Vie au Travail mesurables et impactantes.",
    tags: ['Audit RH', 'QVT', 'Marque employeur'],
    contenu: [
      "Nous vous aidons à construire une stratégie RH alignée avec votre vision business : diagnostic, définition des axes prioritaires, plan d'action et indicateurs de pilotage. Votre fonction RH devient un véritable partenaire stratégique.",
      "Nos démarches Qualité de Vie au Travail s'appuient sur des diagnostics participatifs, des plans d'action concrets et des mesures d'impact régulières. Nous traitons aussi bien la santé physique que le bien-être psychosocial.",
      "Pour renforcer votre attractivité, nous construisons votre marque employeur : promesse candidat, parcours d'onboarding et communication RH cohérente avec vos valeurs et votre culture.",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
