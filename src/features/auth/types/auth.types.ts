export type AuthMode = 'signin' | 'signup';

export type AuthState = {
  mode: AuthMode;
  username: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  error: string | null;
  success: string | null;
};


export interface AuthenticationData {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  expires_in: number;
}

export interface AuthenticationResponse<T = AuthenticationData> {
  code: number;
  success: boolean;
  message: string;
  remaining:number;
  data: T;
}

export interface LogoutResponse {
  code: number;
  success: boolean;
  message: string;
}

export interface RefreshResponse {
  code:number,
  success:boolean,
  access_token:string;
  refresh_token:string
  token_type: "bearer",
  expires_in: number,
  data: null
}

