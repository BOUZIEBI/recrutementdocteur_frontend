import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { FaFilePdf } from 'react-icons/fa6';

export default function RecrutementSession() {
  return (
    <div className="conteneur-recrutement-session">
      <div className="conteneur-recrutement-session-header overflow-hidden whitespace-nowrap">
        <p className="recrutement-session-marquee">
          DISPONIBILITES DES RESULTATS SESSION RECRUTEMENT 2026
        </p>
      </div>
      <div className="conteneur-recrutement-drh-mesrs">
        <div className="conteneur-recrutement-drh-mesrs-header" />

        <div className="conteneur-block-image-recrutement flex flex-col lg:flex-row items-start">
          <div className="conteneur-image-recrutement flex-[0_0_40%]">
            <img
              src="/enseignants.jpg"
              alt="Enseignants"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="conteneur-recrutement-liens flex-[0_0_60%] min-w-0">
            <div className="conteneur-bloc-recrutement-liens flex flex-col lg:flex-row justify-center gap-4 mt-8 lg:mr-8">
              <div className="conteneur-recrutement-lien-1 basis-1/2 gap-2">
                <div className="mt-2 mb-4">
                  <Link
                    to="/recrutement/resultats-session-2026"
                    className="titre-annonce text-blue-700 font-bold text-sm hover:underline hover:text-blue-800"
                  >
                    DISPONIBILITE DES RESULTATS RECRUTEMENT SESSION 2026
                  </Link>
                </div>

                <hr />
                <div className="mt-4">
                  <a
                    href="https://drh.enseignement.gouv.ci/recrutementsup/public/resultats/RECRUTEMENT_2026_ASSISTANTS_LISTE_DES_CANDIDATS_RETENUS.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-start gap-1 text-sm font-bold text-blue-700 hover:text-blue-800"
                  >
                    <span>
                      <FaFilePdf size={16} aria-hidden="true" />
                    </span>
                    <span>
                      RESULTAT RECRUTEMENT SESSION 2026 (ASSISTANTS) LISTE DES CANDIDATS RETENUS
                    </span>
                  </a>
                </div>
              </div>
              <div className="conteneur-recrutement-lien-2 basis-1/2">
                <div className="mt-2 mb-4">
                  <Link
                    to="/recrutement/resultats-session-2026"
                    className="titre-annonce text-blue-700 font-bold text-sm hover:underline hover:text-blue-800"
                  >
                    DISPONIBILITE DES RESULTATS RECRUTEMENT SESSION 2026
                  </Link>
                </div>

                <hr />
                <div className="mt-4">
                  <a
                    href="https://drh.enseignement.gouv.ci/recrutementsup/public/resultats/RECRUTEMENT_2026_ASSISTANT_CHEFS_DE_CLINIQUE_LISTE_DES_CANDIDATS_RETENUS.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex mb-2 items-start gap-1 text-sm font-bold text-blue-700 hover:text-blue-800"
                  >
                    <span><FaFilePdf size={16} aria-hidden="true" /></span>
                    <span>
                      RESULTAT RECRUTEMENT SESSION 2026 (ASSISTANTS CHEFS DE CLINIQUE) LISTE DES CANDIDATS RETENUS
                    </span>
                  </a>
                  <a
                    href="https://drh.enseignement.gouv.ci/recrutementsup/public/resultats/RECRUTEMENT_2026_ATTACHES_DE_RECHERCHE_LISTE_DES_CANDIDATS_RETENUS.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-start gap-1 text-sm mb-2 font-bold text-blue-700 hover:text-blue-800"
                  >
                    <span><FaFilePdf size={16} aria-hidden="true" /></span>
                    <span>
                      RESULTAT RECRUTEMENT SESSION 2026 (ATTACHES DE RECHERCHE) LISTE DES CANDIDATS RETENUS
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="conteneur-recrutement-drh-mesrs-footer mt-4 lg:mt-0 lg:px-8 lg:pb-8">
          <h1>RECRUTEMENT DRH-MESRS</h1>
          <div>
            <p>
              Plateforme de la Direction des Ressources Humaines (DRH) du Ministère de l&apos;Enseignement Supérieur et de la Recherche Scientifique (MESRS).
            </p>
          </div>
          <div className="conteneur-bouton-inscription mt-4 mb-8 ">
            <Link
              to="/preinscription"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FC6C0C] text-xl px-5 py-3 font-semibold text-white transition-colors hover:bg-[#f87e2d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#261CC1]"
            >
              <UserPlus size={20} aria-hidden="true" />
              Inscription
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
