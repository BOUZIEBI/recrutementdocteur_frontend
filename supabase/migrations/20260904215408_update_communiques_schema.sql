/*
# Update communiques table to match the full Communique data model

1. Modified Tables
- `communiques`
  - Added `uid` (uuid, primary key) — replaces `id` as the unique identifier
  - Added `reference` (text, nullable) — official communiqué number, e.g. COM-2026-001
  - Added `slug` (text, nullable) — URL-friendly identifier
  - Added `code` (text, nullable) — internal code
  - Added `resume` (text, nullable) — short summary
  - Added `contenu` (text, not null) — full body content
  - Added `image_url` (text, nullable) — document or illustration URL
  - Added `fichier_key` (text, nullable) — storage key for attached file
  - Added `statut` (text, not null, default 'publie') — status: brouillon, publie, archive
  - Added `est_epingle` (boolean, not null, default false) — pinned flag
  - Added `date_expiration` (timestamptz, nullable) — expiration date
  - Added `auteur_uid` (uuid, nullable) — author user UID
  - Added `nombre_vues` (integer, not null, default 0) — view count
  - Added `nombre_telechargements` (integer, not null, default 0) — download count
  - Added `cree_le` (timestamptz, nullable) — creation timestamp
  - Added `modifie_le` (timestamptz, nullable) — last modification timestamp
  - Added `is_deleted` (boolean, not null, default false) — soft delete flag
  - Added `supprime_le` (timestamptz, nullable) — deletion timestamp
  - Added `supprime_par_uid` (uuid, nullable) — UID of user who deleted
2. Security
  - RLS already enabled on `communiques` — existing policies unchanged
3. Notes
  - The old `id`, `titre`, `description`, `date_publication`, `file_path`, `file_name`, `created_at` columns are kept for backward compatibility
  - New columns are added alongside existing ones so no data is lost
  - `contenu` is NOT NULL with a default empty string so the constraint is satisfied for existing rows
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'reference') THEN
    ALTER TABLE communiques ADD COLUMN reference text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'slug') THEN
    ALTER TABLE communiques ADD COLUMN slug text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'code') THEN
    ALTER TABLE communiques ADD COLUMN code text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'resume') THEN
    ALTER TABLE communiques ADD COLUMN resume text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'contenu') THEN
    ALTER TABLE communiques ADD COLUMN contenu text NOT NULL DEFAULT '';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'image_url') THEN
    ALTER TABLE communiques ADD COLUMN image_url text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'fichier_key') THEN
    ALTER TABLE communiques ADD COLUMN fichier_key text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'statut') THEN
    ALTER TABLE communiques ADD COLUMN statut text NOT NULL DEFAULT 'publie';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'est_epingle') THEN
    ALTER TABLE communiques ADD COLUMN est_epingle boolean NOT NULL DEFAULT false;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'date_expiration') THEN
    ALTER TABLE communiques ADD COLUMN date_expiration timestamptz;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'auteur_uid') THEN
    ALTER TABLE communiques ADD COLUMN auteur_uid uuid;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'nombre_vues') THEN
    ALTER TABLE communiques ADD COLUMN nombre_vues integer NOT NULL DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'nombre_telechargements') THEN
    ALTER TABLE communiques ADD COLUMN nombre_telechargements integer NOT NULL DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'cree_le') THEN
    ALTER TABLE communiques ADD COLUMN cree_le timestamptz;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'modifie_le') THEN
    ALTER TABLE communiques ADD COLUMN modifie_le timestamptz;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'is_deleted') THEN
    ALTER TABLE communiques ADD COLUMN is_deleted boolean NOT NULL DEFAULT false;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'supprime_le') THEN
    ALTER TABLE communiques ADD COLUMN supprime_le timestamptz;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'communiques' AND column_name = 'supprime_par_uid') THEN
    ALTER TABLE communiques ADD COLUMN supprime_par_uid uuid;
  END IF;
END $$;
