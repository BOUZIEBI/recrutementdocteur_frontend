
import { User } from "@/features/user/types/user.types";

export type CategorieActualite = {
  uid: string;
  libelle: string | null;
  code: string | null;
};

export type Actualite = {
  uid: string;
  titre: string;
  slug: string;
  resume: string | null;
  contenu: string;
  fichier_key: string | null;
  fichier_url: string | null;
  image_alt: string | null;
  statut: string;
  est_a_la_une: boolean;
  nombre_vues: number;
  date_publication: string ;
  cree_le: string;
  modifie_le: string;
  is_deleted: boolean;
  supprime_le: string | null;
  categorie_actualite:
    | CategorieActualite
    | null;
  cree_par: User | null;
  modifie_par: User | null;
  supprime_par: User | null;
};