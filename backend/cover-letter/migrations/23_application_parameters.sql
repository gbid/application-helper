BEGIN;

CREATE TABLE application_parameters (
    revision_id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1mc(),
    application_id UUID NOT NULL REFERENCES application(application_id) ON DELETE CASCADE,

    -- ON DELETE CASCADE is intentionally missing here: We don't want to accidentally delete
    -- application parameter revisions when we clean up the jobs or resume table.
    job_id UUID NOT NULL REFERENCES job(job_id),
    resume_id UUID NOT NULL REFERENCES resume(resume_id),

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- We usually want the consider the application parameters only, which can be
-- done by joining the application table with this view:
CREATE VIEW latest_application_parameters AS 
    SELECT DISTINCT ON (application_id)
        *
    FROM 
        application_parameters
    ORDER BY
        application_id,
        created_at DESC;


-- The old "updated_at" field becomes the "created_at" field of each row. The
-- former can be null, in which case we use the time when the migration
-- executes.
INSERT INTO application_parameters (application_id, job_id, resume_id, created_at)
    SELECT application_id, job_id, resume_id, 
           COALESCE(updated_at, CURRENT_TIMESTAMP) AS created_at
    FROM application;

ALTER TABLE application
    DROP COLUMN job_id,
    DROP COLUMN resume_id,
    DROP COLUMN updated_at;

DROP TRIGGER IF EXISTS trigger_updated_at ON application;

COMMIT;
