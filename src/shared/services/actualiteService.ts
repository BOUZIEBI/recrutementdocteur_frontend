// src/features/actualite/services/actualiteService.ts

import { api } from "@/shared/services/apiService";
import type { Actualite } from "@/features/actualites";


type ActualiteApiResponse = {
  code: number;
  success: boolean;
  message: string;
  data: Actualite;
};

export async function fetchActualiteByUid(
  uid: string,
): Promise<Actualite> {
  const response = await api.get<ActualiteApiResponse>(
      `/actualite/${uid}`,
    );

  return response.data.data;
}