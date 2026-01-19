ALTER TABLE products
  ALTER COLUMN sizes TYPE TEXT[] USING sizes::text[];
