export type UserResponse = {
  uid: string;
  nom?: string | null;
  prenom?: string | null;
  email?: string | null;
};

export type Communique = {
  uid: string;
  reference: string | null;
  titre: string | null;
  slug: string | null;
  code: string | null;
  resume: string | null;
  contenu: string;
  image_url: string | null;
  fichier_key: string | null;
  statut: string;
  est_epingle: boolean;
  date_publication: string | null;
  date_expiration: string | null;
  auteur_uid: string | null;
  nombre_vues: number;
  nombre_telechargements: number;
  cree_le: string | null;
  modifie_le: string | null;
  is_deleted: boolean;
  supprime_le: string | null;
  supprime_par_uid: string | null;
  cree_par: UserResponse | null;
  modifie_par: UserResponse | null;
  supprime_par: UserResponse | null;
};
