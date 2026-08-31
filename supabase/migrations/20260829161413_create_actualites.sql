/*
# Create actualites table

1. New Tables
- `actualites`
  - `id` (uuid, primary key)
  - `titre` (text, not null) — title of the news item
  - `description` (text, not null) — short excerpt/summary
  - `date_publication` (date, not null) — publication date
  - `image_url` (text, nullable) — optional image URL for the card
  - `lien` (text, nullable) — optional external link
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `actualites`
- Allow anon + authenticated CRUD (single-tenant, no auth)
*/

CREATE TABLE IF NOT EXISTS actualites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre text NOT NULL,
  description text NOT NULL,
  date_publication date NOT NULL,
  image_url text,
  lien text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE actualites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_actualites" ON actualites;
CREATE POLICY "anon_select_actualites" ON actualites FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_actualites" ON actualites;
CREATE POLICY "anon_insert_actualites" ON actualites FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_actualites" ON actualites;
CREATE POLICY "anon_update_actualites" ON actualites FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_actualites" ON actualites;
CREATE POLICY "anon_delete_actualites" ON actualites FOR DELETE
TO anon, authenticated USING (true);
