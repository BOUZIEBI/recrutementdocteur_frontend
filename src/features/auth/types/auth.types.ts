export type AuthMode = 'signin' | 'signup';

export type AuthState = {
  mode: AuthMode;
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  error: string | null;
  success: string | null;
};
