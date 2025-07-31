-- Purpose: Narrow the cover_letter_kind column to only two values: 'Standard' and 'AdaptedFromTemplate'.

-- Data migration:
UPDATE cover_letter_generation
SET cover_letter_kind = CASE
    WHEN cover_letter_kind IN ('Standard', 'AdaptedFromTemplate') THEN cover_letter_kind
    ELSE 'Standard'  -- or any default value you prefer
END;

-- Schema migration:
-- Step 1: Create the new enum type
CREATE TYPE cover_letter_kind_new AS ENUM ('Standard', 'AdaptedFromTemplate');

-- Step 2: Alter the table to use the new enum type
ALTER TABLE cover_letter_generation
  ALTER COLUMN cover_letter_kind TYPE text USING cover_letter_kind::text;

ALTER TABLE cover_letter_generation
  ALTER COLUMN cover_letter_kind TYPE cover_letter_kind_new USING cover_letter_kind::cover_letter_kind_new;

-- Step 3: Drop the old enum type
DROP TYPE cover_letter_kind;

-- Step 4: Rename the new enum type to the old name for consistency
ALTER TYPE cover_letter_kind_new RENAME TO cover_letter_kind;
