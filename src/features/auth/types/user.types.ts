export interface RoleResponse {
  uid: string;
  libelle: string | null;
  code: string | null;
}

export interface PermissionResponse {
  id: number;
  codename: string;
  name: string;
}

export interface AgentResponse {
  uid?: string;

  email: string | null;
  nom: string | null;
  prenoms: string | null;
  matricule: string | null;
  code: string | null;

  date_naissance: string | null;
  lieu_naissance: string | null;

  telephone_principal: string | null;
  telephone_secondaire: string | null;

  email_professionnel: string | null;
  email_personnel: string | null;

  quartier: string | null;
  nom_jeune_fille: string | null;
  lieu_habitation: string | null;

  date_recrutement: string | null;
  date_depart: string | null;

  nombre_enfant?: number;

  nom_prenoms_pere: string | null;
  nom_prenoms_mere: string | null;

  numero_piece_identite: string | null;

  cree_le: string | null;
  modifie_le: string | null;
  preinscrit_le: string | null;
  supprime_le: string | null;

  date_premiere_prise_service_dans_structure: string | null;
  date_premiere_prise_service_fonction_publique: string | null;

  etat_handicap: boolean | null;
  is_mode: boolean | null;

  is_deleted?: boolean;
  est_preinscrit?: boolean;

  cree_par: string | null;
  modifie_par: string | null;
  supprime_par: string | null;

  conjoint: string | null;
  genre: string | null;
  type_agent: string | null;
  nationalite: string | null;
  type_recrutement: string | null;
  structure: string | null;
  fonction: string | null;
  situation_matrimoniale: string | null;
  specialite: string | null;
  situation_administrative: string | null;
  grade: string | null;
  statut: string | null;

  user: string | null;
  validation_fiche: string | null;
}

export interface UserResponse {
  uid: string;
  username: string;
  email: string;

  first_name: string;
  last_name: string;

  is_active: boolean;
  is_verified: boolean;
  is_superuser: boolean;

  role: RoleResponse | null;
  permissions: PermissionResponse[];

  agent: AgentResponse | null;

  cree_le: string | null;
  modifie_le: string | null;
}

export interface GetMeResponse {
  code: number;
  success: boolean;
  message: string;
  data: UserResponse;
}


