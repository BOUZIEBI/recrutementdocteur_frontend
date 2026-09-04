export type KnowledgeEntry = {
  keywords: string[];
  question: string;
  answer: string;
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ['bonjour', 'salut', 'hello', 'coucou', 'bonsoir'],
    question: 'Salutation',
    answer:
      "Bonjour ! Je suis l'assistant virtuel de la DRH-MESRS. Je peux vous renseigner sur la Direction, nos services, le recrutement, le SYGRH et les démarches administratives. Comment puis-je vous aider ?",
  },
  {
    keywords: ['presentation', 'quest ce', "qu'est-ce", 'direction', 'drh', 'mesrs'],
    question: "Qu'est-ce que la DRH-MESRS ?",
    answer:
      "La Direction des Ressources Humaines du Ministère de l'Enseignement Supérieur et de la Recherche Scientifique (DRH-MESRS) assure la gestion, le développement et l'administration du capital humain du Ministère. Elle couvre le recrutement, la formation, la gestion de carrière et l'administration du personnel.",
  },
  {
    keywords: ['mission', 'missions', 'role', 'rôle', 'fait'],
    question: 'Quelles sont les missions de la DRH ?',
    answer:
      "Les missions de la DRH-MESRS comprennent : la gestion prévisionnelle des emplois et des compétences, le recrutement et l'intégration des agents, la formation et le développement professionnel, la gestion de carrière et la mobilité, l'administration du personnel (paie, congés, contrats), et le conseil juridique et social.",
  },
  {
    keywords: ['service', 'services', 'prestation', 'prestations'],
    question: 'Quels services propose la DRH ?',
    answer:
      "La DRH-MESRS propose six pôles de services : Recrutement & Sourcing, Formation & Développement, Gestion de carrière, Administration du personnel, Conseil juridique & social, et Stratégie RH & QVT. Vous pouvez consulter le détail de chaque service dans la rubrique « Nos services » du site.",
  },
  {
    keywords: ['recrutement', 'recruter', 'candidat', 'postuler', 'emploi', 'offre'],
    question: 'Comment se déroule le recrutement ?',
    answer:
      "Le recrutement suit un processus structuré : analyse du besoin, sourcing multicanal, évaluation des candidats (entretiens, tests), présentation d'une short-list puis accompagnement à l'intégration avec un suivi à 30/60/90 jours. Les offres en cours sont publiées dans la rubrique « Recrutement » du site.",
  },
  {
    keywords: ['formation', 'former', 'developpement', 'développement', 'competence', 'compétence', 'coach'],
    question: 'Proposez-vous des formations ?',
    answer:
      "Oui. La DRH-MESRS conçoit des programmes de formation sur mesure (présentiel, e-learning, coaching, mentorat) couvrant le leadership, la communication, la gestion de projet et la conduite du changement. Contactez-nous pour bâtir un parcours adapté à vos équipes.",
  },
  {
    keywords: ['carriere', 'carrière', 'mobilite', 'mobilité', 'succession', 'promotion'],
    question: 'Comment est gérée la carrière des agents ?',
    answer:
      "La DRH accompagne les parcours professionnels via la cartographie des compétences, les revues de talents, les plans de développement individuels, la mobilité interne (géographique, fonctionnelle, hiérarchique) et les plans de succession pour les postes clés.",
  },
  {
    keywords: ['paie', 'bulletin', 'salaire', 'conge', 'congé', 'contrat', 'administration'],
    question: "Comment se passe l'administration du personnel ?",
    answer:
      "La DRH prend en charge la gestion des contrats, le suivi des absences et congés, les déclarations légales et sociales, ainsi que la production des bulletins de paie. Un interlocuteur dédié et un reporting régulier vous accompagnent au quotidien.",
  },
  {
    keywords: ['juridique', 'droit', 'legal', 'légal', 'social', 'conformite', 'conformité', 'litige'],
    question: 'Avez-vous un service juridique ?',
    answer:
      "Oui. Le pôle Conseil juridique & social conseille sur le droit du travail (contrats, disciplinaire, ruptures), pilote les relations sociales (élections, négociations) et réalise des audits de conformité réglementaire pour sécuriser vos pratiques RH.",
  },
  {
    keywords: ['sygrh', 'systeme', 'système', 'information', 'numerique', 'numérique', 'plateforme'],
    question: "Qu'est-ce que le SYGRH ?",
    answer:
      "Le SYGRH (Système de Gestion des Ressources Humaines) est la plateforme numérique de la DRH-MESRS. Elle permet aux agents d'accéder à leurs informations administratives et de réaliser leurs démarches en ligne. Consultez la rubrique « SYGRH » pour en savoir plus.",
  },
  {
    keywords: ['espace agent', 'compte', 'connecter', 'connexion', 'login', 'mot de passe', 'identifiant'],
    question: "Comment accéder à mon Espace Agent ?",
    answer:
      "Rendez-vous sur la page « Espace Agent DRH-MESRS » via le bouton de connexion en page d'accueil. Si vous n'avez pas encore de compte, vous pouvez remplir une demande de préinscription. Une fois votre compte créé, connectez-vous avec votre adresse email et votre mot de passe.",
  },
  {
    keywords: ['preinscription', 'préinscription', 'inscrire', 'inscription', 'creer compte', 'créer compte'],
    question: "Comment se préinscrire ?",
    answer:
      "Pour vous préinscrire, cliquez sur « Se préinscrire » depuis la page de connexion, puis remplissez le formulaire avec vos informations personnelles et professionnelles. Votre demande sera examinée par la DRH et votre compte sera activé après vérification.",
  },
  {
    keywords: ['contact', 'contacter', 'email', 'telephone', 'téléphone', 'adresse', 'joindre'],
    question: 'Comment contacter la DRH ?',
    answer:
      "Vous pouvez écrire à la DRH-MESRS via le formulaire de la rubrique « Contacts », par email à contact@rhpro.fr ou par téléphone au +33 1 23 45 67 89. L'équipe vous répondra dans les meilleurs délais.",
  },
  {
    keywords: ['objectif', 'objectifs', 'but', 'finalite', 'finalité'],
    question: 'Quels sont les objectifs de la DRH ?',
    answer:
      "La DRH-MESRS vise à professionnaliser la gestion des ressources humaines du Ministère, sécuriser les parcours professionnels, développer les compétences des agents et garantir la conformité réglementaire, au service d'une administration publique performante.",
  },
  {
    keywords: ['directeur', 'mot du directeur', 'direction'],
    question: 'Qui dirige la DRH ?',
    answer:
      "La DRH-MESRS est dirigée par un Directeur des Ressources Humaines. Vous pouvez lire son mot et découvrir la vision de la Direction dans la rubrique « Mot du Directeur » de la section Présentation.",
  },
  {
    keywords: ['merci', 'genial', 'génial', 'parfait', 'super', 'au revoir', 'bye'],
    question: 'Remerciement',
    answer:
      "Avec plaisir ! N'hésitez pas à revenir si vous avez d'autres questions. Je reste à votre disposition.",
  },
];

export const quickQuestions: string[] = [
  'Quels services propose la DRH ?',
  'Comment se déroule le recrutement ?',
  "Qu'est-ce que le SYGRH ?",
  'Comment contacter la DRH ?',
];

export function findBestAnswer(input: string): { answer: string; matched: boolean } {
  const text = input.toLowerCase().trim();
  if (!text) return { answer: '', matched: false };

  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (text.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore > 0) {
    return { answer: best.answer, matched: true };
  }

  return {
    answer:
      "Je ne suis pas certain d'avoir la bonne réponse à cette question. Vous pouvez reformuler, ou consulter les rubriques « Nos services », « DRH-MESRS » et « Contacts » du site. Vous pouvez aussi écrire à contact@rhpro.fr.",
    matched: false,
  };
}
