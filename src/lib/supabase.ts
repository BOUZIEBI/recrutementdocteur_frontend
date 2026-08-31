import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Communiqué = {
  id: string;
  titre: string;
  description: string;
  date_publication: string;
  file_path: string | null;
  file_name: string | null;
};

export type Actualité = {
  id: string;
  titre: string;
  description: string;
  contenu: string | null;
  date_publication: string;
  image_url: string | null;
  lien: string | null;
};

export type Photothèque = {
  id: string;
  titre: string;
  description: string | null;
  image_url: string;
  date_evenement: string | null;
};
