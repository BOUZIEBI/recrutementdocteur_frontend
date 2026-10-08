

export interface Role {
  uid: string;
  libelle: string;
  code: string;
}

export interface Permission {
  uid: string;
  libelle: string;
  code: string;
}

export interface User {
  uid: string;
  email: string;
  username: string;

  role: Role | null;
  permissions: Permission[];

  is_verified: boolean;
  is_active: boolean;
  is_superuser: boolean;

  cree_le: string;
  modifier_le: string | null;
  supprime_le: string | null;
}

export interface GetMeResponse<T = User> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}



