/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REDIRECTION_APRES_CONNEXION?: string;
  readonly SECRET_KEY?: string;
  readonly VITE_MEDIA_BASE_URL?: string;
  readonly VITE_FASTAPI_PUBLIC_KEY_BASE64?: string;
  readonly VITE_PUBLIC_KEY?: string;
}
