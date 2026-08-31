/*
# Add contenu column to actualites

1. Modified Tables
- `actualites`
  - Add `contenu` (text, nullable) — full article body for the detail page.
  The existing `description` stays as the short card excerpt; `contenu` holds
  the longer text shown when a visitor opens the actualité's detail page.
2. Security
- No policy changes. The existing anon+authenticated CRUD policies on
  `actualites` already cover the new column.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'actualites' AND column_name = 'contenu'
  ) THEN
    ALTER TABLE actualites ADD COLUMN contenu text;
  END IF;
END $$;
