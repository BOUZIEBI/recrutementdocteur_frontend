/*
 * Modèle correspondant à la réponse FastAPI.
 */
export type Genre = {
  uid: string;
  libelle: string;
  code: string;
  cree_le: string | null;
  modifie_le: string | null;
  supprime_le: string | null;
};

