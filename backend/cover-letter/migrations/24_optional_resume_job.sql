BEGIN;

ALTER TABLE application_parameters
ALTER COLUMN job_id DROP NOT NULL;

ALTER TABLE application_parameters
ALTER COLUMN resume_id DROP NOT NULL;

COMMIT;
