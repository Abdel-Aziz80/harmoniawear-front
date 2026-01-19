-- scripts/enum_status_migration.sql

-- 0) Normaliser les valeurs existantes
UPDATE "orders" SET "status" = lower("status");

-- Mapper quelques variantes fréquentes
UPDATE "orders" SET "status" = 'pending'
WHERE "status" IN ('pending ', 'en attente', 'attente', 'draft', 'nouvelle', 'new');

UPDATE "orders" SET "status" = 'confirmed'
WHERE "status" IN ('confirmé','confirmée','valide','validé','validée','paid','payé','payee','payée','processing','processed');

UPDATE "orders" SET "status" = 'shipped'
WHERE "status" IN ('expedie','expédié','expediee','expédiée','expediees','expédiées','envoyee','envoyée','envoye','envoyé');

UPDATE "orders" SET "status" = 'delivered'
WHERE "status" IN ('livre','livré','livree','livrée','recu','reçu','received');

-- Sécuriser les valeurs restantes (tout ce qui n’est pas dans l’enum cible → pending)
UPDATE "orders"
SET "status" = 'pending'
WHERE "status" NOT IN ('pending','confirmed','shipped','delivered') OR "status" IS NULL;

-- 1) Créer le type ENUM si besoin
DO $$ BEGIN
  CREATE TYPE "OrderStatus" AS ENUM ('pending','confirmed','shipped','delivered');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2) Supprimer le DEFAULT *avant* la conversion de type
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;

-- 3) Convertir TEXT -> ENUM
ALTER TABLE "orders"
  ALTER COLUMN "status" TYPE "OrderStatus" USING "status"::"OrderStatus";

-- 4) Remettre le DEFAULT (facultatif, mais conseillé)
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending';

-- (Optionnel) Forcer NOT NULL si souhaité
-- ALTER TABLE "orders" ALTER COLUMN "status" SET NOT NULL;
