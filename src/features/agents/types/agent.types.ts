
export interface Role {
    uid: string;
    libelle: string;
    code: string;
}

export interface GenericResponse{
    uid: string;
    libelle: string;
    code: string;
}

export interface TypeStructure{
    uid: string;
    libelle: string;
    code: string;
}

export interface Structure{
    uid: string;
    libelle: string;
    code: string;
    typestructure: TypeStructure
}

export interface Permission{
  uid: string;
  libelle: string;
  code: string;
}

export interface User {
  uid: string;
  email: string;
  username: string;
}


export interface Conjoint{
    uid: string;
    nom: string;
    prenoms: string;
    matricule_cnps: string;
    profession: string;
    code: string;
    cree_le: string;
    modifie_le: string;
    is_mode: boolean;
    supprime_le: string
}


export interface SituationAdministrative{
    uid:string;
    numero_acte_nomination_dans_emploi: string;
    date_signature_acte_nomination_dans_emploi: string;
    date_premiere_prise_service_fonction_publique: string;
    date_depart_retraite: string;
    date_radiation: string;
    date_depart_mouvement: string;
    date_retour_mouvement: string;
    adresse_bureau: string;
    adresse_personnelle: string;
    telephone_bureau: string;
    telephone_domicile: string;
    numero_telephone_1: string;
    numero_telephone_2: string;
    email_institutionnel: string
    designation_poste: string;
    numero_acte_nomination_fonctionactuelle: string;
    date_signature_acte_nomination_fonctionactuelle: string;
    is_equivqlence: boolean
    statut_situation_administrative: GenericResponse ;
    emploi: GenericResponse ;
    classe_situation_administrative: GenericResponse ;
    echelon: GenericResponse ;
    nature_acte_nomination_dans_emploi: GenericResponse ;
    nature_acte_nomination_dans_fonctionactuelle: GenericResponse ;
    diplome: GenericResponse ;
    position_administrative: GenericResponse ;
    position_militaire: GenericResponse ;
    fonction_actuelle: GenericResponse ;
}


export interface Agent{
    uid: string;
    nom: string;
    prenoms: string;
    matricule: string;
    code: string;
    date_naissance: string;
    lieu_naissance: string;
    telephone_principal: string;
    telephone_secondaire: string;
    email_professionnel: string;
    email_personnel: string;
    quartier: string;
    nom_jeune_fille: string;
    lieu_habitation: string;
    date_recrutement: string;
    date_depart: string;
    nombre_enfant: number;
    nom_prenoms_pere: string;
    nom_prenoms_mere: string;
    numero_piece_identite: string;
    cree_le: string;
    modifie_le: string;
    preinscrit_le: string;
    etat_handicap: boolean;
    is_mode: boolean;
    is_deleted: boolean;
    est_preinscrit: boolean;
    supprime_le: string;
    date_premiere_prise_service_dans_structure: string ;
    date_premiere_prise_service_fonction_publique: string;
    conjoint: Conjoint;
    nature_piece_identite: GenericResponse;
    genre: GenericResponse ;
    nature_acte_nomination_fonctionactuelle: GenericResponse ;
    type_agent: GenericResponse ;
    user: User ;
    nationalite: GenericResponse ;
    structure: GenericResponse ;
    fonction: GenericResponse ;
    situation_matrimoniale: GenericResponse ;
    specialite: GenericResponse ;
    situation_administrative: SituationAdministrative;
    grade: GenericResponse ;
    statut: GenericResponse ;
    validation_fiche: GenericResponse ;
    typestructure: TypeStructure ;
    cree_par: User ;
    modifie_par: User ;
    supprime_par: User ;
}


export interface AjoutagentResponse<T = Agent> {
  code: number;
  success: boolean;
  message: string;
  remaining:number;
  data: T;
}


