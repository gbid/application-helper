ALTER TABLE application_parameters
    ADD COLUMN cover_letter_text TEXT;

-- This recreates the view on latest application parameters. If we didn't do
-- this, then the view would not have the "word_count" column.
DROP VIEW IF EXISTS latest_application_parameters;
CREATE VIEW latest_application_parameters AS
    SELECT DISTINCT ON (application_id)
        *
    FROM
        application_parameters
    ORDER BY
        application_id,
        created_at DESC;
