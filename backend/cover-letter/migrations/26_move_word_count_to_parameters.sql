ALTER TABLE application_parameters
    ADD COLUMN word_count INTEGER;

-- We're losing some data here because we're not migrating word_counts. Already
-- generated cover letters are not affected. If users hit "regenerate" though,
-- the default word count will be used. Not a big problem; users can just set
-- it again.
ALTER TABLE cover_letter_generation
    DROP COLUMN word_count;

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
