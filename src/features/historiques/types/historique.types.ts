// src/types/historique.types.ts

export type UUID = string;
export type ISODateTime = string;

/**
 * Référence générique retournée par un serializer imbriqué.
 * Elle peut être enrichie selon les champs du modèle concerné.
 */
export interface RelationReference {
  uid: UUID;
  libelle?: string | null;
  code?: string | null;
  nom?: string | null;
  prenoms?: string | null;
  nom_prenoms?: string | null;
  email?: string | null;
  [key: string]: unknown;
}

/**
 * Selon le serializer Django, une relation peut être :
 * - son UUID ;
 * - un objet imbriqué ;
 * - null.
 */
export type RelationValue =
  | UUID
  | RelationReference
  | null;

export type Genre =
  | "MASCULIN"
  | "FEMININ"
  | string;

export type TypeSession =
  | "SESSIONANNEE"
  | string;



export interface HistoriquePayload {
  email?: string | null;
  nom_prenoms?: string | null;

  numero_candidat?: string | null;
  matricule?: string | null;
  code?: string | null;
  annee_concours?: string | null;

  date_naissance?: ISODateTime | null;
  lieu_naissance?: string | null;

  telephone?: string | null;
  email_professionnel?: string | null;
  email_personnel?: string | null;

  nom_jeune_fille?: string | null;
  lieu_habitation?: string | null;

  date_recrutement?: ISODateTime | null;
  nombre_enfant?: number;

  numero_piece_identite?: string | null;
  date_obtention_diplome?: ISODateTime | null;

  cree_le?: ISODateTime | null;
  modifie_le?: ISODateTime | null;
  preinscrit_le?: ISODateTime | null;
  supprime_le?: ISODateTime | null;

  date_premiere_prise_service_dans_structure?:
    | ISODateTime
    | null;

  date_premiere_prise_service_fonction_publique?:
    | ISODateTime
    | null;

  is_mode?: boolean | null;
  is_deleted?: boolean | null;
  est_inscrit?: boolean | null;

  genre?: string | null;
  type_session?: string;

  nombre_publication?: number | null;

  cree_par_uid?: UUID | null;
  modifie_par_uid?: UUID | null;
  supprime_par_uid?: UUID | null;

  handicap_uid?: UUID | null;
  diplome_uid?: UUID | null;
  institution_dorigine_uid?: UUID | null;
  nationalite_uid?: UUID | null;
  type_recrutement_uid?: UUID | null;
  structure_uid?: UUID | null;
  situation_matrimoniale_uid?: UUID | null;
  situation_administrative_uid?: UUID | null;
  grade_uid?: UUID | null;
  pays_residence_uid?: UUID | null;
  pays_obtention_uid?: UUID | null;
  user_uid?: UUID | null;
}


export interface Historique {
  uid: UUID;

  /*
   * Ne retournez jamais le mot de passe depuis l’API.
   * Le champ password n’est donc volontairement pas présent.
   */

  email: string | null;
  nom_prenoms: string | null;

  numero_candidat: string | null;
  matricule: string | null;
  code: string | null;
  annee_concours: string | null;

  date_naissance: ISODateTime | null;
  lieu_naissance: string | null;

  telephone: string | null;
  email_professionnel: string | null;
  email_personnel: string | null;

  nom_jeune_fille: string | null;
  lieu_habitation: string | null;

  date_recrutement: ISODateTime | null;

  nombre_enfant: number;

  numero_piece_identite: string | null;
  date_obtention_diplome: ISODateTime | null;

  cree_le: ISODateTime | null;
  modifie_le: ISODateTime | null;
  preinscrit_le: ISODateTime | null;
  supprime_le: ISODateTime | null;

  date_premiere_prise_service_dans_structure:
    | ISODateTime
    | null;

  date_premiere_prise_service_fonction_publique:
    | ISODateTime
    | null;

  is_mode: boolean | null;
  is_deleted: boolean | null;
  est_inscrit: boolean | null;

  genre: Genre | null;
  type_session: TypeSession;

  nombre_publication: number | null;

  // Utilisateurs
  cree_par: RelationValue;
  modifie_par: RelationValue;
  supprime_par: RelationValue;

  // Relations
  handicap: RelationValue;
  diplome: RelationValue;
  institution_dorigine: RelationValue;
  nationalite: RelationValue;
  type_recrutement: RelationValue;
  structure: RelationValue;
  situation_matrimoniale: RelationValue;
  situation_administrative: RelationValue;
  grade: RelationValue;
  pays_residence: RelationValue;
  pays_obtention: RelationValue;
  user: RelationValue;
}

export interface HistoriquePaginationData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Historique[];
}


export interface HistoriqueResponse {
  code: number;
  success: boolean;
  message: string;
  data: HistoriquePaginationData | null;
}