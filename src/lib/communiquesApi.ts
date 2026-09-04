const API_BASE = 'http://127.0.0.1:8080/api/v1';

export type Communique = {
  id: string;
  titre: string;
  description: string;
  date_publication: string;
  file_path?: string | null;
  file_name?: string | null;
};

type ApiResponse = Communique[] | { data: Communique[] } | { communiques: Communique[] };

export async function fetchCommuniques(): Promise<Communique[]> {
  const res = await fetch(`${API_BASE}/communique/all`);
  if (!res.ok) {
    throw new Error(`Erreur API communiqués: ${res.status}`);
  }
  const json: ApiResponse = await res.json();
  console.log(json.data);

  if (Array.isArray(json)) return json;
  if ('data' in json && Array.isArray(json.data)) return json.data;
  return [];
}
