ALTER TABLE cover_letter_generation
    DROP COLUMN cover_letter_kind;

ALTER TABLE application_parameters
    ADD COLUMN template_cover_letter_id UUID,
    -- Intentionally no delete on cascade for the foreign key. We don't want to
    -- accidentally delete application_parameters rows when removing templates.
    ADD CONSTRAINT fk_template_cover_letter
    FOREIGN KEY (template_cover_letter_id) REFERENCES template_cover_letter;

-- We're losing some data here. Users will need to
-- reselect their template cover letter if they want to
-- set one.
DROP TABLE template_cover_letter_used_for_generation;

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


