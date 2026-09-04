export type Communique = {
  id: string;
  titre: string;
  description: string;
  date_publication: string;
  file_path?: string | null;
  file_name?: string | null;
};
