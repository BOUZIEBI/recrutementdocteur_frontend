import { FaBuilding, FaFilePdf } from 'react-icons/fa6';

export default function ProceduresConditions() {
  return (
    <div className="conteneur-procedures-conditions lg:col-span-3 space-y-5 rounded-lg bg-white mt-2 p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row items-center justify-start gap-4 conteneur-icon-procedures-conteneurs">
        <div>
          <FaBuilding size={40} />
        </div>
        <div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              RECRUTEMENT - MINISTERE DE L&apos;ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE
            </h3>
          </div>
          <p>
            <a
              href="https://drh.enseignement.gouv.ci/recrutementsup/public/conditions/PROCEDURE_INSCRIPTION_RECRUTEMENT_SESSION_2026.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-red-700 underline hover:text-red-800"
            >
              <FaFilePdf size={16} aria-hidden="true" />
              PROCEDURE D&apos;INSCRIPTION RECRUTEMENT SESSION 2026
            </a>
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 mt-4">
              CONDITIONS DE CANDIDATURE ET PIECES A FOURNIR SESSION 2026
            </h4>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
              <a
                href="https://drh.enseignement.gouv.ci/recrutementsup/public/conditions/AS_CONDITIONS_RECRUTEMENT_SESSION_2026.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-red-700 underline hover:text-red-800"
              >
                <FaFilePdf size={16} aria-hidden="true" />
                CONDITION ASSISTANTS
              </a>
              <span aria-hidden="true">/</span>
              <a
                href="https://drh.enseignement.gouv.ci/recrutementsup/public/conditions/AS_PIECES_FOURNIR_RECRUTEMENT_SESSION_2026.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-red-700 underline hover:text-red-800"
              >
                <FaFilePdf size={16} aria-hidden="true" />
                PIECES A FOURNIR ASSISTANTS
              </a>
              <span aria-hidden="true">/</span>
              <a
                href="https://drh.enseignement.gouv.ci/recrutementsup/public/conditions/ACC_CONDITIONS_RECRUTEMENT_SESSION_2026.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-red-700 underline hover:text-red-800"
              >
                <FaFilePdf size={16} aria-hidden="true" />
                CONDITION ASSISTANTS CHEFS DE CLINIQUE
              </a>
              <span aria-hidden="true">/</span>
              <a
                href="https://drh.enseignement.gouv.ci/recrutementsup/public/conditions/ACC_PIECES_FOURNIR_RECRUTEMENT_SESSION_2026.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-red-700 underline hover:text-red-800"
              >
                <FaFilePdf size={16} aria-hidden="true" />
                PIECES A FOURNIR ASSISTANTS CHEFS DE CLINIQUE
              </a>
              <span aria-hidden="true">/</span>
              <a
                href="https://drh.enseignement.gouv.ci/recrutementsup/public/conditions/AR_CONDITIONS_RECRUTEMENT_SESSION_2026.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-red-700 underline hover:text-red-800"
              >
                <FaFilePdf size={16} aria-hidden="true" />
                CONDITION ATTACHES DE RECHERCHE
              </a>
              <span aria-hidden="true">/</span>
              <a
                href="https://drh.enseignement.gouv.ci/recrutementsup/public/conditions/AR_PIECES_FOURNIR_RECRUTEMENT_SESSION_2026.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-red-700 underline hover:text-red-800"
              >
                <FaFilePdf size={16} aria-hidden="true" />
                PIECES A FOURNIR ATTACHES DE RECHERCHE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
