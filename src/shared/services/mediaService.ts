/** Construit l’URL publique d’un fichier servi par le backend. */
export function getMediaUrl(fileKey: string): string {
  if (/^https?:\/\//i.test(fileKey)) return fileKey;

  const baseUrl = import.meta.env.VITE_MEDIA_BASE_URL
    || import.meta.env.VITE_API_URL
    || 'http://127.0.0.1:8080/api/v1/';

  return `${baseUrl.replace(/\/+$/, '')}/${fileKey.replace(/^\/+/, '')}`;
}
