import { supabase } from '@/shared/lib/supabase';
import type { PreinscriptionData } from '../types/preinscription.types';

export async function uploadPhoto(file: File): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const fileName = `preinscription_${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from('preinscriptions')
    .upload(fileName, file);
  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from('preinscriptions')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

export async function submitPreinscription(data: PreinscriptionData) {
  const { error: insertError } = await supabase
    .from('preinscriptions')
    .insert(data);
  if (insertError) throw insertError;
}
