// src/features/structures/types/structure.types.ts

export interface TypeStructureResponse {
  uid: string;
  libelle: string;
  code: string | null;
}

export interface UserResponse {
  uid: string;
  username: string;
  email: string;
}

export interface Structure {
  uid: string;
  libelle: string;

  abreviation: string | null;
  description: string | null;
  slug: string | null;
  code: string | null;

  personne_contact: string | null;
  telephone_personne_contact: string | null;

  anneecreation: string | null;
  quartier: string | null;
  adressecomplete: string | null;

  email: string | null;
  telephone: string | null;
  siteweb: string | null;

  is_mode: boolean | null;
  is_deleted: boolean | null;

  cree_le: string | null;
  modifie_le: string | null;
  supprime_le: string | null;

  typestructure: TypeStructureResponse | null;

  cree_par: UserResponse | null;
  modifie_par: UserResponse | null;
  supprime_par: UserResponse | null;
}