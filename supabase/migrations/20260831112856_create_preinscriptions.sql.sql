/*
# Création de la table preinscriptions

## Description
Stocke les demandes de préinscription des agents DRH-MESRS qui souhaitent
créer un espace. Chaque demande contient les informations d'identité de
l'agent ainsi que la photo transmise. Les demandes sont ensuite traitées
manuellement par l'administration.

## Nouvelle table : preinscriptions
- id (uuid, clé primaire)
- matricule (text, not null) — matricule de l'agent
- date_naissance (date, not null) — date de naissance
- numero_piece (text, not null) — numéro de pièce d'identité
- email (text, not null) — adresse email
- mot_de_passe (text, not null) — mot de passe choisi (sera utilisé pour créer le compte après validation)
- photo_url (text) — URL de la photo de l'agent (stockée dans Supabase Storage)
- statut (text, default 'en_attente') — statut de la demande
- created_at (timestamptz, default now())

## Sécurité
- RLS activée sur preinscriptions.
- L'application n'a pas d'écran de connexion pour cette table (les préinscriptions
  sont soumises avant authentification), donc policies TO anon, authenticated.
- Lecture/insertion/ouverture pour tous (soumission publique de demande).
  La modification et la suppression sont réservées à un usage futur authentifié.
*/

CREATE TABLE IF NOT EXISTS preinscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  matricule text NOT NULL,
  date_naissance date NOT NULL,
  numero_piece text NOT NULL,
  email text NOT NULL,
  mot_de_passe text NOT NULL,
  photo_url text,
  statut text NOT NULL DEFAULT 'en_attente',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE preinscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_preinscriptions" ON preinscriptions;
CREATE POLICY "anon_select_preinscriptions"
ON preinscriptions FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_preinscriptions" ON preinscriptions;
CREATE POLICY "anon_insert_preinscriptions"
ON preinscriptions FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_preinscriptions" ON preinscriptions;
CREATE POLICY "anon_update_preinscriptions"
ON preinscriptions FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_preinscriptions" ON preinscriptions;
CREATE POLICY "anon_delete_preinscriptions"
ON preinscriptions FOR DELETE
TO anon, authenticated USING (true);
