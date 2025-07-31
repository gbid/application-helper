-- Start of migration to remove UNIQUE constraints from resume and template_cover_letter tables

BEGIN;

-- Remove UNIQUE constraint from resume table
ALTER TABLE resume DROP CONSTRAINT IF EXISTS resume_user_id_byte_content_hash_key;

-- Remove UNIQUE constraint from template_cover_letter table
ALTER TABLE template_cover_letter DROP CONSTRAINT IF EXISTS template_cover_letter_user_id_text_content_hash_key;

COMMIT;

-- End of migration to remove UNIQUE constraints from resume and template_cover_letter tables
