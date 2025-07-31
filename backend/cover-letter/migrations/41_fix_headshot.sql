ALTER TABLE headshot
    ADD COLUMN byte_content_hash TEXT NOT NULL;

ALTER TABLE headshot
    ADD CONSTRAINT headshot_user_id_byte_content_hash_key
    UNIQUE (user_id, byte_content_hash);

ALTER TABLE headshot
    ALTER COLUMN headshot_id
    SET DEFAULT uuid_generate_v1mc();

DROP VIEW IF EXISTS latest_application_parameters;
CREATE VIEW latest_application_parameters AS
    SELECT DISTINCT ON (application_id)
        *
    FROM
        application_parameters
    ORDER BY
        application_id,
        created_at DESC;

SELECT trigger_updated_at('"headshot"');
