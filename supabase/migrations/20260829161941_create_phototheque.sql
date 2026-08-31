/*
# Create phototheque table

1. New Tables
- `phototheque`
  - `id` (uuid, primary key)
  - `titre` (text, not null) — event title
  - `description` (text, nullable) — short caption
  - `image_url` (text, not null) — image URL
  - `date_evenement` (date, nullable) — event date
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `phototheque`
- Allow anon + authenticated CRUD (single-tenant, no auth)
*/

CREATE TABLE IF NOT EXISTS phototheque (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre text NOT NULL,
  description text,
  image_url text NOT NULL,
  date_evenement date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE phototheque ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_phototheque" ON phototheque;
CREATE POLICY "anon_select_phototheque" ON phototheque FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_phototheque" ON phototheque;
CREATE POLICY "anon_insert_phototheque" ON phototheque FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_phototheque" ON phototheque;
CREATE POLICY "anon_update_phototheque" ON phototheque FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_phototheque" ON phototheque;
CREATE POLICY "anon_delete_phototheque" ON phototheque FOR DELETE
TO anon, authenticated USING (true);
