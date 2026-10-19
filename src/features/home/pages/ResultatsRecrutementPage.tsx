import { FaFilePdf } from 'react-icons/fa6';

const results = [
  {
    label: 'RESULTAT RECRUTEMENT SESSION 2026 (ASSISTANTS) LISTE DES CANDIDATS RETENUS',
    href: 'https://drh.enseignement.gouv.ci/recrutementsup/public/resultats/RECRUTEMENT_2026_ASSISTANTS_LISTE_DES_CANDIDATS_RETENUS.pdf',
  },
  {
    label: 'RESULTAT RECRUTEMENT SESSION 2026 (ASSISTANTS CHEFS DE CLINIQUE) LISTE DES CANDIDATS RETENUS',
    href: 'https://drh.enseignement.gouv.ci/recrutementsup/public/resultats/RECRUTEMENT_2026_ASSISTANT_CHEFS_DE_CLINIQUE_LISTE_DES_CANDIDATS_RETENUS.pdf',
  },
  {
    label: 'RESULTAT RECRUTEMENT SESSION 2026 (ATTACHES DE RECHERCHE) LISTE DES CANDIDATS RETENUS',
    href: 'https://drh.enseignement.gouv.ci/recrutementsup/public/resultats/RECRUTEMENT_2026_ATTACHES_DE_RECHERCHE_LISTE_DES_CANDIDATS_RETENUS.pdf',
  },
];

export default function ResultatsRecrutementPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="border-b-4 border-orange-500 pb-6">
          <p className="font-semibold uppercase tracking-wide text-orange-600">
            DRH-MESRS · Recrutement 2026
          </p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Disponibilité des résultats du recrutement — Session 2026
          </h1>
        </div>

        <section className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Listes des candidats retenus
          </h2>
          <p className="mt-2 text-gray-600">
            Consultez les résultats du recrutement 2026 selon le corps de candidature.
          </p>

          <ul className="mt-6 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white">
            {results.map((result) => (
              <li key={result.href}>
                <a
                  href={result.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 p-4 font-semibold text-blue-700 transition-colors hover:bg-blue-50 hover:text-blue-800 sm:p-5"
                >
                  <FaFilePdf className="mt-1 shrink-0" aria-hidden="true" />
                  <span>{result.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
