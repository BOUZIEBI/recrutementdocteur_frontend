
export type GenericResponse={
  uid: string;
  libelle?: string | null;
  code?: string | null;
}

export type UserResponse = {
  uid: string;
  nom?: string | null;
  prenom?: string | null;
  email?: string | null;
};


export type Phototheque = {
  uid: string;
  titre: string;
  slug: string;
  description: string | null;

  // Image représentant l’album
  image_couverture_url: string | null;
  fichier_key: string | undefined;
  fichier_url: string | undefined;

  // Informations sur l’événement
  lieu: string | null;
  date_evenement: string | null;

  // Classement
  categorie_uid: string | null;
  categorie: GenericResponse | null;

  // brouillon, publie ou archive
  statut: string;

  est_mis_en_avant: boolean;
  ordre_affichage: number;
  date_publication: string | null;

  // Statistiques
  nombre_vues: number;

  // Traçabilité
  cree_le: string;
  modifie_le: string;
  cree_par: UserResponse | null;
  modifie_par: UserResponse | null;

  // Suppression logique
  is_deleted: boolean;
  supprime_le: string | null;
  supprime_par: UserResponse | null;
};