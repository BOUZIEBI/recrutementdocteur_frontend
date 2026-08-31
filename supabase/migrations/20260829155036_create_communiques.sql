/*
# Create communiques table and storage bucket

1. New Tables
- `communiques`
  - `id` (uuid, primary key)
  - `titre` (text, not null) — title of the communiqué
  - `description` (text, not null) — description/body
  - `date_publication` (date, not null) — publication date
  - `file_path` (text, nullable) — path to attached file in storage bucket
  - `file_name` (text, nullable) — original file name for download link
  - `created_at` (timestamptz, default now())
2. Storage
- Create bucket `communiques` for attached files (public read)
3. Security
- Enable RLS on `communiques`
- Allow anon + authenticated CRUD (single-tenant, no auth)
- Storage bucket is public for reads
*/

CREATE TABLE IF NOT EXISTS communiques (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre text NOT NULL,
  description text NOT NULL,
  date_publication date NOT NULL,
  file_path text,
  file_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE communiques ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_communiques" ON communiques;
CREATE POLICY "anon_select_communiques" ON communiques FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_communiques" ON communiques;
CREATE POLICY "anon_insert_communiques" ON communiques FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_communiques" ON communiques;
CREATE POLICY "anon_update_communiques" ON communiques FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_communiques" ON communiques;
CREATE POLICY "anon_delete_communiques" ON communiques FOR DELETE
TO anon, authenticated USING (true);

-- Storage bucket for communiqué files
INSERT INTO storage.buckets (id, name, public)
VALUES ('communiques', 'communiques', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "anon_read_communiques_bucket" ON storage.objects;
CREATE POLICY "anon_read_communiques_bucket" ON storage.objects
FOR SELECT TO anon, authenticated
USING (bucket_id = 'communiques');

DROP POLICY IF EXISTS "anon_write_communiques_bucket" ON storage.objects;
CREATE POLICY "anon_write_communiques_bucket" ON storage.objects
FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'communiques');
