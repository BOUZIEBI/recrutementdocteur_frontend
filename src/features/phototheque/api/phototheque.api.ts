import { supabase } from '@/shared/lib/supabase';
import type { Photothèque } from '../types/phototheque.types';

export async function fetchPhotos(): Promise<Photothèque[]> {
  const { data, error } = await supabase
    .from('phototheque')
    .select('id, titre, description, image_url, date_evenement')
    .order('date_evenement', { ascending: false });

  if (error) return [];
  return data as Photothèque[];
}
