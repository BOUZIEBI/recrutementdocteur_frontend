// src/services/historique.service.ts

import { api } from "@/shared/services/apiService";
import { fetchCsrfToken } from "@/shared/services/cryptoService";
import { decryptToken } from "@/shared/services/EncrypdecrypToten";

import type {
  Historique,
  HistoriquePayload,
  HistoriqueResponse,
} from "../types/historique.types";


export interface HistoriqueFilters {
  annee_concours?: number;
  type_session?: string;
}


export interface HistoriqueDetailResponse {
  code: number;
  success: boolean;
  message: string;
  data: Historique;
}


async function getAccessToken(): Promise<string> {
  const accessToken = await decryptToken(
    "access_token",
  );

  if (!accessToken?.trim()) {
    throw new Error(
      "Le token d’accès est absent. "
      + "Veuillez vous reconnecter.",
    );
  }

  return accessToken.trim();
}


export async function getCsrfToken(): Promise<string> {
  const csrfCookie = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find(
      (cookie) =>
        cookie.startsWith("csrf_token=")
        || cookie.startsWith("csrftoken="),
    );

  if (csrfCookie) {
    const separatorIndex = csrfCookie.indexOf("=");

    return decodeURIComponent(
      csrfCookie.slice(separatorIndex + 1),
    );
  }

  const token = await fetchCsrfToken();

  if (!token) {
    throw new Error(
      "Le token CSRF est absent.",
    );
  }

  return token;
}


async function getAuthorizationHeaders(): Promise<
  Record<string, string>
> {
  const accessToken = await getAccessToken();

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}


async function getMutationHeaders(): Promise<
  Record<string, string>
> {
  const accessToken = await getAccessToken();
  const csrfToken = await getCsrfToken();

  return {
    Authorization: `Bearer ${accessToken}`,
    "X-CSRFToken": csrfToken,
    "X-CSRF-Token": csrfToken,
  };
}


/**
 * Récupère la liste paginée des historiques.
 */
export async function fetchHistoriques(
  filters: HistoriqueFilters = {},
  signal?: AbortSignal,
): Promise<HistoriqueResponse> {
  const headers = await getAuthorizationHeaders();

  const response = await api.get<HistoriqueResponse>(
    "/historiques/",
    {
      headers,
      signal,
      params: {
        annee_concours: filters.annee_concours || undefined,
        type_session: filters.type_session || "all",
      },
    },
  );
  return response.data;
}


/**
 * Récupère uniquement le tableau des historiques.
 */
export async function fetchHistoriqueResults(
  filters: HistoriqueFilters = {},
  signal?: AbortSignal,
): Promise<Historique[]> {
  const response = await fetchHistoriques(
    filters,
    signal,
  );

  if (
    !response?.success
    || !response.data
    || !Array.isArray(response.data.results)
  ) {
    throw new Error(
      "Impossible de récupérer la liste des historiques.",
    );
  }

  return response.data.results;
}


/**
 * Récupère un historique à partir de son UUID.
 *
 * Route Django attendue :
 * GET /api/v1/historiques/{uid}/
 */
export async function fetchHistoriqueByUid(
  uid: string,
): Promise<Historique> {
  if (!uid?.trim()) {
    throw new Error(
      "L’identifiant de l’historique est absent.",
    );
  }

  const headers = await getAuthorizationHeaders();

  const response =
    await api.get<HistoriqueDetailResponse>(
      `/historiques/${uid}/`,
      {
        headers,
      },
    );

  return response.data.data;
}


/**
 * Crée un nouvel historique.
 *
 * Route Django attendue :
 * POST /api/v1/historiques/
 */
export async function ajouterHistorique(
  payload: HistoriquePayload,
): Promise<Historique> {
  const headers = await getMutationHeaders();

  const response =
    await api.post<HistoriqueDetailResponse>(
      "/historiques/",
      payload,
      {
        headers,
      },
    );

  if (!response.data.success) {
    throw new Error(
      response.data.message
      || "Échec de la création de l’historique.",
    );
  }

  return response.data.data;
}


/**
 * Modifie un historique.
 *
 * Route Django attendue :
 * PATCH /api/v1/historiques/{uid}/
 */
export async function modifierHistorique(
  uid: string,
  payload: Partial<HistoriquePayload>,
): Promise<Historique> {
  if (!uid?.trim()) {
    throw new Error(
      "L’identifiant de l’historique est absent.",
    );
  }

  const headers = await getMutationHeaders();

  const response =
    await api.patch<HistoriqueDetailResponse>(
      `/historiques/${uid}/`,
      payload,
      {
        headers,
      },
    );

  if (!response.data.success) {
    throw new Error(
      response.data.message
      || "Échec de la modification.",
    );
  }

  return response.data.data;
}


/**
 * Supprime logiquement ou physiquement un historique.
 */
export async function supprimerHistorique(
  uid: string,
): Promise<void> {
  if (!uid?.trim()) {
    throw new Error(
      "L’identifiant de l’historique est absent.",
    );
  }

  const headers = await getMutationHeaders();

  await api.delete(
    `/historiques/${uid}/`,
    {
      headers,
    },
  );
}