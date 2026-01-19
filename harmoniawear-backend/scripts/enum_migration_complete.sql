-- ============ NORMALISATION DES DONNÉES EXISTANTES ============
-- Catégories / collections en minuscules
UPDATE "products" 
SET "category"   = lower("category"),
    "collection" = lower("collection");

-- Corrections possibles (orthographe / synonymes)
UPDATE "products" SET "collection" = 'muslim'
WHERE lower("collection") IN ('muslim','mouslim','moslem','musulm','muslim ');

UPDATE "products" SET "category" = 'femme'
WHERE lower("category") IN ('femme','woman','women');

UPDATE "products" SET "category" = 'homme'
WHERE lower("category") IN ('homme','man','men');

UPDATE "products" SET "category" = 'enfant'
WHERE lower("category") IN ('enfant','kid','kids','child','children');

-- Tailles en MAJ (préparation)
UPDATE "products"
SET "sizes" = (
  SELECT array_agg(upper(s))
  FROM unnest(coalesce("products"."sizes", ARRAY[]::text[])) AS s
);

-- ============ CRÉATION DES TYPES ENUM (SI ABSENTS) ============
DO $$ BEGIN
  CREATE TYPE "Category" AS ENUM ('femme','homme','enfant');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "Collection" AS ENUM ('streetwear','sportswear','maternity','muslim');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "Size" AS ENUM ('XS','S','M','L','XL','XXL');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============ CONVERSION category / collection → ENUM =========
ALTER TABLE "products"
  ALTER COLUMN "category"   TYPE "Category"   USING "category"::"Category",
  ALTER COLUMN "collection" TYPE "Collection" USING "collection"::"Collection";

-- ============ CONVERSION sizes (TEXT[] → Size[]) SANS USING SUBQUERY =========
-- 1) Ajouter une colonne temporaire enum
ALTER TABLE "products" ADD COLUMN "sizes_tmp" "Size"[] NOT NULL DEFAULT '{}';

-- 2) Remplir depuis l’ancienne colonne (on ne garde que les valeurs valides)
UPDATE "products"
SET "sizes_tmp" = (
  SELECT ARRAY(
    SELECT s::"Size"
    FROM unnest(coalesce("products"."sizes", ARRAY[]::text[])) AS s
    WHERE s IN ('XS','S','M','L','XL','XXL')
  )
);

-- 3) Basculer
ALTER TABLE "products" DROP COLUMN "sizes";
ALTER TABLE "products" RENAME COLUMN "sizes_tmp" TO "sizes";
