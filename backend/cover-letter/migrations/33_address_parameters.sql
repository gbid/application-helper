
ALTER TABLE application_parameters
    ADD COLUMN applicant_name TEXT,
    ADD COLUMN applicant_street_address TEXT,
    ADD COLUMN applicant_postal_code TEXT,
    ADD COLUMN applicant_city TEXT,
    ADD COLUMN company_name TEXT,
    ADD COLUMN company_street_address TEXT,
    ADD COLUMN company_postal_code TEXT,
    ADD COLUMN company_city TEXT;

DROP VIEW IF EXISTS latest_application_parameters;
CREATE VIEW latest_application_parameters AS
    SELECT DISTINCT ON (application_id)
        *
    FROM
        application_parameters
    ORDER BY
        application_id,
        created_at DESC;
