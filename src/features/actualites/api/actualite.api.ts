import { supabase } from '@/shared/lib/supabase';
import type { Actualite } from '../types/actualite.types';

export async function fetchActualiteById(id: string): Promise<Actualite | null> {
  const { data, error } = await supabase
    .from('actualites')
    .select('id, titre, description, contenu, date_publication, image_url, lien')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) return null;
  return data as Actualite;
}

export async function fetchActualites(limit = 8): Promise<Actualite[]> {
  const { data, error } = await supabase
    .from('actualites')
    .select('id, titre, description, date_publication, image_url, lien')
    .order('date_publication', { ascending: false })
    .limit(limit);

  if (error) return [];
  return data as Actualite[];
}
