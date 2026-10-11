import type { AuthMode, AuthenticationResponse, LogoutResponse } from '../types/auth.types';
import type { GetMeResponse } from '../types/user.types';
import type { User } from '../types/user.types';
import { api } from '@/shared/services/apiService';
import { supabase } from '@/shared/lib/supabase';
import { useCryptoSessionStore } from '@/store/useCryptoSessionStore';
//import { useCryptoStore } from '@/store/useCryptoStore';
import { fetchPublicKey, fetchCsrfToken } from '@/shared/services/cryptoService';
import { encryptPayload, decryptServerResponse, type EncryptedPayload } from '@/shared/services/hybridCrypto';
import { encryptToken, decryptToken, clearToken } from '@/shared/services/EncrypdecrypToten';
import { refreshAccessToken } from '@/shared/services/authService';


export async function getCsrfToken(): Promise<string> {
  const cookie = document.cookie.split(';').map((item) => item.trim())
    .find((item) => item.startsWith('csrf_token='));
  const token = cookie ? decodeURIComponent(cookie.slice('csrf_token='.length)) : null;
  return token || fetchCsrfToken();
}



function isEncryptedPayload(value: unknown): value is EncryptedPayload {
  if (!value || typeof value !== 'object') return false;
  const payload = value as Partial<EncryptedPayload>;
  return typeof payload.encrypted_key === 'string' && !!payload.encrypted_key
    && typeof payload.encrypted_data === 'string' && !!payload.encrypted_data
    && typeof payload.iv === 'string' && !!payload.iv;
}


export async function signIn(email: string, password: string): Promise<AuthenticationResponse> {

  //await useCryptoStore.getState().initialize();
  //const { privateKey, sessionUid } = useCryptoSessionStore.getState();
  //if (!privateKey || !sessionUid) throw new Error('La session cryptographique est absente.');

  const headers: Record<string, string> = { };
  //const csrfToken = await getCsrfToken();
  //headers['X-CSRF-Token'] = csrfToken;
  
  //const { payload } = await encryptPayload({ username: email, password }, fetchPublicKey());
  const response = await api.post<unknown>('/auth/login/', { username: email, password }, { headers });

  //if (!isEncryptedPayload(response.data)) 
  //  throw new Error('La réponse chiffrée est invalide.');

  console.log(response)
  const access_storage_key="access_token"
  const refresh_storage_key="refresh_token"
  //await encryptToken(response.data.access_token, access_storage_key);
  //await encryptToken(response.data.refresh_token, refresh_storage_key);
  return response.data as AuthenticationResponse;
}


export async function deconnexion(): Promise<LogoutResponse> {
  
  //await useCryptoStore.getState().initialize();
  const access_storage_key="access_token"
  const accessToken = await decryptToken(access_storage_key);
  const { privateKey, sessionUid } = useCryptoSessionStore.getState();
  if (!privateKey || !sessionUid) 
    throw new Error('La session cryptographique est absente.');

  const headers: Record<string, string> = { 'X-Crypto-Session-ID': sessionUid };
  const csrfToken = await getCsrfToken();
  headers['X-CSRF-Token'] = csrfToken;
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  
  const response = await api.post<unknown>('/auth/deconnexion', null, { headers, withCredentials: true });

  if (!isEncryptedPayload(response.data)) 
    throw new Error('La réponse chiffrée est invalide.');

  const decrypted = await decryptServerResponse<LogoutResponse>(response.data, privateKey);
  
  if (!decrypted || typeof decrypted !== 'object') {
    throw new Error('La réponse d’authentification est invalide.');
  }
    
  clearToken('access_token');
  clearToken('refresh_token');
  return decrypted;
}



async function requestCurrentUser(
  //privateKey: CryptoKey,
  //sessionUid: string, 
  //accessToken?: string | null,
): Promise<GetMeResponse<User>> {


  //const headers: Record<string, string> = {
  //  "X-Crypto-Session-ID": sessionUid,
  //};

  const headers: Record<string, string> = {}

  //const csrfToken = await getCsrfToken();

  //if (csrfToken) {
  //  headers["X-CSRF-Token"] = csrfToken;
  //}

  //if (accessToken) {
  //  headers.Authorization = `Bearer ${accessToken}`;
  //}

  const response = await api.get<unknown>(
    "/auth/me/", 
    {
      withCredentials: true,
      headers,
    },
  );

  if (!isEncryptedPayload(response.data)) {
    throw new Error(
      "La réponse chiffrée est invalide.",
    );
  }

  /*
  const decrypted =
    await decryptServerResponse<
      GetMeResponse<User>
    >(
      response.data,
      privateKey,
    );

  const {
    code,
    success,
  } = decrypted;
   */

  /*
   * L’access token est expiré, mais le refresh token
   * est encore valide : renouveler puis refaire /auth/me.
   */
  /*
  if (code==401 && success==false) {
    const response_data =await refreshAccessToken();

    const access_storage_key="access_token"
    const newAccessToken = await decryptToken(access_storage_key);
    return requestCurrentUser(
      privateKey,
      sessionUid,
      newAccessToken
    );

  }
    */ 

  //return decrypted;

  return undefined as any; // Placeholder to satisfy TypeScript, replace with actual implementation

  
}

export async function getMe(): Promise<
  GetMeResponse<User>
> {
  //await useCryptoStore.getState().initialize();
 /*
  const {
    privateKey,
    sessionUid,
  } = useCryptoSessionStore.getState();

  if (!privateKey || !sessionUid) {
    throw new Error(
      "La session cryptographique est absente.",
    );
  }
  */
  const access_storage_key="access_token"
  //const accessToken = await decryptToken(access_storage_key);

  let decrypted = await requestCurrentUser(
    //privateKey,
    //sessionUid,
    //accessToken
  );
  /*
  if (decrypted.success !== true) {
    throw new Error(decrypted.message || 'La session d’authentification a expiré.');
  }
  if (!decrypted.data || typeof decrypted.data.uid !== 'string'
    || typeof decrypted.data.is_active !== 'boolean') {
    throw new Error('La réponse utilisateur est invalide.');
  }
  */
  return decrypted;
}



export async function signUp(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
}

export function translateAuthError(message: string): string {
  if (message.includes('Invalid login credentials') || message.includes('status code 401')) return 'Email ou mot de passe incorrect.';
  if (message.includes('User already registered')) return 'Un compte existe déjà avec cet email.';
  if (message.includes('Password should be at least')) return 'Le mot de passe doit contenir au moins 6 caractères.';
  return message;
}

export async function submitAuth(mode: AuthMode, email: string, password: string) {
  return mode === 'signin' ? signIn(email, password) : signUp(email, password);
}
