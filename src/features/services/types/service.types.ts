
import { User } from "@/features/user/types/user.types";

/*
 * Modèle correspondant à la réponse FastAPI.
 */
export type Service = {
  uid: string;
  libelle: string;
  code: string;
  slug: string;

  description_courte: string;
  description: string;

  image_url: string | null;
  fichier_url: string | null;
  fichier_key: string | null;

  conditions_acces: string;
  pieces_requises: string;
  procedure: string;
  delai_traitement: string;

  cout: number | null;
  lien_demande: string | null;

  // Contacts
  email: string | null;
  telephone: string | null;
  adresse: string | null;
  horaires: string | null;

  // Relations : un UUID est reçu comme string en JSON
  structure_uid: string | null;
  responsable_uid: string | null;

  // Publication
  statut: string;
  ordre_affichage: number;

  // Traçabilité
  cree_le: string | null;
  modifie_le: string | null;

  // Suppression logique
  is_deleted: boolean;
  supprime_le: string | null;

  cree_par: User | null;
  modifie_par: User | null;
  supprime_par: User | null;
};

