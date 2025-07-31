BEGIN;

-- Add the new columns for rating and feedback to the cover_letter_generation table
ALTER TABLE cover_letter_generation
ADD COLUMN rating INTEGER CHECK (rating > 0 AND rating <= 5), -- Ensuring rating is between 1 and 5
ADD COLUMN feedback TEXT;

COMMIT;
