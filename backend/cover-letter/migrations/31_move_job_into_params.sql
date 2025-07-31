DROP VIEW IF EXISTS latest_application_parameters;

ALTER TABLE application_parameters ADD COLUMN job_advert TEXT;

UPDATE application_parameters
    SET job_advert = job.job_description
    FROM job
    WHERE application_parameters.job_id = job.job_id;

--UPDATE application_parameters
--    SET job_advert = ''
--    WHERE job_id IS NULL;

--ALTER TABLE application_parameters
--    ALTER COLUMN job_advert SET NOT NULL;

ALTER TABLE application_parameters
    DROP COLUMN job_id;

DROP TABLE job;

CREATE VIEW latest_application_parameters AS
    SELECT DISTINCT ON (application_id)
        *
    FROM
        application_parameters
    ORDER BY
        application_id,
        created_at DESC;
